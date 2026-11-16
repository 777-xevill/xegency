import { chatSystemPrompt } from "@/lib/chat-context";

/**
 * Cloudflare Worker for the site's two dynamic endpoints.
 *
 * Every page is a pre-built file that Cloudflare serves directly, without
 * running this code. Only POSTs under /api/* reach it (see run_worker_first
 * in wrangler.jsonc), which keeps page views off the Workers request quota.
 *
 * Secrets are set with `wrangler secret put`: GROQ_API_KEY (chat) and
 * optionally CONTACT_WEBHOOK_URL. GROQ_MODEL optionally overrides the model.
 * HIRING_TOKEN unlocks the private applicant dashboard at /hiring.
 */

type Env = {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
  GROQ_API_KEY?: string;
  GROQ_MODEL?: string;
  CONTACT_WEBHOOK_URL?: string;
  HIRING_DB: D1Database;
  HIRING_TOKEN?: string;
};

/* Just the slice of Cloudflare's D1 API this file uses. */
type D1Result<T> = { results: T[] };
type D1Statement = {
  bind: (...values: unknown[]) => D1Statement;
  run: () => Promise<{ meta: { changes: number } }>;
  all: <T = Record<string, unknown>>() => Promise<D1Result<T>>;
};
type D1Database = { prepare: (sql: string) => D1Statement };

type ChatMessage = { role: "user" | "assistant"; content: string };

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_MODEL = "openai/gpt-oss-120b";
const FALLBACK_MODEL = "openai/gpt-oss-20b";

const MAX_USER_CHARS = 1000;
const MAX_ASSISTANT_CHARS = 1500;
const MAX_HISTORY = 8;

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 30;

const MAX_CONTACT_MESSAGE = 5000;

function fail(error: string, status: number, reason?: string) {
  return Response.json({ ok: false, error, reason }, { status });
}

/**
 * Per-isolate, so it loosens as Cloudflare spreads traffic out. It stops one
 * visitor hammering the endpoint; Groq's own limits are the backstop.
 */
const hits = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string) {
  const now = Date.now();
  if (hits.size > 5000) {
    for (const [key, entry] of hits) {
      if (entry.resetAt <= now) hits.delete(key);
    }
  }
  const entry = hits.get(ip);
  if (!entry || entry.resetAt <= now) {
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

/** Turns the request body into a safe history, or null if it is malformed. */
function parseMessages(body: unknown): ChatMessage[] | null {
  const raw = (body as { messages?: unknown } | null)?.messages;
  if (!Array.isArray(raw) || raw.length === 0) return null;

  const messages: ChatMessage[] = [];
  for (const item of raw) {
    const { role, content } = (item ?? {}) as Record<string, unknown>;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") {
      return null;
    }
    const trimmed = content.trim();
    if (!trimmed) continue;
    messages.push({
      role,
      content: trimmed.slice(
        0,
        role === "user" ? MAX_USER_CHARS : MAX_ASSISTANT_CHARS,
      ),
    });
  }

  const recent = messages.slice(-MAX_HISTORY);
  if (recent.at(-1)?.role !== "user") return null;
  return recent;
}

/** Reduces Groq's server-sent events to just the reply text. */
export function textStream(upstream: ReadableStream<Uint8Array>) {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";

  return upstream.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        buffer += decoder.decode(chunk, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          const data = line.trim();
          if (!data.startsWith("data:")) continue;
          const payload = data.slice(5).trim();
          if (payload === "[DONE]") continue;
          try {
            const event = JSON.parse(payload) as {
              choices?: { delta?: { content?: string } }[];
            };
            const text = event.choices?.[0]?.delta?.content;
            if (text) controller.enqueue(encoder.encode(text));
          } catch {
            // A partial or non-JSON event carries no reply text.
          }
        }
      },
    }),
  );
}

