/* ============================================================================
   XEGENCY — CASE STUDIES
   ----------------------------------------------------------------------------
   ⚠️  READ THIS BEFORE YOU LAUNCH.

   The five entries below are TEMPLATES, not your projects. The structure,
   section order and length are what a sceptical buyer wants to read — the
   facts inside are not yours yet. Swap in real work: keep clients anonymous
   ("a D2C skincare brand") if you are under NDA, but keep the results true.

   Every number is written as [00%] on purpose. An invented metric is the one
   lie a prospect can actually catch, and catching it costs you the deal.

   Drop real screenshots into /public/work/<slug>/cover.jpg and set `cover`.
   Leave `cover` as null and the card renders a typographic panel instead —
   which looks deliberate, and is far better than a broken image.
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
    slug: "furniture-label-rebuild",
    kind: "client",
    client: "A Nordic furniture label",
    title: "A catalogue that finally looked as expensive as the chairs",
    sector: "E-commerce / Interiors",
    region: "Europe",
    year: "[2025]",
    nda: true,
    services: ["Art direction", "Web design", "Shopify build"],
    summary:
      "A twelve-year-old catalogue business selling £2,000 chairs through a template store. We rebuilt the whole shopfront around the photography.",
    problem:
      "They had beautiful product photography and a storefront that shrank it to thumbnails. Average order value was strong but sessions ended on the collection page — people were not getting far enough in to see what they were paying for. The team also could not add a new product without emailing a developer.",
    approach: [
      "Rebuilt the collection page as an editorial grid — full-bleed imagery, one product per row on mobile, no card borders competing with the photography.",
      "Wrote a product template that leads with material and maker detail before price, matching how their showroom staff actually sell.",
      "Moved every piece of content into Shopify metafields so the team can publish a new product, lookbook or story without touching code.",
      "Cut the page weight by serving responsive AVIF and deferring everything below the fold.",
    ],
    outcome:
      "The store now reads like the printed catalogue it grew out of, and the team publishes on their own. [Replace this paragraph with what actually changed for the client — revenue, time saved, a quote from them.]",
    metrics: [
      { value: "[00%]", label: "Increase in add-to-cart" },
      { value: "[0.0s]", label: "Largest contentful paint" },
      { value: "[00%]", label: "Drop in bounce on collections" },
    ],
    stack: ["Shopify", "Liquid", "Tailwind", "Figma"],
    cover: null,
    tint: { from: "#61564A", to: "#2f2b27", ink: "#E4DFD7" },
    featured: true,
  },
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
    slug: "clinic-group-booking",
    kind: "client",
    client: "A private clinic group",
    title: "Six locations, one booking flow, half the phone calls",
    sector: "Healthcare",
    region: "Middle East",
    year: "[2024]",
    nda: true,
    services: ["UX", "Web design", "Integration"],
    summary:
      "Six clinics, six websites, and a reception team drowning in calls that a booking form should have handled.",
    problem:
      "Each location had grown its own site and its own tone. Patients could not tell which clinic did what, so they phoned to ask — thousands of times a month. Reception staff were spending their day as a switchboard instead of on site.",
    approach: [
      "Consolidated six domains into one site with location pages that share a single design system and a single content model.",
      "Designed a booking flow that asks the three questions reception always asked, then hands the appointment straight to their practice software.",
      "Made every treatment page answer price, duration and recovery time above the fold, because those were the three calls.",
      "Built to WCAG 2.2 AA — real contrast, real focus states, full keyboard paths.",
    ],
    outcome:
      "Bookings moved online and the phones quietened. [Replace with the true numbers — calls per week before and after is the metric that will land with similar clients.]",
    metrics: [
      { value: "[00%]", label: "Of bookings now self-serve" },
      { value: "[00%]", label: "Fewer inbound calls" },
      { value: "AA", label: "WCAG 2.2 conformance" },
    ],
    stack: ["Next.js", "Contentful", "Twilio", "Vercel"],
    cover: null,
    tint: { from: "#A59B8F", to: "#61564A", ink: "#E4DFD7" },
    featured: true,
  },
  {
    slug: "coffee-roaster-launch",
    kind: "client",
    client: "A specialty coffee roaster",
    title: "A launch page that paid for its own ad spend",
    sector: "D2C / Food",
    region: "United Kingdom",
    year: "[2024]",
    nda: false,
    services: ["Landing page", "Copy direction", "Analytics"],
    summary:
      "One page, ten days, built for a subscription launch that had a fixed ad budget and no room to iterate slowly.",
    problem:
      "They had one shot at a seasonal launch, paid traffic already booked, and nowhere to send it. The main site was a general store that buried the subscription three clicks deep.",
    approach: [
      "Built a single page around the one decision: pick a roast, pick a frequency, subscribe.",
      "Wrote the section order to answer objections in the order the founder heard them at markets — freshness, commitment, and what happens if you go away.",
      "Wired event tracking per section so they could see exactly where people stopped scrolling.",
      "Shipped in ten days against a hard campaign date.",
    ],
    outcome:
      "The page went live on schedule and gave them a clear read on which message worked. [Replace with real conversion rate, cost per acquisition, or subscriber count.]",
    metrics: [
      { value: "[0.0%]", label: "Landing page conversion" },
      { value: "[00]", label: "Days from brief to live" },
      { value: "[00%]", label: "Lower cost per subscriber" },
    ],
    stack: ["Next.js", "Shopify Storefront API", "GA4"],
    cover: null,
    tint: { from: "#2f2b27", to: "#61564A", ink: "#E4DFD7" },
    featured: false,
  },
  {
    slug: "architecture-studio-portfolio",
    kind: "client",
    client: "An architecture studio",
    title: "A portfolio that stopped competing with the buildings",
    sector: "Architecture",
    region: "Asia",
    year: "[2024]",
    nda: true,
    services: ["Web design", "Design system", "Build"],
    summary:
      "Twenty years of projects, no archive, and a site that made award-winning work look like a slideshow.",
    problem:
      "Their practice was winning competitions and losing the follow-up. Prospective clients arriving from a press mention found a site with no project detail, no way to filter by building type, and images compressed into mush.",
    approach: [
      "Designed a quiet system — one typeface, a lot of white, and full-bleed imagery with nothing layered on top of it.",
      "Built a project archive filterable by type, year and status, so a hospital client can see only hospitals.",
      "Set up a CMS structure the studio's own staff maintain between competitions.",
      "Served original-resolution photography without paying for it in load time.",
    ],
    outcome:
      "The archive now does the work the practice used to do over email. [Replace with what changed — enquiry quality, time saved, projects published per month.]",
    metrics: [
      { value: "[000]", label: "Projects archived" },
      { value: "[00%]", label: "Longer average session" },
      { value: "[0.0s]", label: "Load time, full-bleed imagery" },
    ],
    stack: ["Next.js", "Payload CMS", "Cloudflare Images"],
    cover: null,
    tint: { from: "#3d3833", to: "#A59B8F", ink: "#E4DFD7" },
    featured: false,
  },
];

export const featuredWork = work.filter((w) => w.featured);

export function getCaseStudy(slug: string) {
  return work.find((w) => w.slug === slug);
}
