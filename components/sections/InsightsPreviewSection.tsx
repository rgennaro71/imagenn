// components/sections/InsightsPreviewSection.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { InsightCard } from "@/components/shared/InsightCard";

const previewInsights = [
  {
    category: "Strategy",
    title: "Moving Beyond Legacy Infrastructure Mindset",
    description: "Why the biggest obstacle to AI adoption isn't technology — and what leaders need to address first.",
    readTime: "5 min read",
    slug: "moving-beyond-legacy-infrastructure-mindset",
  },
  {
    category: "Automation",
    title: "Where Automation Creates Immediate Business Value",
    description: "The 5 operational areas where automation delivers the fastest, most measurable return.",
    readTime: "6 min read",
    slug: "where-automation-creates-immediate-business-value",
  },
  {
    category: "AI Readiness",
    title: "AI Readiness for Mid-Market Companies",
    description: "A practical framework for organizations ready to move from AI curiosity to AI capability.",
    readTime: "7 min read",
    slug: "ai-readiness-for-mid-market-companies",
  },
];

export function InsightsPreviewSection() {
  return (
    <section
      className="section-padding"
      style={{ background: "#F8F9FC" }}
    >
      <div className="content-width">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <p
              className="text-xs font-semibold uppercase tracking-[0.22em] mb-4 inline-flex items-center gap-2"
              style={{ color: "#64748B" }}
            >
              <span className="w-1 h-1 rounded-full inline-block" style={{ background: "#6366f1" }} />
              Insights
            </p>
            <h2
              className="font-serif text-4xl md:text-5xl font-bold leading-[1.08] tracking-tight"
              style={{ color: "#0F172A" }}
            >
              Thinking That Moves Organizations Forward.
            </h2>
          </div>
          <p className="text-base leading-relaxed max-w-sm md:text-right" style={{ color: "#64748B" }}>
            Practical perspectives on AI adoption, operational transformation, and building organizations for the AI era.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {previewInsights.map((insight, i) => (
            <motion.div
              key={insight.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
            >
              <InsightCard {...insight} theme="light" />
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 group"
            style={{ color: "#6366f1" }}
          >
            Explore All Insights
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
