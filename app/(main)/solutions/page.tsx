"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle, Lightbulb, TrendingUp, ArrowRight, CheckCircle2,
  Clock, BarChart3, Users2, Zap, Target, Database,
  ChevronRight,
} from "lucide-react";
import { useCases, useCaseCategories } from "@/content/use-cases";
import { cn } from "@/lib/utils";

// ─── Impact tag map ────────────────────────────────────────────────────────

const impactTags: Record<string, { label: string; color: string; bg: string }> = {
  Operations: { label: "Saves Time", color: "#059669", bg: "rgba(5,150,105,0.08)" },
  Sales: { label: "Increases Revenue", color: "#6366f1", bg: "rgba(99,102,241,0.08)" },
  Marketing: { label: "Reduces Waste", color: "#d97706", bg: "rgba(217,119,6,0.08)" },
  "Customer Experience": { label: "Improves CX", color: "#0ea5e9", bg: "rgba(14,165,233,0.08)" },
  Leadership: { label: "Better Visibility", color: "#7c3aed", bg: "rgba(124,58,237,0.08)" },
  "Team Productivity": { label: "Reclaims Hours", color: "#059669", bg: "rgba(5,150,105,0.08)" },
  "Knowledge Management": { label: "Faster Access", color: "#6366f1", bg: "rgba(99,102,241,0.08)" },
};

// ─── Category icon map ─────────────────────────────────────────────────────

const categoryMeta: Record<string, { icon: React.ElementType; desc: string }> = {
  Operations: { icon: Zap, desc: "Workflows, reporting, approvals" },
  Sales: { icon: Target, desc: "Pipeline, proposals, qualification" },
  Marketing: { icon: BarChart3, desc: "Campaigns, content, segmentation" },
  "Customer Experience": { icon: Users2, desc: "Support, onboarding, resolution" },
  Leadership: { icon: BarChart3, desc: "Dashboards, reporting, decisions" },
  "Team Productivity": { icon: Clock, desc: "Knowledge, meetings, automation" },
  "Knowledge Management": { icon: Database, desc: "Documentation, onboarding, Q&A" },
};

// ─── Featured use cases (hardcoded, richer) ───────────────────────────────

const featuredUseCases = [
  {
    category: "Operations",
    title: "Automated Reporting Pipelines",
    problem: "Reporting takes hours of manual aggregation every week — pulling from spreadsheets, dashboards, and emails, then re-formatting everything by hand.",
    solution: "Automated pipelines pull data from every source on a schedule, format it to your standards, and deliver the finished report — without anyone touching it.",
    impact: "80% reduction in reporting time. Leaders get insight faster. The team that used to own reporting can focus on the work that reporting was delaying.",
    flow: ["Raw Data Sources", "Automated Pipeline", "Formatted Report", "Decision-Ready"],
    tag: "Saves 4–8 hrs/week",
  },
  {
    category: "Sales",
    title: "AI Lead Qualification",
    problem: "Sales reps are spending 40–60% of their time on leads that will never convert — manually reviewing inbound, chasing unqualified prospects, and missing the ones that matter.",
    solution: "AI scoring models evaluate every inbound lead against your ideal customer profile in real time, ranking and routing only the ones worth the rep's attention.",
    impact: "Reps focus exclusively on high-probability opportunities. Conversion rates rise. Pipeline moves 30–50% faster with the same headcount.",
    flow: ["Inbound Lead", "AI Scoring", "Qualified Routing", "Rep Engagement"],
    tag: "Higher conversion rate",
  },
  {
    category: "Team Productivity",
    title: "Internal AI Knowledge Copilot",
    problem: "Staff spend hours searching for answers scattered across docs, emails, wikis, and people — and still interrupt senior team members to get answers that already exist somewhere.",
    solution: "An internal AI copilot connects to your existing knowledge sources and answers questions in natural language — with citations, instantly, from any device.",
    impact: "Information retrieval drops from hours to seconds. New hires onboard faster. Senior staff reclaim hours previously spent answering internal questions.",
    flow: ["Staff Question", "AI Search", "Cited Answer", "Immediate Action"],
    tag: "Hours saved per person",
  },
];

// ─── Process steps ────────────────────────────────────────────────────────

