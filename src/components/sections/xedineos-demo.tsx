"use client";

import { useEffect, useRef, useState } from "react";
import { cx } from "@/components/ui";

/* ============================================================================
   XEDINEOS — interactive product demo
   ----------------------------------------------------------------------------
   A three-panel walkthrough of the order lifecycle: guest's phone, kitchen
   display, waiter's phone. Steps advance the shared state so all three panels
   stay in sync, the way the real product does.
   ========================================================================== */

type StatusKey =
  | "placed"
  | "accepted"
  | "preparing"
  | "ready"
  | "served";

const STATUS_FLOW: { key: StatusKey; label: string }[] = [
  { key: "placed", label: "Order placed" },
  { key: "accepted", label: "Accepted by the kitchen" },
  { key: "preparing", label: "Being prepared" },
  { key: "ready", label: "Ready" },
  { key: "served", label: "Served" },
];

type Notification = {
  id: string;
  title: string;
  body: string;
  resolved: boolean;
};

type Step = {
  caption: string;
  captionLead: string;
  statusReached: number; // index into STATUS_FLOW, -1 = none yet
  waterRequested: boolean;
  waterResolved: boolean;
  kitchenStage: "none" | "accepted" | "preparing" | "ready";
  notifications: Notification[];
};

const steps: Step[] = [
  {
    captionLead: "Table 4 scans in.",
    caption: "No app to download — the menu opens straight in the guest's browser.",
    statusReached: -1,
    waterRequested: false,
    waterResolved: false,
    kitchenStage: "none",
    notifications: [],
  },
  {
    captionLead: "Order placed.",
    caption: "It goes straight from the guest's phone to the kitchen — no waiter carries it in.",
    statusReached: 0,
    waterRequested: false,
    waterResolved: false,
    kitchenStage: "none",
    notifications: [],
  },
  {
    captionLead: "Lands on the kitchen display.",
    caption: "The ticket is the order — nothing gets copied by hand.",
    statusReached: 0,
    waterRequested: false,
    waterResolved: false,
    kitchenStage: "none",
    notifications: [],
  },
  {
    captionLead: "Accepted.",
    caption: "The kitchen confirms it themselves, and the guest sees it update live.",
    statusReached: 1,
    waterRequested: false,
    waterResolved: false,
    kitchenStage: "accepted",
    notifications: [],
  },
  {
    captionLead: "Being prepared.",
    caption: "The ticket moves itself as the kitchen works through it.",
    statusReached: 2,
    waterRequested: false,
    waterResolved: false,
    kitchenStage: "preparing",
    notifications: [],
  },
  {
    captionLead: "Guest taps Water.",
    caption: "A request with nowhere to go, on most QR menus.",
    statusReached: 2,
    waterRequested: true,
    waterResolved: false,
    kitchenStage: "preparing",
    notifications: [],
  },
  {
    captionLead: "This is the part most QR systems do not have.",
    caption: "The order is only half the job — somebody still has to know the table wants water.",
    statusReached: 2,
    waterRequested: true,
    waterResolved: false,
    kitchenStage: "preparing",
    notifications: [
      { id: "water", title: "Table 4 — water", body: "Tap to say you are on it", resolved: false },
    ],
  },
  {
    captionLead: "Acknowledged in one tap.",
    caption: "The guest sees it, the floor moves on — nobody had to walk over to check.",
    statusReached: 2,
    waterRequested: true,
    waterResolved: true,
    kitchenStage: "preparing",
    notifications: [
      { id: "water", title: "Table 4 — water", body: "Tap to say you are on it", resolved: true },
    ],
  },
  {
    captionLead: "Ready.",
    caption: "The kitchen marks the plate done the second it's up.",
    statusReached: 3,
    waterRequested: true,
    waterResolved: true,
    kitchenStage: "ready",
    notifications: [
      { id: "water", title: "Table 4 — water", body: "Tap to say you are on it", resolved: true },
    ],
  },
  {
    captionLead: "The floor is told the same way.",
    caption: "Automatically, the instant the kitchen says the plate is up.",
    statusReached: 3,
    waterRequested: true,
    waterResolved: true,
    kitchenStage: "ready",
    notifications: [
      { id: "water", title: "Table 4 — water", body: "Tap to say you are on it", resolved: true },
      { id: "food", title: "Table 4 — food ready", body: "Kacchi Biryani, Borhani", resolved: false },
    ],
  },
  {
    captionLead: "Food ready.",
    caption: "The floor is told automatically — that is Autopilot.",
    statusReached: 3,
    waterRequested: true,
    waterResolved: true,
    kitchenStage: "ready",
    notifications: [
      { id: "water", title: "Table 4 — water", body: "Tap to say you are on it", resolved: true },
      { id: "food", title: "Table 4 — food ready", body: "Kacchi Biryani, Borhani", resolved: false },
    ],
  },
];

const TOTAL = steps.length;

