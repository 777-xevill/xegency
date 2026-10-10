import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { portfolio, getPortfolioItem, isProduct } from "@/content/portfolio";
import { Shell, Eyebrow, Cta, Arrow, cx } from "@/components/ui";
import { isPlaceholder, safeHref } from "@/lib/format";
import { XedineosDemo } from "@/components/sections/xedineos-demo";
import { AlphaFuelCover } from "@/components/sections/alpha-fuel-cover";

export function generateStaticParams() {
  return portfolio.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = getPortfolioItem(slug);
  if (!item) return { title: "Not found" };

  return {
    title: item.title,
    description: item.summary,
    openGraph: { title: item.title, description: item.summary },
  };
}

export default async function PortfolioItemPage({
  params,
}: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const item = getPortfolioItem(slug);
  if (!item) notFound();

  const product = isProduct(item);
  const visitLink = product ? safeHref(item.link) : null;

  const index = portfolio.findIndex((w) => w.slug === slug);
  const next = portfolio[(index + 1) % portfolio.length];

  return (
    <>
      {/* ------------------------------------------------------------ head */}
      <section className="grain relative bg-ink pt-36 pb-14 md:pt-48">
        <Shell>
          <Link
            href="/work"
            className="link-sweep eyebrow inline-flex items-center gap-2 text-stone"
          >
            <Arrow className="rotate-180" />
            Everything we&rsquo;ve built
          </Link>

          <p className="eyebrow mt-10 text-bone/45">
            {product ? "Founder-led product" : item.client}
          </p>

          <h1
            data-split="lines"
            data-split-trigger="intro"
            className="display balance mt-5 max-w-5xl text-[clamp(2.3rem,5.6vw,5rem)]"
          >
            {item.title}
          </h1>

          <p
            data-reveal=""
            className="pretty mt-8 max-w-2xl text-lg leading-relaxed text-bone/70"
          >
            {item.summary}
          </p>

          <dl
            data-stagger="0.08"
            className="mt-14 grid grid-cols-2 gap-px border-t border-bone/12 md:grid-cols-4"
          >
            <Meta label="Sector" value={item.sector} />
            <Meta label={product ? "Status" : "Region"} value={product ? item.status : item.region} />
            <Meta label="Year" value={item.year} />
            <Meta label="Scope" value={item.services.join(", ")} />
          </dl>

          {visitLink && (
            <div className="mt-8">
              <Cta href={visitLink} variant="outline">
                Visit the product
              </Cta>
            </div>
          )}
        </Shell>
      </section>

      {/* ---------------------------------------------------------- visual */}
      <section className="grain relative bg-ink-800 pb-20 md:pb-28">
        <Shell>
          {slug === "qr-ordering-platform" ? (
            <XedineosDemo />
          ) : slug === "alpha-fuel" ? (
            <AlphaFuelCover />
          ) : (
          <div className="relative aspect-[16/10] overflow-hidden bg-ink-800 md:aspect-[16/8]">
            {item.cover ? (
              <Image
                src={item.cover}
                alt={`${item.client} — ${item.title}`}
                fill
                loading="eager"
                fetchPriority="high"
                sizes="100vw"
                className="object-cover"
              />
            ) : (
              <div
                className="grain absolute inset-0 flex flex-col justify-between p-8 md:p-14"
                style={{
                  background: `linear-gradient(148deg, ${item.tint.from} 0%, ${item.tint.to} 100%)`,
                  color: item.tint.ink,
                }}
              >
                <span className="eyebrow opacity-60">{item.sector}</span>
                <p className="display max-w-[16ch] text-[clamp(2rem,5vw,4.5rem)] opacity-90">
                  {item.client}
                </p>
                <span className="eyebrow opacity-45">
                  Add a screenshot at /public/{product ? "products" : "work"}/{item.slug}/cover.jpg
                </span>
              </div>
            )}
          </div>
          )}
          {!product && item.nda && (
            <p className="eyebrow mt-4 text-bone/40">
              Client name withheld at their request
            </p>
          )}
          {product && slug !== "qr-ordering-platform" && (
            <p className="eyebrow mt-4 text-bone/40">
              Built and owned by Xegency — not client work
            </p>
          )}
        </Shell>
      </section>

      {/* ------------------------------------------------------------ body */}
      <section className="grain relative bg-ink py-20 md:py-28">
        <Shell>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <Block title="The problem">
                <p className="pretty text-base leading-relaxed text-bone/70 md:text-lg">
                  {item.problem}
                </p>
              </Block>

              <Block title={product ? "What we built" : "What we did"}>
                <ol className="space-y-6">
                  {item.approach.map((step, i) => (
                    <li key={i} className="flex gap-5">
                      <span className="eyebrow mt-1.5 shrink-0 text-stone">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="pretty text-base leading-relaxed text-bone/70">
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </Block>

              <Block title={product ? "Where it stands" : "The outcome"}>
                <p className="pretty text-base leading-relaxed text-bone/70 md:text-lg">
                  {item.outcome}
                </p>
              </Block>
            </div>

            {/* -------------------------------------------------- sidebar */}
            <aside className="lg:col-span-4 lg:col-start-9">
              <div className="lg:sticky lg:top-28">
                <div className="border-t border-bone/12 pt-6">
                  <Eyebrow>{product ? "At a glance" : "Results"}</Eyebrow>
                  <dl className="mt-6 space-y-6">
                    {item.metrics.map((m) => (
                      <div key={m.label}>
                        <dd
                          className={cx(
                            "display text-[clamp(2rem,4vw,3rem)] leading-none",
                            isPlaceholder(m.value) && "text-bone/25",
                          )}
                        >
                          {m.value}
                        </dd>
                        <dt className="mt-2 text-sm text-bone/55">{m.label}</dt>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="mt-12 border-t border-bone/12 pt-6">
                  <Eyebrow>Built with</Eyebrow>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {item.stack.map((s) => (
                      <li
                        key={s}
                        className="border border-bone/15 px-3 py-1.5 text-[12px] tracking-wide text-bone/70"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-12 border-t border-bone/12 pt-6">
                  <p className="pretty text-sm leading-relaxed text-bone/60">
                    {product
                      ? "Want something built the same way — owned end to end, shipped by one person who can actually explain every decision in it?"
                      : "Working on something similar? The fastest way to find out if we're a fit is twenty minutes on a call."}
                  </p>
                  <Cta href="/contact" className="mt-6 w-full">
                    Start a project
                  </Cta>
                </div>
              </div>
            </aside>
          </div>
        </Shell>
      </section>

      {/* ------------------------------------------------------------ next */}
      <section className="grain relative bg-ink-800 py-20 text-bone md:py-24">
        <Shell>
          <Link href={`/work/${next.slug}`} className="group block">
            <p className="eyebrow text-stone">
              Next {isProduct(next) ? "product" : "case study"}
            </p>
            <div className="mt-6 flex items-end justify-between gap-8 border-t border-bone/15 pt-8">
              <h2
                data-split="lines"
                className="display text-[clamp(1.8rem,4.4vw,3.5rem)] leading-tight"
              >
                {next.title}
              </h2>
              <Arrow className="mb-3 h-6 w-6 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5 group-hover:-translate-y-1.5" />
            </div>
            <p className="eyebrow mt-5 text-bone/40">{next.client}</p>
          </Link>
        </Shell>
      </section>
    </>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-6 pr-6">
      <dt className="eyebrow text-bone/45">{label}</dt>
      <dd
        className={cx(
          "mt-2.5 text-sm",
          isPlaceholder(value) ? "text-bone/35 italic" : "text-bone",
        )}
      >
        {value}
      </dd>
    </div>
  );
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div data-reveal="" className="mb-14 last:mb-0">
      <h2 className="display mb-6 text-[clamp(1.5rem,2.6vw,2.1rem)]">
        {title}
      </h2>
      {children}
    </div>
  );
}
