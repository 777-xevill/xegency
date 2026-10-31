import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { services } from "@/content/site";
import { LogoMark } from "@/components/logo";
import { Arrow, Eyebrow, Shell, cx } from "@/components/ui";

/**
 * Brand & growth: the two services that bring customers to what we build.
 *
 * The ring is a brand kit for "your brand", drawn in HTML and CSS 3D — eight
 * cards faced outward round a vertical axis. The motion layer spins it with
 * the scroll, tilts it from above to eye level as it passes and shades each
 * card by how squarely it faces you (data-ring, see
 * src/components/motion/motion.tsx). Without motion it stands still, turned
 * a little so it still reads as a ring. All sizes inside a card are in `cqw`,
 * so the artwork scales with the card.
 */

const GROWTH = ["Creative branding", "Facebook & Instagram ads"];

const creatives: { label: string; art: ReactNode }[] = [
  { label: "Logo", art: <LogoArt /> },
  { label: "Colour", art: <PaletteArt /> },
  { label: "Type", art: <TypeArt /> },
  { label: "Feed ad", art: <FeedArt /> },
  { label: "Story", art: <StoryArt /> },
  { label: "Reel", art: <ReelArt /> },
  { label: "Carousel", art: <CarouselArt /> },
  { label: "Tracking", art: <TrackingArt /> },
];

