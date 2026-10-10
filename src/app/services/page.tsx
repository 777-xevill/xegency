import type { Metadata } from "next";
import { services } from "@/content/site";
import { PageHero } from "@/components/page-hero";
import { Process } from "@/components/sections/process";
import { Assurances } from "@/components/sections/assurances";
import { Faq } from "@/components/sections/faq";
import { CapabilitiesBand } from "@/components/sections/proof";
import { Shell, Eyebrow, Cta, cx } from "@/components/ui";
import { isPlaceholder } from "@/lib/format";
import { FaqSchema } from "@/components/structured-data";

export const metadata: Metadata = {
  title: "Services & pricing",
  description:
    "AI agents and automation, custom software, websites, web and mobile apps, design and DevOps — with scope, timelines and starting prices written down.",
};

export default function ServicesPage() {
  return (
    <>
      <FaqSchema />

      <PageHero
        eyebrow="Services & pricing"
        title={
          <>
            What it costs,
            <br />
            written down.
          </>
        }
        lead="Everything we build, each with a defined scope, a timeline and a starting price. You will get a fixed number in your proposal — never an open-ended hourly meter."
      />

      <CapabilitiesBand />

      {/* ---------------------------------------------------------- blocks */}
      <section className="grain relative bg-ink py-20 md:py-28">
        <Shell>
          <div className="space-y-24 md:space-y-32">
            {services.map((s) => (
              <article
                key={s.number}
                id={s.number}
                data-reveal=""
                className="rule-draw scroll-mt-28 grid gap-10 pt-10 lg:grid-cols-12 lg:gap-10"
              >
                <div className="lg:col-span-5">
                  <span className="eyebrow text-stone">{s.number}</span>
                  <h2
                    data-split="lines"
                    className="display mt-5 text-[clamp(2rem,4vw,3.25rem)] leading-[1.02]"
                  >
                    {s.title}
                  </h2>
                  <p className="pretty mt-6 max-w-md text-base leading-relaxed text-bone/70 md:text-lg">
                    {s.summary}
                  </p>

                  <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-6">
                    <div>
                      <dt className="eyebrow text-bone/45">Timeline</dt>
                      <dd className="mt-2 text-sm">{s.timeline}</dd>
                    </div>
                    <div>
                      <dt className="eyebrow text-bone/45">Starting at</dt>
                      <dd
                        className={cx(
                          "mt-2 text-sm",
                          isPlaceholder(s.from)
                            ? "text-bone/35 italic"
                            : "text-bone",
                        )}
                      >
                        {s.from}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-10">
                    <span data-magnetic="0.3">
                      <Cta href="/contact" variant="outline">
                        Enquire about this
                      </Cta>
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-6 lg:col-start-7">
                  <Eyebrow>What&rsquo;s included</Eyebrow>
                  <ul data-stagger="0.05" className="mt-6">
                    {s.deliverables.map((d) => (
                      <li
                        key={d}
                        className="flex items-start gap-4 border-b border-bone/10 py-4 text-base text-bone/75"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[9px] h-1 w-1 shrink-0 rotate-45 bg-stone"
                        />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </Shell>
      </section>

      {/* -------------------------------------------------- pricing honesty */}
      <section className="grain relative bg-ink-800 py-24 md:py-32">
        <Shell>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow>How pricing works</Eyebrow>
            </div>
            <div className="lg:col-span-8">
              <h2
                data-split="lines"
                className="display balance text-[clamp(1.9rem,3.8vw,3.1rem)]"
              >
                Why there&rsquo;s a number on this page at all.
              </h2>
              <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-12">
                <p className="pretty text-base leading-relaxed text-bone/70">
                  Most studios make you sit through a call to find out whether
                  you can afford them. That wastes your afternoon and ours. The
                  ranges above are real: they are what recent projects of that
                  shape actually cost.
                </p>
                <p className="pretty text-base leading-relaxed text-bone/70">
                  What moves the number is the number of screens and
                  integrations, how much of the content you already have, how
                  much AI usage the system needs to run, and how many
                  stakeholders need to sign off. Your proposal fixes the
                  price before any work starts, and anything outside that scope
                  is quoted separately and approved by you first.
                </p>
              </div>
            </div>
          </div>
        </Shell>
      </section>

      <Process />
      <Assurances />
      <Faq
        heading="Before you enquire."
        intro="Everything below has come up on a real call. If your question isn't here, send it over — you'll get a straight answer, not a brochure."
      />
    </>
  );
}
