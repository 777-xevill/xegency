"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import {
  englishOptions,
  experienceOptions,
  role,
  statusOptions,
  yesNo,
} from "@/content/careers";
import { Arrow, cx } from "@/components/ui";

type State = "idle" | "sending" | "sent" | "error";

/** Remembers which Facebook group (or other link) brought the visitor here. */
function sourceFromUrl() {
  if (typeof window === "undefined") return "";
  const p = new URLSearchParams(window.location.search);
  return [p.get("src"), p.get("utm_source"), p.get("utm_campaign")]
    .filter(Boolean)
    .join(" / ");
}

export function ApplyForm() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");
  const [name, setName] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<
      string,
      string
    >;
    data.role = role.slug;
    data.ref = sourceFromUrl();

    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setName(data.name.split(" ")[0] ?? "");
        setState("sent");
        form.reset();
        return;
      }
      const payload = (await res.json().catch(() => ({}))) as { error?: string };
      setState("error");
      setError(payload.error ?? "Something went wrong. Please try again.");
    } catch {
      setState("error");
      setError("Network problem. Check your connection and try again.");
    }
  }

  if (state === "sent") {
    return (
      <div className="border border-bone/15 bg-ink-800 p-10 md:p-14">
        <p className="eyebrow text-stone">Application received</p>
        <h3 className="display mt-5 text-[clamp(1.7rem,3vw,2.5rem)]">
          Thank you{name ? `, ${name}` : ""}.
        </h3>
        <p className="pretty mt-5 max-w-md text-base leading-relaxed text-bone/65">
          We read every application. If you&rsquo;re a fit, we&rsquo;ll call or
          WhatsApp you within three days from a Xegency number. Keep your phone
          close.
        </p>
        <p className="pretty mt-4 max-w-md text-sm leading-relaxed text-bone/45">
          Xegency never asks for money at any stage. If someone does, it
          isn&rsquo;t us.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-9">
      {/* honeypot */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <Group n="01" title="About you">
        <div className="grid gap-8 sm:grid-cols-2">
          <Field label="Full name" name="name" required autoComplete="name" />
          <Field
            label="Phone (WhatsApp)"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="01XXXXXXXXX"
          />
          <Field label="Email" name="email" type="email" optional autoComplete="email" />
          <Field
            label="Area in Dhaka"
            name="area"
            required
            placeholder="Mirpur, Uttara, Gulshan…"
          />
        </div>
      </Group>

      <Group n="02" title="Where you are now">
        <div className="grid gap-8 sm:grid-cols-2">
          <Select label="Right now you are" name="status_now" options={statusOptions} required />
          <Select label="Sales experience" name="experience" options={experienceOptions} required />
          <Select
            label="Can you do 50 calls + 5 meetings a day?"
            name="hours"
            options={yesNo}
            required
          />
          <Select
            label="Can you travel around Dhaka for meetings?"
            name="field_ok"
            options={yesNo}
            required
          />
          <Select label="Your English" name="english" options={englishOptions} required />
        </div>
      </Group>

      <Group n="03" title="Show us how you sell">
        <TextArea
          label="Pitch Xegency in your own words"
          name="pitch"
          required
          minLength={60}
          rows={5}
          hint="Imagine you have 30 seconds with the owner of a garment factory. What do you say? Bangla or English, both are fine."
        />
        <TextArea
          label="Who do you already know?"
          name="network"
          optional
          rows={3}
          hint="Business owners, managers, shops or companies you could introduce us to. This helps a lot, but it's not required."
        />
      </Group>

      <Group n="04" title="Last details">
        <div className="grid gap-8 sm:grid-cols-2">
          <Field
            label="Where did you find this job?"
            name="source"
            placeholder="Facebook group name, a friend…"
            optional
          />
          <Field
            label="CV or LinkedIn link"
            name="cv_link"
            type="url"
            placeholder="https://"
            optional
          />
        </div>
      </Group>

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
            state === "sending" ? "cursor-wait opacity-60" : "hover:bg-stone",
          )}
        >
          {state === "sending" ? "Sending…" : "Send application"}
          <Arrow className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:translate-x-1" />
        </button>
        <p className="max-w-xs text-xs leading-relaxed text-bone/45">
          Your details are used only to review this application. We never ask
          for money at any stage.
        </p>
      </div>
    </form>
  );
}

/* -------------------------------------------------------------- controls */

const inputCls =
  "mt-3 w-full border-0 border-b border-bone/20 bg-transparent pb-3 pt-2 text-base text-bone outline-none transition-colors placeholder:text-bone/30 focus:border-bone user-invalid:border-red-400";

function Group({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <fieldset className="space-y-8 border-t border-bone/12 pt-7">
      <legend className="float-left mb-1 flex w-full items-baseline gap-4">
        <span className="eyebrow text-stone">{n}</span>
        <span className="display text-xl text-bone">{title}</span>
      </legend>
      <div className="clear-both space-y-8">{children}</div>
    </fieldset>
  );
}

function Label({ htmlFor, label, optional }: { htmlFor: string; label: string; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="eyebrow text-bone/50">
      {label}
      {optional && <span className="ml-2 normal-case tracking-normal opacity-60">optional</span>}
    </label>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  optional = false,
  ...rest
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
  autoComplete?: string;
  placeholder?: string;
  pattern?: string;
  title?: string;
}) {
  return (
    <div>
      <Label htmlFor={name} label={label} optional={optional} />
      <input id={name} name={name} type={type} required={required} className={inputCls} {...rest} />
    </div>
  );
}

function Select({
  label,
  name,
  options,
  required = false,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <div>
      <Label htmlFor={name} label={label} />
      <select
        id={name}
        name={name}
        required={required}
        defaultValue=""
        className={cx(inputCls, "appearance-none")}
      >
        <option value="" disabled>
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-ink">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextArea({
  label,
  name,
  hint,
  rows,
  required = false,
  optional = false,
  minLength,
}: {
  label: string;
  name: string;
  hint: string;
  rows: number;
  required?: boolean;
  optional?: boolean;
  minLength?: number;
}) {
  return (
    <div>
      <Label htmlFor={name} label={label} optional={optional} />
      <p id={`${name}-hint`} className="pretty mt-2 max-w-xl text-sm leading-relaxed text-bone/45">
        {hint}
      </p>
      <textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        minLength={minLength}
        maxLength={2000}
        aria-describedby={`${name}-hint`}
        className={cx(inputCls, "resize-y leading-relaxed")}
      />
    </div>
  );
}
