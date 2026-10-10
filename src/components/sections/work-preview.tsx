import Link from "next/link";
import { featuredPortfolio } from "@/content/portfolio";
import { WorkCard } from "@/components/work-card";
import { Arrow, Eyebrow, Shell } from "@/components/ui";

export function WorkPreview() {
  const items = featuredPortfolio.slice(0, 3);
  if (items.length === 0) return null;

  return (
    <section className="grain ambient relative bg-ink-800 py-24 md:py-36">
      <Shell>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Client work &amp; founder products</Eyebrow>
            <h2
              data-split="lines"
              className="display mt-6 text-[clamp(2.1rem,4.6vw,4rem)]"
            >
              Recent work.
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

        <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2">
          {items.map((item, i) => (
            <WorkCard
              key={item.slug}
              item={item}
              index={i}
              className={i === 0 ? "md:col-span-2" : ""}
            />
          ))}
        </div>

        <p
          data-reveal=""
          className="pretty rule-draw mt-16 max-w-2xl pt-8 text-sm leading-relaxed text-bone/55"
        >
          Xegency is both: a studio that builds software for clients, and a
          founder who builds his own products alongside it. Most client names
          are withheld on request — the products are ours, so we can show more.
        </p>
      </Shell>
    </section>
  );
}
