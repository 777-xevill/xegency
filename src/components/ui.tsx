import Link from "next/link";
import type { ReactNode } from "react";

/* ---------------------------------------------------------------- helpers */

export function cx(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

/* ------------------------------------------------------------------ arrow */

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={cx("h-3 w-3", className)}
    >
      <path
        d="M3 13L13 3M13 3H5.5M13 3v7.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
    </svg>
  );
}

/* ---------------------------------------------------------------- eyebrow */

export function Eyebrow({
  children,
  invert = false,
  className = "",
}: {
  children: ReactNode;
  invert?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cx(
        "eyebrow flex items-center gap-3",
        invert ? "text-umber" : "text-stone",
        className,
      )}
    >
      <span
        aria-hidden="true"
        data-draw=""
        className={cx(
          "h-px w-6",
          invert ? "bg-umber/50" : "bg-stone/50",
        )}
      />
      {children}
    </p>
  );
}

/* --------------------------------------------------------------- sections */

const tones = {
  ink: "bg-ink text-bone",
  inkDeep: "bg-ink-800 text-bone",
  bone: "bg-bone-50 text-ink",
  umber: "bg-umber text-bone",
} as const;

export function Section({
  id,
  tone = "ink",
  className = "",
  children,
}: {
  id?: string;
  tone?: keyof typeof tones;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cx("relative grain", tones[tone], className)}
    >
      <div className="relative z-10">{children}</div>
    </section>
  );
}

export function Shell({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cx("mx-auto w-full max-w-[1400px] px-6 md:px-10 lg:px-14", className)}>
      {children}
    </div>
  );
}

/* --------------------------------------------------------------- headings */

export function DisplayHeading({
  as: Tag = "h2",
  size = "lg",
  className = "",
  children,
}: {
  as?: "h1" | "h2" | "h3";
  size?: "xl" | "lg" | "md";
  className?: string;
  children: ReactNode;
}) {
  const sizes = {
    xl: "text-[clamp(2.75rem,8.5vw,7.5rem)]",
    lg: "text-[clamp(2.25rem,5.5vw,4.75rem)]",
    md: "text-[clamp(1.75rem,3.4vw,3rem)]",
  };
  return (
    <Tag className={cx("display balance", sizes[size], className)}>{children}</Tag>
  );
}

/* ---------------------------------------------------------------- buttons */

type CtaProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost";
  invert?: boolean;
  className?: string;
};

export function Cta({
  href,
  children,
  variant = "solid",
  invert = false,
  className = "",
}: CtaProps) {
  const base =
    "group relative inline-flex items-center justify-center gap-3 overflow-hidden px-8 py-4 text-[12px] font-medium uppercase tracking-[0.16em] transition-colors duration-500";

  // Defaults assume a dark surface. Pass `invert` on the light sections.
  const styles = {
    solid: invert
      ? "bg-ink text-bone hover:text-ink"
      : "bg-bone text-ink hover:text-bone",
    outline: invert
      ? "border border-ink/20 text-ink hover:text-bone"
      : "border border-bone/25 text-bone hover:text-ink",
    ghost: invert ? "text-ink" : "text-bone",
  };

  const sweep = {
    solid: invert ? "bg-bone" : "bg-ink",
    outline: invert ? "bg-ink" : "bg-bone",
    ghost: "",
  };

  const external = href.startsWith("http") || href.startsWith("mailto:");
  const inner = (
    <>
      {variant !== "ghost" && (
        <span
          aria-hidden="true"
          className={cx(
            "absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100",
            sweep[variant],
          )}
        />
      )}
      <span className="relative z-10">{children}</span>
      <Arrow className="relative z-10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1" />
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cx(base, styles[variant], className)}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={cx(base, styles[variant], className)}>
      {inner}
    </Link>
  );
}

/* -------------------------------------------------------------- text link */

export function TextLink({
  href,
  children,
  invert = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  invert?: boolean;
  className?: string;
}) {
  const cls = cx(
    "link-sweep inline-flex items-center gap-1.5",
    invert ? "text-ink" : "text-bone",
    className,
  );
  if (href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/* --------------------------------------------------------------- marquee */

export function Marquee({
  items,
  invert = false,
}: {
  items: string[];
  invert?: boolean;
}) {
  const row = [...items, ...items];
  return (
    <div
      data-marquee="60"
      data-marquee-pause=""
      className="relative overflow-hidden py-6"
      aria-hidden="true"
    >
      <div
        data-marquee-track=""
        className="flex w-max items-center gap-10 whitespace-nowrap"
      >
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span
              className={cx(
                "font-display text-[clamp(1.5rem,3vw,2.5rem)] leading-none",
                invert ? "text-ink/75" : "text-bone/80",
              )}
            >
              {item}
            </span>
            <span
              className={cx(
                "h-1 w-1 rotate-45",
                invert ? "bg-umber/40" : "bg-stone/60",
              )}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ rules */

export function Rule({
  invert = false,
  className = "",
}: {
  invert?: boolean;
  className?: string;
}) {
  return (
    <hr
      className={cx(
        "border-0 border-t",
        invert ? "hairline-invert" : "hairline",
        className,
      )}
    />
  );
}
