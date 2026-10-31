import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { ClientsBand, Manifesto, Stats } from "@/components/sections/proof";
import { ServicesPreview } from "@/components/sections/services-preview";
import { EngineRoom } from "@/components/sections/engine-room";
import { WorkPreview } from "@/components/sections/work-preview";
import { AiAudit } from "@/components/sections/ai-audit";
import { Process } from "@/components/sections/process";
import { Assurances } from "@/components/sections/assurances";
import { FounderIntro } from "@/components/sections/founder-intro";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { BrandGrowth } from "@/components/sections/brand-growth";
import { OrganizationSchema, FaqSchema } from "@/components/structured-data";

export const metadata: Metadata = {
  // The root is the one URL Google should treat as "Xegency" — not the
  // .vercel.app alias that serves the same page.
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <OrganizationSchema />
      <FaqSchema />

      <Hero />
      <ClientsBand />
      <ServicesPreview />
      <Manifesto />
      <EngineRoom />
      <BrandGrowth />
      <WorkPreview />
      <AiAudit />
      <FounderIntro />
      <Process />
      <Stats />
      <Assurances />
      <Testimonials />
      <Faq intro="If something you need to know isn't here, ask on the first call — a direct question gets a direct answer." />
    </>
  );
}
