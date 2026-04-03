// app/(main)/page.tsx
import { HeroSection } from "@/components/sections/HeroSection";
import { CredibilityStrip } from "@/components/sections/CredibilityStrip";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CredibilityStrip />
      <ProblemSection />
      <ServicesSection />
      <SolutionsSection />
      <WhyUsSection />
    </>
  );
}
