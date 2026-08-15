import type { Metadata } from "next";
import { availability, contact, founder, process, site } from "@/content/site";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";
import { Faq } from "@/components/sections/faq";
import { Shell, Eyebrow, cx } from "@/components/ui";
import { isPlaceholder, mailtoHref, safeHref } from "@/lib/format";

export const metadata: Metadata = {
  title: "Contact",
  description: `Start a project with ${site.name}. ${availability.responseTime}.`,
};

export default function ContactPage() {
  const email = mailtoHref(contact.email, "New enquiry");
  const calendar = safeHref(contact.calendar);

  const direct = [
    {
      label: "Email",
      value: contact.email,
      href: email,
    },
    contact.phone
      ? { label: "Phone", value: contact.phone, href: `tel:${contact.phone}` }
      : null,
    {
      label: "Book a call",
      value: calendar ? "30 minutes, no pitch" : contact.calendar,
      href: calendar,
    },
    {
      label: "Based in",
      value: founder.location,
      href: null,
    },
  ].filter(Boolean) as { label: string; value: string; href: string | null }[];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Tell me what
            <br />
            you&rsquo;re building.
          </>
        }
        lead={`${availability.responseTime}. If the project isn't a fit for ${site.name}, you'll hear that on the first call along with a suggestion of who is.`}
      />

      <section className="grain relative bg-ink pb-24 md:pb-32">
        <Shell>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
            {/* ------------------------------------------------------ form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            {/* --------------------------------------------------- sidebar */}
            <aside className="lg:col-span-4 lg:col-start-9">
              <div className="border-t border-bone/12 pt-6">
                <Eyebrow>Or reach me directly</Eyebrow>
                <dl className="mt-6 space-y-5">
                  {direct.map((d) => (
                    <div key={d.label}>
                      <dt className="eyebrow text-bone/45">{d.label}</dt>
                      <dd className="mt-1.5">
                        {d.href ? (
                          <a
                            href={d.href}
                            target={
                              d.href.startsWith("http") ? "_blank" : undefined
                            }
                            rel="noopener noreferrer"
                            className="link-sweep text-base text-bone"
                          >
                            {d.value}
                          </a>
                        ) : (
                          <span
                            className={cx(
                              "text-base",
                              isPlaceholder(d.value)
                                ? "text-bone/35 italic"
                                : "text-bone",
                            )}
                          >
                            {d.value}
                          </span>
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-12 border-t border-bone/12 pt-6">
                <Eyebrow>What happens next</Eyebrow>
                <ol className="mt-6 space-y-5">
                  {process.slice(0, 3).map((p) => (
                    <li key={p.step} className="flex gap-4">
                      <span className="eyebrow mt-1 shrink-0 text-stone">
                        {p.step}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-bone">
                          {p.title}
                          <span className="ml-2 font-normal text-bone/45">
                            {p.duration}
                          </span>
                        </p>
                        <p className="pretty mt-1.5 text-sm leading-relaxed text-bone/60">
                          {p.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-12 border-t border-bone/12 pt-6">
                <Eyebrow>Currently</Eyebrow>
                <p className="pretty mt-5 text-sm leading-relaxed text-bone/65">
                  {availability.label}. Projects are usually booked{" "}
                  {availability.status === "closed"
                    ? "well in advance"
                    : "two to four weeks ahead"}
                  , so it&rsquo;s worth starting the conversation before
                  you&rsquo;re ready to begin.
                </p>
              </div>
            </aside>
          </div>
        </Shell>
      </section>

      <Faq
        heading="Answers before you write."
        intro="The things most people want to know before sending a first message to a studio they haven't worked with."
      />
    </>
  );
}