async function chat(request: Request, env: Env) {
  if (!isSameOrigin(request)) return fail("Not allowed.", 403);

  // Cloudflare sets this itself, so visitors can't spoof it to dodge the limit.
  const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
  if (isRateLimited(ip)) {
    return fail("That's a lot of questions. Give it a few minutes.", 429);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail("Malformed request.", 400);
  }

  const messages = parseMessages(body);
  if (!messages) return fail("Malformed request.", 400);

  if (!env.GROQ_API_KEY) return fail("Chat isn't connected.", 501, "not-configured");

  // Each Groq model has its own token allowance, so a throttled primary can
  // fall through to the smaller model.
  const models = [...new Set([env.GROQ_MODEL || DEFAULT_MODEL, FALLBACK_MODEL])];

  let upstream!: Response;
  try {
    for (const model of models) {
      upstream = await fetch(GROQ_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          messages: [{ role: "system", content: chatSystemPrompt }, ...messages],
          stream: true,
          temperature: 0.6,
          // The model's reasoning counts towards this limit too.
          max_completion_tokens: 500,
          reasoning_effort: "low",
          include_reasoning: false,
        }),
        signal: AbortSignal.timeout(30_000),
      });
      if (upstream.status !== 429) break;
    }
  } catch (error) {
    console.error("Groq request failed:", error);
    return fail("The assistant is unavailable right now.", 502);
  }

  if (!upstream.ok || !upstream.body) {
    console.error("Groq rejected the request:", upstream.status);
    return upstream.status === 429
      ? fail("The assistant is busy. Try again in a minute.", 503)
      : fail("The assistant is unavailable right now.", 502);
  }

  return new Response(textStream(upstream.body), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  message?: string;
  /** Honeypot: real people never fill this in. */
  website?: string;
};

async function contact(request: Request, env: Env) {
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return fail("Malformed request.", 400);
  }

  // Silently accept and discard bot submissions so they stop retrying.
  if (body.website) return Response.json({ ok: true });

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || !email || !message) {
    return fail("Name, email and a message are required.", 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return fail("That email address doesn't look right.", 400);
  }
  if (message.length > MAX_CONTACT_MESSAGE) {
    return fail("That message is a little too long — trim it and resend.", 400);
  }

  if (!env.CONTACT_WEBHOOK_URL) {
    return Response.json({ ok: false, reason: "not-configured" }, { status: 501 });
  }

  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    body.company && `Company: ${body.company}`,
    body.projectType && `Project: ${body.projectType}`,
    body.budget && `Budget: ${body.budget}`,
    body.timeline && `Timeline: ${body.timeline}`,
    "",
    message,
  ].filter(Boolean);

  try {
    const res = await fetch(env.CONTACT_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // `text` covers Slack; the named fields cover Formspree and friends.
        text: `New enquiry via xegency.com\n\n${lines.join("\n")}`,
        name,
        email,
        company: body.company ?? "",
        projectType: body.projectType ?? "",
        budget: body.budget ?? "",
        timeline: body.timeline ?? "",
        message,
      }),
    });

    if (!res.ok) {
      console.error("Contact webhook rejected the submission:", res.status);
      return fail("We couldn't deliver that. Please email instead.", 502);
    }
  } catch (error) {
    console.error("Contact webhook failed:", error);
    return fail("We couldn't deliver that. Please email instead.", 502);
  }

  return Response.json({ ok: true });
}

/* ---------------------------------------------------------------- hiring */

const APPLY_FIELDS = [
  "role", "name", "phone", "email", "area", "status_now", "experience",
  "hours", "field_ok", "english", "pitch", "network", "source", "cv_link",
] as const;

const STAGES = ["new", "called", "interview", "trial", "hired", "rejected"];

/** 01712345678 / +8801712345678 / 8801712345678 → 01712345678, else null. */
function normalisePhone(raw: string) {
  const digits = raw.replace(/[^\d]/g, "");
  const local = digits.replace(/^880/, "0").replace(/^(?=1[3-9])/, "0");
  return /^01[3-9]\d{8}$/.test(local) ? local : null;
}

