import type { Metadata } from "next";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { RevealObserver } from "@/components/reveal";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { MotionOrchestrator } from "@/components/motion/motion";
import { Preloader } from "@/components/motion/preloader";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { Cursor } from "@/components/motion/cursor";
import { site, siteStatus, founder } from "@/content/site";

const display = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: founder.fullName }],
  keywords: [
    "AI automation agency",
    "AI agents",
    "custom software development",
    "SaaS development",
    "web development agency",
    "mobile app development",
    "Next.js development",
    "Bangladesh software studio",
    site.name,
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  // A draft site must never be indexed. This clears itself when you flip
  // siteStatus to "live" in src/content/site.ts.
  robots:
    siteStatus === "draft"
      ? { index: false, follow: false }
      : { index: true, follow: true },
};

/**
 * Runs before first paint. `motion` arms the CSS pre-hide for elements GSAP
 * will animate in; `intro` shows the first-visit preloader. Neither is set
 * for reduced motion, and both are withdrawn if the motion layer never
 * reports ready, so a failed bundle can't leave the page hidden.
 */
const motionBootstrap = `(function(){var d=document.documentElement;try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('motion');try{if(!sessionStorage.getItem('xg-intro'))d.classList.add('intro')}catch(e){}setTimeout(function(){if(!d.classList.contains('motion-ready')){d.classList.remove('motion');d.classList.remove('intro')}},6000)}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // The bootstrap script adds classes to <html> before React hydrates.
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBootstrap }} />
        {/* Without JS the reveal animation never fires — show everything. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col bg-ink text-bone">
        <Preloader />
        <SmoothScroll />
        <MotionOrchestrator />
        <RevealObserver />
        <ScrollProgress />
        <Cursor />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
