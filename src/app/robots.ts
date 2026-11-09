export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { site, siteStatus } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  // While the site is a draft, keep it out of search results entirely.
  if (siteStatus === "draft") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
