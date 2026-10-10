import { techStack } from "@/content/site";
import { Eyebrow, Shell } from "@/components/ui";

export function EngineRoom() {
  return (
    <section className="grain ambient relative bg-ink py-24 md:py-32">
      <Shell>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>The engine room</Eyebrow>
            <h2
              data-split="lines"
              className="display balance mt-6 text-[clamp(2.1rem,4.2vw,3.5rem)]"
            >
              The newest stack, in hands that ship.
            </h2>
            <p
              data-reveal=""
              style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
              className="pretty mt-8 max-w-md text-base leading-relaxed text-bone/65"
            >
              Every tool here is one the work is built with — chosen because
              it&rsquo;s well supported and fast, not because it&rsquo;s
              fashionable. Your next developer can pick it up without a rescue
              project.
            </p>
          </div>

          <dl className="lg:col-span-7">
            {techStack.map((row, i) => (
              <div
                key={row.group}
                data-reveal=""
                style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
                className="rule-draw grid gap-4 py-7 md:grid-cols-12 md:gap-8"
              >
                <dt className="eyebrow pt-1.5 text-stone md:col-span-3">
                  {row.group}
                </dt>
                <dd
                  data-stagger="0.04"
                  className="flex flex-wrap gap-2 md:col-span-9"
                >
                  {row.tools.map((tool) => (
                    <span
                      key={tool}
                      className="border border-bone/15 px-3.5 py-1.5 text-sm text-bone/80 transition-[border-color,background-color,color,translate,box-shadow] duration-500 ease-out-expo hover:-translate-y-0.5 hover:border-bone/50 hover:bg-bone/[0.06] hover:text-bone hover:shadow-[0_10px_30px_-12px_rgba(228,223,215,0.25)]"
                    >
                      {tool}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Shell>
    </section>
  );
}
