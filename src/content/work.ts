/* ============================================================================
   XEGENCY — CLIENT CASE STUDIES
   ----------------------------------------------------------------------------
   Only real client work lives here. Anything that isn't a real engagement
   belongs in src/content/products.ts instead, labelled as what it is.

   Keep results true: use real numbers or none at all. Keep a client anonymous
   ("a D2C skincare brand") if you are under NDA and set `nda: true`.

   Drop real screenshots into /public/work/<slug>/cover.jpg and set `cover`.
   Leave `cover` as null and the card renders a typographic panel instead.
   ========================================================================== */

export type CaseStudy = {
  slug: string;
  /** "client" = agency work for someone else. "product" = something Xegency built and owns. */
  kind: "client" | "product";
  /** Anonymised client descriptor, e.g. "A Nordic furniture label". */
  client: string;
  /** The one-line headline for this project. */
  title: string;
  sector: string;
  region: string;
  year: string;
  /** Under NDA? Renders a small "Client name withheld" note. */
  nda: boolean;
  services: string[];
  /** Card blurb — keep it to two lines. */
  summary: string;
  problem: string;
  approach: string[];
  outcome: string;
  metrics: { value: string; label: string }[];
  stack: string[];
  /** Path under /public, e.g. "/work/atelier/cover.jpg". null → typographic panel. */
  cover: string | null;
  /** Panel colours used when there is no cover image. */
  tint: { from: string; to: string; ink: string };
  featured: boolean;
};

export const work: CaseStudy[] = [
  {
    slug: "alpha-fuel",
    kind: "client",
    client: "Alpha Fuel",
    title: "Selling imported supplements in a market built on refilled tubs",
    sector: "E-commerce / Supplements",
    region: "Bangladesh",
    year: "2026",
    nda: false,
    services: ["Web design", "Full-stack build", "Next.js"],
    summary:
      "Bangladesh's supplement market runs on refilled tubs and copied labels. We built Alpha Fuel's storefront around proving each tub is real — batch codes, seal checks, and a stock docket you can read before you pay.",
    problem:
      "Alpha Fuel wasn't just launching a store — they were launching into a market where the biggest objection isn't price, it's trust. Buyers have been burned by resealed, refilled or fake tubs before, and no generic e-commerce template makes a case for authenticity. The site had to sell the tub, and the fact that it isn't fake, in the same breath.",
    approach: [
      "Built the storefront from scratch in Next.js — catalogue, stock tracking and checkout — rather than starting on a template builder.",
      "Designed a 'stock docket' panel into the homepage itself: products on shelf, foil-seal check status, batch codes logged per tub, storage conditions — the proof up front, not buried in an FAQ.",
      "Wired ordering to WhatsApp and cash-on-delivery/bKash/Nagad, because that's how this market actually pays, with same-day Dhaka delivery called out where it applies.",
    ],
    outcome:
      "Live at alphafuelbd.com, taking orders, with 46 products and 27 brands on shelf. It's early — too soon for traffic or sales numbers worth publishing — but the brand launched making its case for authenticity instead of just listing prices.",
    metrics: [
      { value: "46", label: "Products on shelf at launch" },
      { value: "27", label: "Brands carried" },
    ],
    stack: ["Next.js", "React", "Tailwind CSS"],
    cover: null,
    tint: { from: "#221F1D", to: "#61564A", ink: "#E4DFD7" },
    featured: true,
  },
];

export const featuredWork = work.filter((w) => w.featured);

export function getCaseStudy(slug: string) {
  return work.find((w) => w.slug === slug);
}
