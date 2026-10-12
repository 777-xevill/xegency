/* ============================================================================
   XEGENCY — BLENDED PORTFOLIO
   ----------------------------------------------------------------------------
   Merges client case studies (src/content/work.ts) with Xegency's own
   products (src/content/products.ts) into one list. Order here is the order
   on the /work page; the homepage shows `featuredPortfolio`.
   ========================================================================== */

import { work, type CaseStudy } from "./work";
import { products, type Product } from "./products";

export type PortfolioItem = CaseStudy | Product;

const bySlug = (slug: string) =>
  [...work, ...products].find((i) => i.slug === slug);

const order = [
  "whatsapp-auto-reply",
  "alpha-fuel",
  "ai-lead-qualifier",
  "qr-ordering-platform",
  "ai-support-agent",
  "invoice-reader",
  "stock-forecasting",
  "daily-business-digest",
];

/** Full listing: AI products lead, with the real client project and Xedineos woven in. */
export const portfolio: PortfolioItem[] = order
  .map(bySlug)
  .filter(Boolean) as PortfolioItem[];

/** Homepage preview — the three strongest, in this order. */
export const featuredPortfolio: PortfolioItem[] = [
  "whatsapp-auto-reply",
  "alpha-fuel",
  "qr-ordering-platform",
]
  .map(bySlug)
  .filter(Boolean) as PortfolioItem[];

export function getPortfolioItem(slug: string) {
  return bySlug(slug);
}

export function isProduct(item: PortfolioItem): item is Product {
  return item.kind === "product";
}
