import { capabilities, clients, stats, type IndustryKey } from "@/content/site";
import { Eyebrow, Float3D, Marquee, Shell, cx } from "@/components/ui";
import { MarqueeArrows } from "@/components/marquee-arrows";
import { isPlaceholder } from "@/lib/format";

export function CapabilitiesBand() {
  return (
    <div className="grain relative border-y border-bone/10 bg-ink-800">
      <Marquee items={capabilities} />
    </div>
  );
}

/**
 * Client names on an endless, scroll-reactive loop. The first list is the
 * real one screen readers get; the second is a visual duplicate so the track
 * can wrap seamlessly at exactly half its width.
 */
export function ClientsBand() {
  if (clients.length === 0) return null;
  return (
    <section className="grain relative border-y border-bone/10 bg-ink-800 py-5 md:py-6">
      <Shell className="flex flex-col gap-3 md:flex-row md:items-center md:gap-8 lg:gap-10">
        <p data-reveal="" className="eyebrow shrink-0 text-stone">
          Companies we worked with
        </p>
        <span
          aria-hidden="true"
          className="hidden h-7 w-px shrink-0 bg-bone/15 md:block"
        />
        <div
          data-marquee="45"
          data-marquee-pause=""
          className="relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_9%,#000_91%,transparent)]"
        >
          <div data-marquee-track="" className="flex w-max">
            <ClientList />
            <ClientList duplicate />
          </div>
        </div>
        <MarqueeArrows label="Browse companies" />
      </Shell>
    </section>
  );
}

function ClientList({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul
      aria-hidden={duplicate || undefined}
      className="flex shrink-0 items-center"
    >
      {clients.map(({ name, logo, wordmark }) => (
        <li key={name} className="flex shrink-0 items-center">
          <span className="group flex items-center gap-2.5 opacity-60 transition-opacity duration-500 hover:opacity-100">
            {logo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logo}
                alt=""
                aria-hidden="true"
                className={cx(
                  "w-auto object-contain brightness-0 invert",
                  wordmark ? "h-4 md:h-5" : "h-6 max-w-[5.5rem] md:h-7",
                )}
              />
            )}
            <span className={cx("whitespace-nowrap font-display text-[1.05rem] leading-none tracking-[-0.01em] text-bone md:text-[1.2rem]", logo && wordmark && "sr-only")}>
              {name}
            </span>
          </span>
          <span
            aria-hidden="true"
            className="mx-6 h-1 w-1 shrink-0 rotate-45 bg-stone/50 md:mx-9"
          />
        </li>
      ))}
    </ul>
  );
}

export function Manifesto() {
  return (
    <section className="grain relative isolate overflow-clip bg-bone-50 py-24 text-ink md:py-36">
      <Float3D className="-right-40 top-8 hidden h-[34rem] w-[34rem] text-ink/[0.16] md:block" />
      <Shell className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Holds its place while the statement lights up beside it. */}
          <div className="lg:sticky lg:top-32 lg:col-span-4 lg:self-start">
            <Eyebrow invert>Why Xegency exists</Eyebrow>
          </div>

          <div className="lg:col-span-8">
            <h2
              data-scrub-words=""
              className="display balance text-[clamp(2rem,4.6vw,4rem)]"
            >
              Most businesses don&rsquo;t need more people. They need the
              right software — and now, the right AI working inside it.
            </h2>

            <div className="mt-12 md:mt-16">
              <span
                aria-hidden="true"
                data-draw=""
                className="block h-px w-full bg-ink/15"
              />
              <div className="grid gap-8 pt-10 md:grid-cols-2 md:gap-14">
                <p
                  data-reveal=""
                  className="pretty text-base leading-relaxed text-ink/70"
                >
                  Every team has hours disappearing into copy-paste, chasing
                  follow-ups and stitching tools together by hand. The tools to
                  take that work off people&rsquo;s plates now exist. What most
                  businesses are missing is someone who can build it properly
                  and stand behind it.
                </p>
                <p
                  data-reveal=""
                  style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
                  className="pretty text-base leading-relaxed text-ink/70"
                >
                  So the work here starts with the business, not the tech. What
                  has to happen, what it costs today, what it should cost. Then
                  we build the website, the app, the agent or the system that
                  makes it happen — with the newest AI stack, used where it
                  earns its place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}

