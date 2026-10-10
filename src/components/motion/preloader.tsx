"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
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

      // The four pieces fly in out of the screen in 3D and lock together; the
      // finished mark then turns a full revolution as the curtain lifts.
      tl.from(pieces, {
        z: -520,
        rotationX: 110,
        rotationY: -130,
        scale: 0.25,
        opacity: 0,
        transformOrigin: "50% 50%",
        duration: 1.25,
        ease: "expo.out",
        stagger: 0.13,
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
        .to(mark, { rotationY: 360, scale: 0.82, duration: 1.05, ease: "expo.inOut" }, 1.1)
        .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 1.05, ease: "expo.inOut" }, 1.35)
        .call(markIntroDone, [], 1.45);
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
      {/* The mark as plain boxes so it can fly in 3D (SVG parts can't). Same
          grid as the logo: a 2×2 of squares turned 45°; the top-left one is
          the hollow frame. Positions follow src/lib/logo-geometry.ts. */}
      <div
        className="relative z-10 h-20 w-20 md:h-24 md:w-24"
        style={{ perspective: "800px" }}
      >
        <div
          data-pl-mark
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="absolute left-1/2 top-1/2 h-[70.71%] w-[70.71%] -translate-x-1/2 -translate-y-1/2 rotate-45"
            style={{ transformStyle: "preserve-3d" }}
          >
            {[
              { left: "57%", top: "0%" },
              { left: "0%", top: "57%" },
              { left: "57%", top: "57%" },
            ].map((pos) => (
              <span
                key={pos.left + pos.top}
                data-pl-piece=""
                className="absolute h-[43%] w-[43%] bg-bone"
                style={pos}
              />
            ))}
            <span
              data-pl-piece=""
              className="absolute left-0 top-0 h-[43%] w-[43%] bg-bone"
            >
              <span className="absolute inset-[20.9%] bg-ink" />
            </span>
          </div>
        </div>
      </div>

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
