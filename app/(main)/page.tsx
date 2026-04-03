// app/(main)/page.tsx
import { HeroSection } from "@/components/sections/HeroSection";
import { CredibilityStrip } from "@/components/sections/CredibilityStrip";
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
      <CredibilityStrip />
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
