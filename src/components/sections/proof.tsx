import { capabilities, clients, stats } from "@/content/site";
import { Eyebrow, Float3D, Marquee, Shell, cx } from "@/components/ui";
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
              // Reversed so the number reads first visually while the DOM
              // keeps the <dt> before its <dd>, as a definition list requires.
              className="flex flex-col-reverse"
            >
              <dt className="eyebrow mt-4 text-stone">{s.label}</dt>
              <dd
                className={cx(
                  "display text-[clamp(2.5rem,6vw,4.5rem)] leading-none",
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
