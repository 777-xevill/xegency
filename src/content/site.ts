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
 * "draft"  → robots.txt blocks every crawler and each page carries
 *            <meta name="robots" content="noindex">, so Google will not index
 *            a half-finished site. Unfilled [PLACEHOLDERS] show in italics.
 * "live"   → indexing and structured data on. Any [PLACEHOLDER] still left
 *            is hidden from visitors (see `shown` in src/lib/format.ts) — a
 *            missing price disappears rather than reading "[$0,000]".
 */
export const siteStatus: "draft" | "live" = "live";

export const site = {
  name: "Xegency",
  // Used for canonical URLs, sitemap and Open Graph.
  url: "https://www.xegency.com",
  tagline: "AI-native software studio",
  description:
    "Xegency builds AI agents, automation, custom software, websites and apps — plus the branding and Facebook & Instagram ads that bring customers to them.",
};

export const founder = {
  // Conversational display name, used in headlines and the signature.
  name: "Rifat",
  // Formal name — used on the fact sheet and in structured data.
  fullName: "Ashikur Rahman Rifat",
  role: "Founder & CEO",
  // ⚠️ Clients ask this constantly. Be specific — vagueness reads as evasion.
  location: "Dhaka, Bangladesh",
  timezone: "GMT+6",
  // How long you have actually been doing this work, agency or freelance.
  since: "2026",
  bio: "I started Xegency because I kept meeting founders with a real business running on duct tape — a website that undersold it, spreadsheets doing a database's job, hours lost to work a machine should be doing. I do the work myself, with a small circle of specialists I have worked with for years. You will not be handed to a junior after the kickoff call — the person you meet is the person who builds it.",
};

export const contact = {
  email: "rifat@xegency.com",
  // Optional. Leave as an empty string to hide it.
  phone: "",
  // A Cal.com / Calendly / Google Appointment link. Empty string hides the button.
  calendar: "https://cal.com/xegency/30min",
  socials: [
    { label: "X", href: "https://x.com/Xegency" },
    { label: "Instagram", href: "https://www.instagram.com/xegency" },
    { label: "Facebook", href: "https://www.facebook.com/xegency" },
    { label: "Threads", href: "https://www.threads.net/@xegency" },
    { label: "TikTok", href: "https://www.tiktok.com/@xegency" },
    { label: "GitHub", href: "https://github.com/777-xevill" },
  ],
};

export const availability = {
  status: "limited" as "open" | "limited" | "closed",
  // Evergreen on purpose: a dated label ("for September") goes stale the day
  // the month ends, and a stale date reads as an abandoned site.
  label: "Taking on 2 new projects a month",
  responseTime: "Replies within one business day",
};

/* --------------------------------------------------------------------------
   Proof numbers. These are the first thing a sceptical client scans, so an
   inflated one is expensive. Use what is true today — "9 projects" from a
   studio that shows the work beats "150+" from one that does not.
   -------------------------------------------------------------------------- */
export const stats = [
  { value: "11+", label: "Projects shipped" },
  { value: "5+", label: "Countries worked with" },
  { value: "76%", label: "Clients who came back" },
  // Not a measurement — a commitment already made in the process section,
  // so it is true by definition rather than a number anyone can disprove.
  { value: "30 days", label: "Free support after launch" },
];

/* --------------------------------------------------------------------------
   Who the work has been for. Names only, shown as a band under the hero.
   Only list a business you actually built for and would be happy to have
   phone you about it. ⚠️ Check Mito Skin Lab — if that build went through
   another agency, remove it.
   -------------------------------------------------------------------------- */
export const clients = [
  "Alpha Fuel",
  "Mito Skin Lab",
  "Cherry Drops",
  "Takeout Burgers",
  "Xedineos",
];

export const capabilities = [
  "AI agents",
  "Workflow automation",
  "Custom software",
  "SaaS products",
  "Web apps",
  "Mobile apps",
  "Websites",
  "Chatbots & assistants",
  "Dashboards & admin panels",
  "Browser extensions",
  "Telegram & WhatsApp bots",
  "Scrapers & data pipelines",
  "API integrations",
  "UI/UX design",
  "Brand identity",
  "Facebook & Instagram ads",
];

