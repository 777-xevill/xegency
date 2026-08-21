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
    title: "Xedineos — QR ordering for restaurants",
    sector: "Restaurant tech / SaaS",
    region: "[Where it's built for]",
    year: "[YEAR]",
    nda: false,
    services: ["Product design", "Full-stack build", "Founder-led"],
    summary:
      "A diner scans the code at the table and orders straight from their phone — the kitchen sees it land in real time, and the floor gets told the moment something needs attention, without a waiter ever having to check.",
    problem:
      "Most QR ordering is half a product: it gets the order from the table to a screen, and stops there. Nobody tells the kitchen the order actually arrived, nobody tells the floor a table is waiting on water or that food is ready to run — a human still has to notice, which is the exact job QR ordering was supposed to remove.",
    approach: [
      "Built the guest-facing menu and order flow first — scan, order, watch it move through Order placed → Accepted → Being prepared → Ready → Served, with Water, Waiter and Bill as one-tap requests instead of a raised hand.",
      "Paired it with a live kitchen display per table, so orders land as tickets the kitchen accepts and progresses themselves — no relay through a waiter's notepad.",
      "Closed the loop with a locked waiter's-phone screen that surfaces only what needs a human: a table asking for water, an order that's ready to run. Everything else stays automatic — that's the Autopilot.",
    ],
    outcome:
      "Built and tested end to end — guest ordering, kitchen display and waiter notifications all working together. In pre-launch, looking for the first pilot restaurant.",
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
