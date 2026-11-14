"use client";

/**
 * Previous / next buttons for a `data-marquee` loop in the same section.
 * They send a nudge (px) the motion layer eases into the track, so people can
 * browse the logos by hand while the loop keeps running underneath.
 */
const STEP = 320;

export function MarqueeArrows({ label }: { label: string }) {
  const nudge = (e: React.MouseEvent<HTMLButtonElement>, dir: 1 | -1) => {
    const marquee = e.currentTarget
      .closest("section")
      ?.querySelector("[data-marquee]");
    marquee?.dispatchEvent(
      new CustomEvent("marquee-nudge", { detail: dir * STEP }),
    );
  };

  const btn =
    "flex h-9 w-9 items-center justify-center border border-bone/20 text-bone/70 transition-colors duration-300 hover:border-bone/60 hover:bg-bone hover:text-ink focus-visible:border-bone/60";

  return (
    <div className="flex shrink-0 gap-2" role="group" aria-label={label}>
      <button
        type="button"
        aria-label="Show previous companies"
        onClick={(e) => nudge(e, -1)}
        className={btn}
      >
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M10 3 5 8l5 5" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Show next companies"
        onClick={(e) => nudge(e, 1)}
        className={btn}
      >
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="m6 3 5 5-5 5" />
        </svg>
      </button>
    </div>
  );
}
