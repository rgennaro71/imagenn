"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import Link from "next/link";
import { ElegantShape } from "@/components/ui/shape-landing-hero";

// ─── Schemas ──────────────────────────────────────────────────────────────────

const fullSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  email: z.string().email("Enter a valid work email"),
  company: z.string().optional(),
  role: z.string().optional(),
});

const quickSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  email: z.string().email("Enter a valid email"),
});

type FullFormData = z.infer<typeof fullSchema>;
type QuickFormData = z.infer<typeof quickSchema>;

// ─── Content ──────────────────────────────────────────────────────────────────

const whyNow = [
  {
    num: "01",
    statement: "AI is shifting from tools to systems.",
    detail: "The next wave isn't individual AI features bolted onto existing software. It's AI as the operational layer that runs how organizations actually work.",
  },
  {
    num: "02",
    statement: "Most companies are experimenting, not executing.",
    detail: "Pilots stall. Proof-of-concepts don't ship. The gap between organizations that experiment and organizations that implement is widening every quarter.",
  },
  {
    num: "03",
    statement: "Early adopters will define the standard.",
    detail: "The organizations that build AI-powered operations now won't just adapt to the future — they'll set the bar that everyone else has to catch up to.",
  },
];

const building = [
  { num: "01", label: "AI-Powered Operational Systems", desc: "End-to-end systems that replace fragmented workflows with intelligent, connected operations." },
  { num: "02", label: "Workflow Intelligence Layers", desc: "A framework that understands how your organization works — and identifies exactly where AI creates value." },
  { num: "03", label: "Decision Support Infrastructure", desc: "Real-time visibility and structured insight so senior leaders make faster, better-informed decisions." },
  { num: "04", label: "Automation Frameworks", desc: "Purpose-built automation for the processes that cost the most time and carry the most risk." },
  { num: "05", label: "Internal Copilots for Teams", desc: "AI-native tools for the people doing the work — not just leadership reporting on it." },
];

const founderAccess = [
  { label: "Priority access", desc: "You're in before the public launch. No waitlist shuffle, no lottery." },
  { label: "Founder-tier pricing", desc: "Locked in at launch rates. This pricing will not be available after general release." },
  { label: "Early feature access", desc: "Test new capabilities before they're released and share direct feedback." },
  { label: "Roadmap input", desc: "Your challenges influence what gets built next. We build for early members first." },
  { label: "Pre-release access", desc: "Every new capability reaches you before it goes public." },
  { label: "Closer collaboration", desc: "Direct access to the IMAGENN.AI team during onboarding and beyond." },
];

const whoFor = [
  "Forward-thinking leadership teams",
  "Mid-market and scaling organizations",
  "Operations-heavy businesses",
  "Teams overwhelmed by manual processes",
  "Companies exploring AI but unsure how to implement it",
  "Organizations that want a structural edge",
];

const outcomes = [
  "Automate core workflows without disrupting teams",
  "Reduce manual overhead across departments",
  "Improve decision speed and quality",
  "Create operational visibility that doesn't exist today",
  "Scale output without adding headcount",
  "Build systems that get smarter over time",
];

const urgencyPoints = [
  { label: "Early access closes", desc: "When we hit capacity — no specific date, but it will close." },
  { label: "Pricing changes at launch", desc: "Founder pricing will not be offered after launch. The window is now." },
  { label: "First cohort shapes the product", desc: "Later users inherit what early members build." },
  { label: "Structural advantage", desc: "Organizations that get in early will have systems months ahead of competitors." },
];

const nextSteps = [
  { num: "01", label: "Confirmation", desc: "You'll receive a confirmation at your email address." },
  { num: "02", label: "Early access updates", desc: "We'll keep you informed as we build — what's coming, when to expect it." },
  { num: "03", label: "Invitation to test", desc: "When features are ready for early members, you'll be among the first invited." },
];

// ─── Animation ────────────────────────────────────────────────────────────────

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease },
  }),
};

const heroFadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: 0.3 + i * 0.18,
      ease: "easeOut",
    },
  }),
};

// ─── Shared input style ───────────────────────────────────────────────────────

