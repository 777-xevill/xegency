"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { faqs } from "@/content/site";
import { Eyebrow, Shell, cx } from "@/components/ui";

export function Faq({
  heading = "The questions people actually ask.",
  intro,
}: {
  heading?: string;
  intro?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);
  const settled = useRef(open);

  // Opening or closing an answer changes the page height, which would leave
  // every scroll trigger below this list (the footer's) measuring stale
  // positions. Re-measure once the panel transition has finished.
  useEffect(() => {
    if (settled.current === open) return;
    settled.current = open;
    const id = window.setTimeout(() => {
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.refresh();
    }, 560);
    return () => window.clearTimeout(id);
  }, [open]);

  return (
    <section id="faq" className="grain relative bg-bone-50 py-24 text-ink md:py-36">
      <Shell>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
            <Eyebrow invert>Straight answers</Eyebrow>
            <h2
              data-split="lines"
              className="display balance mt-6 text-[clamp(2.1rem,4.2vw,3.4rem)]"
            >
              {heading}
            </h2>
            {intro && (
              <p
                data-reveal=""
                style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
                className="pretty mt-8 max-w-sm text-base leading-relaxed text-ink/65"
              >
                {intro}
              </p>
            )}
          </div>

          <div className="lg:col-span-8">
            <ul data-stagger="0.06" className="border-t border-ink/12">
              {faqs.map((item, i) => {
                const isOpen = open === i;
                return (
                  <li key={item.q} className="border-b border-ink/12">
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${i}`}
                        className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                      >
                        <span
                          className={cx(
                            "display text-[clamp(1.2rem,2.1vw,1.7rem)] leading-snug transition-[color,translate] duration-500 ease-out-expo",
                            isOpen
                              ? "text-ink"
                              : "text-ink/75 group-hover:translate-x-1.5 group-hover:text-ink",
                          )}
                        >
                          {item.q}
                        </span>
                        <span
                          aria-hidden="true"
                          className={cx(
                            "relative mt-3 h-3 w-3 shrink-0 transition-transform duration-700 ease-out-expo",
                            isOpen && "rotate-180",
                          )}
                        >
                          <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-ink" />
                          <span
                            className={cx(
                              "absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                              isOpen ? "scale-y-0" : "scale-y-100",
                            )}
                          />
                        </span>
                      </button>
                    </h3>

                    <div
                      id={`faq-panel-${i}`}
                      role="region"
                      className={cx(
                        "grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <div className="overflow-hidden">
                        {/* Drifts into place as the row opens, so the answer
                            settles rather than simply being uncovered. */}
                        <p
                          className={cx(
                            "pretty max-w-2xl pb-8 text-base leading-relaxed text-ink/65 transition-[translate] duration-700 ease-out-expo",
                            isOpen ? "translate-y-0" : "-translate-y-3",
                          )}
                        >
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Shell>
    </section>
  );
}
