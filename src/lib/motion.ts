import type Lenis from "lenis";

/* ============================================================================
   Shared motion state for client components.

   - The Lenis instance is created once by <SmoothScroll /> in the root layout.
     Use getLenis()?.stop() / .start() to lock page scroll (menus, dialogs).
   - The "intro" is the first-visit preloader. Anything that should play as
     the page is unveiled (hero headline, 3D mark assembly) waits on
     onIntroDone(). On repeat visits the intro is skipped and callbacks run
     almost immediately.
   ========================================================================== */

let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function getLenis() {
  return lenis;
}

type Callback = () => void;

let introDone = false;
let failsafe: ReturnType<typeof setTimeout> | null = null;
const waiting = new Set<Callback>();

export function markIntroDone() {
  if (introDone) return;
  introDone = true;
  if (failsafe) clearTimeout(failsafe);
  const callbacks = [...waiting];
  waiting.clear();
  for (const cb of callbacks) cb();
}

export function isIntroDone() {
  return introDone;
}

/** Runs `cb` once the intro has finished. Returns an unsubscribe function. */
export function onIntroDone(cb: Callback): () => void {
  if (introDone) {
    cb();
    return () => {};
  }
  waiting.add(cb);
  // Never let a broken preloader hold the page hostage.
  if (!failsafe && typeof window !== "undefined") {
    failsafe = setTimeout(markIntroDone, 6000);
  }
  return () => {
    waiting.delete(cb);
  };
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function hasFinePointer() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
}
