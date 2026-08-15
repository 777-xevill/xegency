import { process } from "@/content/site";
import { Eyebrow, Shell } from "@/components/ui";

export function Process() {
  return (
    <section className="grain relative bg-bone-50 py-24 text-ink md:py-36">
      <Shell>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow invert>How it runs</Eyebrow>
            <h2
              data-reveal=""
              className="display mt-6 text-[clamp(2.1rem,4.2vw,3.5rem)]"
            >
              No mystery,
              <br />
              no black box.
            </h2>
            <p className="pretty mt-8 max-w-sm text-base leading-relaxed text-ink/65">
              Every stage has a name, a length and something you can look at
              when it ends. You will always know what week we&rsquo;re in and
              what happens next.
            </p>
          </div>

          <ol className="lg:col-span-8">
            {process.map((p, i) => (
              <li
                key={p.step}
                data-reveal=""
                style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
                className="grid gap-3 border-t border-ink/12 py-8 md:grid-cols-12 md:gap-8"
              >
                <span className="eyebrow text-umber md:col-span-1">
                  {p.step}
                </span>
                <div className="md:col-span-3">
                  <h3 className="display text-2xl leading-tight md:text-3xl">
                    {p.title}
                  </h3>
                  <p className="eyebrow mt-2 text-ink/45">{p.duration}</p>
                </div>
                <p className="pretty text-sm leading-relaxed text-ink/65 md:col-span-8">
                  {p.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Shell>
    </section>
  );
}
