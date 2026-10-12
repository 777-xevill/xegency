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
    "AI products, client software and founder-led products from Xegency — including a WhatsApp auto-reply assistant, lead follow-up, AI support and more.",
};

export default function WorkPage() {
  const sectors = Array.from(new Set(portfolio.map((w) => w.sector.split(" / ")[0])));
  const aiProducts = products.filter((p) => p.sector.startsWith("AI")).length;

  return (
    <>
      <PageHero
        eyebrow="AI products & client work"
        title={
          <>
            AI that does the
            <br />
            work businesses repeat.
          </>
        }
        lead="Software that solves a real business problem: answering WhatsApp, chasing leads, reading invoices, planning stock. Some is built for clients, some we build and own ourselves — each is written out properly, with where it honestly stands today."
        meta={[
          { label: "AI products", value: aiProducts },
          { label: "Client projects", value: work.length },
          { label: "Founder products", value: products.length },
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
              <Eyebrow>Two kinds of work</Eyebrow>
            </div>
            <div className="lg:col-span-8">
              <h2
                data-split="lines"
                className="display balance text-[clamp(1.9rem,3.6vw,3rem)]"
              >
                What&rsquo;s live, and what&rsquo;s a demo.
              </h2>
              <p className="pretty mt-8 max-w-2xl text-base leading-relaxed text-bone/70">
                Cards marked &ldquo;Client project&rdquo; are real work for a
                real business. Cards marked &ldquo;Founder product&rdquo; are
                software we designed, built and own outright. Anything marked
                &ldquo;Demo build&rdquo; is a working product shown with sample
                data, not a live customer&rsquo;s account &mdash; we&rsquo;d
                rather say so than dress it up. Want one of them built for your
                business? That&rsquo;s a conversation, not a sales pitch.
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
