// app/(main)/about/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, ChevronRight,
} from "lucide-react";
import { AboutHero } from "@/components/sections/AboutHero";

export const metadata: Metadata = {
  title: "About — IMAGENN.AI | AI Innovation & Operational Transformation",
  description:
    "IMAGENN.AI bridges the gap between AI potential and organizational reality — helping mid-market and scaling companies move from strategy to real, operational execution.",
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const beliefs = [
  "AI should create operational impact — not just ideas, experiments, or strategy documents",
  "Strategy without execution is noise. The organizations winning are those who build.",
  "Most organizations don't need more tools — they need better systems around the ones they have",
  "Adoption matters more than technology. If people don't use it, nothing changes.",
  "The future belongs to organizations that move faster, decide better, and operate smarter",
];

const principles = [
  {
    title: "Execution over presentations",
    desc: "We see things through to working systems — not slide decks handed off at the end of an engagement.",
  },
  {
    title: "Outcomes before scope",
    desc: "Every engagement starts with the business result we're trying to produce, then works backward to the right approach.",
  },
  {
    title: "Practical over theoretical",
    desc: "We build for what works today, inside how your organization actually operates — not idealized future states.",
  },
  {
    title: "People-centered change",
    desc: "Technology doesn't transform organizations. People do. Adoption and change management are core to everything we build.",
  },
  {
    title: "Foundations that scale",
    desc: "Every system we build is designed to grow with you — not become technical debt in 18 months.",
  },
];

const founderCredentials = [
  "AI innovation & automation",
  "Operational transformation",
  "Executive strategy + execution",
  "Future of work & intelligent systems",
];

const whoWeWorkWith = [
  { title: "Mid-market and scaling organizations", desc: "50–500 people. Complex enough to have real operational friction. Agile enough to actually change." },
  { title: "Operations-heavy businesses", desc: "High process volume, real cost to inefficiency, and the margin to fix it." },
  { title: "Leadership teams navigating change", desc: "Executives who need clarity on where to invest and confidence that implementation will follow." },
  { title: "Companies with fragmented systems", desc: "Data in five places, no single source of truth, manual reconciliation at every turn." },
  { title: "Organizations ready to move beyond manual", desc: "Teams that have outgrown the spreadsheets, email chains, and tribal knowledge that got them here." },
];

const differentiators = [
  { label: "Not generic consulting", desc: "No 200-slide strategy decks handed off with good luck. Everything maps to your operations." },
  { label: "Not AI hype", desc: "We focus where AI creates durable business value — not where it makes for good press releases." },
  { label: "Built for real operations", desc: "Solutions designed around how your organization works today, not an idealized future state." },
  { label: "Designed for adoption", desc: "Change enablement is built into every engagement. Tools people don't use don't create ROI." },
  { label: "Strategy + execution combined", desc: "We don't stop at the roadmap. We're with you through to working systems and measurable results." },
  { label: "Focused on measurable impact", desc: "Every engagement is scoped around a specific business outcome — not hours billed or deliverables shipped." },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>
      {/* 1. Hero */}
      <AboutHero />

      {/* 2. What We Believe */}
      <section style={{ background: "#F8F9FC" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-12 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-5" style={{ color: "#6366f1" }}>
                Our Philosophy
              </p>
              <h2 className="font-serif text-3xl font-bold leading-snug" style={{ color: "#0F172A" }}>
                What We Believe
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              {beliefs.map((belief, i) => (
                <div
                  key={i}
                  className="flex gap-5 py-5"
                  style={{
                    borderBottom: i < beliefs.length - 1 ? "1px solid rgba(15,23,42,0.07)" : "none",
                  }}
                >
                  <span
                    className="font-serif font-bold text-2xl shrink-0 select-none leading-none mt-1"
                    style={{ color: "rgba(99,102,241,0.15)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-base leading-relaxed" style={{ color: "#374151" }}>
                    {belief}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission + How We Work */}
      <section style={{ background: "#0D1120" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Mission */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-5" style={{ color: "rgba(255,255,255,0.3)" }}>
                Our Mission
              </p>
              <h2 className="font-serif text-2xl md:text-3xl font-bold leading-snug mb-6" style={{ color: "#F1F5F9" }}>
                Bridge the gap between AI potential and organizational reality.
              </h2>
              <div className="flex flex-col gap-5" style={{ color: "rgba(255,255,255,0.45)" }}>
                <p className="text-base leading-relaxed">
                  Most organizations know they need to modernize. Most AI engagements produce strategy
                  documents and pilot projects that never become operational reality.
                </p>
                <p className="text-base leading-relaxed">
                  We exist to close that gap — to take organizations from knowing what&apos;s possible
                  to actually building it. The organizations winning the next decade aren&apos;t those
                  with the best AI strategy. They&apos;re the ones who built AI into how they work.
                </p>
              </div>
            </div>

            {/* How We Work */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-6" style={{ color: "rgba(255,255,255,0.3)" }}>
                How We Work
              </p>
              <div className="flex flex-col gap-0">
                {principles.map((p, i) => (
                  <div
                    key={p.title}
                    className="flex gap-4 py-5"
                    style={{ borderBottom: i < principles.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}
                  >
                    <ChevronRight size={14} className="shrink-0 mt-[3px]" style={{ color: "#818cf8" }} />
                    <div>
                      <p className="text-sm font-semibold mb-1" style={{ color: "#E2E8F0" }}>{p.title}</p>
                      <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Founder */}
      <section style={{ background: "#F1F5F9" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-16 items-start">

            {/* Photo frame */}
            <div>
              {/* Portrait placeholder */}
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  aspectRatio: "3/4",
                  background: "linear-gradient(160deg, #F0F4FF 0%, #E8EEFF 100%)",
                  border: "1px solid rgba(99,102,241,0.12)",
                  maxWidth: "280px",
                }}
              >
                {/* Corner accents */}
                {["top-4 left-4 border-t border-l", "top-4 right-4 border-t border-r", "bottom-4 left-4 border-b border-l", "bottom-4 right-4 border-b border-r"].map((pos, i) => (
                  <div
                    key={i}
                    className={`absolute w-6 h-6 ${pos}`}
                    style={{ borderColor: "rgba(99,102,241,0.25)" }}
                  />
                ))}

                {/* Monogram center */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div className="relative w-28 h-28">
                    <svg viewBox="0 0 112 112" className="absolute inset-0 w-full h-full opacity-15">
                      <circle cx="56" cy="56" r="52" stroke="#4338CA" strokeWidth="1" fill="none" />
                      <circle cx="56" cy="56" r="38" stroke="#6366f1" strokeWidth="1" fill="none" strokeDasharray="4 6" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-serif font-bold text-5xl" style={{ color: "rgba(99,102,241,0.2)" }}>RG</span>
                    </div>
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-center" style={{ color: "rgba(67,56,202,0.3)" }}>
                    Photo coming soon
                  </p>
                </div>

                {/* Bottom label */}
                <div
                  className="absolute bottom-0 left-0 right-0 px-5 py-4"
                  style={{ background: "linear-gradient(to top, rgba(240,244,255,0.98), transparent)" }}
                >
                  <p className="text-sm font-bold" style={{ color: "#0F172A" }}>Roberto Gennaro</p>
                  <p className="text-xs" style={{ color: "#6366f1" }}>Founder &amp; CEO, IMAGENN.AI</p>
                </div>
              </div>

              {/* Credential tags */}
              <div className="mt-6 flex flex-wrap gap-2 max-w-[280px]">
                {founderCredentials.map((cred) => (
                  <span
                    key={cred}
                    className="text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{ background: "rgba(99,102,241,0.07)", color: "#4338CA", border: "1px solid rgba(99,102,241,0.12)" }}
                  >
                    {cred}
                  </span>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-5" style={{ color: "#6366f1" }}>
                The Founder
              </p>
              <h2 className="font-serif text-3xl font-bold mb-2" style={{ color: "#0F172A" }}>
                Roberto Gennaro
              </h2>
              <p className="text-base font-medium mb-8" style={{ color: "#64748B" }}>
                Founder &amp; CEO, IMAGENN.AI
              </p>

              <div className="flex flex-col gap-5 mb-8" style={{ color: "#475569" }}>
                <p className="text-base leading-relaxed">
                  Roberto is an AI innovation and digital transformation leader focused on how
                  organizations actually work — not how they&apos;re supposed to.
                </p>
                <p className="text-base leading-relaxed">
                  With deep experience at the intersection of strategy, operations, and implementation,
                  he helps leadership teams move beyond AI experimentation into real, scalable execution.
                </p>
              </div>

              <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "#94A3B8" }}>
                His work focuses on helping organizations
              </p>
              <ul className="flex flex-col gap-3 mb-10">
                {[
                  "Eliminate operational friction that slows growth",
                  "Improve decision-making with real-time intelligence",
                  "Modernize workflows with AI and automation",
                  "Build systems that scale — and that people actually use",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={14} className="shrink-0 mt-[3px]" style={{ color: "#6366f1" }} />
                    <span className="text-sm leading-relaxed" style={{ color: "#374151" }}>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-base leading-relaxed mb-10" style={{ color: "#475569" }}>
                He works with leaders who are ready to move — not just explore.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/speaking"
                  className="inline-flex items-center gap-2 h-11 px-6 rounded-lg font-semibold text-sm transition-colors duration-200 hover:bg-[#EEF2FF]"
                  style={{ background: "#F0F4FF", color: "#312E81", border: "1px solid rgba(99,102,241,0.15)" }}
                >
                  View Speaking Profile
                  <ArrowRight size={14} />
                </Link>
                <Link
                  href="/contact?intent=call"
                  className="inline-flex items-center gap-2 h-11 px-6 rounded-lg font-semibold text-sm text-white transition-colors duration-200 hover:bg-[#3730a3]"
                  style={{ background: "#312E81" }}
                >
                  Book a Strategy Call
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Who We Work With */}
      <section style={{ background: "#090C17" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-5" style={{ color: "rgba(255,255,255,0.3)" }}>
                Client Profile
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold leading-snug mb-6" style={{ color: "#F1F5F9" }}>
                Who We Work With
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>
                We work best with organizations that have moved past the question of whether AI matters —
                and are focused on how to make it work in their specific context.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {whoWeWorkWith.map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 p-5 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <CheckCircle2 size={15} className="shrink-0 mt-[2px]" style={{ color: "#6366f1" }} />
                  <div>
                    <p className="text-sm font-semibold mb-1" style={{ color: "#E2E8F0" }}>{item.title}</p>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Why IMAGENN.AI */}
      <section style={{ background: "#F1F5F9" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-end justify-between gap-8 mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-3" style={{ color: "#6366f1" }}>
                The Difference
              </p>
              <h2 className="font-serif text-3xl font-bold" style={{ color: "#0F172A" }}>
                Why IMAGENN.AI
              </h2>
            </div>
            <p className="text-sm leading-relaxed max-w-xs text-right hidden lg:block" style={{ color: "#64748B" }}>
              There are plenty of consultants and AI vendors. Very few who do both — and fewer still who stay through to results.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px"
            style={{ background: "rgba(15,23,42,0.08)", border: "1px solid rgba(15,23,42,0.08)", borderRadius: "16px", overflow: "hidden" }}
          >
            {differentiators.map((d) => (
              <div
                key={d.label}
                className="flex gap-4 p-7"
                style={{ background: "#FFFFFF" }}
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)" }}
                >
                  <CheckCircle2 size={11} style={{ color: "#6366f1" }} />
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-sm mb-1.5" style={{ color: "#0F172A" }}>
                    {d.label}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>
                    {d.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA */}
      <section style={{ background: "#1E1B4B" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-5" style={{ color: "rgba(255,255,255,0.35)" }}>
                Ready to Work Together?
              </p>
              <h2
                className="font-serif font-bold leading-tight mb-5"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: "#EEF2FF" }}
              >
                Let&apos;s build what your<br />organization needs to compete.
              </h2>
              <p className="text-base leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.52)" }}>
                Whether you&apos;re starting with strategy or ready to build, we&apos;ll meet you where you are and take you where you need to go.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 lg:justify-end">
              <Link
                href="/contact?intent=call"
                className="inline-flex items-center justify-center gap-2.5 h-12 px-8 rounded-lg font-semibold text-sm transition-colors duration-200 hover:bg-[#EEF2FF]"
                style={{ background: "#FFFFFF", color: "#312E81" }}
              >
                Book a Strategy Call
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg font-semibold text-sm transition-colors duration-200 hover:border-white/30 hover:text-white"
                style={{ color: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.15)" }}
              >
                View Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
