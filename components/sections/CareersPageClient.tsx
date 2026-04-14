"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { ElegantShape } from "@/components/ui/shape-landing-hero";

// ─── Schema ───────────────────────────────────────────────────────────────────

const schema = z.object({
  fullName: z.string().min(2, "Full name required"),
  email: z.string().email("Enter a valid email"),
  linkedin: z.string().min(5, "LinkedIn URL required"),
  portfolio: z.string().optional(),
  expertise: z.string().min(1, "Select an area"),
  currentRole: z.string().optional(),
  greatAt: z.string().min(10, "Tell us more"),
  recentWork: z.string().min(10, "Tell us more"),
  whyImagenn: z.string().min(10, "Tell us more"),
  wantToWorkOn: z.string().min(10, "Tell us more"),
  role: z.string().optional(),
});

type FormData = z.infer<typeof schema>;
type StepKey = keyof FormData;

const stepFields: StepKey[][] = [
  ["fullName", "email", "linkedin", "portfolio"],
  ["expertise", "currentRole", "greatAt", "recentWork"],
  ["whyImagenn", "wantToWorkOn"],
];

const stepLabels = ["You", "Your Work", "Your Why"];

// ─── Content ──────────────────────────────────────────────────────────────────

const whyJoin = [
  { num: "01", text: "Work on real AI systems — not experiments, not demos." },
  { num: "02", text: "Build things that organizations actually deploy and depend on." },
  { num: "03", text: "Be part of a small, high-leverage team where your output matters." },
  { num: "04", text: "Move fast and ship meaningful work — no bureaucracy slowing you down." },
  { num: "05", text: "Work at the intersection of AI, operations, and product." },
];

const values = [
  { label: "Execution over ideas", desc: "Ideas are free. Shipped work is what counts." },
  { label: "Ownership and accountability", desc: "You own your work end-to-end. No passing the buck." },
  { label: "Speed with quality", desc: "Fast doesn't mean sloppy. Both matter here." },
  { label: "Clear thinking", desc: "Complex problems solved with clear, direct reasoning." },
  { label: "Curiosity and adaptability", desc: "The field moves. So do we. You need to move with it." },
  { label: "Figure it out", desc: "We hire people who find a way — not people who wait for one." },
];

const whoFor = [
  "Builders — people who ship, not just plan",
  "Operators who understand how organizations actually work",
  "Those comfortable with ambiguity and white space",
  "People who take initiative without being asked",
  "Individuals who want to create, not maintain",
  "Anyone who cares more about impact than process",
];

const whoNotFor = [
  "Those who need slow, structured environments",
  "People who wait for direction",
  "Anyone who avoids ownership or accountability",
  "Those not comfortable with change or fast movement",
];

const roles = [
  {
    title: "AI Product Engineer",
    desc: "Build the AI-powered product layer. You'll work on core product features, integrations, and the systems that sit between AI capabilities and real user workflows.",
    location: "Remote",
    tag: "Engineering",
  },
  {
    title: "Automation Systems Engineer",
    desc: "Design and implement the automation infrastructure that runs inside client organizations. Complex workflows, real data, real stakes.",
    location: "Remote",
    tag: "Engineering",
  },
  {
    title: "AI Strategy & Implementation Lead",
    desc: "Lead the strategic and operational side of AI adoption inside organizations. Part strategist, part operator — you get things to actually ship.",
    location: "Remote",
    tag: "Strategy",
  },
  {
    title: "Full Stack Engineer (AI-Focused)",
    desc: "Build the systems, interfaces, and integrations that power IMAGENN products. Deep product involvement, high autonomy.",
    location: "Remote",
    tag: "Engineering",
  },
];

const expertiseOptions = [
  "AI / Machine Learning",
  "Software Engineering",
  "Product Management",
  "Operations / Implementation",
  "Strategy & Consulting",
  "Design / UX",
  "Other",
];

const nextSteps = [
  { num: "01", label: "We read your application", desc: "Every application is reviewed by a person — not filtered by a bot." },
  { num: "02", label: "We reach out if there's alignment", desc: "No ghost responses. If it's not a fit, we'll tell you directly." },
  { num: "03", label: "We move fast", desc: "No long hiring cycles. If we want to move forward, you'll know quickly." },
];

