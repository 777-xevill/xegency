import { contact, faqs, founder, site, siteStatus } from "@/content/site";
import { isPlaceholder } from "@/lib/format";

/** True when a string still contains an unfilled [PLACEHOLDER] anywhere in it. */
function hasPlaceholder(value: string) {
  return /\[[^\]]+\]/.test(value);
}

/**
 * Structured data. Google uses it for rich results, and it is one of the
 * cheapest credibility signals available — a properly described organisation
 * with a named founder looks materially different in search than a bare page.
 *
 * Placeholder values are stripped so we never publish "[CITY, COUNTRY]" as
 * machine-readable fact.
 */
function clean<T extends Record<string, unknown>>(obj: T) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => {
      if (v === undefined || v === null) return false;
      if (typeof v === "string") return !isPlaceholder(v);
      if (Array.isArray(v)) return v.length > 0;
      return true;
    }),
  );
}

export function OrganizationSchema() {
  const sameAs = contact.socials
    .map((s) => s.href)
    .filter((h) => !isPlaceholder(h));

  const data = clean({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    description: site.description,
    url: site.url,
    email: isPlaceholder(contact.email) ? undefined : contact.email,
    telephone: contact.phone || undefined,
    areaServed: "Worldwide",
    knowsAbout: [
      "Web design",
      "Web development",
      "Next.js",
      "Brand identity",
      "Conversion optimisation",
    ],
    founder: clean({
      "@type": "Person",
      name: founder.name,
      jobTitle: founder.role,
    }),
    address: isPlaceholder(founder.location)
      ? undefined
      : { "@type": "PostalAddress", addressLocality: founder.location },
    sameAs: sameAs.length ? sameAs : undefined,
  });

  return <Script id="schema-org" data={data} />;
}

export function FaqSchema() {
  // Only publish answers that are actually finished. A half-written answer is
  // worse than a missing one once Google is quoting it back in results.
  const answered = faqs.filter((f) => !hasPlaceholder(f.a));
  if (answered.length === 0) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: answered.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return <Script id="schema-faq" data={data} />;
}

function Script({ id, data }: { id: string; data: unknown }) {
  // A draft site makes no machine-readable claims at all.
  if (siteStatus === "draft") return null;

  return (
    <script
      id={id}
      type="application/ld+json"
      // Content is authored by us in src/content, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
