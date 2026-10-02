import { capabilities, clients, stats } from "@/content/site";
import { Eyebrow, Marquee, Shell, cx } from "@/components/ui";
import { isPlaceholder } from "@/lib/format";

export function CapabilitiesBand() {
  return (
    <div className="grain relative border-y border-bone/10 bg-ink-800">
      <Marquee items={capabilities} />
    </div>
  );
}

export function ClientsBand() {
  if (clients.length === 0) return null;
  return (
    <section className="grain relative border-y border-bone/10 bg-ink-800 py-10">
      <Shell className="flex flex-col gap-6 md:flex-row md:items-center md:gap-14">
        <p className="eyebrow shrink-0 text-stone">Built for</p>
        <ul className="flex flex-wrap items-center gap-x-10 gap-y-4">
          {clients.map((name) => (
            <li
              key={name}
              className="font-display text-[clamp(1.35rem,2.4vw,1.9rem)] leading-none text-bone/70"
            >
              {name}
            </li>
          ))}
        </ul>
      </Shell>
    </section>
  );
}

export function Manifesto() {
  return (
    <section className="grain relative bg-bone-50 py-24 text-ink md:py-36">
      <Shell>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow invert>Why this studio exists</Eyebrow>
          </div>

          <div className="lg:col-span-8">
            <h2
              data-reveal=""
              className="display balance text-[clamp(1.9rem,4.2vw,3.6rem)]"
            >
              Most businesses don&rsquo;t need more people. They need the
              right software — and now, the right AI working inside it.
            </h2>

            <div className="mt-12 grid gap-8 border-t border-ink/10 pt-10 md:grid-cols-2 md:gap-14">
              <p
                data-reveal=""
                className="pretty text-base leading-relaxed text-ink/70"
              >
                Every team has hours disappearing into copy-paste, chasing
                follow-ups and stitching tools together by hand. The tools to
                take that work off people&rsquo;s plates now exist. What most
                businesses are missing is someone who can build it properly
                and stand behind it.
              </p>
              <p
                data-reveal=""
                style={{ "--reveal-delay": "90ms" } as React.CSSProperties}
                className="pretty text-base leading-relaxed text-ink/70"
              >
                So the work here starts with the business, not the tech. What
                has to happen, what it costs today, what it should cost. Then
                we build the website, the app, the agent or the system that
                makes it happen — with the newest AI stack, used where it earns
                its place.
              </p>
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}

export function Stats() {
  return (
    <section className="grain relative bg-ink py-20 text-bone md:py-24">
      <Shell>
        <dl className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              data-reveal=""
              style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
              // Reversed so the number reads first visually while the DOM
              // keeps the <dt> before its <dd>, as a definition list requires.
              className="flex flex-col-reverse border-t border-bone/15 pt-6"
            >
              <dt className="eyebrow mt-4 text-stone">{s.label}</dt>
              <dd
                className={cx(
                  "display text-[clamp(2.5rem,6vw,4.5rem)] leading-none",
                  isPlaceholder(s.value) && "text-bone/30",
                )}
              >
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </Shell>
    </section>
  );
}
