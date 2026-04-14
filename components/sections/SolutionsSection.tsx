// components/sections/SolutionsSection.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { UseCaseCard } from "@/components/shared/UseCaseCard";
import { useCases, useCaseCategories } from "@/content/use-cases";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SolutionsSection() {
  const [activeCategory, setActiveCategory] = useState(useCaseCategories[0]);

  return (
    <section
      className="section-padding"
      style={{ background: "#F8F9FC" }}
    >
      <div className="content-width">
        <SectionHeader
          eyebrow="Solutions"
          heading="Real Problems. Practical AI Solutions."
          subheading="Concrete automation and AI applications organized by where your organization needs them most."
          align="center"
          theme="light"
        />

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {useCaseCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={
                activeCategory === cat
                  ? {
                      background: "#6366f1",
                      color: "#fff",
                      boxShadow: "0 2px 8px rgba(99,102,241,0.3)",
                      border: "1px solid transparent",
                    }
                  : {
                      background: "#FFFFFF",
                      border: "1px solid rgba(15,23,42,0.1)",
                      color: "#64748B",
                    }
              }
              onMouseEnter={(e) => {
                if (activeCategory !== cat) {
                  (e.currentTarget as HTMLButtonElement).style.color = "#334155";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(99,102,241,0.3)";
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== cat) {
                  (e.currentTarget as HTMLButtonElement).style.color = "#64748B";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(15,23,42,0.1)";
                }
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
          >
            {useCases[activeCategory].map((uc) => (
              <UseCaseCard key={uc.problem} {...uc} theme="light" />
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="text-center">
          <Link
            href="/solutions"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "font-medium transition-all duration-200"
            )}
            style={{
              border: "1px solid rgba(99,102,241,0.25)",
              color: "#6366f1",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(99,102,241,0.05)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(99,102,241,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(99,102,241,0.25)";
            }}
          >
            See All Use Cases &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
