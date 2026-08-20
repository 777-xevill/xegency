import { capabilities, stats } from "@/content/site";
import { Eyebrow, Marquee, Shell, cx } from "@/components/ui";
import { isPlaceholder } from "@/lib/format";

export function CapabilitiesBand() {
  return (
    <div className="grain relative border-y border-bone/10 bg-ink-800">
      <Marquee items={capabilities} />
    </div>
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
              A website is the only salesperson you own outright. Most of them
              are badly briefed, and it shows in the first ten seconds.
            </h2>

            <div className="mt-12 grid gap-8 border-t border-ink/10 pt-10 md:grid-cols-2 md:gap-14">
              <p
                data-reveal=""
                className="pretty text-base leading-relaxed text-ink/70"
              >
                Buyers decide whether you are serious long before they read a
                word of your copy. They judge the spacing, the load time, the
                photography, whether the pricing page hides or answers. Those
                are design decisions, and they are the ones that quietly cost
                you deals you never hear about.
              </p>
              <p
                data-reveal=""
                style={{ "--reveal-delay": "90ms" } as React.CSSProperties}
                className="pretty text-base leading-relaxed text-ink/70"
              >
                So the work here starts with the business, not the moodboard.
                What has to be true for someone to trust you enough to reply?
                We answer that on the page — with proof, with clarity, with
                prices where people expect prices — and then we make it fast.
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
