"use client";

import { useState, type FormEvent } from "react";
import { contact } from "@/content/site";
import { isPlaceholder } from "@/lib/format";
import { Arrow, cx } from "@/components/ui";

const projectTypes = [
  "AI audit",
  "AI agents & automation",
  "AI inside my product",
  "Custom software / SaaS",
  "Website or web app",
  "Mobile app",
  "UI/UX & brand",
  "Cloud, DevOps & integrations",
  "Care retainer",
  "Not sure yet",
];

const budgets = [
  "Under $2,000",
  "$2,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000 – $25,000",
  "$25,000+",
  "Need guidance",
];

const timelines = [
  "As soon as possible",
  "Within a month",
  "One to three months",
  "Just planning ahead",
];

type State = "idle" | "sending" | "sent" | "mailto" | "error";

export function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(
      new FormData(form).entries(),
    ) as Record<string, string>;

    setState("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setState("sent");
        form.reset();
        return;
      }

      const payload = (await res.json().catch(() => ({}))) as {
        reason?: string;
        error?: string;
      };

      // No inbox wired up yet — hand the visitor a pre-filled email instead of
      // an error, so the enquiry still reaches you.
      if (payload.reason === "not-configured") {
        const target = isPlaceholder(contact.email)
          ? null
          : contact.email;

        if (target) {
          const body = [
            `Name: ${data.name}`,
            `Email: ${data.email}`,
            data.company && `Company: ${data.company}`,
            data.projectType && `Project: ${data.projectType}`,
            data.budget && `Budget: ${data.budget}`,
            data.timeline && `Timeline: ${data.timeline}`,
            "",
            data.message,
          ]
            .filter(Boolean)
            .join("\n");

          window.location.href = `mailto:${target}?subject=${encodeURIComponent(
            `New enquiry — ${data.name}`,
          )}&body=${encodeURIComponent(body)}`;
          setState("mailto");
          return;
        }

        setState("error");
        setError(
          "This form isn't connected to an inbox yet. Set CONTACT_WEBHOOK_URL and a real email address in src/content/site.ts.",
        );
        return;
      }

      setState("error");
      setError(payload.error ?? "Something went wrong. Please try again.");
    } catch {
      setState("error");
      setError("Network problem. Check your connection and try again.");
    }
  }

  if (state === "sent" || state === "mailto") {
    return (
      <div className="border border-bone/15 bg-ink-800 p-10 md:p-14">
        <p className="eyebrow text-stone">
          {state === "sent" ? "Message sent" : "Almost there"}
        </p>
        <h3 className="display mt-5 text-[clamp(1.7rem,3vw,2.5rem)]">
          {state === "sent"
            ? "Thanks — that's landed."
            : "Your email app should be open."}
        </h3>
        <p className="pretty mt-5 max-w-md text-base leading-relaxed text-bone/65">
          {state === "sent"
            ? "You'll get a reply within one business day, from a person, with actual thoughts on your project."
            : "Send the message that's been prepared for you and it'll reach the studio the same way."}
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="link-sweep eyebrow mt-8 inline-flex items-center gap-2 text-bone"
        >
          Send another
          <Arrow />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8" noValidate>
      {/* honeypot */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="Your name" name="name" required autoComplete="name" />
        <Field
          label="Email"
          name="email"
          type="email"
          required
          autoComplete="email"
        />
      </div>

      <Field
        label="Company or project"
        name="company"
        autoComplete="organization"
        optional
      />

      <div className="grid gap-8 sm:grid-cols-3">
        <Select label="What you need" name="projectType" options={projectTypes} />
        <Select label="Budget" name="budget" options={budgets} />
        <Select label="Timeline" name="timeline" options={timelines} />
      </div>

      <div>
        <label htmlFor="message" className="eyebrow text-bone/50">
          What are you trying to do?
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="The business, what's not working on the current site, and what a good outcome looks like."
          className="mt-3 w-full resize-y border-0 border-b border-bone/20 bg-transparent pb-3 pt-2 text-base leading-relaxed text-bone outline-none transition-colors placeholder:text-bone/30 focus:border-bone"
        />
      </div>

      {state === "error" && (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-5 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={state === "sending"}
          className={cx(
            "group inline-flex items-center justify-center gap-3 bg-bone px-9 py-4 text-[12px] font-medium uppercase tracking-[0.16em] text-ink transition-colors duration-300",
            state === "sending"
              ? "cursor-wait opacity-60"
              : "hover:bg-stone",
          )}
        >
          {state === "sending" ? "Sending…" : "Send enquiry"}
          <Arrow className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1" />
        </button>

        <p className="max-w-xs text-xs leading-relaxed text-bone/45">
          Your details are used to reply to this enquiry and nothing else. No
          list, no newsletter, no sharing.
        </p>
      </div>
    </form>
  );
}

/* -------------------------------------------------------------- controls */

function Field({
  label,
  name,
  type = "text",
  required = false,
  optional = false,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow text-bone/50">
        {label}
        {optional && <span className="ml-2 normal-case tracking-normal opacity-60">optional</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="mt-3 w-full border-0 border-b border-bone/20 bg-transparent pb-3 pt-2 text-base text-bone outline-none transition-colors focus:border-bone"
      />
    </div>
  );
}

function Select({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow text-bone/50">
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue=""
        className="mt-3 w-full appearance-none border-0 border-b border-bone/20 bg-transparent pb-3 pt-2 text-base text-bone outline-none transition-colors focus:border-bone"
      >
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
