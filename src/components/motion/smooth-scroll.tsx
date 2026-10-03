"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenis, prefersReducedMotion, setLenis } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Mounted once in the root layout. Owns the single Lenis instance and keeps
 * it in lock-step with GSAP's ticker so every ScrollTrigger sees the smoothed
 * scroll position. Touch devices keep native scrolling (Lenis default).
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      stopInertiaOnNavigate: true,
    });
    setLenis(lenis);

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // The first-visit preloader holds the page still until it lifts.
    if (document.documentElement.classList.contains("intro")) lenis.stop();

    // Same-page anchors ("#ai-audit", "/#ai-audit" while on "/") glide
    // instead of jumping. Runs in the capture phase, ahead of next/link.
    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;
      const link = (e.target as Element | null)?.closest?.("a[href*='#']");
      if (!(link instanceof HTMLAnchorElement)) return;
      const url = new URL(link.href, window.location.href);
      if (url.pathname !== window.location.pathname || url.hash.length < 2) return;
      let target: Element | null = null;
      try {
        target = document.querySelector(decodeURIComponent(url.hash));
      } catch {
        return;
      }
      if (!(target instanceof HTMLElement)) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -88, duration: 1.6, force: true });
    };
    window.addEventListener("click", onClick, true);

    return () => {
      window.removeEventListener("click", onClick, true);
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  // Next resets scroll on navigation; keep Lenis' internal position in sync.
  useEffect(() => {
    const lenis = getLenis();
    if (!lenis || window.location.hash) return;
    lenis.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
