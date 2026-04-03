// components/sections/InsightsPreviewSection.tsx
"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { InsightCard } from "@/components/shared/InsightCard";
import { cn } from "@/lib/utils";

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
    <section className="section-padding bg-obsidian-secondary">
      <div className="content-width">
        <SectionHeader
          eyebrow="Insights"
          heading="Thinking That Moves Organizations Forward."
          subheading="Practical perspectives on AI adoption, operational transformation, and building organizations for the AI era."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {previewInsights.map((insight) => (
            <InsightCard key={insight.slug} {...insight} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/insights"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "border-white/10 text-slate-secondary hover:border-indigo/40 hover:text-slate-primary"
            )}
          >
            Explore All Insights →
          </Link>
        </div>
      </div>
    </section>
  );
}
