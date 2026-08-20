import Image from "next/image";
import Link from "next/link";
import { founder, site } from "@/content/site";
import { Arrow, Eyebrow, Shell, cx } from "@/components/ui";
import { isPlaceholder } from "@/lib/format";

/**
 * The single most persuasive block on the site: a real face, a real name and
 * a real location. Most of the distrust the studio runs into is simply not
 * knowing who is on the other end of the email.
 */
export function FounderIntro() {
  return (
    <section className="grain relative bg-ink py-24 md:py-36">
      <Shell>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div
            data-reveal=""
            className="relative lg:col-span-5 lg:sticky lg:top-28 lg:self-start"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-ink-800">
              <Image
                src="/founder/portrait.jpg"
                alt={`${founder.name}, ${founder.role} of ${site.name}`}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <p className="eyebrow mt-4 text-bone/45">
              {founder.fullName} — {founder.role}
            </p>
          </div>

          <div className="lg:col-span-7">
            <Eyebrow>Who you&rsquo;ll actually work with</Eyebrow>

            <h2
              data-reveal=""
              className="display mt-6 text-[clamp(2.1rem,4.4vw,3.6rem)]"
            >
              I&rsquo;m {founder.name}.
              <br />
              <span className="italic text-stone">
                I run {site.name}, and I do the work.
              </span>
            </h2>

            <div className="mt-8 space-y-6 text-base leading-relaxed text-bone/70 md:text-lg">
              <p className="pretty">{founder.bio}</p>
              <p className="pretty">
                Most people who reach out have been burned before — by an agency
                that disappeared, a freelancer who over-promised, or a template
                that never quite fit. That is usually the real conversation, so
                let&rsquo;s have it early rather than pretend it isn&rsquo;t
                happening.
              </p>
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-px border-t border-bone/12 sm:grid-cols-3">
              <Fact label="Based in" value={founder.location} />
              <Fact label="Working hours" value={founder.timezone} />
              <Fact label="Doing this since" value={founder.since} />
            </dl>

            <Link
              href="/about"
              className="link-sweep eyebrow mt-10 inline-flex items-center gap-2 text-stone"
            >
              More about the studio
              <Arrow />
            </Link>

            {/* supporting photography */}
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
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-bone/12 py-5 pr-6">
      <dt className="eyebrow text-bone/45">{label}</dt>
      <dd
        className={cx(
          "mt-2 text-sm",
          isPlaceholder(value) ? "text-bone/35 italic" : "text-bone",
        )}
      >
        {value}
      </dd>
    </div>
  );
}
