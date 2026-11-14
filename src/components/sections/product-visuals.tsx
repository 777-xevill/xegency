/* ============================================================================
   PRODUCT VISUALS — drawn covers for the AI demo builds
   ----------------------------------------------------------------------------
   These projects have no screenshots yet, so each one gets a hand-drawn
   product picture: an inline SVG that mimics the real interface. They scale
   to any frame (card or full-width cover) and stay sharp at every size.

   Every number inside is sample data, and each picture says so ("Sample
   data") — it is a demo of the product, not a customer's dashboard.

   Swap any of them for a real screenshot at /public/products/<slug>/cover.jpg
   and set `cover` on the product; the real image wins automatically.
   ========================================================================== */

import type { ReactNode } from "react";

const BG = "#0f0e0d";
const PANEL = "#181716";
const PANEL2 = "#221f1d";
const LINE = "rgba(228,223,215,0.13)";
const TEXT = "#E4DFD7";
const MUTED = "rgba(228,223,215,0.5)";

type TextProps = {
  x: number;
  y: number;
  size?: number;
  fill?: string;
  weight?: number;
  anchor?: "start" | "middle" | "end";
  spacing?: number;
  children: ReactNode;
};

function T({
  x,
  y,
  size = 12,
  fill = TEXT,
  weight = 400,
  anchor = "start",
  spacing,
  children,
}: TextProps) {
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      fill={fill}
      fontWeight={weight}
      textAnchor={anchor}
      letterSpacing={spacing}
    >
      {children}
    </text>
  );
}

/** Small uppercase label, matches the site's `eyebrow` voice. */
function Label({ x, y, children, fill = MUTED, anchor }: Omit<TextProps, "size" | "weight" | "spacing">) {
  return (
    <T x={x} y={y} size={9} fill={fill} weight={600} spacing={1.6} anchor={anchor}>
      {String(children).toUpperCase()}
    </T>
  );
}

function SampleNote({ x = 400, y = 462 }: { x?: number; y?: number }) {
  return (
    <T x={x} y={y} size={9} fill="rgba(228,223,215,0.3)" anchor="middle" spacing={1.4}>
      SAMPLE DATA · DEMO BUILD
    </T>
  );
}

/** Shared canvas: dark ground + a soft accent glow, one gradient id per scene. */
function Scene({
  id,
  accent,
  label,
  children,
}: {
  id: string;
  accent: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={label}
      className="absolute inset-0 h-full w-full transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
      style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
    >
      <defs>
        <radialGradient id={`${id}-glow`} cx="78%" cy="8%" r="75%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.26" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="500" fill={BG} />
      <rect width="800" height="500" fill={`url(#${id}-glow)`} />
      {children}
    </svg>
  );
}

/* ------------------------------------------------------------ 1. ReplyDesk */

const WA = "#25D366";

function Bubble({
  x,
  y,
  w,
  lines,
  out = false,
  meta,
  step,
}: {
  x: number;
  y: number;
  w: number;
  lines: string[];
  out?: boolean;
  meta?: string;
  step?: number;
}) {
  const h = lines.length * 16 + 18 + (meta ? 12 : 0);
  return (
    <g className={step ? `pv-s${step}` : undefined}>
      <rect x={x} y={y} width={w} height={h} rx={10} fill={out ? "#005c4b" : "#202c33"} />
      {lines.map((l, i) => (
        <T key={i} x={x + 12} y={y + 20 + i * 16} size={11.5}>
          {l}
        </T>
      ))}
      {meta && (
        <T x={x + w - 10} y={y + h - 8} size={8.5} fill="rgba(255,255,255,0.55)" anchor="end">
          {meta}
        </T>
      )}
    </g>
  );
}

