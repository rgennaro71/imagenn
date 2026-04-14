// components/sections/ProcessSection.tsx
"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ProcessStep } from "@/components/shared/ProcessStep";

const steps = [
  {
    number: "01",
    title: "Discover",
    description: "We map your organization's current state: systems, workflows, data, people, and pain points. We find where AI creates real leverage — and where it doesn't.",
    outcome: "Clear picture of your highest-impact automation and AI opportunities.",
  },
  {
    number: "02",
    title: "Design",
    description: "We architect the solution — AI strategy, automation design, process re-engineering — with your team's reality at the center, not an idealized version of it.",
    outcome: "A practical roadmap your organization can actually execute.",
  },
  {
    number: "03",
    title: "Build",
    description: "We implement. Automation workflows, AI-powered tools, decision systems. Practical, tested, and integrated into how your organization works — not bolted on.",
    outcome: "Working AI systems deployed in your environment.",
  },
  {
    number: "04",
    title: "Scale",
    description: "We help you grow the capability. Adoption support, team enablement, iteration cycles. The foundation grows with you and compounds over time.",
    outcome: "An organization with expanding AI capability and competitive advantage.",
  },
];

export function ProcessSection() {
  return (
    <section
      className="section-padding"
      style={{ background: "#0D1120" }}
    >
      {/* Top boundary */}
      <div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{ background: "rgba(255,255,255,0.04)" }}
        aria-hidden="true"
      />

      <div className="content-width relative">
        <SectionHeader
          eyebrow="How We Work"
          heading="From Strategy to Scale — All of It."
          subheading="A four-step framework designed to take you from insight to implementation without losing momentum."
          align="center"
          theme="dark"
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-8">
          {steps.map((step, i) => (
            <ProcessStep
              key={step.number}
              {...step}
              isLast={i === steps.length - 1}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
