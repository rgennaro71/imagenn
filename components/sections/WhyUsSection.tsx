// components/sections/WhyUsSection.tsx
"use client";

import { motion } from "framer-motion";
import { Target, Rocket, Wrench, Building2, Palette, TrendingUp } from "lucide-react";

const differentiators = [
  {
    icon: Target,
    title: "Business-First, Not Tech Theater",
    description: "Every engagement starts with business outcomes, not technology. If AI doesn't move the needle, we don't build it.",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.16)",
  },
  {
    icon: Rocket,
    title: "Execution-Focused",
    description: "We bridge strategy and implementation. You don't get a deck — you get results.",
    color: "#10b981",
    bg: "rgba(16,185,129,0.08)",
    border: "rgba(16,185,129,0.16)",
  },
  {
    icon: Wrench,
    title: "Practical AI, Not Hype",
    description: "We deploy AI that works in your organization today, not theoretical solutions for a hypothetical future.",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.08)",
    border: "rgba(139,92,246,0.16)",
  },
  {
    icon: Building2,
    title: "Operational Depth",
    description: "We understand how organizations actually run — the processes, the friction, the people. That's where transformation happens.",
    color: "#f97316",
    bg: "rgba(249,115,22,0.08)",
    border: "rgba(249,115,22,0.16)",
  },
  {
    icon: Palette,
    title: "Modern UX + Process Thinking",
    description: "We build AI tools your teams actually want to use. Adoption is part of the design.",
    color: "#e11d48",
    bg: "rgba(225,29,72,0.07)",
    border: "rgba(225,29,72,0.14)",
  },
  {
    icon: TrendingUp,
    title: "Scalable from Day One",
    description: "Everything we build is designed to grow with your organization, not become tomorrow's legacy problem.",
    color: "#0ea5e9",
    bg: "rgba(14,165,233,0.08)",
    border: "rgba(14,165,233,0.16)",
  },
];

export function WhyUsSection() {
  return (
    <section
      className="section-padding"
      style={{ background: "#F1F5F9" }}
    >
      <div className="content-width">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — sticky heading */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:sticky lg:top-32"
          >
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em] mb-5 inline-flex items-center gap-2"
              style={{ color: "#64748B" }}
            >
              <span
                className="w-1 h-1 rounded-full inline-block"
                style={{ background: "#6366f1" }}
              />
              Why IMAGENN.AI
            </p>
            <h2
              className="font-serif text-4xl md:text-5xl font-bold leading-[1.08] tracking-tight mb-6"
              style={{ color: "#0F172A" }}
            >
              We Build for Real Impact.{" "}
              <span style={{ color: "#6366f1" }}>Not for the Demo.</span>
            </h2>
            <p className="text-lg leading-[1.75] mb-8" style={{ color: "#475569" }}>
              Most AI engagements end at strategy. We start there and go all the way to
              implementation, adoption, and scale — because that's where organizations actually change.
            </p>

            {/* Accent rule */}
            <div
              className="h-px w-20"
              style={{ background: "linear-gradient(90deg, #6366f1, transparent)" }}
            />
          </motion.div>

          {/* Right — differentiator grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {differentiators.map(({ icon: Icon, title, description, color, bg, border }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group p-5 rounded-2xl transition-all duration-300 cursor-default"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid rgba(15,23,42,0.07)",
                  boxShadow: "0 1px 4px rgba(15,23,42,0.05), 0 4px 16px rgba(15,23,42,0.04)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(15,23,42,0.08), 0 12px 32px rgba(15,23,42,0.06)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = border;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 4px rgba(15,23,42,0.05), 0 4px 16px rgba(15,23,42,0.04)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(15,23,42,0.07)";
                }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110"
                  style={{ background: bg, border: `1px solid ${border}` }}
                >
                  <Icon size={17} style={{ color }} />
                </div>
                <h3 className="font-sans font-semibold text-sm mb-2 leading-snug" style={{ color: "#0F172A" }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#64748B" }}>{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