function ReplyDesk() {
  return (
    <Scene id="rd" accent={WA} label="WhatsApp chat where an AI assistant answers a customer instantly">
      {/* phone */}
      <rect x={92} y={52} width={290} height={396} rx={30} fill={PANEL} stroke={LINE} />
      <rect x={104} y={64} width={266} height={372} rx={22} fill="#0b141a" />
      <path d="M104 86a22 22 0 0 1 22-22h222a22 22 0 0 1 22 22v34H104z" fill="#202c33" />
      <circle cx={130} cy={92} r={14} fill={WA} />
      <T x={130} y={97} size={13} fill="#0b141a" weight={700} anchor="middle">D</T>
      <T x={154} y={89} size={12.5} weight={600}>Dhaka Fashion House</T>
      <circle cx={158} cy={102} r={3} fill={WA} />
      <T x={166} y={105} size={9.5} fill="rgba(255,255,255,0.6)">AI assistant · online</T>

      <Bubble step={1} x={118} y={130} w={176} lines={["Black panjabi, size L —", "do you have it? Price?"]} meta="10:42" />
      <Bubble
        step={2}
        x={150}
        y={200}
        w={208}
        out
        lines={["Yes — size L is in stock.", "৳2,450. Shall I reserve it", "and send it today?"]}
        meta="AI · replied in 3s ✓✓"
      />
      <Bubble step={4} x={160} y={286} w={170} lines={["Yes please, Mirpur 10"]} meta="10:43" />
      <Bubble
        step={5}
        x={150}
        y={340}
        w={208}
        out
        lines={["Booked ✓ Order #1042 —", "delivery tomorrow, COD."]}
        meta="AI · replied in 2s ✓✓"
      />
      <rect x={116} y={408} width={186} height={22} rx={11} fill="#202c33" />
      <T x={130} y={423} size={10} fill="rgba(255,255,255,0.4)">Message</T>
      <circle cx={338} cy={419} r={12} fill={WA} />

      {/* dashboard */}
      <rect x={426} y={70} width={290} height={360} rx={18} fill={PANEL} stroke={LINE} />
      <Label x={448} y={100}>ReplyDesk · today</Label>
      <rect x={618} y={86} width={80} height={22} rx={11} fill="rgba(37,211,102,0.14)" stroke="rgba(37,211,102,0.5)" />
      <circle className="pv-pulse" cx={632} cy={97} r={3.5} fill={WA} />
      <T x={642} y={101} size={9.5} fill={WA} weight={600}>Auto-reply ON</T>

      <T x={448} y={168} size={54} weight={600} fill={TEXT}>142</T>
      <T x={448} y={190} size={12} fill={MUTED}>messages answered by AI</T>

      <line x1={448} x2={694} y1={212} y2={212} stroke={LINE} />
      {[
        ["6", "handed to a human"],
        ["3s", "average first reply"],
        ["2", "languages · বাংলা + English"],
      ].map(([v, l], i) => (
        <g key={l} className={`pv-s${i + 3}`}>
          <T x={448} y={246 + i * 40} size={20} weight={600}>{v}</T>
          <T x={500} y={246 + i * 40} size={11.5} fill={MUTED}>{l}</T>
        </g>
      ))}

      <g className="pv-s6">
        <rect x={448} y={362} width={246} height={44} rx={10} fill={PANEL2} />
        <T x={462} y={381} size={10.5} weight={600}>Not sure? It asks you.</T>
        <T x={462} y={396} size={9.5} fill={MUTED}>Refunds and angry customers go to a person</T>
      </g>

      <SampleNote />
    </Scene>
  );
}

/* ------------------------------------------------------------- 2. Leadsmith */

