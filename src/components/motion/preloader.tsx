"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MARK } from "@/lib/logo-geometry";
import { getLenis, markIntroDone } from "@/lib/motion";

/**
 * First-visit intro. The inline script in the root layout adds `intro` to
 * <html> before first paint when this tab hasn't seen it yet (and motion is
 * allowed); CSS only shows the overlay while that class is present, so repeat
 * visits never flash it. The mark assembles, the counter runs, and the panel
 * retracts upward as the hero animates in underneath.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const el = root.current;
    if (!el || !html.classList.contains("intro")) {
      markIntroDone();
      return;
    }

    window.scrollTo(0, 0);
    const pieces = el.querySelectorAll("[data-pl-piece]");
    const mark = el.querySelector("[data-pl-mark]");
    const count = el.querySelector<HTMLElement>("[data-pl-count]");
    const bar = el.querySelector("[data-pl-bar]");
    const state = { value: 0 };

    // A context so StrictMode's mount/unmount/mount in dev reverts the
    // from-states instead of animating 0 → 0 on the second pass.
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          html.classList.remove("intro");
          try {
            sessionStorage.setItem("xg-intro", "1");
          } catch {}
          getLenis()?.start();
        },
      });

      tl.from(pieces, {
        scale: 0,
        rotate: -90,
        opacity: 0,
        transformOrigin: "50% 50%",
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.11,
      })
        .to(
          state,
          {
            value: 100,
            duration: 1.3,
            ease: "power2.inOut",
            onUpdate: () => {
              if (count) count.textContent = String(Math.round(state.value)).padStart(3, "0");
            },
          },
          0,
        )
        .fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: 1.3, ease: "power2.inOut" }, 0)
        .to(mark, { rotate: 90, scale: 0.8, duration: 0.9, ease: "expo.inOut" }, 1.1)
        .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 1.05, ease: "expo.inOut" }, 1.3)
        .call(markIntroDone, [], 1.42);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="preloader grain fixed inset-0 z-[100] flex-col items-center justify-center bg-ink text-bone"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <svg data-pl-mark viewBox="0 0 100 100" className="relative z-10 h-16 w-16 md:h-20 md:w-20">
        <g transform={MARK.transform} fill="currentColor">
          {MARK.solid.map((d) => (
            <path key={d} data-pl-piece d={d} />
          ))}
          <rect
            data-pl-piece
            x={MARK.outline.x}
            y={MARK.outline.y}
            width={MARK.outline.size}
            height={MARK.outline.size}
            fill="none"
            stroke="currentColor"
            strokeWidth={MARK.outline.stroke}
          />
        </g>
      </svg>

      <div className="absolute inset-x-6 bottom-8 z-10 flex items-end justify-between md:inset-x-10 md:bottom-10 lg:inset-x-14">
        <span className="eyebrow text-stone">Xegency</span>
        <span
          data-pl-count
          className="display text-[clamp(3.5rem,9vw,7rem)] leading-none tabular-nums text-bone"
        >
          000
        </span>
      </div>
      <span
        data-pl-bar
        className="absolute inset-x-0 bottom-0 z-10 h-px origin-left bg-bone/40"
      />
    </div>
  );
}
