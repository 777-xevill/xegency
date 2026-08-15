import { NextResponse } from "next/server";

/**
 * Contact endpoint.
 *
 * Zero-config by default: with no environment variable set it replies 501 and
 * the form falls back to opening a pre-filled email in the visitor's mail app,
 * so the page is never a dead end.
 *
 * To receive submissions properly, set ONE environment variable and redeploy:
 *
 *   CONTACT_WEBHOOK_URL=...
 *
 * Anything that accepts a JSON POST works — a Formspree form endpoint, a Slack
 * incoming webhook, a Zapier / Make catch hook, or your own handler. Put it in
 * `.env.local` for development and in your host's environment settings for
 * production. Never commit the value.
 */

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  message?: string;
  /** Honeypot — real people never fill this in. */
  website?: string;
};

const MAX = 5000;

function bad(message: string, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return bad("Malformed request.");
  }

  // Silently accept and discard bot submissions so they stop retrying.
  if (body.website) return NextResponse.json({ ok: true });

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || !email || !message) {
    return bad("Name, email and a message are required.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return bad("That email address doesn't look right.");
  }
  if (message.length > MAX) {
    return bad("That message is a little too long — trim it and resend.");
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json(
      { ok: false, reason: "not-configured" },
      { status: 501 },
    );
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
    const res = await fetch(webhook, {
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
      return bad("We couldn't deliver that. Please email instead.", 502);
    }
  } catch (error) {
    console.error("Contact webhook failed:", error);
    return bad("We couldn't deliver that. Please email instead.", 502);
  }

  return NextResponse.json({ ok: true });
}
