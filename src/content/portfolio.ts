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
  "beximco-export-tracker",
  "bmw-whatsapp-leads",
  "square-sales-mis",
  "royal-enfield-test-ride-booking",
  "hameem-line-efficiency",
  "pran-dealer-orders",
];

/** Full listing: client work only. Old products and Alpha Fuel are kept in their files but no longer shown. */
export const portfolio: PortfolioItem[] = order
  .map(bySlug)
  .filter(Boolean) as PortfolioItem[];

/** Homepage showcase, in this order. */
export const featuredPortfolio: PortfolioItem[] = [
  "beximco-export-tracker",
  "bmw-whatsapp-leads",
  "square-sales-mis",
  "royal-enfield-test-ride-booking",
  "hameem-line-efficiency",
  "pran-dealer-orders",
]
  .map(bySlug)
  .filter(Boolean) as PortfolioItem[];

export function getPortfolioItem(slug: string) {
  return bySlug(slug);
}

export function isProduct(item: PortfolioItem): item is Product {
  return item.kind === "product";
}