export function BrandGrowth() {
  const growth = services.filter((s) => GROWTH.includes(s.title));
  const step = 360 / creatives.length;

  return (
    <section className="grain ambient relative bg-ink-800 py-24 md:py-36">
      <Shell className="relative z-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <Eyebrow>Brand &amp; growth</Eyebrow>
            <h2
              data-split="lines"
              data-velocity-skew=""
              className="display mt-6 text-[clamp(2.1rem,4.6vw,4rem)]"
            >
              Built well.
              <br />
              Then made known.
            </h2>
          </div>
          <p
            data-reveal=""
            style={{ "--reveal-delay": "160ms" } as CSSProperties}
            className="pretty max-w-md text-base leading-relaxed text-bone/65 md:text-lg lg:col-span-5"
          >
            A brand people remember, and Facebook &amp; Instagram ads that pay
            their way — made by the studio that builds your product, so the ad,
            the landing page and the tracking all tell one story.
          </p>
        </div>
      </Shell>

      <div
        data-ring=""
        aria-hidden="true"
        className="ring-stage relative z-10 mt-10 md:mt-14"
      >
        <div className="ring-floor" />
        <div data-ring-tilt="" className="ring-tilt">
          <div data-ring-spin="" className="ring-spin">
            {creatives.map((c, i) => (
              <div
                key={c.label}
                className="ring-card"
                style={{ "--a": `${i * step}deg` } as CSSProperties}
              >
                <div className="ring-face">
                  <div className="@container flex h-full flex-col border border-bone/15 bg-ink-700 p-[6%]">
                    <span className="flex justify-between font-mono text-[5cqw] uppercase tracking-[0.16em] text-bone/45">
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      <span>{c.label}</span>
                    </span>
                    <div className="relative mt-[6cqw] flex-1 overflow-hidden">
                      {c.art}
                    </div>
                  </div>
                  <span data-ring-shade="" className="ring-shade" />
                </div>
                <div className="ring-back">
                  <LogoMark className="h-[22%] w-[22%] text-bone/15" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Shell className="relative z-10 mt-10 md:mt-14">
        <ul data-depth="" className="grid gap-4 md:grid-cols-2">
          {growth.map((s, i) => (
            <li key={s.number}>
              <div
                data-reveal=""
                style={{ "--reveal-delay": `${i * 90}ms` } as CSSProperties}
                className="h-full"
              >
                <div
                  data-tilt="4"
                  className="relative h-full overflow-hidden border border-bone/12 bg-ink/60 transition-colors duration-700 ease-out-expo hover:border-bone/30"
                >
                  <Link
                    href={`/services#${s.number}`}
                    className="group relative flex h-full flex-col p-7 md:p-9"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 origin-bottom scale-y-0 bg-ink-700/70 transition-transform duration-700 ease-out-expo group-hover:scale-y-100"
                    />
                    <span className="relative z-10 flex items-start justify-between">
                      <span className="display text-[clamp(3rem,4.5vw,4.5rem)] leading-[0.8] text-stone/35 transition-colors duration-700 ease-out-expo group-hover:text-stone">
                        {s.number}
                      </span>
                      <Arrow className="h-4 w-4 text-bone/30 transition-all duration-500 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-bone" />
                    </span>
                    <h3 className="display relative z-10 mt-8 text-[clamp(1.75rem,2.6vw,2.25rem)] leading-[1.05]">
                      {s.title}
                    </h3>
                    <p className="pretty relative z-10 mt-4 max-w-md text-sm leading-relaxed text-bone/60 md:text-base">
                      {s.summary}
                    </p>
                    <span className="eyebrow relative z-10 mt-8 text-bone/40">
                      {s.timeline}
                    </span>
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Shell>
    </section>
  );
}

/* ----------------------------------------------------- card artwork */

function LogoArt() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-[8cqw] bg-[#e9dfcf] text-[#2f3b33]">
      <span className="display flex h-[36cqw] w-[36cqw] items-center justify-center rounded-full border-[0.9cqw] border-current text-[16cqw] leading-none">
        Yb
      </span>
      <span className="font-mono text-[5.5cqw] uppercase tracking-[0.3em]">
        Your brand
      </span>
    </div>
  );
}

function PaletteArt() {
  const swatches = [
    ["Clay", "#c8643b"],
    ["Cream", "#e9dfcf"],
    ["Pine", "#2f3b33"],
    ["Ink", "#181716"],
  ];
  return (
    <div className="flex h-full flex-col">
      {swatches.map(([name, hex]) => (
        <span
          key={hex}
          style={{ background: hex }}
          className={cx(
            "flex flex-1 items-end justify-between px-[5cqw] pb-[3cqw] font-mono text-[5cqw] uppercase tracking-[0.12em]",
            name === "Cream" ? "text-ink/70" : "text-bone/80",
          )}
        >
          <span>{name}</span>
          <span>{hex}</span>
        </span>
      ))}
    </div>
  );
}

function TypeArt() {
  return (
    <div className="flex h-full flex-col justify-between bg-ink-800 p-[6cqw]">
      <span className="display text-[46cqw] leading-[0.8] text-bone">Aa</span>
      <span className="font-mono text-[5cqw] uppercase leading-[1.7] tracking-[0.14em] text-bone/55">
        <span className="block">Display · Serif</span>
        <span className="block">Text · Sans</span>
      </span>
    </div>
  );
}

function FeedArt() {
  return (
    <div className="flex h-full flex-col bg-[linear-gradient(150deg,#c8643b,#61564a)] text-[#f4ece0]">
      <span className="flex items-center gap-[3cqw] px-[5cqw] pt-[5cqw] font-mono text-[4.5cqw] uppercase tracking-[0.14em] opacity-80">
        <span className="h-[7cqw] w-[7cqw] rounded-full bg-[#f4ece0]" />
        Sponsored
      </span>
      <span className="display mt-auto px-[5cqw] text-[15cqw] leading-[0.95]">
        Your offer, in one line.
      </span>
      <span className="mt-[6cqw] flex items-center justify-between bg-black/25 px-[5cqw] py-[3.5cqw] font-mono text-[4.5cqw] uppercase tracking-[0.12em]">
        Learn more
        <span>→</span>
      </span>
    </div>
  );
}

function StoryArt() {
  return (
    <div className="flex h-full flex-col bg-[#2f3b33] p-[5cqw] text-[#e9dfcf]">
      <span className="flex gap-[2cqw]">
        {[1, 0.35, 0.35].map((o, i) => (
          <span
            key={i}
            style={{ opacity: o }}
            className="h-[1.2cqw] flex-1 rounded-full bg-current"
          />
        ))}
      </span>
      <span className="display my-auto text-[16cqw] leading-[0.95]">
        Seen in the first second.
      </span>
      <span className="self-center rounded-full border border-[#e9dfcf]/60 px-[6cqw] py-[2.5cqw] font-mono text-[4.5cqw] uppercase tracking-[0.14em]">
        Learn more
      </span>
    </div>
  );
}

function ReelArt() {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-[#e9dfcf] text-[#181716]">
      <span className="flex h-[30cqw] w-[30cqw] items-center justify-center rounded-full bg-[#181716]">
        <span className="ml-[2cqw] h-0 w-0 border-y-[6cqw] border-l-[10cqw] border-y-transparent border-l-[#e9dfcf]" />
      </span>
      <span className="mt-[10cqw] flex w-[72%] items-center gap-[3cqw] font-mono text-[4.5cqw] tracking-[0.1em]">
        <span className="h-[1cqw] flex-1 bg-[#181716]/20">
          <span className="block h-full w-[38%] bg-[#c8643b]" />
        </span>
        0:15
      </span>
    </div>
  );
}

function CarouselArt() {
  return (
    <div className="flex h-full flex-col bg-ink-800">
      <div className="relative flex-1">
        {["#61564a", "#2f3b33", "#c8643b"].map((hex, i) => (
          <span
            key={hex}
            style={{
              left: `${8 + i * 14}%`,
              background: hex,
              transform: `rotate(${(i - 1) * 4}deg)`,
            }}
            className="absolute top-[12%] h-[64%] w-[58%] border border-black/20 shadow-[0_6px_18px_rgba(0,0,0,0.35)]"
          />
        ))}
      </div>
      <span className="flex justify-center gap-[2.5cqw] pb-[6cqw]">
        {[1, 0.3, 0.3].map((o, i) => (
          <span
            key={i}
            style={{ opacity: o }}
            className="h-[2.2cqw] w-[2.2cqw] rounded-full bg-bone"
          />
        ))}
      </span>
    </div>
  );
}

function TrackingArt() {
  const events = ["PageView", "ViewContent", "AddToCart", "Lead", "Purchase"];
  return (
    <div className="flex h-full flex-col justify-center gap-[3.5cqw] bg-ink px-[6cqw] font-mono text-[5cqw] tracking-[0.04em]">
      <span className="mb-[2cqw] flex items-center gap-[2.5cqw] uppercase tracking-[0.16em] text-bone/45">
        <span className="h-[2.2cqw] w-[2.2cqw] rounded-full bg-[#7fae7a]" />
        Pixel + CAPI
      </span>
      {events.map((e) => (
        <span
          key={e}
          className="flex justify-between border-b border-bone/10 pb-[2.5cqw] text-bone/80"
        >
          {e}
          <span className="text-[#7fae7a]">✓</span>
        </span>
      ))}
    </div>
  );
}
