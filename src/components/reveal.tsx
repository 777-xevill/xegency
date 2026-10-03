"use client";

import { useEffect } from "react";
import { onIntroDone } from "@/lib/motion";

/**
 * Mounted once in the root layout. Watches every element carrying a
 * `data-reveal` attribute — including ones added by later route changes —
 * and flips it to `data-reveal="in"` when it enters the viewport.
 *
 * Keeping the observer here means page and section components stay server
 * components: they only need to spell `data-reveal` on the markup. Nothing
 * starts until the first-visit intro has lifted, so the hero animates in
 * front of the visitor rather than behind the preloader.
 */
export function RevealObserver() {
  useEffect(() => {
    const seen = new WeakSet<Element>();
    let io: IntersectionObserver | undefined;
    let mo: MutationObserver | undefined;

    const start = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.setAttribute("data-reveal", "in");
              observer.unobserve(entry.target);
            }
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
      );
      io = observer;

      const scan = () => {
        document.querySelectorAll("[data-reveal='']").forEach((el) => {
          if (seen.has(el)) return;
          seen.add(el);
          observer.observe(el);
        });
      };

      scan();

      // Catch anything rendered after the first paint (route changes, accordions).
      mo = new MutationObserver(scan);
      mo.observe(document.body, { childList: true, subtree: true });
    };

    const unsubscribe = onIntroDone(start);

    return () => {
      unsubscribe();
      io?.disconnect();
      mo?.disconnect();
    };
  }, []);

  return null;
}