async function apply(request: Request, env: Env) {
  if (!isSameOrigin(request)) return fail("Not allowed.", 403);
  const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
  if (isRateLimited(`apply:${ip}`)) {
    return fail("Too many attempts. Try again in a few minutes.", 429);
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return fail("Malformed request.", 400);
  }
  if (body.website) return Response.json({ ok: true });

  const v: Record<string, string> = {};
  for (const key of APPLY_FIELDS) {
    const raw = typeof body[key] === "string" ? (body[key] as string) : "";
    v[key] = raw.trim().slice(0, key === "pitch" || key === "network" ? 2000 : 200);
  }
  // Where the link was shared (?src=…) is kept even if the field was left blank.
  const ref = typeof body.ref === "string" ? body.ref.trim().slice(0, 200) : "";
  if (ref) v.source = v.source ? `${v.source} (link: ${ref})` : `link: ${ref}`;

  if (!/^[a-z-]{3,60}$/.test(v.role)) v.role = "business-development-executive";
  const phone = normalisePhone(v.phone);
  if (!v.name || !v.area || !v.pitch) {
    return fail("Please fill in your name, area and pitch.", 400);
  }
  if (!phone) return fail("Please enter a Bangladeshi mobile number, like 01712345678.", 400);
  if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) {
    return fail("That email address doesn't look right.", 400);
  }
  if (v.pitch.length < 60) return fail("Write a little more in your pitch: two or three sentences.", 400);
  if (v.cv_link && !/^https?:\/\//i.test(v.cv_link)) v.cv_link = "";

  try {
    const res = await env.HIRING_DB.prepare(
      `INSERT INTO applications (${APPLY_FIELDS.join(", ")})
       VALUES (${APPLY_FIELDS.map(() => "?").join(", ")})
       ON CONFLICT(phone) DO NOTHING`,
    )
      .bind(...APPLY_FIELDS.map((k) => (k === "phone" ? phone : v[k] || null)))
      .run();
    if (res.meta.changes === 0) {
      return fail("We already have an application from this number. We'll be in touch.", 409);
    }
  } catch (error) {
    console.error("Saving application failed:", error);
    return fail("We couldn't save that. Please try again in a minute.", 502);
  }

  return Response.json({ ok: true });
}

/** Constant-time check of the dashboard token. */
function isAdmin(request: Request, env: Env) {
  const expected = env.HIRING_TOKEN;
  const given = (request.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "");
  if (!expected || given.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ given.charCodeAt(i);
  return diff === 0;
}

async function hiring(request: Request, env: Env, pathname: string) {
  if (!env.HIRING_TOKEN) return fail("Dashboard isn't set up.", 501);
  if (!isAdmin(request, env)) return fail("Wrong access key.", 401);
  const noStore = { headers: { "Cache-Control": "no-store" } };

  if (request.method === "GET" && pathname === "/api/hiring") {
    const { results } = await env.HIRING_DB.prepare(
      "SELECT * FROM applications ORDER BY id DESC LIMIT 2000",
    ).all();
    return Response.json({ ok: true, applications: results }, noStore);
  }

  const match = pathname.match(/^\/api\/hiring\/(\d+)$/);
  if (request.method === "POST" && match) {
    let body: { stage?: unknown; score?: unknown; notes?: unknown };
    try {
      body = (await request.json()) as typeof body;
    } catch {
      return fail("Malformed request.", 400);
    }
    const stage = typeof body.stage === "string" && STAGES.includes(body.stage) ? body.stage : null;
    const score =
      typeof body.score === "number" && body.score >= 0 && body.score <= 25 ? Math.round(body.score) : null;
    const notes = typeof body.notes === "string" ? body.notes.slice(0, 4000) : null;

    await env.HIRING_DB.prepare(
      `UPDATE applications SET
         stage = COALESCE(?, stage),
         score = CASE WHEN ? THEN ? ELSE score END,
         notes = COALESCE(?, notes),
         updated_at = datetime('now')
       WHERE id = ?`,
    )
      .bind(stage, "score" in body ? 1 : 0, score, notes, Number(match[1]))
      .run();
    return Response.json({ ok: true }, noStore);
  }

  return fail("Not found.", 404);
}

export default {
  async fetch(request: Request, env: Env) {
    const { pathname } = new URL(request.url);
    if (request.method === "POST") {
      if (pathname === "/api/chat") return chat(request, env);
      if (pathname === "/api/contact") return contact(request, env);
      if (pathname === "/api/apply") return apply(request, env);
    }
    if (pathname.startsWith("/api/hiring")) return hiring(request, env, pathname);
    return env.ASSETS.fetch(request);
  },
};
