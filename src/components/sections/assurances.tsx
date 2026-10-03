import { assurances } from "@/content/site";
import { Eyebrow, Shell } from "@/components/ui";

/**
 * The section that does the heavy lifting for a studio nobody has heard of
 * yet. It answers the unspoken question — "what happens if I pay this person
 * and it goes wrong?" — before the prospect has to ask it out loud.
 */
export function Assurances() {
  return (
    <section className="grain relative bg-ink-800 py-24 md:py-36">
      <Shell>
        <div className="max-w-3xl">
          <Eyebrow>Working with someone new</Eyebrow>
          <h2
            data-split="lines"
            className="display balance mt-6 text-[clamp(2.1rem,4.4vw,3.6rem)]"
          >
            You&rsquo;re not buying design. You&rsquo;re taking a risk on a
            stranger.
          </h2>
          <p
            data-reveal=""
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
            className="pretty mt-8 text-base leading-relaxed text-bone/70 md:text-lg"
          >
            That&rsquo;s a fair thing to be careful about, and no amount of
            portfolio fixes it. So the terms are written to make the risk small
            and reversible — in the contract, not just in conversation.
          </p>
        </div>

        <div className="mt-16 md:mt-20">
          <span
            aria-hidden="true"
            data-draw=""
            className="block h-px w-full bg-bone/12"
          />
          <div data-stagger="0.1" className="grid md:grid-cols-2">
            {assurances.map((a, i) => (
              <div
                key={a.title}
                className="group relative border-b border-bone/12 py-10 transition-colors duration-700 ease-out-expo hover:bg-bone/3 md:px-10 md:py-14 md:even:border-l lg:px-12"
              >
                {/* Hairline that sweeps across the top edge on hover. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-stone/60 transition-transform duration-700 ease-out-expo group-hover:scale-x-100"
                />
                <span className="display block text-[clamp(3.5rem,6vw,5.5rem)] leading-[0.8] text-stone/45 transition-colors duration-700 ease-out-expo group-hover:text-stone">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="display mt-8 text-2xl leading-tight md:mt-10 md:text-[1.75rem]">
                  {a.title}
                </h3>
                <p className="pretty mt-4 max-w-md text-sm leading-relaxed text-bone/65">
                  {a.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Shell>
    </section>
  );
}
