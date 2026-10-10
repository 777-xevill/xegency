"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, availability } from "@/content/site";
import { cx, Arrow } from "@/components/ui";
import { Logo } from "@/components/logo";
import { getLenis } from "@/lib/motion";

const statusDot = {
  open: "bg-emerald-500",
  limited: "bg-amber-500",
  closed: "bg-stone",
};

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const openRef = useRef(open);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  // Slides away while you read downward, comes straight back on any upward
  // scroll — and never hides behind an open menu.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const delta = y - last;
      if (Math.abs(delta) > 4) {
        setHidden(delta > 0 && y > 140 && !openRef.current);
        last = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll behind the mobile sheet (Lenis ignores overflow).
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) getLenis()?.stop();
    else getLenis()?.start();
    return () => {
      document.body.style.overflow = "";
      getLenis()?.start();
    };
  }, [open]);

  return (
    <>
      <header
        className={cx(
          "fixed inset-x-0 top-0 z-50 transition-[translate,background-color,border-color,backdrop-filter] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          hidden && !open && "-translate-y-full",
          scrolled
            ? "border-b border-bone/10 bg-ink/85 backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 py-5 md:px-10 md:py-6 lg:px-14">
          <Link
            href="/"
            aria-label="Xegency — home"
            className="group shrink-0 text-[13px] text-bone md:text-[14px]"
          >
            <Logo markClassName="transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-90" />
          </Link>

          <nav className="hidden items-center gap-10 md:flex">
            {nav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cx(
                    "link-sweep text-[13px] uppercase tracking-[0.14em] transition-opacity",
                    active ? "text-bone" : "text-bone/55 hover:text-bone",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <span className="hidden items-center gap-2 lg:flex">
              <span
                className={cx(
                  "h-1.5 w-1.5 rounded-full",
                  statusDot[availability.status],
                )}
              />
              <span className="eyebrow text-bone/50">
                {availability.status === "closed"
                  ? "Books closed"
                  : "Available"}
              </span>
            </span>

            <span data-magnetic="0.3" className="hidden sm:inline-block">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 bg-bone px-6 py-3 text-[12px] font-medium uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:bg-stone"
              >
                Start a project
                <Arrow className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </span>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
            >
              <span
                className={cx(
                  "h-px w-5 bg-bone transition-transform duration-300",
                  open && "translate-y-[3px] rotate-45",
                )}
              />
              <span
                className={cx(
                  "h-px w-5 bg-bone transition-transform duration-300",
                  open && "-translate-y-[3px] -rotate-45",
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {/* mobile sheet */}
      <div
        id="mobile-nav"
        data-lenis-prevent=""
        // Keeps the closed sheet out of the tab order and off screen readers,
        // while still allowing it to animate rather than pop in and out.
        inert={!open}
        className={cx(
          "fixed inset-0 z-40 flex flex-col justify-between bg-ink-800 px-6 pb-10 pt-28 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0",
        )}
      >
        <nav className="flex flex-col">
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
              className={cx(
                "display border-b border-bone/10 py-5 text-4xl text-bone transition-all duration-500",
                open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="space-y-5">
          <p className="eyebrow text-stone">{availability.label}</p>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="inline-flex w-full items-center justify-center gap-2 bg-bone px-6 py-4 text-[12px] font-medium uppercase tracking-[0.16em] text-ink"
          >
            Start a project
            <Arrow />
          </Link>
        </div>
      </div>
    </>
  );
}
