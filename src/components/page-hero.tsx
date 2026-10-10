import type { ReactNode } from "react";
import { Eyebrow, Float3D, Shell } from "@/components/ui";

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
    <section className="grain ambient relative bg-ink pt-36 pb-16 md:pt-48 md:pb-20">
      {/* The logo's slab, turning in 3D at the edge. */}
      <Float3D className="-right-28 top-1/2 hidden h-[34rem] w-[34rem] -translate-y-1/2 text-bone/[0.12] lg:block" />
      <Shell>
        <Eyebrow>{eyebrow}</Eyebrow>

        <h1
          data-split="lines"
          data-split-trigger="intro"
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
          <dl
            data-stagger="0.08"
            className="mt-14 grid grid-cols-2 gap-px border-t border-bone/12 md:grid-cols-4"
          >
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
