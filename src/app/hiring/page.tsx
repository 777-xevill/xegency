import type { Metadata } from "next";
import { HiringDashboard } from "@/components/hiring-dashboard";
import { Shell } from "@/components/ui";

export const metadata: Metadata = {
  title: "Hiring",
  robots: { index: false, follow: false },
};

export default function HiringPage() {
  return (
    <section className="relative min-h-screen bg-ink pb-24 pt-32 text-bone md:pt-40">
      <Shell>
        <HiringDashboard />
      </Shell>
    </section>
  );
}
