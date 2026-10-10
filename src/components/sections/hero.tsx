import Image from "next/image";
import { availability, founder, site } from "@/content/site";
import { HeroScene } from "@/components/three/hero-scene";
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
    <section className="relative grain min-h-[100svh] overflow-hidden bg-ink text-bone">
      {/* ------------------------------------------- 3D mark + glow */}
      <div aria-hidden="true" className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(42%_52%_at_74%_46%,rgba(122,109,94,0.30),transparent_72%)] max-lg:bg-[radial-gradient(70%_36%_at_50%_24%,rgba(122,109,94,0.28),transparent_72%)]" />
        <HeroScene className="absolute inset-x-0 top-0 h-[100svh] max-lg:opacity-60 lg:inset-y-0 lg:h-auto" />
      </div>

      <Shell className="relative z-10 flex min-h-[100svh] flex-col pt-28 md:pt-36">
        <div className="grid flex-1 items-end gap-12 pt-6 lg:grid-cols-12 lg:gap-10">
          {/* ---------------------------------------------------- copy */}
          <div className="lg:col-span-7">
            <div
              data-reveal=""
              className="inline-flex items-center gap-3 border border-bone/15 bg-ink/40 px-4 py-2 backdrop-blur-sm"
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
              data-split="chars"
              data-split-trigger="intro"
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
              style={{ "--reveal-delay": "260ms" } as React.CSSProperties}
              className="mt-10 flex flex-col items-start gap-3 sm:flex-row"
            >
              <span data-magnetic="0.3">
                <Cta href="/contact">Start a project</Cta>
              </span>
              <span data-magnetic="0.3">
                <Cta href="#ai-audit" variant="outline">
                  Get an AI audit
                </Cta>
              </span>
            </div>
          </div>

          {/* --------------------------------------------------- portrait */}
          <div
            data-reveal=""
            data-reveal-variant="scale"
            style={{ "--reveal-delay": "380ms" } as React.CSSProperties}
            className="relative lg:col-span-5 lg:flex lg:justify-end"
          >
            <div data-parallax="0.18" className="w-full max-w-[240px] lg:max-w-[280px]">
              <div
                data-tilt="6"
                className="relative aspect-[4/5] w-full overflow-hidden border border-bone/15 bg-ink-800 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.85)]"
              >
                <Image
                  src="/founder/portrait.jpg"
                  alt={`${founder.name}, ${founder.role} of ${site.name}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 280px, 240px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="display text-[clamp(1.2rem,1.8vw,1.55rem)] leading-tight">
                    {founder.fullName}
                  </p>
                  <p className="eyebrow mt-2 text-stone">{founder.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------- meta strip */}
        <dl
          data-stagger="0.08"
          className="mt-16 grid grid-cols-2 gap-px border-t border-bone/15 md:mt-24 md:grid-cols-4"
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
