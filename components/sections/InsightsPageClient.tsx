"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { InsightFrontmatter } from "@/lib/mdx";
import { WaitlistSection } from "@/components/sections/WaitlistSection";

interface Props {
  insights: InsightFrontmatter[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const FILTERS = ["All", "Strategy", "Automation", "AI Readiness"];

const catStyle: Record<string, { bg: string; text: string; border: string }> = {
  "Strategy":     { bg: "rgba(99,102,241,0.07)",  text: "#4338CA", border: "rgba(99,102,241,0.18)" },
  "Automation":   { bg: "rgba(16,185,129,0.07)",  text: "#059669", border: "rgba(16,185,129,0.18)" },
  "AI Readiness": { bg: "rgba(245,158,11,0.07)",  text: "#d97706", border: "rgba(245,158,11,0.18)" },
};

const whatYoullFind = [
  { num: "01", label: "Practical AI insights", desc: "Frameworks and thinking that work in the real world — not conference-circuit hype." },
  { num: "02", label: "Operational transformation", desc: "How organizations actually restructure for speed, scale, and AI readiness." },
  { num: "03", label: "Real-world use cases", desc: "Where automation and AI have created measurable impact, and why." },
  { num: "04", label: "Leadership perspectives", desc: "What senior leaders need to understand to make AI work in their organization." },
  { num: "05", label: "Decision frameworks", desc: "Tools to prioritize, sequence, and evaluate AI and automation investments." },
];

const startHereData = [
  {
    slug: "moving-beyond-legacy-infrastructure-mindset",
    num: "01",
    title: "Moving Beyond Legacy Thinking",
    desc: "The most common mistake organizations make before they ever touch AI.",
    category: "Strategy",
  },
  {
    slug: "ai-readiness-for-mid-market-companies",
    num: "02",
    title: "AI Readiness for Mid-Market Companies",
    desc: "How to honestly assess where you stand — and close the gaps that matter most.",
    category: "AI Readiness",
  },
  {
    slug: "where-automation-creates-immediate-business-value",
    num: "03",
    title: "Where Automation Creates Immediate Value",
    desc: "The processes where AI-driven automation delivers ROI in weeks, not years.",
    category: "Automation",
  },
];

const whoFor = [
  "Founders and CEOs navigating the AI transition",
  "Operations leaders modernizing how work gets done",
  "Transformation teams building the case for change",
  "Mid-market organizations outgrowing their current infrastructure",
  "Companies dealing with legacy systems and technical debt",
  "Teams exploring AI but unsure where to start",
];

const executionSteps = [
  {
    step: "01",
    title: "Identify the right problem",
    desc: "Most AI initiatives fail before they start. We help organizations separate real opportunity from noise.",
  },
  {
    step: "02",
    title: "Build a clear framework",
    desc: "Strategy before technology. We map priorities to outcomes and create a sequenced plan.",
  },
  {
    step: "03",
    title: "Implement with precision",
    desc: "We don't hand off a deck. We work alongside teams to build, test, and operate what we design.",
  },
];

// ─── Animation ────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.07,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

// ─── Component ────────────────────────────────────────────────────────────────

export function InsightsPageClient({ insights }: Props) {
  const [activeFilter, setActiveFilter] = useState("All");

  const featured = insights.find((i) => i.featured);
  const filtered =
    activeFilter === "All"
      ? insights
      : insights.filter((i) => i.category === activeFilter);

  return (
    <>
      {/* ── 1. HERO ───────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-20 overflow-hidden" style={{ background: "#090C17" }}>
        {/* Subtle grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse 80% 60% at 10% 0%, black 20%, transparent 100%)",
          }}
        />
        <div
          className="absolute top-[-12%] right-[-6%] w-[520px] h-[520px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 65%)" }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="w-6 h-px" style={{ background: "#6366f1" }} />
              <span
                className="text-xs font-semibold uppercase tracking-[0.22em]"
                style={{ color: "rgba(255,255,255,0.28)" }}
              >
                Insights
              </span>
            </div>

            <h1
              className="font-serif font-bold tracking-tight leading-[1.05] mb-6"
              style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.7rem)", color: "#F1F5F9" }}
            >
              Thinking That Moves<br />Organizations Forward.
            </h1>

            <p
              className="text-lg leading-relaxed mb-3 max-w-2xl"
              style={{ color: "rgba(255,255,255,0.52)" }}
            >
              Practical perspectives on AI adoption, operational transformation, and building
              organizations that actually execute.
            </p>

            <p className="text-sm mb-10" style={{ color: "rgba(255,255,255,0.26)" }}>
              Built for leaders navigating real-world change — not theory.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#insights-grid"
                className="inline-flex items-center gap-2 h-11 px-7 rounded-lg font-semibold text-sm text-white transition-all duration-200"
                style={{ background: "#312E81", boxShadow: "0 2px 12px rgba(49,46,129,0.4)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "#3730a3";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "#312E81";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                }}
              >
                Explore Insights
                <ArrowRight size={14} />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 h-11 px-7 rounded-lg font-semibold text-sm transition-all duration-200"
                style={{ color: "rgba(255,255,255,0.52)", border: "1px solid rgba(255,255,255,0.11)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.28)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.52)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.11)";
                }}
              >
                Book a Strategy Call
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. WHAT YOU'LL FIND HERE ─────────────────────────────────────── */}
      <section style={{ background: "#F8F9FC" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-16 items-start">
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-[0.18em] mb-4"
                style={{ color: "#6366f1" }}
              >
                What You&apos;ll Find Here
              </p>
              <h2 className="font-serif text-2xl font-bold mb-4" style={{ color: "#0F172A" }}>
                Insight designed for decision-makers.
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "#64748B" }}>
                Not a news feed. Not a thought-of-the-week blog. Structured thinking on the
                decisions that matter most in AI-era organizations.
              </p>
            </div>

            <div
              className="flex flex-col"
              style={{ borderTop: "1px solid rgba(15,23,42,0.07)" }}
            >
              {whatYoullFind.map((item, i) => (
                <motion.div
                  key={item.num}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="flex gap-6 py-5"
                  style={{ borderBottom: "1px solid rgba(15,23,42,0.07)" }}
                >
                  <span
                    className="font-serif text-2xl font-bold shrink-0 leading-none mt-0.5"
                    style={{ color: "rgba(99,102,241,0.18)", width: "2.5rem" }}
                  >
                    {item.num}
                  </span>
                  <div>
                    <p className="font-semibold text-sm mb-1" style={{ color: "#0F172A" }}>
                      {item.label}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "#64748B" }}>
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. FEATURED ARTICLE ──────────────────────────────────────────── */}
      {featured && (
        <section style={{ background: "#0D1120" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <p
              className="text-xs font-semibold uppercase tracking-[0.22em] mb-10"
              style={{ color: "rgba(255,255,255,0.22)" }}
            >
              Featured
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              >
                <span
                  className="inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-8"
                  style={{
                    background: catStyle[featured.category]?.bg ?? "rgba(99,102,241,0.07)",
                    border: `1px solid ${catStyle[featured.category]?.border ?? "rgba(99,102,241,0.18)"}`,
                    color: catStyle[featured.category]?.text ?? "#4338CA",
                  }}
                >
                  {featured.category}
                </span>

                <h2
                  className="font-serif font-bold leading-[1.08] tracking-tight mb-6"
                  style={{ fontSize: "clamp(2rem, 3.2vw, 2.9rem)", color: "#F1F5F9" }}
                >
                  {featured.title}
                </h2>

                <p
                  className="text-lg leading-relaxed mb-8"
                  style={{ color: "rgba(255,255,255,0.48)", maxWidth: "38rem" }}
                >
                  {featured.description}
                </p>

                {/* Why this matters */}
                <div
                  className="p-5 rounded-xl mb-10"
                  style={{
                    background: "rgba(99,102,241,0.05)",
                    border: "1px solid rgba(99,102,241,0.12)",
                    maxWidth: "36rem",
                  }}
                >
                  <p
                    className="text-xs font-semibold uppercase tracking-wider mb-2"
                    style={{ color: "#818cf8" }}
                  >
                    Why this matters
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>
                    Most organizations are solving the wrong problem. This piece reframes the
                    conversation — from infrastructure to mindset — and gives leaders a clearer,
                    more honest starting point.
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <Link
                    href={`/insights/${featured.slug}`}
                    className="inline-flex items-center gap-2.5 h-11 px-7 rounded-lg text-sm font-semibold text-white transition-all duration-200"
                    style={{ background: "#312E81" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background = "#3730a3";
                      (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background = "#312E81";
                      (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                    }}
                  >
                    Read Full Article
                    <ArrowRight size={14} />
                  </Link>
                  <span
                    className="flex items-center gap-1.5 text-xs"
                    style={{ color: "rgba(255,255,255,0.25)" }}
                  >
                    <Clock size={12} />
                    {featured.readTime}
                  </span>
                </div>
              </motion.div>

              {/* Decorative element */}
              <div className="hidden lg:flex items-start justify-end pt-4">
                <div className="relative w-44 h-44">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        inset: `${i * 14}px`,
                        border: `1px solid rgba(99,102,241,${0.16 - i * 0.035})`,
                      }}
                    />
                  ))}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center"
                      style={{
                        background: "rgba(99,102,241,0.1)",
                        border: "1px solid rgba(99,102,241,0.2)",
                      }}
                    >
                      <span
                        className="font-serif font-bold text-xl"
                        style={{ color: "#818cf8" }}
                      >
                        F
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 4. FILTERS + ARTICLES GRID ───────────────────────────────────── */}
      <section id="insights-grid" style={{ background: "#F8F9FC" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header + filter bar */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-[0.18em] mb-2"
                style={{ color: "#6366f1" }}
              >
                All Insights
              </p>
              <h2 className="font-serif text-2xl font-bold" style={{ color: "#0F172A" }}>
                Browse by topic
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => {
                const isActive = f === activeFilter;
                return (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className="h-8 px-4 rounded-full text-xs font-semibold transition-all duration-200"
                    style={
                      isActive
                        ? { background: "#312E81", color: "#FFFFFF" }
                        : {
                            background: "#FFFFFF",
                            color: "#64748B",
                            border: "1px solid rgba(15,23,42,0.1)",
                          }
                    }
                  >
                    {f}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Card grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((insight, i) => {
                const cs = catStyle[insight.category] ?? catStyle["Strategy"];
                return (
                  <motion.div key={insight.slug} custom={i} initial="hidden" animate="show" variants={fadeUp}>
                    <Link
                      href={`/insights/${insight.slug}`}
                      className="group flex flex-col h-full p-6 rounded-xl transition-all duration-300"
                      style={{
                        background: "#FFFFFF",
                        border: "1px solid rgba(15,23,42,0.07)",
                        boxShadow: "0 1px 4px rgba(15,23,42,0.04)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                          "0 8px 32px rgba(15,23,42,0.08), 0 2px 8px rgba(99,102,241,0.06)";
                        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                        (e.currentTarget as HTMLAnchorElement).style.borderColor =
                          "rgba(99,102,241,0.16)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                          "0 1px 4px rgba(15,23,42,0.04)";
                        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                        (e.currentTarget as HTMLAnchorElement).style.borderColor =
                          "rgba(15,23,42,0.07)";
                      }}
                    >
                      <div className="flex items-center justify-between mb-5">
                        <span
                          className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
                          style={{
                            background: cs.bg,
                            border: `1px solid ${cs.border}`,
                            color: cs.text,
                          }}
                        >
                          {insight.category}
                        </span>
                        <span
                          className="flex items-center gap-1.5 text-xs"
                          style={{ color: "#94A3B8" }}
                        >
                          <Clock size={11} />
                          {insight.readTime}
                        </span>
                      </div>

                      <h3
                        className="font-serif text-base font-bold leading-snug mb-3 flex-1"
                        style={{ color: "#0F172A" }}
                      >
                        {insight.title}
                      </h3>

                      <p
                        className="text-sm leading-relaxed mb-5"
                        style={{ color: "#64748B" }}
                      >
                        {insight.description}
                      </p>

                      <span
                        className="inline-flex items-center gap-1.5 text-xs font-semibold group-hover:gap-2.5 transition-all duration-200"
                        style={{ color: cs.text }}
                      >
                        Read article <ArrowRight size={12} />
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-sm" style={{ color: "#94A3B8" }}>
                No articles in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── 5. START HERE ────────────────────────────────────────────────── */}
      <section style={{ background: "#F1F5F9" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 items-start">
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-[0.18em] mb-4"
                style={{ color: "#6366f1" }}
              >
                New here?
              </p>
              <h2 className="font-serif text-2xl font-bold mb-3" style={{ color: "#0F172A" }}>
                New to IMAGENN.AI?<br />Start Here.
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "#64748B" }}>
                Three articles that give you the full picture — where organizations get stuck,
                where AI creates value, and how to know if you&apos;re ready.
              </p>
            </div>

            <div style={{ borderTop: "1px solid rgba(15,23,42,0.08)" }}>
              {startHereData.map((item, i) => {
                const cs = catStyle[item.category] ?? catStyle["Strategy"];
                return (
                  <motion.div
                    key={item.slug}
                    custom={i}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={fadeUp}
                  >
                    <Link
                      href={`/insights/${item.slug}`}
                      className="group flex gap-6 py-6 transition-colors duration-200"
                      style={{ borderBottom: "1px solid rgba(15,23,42,0.08)" }}
                    >
                      <span
                        className="font-serif text-4xl font-bold shrink-0 leading-none mt-1"
                        style={{ color: "rgba(99,102,241,0.13)", width: "3rem" }}
                      >
                        {item.num}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2.5 mb-2">
                          <span
                            className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                            style={{
                              background: cs.bg,
                              border: `1px solid ${cs.border}`,
                              color: cs.text,
                            }}
                          >
                            {item.category}
                          </span>
                        </div>
                        <p
                          className="font-serif font-bold text-base mb-1 transition-colors duration-200 group-hover:text-indigo-700"
                          style={{ color: "#0F172A" }}
                        >
                          {item.title}
                        </p>
                        <p className="text-sm" style={{ color: "#64748B" }}>
                          {item.desc}
                        </p>
                      </div>
                      <div className="shrink-0 flex items-center">
                        <ArrowRight
                          size={16}
                          className="group-hover:translate-x-1 transition-transform duration-200"
                          style={{ color: "#C7D2FE" }}
                        />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. INLINE CTA ────────────────────────────────────────────────── */}
      <section style={{ background: "#1E1B4B" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div>
              <h3 className="font-serif text-2xl font-bold mb-2" style={{ color: "#EEF2FF" }}>
                Let&apos;s Apply This to Your Organization
              </h3>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.42)" }}>
                If these ideas resonate, the next step is mapping them to your business.
              </p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 inline-flex items-center gap-2 h-11 px-7 rounded-lg font-semibold text-sm transition-all duration-200"
              style={{ background: "#FFFFFF", color: "#312E81" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "#EEF2FF";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "#FFFFFF";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              }}
            >
              Book a Strategy Call
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 7. FROM INSIGHT TO EXECUTION ─────────────────────────────────── */}
      <section style={{ background: "#F8F9FC" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl mb-12">
            <p
              className="text-xs font-semibold uppercase tracking-[0.18em] mb-4"
              style={{ color: "#6366f1" }}
            >
              From Insight to Execution
            </p>
            <h2 className="font-serif text-2xl font-bold mb-4" style={{ color: "#0F172A" }}>
              These ideas don&apos;t stop on the page.
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "#64748B" }}>
              The thinking you find here connects directly to how we work with organizations.
              Every article reflects a challenge we&apos;ve helped real teams navigate — and a
              framework we&apos;ve put into practice.
            </p>
          </div>

          {/* 3-step grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-px mb-10"
            style={{
              background: "rgba(15,23,42,0.07)",
              borderRadius: "16px",
              overflow: "hidden",
            }}
          >
            {executionSteps.map((s, i) => (
              <motion.div
                key={s.step}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="p-8"
                style={{ background: "#FFFFFF" }}
              >
                <span
                  className="font-serif text-5xl font-bold block mb-5 leading-none"
                  style={{ color: "rgba(99,102,241,0.11)" }}
                >
                  {s.step}
                </span>
                <p className="font-semibold text-sm mb-2" style={{ color: "#0F172A" }}>
                  {s.title}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "#64748B" }}>
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 h-11 px-7 rounded-lg font-semibold text-sm text-white transition-all duration-200"
              style={{ background: "#312E81" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "#3730a3";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "#312E81";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              }}
            >
              Explore Services
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 h-11 px-7 rounded-lg font-semibold text-sm transition-all duration-200"
              style={{ color: "#312E81", border: "1px solid rgba(49,46,129,0.22)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(49,46,129,0.04)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
              }}
            >
              Book a Strategy Call
            </Link>
          </div>
        </div>
      </section>

      {/* ── 8. WHO THIS IS FOR ───────────────────────────────────────────── */}
      <section style={{ background: "#090C17" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 items-start">
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-[0.18em] mb-4"
                style={{ color: "rgba(255,255,255,0.28)" }}
              >
                Who This Is For
              </p>
              <h2 className="font-serif text-2xl font-bold" style={{ color: "#F1F5F9" }}>
                Built for Leaders Who Are Ready to Move
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
              {whoFor.map((item, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="flex items-start gap-3 py-4"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <span
                    className="w-1 h-1 rounded-full shrink-0 mt-2"
                    style={{ background: "#6366f1" }}
                  />
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. WAITLIST ──────────────────────────────────────────────────── */}
      <WaitlistSection />

      {/* ── 10. FINAL CTA ────────────────────────────────────────────────── */}
      <section style={{ background: "#1E1B4B" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-[0.22em] mb-6"
              style={{ color: "rgba(255,255,255,0.28)" }}
            >
              Ready to act?
            </p>
            <h2
              className="font-serif font-bold leading-[1.08] tracking-tight mb-4 mx-auto"
              style={{
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                color: "#EEF2FF",
                maxWidth: "36rem",
              }}
            >
              Ready to Move From Insight to Action?
            </h2>
            <p
              className="text-base mb-10 mx-auto"
              style={{ color: "rgba(255,255,255,0.42)", maxWidth: "28rem" }}
            >
              We&apos;ll help you identify where AI creates the most impact — and how to implement it.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 h-12 px-9 rounded-lg font-semibold text-sm transition-all duration-200"
              style={{ background: "#FFFFFF", color: "#312E81" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "#EEF2FF";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "#FFFFFF";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              }}
            >
              Book a Strategy Call
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
