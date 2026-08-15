import Link from "next/link";
import { services } from "@/content/site";
import { Arrow, Eyebrow, Shell, cx } from "@/components/ui";
import { isPlaceholder } from "@/lib/format";

export function ServicesPreview() {
  return (
    <section className="grain relative bg-ink py-24 md:py-36">
      <Shell>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>What we do</Eyebrow>
            <h2
              data-reveal=""
              className="display mt-6 text-[clamp(2.1rem,4.6vw,4rem)]"
            >
              Four ways to work
              <br />
              together.
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

        <ul className="mt-16 border-t border-bone/12">
          {services.map((s, i) => (
            <li
              key={s.number}
              data-reveal=""
              style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
            >
              <Link
                href="/services"
                className="group relative grid gap-4 border-b border-bone/12 py-8 transition-colors duration-500 md:grid-cols-12 md:items-baseline md:gap-8 md:py-10"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 inset-y-0 -z-0 origin-left scale-x-0 bg-ink-800 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                />

                <span className="eyebrow relative z-10 text-stone md:col-span-1">
                  {s.number}
                </span>

                <h3 className="display relative z-10 text-[clamp(1.6rem,3vw,2.5rem)] leading-tight md:col-span-4">
                  {s.title}
                </h3>

                <p className="pretty relative z-10 max-w-xl text-sm leading-relaxed text-bone/65 md:col-span-4">
                  {s.summary}
                </p>

                <div className="relative z-10 flex items-baseline justify-between gap-4 md:col-span-3 md:justify-end md:gap-8">
                  <span className="eyebrow text-bone/50">{s.timeline}</span>
                  <span
                    className={cx(
                      "text-sm whitespace-nowrap",
                      isPlaceholder(s.from) ? "text-bone/30 italic" : "text-bone",
                    )}
                  >
                    from {s.from}
                  </span>
                  <Arrow className="hidden h-4 w-4 shrink-0 text-bone/40 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-bone md:block" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Shell>
    </section>
  );
}
