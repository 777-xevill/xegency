import { contact, faqs, founder, site, siteStatus } from "@/content/site";
import { hasPlaceholder, isPlaceholder } from "@/lib/format";

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

const ORG_ID = `${site.url}/#organization`;

/**
 * The organisation and the website as one graph. The WebSite node is what
 * Google reads for the site name shown above a result; the logo and the
 * profiles in `sameAs` tie the brand's search result, Facebook Page and
 * Instagram together as one entity.
 */
export function OrganizationSchema() {
  const sameAs = contact.socials
    .map((s) => s.href)
    .filter((h) => !isPlaceholder(h));
  const [locality, country] = founder.location.split(",").map((p) => p.trim());
  const logo = `${site.url}/brand/app-icon-512.png`;

  const organization = clean({
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: site.name,
    description: site.description,
    url: site.url,
    logo,
    image: logo,
    email: isPlaceholder(contact.email) ? undefined : contact.email,
    telephone: contact.phone || undefined,
    areaServed: "Worldwide",
    knowsAbout: [
      "AI agents",
      "Workflow automation",
      "Custom software",
      "Web development",
      "Mobile app development",
      "UI/UX design",
      "Brand identity",
      "Facebook advertising",
      "Instagram advertising",
    ],
    founder: clean({
      "@type": "Person",
      name: founder.fullName,
      jobTitle: founder.role,
    }),
    address: isPlaceholder(founder.location)
      ? undefined
      : clean({
          "@type": "PostalAddress",
          addressLocality: locality,
          addressCountry: country,
        }),
    sameAs: sameAs.length ? sameAs : undefined,
  });

  const website = {
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: `${site.url}/`,
    publisher: { "@id": ORG_ID },
  };

  return (
    <Script
      id="schema-org"
      data={{ "@context": "https://schema.org", "@graph": [organization, website] }}
    />
  );
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
      // Content is authored by us in src/content, not user input; `<` is
      // still escaped so no string can close the script tag early.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