function Leadsmith() {
  const A = "#F2994A";
  const cols = [
    {
      x: 74,
      name: "New",
      count: 14,
      cards: [
        { n: "Karim Textiles", s: "Website form", sc: 54 },
        { n: "Blue Bay Resort", s: "WhatsApp", sc: 61 },
        { n: "Meghna Foods", s: "Instagram", sc: 47 },
      ],
    },
    {
      x: 292,
      name: "Qualified by AI",
      count: 7,
      cards: [
        { n: "Nasrin Pharma", s: "Facebook ad", sc: 88 },
        { n: "Orbit Logistics", s: "Referral", sc: 92 },
        { n: "Rupsha Clinic", s: "Website form", sc: 81 },
      ],
    },
    {
      x: 510,
      name: "Meeting booked",
      count: 3,
      cards: [
        { n: "Sylhet Tea Co.", s: "Follow-up #2", sc: 95 },
        { n: "Dhanmondi Dental", s: "Follow-up #1", sc: 90 },
        { n: "Green Valley Farm", s: "Call booked Tue", sc: 97 },
      ],
    },
  ];
  return (
    <Scene id="ls" accent={A} label="Sales pipeline where an AI scores and follows up with leads">
      <Label x={74} y={86}>Leadsmith · pipeline</Label>
      <g className="pv-pulse">
        <T x={726} y={86} size={10} fill={A} anchor="end" weight={600}>AI follow-ups: sent automatically</T>
      </g>
      {cols.map((c, ci) => (
        <g key={c.name}>
          <rect x={c.x} y={104} width={216} height={336} rx={14} fill={PANEL} stroke={LINE} />
          <T x={c.x + 16} y={130} size={12} weight={600}>{c.name}</T>
          <T x={c.x + 200} y={130} size={11} fill={MUTED} anchor="end">{c.count}</T>
          {c.cards.map((card, i) => {
            const y = 150 + i * 96;
            return (
              <g key={card.n} className={`pv-s${Math.min(9, ci * 3 + i + 1)}`}>
                <rect x={c.x + 12} y={y} width={192} height={84} rx={10} fill={PANEL2} stroke={LINE} />
                <T x={c.x + 26} y={y + 26} size={12} weight={600}>{card.n}</T>
                <T x={c.x + 26} y={y + 44} size={10} fill={MUTED}>{card.s}</T>
                <rect x={c.x + 26} y={y + 56} width={96} height={5} rx={2.5} fill="rgba(228,223,215,0.1)" />
                <rect className="pv-grow-x" x={c.x + 26} y={y + 56} width={(96 * card.sc) / 100} height={5} rx={2.5} fill={card.sc > 80 ? A : "rgba(228,223,215,0.45)"} />
                <rect x={c.x + 150} y={y + 14} width={42} height={22} rx={11} fill={card.sc > 80 ? "rgba(242,153,74,0.16)" : "rgba(228,223,215,0.08)"} />
                <T x={c.x + 171} y={y + 29} size={11} weight={700} anchor="middle" fill={card.sc > 80 ? A : TEXT}>{card.sc}</T>
              </g>
            );
          })}
        </g>
      ))}
      <SampleNote />
    </Scene>
  );
}

/* ----------------------------------------------------------- 3. SupportPilot */

