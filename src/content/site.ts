/* ============================================================================
   XEGENCY — SITE CONTENT
   ----------------------------------------------------------------------------
   This is the only file you need to edit for day-to-day copy changes.

   Anything written as [LIKE THIS] is a placeholder for a fact I do not know.
   Replace every one of them before you launch. I deliberately did not invent
   your name, city, numbers or client results — a prospect who checks a fake
   claim is a prospect you lose for good, which is the exact opposite of what
   this site is for.
   ========================================================================== */

/**
 * "draft"  → shows a fixed banner reminding you placeholders are still live,
 *            and adds <meta name="robots" content="noindex"> so Google will
 *            not index a half-finished site.
 * "live"   → banner off, indexing on. Only flip this once every [PLACEHOLDER]
 *            below is gone.
 */
export const siteStatus: "draft" | "live" = "draft";

export const site = {
  name: "Xegency",
  // Used for canonical URLs, sitemap and Open Graph. Update when you buy the domain.
  url: "https://xegency.com",
  tagline: "Independent web design & development studio",
  description:
    "Xegency is a small, senior web studio. We design and build fast, considered websites for founders and brands who are tired of looking smaller than they are.",
};

export const brand = {
  /**
   * When your logo is ready: drop it at /public/brand/logo.svg and set
   * `logo` to "/brand/logo.svg". Add a light-on-dark version as
   * /public/brand/logo-invert.svg for the dark sections and footer.
   * While both are null the site uses a typographic wordmark, which is a
   * perfectly respectable place to start.
   */
  logo: null as string | null,
  logoInvert: null as string | null,
};

export const founder = {
  // ⚠️ Guessed from your email address — correct this to your full name.
  name: "Rifat",
  role: "Founder & CEO",
  // ⚠️ Clients ask this constantly. Be specific — vagueness reads as evasion.
  location: "[CITY, COUNTRY]",
  timezone: "[GMT+0]",
  // How long you have actually been doing this work, agency or freelance.
  since: "[YEAR]",
  bio: "I started Xegency because I kept meeting founders with a real business and a website that quietly undersold it. I do the work myself, with a small circle of specialists I have worked with for years. You will not be handed to a junior after the kickoff call — the person you meet is the person who builds it.",
};

export const contact = {
  email: "[you@xegency.com]",
  // Optional. Leave as an empty string to hide it.
  phone: "",
  // A Cal.com / Calendly / Google Appointment link. Empty string hides the button.
  calendar: "[https://cal.com/your-handle]",
  socials: [
    { label: "LinkedIn", href: "[https://linkedin.com/in/your-handle]" },
    { label: "Instagram", href: "[https://instagram.com/your-handle]" },
    { label: "GitHub", href: "[https://github.com/your-handle]" },
  ],
};

export const availability = {
  status: "limited" as "open" | "limited" | "closed",
  label: "Taking on 2 projects for [MONTH YEAR]",
  responseTime: "Replies within one business day",
};

/* --------------------------------------------------------------------------
   Proof numbers. These are the first thing a sceptical client scans, so an
   inflated one is expensive. Use what is true today — "9 projects" from a
   studio that shows the work beats "150+" from one that does not.
   -------------------------------------------------------------------------- */
export const stats = [
  { value: "[00]", label: "Websites shipped" },
  { value: "[00]", label: "Countries worked with" },
  { value: "[0.0s]", label: "Median load time at launch" },
  { value: "[00%]", label: "Clients who came back" },
];

export const capabilities = [
  "Website design",
  "SaaS product design",
  "Next.js builds",
  "Startup MVPs",
  "Landing pages",
  "Product engineering",
  "Performance",
  "SEO foundations",
  "Founder-led builds",
  "Analytics",
  "Maintenance",
  "Art direction",
];