const processSteps = [
  {
    number: "01",
    title: "Map to Your Workflows",
    description: "Every solution is adapted to how your organization actually operates — your systems, your processes, your terminology. Not a generic template.",
  },
  {
    number: "02",
    title: "Integrate, Don't Replace",
    description: "AI and automation layers connect to what you already have. We work with existing tools and data — minimizing disruption while maximizing impact.",
  },
  {
    number: "03",
    title: "Build for Adoption",
    description: "Solutions are designed for the people using them — intuitive, practical, and built to stick. Change management is part of the implementation, not an afterthought.",
  },
  {
    number: "04",
    title: "Measure and Improve",
    description: "Every implementation includes clear success metrics. We track what's working, surface what needs adjustment, and continuously improve.",
  },
];

const differentiators = [
  {
    title: "Built around your operations",
    description: "We don't start with the technology and figure out where it fits. We start with how your organization actually operates and build solutions that slot in.",
  },
  {
    title: "Real outcomes, not capabilities",
    description: "Every solution is defined by a specific business result — not a feature list. If it doesn't produce a measurable change, it's not in scope.",
  },
  {
    title: "Designed for adoption",
    description: "The best AI solution is one people actually use. Every build includes the change management, training, and UX work that drives real adoption.",
  },
  {
    title: "Cross-functional by design",
    description: "Problems don't stay inside department lines. Our solutions are built to connect across functions — so the whole organization moves, not just one team.",
  },
];

const outcomes = [
  { icon: Clock, label: "Faster decisions", desc: "Leaders act on current data, not last week's report." },
  { icon: Zap, label: "Less operational friction", desc: "Repetitive work disappears. Teams move faster on what matters." },
  { icon: BarChart3, label: "Better data visibility", desc: "One view of what's happening — across every function, in real time." },
  { icon: Users2, label: "Higher team productivity", desc: "Hours reclaimed per week when busywork is automated away." },
  { icon: Target, label: "Scalable processes", desc: "Systems that grow with your organization, not ones you outgrow." },
  { icon: CheckCircle2, label: "Consistent execution", desc: "Outcomes that don't depend on who's in the office that day." },
];

// ─── Upgraded use-case card ───────────────────────────────────────────────

