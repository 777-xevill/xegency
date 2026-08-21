import Link from "next/link";
import Image from "next/image";
import type { PortfolioItem } from "@/content/portfolio";
import { isProduct } from "@/content/portfolio";
import { Arrow, cx } from "@/components/ui";
import { XedineosCardPreview } from "@/components/sections/xedineos-demo";
import { AlphaFuelCardPreview } from "@/components/sections/alpha-fuel-cover";

/**
 * The visual half of a card.
 *
 * With no screenshot yet (`cover: null`) it renders a typographic panel built
 * from the project's own tint. That reads as a deliberate design choice, which
 * a grey "image missing" box never does — drop real covers into
 * /public/work/<slug>/cover.jpg (client work) or /public/products/<slug>/cover.jpg
 * (products) and set `cover` when you have them.
 */
function Panel({ item }: { item: PortfolioItem }) {
  if (item.slug === "qr-ordering-platform") {
    return <XedineosCardPreview />;
  }
  if (item.slug === "alpha-fuel") {
    return <AlphaFuelCardPreview />;
  }

  if (item.cover) {
    return (
      <Image
        src={item.cover}
        alt={`${item.client} — ${item.title}`}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
      />
    );
  }

  const product = isProduct(item);

  return (
    <div
      className="grain absolute inset-0 flex flex-col justify-between p-7 transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] md:p-9"
      style={{
        background: `linear-gradient(148deg, ${item.tint.from} 0%, ${item.tint.to} 100%)`,
        color: item.tint.ink,
      }}
    >
      <div className="flex items-start justify-between gap-6">
        <span className="eyebrow opacity-60">{item.sector}</span>
        <span className="eyebrow opacity-60">
          {product ? item.status : item.year}
        </span>
      </div>
      <p className="display max-w-[14ch] text-[clamp(1.6rem,3vw,2.6rem)] opacity-90">
        {item.client}
      </p>
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {item.services.map((s) => (
          <span key={s} className="eyebrow opacity-50">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export function WorkCard({
  item,
  index = 0,
  className = "",
}: {
  item: PortfolioItem;
  index?: number;
  className?: string;
}) {
  const product = isProduct(item);
  const href = `/work/${item.slug}`;

  return (
    <Link
      href={href}
      data-reveal=""
      style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
      className={cx("group block", className)}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-ink-800">
        <Panel item={item} />
        <span className="absolute left-4 top-4 border border-bone/25 bg-ink/70 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-bone backdrop-blur-sm">
          {product ? "Founder product" : "Client project"}
        </span>
      </div>

      <div className="flex items-start justify-between gap-6 border-t border-bone/10 pt-5">
        <div>
          <h3 className="display text-[clamp(1.35rem,2.2vw,1.9rem)] leading-tight">
            {item.title}
          </h3>
          <p className="pretty mt-2.5 max-w-md text-sm leading-relaxed text-bone/60">
            {item.summary}
          </p>
          <p className="eyebrow mt-4 text-stone">
            {item.client} · {product ? item.status : item.region}
          </p>
        </div>
        <span className="mt-1.5 shrink-0 text-bone/40 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-bone">
          <Arrow className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
