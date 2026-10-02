// Writes the static logo files from src/lib/logo-geometry.ts:
//   public/brand/*.svg|png   — used by the site and for sharing
//   src/app/icon.svg, src/app/apple-icon.png — favicon and home-screen icon
// Run: node scripts/export-brand.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { MARK, WORDMARK } from "../src/lib/logo-geometry.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "public", "brand");
mkdirSync(out, { recursive: true });

const INK = "#0f0e0d";
const BONE = "#e4dfd7";

const markGroup = (color) => `<g transform="${MARK.transform}" fill="${color}">
    ${MARK.solid.map((d) => `<path d="${d}"/>`).join("")}
    <rect x="${MARK.outline.x}" y="${MARK.outline.y}" width="${MARK.outline.size}" height="${MARK.outline.size}" fill="none" stroke="${color}" stroke-width="${MARK.outline.stroke}"/>
  </g>`;

const wordGroup = (color) =>
  `<path d="${WORDMARK.path}" fill="none" stroke="${color}" stroke-width="${WORDMARK.stroke}" stroke-miterlimit="${WORDMARK.miterLimit}"/>`;

const svg = (viewBox, body, bg) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">${
    bg ? `<rect x="-1000" y="-1000" width="3000" height="3000" fill="${bg}"/>` : ""
  }${body}</svg>\n`;

// Mark alone, 100×100.
const mark = (color, bg) => svg("0 0 100 100", markGroup(color), bg);

// Mark at 28 units, wordmark centred beside it.
const lockup = (color, bg) =>
  svg(
    "-1 -1 206 30",
    `<g transform="scale(0.28)">${markGroup(color)}</g>
  <g transform="translate(40 4)">${wordGroup(color)}</g>`,
    bg,
  );

// App icon: mark on an ink tile with breathing room.
const appIcon = svg(
  "0 0 100 100",
  `<rect width="100" height="100" fill="${INK}"/><g transform="translate(18 18) scale(0.64)">${markGroup(BONE)}</g>`,
);

const files = {
  "mark-bone.svg": mark(BONE),
  "mark-ink.svg": mark(INK),
  "logo-bone.svg": lockup(BONE),
  "logo-ink.svg": lockup(INK),
  "app-icon.svg": appIcon,
};

for (const [name, content] of Object.entries(files)) {
  writeFileSync(join(out, name), content);
}

const png = (content, file, width) =>
  sharp(Buffer.from(content), { density: 600 }).resize({ width }).png().toFile(file);

await Promise.all([
  png(appIcon, join(out, "app-icon-512.png"), 512),
  png(lockup(BONE, INK), join(out, "logo-on-ink-2000.png"), 2000),
  png(lockup(INK, BONE), join(out, "logo-on-bone-2000.png"), 2000),
  png(mark(BONE), join(out, "mark-bone-1024.png"), 1024),
  png(mark(INK), join(out, "mark-ink-1024.png"), 1024),
  png(appIcon, join(root, "src", "app", "apple-icon.png"), 180),
]);
writeFileSync(join(root, "src", "app", "icon.svg"), appIcon);

console.log(`Wrote ${Object.keys(files).length + 5} files to public/brand, plus app icons.`);
