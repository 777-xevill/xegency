/* ============================================================================
   XEGENCY — FOUNDER PRODUCTS
   ----------------------------------------------------------------------------
   Unlike src/content/work.ts, these two are REAL — your own products, not
   templates to swap out. I just don't have the details yet, so everything
   specific is a [PLACEHOLDER]. Fill these in the same way as the rest of the
   site: search for [BRACKETS] with `npm run todo`.

   Known so far:
     1. A QR ordering platform for restaurants — built, not yet live.
     2. A second startup — name and description still to come.

   `status` drives the small pill shown on the card and the case-study page,
   so it's fine (and honest) for it to say "In development" or "Built —
   pre-launch" rather than pretending something is live before it is.
   ========================================================================== */

import type { CaseStudy } from "./work";

export type Product = CaseStudy & {
  /** "Live" | "Built — pre-launch" | "In development" */
  status: string;
  /** Product URL once it has one. null hides the "Visit" link. */
  link: string | null;
};

export const products: Product[] = [
  {
    slug: "qr-ordering-platform",
    kind: "product",
    status: "Built — pre-launch",
    client: "Founder-led product",
    title: "[PRODUCT NAME] — QR ordering for restaurants",
    sector: "Restaurant tech / SaaS",
    region: "[Where it's built for]",
    year: "[YEAR]",
    nda: false,
    services: ["Product design", "Full-stack build", "Founder-led"],
    summary:
      "[One or two sentences: a diner scans a code at the table and orders directly — describe what the restaurant gets on their side.]",
    problem:
      "[The real problem you saw with how restaurants were handling QR ordering before you built this — slow menus, no live kitchen view, clunky payment, whatever it actually was.]",
    approach: [
      "[What you built first, and why that came before anything else.]",
      "[The next real decision — e.g. how orders reach the kitchen, how menus are managed.]",
      "[Anything about payments, multi-location support, or offline handling worth mentioning.]",
    ],
    outcome:
      "[Where it stands today: built and tested, in pilot with a restaurant, waiting on X before launch — whatever is true right now.]",
    metrics: [
      { value: "Pre-launch", label: "Status" },
      { value: "[00]", label: "Restaurants in pilot" },
      { value: "[0]", label: "Months in build" },
    ],
    stack: ["[Your real stack — e.g. Next.js, Stripe, Postgres]"],
    cover: null,
    tint: { from: "#3D3833", to: "#181716", ink: "#E4DFD7" },
    featured: true,
    link: null,
  },
  {
    slug: "second-startup",
    kind: "product",
    status: "In development",
    client: "Founder-led product",
    title: "[STARTUP NAME]",
    sector: "[SaaS category]",
    region: "[Where it's aimed at]",
    year: "[YEAR]",
    nda: false,
    services: ["[Product design]", "[Full-stack build]"],
    summary: "[What it does, in one line — the job it does for its user.]",
    problem: "[The problem this startup exists to solve, and for whom.]",
    approach: [
      "[What's been built or decided so far.]",
      "[What you're working on next.]",
    ],
    outcome: "[Current status — idea, prototype, in build, seeking users.]",
    metrics: [{ value: "In development", label: "Status" }],
    stack: ["[Your real stack]"],
    cover: null,
    tint: { from: "#61564A", to: "#221F1D", ink: "#E4DFD7" },
    featured: true,
    link: null,
  },
];

export const featuredProducts = products.filter((p) => p.featured);

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
