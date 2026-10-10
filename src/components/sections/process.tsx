import { process } from "@/content/site";
import { Eyebrow, Shell } from "@/components/ui";

export function Process() {
  return (
    <section className="grain relative bg-bone-50 py-24 text-ink md:py-36">
      <Shell>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
            <Eyebrow invert>How it runs</Eyebrow>
            <h2
              data-split="lines"
              className="display mt-6 text-[clamp(2.1rem,4.2vw,3.5rem)]"
            >
              No mystery,
              <br />
              no black box.
            </h2>
            <p
              data-reveal=""
              style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
              className="pretty mt-8 max-w-sm text-base leading-relaxed text-ink/65"
            >
              Every stage has a name, a length and something you can look at
              when it ends. You will always know what week we&rsquo;re in and
              what happens next.
            </p>
          </div>

          {/* Cards pile up as you scroll: each one sticks and the next slides
              over it (data-stack, desktop only). */}
          <ol data-stack="" className="space-y-5 lg:col-span-8">
            {process.map((p, i) => (
              <li
                key={p.step}
                style={{ top: `calc(7rem + ${i * 1.1}rem)` }}
                className="relative border border-ink/10 bg-bone-100 shadow-[0_-24px_50px_-30px_rgba(15,14,13,0.35)] lg:sticky"
              >
                <span
                  aria-hidden="true"
                  data-stack-shade=""
                  className="pointer-events-none absolute inset-0 z-10 bg-ink opacity-0"
                />
                <div
                  data-reveal=""
                  className="grid gap-4 p-7 md:grid-cols-12 md:gap-8 md:p-10 lg:min-h-[17rem]"
                >
                  <span className="display text-[clamp(3.5rem,6vw,5.5rem)] leading-[0.8] text-umber/45 md:col-span-3">
                    {p.step}
                  </span>
                  <div className="md:col-span-9">
                    <h3 className="display text-2xl leading-tight md:text-4xl">
                      {p.title}
                    </h3>
                    <p className="eyebrow mt-3 text-ink/45">{p.duration}</p>
                    <p className="pretty mt-6 max-w-xl text-sm leading-relaxed text-ink/65 md:text-base">
                      {p.body}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Shell>
    </section>
  );
}
