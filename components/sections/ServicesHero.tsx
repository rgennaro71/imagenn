// components/sections/ServicesHero.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ElegantShape } from "@/components/ui/shape-landing-hero";

const serviceNav = [
  { id: "ai-strategy", label: "AI Strategy" },
  { id: "decision-support", label: "Decision Support" },
  { id: "change-enablement", label: "Change Enablement" },
  { id: "workflow-automation", label: "Workflow Automation" },
  { id: "operational-transformation", label: "Operational Transformation" },
  { id: "knowledge-systems", label: "Knowledge Systems" },
  { id: "cx-automation", label: "CX Automation" },
  { id: "productivity", label: "Productivity Systems" },
];

export function ServicesHero() {
  return (
    <section
      className="relative pt-28 pb-20 overflow-hidden"
      style={{ background: "#090C17" }}
    >
      {/* Animated grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black 40%, transparent 100%)",
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute left-[-15%] top-[-20%] w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 65%)" }}
      />

      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <ElegantShape
          delay={0.4}
          width={480}
          height={110}
          rotate={-12}
          gradient="from-indigo-500/[0.09]"
          className="right-[-3%] top-[15%]"
        />
        <ElegantShape
          delay={0.6}
          width={220}
          height={55}
          rotate={20}
          gradient="from-violet-500/[0.07]"
          className="left-[4%] bottom-[22%]"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="w-6 h-px" style={{ background: "#6366f1" }} />
          <span className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: "rgba(255,255,255,0.3)" }}>
            Services
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.12, ease: "easeOut" }}
          className="font-serif font-bold tracking-tight leading-[1.05] mb-7 max-w-4xl"
          style={{ fontSize: "clamp(2.6rem, 5vw, 4rem)", color: "#F1F5F9" }}
        >
          Eight Ways We Help Organizations<br />
          <span style={{ color: "#818cf8" }}>Build AI Advantage.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.24, ease: "easeOut" }}
          className="text-xl leading-relaxed mb-12 max-w-2xl"
          style={{ color: "rgba(255,255,255,0.42)" }}
        >
          From strategy to execution, we design and implement AI systems
          that modern organizations actually use.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.36, ease: "easeOut" }}
          className="flex flex-wrap gap-4 mb-14"
        >
          <a
            href="/contact?intent=call"
            className="inline-flex items-center gap-2.5 h-12 px-8 rounded-lg font-semibold text-white text-sm transition-all duration-200"
            style={{ background: "#312E81", boxShadow: "0 2px 12px rgba(49,46,129,0.4)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#3730a3";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 20px rgba(49,46,129,0.5)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#312E81";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 2px 12px rgba(49,46,129,0.4)";
            }}
          >
            Book a Strategy Call
            <ArrowRight size={15} />
          </a>
          <a
            href="#ai-strategy"
            className="inline-flex items-center gap-2 h-12 px-8 rounded-lg font-semibold text-sm transition-all duration-200"
            style={{ color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.12)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.28)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.6)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.12)";
            }}
          >
            Explore Services
          </a>
        </motion.div>

        {/* Service quick-nav */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap gap-2"
        >
          {serviceNav.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-150"
              style={{
                color: "rgba(255,255,255,0.38)",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.8)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(99,102,241,0.3)";
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(99,102,241,0.07)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.38)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.07)";
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.04)";
              }}
            >
              {s.label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
