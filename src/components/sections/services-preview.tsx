import Link from "next/link";
import { services } from "@/content/site";
import { Arrow, Eyebrow, Shell } from "@/components/ui";

export function ServicesPreview() {
  return (
    <section className="grain relative bg-ink py-24 md:py-36">
      <Shell>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>What we build</Eyebrow>
            <h2
              data-reveal=""
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

        <ul className="mt-16 grid border-t border-l border-bone/12 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <li
              key={s.number}
              data-reveal=""
              style={{ "--reveal-delay": `${(i % 4) * 70}ms` } as React.CSSProperties}
              className="border-r border-b border-bone/12"
            >
              <Link
                href={`/services#${s.number}`}
                className="group relative flex h-full flex-col p-7 md:p-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 origin-bottom scale-y-0 bg-ink-800 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
                />

                <span className="relative z-10 flex items-center justify-between">
                  <span className="eyebrow text-stone">{s.number}</span>
                  <Arrow className="h-3.5 w-3.5 text-bone/30 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-bone" />
                </span>

                <h3 className="display relative z-10 mt-10 text-[1.75rem] leading-[1.05]">
                  {s.title}
                </h3>

                <p className="pretty relative z-10 mt-4 text-sm leading-relaxed text-bone/60">
                  {s.summary}
                </p>

                <span className="eyebrow relative z-10 mt-auto pt-8 text-bone/40">
                  {s.timeline}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Shell>
    </section>
  );
}