function DarkInput(props: React.InputHTMLAttributes<HTMLInputElement> & { hasError?: boolean }) {
  const { hasError, ...rest } = props;
  return (
    <input
      {...rest}
      style={{
        width: "100%",
        height: "48px",
        padding: "0 16px",
        borderRadius: "8px",
        fontSize: "14px",
        background: "rgba(255,255,255,0.05)",
        border: `1px solid ${hasError ? "rgba(239,68,68,0.55)" : "rgba(255,255,255,0.1)"}`,
        color: "#F1F5F9",
        outline: "none",
        transition: "border-color 0.15s, background 0.15s",
        ...rest.style,
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = "rgba(245,158,11,0.5)";
        e.currentTarget.style.background = "rgba(255,255,255,0.07)";
        rest.onFocus?.(e);
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = hasError ? "rgba(239,68,68,0.55)" : "rgba(255,255,255,0.1)";
        e.currentTarget.style.background = "rgba(255,255,255,0.05)";
        rest.onBlur?.(e);
      }}
    />
  );
}

const lbl = { fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, marginBottom: "6px", display: "block", color: "rgba(241,245,249,0.35)" };

// ─── Component ────────────────────────────────────────────────────────────────

export function WaitlistPageClient() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const [quickSubmitted, setQuickSubmitted] = useState(false);
  const [quickLoading, setQuickLoading] = useState(false);
  const [quickError, setQuickError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<FullFormData>({ resolver: zodResolver(fullSchema) });
  const { register: rq, handleSubmit: hq, formState: { errors: eq } } = useForm<QuickFormData>({ resolver: zodResolver(quickSchema) });

  const submit = async (data: FullFormData | QuickFormData) => {
    const res = await fetch("/api/waitlist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    if (!res.ok) throw new Error();
  };

  const onFull = async (data: FullFormData) => {
    setLoading(true); setServerError(null);
    try { await submit(data); setSubmitted(true); setQuickSubmitted(true); }
    catch { setServerError("Something went wrong. Please try again."); }
    finally { setLoading(false); }
  };

  const onQuick = async (data: QuickFormData) => {
    setQuickLoading(true); setQuickError(null);
    try { await submit(data); setQuickSubmitted(true); setSubmitted(true); }
    catch { setQuickError("Something went wrong. Please try again."); }
    finally { setQuickLoading(false); }
  };

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════════
          1. HERO — 2-column: copy left, form right
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ background: "#09090E", minHeight: "92vh" }}>
        {/* Ambient background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.06] via-transparent to-orange-500/[0.04] blur-3xl pointer-events-none" />

        {/* Floating geometric shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <ElegantShape
            delay={0.2}
            width={520}
            height={130}
            rotate={-12}
            gradient="from-amber-500/[0.14]"
            className="right-[-6%] md:right-[-2%] top-[8%] md:top-[12%]"
          />
          <ElegantShape
            delay={0.4}
            width={380}
            height={95}
            rotate={15}
            gradient="from-orange-400/[0.1]"
            className="left-[-5%] md:left-[-1%] bottom-[15%] md:bottom-[20%]"
          />
          <ElegantShape
            delay={0.5}
            width={220}
            height={58}
            rotate={-20}
            gradient="from-amber-300/[0.1]"
            className="left-[28%] md:left-[34%] top-[5%] md:top-[8%]"
          />
          <ElegantShape
            delay={0.6}
            width={160}
            height={44}
            rotate={25}
            gradient="from-yellow-400/[0.09]"
            className="right-[12%] md:right-[16%] bottom-[8%] md:bottom-[12%]"
          />
        </div>

        {/* Dot-matrix texture — right-side only */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{
          backgroundImage: "radial-gradient(rgba(245,158,11,0.1) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 50% 80% at 100% 50%, black 0%, transparent 65%)",
        }} />

        {/* Top-bottom vignette */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{
          background: "linear-gradient(to bottom, rgba(9,9,14,0.65) 0%, transparent 20%, transparent 80%, rgba(9,9,14,0.85) 100%)",
        }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          style={{ minHeight: "92vh", display: "flex", alignItems: "center", paddingTop: "4rem", paddingBottom: "3.5rem" }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-12 xl:gap-16 w-full items-center">

            {/* ── Left: copy ── */}
            <div>
              {/* Badge */}
              <motion.div
                custom={0} variants={heroFadeUp} initial="hidden" animate="visible"
                className="mb-8">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.3)" }}>
                  <Sparkles size={11} style={{ color: "#f59e0b" }} />
                  <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#f59e0b" }}>
                    Limited Cohort · Early Access Now Open
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse ml-0.5" style={{ background: "#f59e0b" }} />
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                custom={1} variants={heroFadeUp} initial="hidden" animate="visible"
                className="font-serif font-bold tracking-tight mb-6"
                style={{ fontSize: "clamp(3.6rem, 7vw, 5.8rem)", lineHeight: 1.0, color: "#F1F5F9" }}>
                Stop Waiting.<br />
                <span style={{ color: "#f59e0b" }}>Start Leading.</span>
              </motion.h1>

              {/* Subhead */}
              <motion.p
                custom={2} variants={heroFadeUp} initial="hidden" animate="visible"
                style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(241,245,249,0.5)", maxWidth: "34rem", marginBottom: "14px" }}>
                IMAGENN.AI is building a new generation of AI-powered systems for organizations
                ready to lead — not follow — the automation era.
              </motion.p>

              {/* Urgency hook */}
              <motion.p
                custom={3} variants={heroFadeUp} initial="hidden" animate="visible"
                style={{ fontSize: "14px", fontWeight: 600, color: "rgba(245,158,11,0.75)", marginBottom: "36px" }}>
                Join early. Shape what gets built. Lock in founder-tier pricing — before it closes.
              </motion.p>

              {/* Secondary CTA */}
              <motion.div
                custom={4} variants={heroFadeUp} initial="hidden" animate="visible"
                className="flex flex-wrap items-center gap-5 mb-10">
                <a href="#waitlist-form"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-150"
                  style={{ color: "rgba(241,245,249,0.5)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(241,245,249,0.85)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(241,245,249,0.5)"; }}>
                  See what we&apos;re building <ArrowRight size={13} />
                </a>
                <span style={{ color: "rgba(255,255,255,0.12)" }}>|</span>
                <span style={{ fontSize: "13px", color: "rgba(241,245,249,0.28)" }}>
                  No spam. No commitment.
                </span>
              </motion.div>

              {/* Trust strip */}
              <motion.div
                custom={5} variants={heroFadeUp} initial="hidden" animate="visible"
                className="flex flex-wrap gap-8 pt-8"
                style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                {[
                  { label: "Priority Access", sub: "Before public launch" },
                  { label: "Founder Pricing", sub: "Locked in forever" },
                  { label: "Roadmap Input", sub: "You shape what ships" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-2.5">
                    <CheckCircle2 size={14} className="shrink-0 mt-0.5" style={{ color: "#f59e0b" }} />
                    <div>
                      <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#f59e0b" }}>{item.label}</p>
                      <p style={{ fontSize: "12px", color: "rgba(241,245,249,0.35)", marginTop: "2px" }}>{item.sub}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ── Right: form card ── */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.55, ease: [0.23, 0.86, 0.39, 0.96] }}>
              {submitted ? (
                <div className="p-10 rounded-2xl text-center"
                  style={{ background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.2)" }}>
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.25)" }}>
                    <CheckCircle2 size={26} style={{ color: "#f59e0b" }} />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-2" style={{ color: "#F1F5F9" }}>You&apos;re on the list.</h3>
                  <p style={{ fontSize: "14px", color: "rgba(241,245,249,0.45)", lineHeight: 1.6 }}>
                    We&apos;ll be in touch before launch. Welcome to the first cohort.
                  </p>
                </div>
              ) : (
                <div className="rounded-2xl overflow-hidden"
                  style={{ background: "rgba(18,14,8,0.95)", border: "1px solid rgba(245,158,11,0.22)", boxShadow: "0 0 80px rgba(245,158,11,0.07), 0 32px 64px rgba(0,0,0,0.5)" }}>
                  {/* Card header */}
                  <div className="px-8 pt-8 pb-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#f59e0b", marginBottom: "6px" }}>
                      Founder Access
                    </p>
                    <p className="font-serif font-bold" style={{ fontSize: "22px", color: "#F1F5F9" }}>
                      Reserve your spot
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit(onFull)} className="px-8 pt-6 pb-8 flex flex-col gap-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label style={lbl}>First Name *</label>
                        <DarkInput {...register("firstName")} placeholder="Your name" hasError={!!errors.firstName} />
                        {errors.firstName && <p style={{ fontSize: "11px", color: "#f87171", marginTop: "4px" }}>{errors.firstName.message}</p>}
                      </div>
                      <div>
                        <label style={lbl}>Work Email *</label>
                        <DarkInput {...register("email")} type="email" placeholder="you@company.com" hasError={!!errors.email} />
                        {errors.email && <p style={{ fontSize: "11px", color: "#f87171", marginTop: "4px" }}>{errors.email.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label style={lbl}>Company <span style={{ color: "rgba(241,245,249,0.2)", textTransform: "none", letterSpacing: 0, fontWeight: 400 }}>optional</span></label>
                        <DarkInput {...register("company")} placeholder="Organization" />
                      </div>
                      <div>
                        <label style={lbl}>Role <span style={{ color: "rgba(241,245,249,0.2)", textTransform: "none", letterSpacing: 0, fontWeight: 400 }}>optional</span></label>
                        <DarkInput {...register("role")} placeholder="CEO, COO, VP…" />
                      </div>
                    </div>

                    {serverError && <p style={{ fontSize: "12px", color: "#f87171" }}>{serverError}</p>}

                    <button type="submit" disabled={loading}
                      className="w-full flex items-center justify-center gap-2 font-bold rounded-xl transition-all duration-200 disabled:opacity-50"
                      style={{ height: "56px", fontSize: "15px", background: "#f59e0b", color: "#0a0500", boxShadow: "0 4px 24px rgba(245,158,11,0.35)", marginTop: "2px" }}
                      onMouseEnter={(e) => { if (!loading) { (e.currentTarget as HTMLButtonElement).style.background = "#fbbf24"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 32px rgba(245,158,11,0.5)"; } }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#f59e0b"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 24px rgba(245,158,11,0.35)"; }}>
                      {loading ? "Joining…" : <><span>Get Early Access</span><ArrowRight size={15} /></>}
                    </button>

                    <p style={{ fontSize: "11px", textAlign: "center", color: "rgba(241,245,249,0.22)" }}>
                      No spam. Early access only. Unsubscribe any time.
                    </p>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ 2. WHY RIGHT NOW — cream, 3-col strategic insight cards ═══ */}
      <section style={{ background: "#FAF7F0" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="mb-14">
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#d97706", marginBottom: "12px" }}>
              Why This Matters
            </p>
            <h2 className="font-serif font-bold" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", lineHeight: 1.1, color: "#0F172A", maxWidth: "32rem" }}>
              The window is open.<br />It won&apos;t stay that way.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyNow.map((item, i) => (
              <motion.div key={item.num} custom={i} initial="hidden" whileInView="show"
                viewport={{ once: true, margin: "-30px" }} variants={fadeUp}
                style={{
                  padding: "28px 26px 32px",
                  borderRadius: "8px",
                  background: "#FFFFFF",
                  border: "1px solid rgba(15,23,42,0.07)",
                  boxShadow: "0 1px 10px rgba(15,23,42,0.04)",
                  borderTop: `3px solid ${i === 0 ? "#d97706" : "rgba(217,119,6,0.2)"}`,
                }}>
                <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(217,119,6,0.4)", display: "block", marginBottom: "16px" }}>
                  {item.num}
                </span>
                <p className="font-serif font-bold mb-3" style={{ fontSize: "clamp(1rem, 1.4vw, 1.15rem)", color: "#0F172A", lineHeight: 1.3 }}>
                  {item.statement}
                </p>
                <p style={{ fontSize: "13px", lineHeight: 1.75, color: "#64748B" }}>
                  {item.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          3. WHAT WE'RE BUILDING — dark, centered intro + 2-col feature grid
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="what-were-building" style={{ background: "#0E1018" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          {/* Centered intro */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="max-w-2xl mx-auto text-center mb-16">
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,158,11,0.6)", marginBottom: "14px" }}>
              What We&apos;re Building
            </p>
            <h2 className="font-serif font-bold mb-4"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", lineHeight: 1.1, color: "#F1F5F9" }}>
              An operational layer for modern organizations.
            </h2>
            <p style={{ fontSize: "15px", lineHeight: 1.7, color: "rgba(241,245,249,0.38)" }}>
              Not another tool. An infrastructure layer that changes how your organization runs.
            </p>
          </motion.div>

          {/* 2-col feature grid — asymmetric: first item spans full width */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {building.map((item, i) => (
              <motion.div key={item.num} custom={i} initial="hidden" whileInView="show"
                viewport={{ once: true, margin: "-40px" }} variants={fadeUp}
                className={i === 0 ? "lg:col-span-2" : ""}
                style={{
                  padding: i === 0 ? "28px 32px" : "24px 28px",
                  borderRadius: "12px",
                  background: i === 0 ? "rgba(245,158,11,0.05)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${i === 0 ? "rgba(245,158,11,0.14)" : "rgba(255,255,255,0.06)"}`,
                  display: i === 0 ? "grid" : "block",
                  gridTemplateColumns: i === 0 ? "1fr 1fr" : undefined,
                  gap: i === 0 ? "24px" : undefined,
                  alignItems: i === 0 ? "center" : undefined,
                }}>
                <div>
                  <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em", color: i === 0 ? "rgba(245,158,11,0.7)" : "rgba(245,158,11,0.35)", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>
                    {item.num}
                  </span>
                  <p style={{ fontSize: i === 0 ? "clamp(1.1rem, 1.8vw, 1.3rem)" : "15px", fontWeight: 700, color: "#F1F5F9", lineHeight: 1.3 }}>
                    {item.label}
                  </p>
                </div>
                <p style={{ fontSize: "13px", lineHeight: 1.7, color: "rgba(241,245,249,0.42)", marginTop: i === 0 ? 0 : "8px" }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 4. FOUNDER ACCESS — white, 2×3 scannable card grid ═══ */}
      <section style={{ background: "#FFFFFF" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#d97706", marginBottom: "12px" }}>
                For Early Members
              </p>
              <h2 className="font-serif font-bold" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", lineHeight: 1.1, color: "#0F172A" }}>
                Founder Access includes everything.
              </h2>
            </div>
            <a href="#"
              className="shrink-0 inline-flex items-center gap-2 font-bold text-sm rounded-lg transition-all duration-200"
              style={{ height: "42px", padding: "0 22px", background: "#d97706", color: "#fff", boxShadow: "0 2px 12px rgba(217,119,6,0.25)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#b45309"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#d97706"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; }}>
              Get Early Access <ArrowRight size={13} />
            </a>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {founderAccess.map((item, i) => (
              <motion.div key={item.label} custom={i} initial="hidden" whileInView="show"
                viewport={{ once: true, margin: "-30px" }} variants={fadeUp}
                style={{
                  padding: "24px 26px",
                  borderRadius: "8px",
                  background: "#FAFAF8",
                  border: "1px solid rgba(15,23,42,0.08)",
                  boxShadow: "0 1px 6px rgba(15,23,42,0.04)",
                }}>
                <CheckCircle2 size={14} style={{ color: "#d97706", marginBottom: "12px" }} />
                <p style={{ fontSize: "14px", fontWeight: 700, color: "#0F172A", marginBottom: "5px", lineHeight: 1.3 }}>{item.label}</p>
                <p style={{ fontSize: "13px", lineHeight: 1.65, color: "#64748B" }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MID-PAGE CTA — amber dark strip with network cross-link ═══ */}
      <section style={{ background: "#0c0800" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="font-serif font-bold mb-1" style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", color: "#FAF3E0", lineHeight: 1.3 }}>
                Ready for early access?
              </p>
              <p style={{ fontSize: "13px", color: "rgba(250,243,224,0.4)" }}>
                Join the waitlist now and lock in founder-tier pricing before launch.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
              <a href="#"
                className="inline-flex items-center gap-2 font-bold text-sm rounded-lg transition-all duration-200"
                style={{ height: "44px", padding: "0 24px", background: "#f59e0b", color: "#0a0500", boxShadow: "0 2px 16px rgba(245,158,11,0.3)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#fbbf24"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#f59e0b"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; }}>
                Join the Waitlist <ArrowRight size={13} />
              </a>
              <Link href="/network"
                className="text-sm font-medium transition-colors duration-200"
                style={{ color: "rgba(250,243,224,0.35)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(250,243,224,0.7)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(250,243,224,0.35)"; }}>
                Looking to go deeper? Founders &amp; Operators Network →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          5. WHO IT'S FOR + OUTCOMES — dark, tag cloud + outcome pairs
      ═══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: "#09090E" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

            {/* Who it's for — pill/tag cloud */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,158,11,0.55)", marginBottom: "14px" }}>
                Who This Is For
              </p>
              <h2 className="font-serif font-bold mb-8"
                style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", lineHeight: 1.15, color: "#F1F5F9" }}>
                Built for organizations ready to lead.
              </h2>
              <div className="flex flex-wrap gap-2.5">
                {whoFor.map((item, i) => (
                  <motion.span key={i} custom={i} initial="hidden" whileInView="show"
                    viewport={{ once: true }} variants={fadeUp}
                    style={{
                      display: "inline-block",
                      padding: "8px 16px",
                      borderRadius: "100px",
                      fontSize: "13px",
                      fontWeight: 500,
                      background: i % 3 === 0 ? "rgba(245,158,11,0.1)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${i % 3 === 0 ? "rgba(245,158,11,0.22)" : "rgba(255,255,255,0.08)"}`,
                      color: i % 3 === 0 ? "rgba(251,191,36,0.9)" : "rgba(241,245,249,0.55)",
                    }}>
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Outcomes — clean numbered pairs */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={1}>
              <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,158,11,0.55)", marginBottom: "14px" }}>
                What This Unlocks
              </p>
              <h2 className="font-serif font-bold mb-8"
                style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", lineHeight: 1.15, color: "#F1F5F9" }}>
                Outcomes, not features.
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {outcomes.map((item, i) => (
                  <motion.div key={i} custom={i} initial="hidden" whileInView="show"
                    viewport={{ once: true }} variants={fadeUp}
                    className="flex items-start gap-4">
                    <span className="font-serif font-bold shrink-0"
                      style={{ fontSize: "11px", letterSpacing: "0.1em", color: "rgba(245,158,11,0.35)", paddingTop: "3px", width: "1.8rem" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p style={{ fontSize: "14px", lineHeight: 1.55, color: "rgba(241,245,249,0.65)" }}>{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════════════
          8. WHAT HAPPENS NEXT — light, timeline with connectors
      ═══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: "#FAF7F0" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="mb-16">
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#d97706", marginBottom: "14px" }}>
              What Happens Next
            </p>
            <h2 className="font-serif font-bold"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", lineHeight: 1.1, color: "#0F172A" }}>
              Three steps. That&apos;s it.
            </h2>
          </motion.div>

          {/* Timeline — horizontal connector */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 relative">
            {/* Connector line — desktop only */}
            <div className="hidden lg:block absolute top-8 left-[16.67%] right-[16.67%] h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(217,119,6,0.3) 20%, rgba(217,119,6,0.3) 80%, transparent)" }}
              aria-hidden="true" />

            {nextSteps.map((step, i) => (
              <motion.div key={step.num} custom={i} initial="hidden" whileInView="show"
                viewport={{ once: true }} variants={fadeUp}
                className="relative flex flex-col items-start lg:items-center text-left lg:text-center px-0 lg:px-8 pb-10 lg:pb-0">
                {/* Step number circle */}
                <div className="flex items-center justify-center w-16 h-16 rounded-full mb-6 shrink-0 relative z-10"
                  style={{ background: "#FFFFFF", border: "2px solid rgba(217,119,6,0.25)", boxShadow: "0 2px 16px rgba(217,119,6,0.1)" }}>
                  <span className="font-serif font-bold" style={{ fontSize: "20px", color: "#d97706", lineHeight: 1 }}>
                    {step.num}
                  </span>
                </div>
                <p style={{ fontSize: "15px", fontWeight: 700, color: "#0F172A", marginBottom: "6px" }}>{step.label}</p>
                <p style={{ fontSize: "13px", lineHeight: 1.65, color: "#64748B" }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Footer nav */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={3}
            className="flex flex-wrap gap-x-8 gap-y-2 mt-20 pt-10"
            style={{ borderTop: "1px solid rgba(15,23,42,0.08)" }}>
            <Link href="/insights" className="text-sm font-medium transition-colors duration-200"
              style={{ color: "#94A3B8" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#d97706"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#94A3B8"; }}>
              Read our Insights →
            </Link>
            <Link href="/services" className="text-sm font-medium transition-colors duration-200"
              style={{ color: "#94A3B8" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#d97706"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#94A3B8"; }}>
              Explore Services →
            </Link>
            <Link href="/contact" className="text-sm font-medium transition-colors duration-200"
              style={{ color: "#94A3B8" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#d97706"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#94A3B8"; }}>
              Book a Strategy Call →
            </Link>
            <Link href="/network" className="text-sm font-medium transition-colors duration-200"
              style={{ color: "#d97706" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#b45309"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#d97706"; }}>
              Founders &amp; Operators Network →
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