export function XedineosDemo() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!playing) return;
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1 >= TOTAL ? 0 : i + 1));
    }, 2100);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [playing]);

  const step = steps[index];

  function handleStep() {
    setPlaying(false);
    setIndex((i) => (i + 1 >= TOTAL ? 0 : i + 1));
  }

  return (
    <div className="grain relative bg-ink-800 p-6 md:p-10">
      <div className="grid gap-6 md:grid-cols-3 md:gap-5">
        <GuestPanel step={step} />
        <KitchenPanel step={step} />
        <WaiterPanel step={step} />
      </div>

      {/* --------------------------------------------------------- controls */}
      <div className="mt-8 border-t border-bone/12 pt-6">
        <div className="flex flex-wrap items-center gap-4 md:gap-6">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-bone/25 px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.14em] text-bone transition-colors duration-300 hover:border-bone/50"
          >
            {playing ? "Pause" : "Play"}
          </button>
          <button
            type="button"
            onClick={handleStep}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-bone/25 px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.14em] text-bone transition-colors duration-300 hover:border-bone/50"
          >
            Step <span aria-hidden="true">→</span>
          </button>

          <p className="pretty min-w-0 flex-1 text-sm leading-relaxed text-bone/70">
            <span className="font-medium text-bone">{step.captionLead}</span>{" "}
            {step.caption}
          </p>

          <span className="eyebrow shrink-0 text-bone/40">
            {String(index + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
          </span>
        </div>

        <div className="mt-5 h-px w-full bg-bone/10">
          <div
            className="h-px bg-[#E8A33D] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ width: `${((index + 1) / TOTAL) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ phone shell */

function PhoneFrame({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="eyebrow mb-3 text-center text-bone/40">{label}</p>
      <div className="mx-auto w-full max-w-[280px] rounded-[2rem] border border-bone/15 bg-ink p-2">
        <div className="rounded-[1.6rem] bg-ink-700 p-4">{children}</div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- guest UI */

function GuestPanel({ step }: { step: Step }) {
  return (
    <PhoneFrame label="Guest's phone">
      <div className="mb-3 h-1 w-10 mx-auto rounded-full bg-bone/15" />

      <div className="flex items-start justify-between">
        <div>
          <h3 className="display text-xl leading-none text-bone">Kacchi Bhai</h3>
          <p className="eyebrow mt-1.5 text-bone/40">Table 4</p>
        </div>
        <span className="eyebrow shrink-0 text-bone/30">বাং / EN</span>
      </div>

      <ul className="mt-5 space-y-2.5 border-t border-bone/10 pt-4">
        {STATUS_FLOW.map((s, i) => {
          const reached = i <= step.statusReached;
          const isCurrent = i === step.statusReached;
          const isReady = s.key === "ready";
          return (
            <li key={s.key} className="flex items-center gap-2.5 text-[13px]">
              <span
                aria-hidden="true"
                className={cx(
                  "h-1.5 w-1.5 shrink-0 rounded-full",
                  !reached && "bg-bone/20",
                  reached && !isReady && "bg-[#6FCF97]",
                  reached && isReady && isCurrent && "bg-[#E8A33D]",
                  reached && isReady && !isCurrent && "bg-[#6FCF97]",
                )}
              />
              <span className={reached ? "text-bone/85" : "text-bone/35"}>
                {s.label}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="mt-5 grid grid-cols-3 gap-2">
        {(["Water", "Waiter", "Bill"] as const).map((label) => {
          const active = label === "Water" && step.waterRequested && !step.waterResolved;
          return (
            <span
              key={label}
              className={cx(
                "rounded-full border px-2 py-2 text-center text-[11px] font-medium uppercase tracking-[0.08em] transition-colors duration-300",
                active
                  ? "border-[#E8A33D] text-[#E8A33D]"
                  : "border-bone/15 text-bone/55",
              )}
            >
              {label}
            </span>
          );
        })}
      </div>

      {step.statusReached >= 0 && (
        <div className="mt-4 flex items-center justify-between border-t border-bone/10 pt-4">
          <span className="inline-flex items-center gap-2 text-[12px] text-bone/70">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E8A33D] text-[10px] font-semibold text-ink">
              2
            </span>
            ৳650
          </span>
          <span className="eyebrow text-[#E8A33D]">View order →</span>
        </div>
      )}
    </PhoneFrame>
  );
}

/* ----------------------------------------------------------- kitchen UI */

function KitchenPanel({ step }: { step: Step }) {
  const buttons: { key: "accepted" | "preparing" | "ready"; label: string }[] = [
    { key: "accepted", label: "Accepted" },
    { key: "preparing", label: "Preparing" },
    { key: "ready", label: "Ready" },
  ];
  const stageOrder = ["none", "accepted", "preparing", "ready"];
  const reachedIndex = stageOrder.indexOf(step.kitchenStage);

  return (
    <div>
      <p className="eyebrow mb-3 text-center text-bone/40">Kitchen display</p>
      <div className="h-full rounded-2xl border border-bone/15 bg-ink p-5">
        <div className="flex items-center justify-between">
          <span className="eyebrow text-bone/50">Kitchen · Kacchi Bhai</span>
          <span className="eyebrow text-bone/30">19:42</span>
        </div>

        {step.statusReached >= 0 ? (
          <div className="mt-5 rounded-xl border border-[#E8A33D]/40 bg-ink-700 p-4">
            <div className="flex items-center justify-between">
              <h4 className="display text-lg leading-none text-bone">Table 4</h4>
              <span className="eyebrow text-bone/30">just now</span>
            </div>
            <ul className="mt-3 space-y-1.5 text-[13px] text-bone/75">
              <li>1 × Kacchi Biryani — Full plate</li>
              <li className="pl-4 text-bone/45">+ Extra raita</li>
              <li>1 × Borhani</li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              {buttons.map((b, i) => {
                const done = i <= reachedIndex - 1 || step.kitchenStage === b.key;
                return (
                  <span
                    key={b.key}
                    className={cx(
                      "rounded-full border px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.08em] transition-colors duration-300",
                      done
                        ? "border-[#6FCF97]/60 text-[#6FCF97]"
                        : "border-bone/15 text-bone/45",
                    )}
                  >
                    {b.label}
                  </span>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="mt-5 flex h-32 items-center justify-center text-[12px] text-bone/30">
            Waiting for the first order
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ waiter UI */

function WaiterPanel({ step }: { step: Step }) {
  return (
    <PhoneFrame label="Waiter's phone · Locked">
      <div className="text-center">
        <p className="display text-4xl leading-none text-bone">19:42</p>
        <p className="eyebrow mt-2 text-bone/40">Friday, 20 August</p>
      </div>

      <div className="mt-6 space-y-3">
        {step.notifications.length === 0 ? (
          <div className="flex h-24 items-center justify-center text-[12px] text-bone/25">
            No notifications
          </div>
        ) : (
          step.notifications.map((n) => (
            <div
              key={n.id}
              className={cx(
                "rounded-xl border p-3.5 transition-colors duration-300",
                n.resolved
                  ? "border-bone/10 bg-ink-700/60"
                  : "border-[#E8A33D]/50 bg-ink-700",
              )}
            >
              <p
                className={cx(
                  "eyebrow",
                  n.resolved ? "text-bone/30" : "text-[#E8A33D]",
                )}
              >
                Xedineos
              </p>
              <p
                className={cx(
                  "mt-1 text-[13px] font-medium",
                  n.resolved ? "text-bone/40 line-through decoration-bone/25" : "text-bone",
                )}
              >
                {n.title}
              </p>
              <p className="mt-0.5 text-[12px] text-bone/50">{n.body}</p>
            </div>
          ))
        )}
      </div>
    </PhoneFrame>
  );
}

/* ======================================================================
   CARD PREVIEW — a frozen, non-interactive snapshot for the work grid.
   The grid card is a single <Link>, so nothing here can be interactive.
   ====================================================================== */

export function XedineosCardPreview() {
  return (
    <div className="grain absolute inset-0 flex flex-col justify-center gap-3 bg-ink-700 p-5 transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] md:p-6">
      <div className="grid grid-cols-3 gap-2.5">
        <div className="rounded-lg border border-bone/12 bg-ink p-2.5">
          <p className="text-[8px] uppercase tracking-[0.14em] text-bone/35">Guest</p>
          <p className="display mt-1 truncate text-[13px] leading-none text-bone">Kacchi Bhai</p>
          <div className="mt-2 space-y-1">
            {["Placed", "Accepted", "Preparing", "Ready"].map((label, i) => (
              <div key={label} className="flex items-center gap-1.5">
                <span
                  aria-hidden="true"
                  className={cx(
                    "h-1 w-1 shrink-0 rounded-full",
                    i < 3 ? "bg-[#6FCF97]" : "bg-[#E8A33D]",
                  )}
                />
                <span className="truncate text-[9px] text-bone/60">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-[#E8A33D]/30 bg-ink p-2.5">
          <p className="text-[8px] uppercase tracking-[0.14em] text-bone/35">Kitchen</p>
          <p className="display mt-1 text-[13px] leading-none text-bone">Table 4</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {["Accepted", "Preparing", "Ready"].map((label) => (
              <span
                key={label}
                className="rounded-full border border-[#6FCF97]/50 px-1.5 py-0.5 text-[7px] uppercase tracking-[0.06em] text-[#6FCF97]"
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-bone/12 bg-ink p-2.5">
          <p className="text-[8px] uppercase tracking-[0.14em] text-bone/35">Waiter</p>
          <div className="mt-1.5 rounded-md border border-[#E8A33D]/40 bg-ink-700 px-1.5 py-1">
            <p className="text-[7px] font-medium text-bone">Table 4 — food ready</p>
            <p className="truncate text-[7px] text-bone/45">Kacchi Biryani, Borhani</p>
          </div>
        </div>
      </div>

      <p className="pretty max-w-[34ch] text-[11px] leading-snug text-bone/50">
        The order is only half the job — Xedineos tells the floor the rest.
      </p>
    </div>
  );
}