const howWeWork = [
  { label: "Small team, high ownership", desc: "No layers. You own your work from idea to deployment." },
  { label: "Fast iteration", desc: "We ship, learn, and improve. Cycles are short by design." },
  { label: "Clarity over bureaucracy", desc: "Simple decisions made quickly. No approval chains." },
  { label: "High standards", desc: "We care about quality. Speed and quality are not in conflict here." },
];

const upside = [
  "High-impact work on real AI systems",
  "Early-stage influence on product direction",
  "Direct collaboration — no layers",
  "Exposure to AI, operations, and product",
  "Room to shape the company as it grows",
  "Build something that actually matters",
];

// ─── Animation ────────────────────────────────────────────────────────────────

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease },
  }),
};

const heroFade: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, delay: 0.15 + i * 0.15, ease: "easeOut" },
  }),
};

const stepVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.38, ease } },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40, transition: { duration: 0.22, ease } }),
};

// ─── Input primitives ─────────────────────────────────────────────────────────

function LightInput(props: React.InputHTMLAttributes<HTMLInputElement> & { hasError?: boolean }) {
  const { hasError, ...rest } = props;
  const [focused, setFocused] = useState(false);
  return (
    <input {...rest}
      style={{
        width: "100%", height: "46px", padding: "0 13px", borderRadius: "5px",
        fontSize: "14px", background: "#FAFAF7",
        border: `1px solid ${hasError ? "#DC2626" : focused ? "#B45309" : "#DDD6CC"}`,
        color: "#18150F", outline: "none",
        boxShadow: focused ? "0 0 0 3px rgba(180,83,9,0.08)" : "none",
        transition: "border-color 0.14s, box-shadow 0.14s",
        ...rest.style,
      }}
      onFocus={(e) => { setFocused(true); rest.onFocus?.(e); }}
      onBlur={(e) => { setFocused(false); rest.onBlur?.(e); }}
    />
  );
}

function LightSelect(props: React.SelectHTMLAttributes<HTMLSelectElement> & { hasError?: boolean }) {
  const { hasError, ...rest } = props;
  const [focused, setFocused] = useState(false);
  return (
    <select {...rest}
      style={{
        width: "100%", height: "46px", padding: "0 13px", borderRadius: "5px",
        fontSize: "14px", background: "#FAFAF7",
        border: `1px solid ${hasError ? "#DC2626" : focused ? "#B45309" : "#DDD6CC"}`,
        color: rest.value ? "#18150F" : "#9C9080", outline: "none",
        boxShadow: focused ? "0 0 0 3px rgba(180,83,9,0.08)" : "none",
        transition: "border-color 0.14s, box-shadow 0.14s",
        appearance: "none",
        cursor: "pointer",
        ...rest.style,
      }}
      onFocus={(e) => { setFocused(true); rest.onFocus?.(e); }}
      onBlur={(e) => { setFocused(false); rest.onBlur?.(e); }}
    />
  );
}

function LightTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { hasError?: boolean }) {
  const { hasError, ...rest } = props;
  const [focused, setFocused] = useState(false);
  return (
    <textarea {...rest}
      style={{
        width: "100%", minHeight: "110px", padding: "11px 13px", borderRadius: "5px",
        fontSize: "14px", background: "#FAFAF7",
        border: `1px solid ${hasError ? "#DC2626" : focused ? "#B45309" : "#DDD6CC"}`,
        color: "#18150F", outline: "none",
        boxShadow: focused ? "0 0 0 3px rgba(180,83,9,0.08)" : "none",
        transition: "border-color 0.14s, box-shadow 0.14s",
        resize: "vertical", lineHeight: 1.65,
        ...rest.style,
      }}
      onFocus={(e) => { setFocused(true); rest.onFocus?.(e); }}
      onBlur={(e) => { setFocused(false); rest.onBlur?.(e); }}
    />
  );
}

function FieldLabel({ children, optional }: { children: React.ReactNode; optional?: boolean }) {
  return (
    <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#6B5B45", marginBottom: "7px", letterSpacing: "0.02em" }}>
      {children}
      {optional && <span style={{ fontWeight: 400, color: "#9C9080", marginLeft: "6px" }}>optional</span>}
    </label>
  );
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p style={{ fontSize: "12px", color: "#DC2626", marginTop: "5px" }}>{msg}</p>;
}

// ─── Main component ────────────────────────────────────────────────────────────