export const services = [
  {
    number: "01",
    title: "AI agents & automation",
    summary:
      "Software that does the repetitive work for you — lead research, inbox triage, reporting, data entry, follow-ups — wired into the tools you already use.",
    deliverables: [
      "Workflow mapping: what to automate, what to leave alone",
      "Agent design with human approval where it matters",
      "Integrations: Gmail, Sheets, CRMs, Slack, WhatsApp, Telegram",
      "Logs and a dashboard so you can see what it did",
      "Cost and failure alerts",
      "Handover docs and 30 days of tuning",
    ],
    timeline: "2–4 weeks",
    from: "[$0,000]",
  },
  {
    number: "02",
    title: "AI inside your product",
    summary:
      "Assistants that answer from your own documents, smart search, support bots, and AI features added to software you already run.",
    deliverables: [
      "Use-case and data review",
      "Retrieval over your docs, products or tickets (RAG)",
      "Chat, search or copilot interface",
      "Guardrails, evaluation set and usage limits",
      "Model choice tuned for cost and quality",
    ],
    timeline: "2–5 weeks",
    from: "[$0,000]",
  },
  {
    number: "03",
    title: "Custom software & SaaS",
    summary:
      "Platforms built around how your operation actually runs — internal tools, booking and ordering systems, member portals, full SaaS products.",
    deliverables: [
      "Discovery and requirement mapping",
      "System architecture and data model",
      "Admin panel your team can run without us",
      "Auth, roles, payments and notifications",
      "Weekly demos on a live staging link",
      "Launch, documentation and 30 days of support",
    ],
    timeline: "6–12 weeks",
    from: "[$0,000]",
  },
  {
    number: "04",
    title: "Websites & web apps",
    summary:
      "Fast, search-ready websites and landing pages that make a business look as serious as it is — built in Next.js, editable by you.",
    deliverables: [
      "Positioning, sitemap and copy direction",
      "Full visual design",
      "Responsive Next.js build",
      "CMS or admin so you can edit it yourself",
      "SEO foundations, analytics and event tracking",
      "Launch and 30 days of support",
    ],
    timeline: "2–6 weeks",
    from: "[$0,000]",
  },
  {
    number: "05",
    title: "Mobile apps",
    summary:
      "iOS and Android apps from one codebase, sharing a backend with your web product — from first screen to store listing.",
    deliverables: [
      "Product scope and user flows",
      "App design for both platforms",
      "Cross-platform build (React Native)",
      "Push notifications, auth and payments",
      "App Store and Play Store submission",
    ],
    timeline: "6–10 weeks",
    from: "[$0,000]",
  },
  {
    number: "06",
    title: "UI/UX design",
    summary:
      "Interfaces people understand on first use — researched, prototyped and clicked through before a line of production code is written.",
    deliverables: [
      "UX research and user flows",
      "Wireframes and clickable prototypes",
      "Full interface design for web and mobile",
      "Component library for your product",
      "Developer-ready handoff",
    ],
    timeline: "2–5 weeks",
    from: "[$0,000]",
  },
  {
    number: "07",
    title: "Creative branding",
    summary:
      "A brand people remember and trust — positioning, voice and a visual identity, plus the creative ideas that carry it into social, ads and launches. A system, not a logo dropped in a folder.",
    deliverables: [
      "Brand strategy: audience, positioning and voice",
      "Naming and tagline, if you need them",
      "Logo, type and colour system",
      "Social kit: post, story and ad templates",
      "Launch and content ideas, ready to shoot",
      "A written guideline your team can follow",
    ],
    timeline: "2–4 weeks",
    from: "[$0,000]",
  },
  {
    number: "08",
    title: "Facebook & Instagram ads",
    summary:
      "Meta ads run like the rest of our work — tracking wired in properly, creative made for the feed, and every dollar judged by the leads and sales it brings, not by likes.",
    deliverables: [
      "Ad account, Pixel and Conversions API set up properly",
      "Offer, audience and funnel strategy",
      "Ad creative: static, carousel and short-form video",
      "Landing pages built for the clicks you pay for",
      "Weekly testing and budget tuning",
      "A plain-English report: spend, leads, cost per result",
    ],
    timeline: "Setup in 1–2 weeks, then monthly",
    from: "[$000] / mo",
  },
  {
    number: "09",
    title: "Cloud, DevOps & integrations",
    summary:
      "Deployment, databases and the glue between your systems — so the software stays up, stays fast and talks to everything else.",
    deliverables: [
      "Hosting and database setup or migration",
      "CI/CD pipelines and preview deployments",
      "Payment, CRM and third-party API integrations",
      "Monitoring, uptime alerts and backups",
      "Security review and access cleanup",
    ],
    timeline: "1–3 weeks",
    from: "[$0,000]",
  },
  {
    number: "10",
    title: "Care & growth retainer",
    summary:
      "Software is a living thing. Monthly hours for new features, fixes, speed work and keeping your AI and automations tuned.",
    deliverables: [
      "Priority queue with agreed response times",
      "New features and pages on request",
      "Performance and uptime monitoring",
      "Automation and model-cost tuning",
      "Security patching and backups",
    ],
    timeline: "Monthly, cancel anytime",
    from: "[$000] / mo",
  },
];

/* --------------------------------------------------------------------------
   The engine room — the tools the work is built with. Keep this honest:
   trim anything you haven't shipped with, so a technical buyer who asks
   about any one of them gets a confident answer.
   -------------------------------------------------------------------------- */
export const techStack = [
  {
    group: "AI",
    tools: ["Claude", "OpenAI", "Gemini", "Vercel AI SDK", "LangChain", "pgvector", "n8n"],
  },
  {
    group: "Product",
    tools: ["Next.js", "React", "TypeScript", "Tailwind CSS", "React Native", "Expo"],
  },
  {
    group: "Backend",
    tools: ["Node.js", "Python", "Supabase", "PostgreSQL", "Redis", "Stripe"],
  },
  {
    group: "Cloud",
    tools: ["Vercel", "Cloudflare", "Docker", "GitHub Actions", "AWS"],
  },
];

