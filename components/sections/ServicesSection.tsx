// components/sections/ServicesSection.tsx
"use client";

import Link from "next/link";
import { Brain, BarChart3, Users, Zap, Settings, BookOpen, Headphones, Cpu } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const leadServices = [
  {
    icon: Brain,
    title: "AI Strategy & Opportunity Mapping",
    description: "Identify where AI creates real business impact. Map your highest-value automation opportunities. Build a roadmap that connects innovation to execution.",
    href: "/services#ai-strategy",
  },
  {
    icon: BarChart3,
    title: "AI-Powered Decision Support",
    description: "Move from gut feel to intelligent insight. We build decision frameworks and AI tools that surface the right information at the right moment.",
    href: "/services#decision-support",
  },
  {
    icon: Users,
    title: "Change Enablement & AI Adoption",
    description: "Technology alone doesn't transform organizations. We guide your teams through the shifts that make AI adoption stick.",
    href: "/services#change-enablement",
  },
];

const secondaryServices = [
  { icon: Zap, title: "Workflow Automation", href: "/services#workflow-automation", description: "" },
  { icon: Settings, title: "Operational Transformation", href: "/services#operational-transformation", description: "" },
  { icon: BookOpen, title: "Intelligent Knowledge Systems", href: "/services#knowledge-systems", description: "" },
  { icon: Headphones, title: "Customer Experience Automation", href: "/services#cx-automation", description: "" },
  { icon: Cpu, title: "Internal Productivity Systems", href: "/services#productivity", description: "" },
];

export function ServicesSection() {
  return (
    <section className="section-padding bg-obsidian-secondary">
      <div className="content-width">
        <SectionHeader
          eyebrow="What We Do"
          heading="AI That Moves Your Business Forward."
          subheading="Practical, execution-focused services designed to create real operational impact — not just strategy decks."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {leadServices.map((s) => <ServiceCard key={s.title} {...s} variant="lead" />)}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
          {secondaryServices.map((s) => <ServiceCard key={s.title} {...s} variant="secondary" />)}
        </div>

        <div className="text-center">
          <Link
            href="/services"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "border-white/10 text-slate-secondary hover:border-indigo/40 hover:text-slate-primary"
            )}
          >
            Explore All Services →
          </Link>
        </div>
      </div>
    </section>
  );
}
