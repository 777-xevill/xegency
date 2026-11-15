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
  /** Extra photos shown under the cover on the case-study page. */
  gallery?: { src: string; alt: string }[];
  /** Sidebar facts on the case-study page, e.g. deliverable, what's inside. */
  details?: { label: string; value: string }[];
  /** Small note under the visuals, e.g. that figures on screen are sample data. */
  visualNote?: string;
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
  {
    slug: "beximco-export-tracker",
    kind: "client",
    client: "BEXIMCO Group",
    title: "One workbook for every export order on the floor",
    sector: "Manufacturing / Textiles",
    region: "Bangladesh",
    year: "2026",
    nda: false,
    services: ["Spreadsheet system", "Excel automation", "Reporting"],
    summary:
      "A spreadsheet for BEXIMCO that tracks each export order from cutting to ex-factory, and flags the ones slipping behind before the ship date arrives.",
    problem:
      "Order status was spread across separate files and floor updates. To see which purchase orders were behind, someone had to chase each line by hand, so problems tended to show up close to the ship date, when they are hardest to fix.",
    approach: [
      "Built one workbook with a sheet per job: orders, line plan, fabric stock, buyers and shipments, all linked so a figure is entered once.",
      "Each order shows its cutting, sewing and finishing progress, and a formula sets its status (on track, at risk, late or shipped) from progress and days left to ex-factory.",
      "Added a summary at the top and two charts, so the week's position can be read in seconds without opening a filter.",
    ],
    outcome:
      "Delivered and in use. The screen shown here is the workbook's layout recreated with sample figures; the client's real order data stays private.",
    metrics: [],
    stack: ["Microsoft Excel", "Formulas", "Conditional formatting"],
    cover: "/work/beximco/cover.jpg",
    gallery: [
      { src: "/work/beximco/laptop.jpg", alt: "The BEXIMCO export-order workbook open on a laptop beside fabric swatches" },
    ],
    details: [
      { label: "Deliverable", value: "Excel workbook (.xlsx), ready to use" },
      { label: "Sheets", value: "Orders, Line plan, Fabric stock, Buyers, Shipments, Dashboard" },
      { label: "Tracks", value: "Cutting, sewing and finishing per order, plus days to ex-factory" },
      { label: "Status", value: "Set automatically by formula: on track, at risk, late or shipped" },
      { label: "Reports", value: "Weekly summary figures and two charts" },
    ],
    visualNote: "Workbook layout shown with sample figures — client data stays private",
    tint: { from: "#181716", to: "#61564A", ink: "#E4DFD7" },
    featured: true,
  },
];

export const featuredWork = work.filter((w) => w.featured);

export function getCaseStudy(slug: string) {
  return work.find((w) => w.slug === slug);
}