function SupportPilot() {
  const A = "#56B4F5";
  return (
    <Scene id="sp" accent={A} label="Helpdesk where an AI answers customers from the company's own documents">
      {/* knowledge base */}
      <rect x={70} y={70} width={196} height={360} rx={16} fill={PANEL} stroke={LINE} />
      <Label x={90} y={100}>Knowledge base</Label>
      {["Refund policy.pdf", "Shipping & delivery", "Pricing sheet", "Product manual", "Warranty terms"].map((d, i) => (
        <g key={d}>
          <rect x={86} y={118 + i * 48} width={164} height={38} rx={9} fill={i === 0 ? "rgba(86,180,245,0.14)" : PANEL2} stroke={i === 0 ? "rgba(86,180,245,0.5)" : LINE} className={i === 0 ? "pv-pulse" : undefined} />
          <rect x={98} y={130 + i * 48} width={12} height={15} rx={2} fill="none" stroke={i === 0 ? A : MUTED} />
          <T x={120} y={142 + i * 48} size={10.5} fill={i === 0 ? TEXT : "rgba(228,223,215,0.7)"}>{d}</T>
        </g>
      ))}

      {/* chat */}
      <rect x={290} y={70} width={440} height={360} rx={16} fill={PANEL} stroke={LINE} />
      <circle cx={318} cy={100} r={12} fill={A} />
      <T x={318} y={104} size={11} fill={BG} weight={800} anchor="middle">S</T>
      <T x={338} y={98} size={12.5} weight={600}>SupportPilot</T>
      <T x={338} y={112} size={9.5} fill={MUTED}>Answers from your documents only</T>
      <line x1={290} x2={730} y1={128} y2={128} stroke={LINE} />

      <g className="pv-s1">
        <rect x={510} y={146} width={196} height={34} rx={12} fill="#2b2824" />
        <T x={524} y={167} size={11.5}>Can I return a used item?</T>
      </g>

      <g className="pv-s3">
        <rect x={314} y={196} width={324} height={104} rx={12} fill="rgba(86,180,245,0.1)" stroke="rgba(86,180,245,0.3)" />
        <T x={330} y={220} size={11.5}>Used items can be returned within 7 days if</T>
        <T x={330} y={238} size={11.5}>the product is unopened or faulty. Opened</T>
        <T x={330} y={256} size={11.5}>items get store credit instead of a refund.</T>
      </g>
      <g className="pv-s5">
        <rect x={330} y={268} width={176} height={22} rx={11} fill={PANEL2} stroke={LINE} />
        <T x={342} y={283} size={9.5} fill={A} weight={600}>Source · Refund policy.pdf, p.2</T>
      </g>

      <g className="pv-s7">
      <rect x={314} y={318} width={118} height={30} rx={15} fill="none" stroke={LINE} />
      <T x={373} y={337} size={10.5} anchor="middle" fill="rgba(228,223,215,0.75)">Talk to a person</T>
      <rect x={442} y={318} width={96} height={30} rx={15} fill="none" stroke={LINE} />
      <T x={490} y={337} size={10.5} anchor="middle" fill="rgba(228,223,215,0.75)">Helpful ✓</T>
      </g>

      <rect x={314} y={382} width={392} height={32} rx={16} fill={PANEL2} stroke={LINE} />
      <T x={332} y={402} size={10.5} fill="rgba(228,223,215,0.35)">Ask a question…</T>
      <SampleNote />
    </Scene>
  );
}

/* ------------------------------------------------------------- 4. InvoiceIQ */

function InvoiceIQ() {
  const A = "#A78BFA";
  const rows: [string, string][] = [
    ["Vendor", "Rahim Traders"],
    ["Invoice no.", "INV-2291"],
    ["Date", "12 Oct 2026"],
    ["VAT", "৳1,200"],
    ["Total", "৳9,200"],
    ["Category", "Inventory"],
  ];
  return (
    <Scene id="iq" accent={A} label="An invoice photo being read by AI into clean accounting fields">
      {/* paper */}
      <rect x={86} y={64} width={238} height={372} rx={6} fill={TEXT} />
      <T x={104} y={96} size={13} fill="#0f0e0d" weight={700}>RAHIM TRADERS</T>
      <T x={104} y={112} size={8.5} fill="#6b655e">Mirpur-10, Dhaka · Invoice INV-2291</T>
      <rect x={96} y={80} width={206} height={42} rx={4} fill="rgba(167,139,250,0.28)" stroke={A} strokeDasharray="4 3" />
      {Array.from({ length: 6 }).map((_, i) => (
        <g key={i}>
          <rect x={104} y={146 + i * 30} width={110 - (i % 3) * 18} height={6} rx={3} fill="#c9c3b8" />
          <rect x={262} y={146 + i * 30} width={42} height={6} rx={3} fill="#c9c3b8" />
        </g>
      ))}
      <rect x={96} y={140} width={218} height={20} rx={3} fill="rgba(167,139,250,0.16)" stroke={A} strokeDasharray="4 3" />
      <line x1={104} x2={304} y1={342} y2={342} stroke="#c9c3b8" />
      <T x={104} y={366} size={11} fill="#0f0e0d" weight={700}>TOTAL</T>
      <rect x={236} y={350} width={76} height={22} rx={4} fill="rgba(167,139,250,0.3)" stroke={A} strokeDasharray="4 3" />
      <T x={274} y={366} size={12} fill="#0f0e0d" weight={700} anchor="middle">৳9,200</T>
      <T x={104} y={412} size={8.5} fill="#8a847b">Photo taken on phone · 2 seconds ago</T>

      {/* scan line */}
      <rect className="pv-scan" x={86} y={64} width={238} height={3} fill={A} opacity={0.9} />

      {/* arrow */}
      <circle cx={366} cy={250} r={20} fill={PANEL} stroke={A} />
      <path d="M358 250h16m-6-6 6 6-6 6" stroke={A} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />

      {/* extracted */}
      <rect x={408} y={64} width={312} height={372} rx={16} fill={PANEL} stroke={LINE} />
      <Label x={430} y={94}>Read by InvoiceIQ</Label>
      <g className="pv-s2">
        <rect x={618} y={80} width={84} height={22} rx={11} fill="rgba(167,139,250,0.16)" stroke="rgba(167,139,250,0.5)" />
        <T x={660} y={95} size={9.5} anchor="middle" fill={A} weight={600}>6 fields found</T>
      </g>
      {rows.map(([k, v], i) => (
        <g key={k} className={`pv-s${i + 3}`}>
          <line x1={430} x2={698} y1={116 + i * 44} y2={116 + i * 44} stroke={LINE} />
          <T x={430} y={144 + i * 44} size={10.5} fill={MUTED}>{k}</T>
          <T x={698} y={144 + i * 44} size={12.5} weight={600} anchor="end">{v}</T>
        </g>
      ))}
      <g className="pv-s9">
        <rect x={430} y={390} width={268} height={30} rx={15} fill={A} />
        <T x={564} y={410} size={11.5} fill={BG} weight={700} anchor="middle">Sync to accounting  ✓</T>
      </g>
      <SampleNote />
    </Scene>
  );
}

