import type { Metadata } from "next";
import { site } from "@/content/site";
import {
  careerFaqs,
  day,
  earnings,
  fits,
  gives,
  role,
  steps,
  terms,
} from "@/content/careers";
import { PageHero } from "@/components/page-hero";
import { ApplyForm } from "@/components/apply-form";
import { Faq } from "@/components/sections/faq";
import { Arrow, Eyebrow, Shell } from "@/components/ui";

export const metadata: Metadata = {
  title: `Careers: ${role.title}`,
  description: `Join the ${site.name} sales team anywhere in Bangladesh as a ${role.title}. ${role.pay}. No fees, no CV needed to apply.`,
  alternates: { canonical: "/careers" },
  openGraph: {
    title: `${role.title} at ${site.name}, Bangladesh`,
    description: `${role.pay}. Bring businesses to the team that built systems for BEXIMCO, Square and PRAN.`,
  },
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow={`Careers · ${role.team}`}
        title={
          <>
            Open the doors.
            <br />
            Earn from every deal.
          </>
        }
        lead={role.summary}
        meta={[
          { label: "Role", value: role.title },
          { label: "Pay", value: role.pay },
          { label: "Where", value: role.location },
          { label: "To apply", value: "2 minutes, no CV" },
        ]}
      >
        <a
          href="#apply"
          className="group mt-10 inline-flex items-center gap-3 bg-bone px-8 py-4 text-[12px] font-medium uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:bg-stone"
        >
          Apply now
          <Arrow className="rotate-90 transition-transform duration-500 group-hover:translate-y-1" />
        </a>
      </PageHero>

      {/* ------------------------------------------------- the deal, plainly */}
      <section className="grain relative bg-ink-800 py-20 text-bone md:py-28">
        <Shell>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow>The terms</Eyebrow>
              <h2 className="display balance mt-6 text-[clamp(2rem,3.6vw,3rem)]">
                Clear numbers, before you apply.
              </h2>
              <p className="pretty mt-6 max-w-sm text-base leading-relaxed text-bone/60">
                This role is commission only. There&rsquo;s no salary, and no
                limit on what you can earn. You get a quarter of every deal you
                bring in.
              </p>
            </div>

            <div className="lg:col-span-8">
              <dl data-stagger="0.08" className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
                {terms.map((t) => (
                  <div key={t.label} className="flex flex-col border-t border-bone/15 pt-5">
                    <dt className="eyebrow order-2 mt-4 text-stone">{t.label}</dt>
                    <dd className="display order-1 text-[clamp(2.4rem,5vw,3.6rem)] leading-none">
                      {t.value}
                    </dd>
                    <dd className="order-3 mt-2 text-sm leading-snug text-bone/55">{t.note}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-14 border border-bone/12">
                <p className="eyebrow border-b border-bone/12 px-5 py-4 text-bone/50">
                  What one deal can pay you
                </p>
                <table className="w-full text-left text-sm">
                  <thead className="sr-only">
                    <tr>
                      <th>Project</th>
                      <th>Project value</th>
                      <th>Your 25%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {earnings.map((e) => (
                      <tr key={e.deal} className="border-b border-bone/8 last:border-0">
                        <td className="px-5 py-4 text-bone/80">{e.deal}</td>
                        <td className="px-5 py-4 tabular-nums text-bone/45">{e.size}</td>
                        <td className="px-5 py-4 text-right font-medium tabular-nums text-bone">
                          {e.yours}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="border-t border-bone/12 px-5 py-3 text-xs text-bone/40">
                  Example project sizes. Your commission is always 25% of what the
                  client actually pays.
                </p>
              </div>
            </div>
          </div>
        </Shell>
      </section>

      {/* ----------------------------------------------------- the work day */}
      <section className="grain relative bg-ink py-20 text-bone md:py-28">
        <Shell>
          <Eyebrow>The work</Eyebrow>
          <h2 className="display balance mt-6 max-w-3xl text-[clamp(2rem,3.6vw,3rem)]">
            Every day: find, call, meet, hand over.
          </h2>
          <ol data-stagger="0.09" className="mt-14 grid gap-px bg-bone/10 md:grid-cols-2 lg:grid-cols-4">
            {day.map((d, i) => (
              <li key={d.title} className="bg-ink p-7 md:p-8">
                <span className="eyebrow text-stone">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display mt-5 text-2xl">{d.title}</h3>
                <p className="pretty mt-4 text-sm leading-relaxed text-bone/60">{d.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-20 grid gap-14 md:grid-cols-2">
            <div>
              <Eyebrow>What you get from us</Eyebrow>
              <ul className="mt-6 space-y-4">
                {gives.map((g) => (
                  <li key={g} className="flex gap-4 text-base leading-relaxed text-bone/75">
                    <span aria-hidden="true" className="mt-[0.7em] h-1 w-1 shrink-0 rotate-45 bg-stone" />
                    {g}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Eyebrow>You&rsquo;ll fit if</Eyebrow>
              <ul className="mt-6 space-y-4">
                {fits.map((f) => (
                  <li key={f} className="flex gap-4 text-base leading-relaxed text-bone/75">
                    <span aria-hidden="true" className="mt-[0.7em] h-1 w-1 shrink-0 rotate-45 bg-stone" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Shell>
      </section>

      {/* ------------------------------------------------- process + form */}
      <section id="apply" className="grain relative scroll-mt-24 bg-ink pb-24 text-bone md:pb-32">
        <Shell>
          <div className="grid gap-14 border-t border-bone/12 pt-20 lg:grid-cols-12 lg:gap-10">
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <Eyebrow>How hiring works</Eyebrow>
                <h2 className="display balance mt-6 text-[clamp(2rem,3.6vw,3rem)]">
                  Four steps, about two weeks.
                </h2>
                <ol className="mt-10 space-y-6">
                  {steps.map((s, i) => (
                    <li key={s.title} className="flex gap-4">
                      <span className="eyebrow mt-1 shrink-0 text-stone">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-bone">
                          {s.title}
                          <span className="ml-2 font-normal text-bone/45">{s.time}</span>
                        </p>
                        <p className="pretty mt-1.5 text-sm leading-relaxed text-bone/60">
                          {s.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>

            <div className="lg:col-span-7 lg:col-start-6">
              <h2 className="display text-[clamp(1.8rem,3vw,2.5rem)]">
                Apply for {role.title}
              </h2>
              <p className="mt-3 text-sm text-bone/50">
                Ten quick questions, most of them one tap. About two minutes.
              </p>
              <div className="mt-10">
                <ApplyForm />
              </div>
            </div>
          </div>
        </Shell>
      </section>

      <Faq
        heading="Before you apply."
        intro="Honest answers to what people ask about a commission role."
        items={careerFaqs}
      />
    </>
  );
}
