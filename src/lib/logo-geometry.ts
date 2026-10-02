/* ============================================================================
   XEGENCY — LOGO GEOMETRY
   ----------------------------------------------------------------------------
   Single source for the mark and wordmark shapes. Used by the React logo
   (src/components/logo.tsx) and by scripts/export-brand.mjs, which writes the
   static SVG/PNG files in /public/brand. Plain values only — Node imports
   this file directly.
   ========================================================================== */

export const MARK = {
  // Drawn on a 100×100 grid, then rotated 45° and scaled to fit 100×100.
  transform: "translate(50 50) rotate(45) scale(0.7071) translate(-50 -50)",
  solid: ["M57 0h43v43H57z", "M0 57h43v43H0z", "M57 57h43v43H57z"],
  // Inset by half the stroke so the outline sits on the same footprint.
  outline: { x: 4.5, y: 4.5, size: 34, stroke: 9 },
};

// Cap height 20, stroke 2.6. Letters advance with 9 units of tracking.
export const WORDMARK = {
  viewBox: "-2 -2 167 24",
  stroke: 2.6,
  // Keeps 90° corners sharp but bevels the N's acute joins instead of spiking.
  miterLimit: 1.5,
  path: [
    "M0 0L16 20M16 0L0 20", // X
    "M38 0H25V20H38M25 10H36", // E
    "M62.9 3.57A9 10 0 1 0 65 10H57", // G
    "M87 0H74V20H87M74 10H85", // E
    "M96 20V0L112 20V0", // N
    "M136 3.57A8.5 10 0 1 0 136 16.43", // C
    "M147 0L155 10L163 0M155 10V20", // Y
  ].join(""),
};