/* ------------------------------------------------------------ 5. StockSense */

function StockSense() {
  const A = "#2DD4BF";
  const actual = "M92 330 L130 312 L168 322 L206 288 L244 300 L282 262 L320 276";
  const forecast = "M320 276 L358 246 L396 258 L434 220 L472 196";
  const items = [
    { n: "Basmati rice 5kg", q: "Order 120", c: "#F87171" },
    { n: "Mustard oil 1L", q: "Order 80", c: "#F2B84B" },
    { n: "Lentils 1kg", q: "Order 45", c: "#F2B84B" },
    { n: "Sugar 1kg", q: "Stock OK", c: A },
  ];
  return (
    <Scene id="ss" accent={A} label="Sales chart with an AI forecast and a list of what to reorder this week">
      <rect x={70} y={70} width={430} height={360} rx={16} fill={PANEL} stroke={LINE} />
      <Label x={92} y={100}>StockSense · demand forecast</Label>
      <T x={92} y={132} size={24} weight={600}>+18% next 2 weeks</T>
      <T x={92} y={150} size={10.5} fill={MUTED}>Eid week pushes rice, oil and sugar</T>

      {[200, 250, 300, 350].map((y) => (
        <line key={y} x1={92} x2={478} y1={y} y2={y} stroke={LINE} />
      ))}
      <path className="pv-s1" d={`${actual} L320 390 L92 390 Z`} fill="rgba(45,212,191,0.12)" />
      <path className="pv-draw" pathLength={1} d={actual} stroke={A} strokeWidth={2.5} fill="none" strokeLinejoin="round" strokeLinecap="round" />
      <g className="pv-s5">
        <path d={forecast} stroke={A} strokeWidth={2.5} fill="none" strokeDasharray="6 5" strokeLinejoin="round" strokeLinecap="round" />
        <rect x={320} y={176} width={158} height={214} fill="rgba(45,212,191,0.05)" />
        <line x1={320} x2={320} y1={176} y2={390} stroke={A} strokeDasharray="3 4" opacity={0.6} />
        <circle className="pv-pulse" cx={472} cy={196} r={5} fill={BG} stroke={A} strokeWidth={2} />
        <Label x={332} y={192} fill={A}>AI forecast</Label>
      </g>
      <circle cx={320} cy={276} r={5} fill={A} />
      {["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Wk 5", "Wk 6"].map((w, i) => (
        <T key={w} x={92 + i * 76} y={412} size={9.5} fill={MUTED}>{w}</T>
      ))}

      <rect x={522} y={70} width={208} height={360} rx={16} fill={PANEL} stroke={LINE} />
      <Label x={542} y={100}>Reorder this week</Label>
      {items.map((it, i) => (
        <g key={it.n} className={`pv-s${i + 5}`}>
          <rect x={538} y={118 + i * 74} width={176} height={62} rx={10} fill={PANEL2} stroke={LINE} />
          <circle cx={556} cy={149 + i * 74} r={4.5} fill={it.c} />
          <T x={570} y={146 + i * 74} size={11.5} weight={600}>{it.n}</T>
          <T x={570} y={164 + i * 74} size={10.5} fill={it.c} weight={600}>{it.q}</T>
        </g>
      ))}
      <SampleNote />
    </Scene>
  );
}

