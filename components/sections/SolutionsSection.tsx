// components/sections/SolutionsSection.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { UseCaseCard } from "@/components/shared/UseCaseCard";
import { useCases, useCaseCategories } from "@/content/use-cases";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SolutionsSection() {
  const [activeCategory, setActiveCategory] = useState(useCaseCategories[0]);

  return (
    <section className="section-padding bg-obsidian">
      <div className="content-width">
        <SectionHeader
          eyebrow="Solutions"
          heading="Real Problems. Practical AI Solutions."
          subheading="Concrete automation and AI applications organized by where your organization needs them most."
          align="center"
        />

        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {useCaseCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                activeCategory === cat
                  ? "bg-indigo text-white"
                  : "text-slate-muted hover:text-slate-secondary subtle-border bg-obsidian-surface hover:bg-obsidian-elevated"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {useCases[activeCategory].map((uc) => (
            <UseCaseCard key={uc.problem} {...uc} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/solutions"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "border-white/10 text-slate-secondary hover:border-indigo/40 hover:text-slate-primary"
            )}
          >
            See All Use Cases →
          </Link>
        </div>
      </div>
    </section>
  );
}
