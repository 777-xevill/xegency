import { siteStatus } from "@/content/site";

/**
 * Content in `src/content/*` uses [SQUARE BRACKETS] for facts that have not
 * been filled in yet. These helpers stop a placeholder from turning into a
 * broken `mailto:[you@xegency.com]` link — it renders as plain text instead,
 * which is obvious to you and harmless to a visitor.
 */

export function isPlaceholder(value: string | null | undefined): boolean {
  if (!value) return true;
  return /^\s*\[.*\]\s*$/.test(value);
}

/** True when a string still contains an unfilled [PLACEHOLDER] anywhere in it. */
export function hasPlaceholder(value: string): boolean {
  return /\[[^\]]+\]/.test(value);
}

/**
 * Whether a value should reach the page at all. A draft shows unfilled
 * placeholders so they get noticed; a live site leaves them out rather than
 * show a prospect "[$0,000]".
 */
export function shown(value: string): boolean {
  return siteStatus === "draft" || !hasPlaceholder(value);
}

/** Returns the href, or null when the value is still a placeholder. */
export function safeHref(value: string | null | undefined): string | null {
  if (isPlaceholder(value)) return null;
  return value ?? null;
}

export function mailtoHref(
  email: string,
  subject?: string,
): string | null {
  if (isPlaceholder(email)) return null;
  const query = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return `mailto:${email}${query}`;
}
