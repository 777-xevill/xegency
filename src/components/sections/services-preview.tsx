import Link from "next/link";
import { services } from "@/content/site";
import { Arrow, Eyebrow, Shell } from "@/components/ui";

/**
 * On desktop the section pins to the viewport and the cards travel sideways
 * with the scroll (data-pin-horizontal / data-pin-track, see
 * src/components/motion/motion.tsx). Below 1024px it is an ordinary grid.
 */
export function ServicesPreview() {
  return (
    <section className="grain relative bg-ink">
      {/* GSAP pins this inner wrapper, never the <section> itself: pinning
          moves the pinned node into a spacer element, and React has to find
          the section exactly where it left it when the page unmounts. */}
      <div data-pin-horizontal="" className="relative py-24 md:py-36">
      <Shell className="relative z-10 w-full">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>What we build</Eyebrow>
            <h2
              data-split="lines"
              data-velocity-skew=""
              className="display mt-6 text-[clamp(2.1rem,4.6vw,4rem)]"
            >
              Every capability a
              <br />
              growing business needs.
            </h2>
          </div>
          <Link
            href="/services"
            className="link-sweep eyebrow inline-flex items-center gap-2 self-start text-stone md:pb-3"
          >
            Full scope &amp; pricing
            <Arrow />
          </Link>
        </div>
      </Shell>

      <div className="mt-12 lg:mt-12">
        <ul
          data-pin-track=""
          className="mx-auto grid max-w-[1400px] gap-4 px-6 sm:grid-cols-2 md:px-10 lg:grid-cols-4 lg:px-14"
        >
          {services.map((s, i) => (
            <li key={s.number}>
              <div
                data-reveal=""
                style={{ "--reveal-delay": `${(i % 2) * 90}ms` } as React.CSSProperties}
                className="h-full"
              >
                <div
                  data-tilt="5"
                  data-pin-card=""
                  className="relative h-full overflow-hidden border border-bone/12 bg-ink-800/70 transition-colors duration-700 ease-out-expo hover:border-bone/30"
                >
                  <Link
                    href={`/services#${s.number}`}
                    className="group relative flex h-full flex-col p-7 md:p-8"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 origin-bottom scale-y-0 bg-ink-700/70 transition-transform duration-700 ease-out-expo group-hover:scale-y-100"
                    />

                    <span className="relative z-10 flex items-start justify-between">
                      <span className="display text-[clamp(3.5rem,5.5vw,5.5rem)] leading-[0.8] text-stone/35 transition-colors duration-700 ease-out-expo group-hover:text-stone">
                        {s.number}
                      </span>
                      <Arrow className="h-4 w-4 text-bone/30 transition-all duration-500 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-bone" />
                    </span>

                    <h3 className="display relative z-10 mt-10 text-[1.75rem] leading-[1.05] lg:mt-auto">
                      {s.title}
                    </h3>

                    <p className="pretty relative z-10 mt-4 text-sm leading-relaxed text-bone/60">
                      {s.summary}
                    </p>

                    <span className="eyebrow relative z-10 mt-auto pt-8 text-bone/40 lg:mt-6 lg:pt-0">
                      {s.timeline}
                    </span>
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Travel indicator, desktop only. */}
        <div
          data-pin-progress-wrap=""
          className="mx-auto mt-8 max-w-[1400px] px-14"
        >
          <div className="h-px w-full bg-bone/12">
            <div
              data-pin-progress=""
              className="h-px origin-left bg-bone/70"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
