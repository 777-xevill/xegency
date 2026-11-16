"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { stages, type StageKey } from "@/content/careers";
import {
  callScript,
  careersUrl,
  commentReply,
  groupSearches,
  postBn,
  postEn,
  postingRules,
  scorecard,
  trialWeek,
  whatsapp,
} from "@/content/hiring-playbook";
import { cx } from "@/components/ui";

type Application = {
  id: number;
  created_at: string;
  name: string;
  phone: string;
  email: string | null;
  area: string | null;
  status_now: string | null;
  experience: string | null;
  hours: string | null;
  field_ok: string | null;
  english: string | null;
  pitch: string | null;
  network: string | null;
  source: string | null;
  cv_link: string | null;
  stage: StageKey;
  score: number | null;
  notes: string | null;
};

const KEY = "xegency-hiring-key";

function readKey() {
  try {
    return localStorage.getItem(KEY) ?? "";
  } catch {
    return "";
  }
}

function waLink(phone: string, text: string) {
  return `https://wa.me/88${phone}?text=${encodeURIComponent(text)}`;
}

export function HiringDashboard() {
  const [key, setKey] = useState("");
  const [apps, setApps] = useState<Application[] | null>(null);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"pipeline" | "playbook">("pipeline");

  const load = useCallback(async (k: string) => {
    try {
      const res = await fetch("/api/hiring", { headers: { Authorization: `Bearer ${k}` } });
      setError("");
      const data = (await res.json()) as { applications?: Application[]; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Couldn't load applications.");
      setApps(data.applications ?? []);
      setKey(k);
      try {
        localStorage.setItem(KEY, k);
      } catch {}
    } catch (e) {
      setApps(null);
      setError(e instanceof Error ? e.message : "Couldn't load applications.");
    }
  }, []);

  useEffect(() => {
    const k = readKey();
    // Auto-sign-in with the saved key once the page has mounted.
    if (k) void Promise.resolve().then(() => load(k));
  }, [load]);

  if (apps === null) {
    return (
      <form
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          void load(key);
        }}
        className="mx-auto max-w-md"
      >
        <p className="eyebrow text-stone">Hiring dashboard</p>
        <h1 className="display mt-4 text-4xl">Private</h1>
        <label htmlFor="key" className="eyebrow mt-10 block text-bone/50">
          Access key
        </label>
        <input
          id="key"
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="mt-3 w-full border-0 border-b border-bone/20 bg-transparent pb-3 pt-2 text-base text-bone outline-none focus:border-bone"
        />
        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
        <button type="submit" className="mt-8 bg-bone px-8 py-3 text-[12px] font-medium uppercase tracking-[0.16em] text-ink hover:bg-stone">
          Open
        </button>
      </form>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow text-stone">Hiring · Business Development Executive</p>
          <h1 className="display mt-3 text-[clamp(2rem,4vw,3rem)]">Recruiting</h1>
        </div>
        <div className="flex gap-2">
          {(["pipeline", "playbook"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cx(
                "px-4 py-2 text-[12px] uppercase tracking-[0.14em]",
                tab === t ? "bg-bone text-ink" : "border border-bone/20 text-bone/70 hover:text-bone",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {tab === "pipeline" ? (
        <Pipeline apps={apps} keyValue={key} reload={() => load(key)} />
      ) : (
        <Playbook />
      )}
    </div>
  );
}

/* --------------------------------------------------------------- pipeline */

function Pipeline({
  apps,
  keyValue,
  reload,
}: {
  apps: Application[];
  keyValue: string;
  reload: () => Promise<void>;
}) {
  const [filter, setFilter] = useState<StageKey | "all">("new");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<number | null>(null);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: apps.length };
    for (const a of apps) c[a.stage] = (c[a.stage] ?? 0) + 1;
    return c;
  }, [apps]);

  const sources = useMemo(() => {
    const c = new Map<string, number>();
    for (const a of apps) {
      const s = (a.source ?? "Unknown").replace(/\s*\(link:.*\)$/, "") || "Unknown";
      c.set(s, (c.get(s) ?? 0) + 1);
    }
    return [...c.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
  }, [apps]);

  const shown = apps.filter((a) => {
    if (filter !== "all" && a.stage !== filter) return false;
    if (!query) return true;
    const q = query.toLowerCase();
    return [a.name, a.phone, a.area, a.source].some((v) => v?.toLowerCase().includes(q));
  });

  function exportCsv() {
    const cols = Object.keys(apps[0] ?? {}) as (keyof Application)[];
    const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const csv = [cols.join(","), ...apps.map((a) => cols.map((c) => esc(a[c])).join(","))].join("\n");
    const url = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `xegency-applicants-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mt-10">
      <div className="flex flex-wrap gap-2">
        {[{ key: "all" as const, label: "All" }, ...stages].map((s) => (
          <button
            key={s.key}
            type="button"
            onClick={() => setFilter(s.key)}
            className={cx(
              "flex items-center gap-2 px-3.5 py-2 text-sm",
              filter === s.key ? "bg-bone text-ink" : "bg-ink-800 text-bone/70 hover:text-bone",
            )}
          >
            {s.label}
            <span className="tabular-nums opacity-60">{counts[s.key] ?? 0}</span>
          </button>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <input
          type="search"
          placeholder="Search name, phone, area, source…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="min-w-0 flex-1 border-0 border-b border-bone/20 bg-transparent py-2 text-sm text-bone outline-none placeholder:text-bone/30 focus:border-bone"
        />
        <button type="button" onClick={() => void reload()} className="text-sm text-bone/60 hover:text-bone">
          Refresh
        </button>
        <button type="button" onClick={exportCsv} className="text-sm text-bone/60 hover:text-bone">
          Export CSV
        </button>
      </div>

      {sources.length > 0 && (
        <p className="mt-4 text-xs text-bone/45">
          Top sources:{" "}
          {sources.map(([s, n]) => `${s} (${n})`).join(" · ")}
        </p>
      )}

      <ul className="mt-6 border-t border-bone/10">
        {shown.length === 0 && <li className="py-10 text-sm text-bone/45">No applicants here yet.</li>}
        {shown.map((a) => (
          <li key={a.id} className="border-b border-bone/10">
            <button
              type="button"
              onClick={() => setOpen(open === a.id ? null : a.id)}
              className="grid w-full grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 py-4 text-left md:grid-cols-[2fr_1fr_1fr_1fr_auto]"
            >
              <span className="text-base text-bone">{a.name}</span>
              <span className="text-xs tabular-nums text-bone/45 md:order-last">
                {a.created_at.slice(0, 10)}
              </span>
              <span className="text-sm text-bone/55">{a.area}</span>
              <span className="text-sm text-bone/55">{a.experience}</span>
              <span className="text-sm text-bone/55">
                {stages.find((s) => s.key === a.stage)?.label}
                {a.score != null && <span className="ml-2 text-stone">{a.score}/25</span>}
              </span>
            </button>
            {open === a.id && <Detail app={a} keyValue={keyValue} reload={reload} />}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Detail({
  app,
  keyValue,
  reload,
}: {
  app: Application;
  keyValue: string;
  reload: () => Promise<void>;
}) {
  const [stage, setStage] = useState<StageKey>(app.stage);
  const [notes, setNotes] = useState(app.notes ?? "");
  const [marks, setMarks] = useState<Record<string, number>>({});
  const [saving, setSaving] = useState(false);
  const total = Object.values(marks).reduce((s, n) => s + n, 0);
  const scored = Object.keys(marks).length === scorecard.length;
  const first = app.name.split(" ")[0];

  async function save() {
    setSaving(true);
    const body: Record<string, unknown> = { stage, notes };
    if (scored) body.score = total;
    await fetch(`/api/hiring/${app.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${keyValue}` },
      body: JSON.stringify(body),
    });
    setSaving(false);
    await reload();
  }

  const facts: [string, string | null][] = [
    ["Phone", app.phone],
    ["Email", app.email],
    ["Now", app.status_now],
    ["Can do targets", app.hours],
    ["Field meetings", app.field_ok],
    ["English", app.english],
    ["Source", app.source],
  ];

  return (
    <div className="grid gap-10 pb-8 lg:grid-cols-2">
      <div className="space-y-6">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
          {facts.map(([k, v]) => (
            <div key={k}>
              <dt className="text-bone/40">{k}</dt>
              <dd className="text-bone/85">{v || "—"}</dd>
            </div>
          ))}
          {app.cv_link && (
            <div>
              <dt className="text-bone/40">CV</dt>
              <dd>
                <a href={app.cv_link} target="_blank" rel="noopener noreferrer" className="link-sweep text-bone">
                  Open
                </a>
              </dd>
            </div>
          )}
        </dl>
        <div>
          <p className="eyebrow text-bone/45">Their pitch</p>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-bone/80">{app.pitch}</p>
        </div>
        {app.network && (
          <div>
            <p className="eyebrow text-bone/45">Who they know</p>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-bone/80">{app.network}</p>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div className="flex flex-wrap gap-2">
          <a href={`tel:${app.phone}`} className="border border-bone/20 px-3 py-2 text-sm text-bone hover:bg-bone hover:text-ink">
            Call
          </a>
          {whatsapp.map((m) => (
            <a
              key={m.stage}
              href={waLink(app.phone, m.text.replaceAll("{name}", first))}
              target="_blank"
              rel="noopener noreferrer"
              className={cx(
                "px-3 py-2 text-sm",
                m.stage === app.stage
                  ? "bg-[#25d366] text-ink"
                  : "border border-bone/15 text-bone/60 hover:text-bone",
              )}
            >
              WhatsApp: {m.label}
            </a>
          ))}
        </div>

        <div>
          <p className="eyebrow text-bone/45">Interview scorecard (1–5 each)</p>
          <ul className="mt-3 space-y-2">
            {scorecard.map((c) => (
              <li key={c.key} className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm text-bone/80" title={c.hint}>
                  {c.label}
                </span>
                <span className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setMarks((m) => ({ ...m, [c.key]: n }))}
                      className={cx(
                        "h-7 w-7 text-xs tabular-nums",
                        marks[c.key] === n ? "bg-bone text-ink" : "bg-ink-800 text-bone/60 hover:text-bone",
                      )}
                    >
                      {n}
                    </button>
                  ))}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-bone/45">
            {scored ? `Total ${total}/25. 18+ is a strong yes.` : app.score != null ? `Saved score: ${app.score}/25` : "Score all five to save a total."}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-[auto_1fr]">
          <label className="text-sm text-bone/50">
            Stage
            <select
              value={stage}
              onChange={(e) => setStage(e.target.value as StageKey)}
              className="mt-1 block w-full bg-ink-800 px-3 py-2 text-sm text-bone"
            >
              {stages.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm text-bone/50">
            Notes
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="mt-1 block w-full bg-ink-800 px-3 py-2 text-sm text-bone"
            />
          </label>
        </div>
        <button
          type="button"
          disabled={saving}
          onClick={() => void save()}
          className="bg-bone px-6 py-2.5 text-[12px] font-medium uppercase tracking-[0.14em] text-ink hover:bg-stone disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save"}
        </button>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- playbook */

function Copy({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        void navigator.clipboard.writeText(text).then(() => {
          setDone(true);
          setTimeout(() => setDone(false), 1500);
        });
      }}
      className="border border-bone/20 px-3 py-1.5 text-xs uppercase tracking-[0.12em] text-bone/80 hover:bg-bone hover:text-ink"
    >
      {done ? "Copied" : "Copy"}
    </button>
  );
}

function Block({ title, text }: { title: string; text: string }) {
  return (
    <div className="border border-bone/12">
      <div className="flex items-center justify-between border-b border-bone/12 px-4 py-3">
        <p className="eyebrow text-bone/60">{title}</p>
        <Copy text={text} />
      </div>
      <pre className="whitespace-pre-wrap px-4 py-4 font-sans text-sm leading-relaxed text-bone/80">{text}</pre>
    </div>
  );
}

function Playbook() {
  const [group, setGroup] = useState("");
  const slug = group.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const link = slug ? `${careersUrl}?src=${slug}` : careersUrl;
  const fill = (t: string) => t.replaceAll("{link}", link);

  return (
    <div className="mt-10 space-y-14">
      <section>
        <h2 className="display text-2xl">1. Facebook group posts</h2>
        <label className="mt-5 block max-w-md text-sm text-bone/50">
          Group name (adds a tracking tag to the link)
          <input
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            placeholder="e.g. Jobs in Dhaka"
            className="mt-1 block w-full border-0 border-b border-bone/20 bg-transparent py-2 text-bone outline-none focus:border-bone"
          />
        </label>
        <p className="mt-2 break-all text-xs text-bone/45">{link}</p>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Block title="Post · Bangla" text={fill(postBn)} />
          <Block title="Post · English" text={fill(postEn)} />
        </div>
        <div className="mt-6 max-w-2xl">
          <Block title="Reply to every comment" text={fill(commentReply)} />
        </div>
        <div className="mt-8 grid gap-10 md:grid-cols-2">
          <div>
            <p className="eyebrow text-bone/45">Groups to search for</p>
            <ul className="mt-3 space-y-1.5 text-sm text-bone/75">
              {groupSearches.map((g) => (
                <li key={g}>
                  <a
                    href={`https://www.facebook.com/search/groups/?q=${encodeURIComponent(g.replace(/\s*\(.*\)$/, ""))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-sweep"
                  >
                    {g}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-bone/45">Posting rules</p>
            <ul className="mt-3 list-disc space-y-1.5 pl-4 text-sm text-bone/75">
              {postingRules.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="display text-2xl">2. Phone call script (10 min)</h2>
        <ol className="mt-5 max-w-3xl list-decimal space-y-2 pl-5 text-sm leading-relaxed text-bone/75">
          {callScript.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="display text-2xl">3. Interview (30 min)</h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-bone/75">
          Play the owner of a garment factory with 800 workers whose production
          numbers live in Excel files. The candidate gets 10 minutes to pitch:
          opening, questions about your business, showing relevant work and
          asking for the next meeting. Then 10 minutes of feedback and a second
          try, to see how they take coaching. Score each criterion 1–5 on the
          applicant&rsquo;s card.
        </p>
        <ul className="mt-5 grid max-w-3xl gap-3 sm:grid-cols-2">
          {scorecard.map((c) => (
            <li key={c.key} className="border-l border-bone/20 pl-4 text-sm">
              <span className="text-bone">{c.label}</span>
              <span className="block text-bone/50">{c.hint}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="display text-2xl">4. Trial week</h2>
        <ol className="mt-5 max-w-3xl space-y-3">
          {trialWeek.map((d) => (
            <li key={d.day} className="grid grid-cols-[5rem_1fr] gap-4 text-sm">
              <span className="text-stone">{d.day}</span>
              <span className="leading-relaxed text-bone/75">{d.body}</span>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="display text-2xl">5. WhatsApp messages</h2>
        <p className="mt-3 text-sm text-bone/50">
          These are also one-tap buttons on every applicant&rsquo;s card, with
          their name filled in.
        </p>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {whatsapp.map((m) => (
            <Block key={m.stage} title={m.label} text={m.text} />
          ))}
        </div>
      </section>
    </div>
  );
}
