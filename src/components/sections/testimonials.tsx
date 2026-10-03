import { testimonials } from "@/content/site";
import { Eyebrow, Shell } from "@/components/ui";

/**
 * Renders nothing until `testimonials` in src/content/site.ts has entries.
 * That is deliberate: an empty space costs you nothing, and a fabricated
 * quote costs you the client who checks.
 */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="grain relative bg-umber py-24 text-bone md:py-32">
      <Shell>
        <div data-reveal="">
          <Eyebrow>In their words</Eyebrow>
        </div>

        <div className="mt-14 grid gap-x-10 gap-y-14 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <figure
              key={t.name + i}
              data-reveal=""
              data-reveal-variant="flip"
              style={{ "--reveal-delay": `${i * 120}ms` } as React.CSSProperties}
            >
              <span
                aria-hidden="true"
                data-draw=""
                className="mb-8 block h-px w-full bg-bone/20"
              />
              <blockquote className="display balance text-[clamp(1.4rem,2.6vw,2.1rem)] leading-[1.15]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="eyebrow mt-6 text-bone/60">
                {t.name} — {t.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </Shell>
    </section>
  );
}
