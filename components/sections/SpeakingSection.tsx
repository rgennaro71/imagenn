// components/sections/SpeakingSection.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mic, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const expertiseTags = [
  "AI Innovation", "Digital Transformation", "Future of Work",
  "Operational Intelligence", "AI Adoption & Change", "Business Modernization",
];

const topics = [
  "How Organizations Can Move Beyond Legacy Thinking",
  "Practical AI: What Works, What Doesn't, and What's Next",
  "The Automation Imperative for Mid-Market Companies",
  "Building an AI-Ready Organization",
  "AI and the Future of Operations",
];

export function SpeakingSection() {
  return (
    <section
      className="section-padding section-divider-top"
      style={{ background: "#06070f" }}
    >
      <div className="content-width">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
              style={{
                background: "linear-gradient(135deg, rgba(245,158,11,0.2), rgba(245,158,11,0.06))",
                border: "1px solid rgba(245,158,11,0.2)",
              }}
            >
              <Mic size={22} className="text-amber-400" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-muted mb-4">
              Speaking & Panels
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-primary leading-[1.1] tracking-tight mb-6">
              Bring AI Innovation to Your Stage.
            </h2>
            <p className="text-lg text-slate-secondary leading-[1.75] mb-8">
              {siteConfig.founder.firstName} is a sought-after voice on AI innovation,
              digital transformation, and the future of how organizations work — bringing
              practical insight to panels, keynotes, and executive briefings.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {expertiseTags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-3 py-1.5 rounded-full text-slate-secondary transition-colors duration-200 hover:text-slate-primary"
                  style={{
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.03)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <Link
              href="/speaking"
              className={cn(
                buttonVariants(),
                "text-white font-semibold inline-flex items-center gap-2 group"
              )}
              style={{
                background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                boxShadow: "0 0 24px rgba(99,102,241,0.4)",
              }}
            >
              Invite {siteConfig.founder.firstName} to Speak
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>

          {/* Right — topics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-muted mb-5">Topics</p>
            <ul className="flex flex-col gap-3">
              {topics.map((topic, i) => (
                <motion.li
                  key={topic}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-start gap-4 p-4 rounded-xl transition-all duration-200 group cursor-default"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLLIElement).style.background = "rgba(99,102,241,0.05)";
                    (e.currentTarget as HTMLLIElement).style.borderColor = "rgba(99,102,241,0.18)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLLIElement).style.background = "rgba(255,255,255,0.025)";
                    (e.currentTarget as HTMLLIElement).style.borderColor = "rgba(255,255,255,0.06)";
                  }}
                >
                  <span
                    className="text-xs font-bold shrink-0 mt-0.5 tabular-nums"
                    style={{
                      background: "linear-gradient(90deg, #818cf8, #22d3ee)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-slate-secondary group-hover:text-slate-primary transition-colors duration-200">{topic}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