export const services = [
  {
    number: "01",
    title: "Website design & build",
    summary:
      "The full thing, end to end. Strategy, art direction, design, build and launch — one team, one thread, one invoice.",
    deliverables: [
      "Discovery & positioning workshop",
      "Sitemap, wireframes and copy direction",
      "Full visual design in Figma",
      "Responsive build in Next.js or Webflow",
      "CMS setup so you can edit it yourself",
      "Launch, analytics and 30 days of support",
    ],
    timeline: "4–7 weeks",
    from: "[$0,000]",
  },
  {
    number: "02",
    title: "Landing pages that convert",
    summary:
      "One page, built to do one job. For launches, paid campaigns and offers that need to earn their ad spend back.",
    deliverables: [
      "Offer and message audit",
      "Conversion-led wireframe",
      "Design and build",
      "A/B-ready section structure",
      "Event tracking and dashboards",
    ],
    timeline: "10–14 days",
    from: "[$0,000]",
  },
  {
    number: "03",
    title: "Brand & digital identity",
    summary:
      "For teams whose visual language stopped matching their ambition. A system, not a logo file dropped in a folder.",
    deliverables: [
      "Identity direction and moodboarding",
      "Typography and colour system",
      "Component and layout library",
      "Social and deck templates",
      "A written guideline your team can follow",
    ],
    timeline: "3–5 weeks",
    from: "[$0,000]",
  },
  {
    number: "04",
    title: "Care & growth retainer",
    summary:
      "A site is a living thing. Monthly hours for changes, new pages, speed work and the small fixes that otherwise never happen.",
    deliverables: [
      "Priority queue with agreed response times",
      "New sections and pages on request",
      "Performance and uptime monitoring",
      "Monthly analytics readout",
      "Security patching and backups",
    ],
    timeline: "Monthly, cancel anytime",
    from: "[$000] / mo",
  },
];

export const process = [
  {
    step: "01",
    title: "Call",
    duration: "30 minutes",
    body: "You tell me what the business actually needs to happen. I tell you straight whether I am the right person for it — and if I am not, who is. No deck, no pitch theatre.",
  },
  {
    step: "02",
    title: "Proposal",
    duration: "2–3 days",
    body: "A written scope with a fixed price, a dated timeline and a clear list of what is and is not included. You approve it before a single hour is billed.",
  },
  {
    step: "03",
    title: "Design",
    duration: "1–3 weeks",
    body: "Direction first, then full pages. You see real work in the first week and every week after — never a month of silence followed by a big reveal.",
  },
  {
    step: "04",
    title: "Build",
    duration: "2–4 weeks",
    body: "Built on a staging link you can open any time and share with your team. Tested on real devices, tuned for speed, wired to your CMS.",
  },
  {
    step: "05",
    title: "Launch",
    duration: "1 day",
    body: "We go live together, watch the analytics, and I stay on for 30 days of free fixes. You get the code, the files and the accounts — all of it in your name.",
  },
];

/* --------------------------------------------------------------------------
   The objection-handling section. This exists because your prospects do not
   doubt your skill — they doubt the risk of paying a stranger on the internet.
   -------------------------------------------------------------------------- */
export const assurances = [
  {
    title: "You own everything",
    body: "Domain, hosting, code, design files and every account are registered in your name from day one. If we part ways, nothing of yours leaves with me.",
  },
  {
    title: "Milestone payments",
    body: "Never the full amount up front. Payment is split across signed milestones, so you are only ever exposed for the stage you are in.",
  },
  {
    title: "A real contract",
    body: "Every project runs on a written agreement covering scope, timeline, revisions, ownership and confidentiality. NDAs signed on request, no fuss.",
  },
  {
    title: "Weekly, in writing",
    body: "A short written update every week: what shipped, what is next, what I need from you. You are never left guessing where your money went.",
  },
];

/* --------------------------------------------------------------------------
   ⚠️ EMPTY ON PURPOSE. The testimonials section does not render until there
   is at least one entry. Fake praise is the fastest way to lose the kind of
   client you are trying to win — ask two past clients for two lines each.
   -------------------------------------------------------------------------- */
export const testimonials: {
  quote: string;
  name: string;
  role: string;
}[] = [
  // {
  //   quote: "They rebuilt our site in five weeks and our demo requests doubled.",
  //   name: "Full Name",
  //   role: "Founder, Company",
  // },
];