/* --------------------------------------------------------------- 6. Briefly */

function Briefly() {
  const A = "#E8C547";
  const bars = [38, 52, 44, 66, 58, 80, 72];
  return (
    <Scene id="br" accent={A} label="A daily business summary the AI writes and sends every morning">
      <rect x={176} y={56} width={448} height={388} rx={18} fill={PANEL} stroke={LINE} />
      <Label x={202} y={90} fill={A}>Briefly · 8:00 AM</Label>
      <T x={202} y={122} size={21} weight={600}>Good morning, Rafi.</T>
      <T x={202} y={142} size={11.5} fill={MUTED}>Here is yesterday, in thirty seconds.</T>

      {[
        ["৳84,300", "Sales", "▲ 12%", "#6FCF97"],
        ["61", "Orders", "▲ 8", "#6FCF97"],
        ["2", "Refunds", "▼ 1", "#6FCF97"],
      ].map(([v, l, d, c], i) => (
        <g key={l} className={`pv-s${i + 1}`}>
          <rect x={202 + i * 134} y={162} width={124} height={74} rx={10} fill={PANEL2} stroke={LINE} />
          <T x={216 + i * 134} y={190} size={19} weight={600}>{v}</T>
          <T x={216 + i * 134} y={208} size={10} fill={MUTED}>{l}</T>
          <T x={216 + i * 134} y={224} size={10} fill={c} weight={600}>{d}</T>
        </g>
      ))}

      {bars.map((b, i) => (
        <rect key={i} className="pv-grow-y" style={{ animationDelay: `${i * 0.06}s` }} x={206 + i * 18} y={330 - b * 0.8} width={11} height={b * 0.8} rx={2.5} fill={i === 6 ? A : "rgba(232,197,71,0.28)"} />
      ))}
      <T x={206} y={346} size={9} fill={MUTED}>Last 7 days</T>

      <g className="pv-s6">
        <rect x={352} y={262} width={248} height={92} rx={10} fill="rgba(232,197,71,0.08)" stroke="rgba(232,197,71,0.35)" />
        <Label x={366} y={282} fill={A}>AI noticed</Label>
        <T x={366} y={302} size={11}>Panjabi (L) sold 3× its usual</T>
        <T x={366} y={318} size={11}>pace — only 4 left in stock.</T>
        <T x={366} y={338} size={10.5} fill={A} weight={600}>Suggested: reorder 30 today</T>
      </g>

      {["WhatsApp", "Email", "Telegram"].map((c, i) => (
        <g key={c} className={`pv-s${i + 7}`}>
          <rect x={202 + i * 90} y={386} width={80} height={24} rx={12} fill="none" stroke={LINE} />
          <T x={242 + i * 90} y={402} size={10} anchor="middle" fill="rgba(228,223,215,0.7)">{c}</T>
        </g>
      ))}
      <SampleNote y={470} />
    </Scene>
  );
}

/* ---------------------------------------------------------------- registry */

const visuals: Record<string, () => React.JSX.Element> = {
  "whatsapp-auto-reply": ReplyDesk,
  "ai-lead-qualifier": Leadsmith,
  "ai-support-agent": SupportPilot,
  "invoice-reader": InvoiceIQ,
  "stock-forecasting": StockSense,
  "daily-business-digest": Briefly,
};

export function hasProductVisual(slug: string) {
  return slug in visuals;
}

/** Fills its positioned parent. Used for both the grid card and the page cover. */
export function ProductVisual({ slug }: { slug: string }) {
  const Visual = visuals[slug];
  return Visual ? <Visual /> : null;
}
