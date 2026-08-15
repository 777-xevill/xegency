/**
 * Lists every [PLACEHOLDER] still sitting in the content files.
 *
 *   npm run todo
 *
 * Exits 1 when any remain, so it also works as a pre-launch check in CI.
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const CONTENT = join(ROOT, "src", "content");
// Placeholders never contain a quote — that rules out TypeScript array
// literals like ["Web design", "Build"], which are content, not gaps.
const PATTERN = /\[[^\]\n"]{2,200}\]/g;

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

let total = 0;

for (const file of walk(CONTENT)) {
  const lines = readFileSync(file, "utf8").split(/\r?\n/);
  const hits = [];
  let inBlockComment = false;

  lines.forEach((line, i) => {
    const trimmed = line.trim();

    // The explanatory notes in these files mention [BRACKETS] themselves, so
    // comments are skipped rather than reported as work to do.
    const opensBlock = trimmed.includes("/*");
    const closesBlock = trimmed.includes("*/");
    const wasInBlock = inBlockComment;

    if (opensBlock && !closesBlock) inBlockComment = true;
    else if (closesBlock) inBlockComment = false;

    if (wasInBlock || opensBlock || trimmed.startsWith("//")) return;

    for (const match of line.matchAll(PATTERN)) {
      hits.push({ line: i + 1, text: match[0] });
    }
  });

  if (hits.length === 0) continue;

  console.log(`\n  ${relative(ROOT, file)}`);
  for (const hit of hits) {
    console.log(`    ${String(hit.line).padStart(4)}  ${hit.text}`);
  }
  total += hits.length;
}

if (total === 0) {
  console.log("\n  No placeholders left. Set siteStatus = \"live\" and ship it.\n");
  process.exit(0);
}

console.log(
  `\n  ${total} placeholder${total === 1 ? "" : "s"} still to fill in.\n` +
    `  Replace them, swap the template case studies for real work,\n` +
    `  then set siteStatus = "live" in src/content/site.ts.\n`,
);
process.exit(1);