function UseCaseCardUpgraded({ problem, solution, impact, category }: {
  problem: string; solution: string; impact: string; category: string;
}) {
  const tag = impactTags[category] ?? impactTags["Operations"];

  return (
    <div
      className="group flex flex-col gap-0 rounded-2xl overflow-hidden transition-all duration-200 cursor-default"
      style={{
        background: "#FFFFFF",
        border: "1px solid rgba(15,23,42,0.07)",
        boxShadow: "0 1px 3px rgba(15,23,42,0.05), 0 6px 20px rgba(15,23,42,0.04)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 12px rgba(15,23,42,0.08), 0 20px 40px rgba(99,102,241,0.06)";
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(99,102,241,0.15)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 3px rgba(15,23,42,0.05), 0 6px 20px rgba(15,23,42,0.04)";
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(15,23,42,0.07)";
      }}
    >
      {/* Problem */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-start gap-3">
          <AlertCircle size={14} className="shrink-0 mt-0.5" style={{ color: "#ef4444" }} />
          <p className="text-sm leading-relaxed" style={{ color: "#374151" }}>{problem}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-6" style={{ height: "1px", background: "rgba(15,23,42,0.06)" }} />

      {/* Solution */}
      <div className="px-6 py-4">
        <div className="flex items-start gap-3">
          <Lightbulb size={14} className="shrink-0 mt-0.5" style={{ color: "#6366f1" }} />
          <p className="text-sm leading-relaxed" style={{ color: "#374151" }}>{solution}</p>
        </div>
      </div>

      {/* Impact footer */}
      <div
        className="px-6 py-4 mt-auto flex items-start gap-3"
        style={{ background: "rgba(15,23,42,0.02)", borderTop: "1px solid rgba(15,23,42,0.05)" }}
      >
        <TrendingUp size={14} className="shrink-0 mt-0.5" style={{ color: "#059669" }} />
        <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>{impact}</p>
      </div>

      {/* Tag strip */}
      <div
        className="px-6 py-2.5 flex items-center justify-between"
        style={{ background: tag.bg, borderTop: `1px solid ${tag.color}18` }}
      >
        <span className="text-xs font-semibold" style={{ color: tag.color }}>
          {tag.label}
        </span>
        <ChevronRight size={12} style={{ color: tag.color, opacity: 0.5 }} />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────

export default function SolutionsPage() {
  const [activeCategory, setActiveCategory] = useState(useCaseCategories[0]);

  return (
    <>
      {/* ── 1. HERO ── */}
      <section
        className="relative pt-32 pb-24 overflow-hidden"
        style={{ background: "#090C17" }}
      >
        {/* Ambient */}
        <div
          className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(5,150,105,0.04) 0%, transparent 70%)" }}
        />

        {/* Node-graph hint — subtle workflow visual */}
        <div className="absolute right-0 top-0 h-full w-[45%] hidden lg:block pointer-events-none overflow-hidden" aria-hidden="true">
          <svg
            className="absolute right-8 top-1/2 -translate-y-1/2 w-[440px] h-[360px] opacity-[0.07]"
            viewBox="0 0 440 360"
            fill="none"
          >
            {/* Nodes */}
            {[
              [60, 80], [200, 40], [340, 100], [380, 220], [200, 180],
              [60, 240], [280, 300], [140, 320],
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={i === 4 ? 10 : 6} fill="#6366f1" />
            ))}
            {/* Edges */}
            {[
              [60, 80, 200, 40], [200, 40, 340, 100], [340, 100, 380, 220],
              [380, 220, 200, 180], [200, 180, 60, 240], [60, 240, 140, 320],
              [140, 320, 280, 300], [200, 180, 200, 40], [60, 80, 200, 180],
              [280, 300, 380, 220],
            ].map(([x1, y1, x2, y2], i) => (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#6366f1" strokeWidth="1" />
            ))}
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="w-6 h-px" style={{ background: "#6366f1" }} />
              <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.3)" }}>
                AI &amp; Automation Solutions
              </span>
            </div>

            <h1
              className="font-serif font-bold leading-[1.06] tracking-tight mb-7 max-w-3xl"
              style={{ fontSize: "clamp(2.8rem, 5vw, 4.2rem)", color: "#F1F5F9" }}
            >
              Real Problems.<br />
              <span style={{ color: "#818cf8" }}>Practical AI Solutions.</span>
            </h1>

            <p
              className="text-xl leading-relaxed mb-12 max-w-2xl"
              style={{ color: "rgba(255,255,255,0.42)" }}
            >
              AI and automation solutions designed around how your organization actually operates —
              21 proven use cases organized by function, built for real execution.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="/contact?intent=call"
                className="inline-flex items-center gap-2.5 h-12 px-8 rounded-lg font-semibold text-white text-sm transition-all duration-200"
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
                Book a Strategy Call
                <ArrowRight size={15} />
              </a>
              <a
                href="#use-cases"
                className="inline-flex items-center gap-2 h-12 px-8 rounded-lg font-semibold text-sm transition-all duration-200"
                style={{ color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.12)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.25)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.6)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.12)";
                }}
              >
                Explore Use Cases
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. HOW TO NAVIGATE ── */}
      <section style={{ background: "#F8F9FC" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-12 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: "#6366f1" }}>
                How to Use This Page
              </p>
              <h2 className="font-serif text-2xl font-bold leading-snug mb-4" style={{ color: "#0F172A" }}>
                Find the Use Cases That Apply to You
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>
                Solutions are organized by the function they serve. Browse by department or role to find the use cases most relevant to your organization — then reach out to discuss how to map them to your specific context.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {useCaseCategories.map((cat) => {
                const meta = categoryMeta[cat];
                const Icon = meta?.icon ?? Zap;
                return (
                  <a
                    key={cat}
                    href="#use-cases"
                    onClick={() => setActiveCategory(cat)}
                    className="group flex flex-col gap-2 p-4 rounded-xl transition-all duration-150"
                    style={{
                      background: "#FFFFFF",
                      border: "1px solid rgba(15,23,42,0.07)",
                      boxShadow: "0 1px 3px rgba(15,23,42,0.04)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(99,102,241,0.2)";
                      (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 12px rgba(99,102,241,0.07)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(15,23,42,0.07)";
                      (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 1px 3px rgba(15,23,42,0.04)";
                    }}
                  >
                    <Icon size={16} style={{ color: "#6366f1" }} />
                    <p className="text-sm font-semibold leading-tight" style={{ color: "#0F172A" }}>{cat}</p>
                    <p className="text-xs leading-tight" style={{ color: "#94A3B8" }}>{meta?.desc}</p>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. FILTER + CARDS ── */}
      <section id="use-cases" style={{ background: "#0D1120" }}>
        {/* Sticky filter bar */}
        <div
          className="sticky top-[72px] z-20 border-b"
          style={{
            background: "rgba(13,17,32,0.97)",
            backdropFilter: "blur(12px)",
            borderColor: "rgba(255,255,255,0.05)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap gap-2">
              {useCaseCategories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="h-9 px-4 rounded-lg text-sm font-medium transition-all duration-150"
                    style={isActive ? {
                      background: "#312E81",
                      color: "#FFFFFF",
                      boxShadow: "0 2px 8px rgba(49,46,129,0.35)",
                    } : {
                      background: "rgba(255,255,255,0.04)",
                      color: "rgba(255,255,255,0.45)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.8)";
                        (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.07)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.45)";
                        (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)";
                      }
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Cards grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-baseline gap-4 mb-10">
            <h2 className="font-serif text-2xl font-bold" style={{ color: "#F1F5F9" }}>
              {activeCategory}
            </h2>
            <span className="text-sm" style={{ color: "rgba(255,255,255,0.28)" }}>
              {useCases[activeCategory]?.length} use cases
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {useCases[activeCategory]?.map((uc) => (
                <UseCaseCardUpgraded key={uc.problem} {...uc} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── 4. FEATURED USE CASES ── */}
      <section style={{ background: "#F1F5F9" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-end mb-14">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: "#6366f1" }}>
                High-Impact Use Cases
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold leading-snug" style={{ color: "#0F172A" }}>
                Three Situations Where<br />AI Creates Outsized Results
              </h2>
            </div>
            <p className="text-base leading-relaxed" style={{ color: "#475569" }}>
              These are the use cases where the gap between current state and optimized state is largest — where the payoff for getting AI right is immediate and measurable.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {featuredUseCases.map((fc, i) => (
              <motion.div
                key={fc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                className="rounded-2xl overflow-hidden"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid rgba(15,23,42,0.07)",
                  boxShadow: "0 1px 4px rgba(15,23,42,0.05), 0 12px 32px rgba(15,23,42,0.04)",
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-0">
                  {/* Left: content */}
                  <div className="p-8 md:p-10">
                    <div className="flex items-center gap-3 mb-6">
                      <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-md"
                        style={{
                          background: (impactTags[fc.category] ?? impactTags["Operations"]).bg,
                          color: (impactTags[fc.category] ?? impactTags["Operations"]).color,
                        }}
                      >
                        {fc.category}
                      </span>
                      <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-md"
                        style={{ background: "rgba(5,150,105,0.08)", color: "#059669" }}
                      >
                        {fc.tag}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-bold mb-6" style={{ color: "#0F172A" }}>
                      {fc.title}
                    </h3>

                    <div className="flex flex-col gap-5">
                      <div className="flex gap-4">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                          style={{ background: "rgba(239,68,68,0.1)" }}
                        >
                          <AlertCircle size={12} style={{ color: "#ef4444" }} />
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: "#ef4444" }}>The Problem</p>
                          <p className="text-sm leading-relaxed" style={{ color: "#374151" }}>{fc.problem}</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                          style={{ background: "rgba(99,102,241,0.1)" }}
                        >
                          <Lightbulb size={12} style={{ color: "#6366f1" }} />
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: "#6366f1" }}>The Solution</p>
                          <p className="text-sm leading-relaxed" style={{ color: "#374151" }}>{fc.solution}</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                          style={{ background: "rgba(5,150,105,0.1)" }}
                        >
                          <TrendingUp size={12} style={{ color: "#059669" }} />
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: "#059669" }}>The Outcome</p>
                          <p className="text-sm leading-relaxed" style={{ color: "#374151" }}>{fc.impact}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: mini flow */}
                  <div
                    className="p-8 flex flex-col justify-center gap-3 lg:border-l"
                    style={{ borderColor: "rgba(15,23,42,0.06)", background: "#FAFBFE" }}
                  >
                    <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#94A3B8" }}>
                      How it flows
                    </p>
                    {fc.flow.map((step, si) => (
                      <div key={step} className="flex flex-col gap-1">
                        <div
                          className="flex items-center gap-3 px-4 py-3 rounded-xl"
                          style={{
                            background: si === 0 ? "rgba(239,68,68,0.05)" : si === fc.flow.length - 1 ? "rgba(5,150,105,0.07)" : "rgba(99,102,241,0.05)",
                            border: `1px solid ${si === 0 ? "rgba(239,68,68,0.12)" : si === fc.flow.length - 1 ? "rgba(5,150,105,0.15)" : "rgba(99,102,241,0.1)"}`,
                          }}
                        >
                          <span
                            className="w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0"
                            style={{
                              background: si === 0 ? "#ef4444" : si === fc.flow.length - 1 ? "#059669" : "#6366f1",
                              color: "#fff",
                            }}
                          >
                            {si + 1}
                          </span>
                          <span className="text-xs font-semibold" style={{ color: "#374151" }}>{step}</span>
                        </div>
                        {si < fc.flow.length - 1 && (
                          <div className="flex justify-center">
                            <ChevronRight size={12} style={{ color: "#CBD5E1", transform: "rotate(90deg)" }} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. WHO THIS IS FOR ── */}
      <section style={{ background: "#090C17" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-5" style={{ color: "rgba(255,255,255,0.3)" }}>
                Is This Right for You?
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold leading-snug mb-6" style={{ color: "#F1F5F9" }}>
                Built for Organizations<br />Like Yours
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>
                These solutions are built for organizations navigating real operational complexity —
                not companies who just want to say they are using AI, but ones who want to solve actual
                problems and build a foundation that scales.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { title: "Mid-market companies (50–500 people)", desc: "Complex enough to have real operational friction. Agile enough to actually change." },
                { title: "Scaling teams with manual processes", desc: "The team has grown but the systems haven't kept up. Automation is overdue." },
                { title: "Operations-heavy businesses", desc: "High process volume, lots of coordination, real cost to inefficiency." },
                { title: "Organizations with disconnected systems", desc: "Data in five places, no single source of truth, manual reconciliation constantly." },
                { title: "Teams buried in reporting and admin", desc: "Smart people spending too much time on work that should be automated." },
                { title: "Leadership teams needing better visibility", desc: "Decisions being made on last week's data — or no data at all." },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 p-5 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <CheckCircle2 size={16} className="shrink-0 mt-0.5" style={{ color: "#6366f1" }} />
                  <div>
                    <p className="text-sm font-semibold mb-1" style={{ color: "#E2E8F0" }}>{item.title}</p>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. FROM PROBLEM TO EXECUTION ── */}
      <section style={{ background: "#F8F9FC" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: "#6366f1" }}>
              How We Work
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold max-w-xl" style={{ color: "#0F172A" }}>
              From Problem to Execution
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
            {processSteps.map((step, i) => (
              <div
                key={step.number}
                className="relative flex flex-col p-8"
                style={{
                  borderRight: i < processSteps.length - 1 ? "1px solid rgba(15,23,42,0.08)" : "none",
                }}
              >
                {/* Connector line on mobile */}
                {i < processSteps.length - 1 && (
                  <div
                    className="hidden md:block lg:hidden absolute bottom-0 left-1/2 w-px h-8"
                    style={{ background: "rgba(15,23,42,0.08)" }}
                  />
                )}
                <span
                  className="font-serif text-5xl font-bold mb-6 select-none"
                  style={{ color: "rgba(99,102,241,0.12)" }}
                >
                  {step.number}
                </span>
                <h3 className="font-sans font-semibold text-base mb-3" style={{ color: "#0F172A" }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. WHY WE'RE DIFFERENT ── */}
      <section style={{ background: "#0D1120" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-16 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-5" style={{ color: "rgba(255,255,255,0.3)" }}>
                The Difference
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold leading-snug mb-6" style={{ color: "#F1F5F9" }}>
                Why IMAGENN.AI Solutions Are Different
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>
                There&apos;s no shortage of AI tools and automation vendors. The difference is whether it gets
                used, whether it fits your operation, and whether it produces a real outcome.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {differentiators.map((d) => (
                <div
                  key={d.title}
                  className="p-6 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div
                    className="w-1 h-8 rounded-full mb-5"
                    style={{ background: "linear-gradient(to bottom, #6366f1, transparent)" }}
                  />
                  <h3 className="font-sans font-semibold text-sm mb-2" style={{ color: "#F1F5F9" }}>
                    {d.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>
                    {d.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. WHAT THIS UNLOCKS ── */}
      <section style={{ background: "#F1F5F9" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: "#6366f1" }}>
              Business Outcomes
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold" style={{ color: "#0F172A" }}>
              What This Unlocks
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
            {outcomes.map((o, i) => {
              const Icon = o.icon;
              const col = i % 3;
              const row = Math.floor(i / 3);
              const isLastRow = row === Math.floor((outcomes.length - 1) / 3);
              return (
                <div
                  key={o.label}
                  className="flex gap-5 p-8"
                  style={{
                    borderRight: col < 2 ? "1px solid rgba(15,23,42,0.07)" : "none",
                    borderBottom: !isLastRow ? "1px solid rgba(15,23,42,0.07)" : "none",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(99,102,241,0.08)" }}
                  >
                    <Icon size={18} style={{ color: "#6366f1" }} />
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-base mb-1.5" style={{ color: "#0F172A" }}>
                      {o.label}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>
                      {o.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 9. CASE STUDY PLACEHOLDER ── */}
      <section style={{ background: "#090C17" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>
              Results in Practice
            </p>
            <h2 className="font-serif text-3xl font-bold" style={{ color: "#F1F5F9" }}>
              Before &amp; After
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                category: "Operations",
                situation: "A mid-market services company with weekly reporting taking 6–8 hours of senior staff time.",
                before: "Manual pull from 4 systems, manual formatting, sent every Monday morning.",
                after: "Automated pipeline delivers formatted report to leadership by 7am Friday. Zero manual effort.",
                result: "8 hours/week reclaimed. Faster executive decisions.",
              },
              {
                category: "Sales",
                situation: "A B2B company with a high volume of inbound leads and a 3-person sales team.",
                before: "All leads reviewed manually. Reps spending 50% of time on unqualified prospects.",
                after: "AI qualification scores and routes leads. Reps only see high-fit opportunities.",
                result: "Conversion rate up. Pipeline velocity improved.",
              },
              {
                category: "Team Productivity",
                situation: "A growing company with knowledge spread across 3 platforms, emails, and people.",
                before: "New hires take 6+ weeks to become productive. Senior staff interrupt constantly.",
                after: "AI copilot answers questions instantly from all connected knowledge sources.",
                result: "Onboarding time cut. Senior staff interruptions reduced significantly.",
              },
            ].map((cs, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden"
                style={{ background: "#0D1120", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="px-6 pt-6 pb-4">
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-md"
                    style={{
                      background: (impactTags[cs.category] ?? impactTags["Operations"]).bg,
                      color: (impactTags[cs.category] ?? impactTags["Operations"]).color,
                    }}
                  >
                    {cs.category}
                  </span>
                  <p className="text-xs leading-relaxed mt-4" style={{ color: "rgba(255,255,255,0.35)" }}>
                    {cs.situation}
                  </p>
                </div>

                <div className="px-6 pb-4">
                  <div className="flex flex-col gap-3">
                    <div className="p-4 rounded-lg" style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.1)" }}>
                      <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "rgba(239,68,68,0.7)" }}>Before</p>
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{cs.before}</p>
                    </div>
                    <div className="p-4 rounded-lg" style={{ background: "rgba(5,150,105,0.05)", border: "1px solid rgba(5,150,105,0.12)" }}>
                      <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "rgba(5,150,105,0.8)" }}>After</p>
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{cs.after}</p>
                    </div>
                  </div>
                </div>

                <div
                  className="px-6 py-4"
                  style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <p className="text-xs font-semibold" style={{ color: "#818cf8" }}>{cs.result}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-center mt-8" style={{ color: "rgba(255,255,255,0.2)" }}>
            Illustrative examples. Specific results available upon request during strategy session.
          </p>
        </div>
      </section>

      {/* ── 10. CTA ── */}
      <section style={{ background: "#1E1B4B" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-5" style={{ color: "rgba(255,255,255,0.35)" }}>
                See Your Use Case Here?
              </p>
              <h2
                className="font-serif font-bold leading-tight mb-5"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: "#EEF2FF" }}
              >
                Let&apos;s Build It for<br />Your Organization.
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.52)" }}>
                Every use case is a proven starting point. The real work is mapping it to how your
                organization actually operates — that&apos;s what we do.
              </p>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.32)" }}>
                We&apos;ll map the right solutions to your business — no pressure, just clarity.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 lg:justify-end">
              <a
                href="/contact?intent=call"
                className="inline-flex items-center justify-center gap-2.5 h-12 px-8 rounded-lg font-semibold text-sm transition-all duration-200"
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
                <ArrowRight size={15} />
              </a>
              <a
                href="/services"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg font-semibold text-sm transition-all duration-200"
                style={{ color: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.15)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.65)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.15)";
                }}
              >
                View All Services
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
