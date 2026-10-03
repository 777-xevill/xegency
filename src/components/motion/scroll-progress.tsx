"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/** Hairline at the very top of the viewport tracking page progress. */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bar.current;
    if (!el || prefersReducedMotion()) return;
    const setScale = gsap.quickSetter(el, "scaleX") as (v: number) => void;
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => setScale(self.progress),
    });
    return () => st.kill();
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px] mix-blend-difference"
    >
      <div
        ref={bar}
        className="h-full origin-left bg-bone"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
