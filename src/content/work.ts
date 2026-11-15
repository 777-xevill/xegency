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
  {
    slug: "hameem-line-efficiency",
    kind: "client",
    client: "Ha-Meem Group",
    title: "Every sewing line's efficiency, hour by hour",
    sector: "Manufacturing / Garments",
    region: "Bangladesh",
    year: "2026",
    nda: false,
    services: ["Spreadsheet system", "Excel automation", "Reporting"],
    summary:
      "A line-efficiency workbook for Ha-Meem's sewing floors: hourly output, efficiency and defects per line, with lines that slip flagged before the shift ends.",
    problem:
      "Hourly production counts were written up by each line supervisor and added together later. By the time anyone saw that a line had fallen behind or that defects were climbing, the day's output was already lost.",
    approach: [
      "Built one workbook where supervisors enter hourly output per line, and everything else (target hit, efficiency, quality pass rate) is calculated from it.",
      "Each line gets a status set by formula: on target, watch, below, or on changeover, so the floor manager sees problems at a glance.",
      "Added the day's summary at the top, an output-by-hour chart and a defects (DHU) sheet for quality follow-up.",
    ],
    outcome:
      "Delivered and in use. The screen shown is the workbook's layout with sample figures; the client's production data stays private.",
    metrics: [],
    stack: ["Microsoft Excel", "Formulas", "Conditional formatting"],
    cover: "/work/hameem/cover.jpg",
    details: [
      { label: "Deliverable", value: "Excel workbook (.xlsx), ready to use" },
      { label: "Sheets", value: "Today, Hourly log, Operators, Styles & SMV, Defects, Dashboard" },
      { label: "Tracks", value: "Output, efficiency, quality pass and DHU per line, every hour" },
      { label: "Status", value: "Set automatically: on target, watch, below or changeover" },
      { label: "Reports", value: "Daily summary and output-by-hour chart" },
    ],
    visualNote: "Workbook layout shown with sample figures — client data stays private",
    tint: { from: "#181716", to: "#61564A", ink: "#E4DFD7" },
    featured: true,
  },
  {
    slug: "square-sales-mis",
    kind: "client",
    client: "Square Group",
    title: "A monthly sales report that builds itself",
    sector: "Pharma & Consumer Goods",
    region: "Bangladesh",
    year: "2026",
    nda: false,
    services: ["Reporting automation", "Dashboard", "Data cleanup"],
    summary:
      "An automated monthly sales report for Square: distributor sales files go in, a clean dashboard with targets, regions and collections comes out on the 1st.",
    problem:
      "The monthly sales report was put together by hand from many distributor files. It took days each month, figures did not always match between versions, and management saw last month's position late.",
    approach: [
      "Set up one place where the distributor sales files land, with checks that catch missing or mismatched figures.",
      "Built the report to rebuild itself on the 1st of every month: net sales, target achieved, collections and the regions below target.",
      "Added a 12-month sales vs target chart, a by-region table and one-click export to PDF and Excel for management.",
    ],
    outcome:
      "Delivered and in use. The screen shown is the report's layout with sample figures; the client's sales data stays private.",
    metrics: [],
    stack: ["Google Sheets", "Apps Script", "Looker-style dashboard"],
    cover: "/work/square/cover.jpg",
    details: [
      { label: "Deliverable", value: "Automated monthly report and dashboard" },
      { label: "Source", value: "Distributor sales files" },
      { label: "Runs", value: "Automatically on the 1st of each month" },
      { label: "Shows", value: "Sales vs target, regions, collections, 12-month trend" },
      { label: "Exports", value: "PDF and Excel, ready to send to management" },
    ],
    visualNote: "Report layout shown with sample figures — client data stays private",
    tint: { from: "#181716", to: "#61564A", ink: "#E4DFD7" },
    featured: true,
  },
  {
    slug: "pran-dealer-orders",
    kind: "client",
    client: "PRAN",
    title: "Dealer orders from WhatsApp to the loading list",
    sector: "FMCG / Distribution",
    region: "Bangladesh",
    year: "2026",
    nda: false,
    services: ["Web app", "Order management", "Automation"],
    summary:
      "A dealer order desk for PRAN's distribution: orders from WhatsApp, phone and field reps in one list, matched to stock and grouped into truck routes.",
    problem:
      "Dealer orders arrived by WhatsApp, phone calls and field reps, and were copied into sheets by hand. Orders got missed, stock shortages were found late, and building each truck's loading list took hours before dispatch.",
    approach: [
      "Built a web app where every dealer order lands in one list, whichever way it came in, including importing WhatsApp orders.",
      "Each order is checked against depot stock, so shortages show up as soon as an order is entered, not at loading time.",
      "Orders are grouped by route, and the app shows how full each truck is and builds the loading list for dispatch.",
    ],
    outcome:
      "Delivered and in use. The screen shown is the app's layout with sample data; dealer names and figures are not the client's.",
    metrics: [],
    stack: ["Next.js", "Database", "WhatsApp import"],
    cover: "/work/pran/cover.jpg",
    details: [
      { label: "Deliverable", value: "Web app for the depot team" },
      { label: "Order sources", value: "WhatsApp, phone calls, field rep app" },
      { label: "Checks", value: "Every order against depot stock" },
      { label: "Dispatch", value: "Orders grouped by route, truck load and loading list" },
      { label: "Views", value: "Today, Dealers, Routes, Stock, Invoices, Reports" },
    ],
    visualNote: "App shown with sample data — dealer names and figures are not the client's",
    tint: { from: "#181716", to: "#61564A", ink: "#E4DFD7" },
    featured: true,
  },
  {
    slug: "royal-enfield-test-ride-booking",
    kind: "client",
    client: "Royal Enfield",
    title: "Book a test ride in under a minute",
    sector: "Automotive / Motorcycles",
    region: "Bangladesh",
    year: "2026",
    nda: false,
    services: ["Web design", "Booking system", "WhatsApp automation"],
    summary:
      "A test-ride booking page for Royal Enfield showrooms: pick a bike, pick a free slot, and get a WhatsApp confirmation, while the showroom sees the booking instantly.",
    problem:
      "Test rides were booked by phone or message, then written down by hand. Riders were not sure which bikes were free when, and showrooms lost leads who never called back.",
    approach: [
      "Designed a booking page where riders choose a model, a day and a free time slot, with taken slots shown live.",
      "Every booking goes straight to the showroom team, and the rider gets a WhatsApp confirmation with the address and what to bring.",
      "Added a reminder message before the ride, so fewer bookings turn into no-shows.",
    ],
    outcome:
      "Delivered and in use. The screen shown is the booking page's layout with sample details; customer names and numbers are not real.",
    metrics: [],
    stack: ["Next.js", "Booking calendar", "WhatsApp messages"],
    cover: "/work/royal-enfield/cover.jpg",
    details: [
      { label: "Deliverable", value: "Booking page connected to the showroom" },
      { label: "Rider picks", value: "Model, day and free time slot" },
      { label: "Showroom gets", value: "Each booking instantly, with rider details" },
      { label: "Rider gets", value: "WhatsApp confirmation and reminder" },
      { label: "Showrooms", value: "Several showrooms, each with its own slots" },
    ],
    visualNote: "Page shown with sample details — customer names and numbers are not real",
    tint: { from: "#181716", to: "#61564A", ink: "#E4DFD7" },
    featured: true,
  },
  {
    slug: "bmw-whatsapp-leads",
    kind: "client",
    client: "BMW",
    title: "Every WhatsApp enquiry answered, and the test drive booked",
    sector: "Automotive / Car showroom",
    region: "Bangladesh",
    year: "2026",
    nda: false,
    services: ["AI assistant", "WhatsApp automation", "Lead follow-up"],
    summary:
      "A WhatsApp assistant for a BMW showroom: it answers enquiries from ads straight away, sends the price sheet, books the test drive and hands the lead to a salesperson.",
    problem:
      "Enquiries from ads came in on WhatsApp at all hours. Replies depended on who was free, so some leads waited hours, and some were never followed up at all.",
    approach: [
      "Set up an assistant that replies to every WhatsApp enquiry within seconds, any time of day.",
      "It answers common questions, sends the right price sheet and offers free test-drive slots the customer can tap to book.",
      "Every booked lead is handed to a named salesperson, who picks up the chat from there.",
    ],
    outcome:
      "Delivered and in use. The chat shown uses sample messages; it is not a real customer conversation.",
    metrics: [],
    stack: ["WhatsApp Business API", "AI assistant", "Booking calendar"],
    cover: "/work/bmw/cover.jpg",
    details: [
      { label: "Deliverable", value: "WhatsApp assistant for the sales team" },
      { label: "Replies", value: "Within seconds, any time of day" },
      { label: "Sends", value: "Price sheets and free test-drive slots" },
      { label: "Books", value: "Test drives straight into the showroom calendar" },
      { label: "Hands over", value: "Every booked lead to a named salesperson" },
    ],
    visualNote: "Chat shown with sample messages — not a real customer conversation",
    tint: { from: "#181716", to: "#61564A", ink: "#E4DFD7" },
    featured: true,
  },
];

export const featuredWork = work.filter((w) => w.featured);

export function getCaseStudy(slug: string) {
  return work.find((w) => w.slug === slug);
}