export const faqs = [
  {
    q: "Are you an agency or one person?",
    a: "Xegency is a studio led by me, with a small group of specialists — a copywriter, a motion designer, a back-end developer — who I bring in per project. I say this openly because you will find out anyway, and because it is the reason the work is good: nothing gets handed down to whoever was free that week.",
  },
  {
    q: "Where are you based, and does that matter?",
    a: "I work from [CITY, COUNTRY], on [GMT+0]. In practice it has never been the problem people expect. I keep overlapping hours with your team, everything is agreed in writing, and you can see the work on a live staging link at any hour without waiting for me to wake up.",
  },
  {
    q: "How much does a website cost?",
    a: "Most full site projects land between [$0,000] and [$00,000] depending on page count, CMS complexity and whether you need copy and photography. Landing pages start at [$0,000]. You get a fixed number in the proposal — I do not do open-ended hourly billing.",
  },
  {
    q: "How do payments work?",
    a: "Split across milestones: a deposit to book the slot, one at design sign-off, one at launch. Invoiced through [PAYMENT METHOD — e.g. Wise, Stripe, bank transfer], with a proper invoice every time for your accounts.",
  },
  {
    q: "What if I do not like the design?",
    a: "You would know long before it got that far — direction is agreed in week one and you see progress weekly. Each design stage includes two full rounds of revisions. If we are genuinely not aligned after the first stage, you can stop there and keep everything produced to that point.",
  },
  {
    q: "How long does it take?",
    a: "A landing page is 10–14 days. A full marketing site is typically 4–7 weeks from kickoff. The single biggest variable is how fast content and feedback come back from your side, and I will tell you that clearly up front.",
  },
  {
    q: "What happens after launch?",
    a: "Thirty days of free fixes for anything that breaks, plus a handover session and a short video walking your team through editing the site. After that you can take it from there or move onto a care retainer — no pressure either way.",
  },
  {
    q: "Can you work with my existing brand or developer?",
    a: "Yes, often. I can design to an existing brand system, hand off clean files to your in-house developer, or build on top of a design your team has already produced. Tell me what exists and I will scope around it.",
  },
];

/* --------------------------------------------------------------------------
   The studio fact sheet on /about. Boring on purpose — a prospect deciding
   whether to wire money to someone abroad reads this table more carefully
   than anything else on the site.
   -------------------------------------------------------------------------- */
export const studioFacts = [
  { label: "Studio lead", value: "[Your full name], Founder & CEO" },
  { label: "Founded", value: "[YEAR]" },
  { label: "Based in", value: "[CITY, COUNTRY]" },
  { label: "Working hours", value: "[GMT+0], [09:00–18:00]" },
  { label: "Languages", value: "[English, ...]" },
  { label: "Team", value: "Studio lead plus [0] specialist collaborators" },
  { label: "Contracts", value: "Written agreement on every project · NDAs on request" },
  { label: "Invoicing", value: "[Wise / Stripe / bank transfer], milestone-based" },
  { label: "Typical project", value: "[$0,000] – [$00,000]" },
  { label: "Currently", value: availability.label },
];

export const principles = [
  {
    title: "Say the number",
    body: "Prices on the site, fixed scope in the proposal, no surprise line items at the end. If something is going to cost more, you hear it before it happens, not after.",
  },
  {
    title: "Show the work weekly",
    body: "Progress you can open in a browser, every week, from week one. Long silences are where projects go wrong, so we design the process to make them impossible.",
  },
  {
    title: "Build it to last",
    body: "Clean, documented code on boring, well-supported technology. Your next developer should be able to pick it up without a rescue project.",
  },
  {
    title: "Fast is a feature",
    body: "Performance is not a final polish pass. It is a constraint we design inside from the first layout, because a beautiful site nobody waits for is worth nothing.",
  },
  {
    title: "Refuse the wrong job",
    body: "If a project needs something we're not the best choice for, we say so and point you elsewhere. A bad fit taken for the money costs everyone more than the fee.",
  },
  {
    title: "Leave you owning it",
    body: "Accounts, code, files and domains in your name from day one. No hostage hosting, no proprietary lock-in, no reason to stay other than the work being good.",
  },
];

export const nav = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Studio", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
