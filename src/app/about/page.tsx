import type { Metadata } from "next";
import Image from "next/image";
import { founder, principles, site, studioFacts } from "@/content/site";
import { PageHero } from "@/components/page-hero";
import { Stats } from "@/components/sections/proof";
import { Assurances } from "@/components/sections/assurances";
import { Testimonials } from "@/components/sections/testimonials";
import { Shell, Eyebrow, Cta, cx } from "@/components/ui";
import { isPlaceholder } from "@/lib/format";
import { OrganizationSchema } from "@/components/structured-data";

export const metadata: Metadata = {
  title: "Studio",
  description: `Who runs ${site.name}, where we work from, how we operate and what we will and won't take on.`,
};

export default function AboutPage() {
  return (
    <>
      <OrganizationSchema />

      <PageHero
        eyebrow="The studio"
        title={
          <>
            A small studio,
            <br />
            deliberately.
          </>
        }
        lead={`${site.name} is led by ${founder.name} and built around a simple idea: the person who understands your business should be the person shaping the pages.`}
      />

      {/* ------------------------------------------------------- the letter */}
      <section className="grain relative bg-ink-800 py-20 md:py-28">
        <Shell>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <div
                data-reveal=""
                className="relative aspect-[4/5] overflow-hidden bg-ink-800 lg:sticky lg:top-28"
              >
                <Image
                  src="/founder/portrait.jpg"
                  alt={`${founder.name}, ${founder.role} of ${site.name}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <Eyebrow>A note from the founder</Eyebrow>

              <div className="mt-8 space-y-6 text-base leading-relaxed text-bone/75 md:text-lg">
                <p className="pretty">
                  Most of the people who contact me have the same worry, even if
                  they are too polite to say it: <em>who exactly am I about to
                  pay?</em> It is a reasonable question. The internet is full of
                  studios that are a stock photo and a contact form.
                </p>
                <p className="pretty">{founder.bio}</p>
                <p className="pretty">
                  So this page is here to be checkable. My name, my face, where
                  I work from, how I invoice, who else is involved and what I
                  will refuse to take on. If you want to talk to a past client
                  before you commit, ask — where they have agreed to it, I will
                  connect you directly.
                </p>
                <p className="pretty">
                  What I care about is the part most people skip: whether the
                  site actually earns the trust of the person reading it. That
                  is a craft problem and a business problem at the same time,
                  and it is the reason this studio exists.
                </p>
              </div>

              <p className="display mt-10 text-3xl italic text-stone">
                — {founder.name}
              </p>

              <div className="mt-14 grid grid-cols-2 gap-4">
                <figure data-reveal="">
                  <div className="relative aspect-[4/5] overflow-hidden bg-ink-800">
                    <Image
                      src="/founder/at-work.jpg"
                      alt="Working on a build at the studio desk"
                      fill
                      sizes="(min-width: 1024px) 25vw, 45vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="eyebrow mt-3 text-bone/40">
                    In the build
                  </figcaption>
                </figure>
                <figure
                  data-reveal=""
                  style={{ "--reveal-delay": "90ms" } as React.CSSProperties}
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-ink-800">
                    <Image
                      src="/founder/studio.jpg"
                      alt={`${founder.name} away from the desk`}
                      fill
                      sizes="(min-width: 1024px) 25vw, 45vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="eyebrow mt-3 text-bone/40">
                    Off the clock
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </Shell>
      </section>

      {/* -------------------------------------------------------- fact sheet */}
      <section className="grain relative bg-ink py-24 md:py-32">
        <Shell>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow>Studio facts</Eyebrow>
              <h2
                data-reveal=""
                className="display mt-6 text-[clamp(1.9rem,3.8vw,3rem)]"
              >
                The boring page
                <br />
                nobody else writes.
              </h2>
              <p className="pretty mt-8 max-w-sm text-base leading-relaxed text-bone/65">
                If you are about to send money to a studio in another country,
                you should be able to find all of this in one place without
                asking.
              </p>
            </div>

            <dl className="lg:col-span-8">
              {studioFacts.map((f, i) => (
                <div
                  key={f.label}
                  data-reveal=""
                  style={{ "--reveal-delay": `${i * 40}ms` } as React.CSSProperties}
                  className="grid gap-2 border-t border-bone/12 py-5 sm:grid-cols-3 sm:gap-6"
                >
                  <dt className="eyebrow pt-1 text-bone/45">{f.label}</dt>
                  <dd
                    className={cx(
                      "text-base sm:col-span-2",
                      isPlaceholder(f.value) ? "text-bone/35 italic" : "text-bone/85",
                    )}
                  >
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Shell>
      </section>

      <Stats />

      {/* -------------------------------------------------------- principles */}
      <section className="grain relative bg-ink-800 py-24 md:py-32">
        <Shell>
          <div className="max-w-3xl">
            <Eyebrow>How we operate</Eyebrow>
            <h2
              data-reveal=""
              className="display balance mt-6 text-[clamp(2rem,4.2vw,3.4rem)]"
            >
              Six rules we don&rsquo;t break, including the one that costs us
              money.
            </h2>
          </div>

          <div className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {principles.map((p, i) => (
              <div
                key={p.title}
                data-reveal=""
                style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
                className="border-t border-bone/12 pt-6"
              >
                <span className="eyebrow text-stone">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="display mt-4 text-2xl leading-tight">
                  {p.title}
                </h3>
                <p className="pretty mt-4 text-sm leading-relaxed text-bone/65">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </Shell>
      </section>

      <Assurances />
      <Testimonials />

      <section className="grain relative bg-ink py-24 md:py-32">
        <Shell className="text-center">
          <h2 className="display balance mx-auto max-w-3xl text-[clamp(2rem,4.4vw,3.6rem)]">
            Still deciding whether to send that first email?
          </h2>
          <p className="pretty mx-auto mt-8 max-w-xl text-base leading-relaxed text-bone/65">
            Send it. Worst case you get an honest opinion on your project and a
            recommendation for someone better suited. There is no pitch deck
            waiting on the other side.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Cta href="/contact">Get in touch</Cta>
            <Cta href="/work" variant="outline">
              See the work first
            </Cta>
          </div>
        </Shell>
      </section>
    </>
  );
}
