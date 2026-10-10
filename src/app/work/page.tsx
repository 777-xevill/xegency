import type { Metadata } from "next";
import { portfolio } from "@/content/portfolio";
import { products } from "@/content/products";
import { work } from "@/content/work";
import { WorkCard } from "@/components/work-card";
import { PageHero } from "@/components/page-hero";
import { Shell, Eyebrow, Cta } from "@/components/ui";
import { Stats } from "@/components/sections/proof";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Client software and founder-led products from Xegency — described in full, with client names withheld where asked.",
};

export default function WorkPage() {
  const sectors = Array.from(new Set(work.map((w) => w.sector.split(" / ")[0])));

  return (
    <>
      <PageHero
        eyebrow="Client work & products"
        title={
          <>
            What we build for
            <br />
            clients — and ourselves.
          </>
        }
        lead="Two kinds of work live here: software built for clients, and products we own and build ourselves. Each one is written out properly — the problem, the decisions, and where it stands today."
        meta={[
          { label: "Client projects", value: work.length },
          { label: "Founder products", value: products.length },
          { label: "Sectors", value: sectors.length },
          { label: "Client names", value: "Withheld where asked" },
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
              <Eyebrow>Two kinds of work</Eyebrow>
            </div>
            <div className="lg:col-span-8">
              <h2
                data-split="lines"
                className="display balance text-[clamp(1.9rem,3.6vw,3rem)]"
              >
                Why some names are withheld, and others aren&rsquo;t.
              </h2>
              <p className="pretty mt-8 max-w-2xl text-base leading-relaxed text-bone/70">
                Cards marked &ldquo;Client project&rdquo; are agency work —
                plenty of clients would rather not advertise who built their
                site, and a few are contractually unable to. We take that
                seriously. Cards marked &ldquo;Founder product&rdquo; are ours:
                software we designed, built and own outright, which is why we
                can show more of how they actually work.
              </p>
              <div className="mt-10">
                <span data-magnetic="0.3">
                  <Cta href="/contact">Ask for references</Cta>
                </span>
              </div>
            </div>
          </div>
        </Shell>
      </section>
    </>
  );
}
