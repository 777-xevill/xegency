"use client";

import { useEffect } from "react";

/**
 * Mounted once in the root layout. Watches every element carrying a
 * `data-reveal` attribute — including ones added by later route changes —
 * and flips it to `data-reveal="in"` when it enters the viewport.
 *
 * Keeping the observer here means page and section components stay server
 * components: they only need to spell `data-reveal` on the markup.
 */
export function RevealObserver() {
  useEffect(() => {
    const seen = new WeakSet<Element>();

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-reveal", "in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const scan = () => {
      document.querySelectorAll("[data-reveal='']").forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        io.observe(el);
      });
    };

    scan();

    // Catch anything rendered after the first paint (route changes, accordions).
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
