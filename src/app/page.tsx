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
import { OrganizationSchema, FaqSchema } from "@/components/structured-data";

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