export function CareersPageClient() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const { register, handleSubmit, trigger, formState: { errors }, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const expertiseVal = watch("expertise");

  async function advance() {
    const valid = await trigger(stepFields[step] as (keyof FormData)[]);
    if (!valid) return;
    setDir(1);
    setStep((s) => s + 1);
  }

  function back() {
    setDir(-1);
    setStep((s) => s - 1);
  }

  async function onSubmit(data: FormData) {
    setSubmitting(true);
    try {
      await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, role: selectedRole ?? undefined }),
      });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  function scrollToForm(role?: string) {
    if (role) setSelectedRole(role);
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main style={{ background: "#09090E" }}>

      {/* ═══════════════════════════════════════════════════════════════════
          HERO — compact 2-col: left anchor + right editorial panel
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ background: "#0D0B08" }}>

        {/* Warm ambient glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 70% at 10% 60%, rgba(180,83,9,0.07) 0%, transparent 60%)" }} />

        {/* Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <ElegantShape delay={0.2} width={480} height={110} rotate={-8}
            gradient="from-amber-600/[0.09]" className="right-[-4%] top-[8%]" />
          <ElegantShape delay={0.4} width={260} height={64} rotate={16}
            gradient="from-orange-500/[0.07]" className="right-[12%] top-[60%]" />
          <ElegantShape delay={0.6} width={140} height={38} rotate={-20}
            gradient="from-amber-400/[0.06]" className="left-[4%] bottom-[14%]" />
        </div>

        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(13,11,8,0.55) 0%, transparent 15%, transparent 85%, rgba(13,11,8,0.8) 100%)" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          style={{ paddingTop: "clamp(5rem, 10vh, 7rem)", paddingBottom: "clamp(4rem, 8vh, 5.5rem)" }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 xl:gap-20 items-center">

            {/* LEFT — main anchor */}
            <div>
              <motion.p custom={0} variants={heroFade} initial="hidden" animate="visible"
                style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(245,158,11,0.65)", marginBottom: "22px" }}>
                Join Our Team
              </motion.p>

              <motion.h1 custom={1} variants={heroFade} initial="hidden" animate="visible"
                className="font-serif font-bold"
                style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)", lineHeight: 0.97, color: "#FAF6EE", letterSpacing: "-0.02em", marginBottom: "26px" }}>
                Don't Watch<br />the Shift.<br />
                <span style={{ color: "#f59e0b" }}>Build It.</span>
              </motion.h1>

              <motion.p custom={2} variants={heroFade} initial="hidden" animate="visible"
                style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)", lineHeight: 1.7, color: "rgba(250,246,238,0.5)", maxWidth: "38rem", marginBottom: "36px" }}>
                We're building the systems that will define how modern organizations operate. If you want to work on something that matters — this is it.
              </motion.p>

              <motion.div custom={3} variants={heroFade} initial="hidden" animate="visible"
                className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => scrollToForm()}
                  className="inline-flex items-center gap-2 font-bold rounded-lg transition-all duration-200"
                  style={{ height: "50px", padding: "0 26px", fontSize: "14px", background: "#f59e0b", color: "#0A0500", boxShadow: "0 4px 20px rgba(245,158,11,0.28)" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#fbbf24"; el.style.transform = "translateY(-1px)"; el.style.boxShadow = "0 6px 28px rgba(245,158,11,0.42)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#f59e0b"; el.style.transform = "translateY(0)"; el.style.boxShadow = "0 4px 20px rgba(245,158,11,0.28)"; }}
                >
                  Apply to Join <ArrowRight size={14} />
                </button>
                <button
                  onClick={() => document.getElementById("open-roles")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center gap-1.5 font-medium transition-colors duration-200"
                  style={{ fontSize: "13px", color: "rgba(250,246,238,0.35)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "rgba(250,246,238,0.65)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(250,246,238,0.35)"; }}
                >
                  View Open Roles <ChevronRight size={13} />
                </button>
              </motion.div>

              <motion.p custom={4} variants={heroFade} initial="hidden" animate="visible"
                style={{ fontSize: "12px", color: "rgba(250,246,238,0.2)", marginTop: "18px", letterSpacing: "0.02em" }}>
                We're selective. We're serious. And we're just getting started.
              </motion.p>
            </div>

            {/* RIGHT — editorial panel */}
            <motion.div custom={5} variants={heroFade} initial="hidden" animate="visible"
              className="hidden lg:block"
              style={{ padding: "28px 30px", borderRadius: "10px", background: "rgba(250,246,238,0.04)", border: "1px solid rgba(250,246,238,0.09)" }}>
              <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,158,11,0.5)", marginBottom: "18px" }}>
                What this is
              </p>
              <p style={{ fontSize: "13px", fontStyle: "italic", lineHeight: 1.65, color: "rgba(250,246,238,0.38)", marginBottom: "22px", paddingBottom: "22px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                Not a job listing. Not a recruiter inbox.<br />A direct line to people building what&apos;s next.
              </p>
              <div className="flex flex-col gap-3 mb-6">
                {[
                  "Real AI systems, not experiments",
                  "Small, high-leverage team",
                  "Shipping work that organizations depend on",
                  "Execution over everything",
                ].map((line, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-1 h-1 rounded-full shrink-0 mt-1.5" style={{ background: "rgba(245,158,11,0.5)" }} />
                    <p style={{ fontSize: "12.5px", lineHeight: 1.55, color: "rgba(250,246,238,0.48)" }}>{line}</p>
                  </div>
                ))}
              </div>
              <div style={{ paddingTop: "18px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(250,246,238,0.2)", marginBottom: "8px" }}>
                  Who we're looking for
                </p>
                {["Builders who ship", "Operators who understand complexity", "People who figure things out"].map((item, i) => (
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

      {/* ═══════════════════════════════════════════════════════════════════
          WHY JOIN
      ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: "#F7F4EE" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
            <div>
              <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(180,83,9,0.55)", marginBottom: "12px" }}>
                Why Join IMAGENN.AI
              </p>
              <h2 className="font-serif font-bold" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", lineHeight: 1.08, color: "#18150F" }}>
                Work that actually ships.
              </h2>
            </div>
            <p style={{ fontSize: "15px", lineHeight: 1.75, color: "rgba(24,21,15,0.45)", paddingTop: "36px" }}>
              IMAGENN.AI isn't exploring AI. We're implementing it — inside real organizations, at real scale. Every person here works on something that gets deployed.
            </p>
          </motion.div>

          <div className="flex flex-col">
            {whyJoin.map((item, i) => (
              <motion.div key={i} custom={i + 1} initial="hidden" whileInView="show"
                viewport={{ once: true, margin: "-20px" }} variants={fadeUp}
                className="group relative"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "linear-gradient(90deg, rgba(180,83,9,0.04) 0%, transparent 60%)" }} />
                <div className="relative grid items-center py-6"
                  style={{ gridTemplateColumns: "52px 1fr", gap: "20px", borderTop: "1px solid rgba(180,83,9,0.12)" }}>
                  <span className="font-serif font-bold select-none"
                    style={{ fontSize: "clamp(1.3rem, 2vw, 1.7rem)", lineHeight: 1, color: "rgba(180,83,9,0.5)", letterSpacing: "-0.02em" }}
                    aria-hidden="true">
                    {item.num}
                  </span>
                  <p style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)", color: "rgba(24,21,15,0.75)", lineHeight: 1.5 }}>
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
            <div style={{ borderTop: "1px solid rgba(180,83,9,0.12)" }} />
          </div>
        </div>
      </section>

      {/* HOW WE WORK — hidden */}

      {/* ═══════════════════════════════════════════════════════════════════
          VALUES
      ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: "#111009" }}>
        <div className="h-px" aria-hidden="true"
          style={{ background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.2) 50%, transparent)" }} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="mb-16">
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(245,158,11,0.5)", marginBottom: "12px" }}>
              What We Value
            </p>
            <h2 className="font-serif font-bold" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", lineHeight: 1.08, color: "#FAF6EE" }}>
              Non-negotiables.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {values.map((item, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="show"
                viewport={{ once: true, margin: "-20px" }} variants={fadeUp}
                style={{
                  background: "rgba(245,158,11,0.04)",
                  border: "1px solid rgba(245,158,11,0.09)",
                  borderRadius: "8px",
                  padding: "20px 22px",
                }}>
                <p className="font-serif font-bold" style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)", color: "#FAF6EE", marginBottom: "6px" }}>
                  {item.label}
                </p>
                <p style={{ fontSize: "13px", color: "rgba(250,246,238,0.38)", lineHeight: 1.65 }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FIT CHECK — side-by-side contrast
      ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: "#F7F4EE" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="mb-16">
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(180,83,9,0.55)", marginBottom: "12px" }}>
              Fit Check
            </p>
            <h2 className="font-serif font-bold" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", lineHeight: 1.08, color: "#18150F" }}>
              Know before you apply.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Who thrives */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={1}
              style={{ background: "rgba(180,83,9,0.07)", border: "1px solid rgba(180,83,9,0.16)", borderRadius: "8px", padding: "28px" }}>
              <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(180,83,9,0.7)", marginBottom: "16px" }}>
                Who Thrives Here
              </p>
              <ul className="flex flex-col gap-4">
                {whoFor.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#D97706", flexShrink: 0, marginTop: "5px" }} />
                    <span style={{ fontSize: "14px", color: "rgba(24,21,15,0.72)", lineHeight: 1.55 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Who not for */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={2}
              style={{ background: "rgba(24,21,15,0.04)", border: "1px solid rgba(24,21,15,0.08)", borderRadius: "8px", padding: "28px" }}>
              <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(24,21,15,0.25)", marginBottom: "16px" }}>
                Who This Is Not For
              </p>
              <ul className="flex flex-col gap-4">
                {whoNotFor.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "rgba(24,21,15,0.1)", border: "1px solid rgba(24,21,15,0.15)", flexShrink: 0, marginTop: "5px" }} />
                    <span style={{ fontSize: "14px", color: "rgba(24,21,15,0.2)", lineHeight: 1.55, textDecoration: "line-through", textDecorationColor: "rgba(24,21,15,0.12)" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          UPSIDE — dark strip
      ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: "#0A0806" }}>
        <div className="h-px" aria-hidden="true"
          style={{ background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.18) 50%, transparent)" }} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="mb-12 text-center">
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(245,158,11,0.5)", marginBottom: "12px" }}>
              The Upside
            </p>
            <h2 className="font-serif font-bold" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", lineHeight: 1.08, color: "#FAF6EE" }}>
              What you get by joining early.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {upside.map((item, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="show"
                viewport={{ once: true, margin: "-20px" }} variants={fadeUp}
                className="flex items-center gap-3"
                style={{
                  background: "rgba(245,158,11,0.06)",
                  border: "1px solid rgba(245,158,11,0.12)",
                  borderRadius: "6px",
                  padding: "12px 16px",
                }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "rgba(245,158,11,0.6)", flexShrink: 0 }} />
                <span style={{ fontSize: "14px", color: "rgba(250,246,238,0.65)", lineHeight: 1.45 }}>{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          OPEN ROLES
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="open-roles" style={{ background: "#F5F0E8" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="mb-14">
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(180,83,9,0.65)", marginBottom: "12px" }}>
              Open Roles
            </p>
            <h2 className="font-serif font-bold" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", lineHeight: 1.08, color: "#18150F" }}>
              Where we need builders.
            </h2>
          </motion.div>

          <div className="flex flex-col gap-3">
            {roles.map((role, i) => (
              <motion.div key={i} custom={i + 1} initial="hidden" whileInView="show"
                viewport={{ once: true, margin: "-20px" }} variants={fadeUp}
                className="group rounded-lg transition-all duration-300"
                style={{ background: "#FDFAF4", border: "1px solid rgba(180,83,9,0.1)", borderRadius: "8px", padding: "24px" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(180,83,9,0.1)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(180,83,9,0.25)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(180,83,9,0.1)"; }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className="font-serif font-bold" style={{ fontSize: "clamp(1rem, 1.5vw, 1.15rem)", color: "#18150F" }}>
                        {role.title}
                      </span>
                      <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(180,83,9,0.7)", background: "rgba(217,119,6,0.1)", padding: "2px 8px", borderRadius: "3px" }}>
                        {role.tag}
                      </span>
                      <span style={{ fontSize: "11px", color: "rgba(24,21,15,0.4)" }}>
                        {role.location}
                      </span>
                    </div>
                    <p style={{ fontSize: "13px", color: "rgba(24,21,15,0.5)", lineHeight: 1.65 }}>
                      {role.desc}
                    </p>
                  </div>
                  <button
                    onClick={() => scrollToForm(role.title)}
                    className="shrink-0 inline-flex items-center gap-2 font-bold transition-all duration-200"
                    style={{ height: "38px", padding: "0 18px", borderRadius: "5px", background: "#D97706", color: "#fff", fontSize: "13px", whiteSpace: "nowrap" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#B45309"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#D97706"; }}
                  >
                    Apply
                    <ArrowRight size={12} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* General application nudge */}
          <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={5}
            className="mt-10"
            style={{ fontSize: "13px", color: "rgba(24,21,15,0.45)", lineHeight: 1.6 }}>
            Don't see the right role?{" "}
            <button
              onClick={() => scrollToForm()}
              style={{ fontSize: "13px", color: "#B45309", fontWeight: 500, textDecoration: "underline", background: "none", border: "none", cursor: "pointer", padding: 0 }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#92400E"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#B45309"; }}
            >
              Submit a general application →
            </button>
          </motion.p>
        </div>
      </section>

      {/* MID-PAGE CTA — hidden */}

      {/* ═══════════════════════════════════════════════════════════════════
          CULTURE MANIFESTO — editorial row layout
      ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: "#0A0806" }}>
        <div className="h-px" aria-hidden="true"
          style={{ background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.12) 50%, transparent)" }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="mb-16">
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(245,158,11,0.45)", marginBottom: "12px" }}>
              Our Culture
            </p>
            <h2 className="font-serif font-bold" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", lineHeight: 1.08, color: "#FAF6EE" }}>
              We're not building a normal company.
            </h2>
          </motion.div>

          <div className="flex flex-col">
            {[
              "We move fast — decisions happen in hours, not weeks.",
              "We ship real work — if it doesn't deploy, it doesn't count.",
              "We operate nothing like a traditional company.",
              "We're building for the next decade — not the last one.",
            ].map((item, i) => (
              <motion.div key={i} custom={i + 1} initial="hidden" whileInView="show"
                viewport={{ once: true, margin: "-20px" }} variants={fadeUp}
                className="grid items-start py-8"
                style={{
                  gridTemplateColumns: "80px 1fr",
                  gap: "32px",
                  borderTop: "1px solid rgba(245,158,11,0.08)",
                }}>
                <span className="font-serif font-bold select-none"
                  style={{ fontSize: "clamp(2rem, 3vw, 2.8rem)", lineHeight: 1, color: "rgba(245,158,11,0.28)", letterSpacing: "-0.02em" }}
                  aria-hidden="true">
                  0{i + 1}
                </span>
                <p className="font-serif" style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)", color: "rgba(250,246,238,0.9)", lineHeight: 1.4, fontWeight: 500, paddingTop: "8px" }}>
                  {item}
                </p>
              </motion.div>
            ))}
            <div style={{ borderTop: "1px solid rgba(245,158,11,0.08)" }} />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          APPLICATION — 2-col: left content + right form
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="apply" style={{ background: "#F5F0E8" }}>
        <div className="h-px" aria-hidden="true"
          style={{ background: "linear-gradient(90deg, transparent, rgba(180,83,9,0.2) 50%, transparent)" }} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_520px] gap-16 xl:gap-24 items-start">

            {/* LEFT — content column */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={0}
              className="lg:sticky lg:top-28">
              <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(180,83,9,0.55)", marginBottom: "14px" }}>
                Apply to Join
              </p>
              <h2 className="font-serif font-bold" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.05, color: "#18150F", marginBottom: "16px" }}>
                {selectedRole ? `Applying for:\n${selectedRole}` : "Make your case."}
              </h2>
              <p style={{ fontSize: "15px", lineHeight: 1.75, color: "rgba(24,21,15,0.5)", marginBottom: "36px", maxWidth: "380px" }}>
                Tell us what you do best, what you've built, and why you want to be part of what we're building. We read every application personally.
              </p>

              {/* What happens next */}
              <div style={{ marginBottom: "36px" }}>
                <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(24,21,15,0.35)", marginBottom: "16px" }}>
                  What Happens Next
                </p>
                <div className="flex flex-col gap-0">
                  {[
                    { n: "01", label: "We read it personally", desc: "Every application reviewed by a human — no bots." },
                    { n: "02", label: "We respond directly", desc: "If there's alignment, you'll hear from us. No ghost responses." },
                    { n: "03", label: "We move fast", desc: "No long cycles. If we want to talk, you'll know quickly." },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 py-4"
                      style={{ borderTop: "1px solid rgba(24,21,15,0.07)" }}>
                      <span className="font-serif font-bold shrink-0"
                        style={{ fontSize: "1rem", color: "rgba(180,83,9,0.4)", lineHeight: 1, paddingTop: "2px" }}>
                        {item.n}
                      </span>
                      <div>
                        <p style={{ fontSize: "13px", fontWeight: 600, color: "#18150F", marginBottom: "2px" }}>{item.label}</p>
                        <p style={{ fontSize: "12px", color: "rgba(24,21,15,0.42)", lineHeight: 1.55 }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                  <div style={{ borderTop: "1px solid rgba(24,21,15,0.07)" }} />
                </div>
              </div>

              {/* Trust signals */}
              <div className="flex flex-col gap-2.5" style={{ marginBottom: "32px" }}>
                {[
                  "No generic screening — real people reading real applications",
                  "Selective by design — quality over volume",
                  "Remote-first — location doesn't limit you",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#D97706", flexShrink: 0, marginTop: "7px" }} />
                    <p style={{ fontSize: "12.5px", color: "rgba(24,21,15,0.5)", lineHeight: 1.55 }}>{item}</p>
                  </div>
                ))}
              </div>

              {/* Network cross-link */}
              <Link href="/network"
                style={{ fontSize: "12px", color: "rgba(180,83,9,0.55)", display: "inline-flex", alignItems: "center", gap: "4px" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#B45309"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(180,83,9,0.55)"; }}
              >
                Not applying? Explore the Founders &amp; Operators Network →
              </Link>
            </motion.div>

            {/* RIGHT — form */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={1}>
              {submitted ? (
                <div className="text-center"
                  style={{ background: "#FFFFFF", border: "1px solid rgba(180,83,9,0.15)", borderRadius: "12px", boxShadow: "0 12px 48px rgba(24,21,15,0.1)", padding: "56px 40px" }}>
                  <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: "rgba(217,119,6,0.1)", border: "1px solid rgba(217,119,6,0.22)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                    <span style={{ fontSize: "22px", color: "#D97706" }}>✓</span>
                  </div>
                  <h3 className="font-serif font-bold" style={{ fontSize: "1.5rem", color: "#18150F", marginBottom: "12px" }}>
                    Application received.
                  </h3>
                  <p style={{ fontSize: "14px", color: "rgba(24,21,15,0.5)", lineHeight: 1.7, maxWidth: "340px", margin: "0 auto" }}>
                    We read every submission personally. If there's alignment, you'll hear from us directly — no long cycles.
                  </p>
                </div>
              ) : (
                <div style={{ background: "#FFFFFF", border: "1px solid rgba(180,83,9,0.14)", borderRadius: "12px", boxShadow: "0 12px 48px rgba(24,21,15,0.09)", overflow: "hidden" }}>

                  {/* Step progress */}
                  <div style={{ borderBottom: "1px solid rgba(24,21,15,0.07)", padding: "24px 28px" }}>
                    <div className="flex items-center">
                      {stepLabels.map((label, i) => (
                        <div key={i} className="flex items-center" style={{ flex: i < stepLabels.length - 1 ? 1 : "none" }}>
                          <div className="flex flex-col items-center gap-1.5">
                            <div style={{
                              width: "26px", height: "26px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                              fontSize: "11px", fontWeight: 700,
                              background: i <= step ? "#D97706" : "rgba(24,21,15,0.06)",
                              color: i <= step ? "#fff" : "rgba(24,21,15,0.3)",
                              transition: "all 0.3s ease",
                            }}>
                              {i < step ? "✓" : i + 1}
                            </div>
                            <span style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: i <= step ? "#B45309" : "rgba(24,21,15,0.28)", whiteSpace: "nowrap" }}>
                              {label}
                            </span>
                          </div>
                          {i < stepLabels.length - 1 && (
                            <div style={{ flex: 1, height: "1px", margin: "0 6px", marginBottom: "16px", background: i < step ? "#D97706" : "rgba(24,21,15,0.1)", transition: "background 0.3s ease" }} />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div style={{ padding: "24px 28px", overflow: "hidden" }}>
                      <AnimatePresence mode="wait" custom={dir}>
                        {step === 0 && (
                          <motion.div key="step0" custom={dir} variants={stepVariants} initial="enter" animate="center" exit="exit">
                            <div className="flex flex-col gap-5">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <FieldLabel>Full Name</FieldLabel>
                                  <LightInput {...register("fullName")} placeholder="Jane Smith" hasError={!!errors.fullName} />
                                  <FieldError msg={errors.fullName?.message} />
                                </div>
                                <div>
                                  <FieldLabel>Work Email</FieldLabel>
                                  <LightInput {...register("email")} type="email" placeholder="you@company.com" hasError={!!errors.email} />
                                  <FieldError msg={errors.email?.message} />
                                </div>
                              </div>
                              <div>
                                <FieldLabel>LinkedIn Profile</FieldLabel>
                                <LightInput {...register("linkedin")} placeholder="linkedin.com/in/yourprofile" hasError={!!errors.linkedin} />
                                <FieldError msg={errors.linkedin?.message} />
                              </div>
                              <div>
                                <FieldLabel optional>Portfolio / Website</FieldLabel>
                                <LightInput {...register("portfolio")} placeholder="yoursite.com or github.com/you" />
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {step === 1 && (
                          <motion.div key="step1" custom={dir} variants={stepVariants} initial="enter" animate="center" exit="exit">
                            <div className="flex flex-col gap-5">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <FieldLabel>Area of Expertise</FieldLabel>
                                  <div style={{ position: "relative" }}>
                                    <LightSelect
                                      {...register("expertise")}
                                      value={expertiseVal || ""}
                                      onChange={e => setValue("expertise", e.target.value)}
                                      hasError={!!errors.expertise}
                                    >
                                      <option value="" disabled>Select area</option>
                                      {expertiseOptions.map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                      ))}
                                    </LightSelect>
                                    <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#9C9080", fontSize: "11px" }}>▾</span>
                                  </div>
                                  <FieldError msg={errors.expertise?.message} />
                                </div>
                                <div>
                                  <FieldLabel optional>Current Role / Title</FieldLabel>
                                  <LightInput {...register("currentRole")} placeholder="Head of Operations" />
                                </div>
                              </div>
                              <div>
                                <FieldLabel>What are you great at?</FieldLabel>
                                <LightTextarea {...register("greatAt")} placeholder="Be specific. What do you do better than most?" hasError={!!errors.greatAt} style={{ minHeight: "90px" }} />
                                <FieldError msg={errors.greatAt?.message} />
                              </div>
                              <div>
                                <FieldLabel>What have you built or shipped recently?</FieldLabel>
                                <LightTextarea {...register("recentWork")} placeholder="Something real you shipped — what it was, what you built, what it did." hasError={!!errors.recentWork} style={{ minHeight: "90px" }} />
                                <FieldError msg={errors.recentWork?.message} />
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {step === 2 && (
                          <motion.div key="step2" custom={dir} variants={stepVariants} initial="enter" animate="center" exit="exit">
                            <div className="flex flex-col gap-5">
                              <div>
                                <FieldLabel>Why IMAGENN.AI?</FieldLabel>
                                <LightTextarea {...register("whyImagenn")} placeholder="What specifically draws you here? Be direct." hasError={!!errors.whyImagenn} style={{ minHeight: "110px" }} />
                                <FieldError msg={errors.whyImagenn?.message} />
                              </div>
                              <div>
                                <FieldLabel>What do you want to work on?</FieldLabel>
                                <LightTextarea {...register("wantToWorkOn")} placeholder="What problems excite you? What would you build?" hasError={!!errors.wantToWorkOn} style={{ minHeight: "110px" }} />
                                <FieldError msg={errors.wantToWorkOn?.message} />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Nav */}
                    <div style={{ padding: "12px 28px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      {step > 0 ? (
                        <button type="button" onClick={back}
                          style={{ fontSize: "13px", color: "rgba(24,21,15,0.38)", fontWeight: 500, background: "none", border: "none", cursor: "pointer", padding: 0 }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#18150F"; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(24,21,15,0.38)"; }}
                        >
                          ← Back
                        </button>
                      ) : <div />}

                      {step < stepLabels.length - 1 ? (
                        <button type="button" onClick={advance}
                          className="inline-flex items-center gap-2 font-bold transition-all duration-200"
                          style={{ height: "44px", padding: "0 24px", borderRadius: "6px", background: "#D97706", color: "#fff", fontSize: "14px" }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#B45309"; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#D97706"; }}
                        >
                          Continue <ArrowRight size={14} />
                        </button>
                      ) : (
                        <div className="flex flex-col items-end gap-2">
                          <button type="submit" disabled={submitting}
                            className="inline-flex items-center gap-2 font-bold transition-all duration-200"
                            style={{ height: "44px", padding: "0 24px", borderRadius: "6px", background: submitting ? "#9CA3AF" : "#D97706", color: "#fff", fontSize: "14px", cursor: submitting ? "not-allowed" : "pointer" }}
                          >
                            {submitting ? "Submitting…" : "Submit Application"} {!submitting && <ArrowRight size={14} />}
                          </button>
                          <p style={{ fontSize: "11px", color: "rgba(24,21,15,0.3)", lineHeight: 1.5 }}>
                            No black hole — we respond to every application.
                          </p>
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              )}
            </motion.div>

          </div>
        </div>
      </section>

    </main>
  );
}
