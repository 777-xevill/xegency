import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The preview card Facebook, LinkedIn, X and WhatsApp show when someone
 * shares a link to the site. Rendered once at build time. The logo is the
 * exported brand SVG, so no font has to be loaded to draw the wordmark.
 */
export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/brand/logo-bone.svg"));
  const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 88px",
          background: "radial-gradient(circle at 88% 0%, #2f2b27 0%, #0f0e0d 60%)",
          color: "#e4dfd7",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#a59b8f",
          }}
        >
          {site.tagline}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> */}
          <img src={logoSrc} alt={site.name} width={728} height={106} />
          <div
            style={{
              display: "flex",
              marginTop: 48,
              fontSize: 30,
              color: "rgba(228, 223, 215, 0.72)",
            }}
          >
            AI agents · Custom software · Websites &amp; apps · Branding · Meta ads
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#a59b8f" }}>
          xegency.com
        </div>
      </div>
    ),
    size,
  );
}
