"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import {
  areaOptions,
  englishOptions,
  experienceOptions,
  role,
  sourceOptions,
  statusOptions,
  yesNo,
} from "@/content/careers";
import { Arrow, cx } from "@/components/ui";

/**
 * The application, one question at a time. Choices are tap targets that move
 * straight on; only name, phone and the pitch need typing.
 */

type Answers = Record<string, string>;

type Step =
  | { key: string; kind: "text"; q: string; hint?: string; placeholder?: string; type?: string; optional?: boolean; check?: (v: string) => string | null }
  | { key: string; kind: "long"; q: string; hint: string; optional?: boolean; min?: number }
  | { key: string; kind: "choice"; q: string; hint?: string; options: string[]; other?: boolean };

const phoneOk = (v: string) => {
  const d = v.replace(/\D/g, "").replace(/^880/, "0").replace(/^(?=1[3-9])/, "0");
  return /^01[3-9]\d{8}$/.test(d) ? null : "Enter a mobile number like 01712345678";
};

const steps: Step[] = [
  { key: "name", kind: "text", q: "What's your name?", placeholder: "Full name", check: (v) => (v.trim().length < 2 ? "Please write your name" : null) },
  { key: "phone", kind: "text", q: "Your WhatsApp number?", hint: "We'll call or message you on this number.", placeholder: "01XXXXXXXXX", type: "tel", check: phoneOk },
  { key: "area", kind: "choice", q: "Where in Dhaka do you live?", options: areaOptions, other: true },
  { key: "status_now", kind: "choice", q: "What are you doing right now?", options: statusOptions },
  { key: "experience", kind: "choice", q: "How much sales experience do you have?", hint: "None is completely fine. We train you.", options: experienceOptions },
  { key: "hours", kind: "choice", q: "Can you do 50 calls and 5 meetings a day?", options: yesNo },
  { key: "field_ok", kind: "choice", q: "Can you travel around Dhaka to meet business owners?", options: yesNo },
  { key: "english", kind: "choice", q: "How is your English?", options: englishOptions },
  { key: "pitch", kind: "long", q: "Pitch Xegency in your own words.", hint: "You have 30 seconds with the owner of a garment factory. What do you say? Bangla or English.", min: 60 },
  { key: "network", kind: "long", q: "Do you know any business owners or managers?", hint: "Who could you introduce us to? This helps, but you can skip it.", optional: true },
  { key: "source", kind: "choice", q: "Where did you find this job?", options: sourceOptions, other: true },
];

const TOTAL = steps.length;

function sourceFromUrl() {
  const p = new URLSearchParams(window.location.search);
  return [p.get("src"), p.get("utm_source"), p.get("utm_campaign")].filter(Boolean).join(" / ");
}

