import Image from "next/image";
import { availability, founder, site } from "@/content/site";
import { Cta, Shell, cx } from "@/components/ui";
import { isPlaceholder } from "@/lib/format";

const statusStyles = {
  open: { dot: "bg-emerald-500", ring: "ring-emerald-500/25" },
  limited: { dot: "bg-amber-500", ring: "ring-amber-500/25" },
  closed: { dot: "bg-stone", ring: "ring-stone/25" },
};

export function Hero() {
  const status = statusStyles[availability.status];

  const meta = [
    { label: "Studio", value: `Est. ${founder.since}` },
    { label: "Based in", value: founder.location },
    { label: "Hours", value: founder.timezone },
    { label: "Response", value: "Within 1 business day" },
  ];

  return (
    <section className="relative grain overflow-hidden bg-ink pt-32 text-bone md:pt-40">
      <Shell className="relative z-10">
        <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-10">
          {/* ---------------------------------------------------- copy */}
          <div className="lg:col-span-7">
            <div
              data-reveal=""
              className="inline-flex items-center gap-3 border border-bone/15 px-4 py-2"
            >
              <span
                className={cx(
                  "h-1.5 w-1.5 rounded-full ring-4",
                  status.dot,
                  status.ring,
                )}
              />
              <span className="eyebrow text-bone/70">{availability.label}</span>
            </div>

            <h1
              data-reveal=""
              style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
              className="display mt-8 text-[clamp(2.9rem,7.6vw,6.6rem)]"
            >
              If it runs on
              <br />
              a computer,
              <br />
              <span className="italic text-stone">we build it.</span>
            </h1>

            <p
              data-reveal=""
              style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
              className="pretty mt-8 max-w-xl text-lg leading-relaxed text-bone/60 md:text-xl"
            >
              {site.name} is an AI-native software studio. AI agents and
              automation, custom software, websites, web and mobile apps —
              designed and engineered end to end by the person you actually
              talk to.
            </p>

            <div
              data-reveal=""
              style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
              className="mt-10 flex flex-col gap-3 sm:flex-row"
            >
              <Cta href="/contact">Start a project</Cta>
              <Cta href="#ai-audit" variant="outline">
                Get an AI audit
              </Cta>
            </div>
          </div>

          {/* --------------------------------------------------- portrait */}
          <div
            data-reveal=""
            style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
            className="relative lg:col-span-5"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink-800">
              <Image
                src="/founder/portrait.jpg"
                alt={`${founder.name}, ${founder.role} of ${site.name}`}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <p className="display text-[clamp(1.4rem,2.2vw,2rem)] leading-tight">
                  {founder.fullName}
                </p>
                <p className="eyebrow mt-2 text-stone">{founder.role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------- meta strip */}
        <dl
          data-reveal=""
          className="mt-20 grid grid-cols-2 gap-px border-t border-bone/15 md:mt-28 md:grid-cols-4"
        >
          {meta.map((m) => (
            <div key={m.label} className="py-6 pr-6">
              <dt className="eyebrow text-bone/40">{m.label}</dt>
              <dd
                className={cx(
                  "mt-2.5 text-sm",
                  isPlaceholder(m.value) ? "text-bone/30 italic" : "text-bone",
                )}
              >
                {m.value}
              </dd>
            </div>
          ))}
        </dl>
      </Shell>
    </section>
  );
}
