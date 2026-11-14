import Link from "next/link";
import { featuredPortfolio, isProduct } from "@/content/portfolio";
import { Panel } from "@/components/work-card";
import { WorkShowcase, type Slide } from "@/components/sections/work-showcase";
import { Arrow, Eyebrow, Float3D, Shell } from "@/components/ui";

export function WorkPreview() {
  const items = featuredPortfolio;
  if (items.length === 0) return null;

  // Panels are built here, on the server, and handed to the client showcase
  // as ready-made elements so it only has to swap between them.
  const slides: Slide[] = items.map((item) => ({
    slug: item.slug,
    title: item.title,
    // Founder products all share one generic "client" line; their real name
    // is the part of the title before the dash (ReplyDesk, Leadsmith, …).
    client:
      isProduct(item) && item.title.includes(" — ")
        ? item.title.split(" — ")[0]
        : item.client,
    sector: item.sector,
    summary: item.summary,
    tag: isProduct(item) ? "Founder product" : "Client project",
    panel: <Panel item={item} />,
  }));

  return (
    <section className="grain ambient relative overflow-clip bg-ink-800 py-24 md:py-36">
      <Float3D className="-right-36 top-24 hidden h-[30rem] w-[30rem] text-bone/[0.09] md:block" />
      <Shell>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>AI products &amp; client work</Eyebrow>
            <h2
              data-split="lines"
              data-velocity-skew=""
              className="display mt-6 text-[clamp(2.1rem,4.6vw,4rem)]"
            >
              Work that <span className="italic text-stone">moves.</span>
            </h2>
          </div>
          <Link
            href="/work"
            className="link-sweep eyebrow inline-flex items-center gap-2 self-start text-stone md:pb-3"
          >
            Everything we&rsquo;ve built
            <Arrow />
          </Link>
        </div>

        <WorkShowcase slides={slides} />

        <p
          data-reveal=""
          className="pretty rule-draw mt-16 max-w-2xl pt-8 text-sm leading-relaxed text-bone/55"
        >
          Xegency builds software for clients and its own AI products
          alongside. Products marked &ldquo;Demo build&rdquo; are working
          concepts shown with sample data &mdash; ready to pilot on a real
          business.
        </p>
      </Shell>
    </section>
  );
}
