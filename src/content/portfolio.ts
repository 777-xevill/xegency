/* ============================================================================
   XEGENCY — BLENDED PORTFOLIO
   ----------------------------------------------------------------------------
   Merges client case studies (src/content/work.ts) with founder-led products
   (src/content/products.ts) into one list, per your instruction to weight the
   site roughly 60% client web work / 40% your own SaaS and startup projects.

   Honesty check: today that's 5 client case studies to 2 real products — the
   count can't be 60/40 without inventing a third product, which breaks the
   no-fabrication rule the rest of this site follows. So the 60/40 split is
   carried by PLACEMENT instead of raw count: a product appears in the first
   three homepage slots and roughly every third card in the full listing. Add
   a real third or fourth product to src/content/products.ts and the count
   will catch up to the visual weighting on its own.
   ========================================================================== */

import { work, type CaseStudy } from "./work";
import { products, type Product } from "./products";

export type PortfolioItem = CaseStudy | Product;

/** Full listing order: a product surfaces roughly every third card. */
export const portfolio: PortfolioItem[] = [
  work[0],
  work[1],
  products[0],
  work[2],
  work[3],
  products[1],
  work[4],
].filter(Boolean) as PortfolioItem[];

/** Homepage preview: two client projects, one product, in that order. */
export const featuredPortfolio: PortfolioItem[] = [
  work.find((w) => w.featured) ?? work[0],
  products[0],
  work.filter((w) => w.featured)[1] ?? work[1],
].filter(Boolean) as PortfolioItem[];

export function getPortfolioItem(slug: string) {
  return work.find((w) => w.slug === slug) ?? products.find((p) => p.slug === slug);
}

export function isProduct(item: PortfolioItem): item is Product {
  return item.kind === "product";
}