/* Line icons for the industries we serve: grey at rest, own colour on hover. */
const industryArt: Record<IndustryKey, { color: string; d: React.ReactNode }> = {
  textiles: {
    color: "#c9a27a",
    d: <path d="M7 3h10M7 21h10M8 3v18M16 3v18M8 7l8 3M8 11l8 3M8 15l8 3" />,
  },
  garments: {
    color: "#8fb3d9",
    d: <path d="M8.5 3 3 6l2 5 3-1.2V21h8V9.8l3 1.2 2-5-5.5-3a3.5 3.5 0 0 1-7 0Z" />,
  },
  pharma: {
    color: "#7cc29a",
    d: (
      <>
        <rect x="2.5" y="8.5" width="19" height="7" rx="3.5" transform="rotate(-45 12 12)" />
        <path d="m9.2 9.2 5.6 5.6" />
      </>
    ),
  },
  fmcg: {
    color: "#e5b04f",
    d: <path d="M3 9.5h18l-2 10.5H5L3 9.5Zm5 0 3-6m5 6-3-6M9 13.5v3.5m6-3.5v3.5" />,
  },
  motorcycles: {
    color: "#e0865f",
    d: (
      <>
        <circle cx="5.5" cy="16" r="3.5" />
        <circle cx="18.5" cy="16" r="3.5" />
        <path d="m5.5 16 4-6h5l4 6M7 10h2.5m5 0 1.5-3h2.5" />
      </>
    ),
  },
  cars: {
    color: "#a9bfe0",
    d: (
      <>
        <path d="M3 13.5 5 8h14l2 5.5V17H3v-3.5Zm0 0h18" />
        <circle cx="7.5" cy="17" r="1.8" />
        <circle cx="16.5" cy="17" r="1.8" />
      </>
    ),
  },
};

function IndustryIcon({ kind, label }: { kind: IndustryKey; label: string }) {
  const art = industryArt[kind];
  return (
    <span
      className="industry-icon grid h-[30px] w-[30px] place-items-center rounded-md ring-1 ring-bone/10 transition duration-300 hover:-translate-y-0.5 hover:scale-110"
      style={{ "--ind": art.color } as React.CSSProperties}
    >
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        role="img"
        aria-label={label}
      >
        {art.d}
      </svg>
    </span>
  );
}

export function Stats() {
  return (
    <section className="grain ambient relative bg-ink py-20 text-bone md:py-28">
      <Float3D className="-left-44 top-1/2 hidden h-[30rem] w-[30rem] -translate-y-1/2 text-bone/[0.1] md:block" />
      <Shell className="relative z-10">
        <dl
          data-stagger="0.1"
          className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              // Visual order: number, label, then flags/icons. The DOM keeps
              // the <dt> before its <dd>s, as a definition list requires.
              className="flex flex-col"
            >
              <dt className="eyebrow order-2 mt-4 text-stone">{s.label}</dt>
              {(s.flags || s.industries) && (
                <dd className="order-3 mt-5">
                  <ul
                    className={
                      s.flags
                        ? // 5 + 4 grid that scales with the column, never wider than it
                          "grid w-full max-w-[17.5rem] grid-cols-5 gap-2"
                        : "flex flex-wrap gap-1.5"
                    }
                  >
                    {s.flags?.map((f) => (
                      <li key={f.code} title={f.name}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`/flags/${f.code}.svg`}
                          alt={f.name}
                          width={48}
                          height={36}
                          loading="lazy"
                          className="aspect-[4/3] h-auto w-full rounded-[4px] opacity-60 ring-1 ring-bone/10 grayscale transition duration-300 hover:-translate-y-0.5 hover:scale-110 hover:opacity-100 hover:grayscale-0"
                        />
                      </li>
                    ))}
                    {s.industries?.map((ind) => (
                      <li key={ind.key} title={ind.name}>
                        <IndustryIcon kind={ind.key} label={ind.name} />
                      </li>
                    ))}
                  </ul>
                </dd>
              )}
              <dd
                className={cx(
                  "display order-1 text-[clamp(2.5rem,6vw,4.5rem)] leading-none",
                  isPlaceholder(s.value) && "text-bone/30",
                )}
              >
                {/* The column's top rule lives in the <dd>: a <dl> group may
                    only hold <dt>/<dd>, and this is the visually first one. */}
                <span
                  aria-hidden="true"
                  data-draw=""
                  className="mb-6 block h-px w-full bg-bone/15"
                />
                <span data-count="">{s.value}</span>
              </dd>
            </div>
          ))}
        </dl>
      </Shell>
    </section>
  );
}
