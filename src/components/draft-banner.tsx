"use client";

import { useState } from "react";

/**
 * Only rendered while `siteStatus === "draft"` in src/content/site.ts.
 *
 * It exists so this site cannot quietly go public with template case studies
 * and [PLACEHOLDER] facts still in it. Fill everything in, flip the flag to
 * "live", and this disappears along with the noindex tag.
 */
export function DraftBanner() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] flex justify-center px-4 pb-4">
      <div className="pointer-events-auto flex max-w-2xl items-start gap-4 border border-amber-900/25 bg-amber-50 px-5 py-3.5 text-[13px] leading-relaxed text-amber-950 shadow-[0_8px_40px_-12px_rgba(24,23,22,0.4)]">
        <span
          aria-hidden="true"
          className="mt-[6px] h-1.5 w-1.5 shrink-0 rotate-45 bg-amber-700"
        />
        <p>
          <strong className="font-semibold">Draft.</strong> The case studies are
          templates and anything in{" "}
          <code className="bg-amber-900/10 px-1">[brackets]</code> is a
          placeholder. Search for them in{" "}
          <code className="bg-amber-900/10 px-1">src/content/</code>, then set{" "}
          <code className="bg-amber-900/10 px-1">siteStatus = &quot;live&quot;</code>.
          Search engines are blocked until you do.
        </p>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss draft notice"
          className="-mr-1 shrink-0 px-1 text-amber-900/60 transition-colors hover:text-amber-950"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
