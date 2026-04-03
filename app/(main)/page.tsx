// app/(main)/page.tsx
import { HeroSection } from "@/components/sections/HeroSection";
import { CredibilityStrip } from "@/components/sections/CredibilityStrip";
import { ProblemSection } from "@/components/sections/ProblemSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CredibilityStrip />
      <ProblemSection />
    </>
  );
}
