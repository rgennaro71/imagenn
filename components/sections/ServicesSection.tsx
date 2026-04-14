// components/sections/ServicesSection.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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
    <section
      className="section-padding"
      style={{ background: "#090C17" }}
    >
      {/* Subtle top boundary */}
      <div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{ background: "rgba(255,255,255,0.04)" }}
        aria-hidden="true"
      />

      <div className="content-width relative">
        <SectionHeader
          eyebrow="What We Do"
          heading="AI That Moves Your Business Forward."
          subheading="Practical, execution-focused services designed to create real operational impact — not just strategy decks."
          align="center"
          theme="dark"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          {leadServices.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
            >
              <ServiceCard {...s} variant="lead" theme="dark" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-14"
        >
          {secondaryServices.map((s) => (
            <ServiceCard key={s.title} {...s} variant="secondary" theme="dark" />
          ))}
        </motion.div>

        <div className="text-center">
          <Link
            href="/services"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "text-slate-secondary hover:text-slate-primary transition-colors duration-200"
            )}
            style={{
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.03)",
            }}
          >
            Explore All Services →
          </Link>
        </div>
      </div>
    </section>
  );
}
