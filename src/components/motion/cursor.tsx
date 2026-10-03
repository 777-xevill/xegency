"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";

const INTERACTIVE =
  "a, button, [role='button'], summary, label, select, [data-magnetic]";

/**
 * A two-part cursor: a precise dot plus a trailing ring, blended with
 * `difference` so it inverts over both ink and bone sections. Hovering an
 * element with data-cursor="Label" swaps the ring for a labelled disc.
 * Only mounts for fine pointers and when motion is allowed.
 */
export function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const disc = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return;
    const el = root.current;
    const d = dot.current;
    const r = ring.current;
    const c = disc.current;
    const l = label.current;
    if (!el || !d || !r || !c || !l) return;

    const html = document.documentElement;
    html.classList.add("has-cursor");

    gsap.set([d, r, c], { xPercent: -50, yPercent: -50 });
    gsap.set(c, { scale: 0 });
    const dotX = gsap.quickTo(d, "x", { duration: 0.12, ease: "power3.out" });
    const dotY = gsap.quickTo(d, "y", { duration: 0.12, ease: "power3.out" });
    const ringX = gsap.quickTo(r, "x", { duration: 0.55, ease: "power3.out" });
    const ringY = gsap.quickTo(r, "y", { duration: 0.55, ease: "power3.out" });
    const discX = gsap.quickTo(c, "x", { duration: 0.45, ease: "power3.out" });
    const discY = gsap.quickTo(c, "y", { duration: 0.45, ease: "power3.out" });

    let visible = false;
    let mode: "idle" | "hover" | "label" | "hidden" = "idle";

    const setMode = (next: typeof mode, text = "", force = false) => {
      if (!force && next === mode && next !== "label") return;
      mode = next;
      gsap.to(r, {
        scale: next === "hover" ? 1.9 : next === "idle" ? 1 : 0.2,
        opacity: next === "hover" || next === "idle" ? 1 : 0,
        duration: 0.5,
        ease: "expo.out",
      });
      gsap.to(d, {
        scale: next === "label" || next === "hidden" ? 0 : next === "hover" ? 0.5 : 1,
        duration: 0.4,
        ease: "expo.out",
      });
      if (next === "label") l.textContent = text;
      gsap.to(c, {
        scale: next === "label" ? 1 : 0,
        duration: 0.55,
        ease: "expo.out",
      });
    };

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!visible) {
        visible = true;
        gsap.set([d, r, c], { x: e.clientX, y: e.clientY });
        gsap.to(el, { opacity: 1, duration: 0.3 });
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
      discX(e.clientX);
      discY(e.clientY);
    };

    const over = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (!target?.closest) return;
      const labelled = target.closest<HTMLElement>("[data-cursor]");
      if (labelled) {
        const text = labelled.dataset.cursor ?? "";
        setMode(text === "hide" ? "hidden" : "label", text);
        return;
      }
      setMode(target.closest(INTERACTIVE) ? "hover" : "idle");
    };

    const leaveWindow = () => {
      visible = false;
      gsap.to(el, { opacity: 0, duration: 0.3 });
    };
    const down = () => gsap.to([d, r], { scale: "*=0.8", duration: 0.2 });
    const up = () => setMode(mode, label.current?.textContent ?? "", true);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leaveWindow);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);

    return () => {
      html.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leaveWindow);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      gsap.killTweensOf([el, d, r, c]);
    };
  }, []);

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="cursor pointer-events-none fixed inset-0 z-[95] opacity-0"
    >
      <div className="absolute inset-0 mix-blend-difference">
        <div
          ref={ring}
          className="absolute left-0 top-0 h-9 w-9 rounded-full border border-bone/70"
        />
        <div
          ref={dot}
          className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-bone"
        />
      </div>
      <div
        ref={disc}
        className="absolute left-0 top-0 flex h-24 w-24 items-center justify-center rounded-full bg-bone text-ink"
      >
        <span
          ref={label}
          className="font-mono text-[10px] uppercase tracking-[0.2em]"
        />
      </div>
    </div>
  );
}
