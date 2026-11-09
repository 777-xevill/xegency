import { copyFile, readdir } from "node:fs/promises";
import { join, relative, sep } from "node:path";

/**
 * `next build` with output: "export" writes per-segment prefetch files to
 * nested paths like services/__next.services/__PAGE__.txt, but the browser
 * asks for services/__next.services.__PAGE__.txt. Each miss downloads the
 * whole 404 page, so copy every nested file to the flat name it is fetched by.
 */

const root = "out";

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else yield path;
  }
}

let copied = 0;
for await (const file of walk(root)) {
  const parts = relative(root, file).split(sep);
  const at = parts.slice(0, -1).findIndex((part) => part.startsWith("__next."));
  if (at === -1) continue;
  await copyFile(file, join(root, ...parts.slice(0, at), parts.slice(at).join(".")));
  copied += 1;
}

console.log(`Flattened ${copied} prefetch files.`);
