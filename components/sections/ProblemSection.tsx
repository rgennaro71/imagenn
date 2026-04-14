// components/sections/ProblemSection.tsx
"use client";

import { motion } from "framer-motion";
import { AlertCircle, Layers, Hand, Clock, Lightbulb, GitMerge } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";

const problems = [
  {
    icon: Layers,
    title: "Legacy Infrastructure Mindset",
    description: "Outdated systems and thinking patterns holding back modern execution.",
    accent: "#ef4444",
    bg: "rgba(239,68,68,0.06)",
    border: "rgba(239,68,68,0.12)",
  },
  {
    icon: GitMerge,
    title: "Disconnected Tools & Data",
    description: "Teams working in silos, decisions made without the full picture.",
    accent: "#f97316",
    bg: "rgba(249,115,22,0.06)",
    border: "rgba(249,115,22,0.12)",
  },
  {
    icon: Hand,
    title: "Manual Everything",
    description: "High-value people spending their time on low-value, repetitive work.",
    accent: "#8b5cf6",
    bg: "rgba(139,92,246,0.06)",
    border: "rgba(139,92,246,0.12)",
  },
  {
    icon: Clock,
    title: "Slow Decision-Making",
    description: "Missing the window to act because insight arrives too late.",
    accent: "#0ea5e9",
    bg: "rgba(14,165,233,0.06)",
    border: "rgba(14,165,233,0.12)",
  },
  {
    icon: Lightbulb,
    title: "Innovation Paralysis",
    description: "Knowing AI matters but having no clear path to start with confidence.",
    accent: "#f59e0b",
    bg: "rgba(245,158,11,0.06)",
    border: "rgba(245,158,11,0.12)",
  },
  {
    icon: AlertCircle,
    title: "Operational Friction",
    description: "Bottlenecks that compound — slowing every team, every quarter.",
    accent: "#10b981",
    bg: "rgba(16,185,129,0.06)",
    border: "rgba(16,185,129,0.12)",
  },
];

export function ProblemSection() {
  return (
    <section
      className="section-padding relative"
      style={{
        background: "#F8F9FC",
        boxShadow: "inset 0 1px 0 rgba(15,23,42,0.06)",
      }}
    >
      <div className="content-width">
        <SectionHeader
          eyebrow="The Challenge"
          heading="Your Organization Deserves Better Than This."
          subheading="Most organizations are running on systems, processes, and mindsets built for a world that no longer exists."
          align="center"
          theme="light"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.map(({ icon: Icon, title, description, accent, bg, border }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="group p-6 rounded-2xl transition-all duration-300 cursor-default"
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(15,23,42,0.07)",
                boxShadow: "0 1px 4px rgba(15,23,42,0.06), 0 6px 20px rgba(15,23,42,0.04)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(15,23,42,0.08), 0 16px 40px rgba(15,23,42,0.06)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLDivElement).style.borderColor = border;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 4px rgba(15,23,42,0.06), 0 6px 20px rgba(15,23,42,0.04)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(15,23,42,0.07)";
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                style={{ background: bg, border: `1px solid ${border}` }}
              >
                <Icon size={18} style={{ color: accent }} />
              </div>
              <h3 className="font-sans font-semibold text-base mb-2" style={{ color: "#0F172A" }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#64748B" }}>{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
