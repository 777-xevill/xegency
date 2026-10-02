import { aiAudit } from "@/content/site";
import { Cta, Eyebrow, Shell, cx } from "@/components/ui";
import { isPlaceholder } from "@/lib/format";

/**
 * The low-risk first step. Most buyers know they "should be using AI" and
 * have no idea where — this turns that into a small, fixed-price engagement.
 */
export function AiAudit() {
  return (
    <section
      id="ai-audit"
      className="grain relative scroll-mt-24 bg-bone-50 py-24 text-ink md:py-36"
    >
      <Shell>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow invert>AI audit</Eyebrow>
            <h2
              data-reveal=""
              className="display balance mt-6 text-[clamp(2.1rem,4.4vw,3.75rem)]"
            >
              Find out what AI can take off your team&rsquo;s plate.
            </h2>
            <p className="pretty mt-8 max-w-md text-base leading-relaxed text-ink/65">
              You know you should be using AI. You don&rsquo;t know where, or
              what it would cost. In one week you get a ranked, priced plan —
              written for your business, not a generic slide deck.
            </p>

            <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-6">
              <div>
                <dt className="eyebrow text-ink/45">Takes</dt>
                <dd className="mt-2 text-sm">{aiAudit.duration}</dd>
              </div>
              <div>
                <dt className="eyebrow text-ink/45">Fixed price</dt>
                <dd
                  className={cx(
                    "mt-2 text-sm",
                    isPlaceholder(aiAudit.price) && "italic text-ink/35",
                  )}
                >
                  {aiAudit.price}
                </dd>
              </div>
            </dl>

            <div className="mt-10">
              <Cta href="/contact" invert>
                Book an AI audit
              </Cta>
            </div>
          </div>

          <ol className="grid gap-px self-start border-t border-ink/12 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            {aiAudit.steps.map((step, i) => (
              <li
                key={step.title}
                data-reveal=""
                style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
                className="border-b border-ink/12 py-8 sm:odd:pr-10 sm:even:border-l sm:even:pl-10"
              >
                <span className="eyebrow text-umber">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="display mt-4 text-2xl leading-tight md:text-3xl">
                  {step.title}
                </h3>
                <p className="pretty mt-3 text-sm leading-relaxed text-ink/65">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Shell>
    </section>
  );
}
