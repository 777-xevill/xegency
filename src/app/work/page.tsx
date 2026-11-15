import type { Metadata } from "next";
import { portfolio } from "@/content/portfolio";
import { WorkCard } from "@/components/work-card";
import { PageHero } from "@/components/page-hero";
import { Shell, Eyebrow, Cta } from "@/components/ui";
import { Stats } from "@/components/sections/proof";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Client work from Xegency: spreadsheets, reports, web apps and WhatsApp automation built for BEXIMCO, Square, PRAN, Ha-Meem, Royal Enfield and BMW.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const sectors = Array.from(new Set(portfolio.map((w) => w.sector.split(" / ")[0])));

  return (
    <>
      <PageHero
        eyebrow="Client work"
        title={
          <>
            Systems that run
            <br />
            the work businesses repeat.
          </>
        }
        lead="Spreadsheets, reports, web apps and WhatsApp assistants built for real businesses. Each project is written out properly: the problem, what we built, and how it is used today."
        meta={[
          { label: "Client projects", value: portfolio.length },
          { label: "Sectors", value: sectors.length },
        ]}
      />

      <section className="grain relative bg-ink-800 py-20 md:py-28">
        <Shell>
          <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
            {portfolio.map((item, i) => (
              <WorkCard
                key={item.slug}
                item={item}
                index={i}
                className={i % 3 === 0 ? "md:col-span-2" : ""}
              />
            ))}
          </div>
        </Shell>
      </section>

      <Stats />

      <section className="grain relative bg-ink py-24 md:py-32">
        <Shell>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow>About the screens</Eyebrow>
            </div>
            <div className="lg:col-span-8">
              <h2
                data-split="lines"
                className="display balance text-[clamp(1.9rem,3.6vw,3rem)]"
              >
                Real work, private data.
              </h2>
              <p className="pretty mt-8 max-w-2xl text-base leading-relaxed text-bone/70">
                Every project here was built for the company named on it. Our
                clients&rsquo; numbers, customers and dealers are their
                business, not ours to publish, so the screens show each
                system&rsquo;s real layout filled with sample data. Want
                something like this for your business? That&rsquo;s a
                conversation, not a sales pitch.
              </p>
              <div className="mt-10">
                <span data-magnetic="0.3">
                  <Cta href="/contact">Talk about your project</Cta>
                </span>
              </div>
            </div>
          </div>
        </Shell>
      </section>
    </>
  );
}
