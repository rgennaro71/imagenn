// components/sections/AboutHero.tsx
"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { ElegantShape } from "@/components/ui/shape-landing-hero";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const heroFade: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, delay: 0.15 + i * 0.14, ease: "easeOut" },
  }),
};

export function AboutHero() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#0D0B08" }}>

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 60% at 8% 55%, rgba(99,102,241,0.06) 0%, transparent 60%)" }} />

      {/* Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <ElegantShape delay={0.2} width={480} height={110} rotate={-8}
          gradient="from-amber-600/[0.08]" className="right-[-4%] top-[8%]" />
        <ElegantShape delay={0.4} width={260} height={64} rotate={16}
          gradient="from-indigo-500/[0.06]" className="right-[14%] top-[62%]" />
        <ElegantShape delay={0.6} width={140} height={38} rotate={-18}
          gradient="from-amber-400/[0.05]" className="left-[4%] bottom-[16%]" />
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(13,11,8,0.55) 0%, transparent 15%, transparent 85%, rgba(13,11,8,0.8) 100%)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ paddingTop: "clamp(5rem, 10vh, 7rem)", paddingBottom: "clamp(4rem, 8vh, 5.5rem)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 xl:gap-20 items-center">

          {/* LEFT — anchor */}
          <div>
            <motion.p custom={0} variants={heroFade} initial="hidden" animate="visible"
              style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(245,158,11,0.65)", marginBottom: "22px" }}>
              IMAGENN.AI
            </motion.p>

            <motion.h1 custom={1} variants={heroFade} initial="hidden" animate="visible"
              className="font-serif font-bold"
              style={{ fontSize: "clamp(2.8rem, 6vw, 5.2rem)", lineHeight: 0.97, color: "#FAF6EE", letterSpacing: "-0.02em", marginBottom: "26px" }}>
              We make AI real<br />for organizations<br />
              <span style={{ color: "#f59e0b" }}>ready to move.</span>
            </motion.h1>

            <motion.p custom={2} variants={heroFade} initial="hidden" animate="visible"
              style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)", lineHeight: 1.7, color: "rgba(250,246,238,0.5)", maxWidth: "38rem", marginBottom: "36px" }}>
              Not in theory. Not in pilots. In the actual operations, decisions, and workflows of organizations that compete — and win.
            </motion.p>

            <motion.div custom={3} variants={heroFade} initial="hidden" animate="visible"
              className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact?intent=call"
                className="inline-flex items-center gap-2 font-bold rounded-lg transition-all duration-200"
                style={{ height: "50px", padding: "0 26px", fontSize: "14px", background: "#f59e0b", color: "#0A0500", boxShadow: "0 4px 20px rgba(245,158,11,0.28)" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "#fbbf24"; el.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "#f59e0b"; el.style.transform = "translateY(0)"; }}
              >
                Book a Strategy Call <ArrowRight size={14} />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 font-medium transition-colors duration-200"
                style={{ fontSize: "13px", color: "rgba(250,246,238,0.38)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(250,246,238,0.7)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(250,246,238,0.38)"; }}
              >
                View Services <ChevronRight size={13} />
              </Link>
            </motion.div>
          </div>

          {/* RIGHT — editorial panel */}
          <motion.div custom={4} variants={heroFade} initial="hidden" animate="visible"
            className="hidden lg:block"
            style={{ padding: "28px 30px", borderRadius: "10px", background: "rgba(250,246,238,0.04)", border: "1px solid rgba(250,246,238,0.09)" }}>
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,158,11,0.5)", marginBottom: "18px" }}>
              What we do
            </p>
            <p style={{ fontSize: "13px", fontStyle: "italic", lineHeight: 1.65, color: "rgba(250,246,238,0.38)", marginBottom: "22px", paddingBottom: "22px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              Strategy without execution is noise.<br />We bridge the gap — from knowing what&apos;s possible to actually building it.
            </p>

            <div className="flex flex-col gap-3 mb-6">
              {[
                "AI systems built into real workflows",
                "Execution-focused — not slide decks",
                "Mid-market and scaling organizations",
                "Measurable outcomes, not hours billed",
              ].map((line, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(245,158,11,0.5)", flexShrink: 0, marginTop: "7px" }} />
                  <p style={{ fontSize: "12.5px", lineHeight: 1.55, color: "rgba(250,246,238,0.48)" }}>{line}</p>
                </div>
              ))}
            </div>

            <div style={{ paddingTop: "18px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(250,246,238,0.2)", marginBottom: "8px" }}>
                Built for
              </p>
              {["Operations-heavy businesses", "Leaders navigating AI adoption", "Companies ready to move beyond manual"].map((item, i) => (
                <div key={i} className="flex items-center gap-2 mb-1.5">
                  <ChevronRight size={10} style={{ color: "rgba(245,158,11,0.4)", flexShrink: 0 }} />
                  <p style={{ fontSize: "12px", color: "rgba(250,246,238,0.3)" }}>{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
