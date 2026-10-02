import { techStack } from "@/content/site";
import { Eyebrow, Shell } from "@/components/ui";

export function EngineRoom() {
  return (
    <section className="grain relative bg-ink py-24 md:py-32">
      <Shell>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>The engine room</Eyebrow>
            <h2
              data-reveal=""
              className="display balance mt-6 text-[clamp(2.1rem,4.2vw,3.5rem)]"
            >
              The newest stack, in hands that ship.
            </h2>
            <p className="pretty mt-8 max-w-md text-base leading-relaxed text-bone/65">
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
                className="grid gap-4 border-t border-bone/12 py-7 md:grid-cols-12 md:gap-8"
              >
                <dt className="eyebrow pt-1.5 text-stone md:col-span-3">
                  {row.group}
                </dt>
                <dd className="flex flex-wrap gap-2 md:col-span-9">
                  {row.tools.map((tool) => (
                    <span
                      key={tool}
                      className="border border-bone/15 px-3.5 py-1.5 text-sm text-bone/80"
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