export function ApplyForm() {
  const [i, setI] = useState(0);
  const [a, setA] = useState<Answers>({});
  const [draft, setDraft] = useState("");
  const [otherOpen, setOtherOpen] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [editing, setEditing] = useState(false); // came from the review screen
  const trap = useRef<HTMLInputElement>(null);

  const done = i >= TOTAL; // the review screen
  const step = steps[i];

  function go(to: number, answers = a) {
    setError("");
    setOtherOpen(false);
    setI(to);
    setDraft(to < TOTAL ? (answers[steps[to].key] ?? "") : "");
  }

  function commit(value: string) {
    const next = { ...a, [step.key]: value };
    setA(next);
    go(editing ? TOTAL : i + 1, next);
    if (editing) setEditing(false);
  }

  function submitText() {
    if (step.kind === "choice") return;
    const v = draft.trim();
    if (!v && step.optional) return commit("");
    if (step.kind === "text" && step.check) {
      const problem = step.check(v);
      if (problem) return setError(problem);
    }
    if (step.kind === "long" && step.min && v.length < step.min) {
      return setError("Write a little more: two or three sentences.");
    }
    commit(v);
  }

  async function send() {
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...a, role: role.slug, ref: sourceFromUrl(), website: trap.current?.value ?? "" }),
      });
      if (res.ok) return setSent(true);
      const payload = (await res.json().catch(() => ({}))) as { error?: string };
      setError(payload.error ?? "Something went wrong. Please try again.");
    } catch {
      setError("Network problem. Check your connection and try again.");
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    const first = a.name?.split(" ")[0];
    return (
      <div className="pv-stage-in py-6">
        <p className="eyebrow text-stone">Application received</p>
        <h3 className="display mt-5 text-[clamp(2rem,3.4vw,2.8rem)]">Thank you{first ? `, ${first}` : ""}.</h3>
        <p className="pretty mt-5 max-w-md text-base leading-relaxed text-bone/65">
          We read every application. If you&rsquo;re a fit, we&rsquo;ll call or WhatsApp you within three days. Keep your phone close.
        </p>
        <p className="mt-4 max-w-md text-sm text-bone/45">Xegency never asks for money at any stage.</p>
      </div>
    );
  }

  const onEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !(step?.kind === "long" && !e.ctrlKey && !e.metaKey)) {
      e.preventDefault();
      submitText();
    }
  };

  return (
    <div>
      {/* honeypot */}
      <input ref={trap} name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px]" />

      {/* progress */}
      <div className="flex items-center justify-between text-xs text-bone/45">
        <span className="tabular-nums">{done ? "Ready to send" : `${i + 1} of ${TOTAL}`}</span>
        {i > 0 && (
          <button type="button" onClick={() => go(i - 1)} className="transition-colors hover:text-bone">
            ← Back
          </button>
        )}
      </div>
      <div className="mt-3 h-px w-full bg-bone/12">
        <div className="h-px bg-bone transition-[width] duration-500 ease-out" style={{ width: `${(Math.min(i, TOTAL) / TOTAL) * 100}%` }} />
      </div>

      <div key={i} className="pv-stage-in min-h-[22rem] pt-12">
        {done ? (
          <Review answers={a} onEdit={(k) => {
              setEditing(true);
              go(steps.findIndex((s) => s.key === k));
            }} />
        ) : (
          <>
            <h3 className="display text-[clamp(1.7rem,3vw,2.5rem)] leading-tight">{step.q}</h3>
            {step.hint && <p className="pretty mt-3 max-w-lg text-base text-bone/50">{step.hint}</p>}

            <div className="mt-9">
              {step.kind === "choice" && !otherOpen && (
                <ul className="grid gap-3 sm:grid-cols-2">
                  {step.options.map((o) => (
                    <li key={o}>
                      <Choice selected={a[step.key] === o} onClick={() => commit(o)}>
                        {o}
                      </Choice>
                    </li>
                  ))}
                  {step.other && (
                    <li>
                      <Choice selected={false} muted onClick={() => setOtherOpen(true)}>
                        Somewhere else…
                      </Choice>
                    </li>
                  )}
                </ul>
              )}

              {(step.kind === "text" || (step.kind === "choice" && otherOpen)) && (
                <input
                  autoFocus
                  type={step.kind === "text" ? (step.type ?? "text") : "text"}
                  inputMode={step.kind === "text" && step.type === "tel" ? "tel" : undefined}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key !== "Enter") return;
                    e.preventDefault();
                    if (step.kind === "choice") {
                      if (draft.trim()) commit(draft.trim());
                    } else submitText();
                  }}
                  placeholder={step.kind === "text" ? step.placeholder : "Type it here"}
                  className="w-full border-0 border-b border-bone/25 bg-transparent pb-3 text-2xl text-bone outline-none transition-colors placeholder:text-bone/25 focus:border-bone"
                />
              )}

              {step.kind === "long" && (
                <>
                  <textarea
                    autoFocus
                    rows={5}
                    maxLength={2000}
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={onEnter}
                    className="w-full resize-none border-0 border-b border-bone/25 bg-transparent pb-3 text-lg leading-relaxed text-bone outline-none transition-colors focus:border-bone"
                  />
                  {step.min && (
                    <p className="mt-2 text-xs tabular-nums text-bone/40">
                      {draft.trim().length < step.min ? `${step.min - draft.trim().length} more characters` : "Looks good"}
                    </p>
                  )}
                </>
              )}
            </div>

            {error && <p role="alert" className="mt-5 text-sm text-red-400">{error}</p>}

            {(step.kind !== "choice" || otherOpen) && (
              <div className="mt-9 flex items-center gap-6">
                <PrimaryButton
                  onClick={() => (step.kind === "choice" ? draft.trim() && commit(draft.trim()) : submitText())}
                >
                  {step.kind !== "choice" && step.optional && !draft.trim() ? "Skip" : "Next"}
                </PrimaryButton>
                {step.kind === "choice" ? (
                  <button type="button" onClick={() => setOtherOpen(false)} className="text-sm text-bone/45 hover:text-bone">
                    Show options
                  </button>
                ) : (
                  <span className="hidden text-xs text-bone/35 sm:inline">
                    {step.kind === "long" ? "or Ctrl + Enter" : "or press Enter"}
                  </span>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {done && (
        <div className="mt-10">
          {error && <p role="alert" className="mb-5 text-sm text-red-400">{error}</p>}
          <PrimaryButton onClick={() => void send()} disabled={sending}>
            {sending ? "Sending…" : "Send application"}
          </PrimaryButton>
          <p className="mt-5 max-w-sm text-xs leading-relaxed text-bone/40">
            Your details are used only to review this application. We never ask for money.
          </p>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------- pieces */

function Choice({
  children,
  selected,
  muted = false,
  onClick,
}: {
  children: string;
  selected: boolean;
  muted?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "group flex w-full items-center justify-between gap-4 border px-5 py-4 text-left text-base transition-all duration-300",
        selected
          ? "border-bone bg-bone text-ink"
          : "border-bone/15 text-bone hover:border-bone/60 hover:bg-bone/[0.04]",
        muted && "text-bone/55",
      )}
    >
      {children}
      <Arrow className="h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity duration-300 group-hover:opacity-60" />
    </button>
  );
}

function PrimaryButton({ children, onClick, disabled }: { children: string; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cx(
        "group inline-flex items-center gap-3 bg-bone px-8 py-4 text-[12px] font-medium uppercase tracking-[0.16em] text-ink transition-colors duration-300",
        disabled ? "cursor-wait opacity-60" : "hover:bg-stone",
      )}
    >
      {children}
      <Arrow className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </button>
  );
}

const reviewLabels: Record<string, string> = {
  name: "Name",
  phone: "Phone",
  area: "Area",
  status_now: "Right now",
  experience: "Experience",
  hours: "Daily targets",
  field_ok: "Meetings in Dhaka",
  english: "English",
  pitch: "Your pitch",
  network: "Who you know",
  source: "Found us via",
};

function Review({ answers, onEdit }: { answers: Answers; onEdit: (key: string) => void }) {
  return (
    <>
      <h3 className="display text-[clamp(1.7rem,3vw,2.5rem)] leading-tight">All set. Check and send.</h3>
      <dl className="mt-8 border-t border-bone/10">
        {steps.map((s) => (
          <div key={s.key} className="grid grid-cols-[8.5rem_1fr_auto] items-baseline gap-4 border-b border-bone/10 py-3 text-sm">
            <dt className="text-bone/45">{reviewLabels[s.key]}</dt>
            <dd className="line-clamp-2 text-bone/85">{answers[s.key] || "—"}</dd>
            <dd>
              <button type="button" onClick={() => onEdit(s.key)} className="text-xs text-bone/40 hover:text-bone">
                Edit
              </button>
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
}
