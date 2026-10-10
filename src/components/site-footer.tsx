import Link from "next/link";
import { contact, founder, nav, site, availability } from "@/content/site";
import { services } from "@/content/site";
import { Shell, Arrow, cx } from "@/components/ui";
import { Logo } from "@/components/logo";
import { FooterScene } from "@/components/three/footer-scene";
import { isPlaceholder, mailtoHref, safeHref } from "@/lib/format";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const email = mailtoHref(contact.email);
  const calendar = safeHref(contact.calendar);

  return (
    <footer className="relative grain overflow-hidden bg-ink text-bone">
      {/* The 3D mark assembles as you scroll down to it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[32rem] md:h-[40rem]"
      >
        <FooterScene className="absolute inset-0" />
      </div>
      <Shell className="relative z-10 pt-24 pb-10 md:pt-32">
        {/* call to action */}
        <div className="flex flex-col gap-10 border-b border-bone/10 pb-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow text-stone">Next step</p>
            <h2
              data-split="words"
              className="display mt-6 text-[clamp(2.25rem,5.5vw,4.5rem)]"
            >
              Tell me what you&rsquo;re building.
            </h2>
            <p className="pretty mt-6 max-w-md text-base leading-relaxed text-bone/65">
              {availability.responseTime}. If Xegency isn&rsquo;t the right fit
              for the project, I&rsquo;ll say so on the first call and point you
              somewhere better.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row md:pb-2">
            <span data-magnetic="0.3">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-3 bg-bone px-8 py-4 text-[12px] font-medium uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:bg-stone"
              >
                Start a project
                <Arrow className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </span>
            {calendar && (
              <span data-magnetic="0.3">
                <a
                  href={calendar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-3 border border-bone/25 px-8 py-4 text-[12px] font-medium uppercase tracking-[0.16em] transition-colors duration-300 hover:border-bone/60"
                >
                  Book a call
                  <Arrow className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </span>
            )}
          </div>
        </div>

        {/* columns */}
        <div
          data-stagger="0.09"
          className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4"
        >
          <div>
            <Logo className="text-[15px] text-bone" />
            <p className="pretty mt-6 max-w-xs text-sm leading-relaxed text-bone/55">
              {site.tagline}. Founded and run by {founder.fullName}
              {!isPlaceholder(founder.location) && <> in {founder.location}</>}.
            </p>
          </div>

          <FooterColumn title="Studio">
            {nav.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Services">
            {services.map((s) => (
              <FooterLink key={s.number} href="/services">
                {s.title}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Elsewhere">
            {email ? (
              <FooterLink href={email}>{contact.email}</FooterLink>
            ) : (
              <li className="text-sm text-bone/40">{contact.email}</li>
            )}
            {contact.socials.map((s) => {
              const href = safeHref(s.href);
              return href ? (
                <FooterLink key={s.label} href={href}>
                  {s.label}
                </FooterLink>
              ) : (
                <li key={s.label} className="text-sm text-bone/40">
                  {s.label} — link not set
                </li>
              );
            })}
          </FooterColumn>
        </div>

        {/* oversized wordmark */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none overflow-hidden border-t border-bone/10 pt-10"
        >
          <span
            data-scrub-letters=""
            className="display block pb-[0.2em] text-center text-[clamp(3.5rem,17vw,15rem)] leading-[0.8] text-bone/[0.12]"
          >
            Xegency
          </span>
        </div>

        <div className="flex flex-col gap-3 pt-8 text-[11px] uppercase tracking-[0.14em] text-bone/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <p>
            {isPlaceholder(founder.timezone)
              ? "Working hours set in src/content/site.ts"
              : `Working ${founder.timezone}`}
          </p>
        </div>
      </Shell>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="eyebrow text-stone">{title}</p>
      <ul className="mt-6 space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  const cls = cx(
    "link-sweep text-sm text-bone/65 transition-colors hover:text-bone",
    className,
  );
  return (
    <li>
      {external ? (
        <a
          href={href}
          target={href.startsWith("mailto:") ? undefined : "_blank"}
          rel="noopener noreferrer"
          className={cls}
        >
          {children}
        </a>
      ) : (
        <Link href={href} className={cls}>
          {children}
        </Link>
      )}
    </li>
  );
}
