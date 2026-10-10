import { cx } from "@/components/ui";
import { MARK, WORDMARK } from "@/lib/logo-geometry";

/* ============================================================================
   XEGENCY — LOGO
   ----------------------------------------------------------------------------
   The mark: four squares on a 45° grid. The gaps between them draw an X; the
   squares themselves are the site's diamond motif. Three are solid, one is
   an outline — the piece a business is missing, the one we build.

   The wordmark is drawn as strokes rather than set in a font, so it renders
   identically in the header, in an <img>, in a favicon and in a PDF.

   Both inherit `currentColor`. Static exports live in /public/brand and are
   regenerated with `node scripts/export-brand.mjs`.
   ========================================================================== */

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <g transform={MARK.transform} fill="currentColor">
        {MARK.solid.map((d) => (
          <path key={d} d={d} />
        ))}
        <rect
          x={MARK.outline.x}
          y={MARK.outline.y}
          width={MARK.outline.size}
          height={MARK.outline.size}
          fill="none"
          stroke="currentColor"
          strokeWidth={MARK.outline.stroke}
        />
      </g>
    </svg>
  );
}

export function Logo({
  className = "",
  markClassName = "",
}: {
  className?: string;
  /** Extra classes for the mark alone — e.g. a hover rotation in the header. */
  markClassName?: string;
}) {
  return (
    <span className={cx("inline-flex items-center gap-3", className)}>
      <LogoMark className={cx("h-[1.75em] w-[1.75em] shrink-0", markClassName)} />
      <svg
        viewBox={WORDMARK.viewBox}
        className="h-[1em] w-auto"
        role="img"
        aria-label="Xegency"
      >
        <path
          d={WORDMARK.path}
          fill="none"
          stroke="currentColor"
          strokeWidth={WORDMARK.stroke}
          strokeMiterlimit={WORDMARK.miterLimit}
        />
      </svg>
    </span>
  );
}
