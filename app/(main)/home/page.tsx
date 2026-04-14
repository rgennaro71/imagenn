// app/(main)/home/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IMAGENN.AI — AI Innovation & Operational Automation",
  description:
    "IMAGENN.AI helps organizations modernize operations, eliminate bottlenecks, and build AI-powered foundations for scalable growth. Strategy, automation, and execution — from roadmap to results.",
  openGraph: {
    title: "IMAGENN.AI — AI Innovation & Operational Automation",
    description:
      "We bridge the gap between AI potential and organizational reality. Real systems, real results — not slide decks.",
    url: "https://imagenn.ai",
    siteName: "IMAGENN.AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IMAGENN.AI — AI Innovation & Operational Automation",
    description:
      "We bridge the gap between AI potential and organizational reality. Real systems, real results — not slide decks.",
  },
};

import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { SpeakingSection } from "@/components/sections/SpeakingSection";
import { WaitlistSection } from "@/components/sections/WaitlistSection";
import { FutureProofSection } from "@/components/sections/FutureProofSection";
import { InsightsPreviewSection } from "@/components/sections/InsightsPreviewSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <ServicesSection />
      <SolutionsSection />
      <WhyUsSection />
      <ProcessSection />
      <SpeakingSection />
      <WaitlistSection />
      <FutureProofSection />
      <InsightsPreviewSection />
      <FinalCTASection />
    </>
  );
}
