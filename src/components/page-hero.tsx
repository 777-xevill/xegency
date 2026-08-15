import type { ReactNode } from "react";
import { Eyebrow, Shell } from "@/components/ui";

export function PageHero({
  eyebrow,
  title,
  lead,
  meta,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  meta?: { label: string; value: ReactNode }[];
  children?: ReactNode;
}) {
  return (
    <section className="grain relative bg-ink pt-36 pb-16 md:pt-48 md:pb-20">
      <Shell>
        <Eyebrow>{eyebrow}</Eyebrow>

        <h1
          data-reveal=""
          className="display balance mt-7 max-w-5xl text-[clamp(2.5rem,6.4vw,5.5rem)]"
        >
          {title}
        </h1>

        {lead && (
          <p
            data-reveal=""
            style={{ "--reveal-delay": "90ms" } as React.CSSProperties}
            className="pretty mt-8 max-w-2xl text-lg leading-relaxed text-bone/70 md:text-xl"
          >
            {lead}
          </p>
        )}

        {children}

        {meta && meta.length > 0 && (
          <dl className="mt-14 grid grid-cols-2 gap-px border-t border-bone/12 md:grid-cols-4">
            {meta.map((m) => (
              <div key={m.label} className="py-6 pr-6">
                <dt className="eyebrow text-bone/45">{m.label}</dt>
                <dd className="mt-2.5 text-sm text-bone">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </Shell>
    </section>
  );
}
