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
            data-reveal=""
            className="display balance mt-6 text-[clamp(2.1rem,4.4vw,3.6rem)]"
          >
            You&rsquo;re not buying design. You&rsquo;re taking a risk on a
            stranger.
          </h2>
          <p
            data-reveal=""
            className="pretty mt-8 text-base leading-relaxed text-bone/70 md:text-lg"
          >
            That&rsquo;s a fair thing to be careful about, and no amount of
            portfolio fixes it. So the terms are written to make the risk small
            and reversible — in the contract, not just in conversation.
          </p>
        </div>

        <div className="mt-16 grid gap-px border-t border-bone/12 md:grid-cols-2">
          {assurances.map((a, i) => (
            <div
              key={a.title}
              data-reveal=""
              style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
              className="border-b border-bone/12 py-10 md:odd:pr-14 md:even:border-l md:even:pl-14"
            >
              <span className="eyebrow text-stone">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="display mt-4 text-2xl leading-tight md:text-[1.75rem]">
                {a.title}
              </h3>
              <p className="pretty mt-4 max-w-md text-sm leading-relaxed text-bone/65">
                {a.body}
              </p>
            </div>
          ))}
        </div>
      </Shell>
    </section>
  );
}
