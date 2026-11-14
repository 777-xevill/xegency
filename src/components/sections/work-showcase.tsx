"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Arrow, cx } from "@/components/ui";

export type Slide = {
  slug: string;
  title: string;
  client: string;
  sector: string;
  summary: string;
  tag: string;
  panel: ReactNode;
};

/** How long each project stays on stage before the next one takes over. */
const DWELL_MS = 8000;

/**
 * Work, as a live stage. A numbered index sits beside a screen that plays the
 * active project's own demo; it advances by itself (a rail fills along the
 * active row) and stops while you hover, focus, or aren't looking at it.
 * Pick any row to jump straight to that project.
 */
export function WorkShowcase({ slides }: { slides: Slide[] }) {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const next = useCallback(() => {
    // With reduced motion the rail finishes instantly; auto-advancing would
    // flip projects nonstop, so selection stays manual there.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setActive((i) => (i + 1) % slides.length);
  }, [slides.length]);

  const playing = visible && !held;
  const slide = slides[active];

  return (
    <div
      ref={root}
      className="mt-14 grid gap-8 md:mt-20 lg:grid-cols-12 lg:gap-12"
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
    >
      {/* ------------------------------------------------------------ stage */}
      <div className="lg:order-2 lg:col-span-7">
        <div data-reveal="" className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(60%_60%_at_50%_50%,rgba(122,109,94,0.22),transparent_75%)] blur-2xl"
          />
          <div className="border border-bone/15 bg-ink p-2 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] md:p-3">
            {/* window chrome */}
            <div className="flex items-center gap-2 px-2 pb-2 md:px-1 md:pb-3">
              <span className="h-2 w-2 rounded-full bg-bone/20" />
              <span className="h-2 w-2 rounded-full bg-bone/20" />
              <span className="h-2 w-2 rounded-full bg-bone/20" />
              <span className="eyebrow ml-3 truncate text-bone/40">
                {slide.client}
                <span className="text-bone/25"> &nbsp;/&nbsp; </span>
                {slide.tag}
              </span>
              <span className="eyebrow ml-auto flex shrink-0 items-center gap-2 text-bone/50">
                <span
                  className={cx(
                    "h-1.5 w-1.5 rounded-full bg-emerald-400",
                    playing && "pv-pulse",
                  )}
                />
                Live demo
              </span>
            </div>

            <Link
              href={`/work/${slide.slug}`}
              aria-label={`Open the ${slide.client} project`}
              className="group relative block aspect-[4/3] overflow-hidden bg-ink-800 sm:aspect-[16/10]"
            >
              {/* keyed so the demo restarts from its first frame on every switch */}
              <div key={slide.slug} className="pv-stage-in absolute inset-0">
                {slide.panel}
              </div>
              <span className="absolute bottom-4 right-4 z-10 flex h-11 w-11 items-center justify-center bg-bone text-ink opacity-0 transition-all duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                <Arrow className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------ index */}
      <ol className="lg:order-1 lg:col-span-5">
        {slides.map((s, i) => {
          const on = i === active;
          return (
            <li key={s.slug} className="border-t border-bone/10 last:border-b">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-current={on ? "true" : undefined}
                className="group relative flex w-full items-baseline gap-4 py-5 text-left md:gap-6 md:py-6"
              >
                <span
                  className={cx(
                    "eyebrow w-7 shrink-0 tabular-nums transition-colors duration-500",
                    on ? "text-bone" : "text-bone/35 group-hover:text-bone/70",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={cx(
                      "display block text-[clamp(1.35rem,2.3vw,2rem)] leading-tight transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      on
                        ? "translate-x-0 text-bone"
                        : "text-bone/40 group-hover:translate-x-1 group-hover:text-bone/75",
                    )}
                  >
                    {s.client}
                  </span>
                  <span className="eyebrow mt-1.5 block text-stone">
                    {s.sector}
                  </span>

                  {/* the active row opens to show what it is */}
                  <span
                    className={cx(
                      "grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      on
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <span className="overflow-hidden">
                      <span className="pretty mt-4 block max-w-md text-sm leading-relaxed text-bone/60">
                        {s.summary}
                      </span>
                      <Link
                        href={`/work/${s.slug}`}
                        tabIndex={on ? 0 : -1}
                        onClick={(e) => e.stopPropagation()}
                        className="link-sweep eyebrow mt-5 inline-flex items-center gap-2 text-bone"
                      >
                        See the project
                        <Arrow />
                      </Link>
                    </span>
                  </span>
                </span>
              </button>

              {/* the rail: fills while the project is on stage, then hands over */}
              <span className="relative block h-px w-full bg-transparent">
                {on && (
                  <span
                    key={`rail-${active}`}
                    aria-hidden="true"
                    onAnimationEnd={next}
                    className="absolute inset-x-0 -top-px block h-[2px] origin-left bg-bone"
                    style={{
                      animation: `pv-rail ${DWELL_MS}ms linear forwards`,
                      animationPlayState: playing ? "running" : "paused",
                    }}
                  />
                )}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