/* --------------------------------------------------------------------------
   The AI audit — a small, fixed-scope first engagement. Lower risk for a
   buyer than a full build, and it usually turns into one.
   -------------------------------------------------------------------------- */
export const aiAudit = {
  duration: "5 working days",
  price: "[$000]",
  steps: [
    {
      title: "Map",
      body: "A working session on how your team spends its week — the tools, the handoffs, the copy-paste.",
    },
    {
      title: "Find",
      body: "The 3–5 tasks where AI or automation saves the most hours for the least risk, ranked.",
    },
    {
      title: "Price",
      body: "For each one: what it would take to build, what it costs to run, and the hours it gives back.",
    },
    {
      title: "Hand over",
      body: "A written plan you own. Build it with us, with someone else, or not at all.",
    },
  ],
};

export const process = [
  {
    step: "01",
    title: "Listen",
    duration: "30-minute call",
    body: "You tell me what the business actually needs to happen. I map the requirement before I propose anything — and if I am not the right person for it, I say so and tell you who is.",
  },
  {
    step: "02",
    title: "Architect",
    duration: "2–3 days",
    body: "A written scope with the system design, a fixed price, a dated timeline and a clear list of what is and is not included. You approve it before a single hour is billed.",
  },
  {
    step: "03",
    title: "Build",
    duration: "Weekly demos",
    body: "Built on a staging link you can open any time. You see working software in the first week and every week after — never a month of silence followed by a big reveal.",
  },
  {
    step: "04",
    title: "Prove",
    duration: "Before launch",
    body: "Tested on real devices and real data, documented, and checked against the signed scope line by line. You sign off on what was agreed, not on a feeling.",
  },
  {
    step: "05",
    title: "Launch & support",
    duration: "30 days included",
    body: "We go live together and I stay on for 30 days of free fixes. You get the code, the accounts and the docs — all of it in your name — plus a roadmap if you want to keep going.",
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
    a: "Xegency is a studio led by me, with a small group of specialists — a copywriter, a motion designer, a Meta ads specialist, a back-end developer — who I bring in per project. I say this openly because you will find out anyway, and because it is the reason the work is good: nothing gets handed down to whoever was free that week.",
  },
  {
    q: "Where are you based, and does that matter?",
    a: "I work from Dhaka, Bangladesh, on GMT+6. In practice it has never been the problem people expect. I keep overlapping hours with your team, everything is agreed in writing, and you can see the work on a live staging link at any hour without waiting for me to wake up.",
  },
  {
    q: "What exactly can you build?",
    a: "Anything that runs on a computer or a phone: AI agents and automations, chatbots, custom software and SaaS, websites, web and mobile apps, dashboards, browser extensions, bots and integrations. We also build the brand around it and run the Facebook and Instagram ads that bring people to it. What we don't do is anything outside the screen — no hardware, no print.",
  },
  {
    q: "We want to use AI but don't know where to start.",
    a: "That's what the AI audit is for. In five working days we map how your team works, find the few tasks where AI saves real hours, and hand you a written plan with build and running costs. You own the plan whether or not we build it.",
  },
  {
    q: "How much does a project cost?",
    a: "It depends on what's being built — mostly the number of screens and integrations, and how much AI usage it needs to run. After a 30-minute call you get one fixed number in a written proposal. I do not do open-ended hourly billing.",
  },
  {
    q: "How do payments work?",
    a: "Split across milestones: a deposit to book the slot, one at design sign-off, one at launch. Invoiced through Wise or bank transfer, with a proper invoice every time for your accounts.",
  },
  {
    q: "What if I do not like the design?",
    a: "You would know long before it got that far — direction is agreed in week one and you see progress weekly. Each design stage includes two full rounds of revisions. If we are genuinely not aligned after the first stage, you can stop there and keep everything produced to that point.",
  },
  {
    q: "How long does it take?",
    a: "An automation or a landing page is usually 2–4 weeks. A full website is 2–6 weeks, and custom software or a mobile app 6–12 weeks from kickoff. The single biggest variable is how fast content and feedback come back from your side, and I will tell you that clearly up front.",
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
  { label: "Studio lead", value: "Ashikur Rahman Rifat, Founder & CEO" },
  { label: "Founded", value: "2026" },
  { label: "Based in", value: "Dhaka, Bangladesh" },
  { label: "Working hours", value: "GMT+6, 09:00–18:00" },
  { label: "Languages", value: "English, Bengali" },
  { label: "Team", value: "Studio lead plus specialist collaborators, per project" },
  { label: "Contracts", value: "Written agreement on every project · NDAs on request" },
  { label: "Invoicing", value: "Wise or bank transfer, milestone-based" },
  { label: "Typical project", value: "[$0,000] – [$00,000]" },
  { label: "Currently", value: availability.label },
];

export const principles = [
  {
    title: "Say the number",
    body: "One fixed price in the proposal, no surprise line items at the end. If something is going to cost more, you hear it before it happens, not after.",
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
  { label: "Services", href: "/services" },
  { label: "AI Audit", href: "/#ai-audit" },
  { label: "Work", href: "/work" },
  { label: "Studio", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
