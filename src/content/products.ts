/* ============================================================================
   XEGENCY — FOUNDER PRODUCTS
   ----------------------------------------------------------------------------
   Software Xegency designs, builds and owns. Today that is Xedineos (QR
   ordering, built, pre-launch) plus six AI products that solve a specific
   business problem each: WhatsApp auto-reply, lead follow-up, customer
   support, invoice entry, stock planning and the daily business summary.

   The AI products are DEMO BUILDS — working concepts shown with sample data,
   not live customer deployments. `status` says so on every card, and the
   metrics only state what the product does, never invented results. Edit the
   copy, stack and year freely; when one gets a real customer or a real
   screenshot, put the screenshot at /public/products/<slug>/cover.jpg, set
   `cover`, and update `status`.
   ========================================================================== */

import type { CaseStudy } from "./work";

export type Product = CaseStudy & {
  /** "Live" | "Built — pre-launch" | "Demo build" | "In development" */
  status: string;
  /** Product URL once it has one. null hides the "Visit" link. */
  link: string | null;
};

export const products: Product[] = [
  {
    slug: "whatsapp-auto-reply",
    kind: "product",
    status: "Demo build",
    client: "Xegency AI product",
    title: "ReplyDesk — an AI that answers your WhatsApp for you",
    sector: "AI / Customer messaging",
    region: "Bangladesh & South Asia",
    year: "2026",
    nda: false,
    services: ["AI design", "WhatsApp integration", "Full-stack build"],
    summary:
      "Customers message your business on WhatsApp at midnight and expect an answer. ReplyDesk replies in seconds — price, stock, delivery, booking — in Bangla or English, and hands over to you when it isn't sure.",
    problem:
      "For most small businesses in Bangladesh, WhatsApp is the shop. Orders, questions and complaints all land in one chat app, and the owner is the only person reading it. Reply an hour late and the customer has already bought from someone else; reply to everything by hand and the day disappears into typing the same price again.",
    approach: [
      "Connected to the official WhatsApp Business API, so it answers from your own number — no screenshots, no personal-account hacks that get banned.",
      "Taught it the business: catalogue, prices, opening hours, delivery areas and policies live in one place, and every answer is drawn from that — it doesn't guess.",
      "Added a safety net: refunds, complaints and anything it's unsure about go to a human instantly, with the whole conversation attached, and the AI goes quiet until you've replied.",
      "Built a simple dashboard showing what was answered, what was handed over and which questions keep coming up, so you can see what customers actually want.",
    ],
    outcome:
      "A working demo handles a full order conversation end to end — question, stock check, reservation, confirmation — in both Bangla and English. Shown here with sample data; looking for the first pilot business to run it on a real number.",
    metrics: [
      { value: "24/7", label: "Always on, no staff needed" },
      { value: "2", label: "Languages — Bangla and English" },
      { value: "Human", label: "Takes over when it's unsure" },
    ],
    stack: ["Next.js", "WhatsApp Business API", "Claude API", "PostgreSQL"],
    cover: null,
    tint: { from: "#0b2e1f", to: "#0f0e0d", ink: "#E4DFD7" },
    featured: true,
    link: null,
  },
  {
    slug: "qr-ordering-platform",
    kind: "product",
    status: "Built — pre-launch",
    client: "Founder-led product",
    title: "Xedineos — QR ordering for restaurants",
    sector: "Restaurant tech / SaaS",
    region: "Bangladesh",
    year: "2026",
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
      { value: "3", label: "Screens kept in sync — guest, kitchen, waiter" },
      { value: "5", label: "Order stages tracked live" },
    ],
    stack: ["Next.js", "React", "TypeScript", "PostgreSQL", "WebSockets"],
    cover: null,
    tint: { from: "#3D3833", to: "#181716", ink: "#E4DFD7" },
    featured: true,
    link: null,
  },
  {
    slug: "ai-lead-qualifier",
    kind: "product",
    status: "Demo build",
    client: "Xegency AI product",
    title: "Leadsmith — AI that scores and follows up every lead",
    sector: "AI / Sales automation",
    region: "Global",
    year: "2026",
    nda: false,
    services: ["AI design", "CRM build", "Automation"],
    summary:
      "Every enquiry from your website, Facebook ads and WhatsApp lands in one pipeline. Leadsmith scores each lead, sends the follow-ups for you, and only pulls you in when someone is ready to talk.",
    problem:
      "Small sales teams lose deals in the gap between 'we got your enquiry' and the second follow-up that never happens. Leads arrive from five places, nobody knows which are serious, and the good ones go cold while the owner chases the time-wasters.",
    approach: [
      "Pulled every lead source — web forms, ad forms, WhatsApp and email — into a single pipeline, deduplicated by phone number.",
      "Had the AI read each enquiry and score it on budget, urgency and fit, with the one-line reason shown next to the score so it's never a black box.",
      "Wrote the follow-up sequence once: the AI sends the second and third nudge in the lead's own words and language, and stops the moment they reply.",
      "Booked meetings straight into your calendar when a lead says yes — the human only appears for the conversation that matters.",
    ],
    outcome:
      "The pipeline, AI scoring and automatic follow-ups all work in the demo. Shown with sample leads; looking for a first agency or service business to pilot it on live enquiries.",
    metrics: [
      { value: "1", label: "Inbox for every lead source" },
      { value: "Auto", label: "Follow-ups until they reply" },
      { value: "0–100", label: "Lead score, with the reason shown" },
    ],
    stack: ["Next.js", "PostgreSQL", "Claude API", "Google Calendar API"],
    cover: null,
    tint: { from: "#3a2410", to: "#0f0e0d", ink: "#E4DFD7" },
    featured: false,
    link: null,
  },
  {
    slug: "ai-support-agent",
    kind: "product",
    status: "Demo build",
    client: "Xegency AI product",
    title: "SupportPilot — a support agent trained on your own documents",
    sector: "AI / Customer support",
    region: "Global",
    year: "2026",
    nda: false,
    services: ["AI design", "RAG pipeline", "Full-stack build"],
    summary:
      "Upload your policies, price list and manuals; SupportPilot answers customer questions from them and shows exactly which page the answer came from. If it can't find it, it says so and brings in a person.",
    problem:
      "Support teams answer the same twenty questions all day, and a generic chatbot is worse than none — it invents refund policies that don't exist. Businesses need answers that are fast and provably true to their own rules.",
    approach: [
      "Built a document library: PDFs, web pages and spreadsheets are read, split and indexed so the AI searches your material, not the internet.",
      "Made every answer cite its source — document and page — so staff and customers can check it in one click.",
      "Set a hard rule: if nothing in the documents answers the question, it says 'I'm not sure' and routes to a human instead of guessing.",
      "Added a thumbs-up/down on each answer that feeds a list of gaps, telling you which document is missing or out of date.",
    ],
    outcome:
      "The demo answers questions from a sample policy library with page-level citations and clean handover to a person. Looking for a first business with a real document set to pilot on.",
    metrics: [
      { value: "100%", label: "Answers cite a source" },
      { value: "Handover", label: "To a person when unsure" },
      { value: "Any PDF", label: "Policies, manuals, price lists" },
    ],
    stack: ["Next.js", "Claude API", "pgvector", "PostgreSQL"],
    cover: null,
    tint: { from: "#0f2a3d", to: "#0f0e0d", ink: "#E4DFD7" },
    featured: false,
    link: null,
  },
  {
    slug: "invoice-reader",
    kind: "product",
    status: "Demo build",
    client: "Xegency AI product",
    title: "InvoiceIQ — photograph a bill, skip the data entry",
    sector: "AI / Finance operations",
    region: "Bangladesh & South Asia",
    year: "2026",
    nda: false,
    services: ["AI design", "Document extraction", "Accounting integration"],
    summary:
      "Take a photo of a supplier invoice or receipt. InvoiceIQ reads the vendor, date, VAT and total, categorises it, and files it in your accounts — no typing, no end-of-month pile.",
    problem:
      "Someone in every small business spends days each month typing paper invoices into a spreadsheet — and every typo is a number the accountant has to chase later. It's the most boring job in the company and it never goes away.",
    approach: [
      "Built the capture step around a phone photo or a forwarded PDF, because that's how invoices actually arrive.",
      "Used an AI reader to pull out vendor, invoice number, date, line items, VAT and total, and to flag anything that doesn't add up.",
      "Added category rules that learn from corrections: fix 'Rahim Traders = Inventory' once and it's right every time after.",
      "Sent approved invoices to Google Sheets or the accounting tool, with the original image attached for audit.",
    ],
    outcome:
      "The demo reads a sample invoice into six clean fields and syncs it to a ledger. Looking for a first shop, clinic or small firm to try it on a month of real bills.",
    metrics: [
      { value: "Seconds", label: "From photo to filed" },
      { value: "6", label: "Fields read per invoice" },
      { value: "Flagged", label: "Totals that don't add up" },
    ],
    stack: ["Next.js", "Claude API", "Google Sheets API", "PostgreSQL"],
    cover: null,
    tint: { from: "#2a1f4a", to: "#0f0e0d", ink: "#E4DFD7" },
    featured: false,
    link: null,
  },
  {
    slug: "stock-forecasting",
    kind: "product",
    status: "Demo build",
    client: "Xegency AI product",
    title: "StockSense — know what to reorder before you run out",
    sector: "AI / Retail operations",
    region: "Bangladesh & South Asia",
    year: "2026",
    nda: false,
    services: ["AI design", "Forecasting", "Dashboard build"],
    summary:
      "StockSense reads your sales history, spots seasons and festival spikes, and tells you each week what to reorder and how much — so shelves stay full without cash sitting in dead stock.",
    problem:
      "Shop owners reorder by gut feeling. Order too little and the best seller is gone before Eid; order too much and money is stuck in boxes nobody buys. Both mistakes are invisible until they've already cost you.",
    approach: [
      "Imported sales from a spreadsheet, POS export or WooCommerce/Shopify store — no new system to learn.",
      "Built a forecast per product that accounts for weekly rhythm, festivals and recent trend, and shows the range, not a falsely exact number.",
      "Turned it into a plain weekly list: what to order, how many, and how urgent — red, amber or fine.",
      "Added a WhatsApp or email alert for items about to run out, sent to whoever places the orders.",
    ],
    outcome:
      "The demo forecasts sample sales and produces a weekly reorder list with urgency colours. Looking for a first grocery, pharmacy or D2C shop to test against a real sales history.",
    metrics: [
      { value: "Weekly", label: "Reorder list, ready to act on" },
      { value: "Festival", label: "Season spikes built in" },
      { value: "Alerts", label: "Before an item runs out" },
    ],
    stack: ["Next.js", "Python", "PostgreSQL", "Recharts"],
    cover: null,
    tint: { from: "#0c3a35", to: "#0f0e0d", ink: "#E4DFD7" },
    featured: false,
    link: null,
  },
  {
    slug: "daily-business-digest",
    kind: "product",
    status: "Demo build",
    client: "Xegency AI product",
    title: "Briefly — your business in thirty seconds, every morning",
    sector: "AI / Business reporting",
    region: "Global",
    year: "2026",
    nda: false,
    services: ["AI design", "Reporting", "Messaging integration"],
    summary:
      "Every morning Briefly reads your sales, orders and refunds and sends the owner a short plain-language summary on WhatsApp or email — what changed, what's unusual and what to do about it.",
    problem:
      "Owners don't have time to open five dashboards, so they run the business on a feeling and find out about problems a week late. Reports exist; nobody reads them.",
    approach: [
      "Connected the numbers you already keep — a sheet, a store, a POS — and refreshed them every night.",
      "Had the AI write the summary like a person would: headline numbers first, then only what's different from normal.",
      "Added a 'what to do' line to each insight, so a stock-out warning comes with a suggested reorder quantity.",
      "Delivered it at a time you choose, on the app you actually open — WhatsApp, email or Telegram.",
    ],
    outcome:
      "The demo produces a full morning digest from sample sales data, with insights and suggested actions. Looking for a first owner-run business to try it on a live feed.",
    metrics: [
      { value: "30s", label: "To read, every morning" },
      { value: "3", label: "Delivery channels" },
      { value: "Action", label: "Each insight says what to do" },
    ],
    stack: ["Next.js", "Claude API", "WhatsApp Business API", "PostgreSQL"],
    cover: null,
    tint: { from: "#3d3210", to: "#0f0e0d", ink: "#E4DFD7" },
    featured: false,
    link: null,
  },
];

export const featuredProducts = products.filter((p) => p.featured);

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
