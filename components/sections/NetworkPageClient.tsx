"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";
import { ElegantShape } from "@/components/ui/shape-landing-hero";

// ─── Schema ───────────────────────────────────────────────────────────────────

const schema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Enter a valid work email"),
  linkedin: z.string().min(5, "LinkedIn profile URL is required"),
  company: z.string().min(1, "Company is required"),
  role: z.string().min(1, "Role / Title is required"),
  companySize: z.string().min(1, "Select company size"),
  industry: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

type StepKey = "fullName" | "email" | "linkedin" | "company" | "role" | "companySize" | "industry";

const stepFields: StepKey[][] = [
  ["fullName", "email", "linkedin"],
  ["company", "role", "companySize", "industry"],
];

const stepLabels = ["About You", "Your Organization"];

// ─── Content ──────────────────────────────────────────────────────────────────

const whatThisIs = [
  { heading: "Operators, not observers", body: "A network of leaders working through real AI adoption — not theory, not exploration." },
  { heading: "Practical exchange", body: "Real use cases, hard-won lessons, and emerging implementations from people in the work." },
  { heading: "Product influence", body: "A direct line into how IMAGENN products are shaped, prioritized, and built." },
  { heading: "Execution-focused", body: "Conversations that move things forward. Not content. Not inspiration. Output." },
];

const whoFor = [
  "Founders and executives driving organizational change",
  "Operations leaders managing real complexity",
  "Transformation leaders navigating AI adoption",
  "Mid-market and scaling companies",
  "Teams actively building on AI — not just evaluating it",
  "Organizations dealing with genuine operational friction",
];

const whoNotFor = [
  "Exploring AI casually or theoretically",
  "Students or early learners",
  "Passive observers seeking content",
  "Generic networking or community-seekers",
];

const membersGet = [
  { label: "Early product access", desc: "Features and capabilities before public release." },
  { label: "Roadmap influence", desc: "Your context shapes what gets built next." },
  { label: "Emerging AI use cases", desc: "Real implementations — not marketing case studies." },
  { label: "Operator-level discussion", desc: "No surface-level content. Conversations that assume you're in the work." },
  { label: "Peer implementations", desc: "See how other leaders are applying AI inside their organizations." },
  { label: "Strategic access", desc: "Direct conversations with the IMAGENN team and like-minded leaders." },
];

const weExpect = [
  { num: "01", text: "Real operational context — you're in the work, not observing it." },
  { num: "02", text: "A willingness to contribute — share what's working and what isn't." },
  { num: "03", text: "Openness to exchange — this only works if members give as much as they take." },
  { num: "04", text: "Active participation — passive membership isn't membership." },
];

const whyNow = [
  {
    stat: "Shifting",
    label: "AI is moving from tools to systems",
    desc: "The next wave isn't isolated AI features. It's AI as the layer that runs how organizations operate.",
  },
  {
    stat: "Stuck",
    label: "Most organizations are still experimenting",
    desc: "Pilots stall. POCs don't ship. The gap between experimenting and implementing is widening every quarter.",
  },
  {
    stat: "Defined",
    label: "Early operators will set the standard",
    desc: "The organizations that implement now won't just adapt to the future — they'll define it for everyone else.",
  },
  {
    stat: "Now",
    label: "The structural advantage is available today",
    desc: "Not in three years. The window is open. Organizations moving now will be months ahead.",
  },
];

const nextSteps = [
  { num: "01", label: "Application review", desc: "Every application is read by a person. We look at role, context, and what you'd contribute." },
  { num: "02", label: "Decision within days", desc: "You'll hear back directly. If it's not a fit, we'll say so honestly." },
  { num: "03", label: "Early access onboarding", desc: "Accepted members get into IMAGENN tools and capabilities before public release." },
  { num: "04", label: "Network invitation", desc: "Full access to the network, discussions, and the operator community." },
];

const companySizes = [
  "1–10 employees",
  "11–50 employees",
  "51–200 employees",
  "201–500 employees",
  "501–1,000 employees",
  "1,000+ employees",
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
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, delay: 0.2 + i * 0.14, ease: "easeOut" },
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

function LightTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { hasError?: boolean }) {
  const { hasError, ...rest } = props;
  const [focused, setFocused] = useState(false);
  return (
    <textarea {...rest}
      style={{
        width: "100%", minHeight: "100px", padding: "11px 13px", borderRadius: "5px",
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

function LightSelect(props: React.SelectHTMLAttributes<HTMLSelectElement> & { hasError?: boolean }) {
  const { hasError, ...rest } = props;
  const [focused, setFocused] = useState(false);
  return (
    <select {...rest}
      style={{
        width: "100%", height: "46px", padding: "0 13px", borderRadius: "5px",
        fontSize: "14px", background: "#FAFAF7",
        border: `1px solid ${hasError ? "#DC2626" : focused ? "#B45309" : "#DDD6CC"}`,
        color: "#18150F", outline: "none",
        boxShadow: focused ? "0 0 0 3px rgba(180,83,9,0.08)" : "none",
        transition: "border-color 0.14s, box-shadow 0.14s",
        appearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='7' viewBox='0 0 11 7'%3E%3Cpath d='M1 1l4.5 4.5L10 1' stroke='%23B45309' stroke-width='1.4' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat", backgroundPosition: "right 13px center",
        paddingRight: "36px", cursor: "pointer",
        ...rest.style,
      }}
      onFocus={(e) => { setFocused(true); rest.onFocus?.(e); }}
      onBlur={(e) => { setFocused(false); rest.onBlur?.(e); }}
    />
  );
}

const lbl = {
  fontSize: "10px", fontWeight: 700 as const, letterSpacing: "0.14em",
  textTransform: "uppercase" as const, color: "#7A6A58",
  marginBottom: "6px", display: "block",
};
const fieldErr = { fontSize: "11px", color: "#DC2626", marginTop: "3px" };

// ─── Component ────────────────────────────────────────────────────────────────

export function NetworkPageClient() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const { register, handleSubmit, trigger, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const goNext = async () => {
    const valid = await trigger(stepFields[step]);
    if (valid) { setDirection(1); setStep((s) => s + 1); }
  };

  const goBack = () => { setDirection(-1); setStep((s) => s - 1); };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setServerError("");
    try {
      const res = await fetch("/api/network", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setServerError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════
          HERO — compact 2-col: left anchor + right editorial panel
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ background: "#0D0B08" }}>
        {/* Warm ambient glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 70% at 10% 60%, rgba(180,83,9,0.07) 0%, transparent 60%)" }} />

        {/* Shapes — top-right framing */}
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
                IMAGENN.AI
              </motion.p>

              <motion.h1 custom={1} variants={heroFade} initial="hidden" animate="visible"
                className="font-serif font-bold"
                style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)", lineHeight: 0.97, color: "#FAF6EE", letterSpacing: "-0.02em", marginBottom: "28px" }}>
                Founders &amp;<br />Operators<br />
                <span style={{ color: "#f59e0b" }}>Network.</span>
              </motion.h1>

              <motion.p custom={2} variants={heroFade} initial="hidden" animate="visible"
                style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)", lineHeight: 1.7, color: "rgba(250,246,238,0.5)", maxWidth: "38rem", marginBottom: "38px" }}>
                A curated group of founders, operators, and leaders shaping how AI is actually applied inside modern organizations.
              </motion.p>

              <motion.div custom={3} variants={heroFade} initial="hidden" animate="visible"
                className="flex flex-wrap items-center gap-4">
                <a href="#apply"
                  className="inline-flex items-center gap-2 font-bold rounded-lg transition-all duration-200"
                  style={{ height: "50px", padding: "0 26px", fontSize: "14px", background: "#f59e0b", color: "#0A0500", boxShadow: "0 4px 20px rgba(245,158,11,0.28)" }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "#fbbf24"; el.style.transform = "translateY(-1px)"; el.style.boxShadow = "0 6px 28px rgba(245,158,11,0.42)"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "#f59e0b"; el.style.transform = "translateY(0)"; el.style.boxShadow = "0 4px 20px rgba(245,158,11,0.28)"; }}>
                  Apply to Join <ArrowRight size={14} />
                </a>
                <p style={{ fontSize: "12px", color: "rgba(250,246,238,0.25)", letterSpacing: "0.02em" }}>
                  Applications are reviewed. Not everyone is accepted.
                </p>
              </motion.div>
            </div>

            {/* RIGHT — editorial panel */}
            <motion.div custom={4} variants={heroFade} initial="hidden" animate="visible"
              className="hidden lg:block"
              style={{
                padding: "28px 30px",
                borderRadius: "10px",
                background: "rgba(250,246,238,0.04)",
                border: "1px solid rgba(250,246,238,0.09)",
              }}>
              <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,158,11,0.5)", marginBottom: "18px" }}>
                What this is
              </p>
              <p style={{ fontSize: "13px", fontStyle: "italic", lineHeight: 1.65, color: "rgba(250,246,238,0.38)", marginBottom: "22px", paddingBottom: "22px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                Not a community. Not a newsletter.<br />A working network of people building what&apos;s next.
              </p>

              <div className="flex flex-col gap-3 mb-6">
                {[
                  "Operators working through real AI adoption",
                  "Practical insights and hard-won use cases",
                  "Direct influence on IMAGENN product direction",
                  "Focused on execution — not ideas",
                ].map((line, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-1 h-1 rounded-full shrink-0 mt-1.5" style={{ background: "rgba(245,158,11,0.5)" }} />
                    <p style={{ fontSize: "12.5px", lineHeight: 1.55, color: "rgba(250,246,238,0.48)" }}>{line}</p>
                  </div>
                ))}
              </div>

              <div style={{ paddingTop: "18px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(250,246,238,0.2)", marginBottom: "8px" }}>
                  Membership criteria
                </p>
                {["Founders and executives", "Operations and transformation leaders", "Teams actively implementing AI"].map((item, i) => (
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
          WHAT THIS IS — cream, 2×2 editorial cards
      ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: "#F5F0E8" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="mb-14">
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: "#B45309", marginBottom: "10px" }}>
              What This Is
            </p>
            <h2 className="font-serif font-bold" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", lineHeight: 1.1, color: "#18150F", maxWidth: "30rem" }}>
              Built for the people doing the actual work.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {whatThisIs.map((item, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="show"
                viewport={{ once: true, margin: "-30px" }} variants={fadeUp}
                style={{
                  background: "#FFFFFF",
                  padding: "clamp(26px, 3.5vw, 40px)",
                  borderRadius: "8px",
                  border: "1px solid rgba(24,21,15,0.08)",
                  boxShadow: "0 2px 16px rgba(24,21,15,0.05)",
                }}>
                <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(180,83,9,0.55)", marginBottom: "12px" }}>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="font-serif font-bold mb-2" style={{ fontSize: "clamp(1rem, 1.5vw, 1.15rem)", color: "#18150F", lineHeight: 1.3 }}>
                  {item.heading}
                </p>
                <p style={{ fontSize: "13px", lineHeight: 1.65, color: "#6B5E4E" }}>
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          WHO IT'S FOR / NOT FOR — dark, asymmetric dual panels
      ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: "#0D0B08" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="mb-14">
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(245,158,11,0.55)", marginBottom: "10px" }}>
              Membership Criteria
            </p>
            <h2 className="font-serif font-bold" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", lineHeight: 1.1, color: "#FAF6EE" }}>
              This network is selective by design.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
            {/* Who it's for — larger, warmer */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={1}
              style={{ padding: "clamp(28px, 4vw, 44px)", borderRadius: "8px", background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.2)", boxShadow: "inset 0 0 40px rgba(245,158,11,0.03)" }}>
              <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#f59e0b", marginBottom: "20px" }}>
                Who This Is For
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {whoFor.map((item, i) => (
                  <motion.div key={i} custom={i} initial="hidden" whileInView="show"
                    viewport={{ once: true }} variants={fadeUp}
                    className="flex items-start gap-2.5">
                    <CheckCircle2 size={13} className="shrink-0 mt-0.5" style={{ color: "#f59e0b" }} />
                    <p style={{ fontSize: "13px", lineHeight: 1.5, color: "rgba(250,246,238,0.7)" }}>{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Who it's not for — smaller, muted */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={2}
              style={{ padding: "clamp(28px, 4vw, 44px)", borderRadius: "8px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(250,246,238,0.2)", marginBottom: "20px" }}>
                Who This Is Not For
              </p>
              <div className="flex flex-col gap-3.5">
                {whoNotFor.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-3 h-3 rounded-full shrink-0 mt-0.5 flex items-center justify-center"
                      style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                      <div className="w-1.5 h-px" style={{ background: "rgba(255,255,255,0.2)" }} />
                    </div>
                    <p style={{ fontSize: "13px", lineHeight: 1.5, color: "rgba(250,246,238,0.18)", textDecoration: "line-through", textDecorationColor: "rgba(255,255,255,0.08)" }}>{item}</p>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: "11px", lineHeight: 1.65, color: "rgba(250,246,238,0.15)", fontStyle: "italic", marginTop: "24px", paddingTop: "18px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                We review every application. If it&apos;s not a fit, we&apos;ll say so directly.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          WHAT MEMBERS GET — cream, 3-col benefit grid
      ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: "#FAFAF7" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: "#B45309", marginBottom: "10px" }}>
                Member Benefits
              </p>
              <h2 className="font-serif font-bold" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", lineHeight: 1.1, color: "#18150F" }}>
                What members get.
              </h2>
            </div>
            <a href="#apply"
              className="shrink-0 inline-flex items-center gap-2 font-bold text-sm rounded-lg transition-all duration-200"
              style={{ height: "42px", padding: "0 20px", background: "#B45309", color: "#FAFAF7", boxShadow: "0 2px 12px rgba(180,83,9,0.22)" }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "#92400E"; el.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "#B45309"; el.style.transform = "translateY(0)"; }}>
              Apply to Join <ArrowRight size={13} />
            </a>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {membersGet.map((item, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="show"
                viewport={{ once: true, margin: "-30px" }} variants={fadeUp}
                style={{
                  padding: "28px 30px",
                  borderRadius: "8px",
                  background: "#FFFFFF",
                  border: "1px solid rgba(24,21,15,0.07)",
                  boxShadow: "0 2px 20px rgba(24,21,15,0.06)",
                  transition: "box-shadow 0.2s ease, transform 0.2s ease",
                }}>
                <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(180,83,9,0.45)", display: "block", marginBottom: "12px" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p style={{ fontSize: "15px", fontWeight: 700, color: "#18150F", marginBottom: "6px", lineHeight: 1.3 }}>{item.label}</p>
                <p style={{ fontSize: "13px", lineHeight: 1.65, color: "#7A6A58" }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          WHAT WE EXPECT — dark, manifesto-weight typography
      ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: "#0D0B08", overflow: "hidden" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

          {/* Header */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="mb-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
            <div>
              <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(245,158,11,0.55)", marginBottom: "14px" }}>
                What We Expect
              </p>
              <h2 className="font-serif font-bold" style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)", lineHeight: 1.05, color: "#FAF6EE" }}>
                Membership has a bar.
              </h2>
            </div>
            <p style={{ fontSize: "15px", lineHeight: 1.75, color: "rgba(250,246,238,0.32)", paddingBottom: "4px" }}>
              This network works because everyone in it is actually doing the work. That's the expectation — and why it's worth being part of.
            </p>
          </motion.div>

          {/* Manifesto rows */}
          <div className="flex flex-col">
            {weExpect.map((item, i) => (
              <motion.div
                key={i}
                custom={i + 1}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-20px" }}
                variants={fadeUp}
                className="group relative"
              >
                {/* Hover background */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "linear-gradient(90deg, rgba(245,158,11,0.04) 0%, transparent 60%)" }} />

                <div className="relative grid items-center py-6"
                  style={{
                    gridTemplateColumns: "52px 1fr",
                    gap: "20px",
                    borderTop: "1px solid rgba(245,158,11,0.1)",
                  }}>

                  {/* Number */}
                  <span
                    className="font-serif font-bold select-none"
                    style={{
                      fontSize: "clamp(1.4rem, 2.2vw, 1.8rem)",
                      lineHeight: 1,
                      color: "rgba(245,158,11,0.45)",
                      letterSpacing: "-0.02em",
                    }}
                    aria-hidden="true"
                  >
                    {item.num}
                  </span>

                  {/* Text */}
                  <p className="font-serif" style={{
                    fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
                    color: "rgba(250,246,238,0.78)",
                    lineHeight: 1.5,
                    fontWeight: 500,
                  }}>
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
            <div style={{ borderTop: "1px solid rgba(245,158,11,0.1)" }} />
          </div>

        </div>
      </section>

      {/* WHY NOW — hidden, preserved for later use */}

      {/* ═══════════════════════════════════════════════════════════════════
          APPLICATION FORM — cream, 3-step with progress indicator
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="apply" style={{ background: "#F5F0E8" }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-28">

          {/* Header */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="mb-12">
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: "#B45309", marginBottom: "10px" }}>
              Apply to Join
            </p>
            <h2 className="font-serif font-bold mb-3"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", lineHeight: 1.05, color: "#18150F" }}>
              Express your interest.<br />We&apos;ll take it from there.
            </h2>
            <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#6B5E4E" }}>
              Submit your details and we&apos;ll follow up with a short call to learn more about you and your work.
            </p>
          </motion.div>

          {submitted ? (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="py-16 text-center">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: "rgba(180,83,9,0.1)", border: "1px solid rgba(180,83,9,0.22)" }}>
                <CheckCircle2 size={26} style={{ color: "#B45309" }} />
              </div>
              <h3 className="font-serif font-bold mb-3" style={{ fontSize: "1.6rem", color: "#18150F" }}>
                You&apos;re in the queue.
              </h3>
              <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#6B5E4E", maxWidth: "26rem", margin: "0 auto" }}>
                We&apos;ll review your details and reach out within a few days to set up a short call. If it&apos;s a strong fit, we&apos;ll get you into the network.
              </p>
              <p style={{ fontSize: "12px", color: "rgba(107,94,78,0.45)", marginTop: "16px", fontStyle: "italic" }}>
                Selective, operator-led, and intentionally curated.
              </p>
            </motion.div>
          ) : (
            <div>
              {/* Progress indicator */}
              <div className="mb-8">
                <div className="flex items-center gap-0 mb-3">
                  {stepLabels.map((label, i) => (
                    <div key={i} className="flex items-center" style={{ flex: i < stepLabels.length - 1 ? 1 : "none" }}>
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300"
                          style={{
                            background: i < step ? "#B45309" : i === step ? "#18150F" : "transparent",
                            border: `1.5px solid ${i <= step ? (i < step ? "#B45309" : "#18150F") : "rgba(24,21,15,0.2)"}`,
                          }}>
                          {i < step ? (
                            <CheckCircle2 size={12} style={{ color: "#F5F0E8" }} />
                          ) : (
                            <span style={{ fontSize: "10px", fontWeight: 700, color: i === step ? "#F5F0E8" : "rgba(24,21,15,0.3)" }}>
                              {i + 1}
                            </span>
                          )}
                        </div>
                        <span style={{ fontSize: "11px", fontWeight: 600, color: i === step ? "#18150F" : i < step ? "#B45309" : "rgba(24,21,15,0.35)", whiteSpace: "nowrap" }}>
                          {label}
                        </span>
                      </div>
                      {i < stepLabels.length - 1 && (
                        <div className="flex-1 mx-3 h-px transition-all duration-500"
                          style={{ background: i < step ? "#B45309" : "rgba(24,21,15,0.15)", minWidth: "20px" }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{ minHeight: "420px" }}>
                  <AnimatePresence mode="wait" custom={direction}>

                    {/* ── Step 0: About You ── */}
                    {step === 0 && (
                      <motion.div key="step0" custom={direction} variants={stepVariants}
                        initial="enter" animate="center" exit="exit">
                        <div className="flex flex-col gap-4">
                          <div>
                            <label style={lbl}>Full Name *</label>
                            <LightInput {...register("fullName")} placeholder="Your full name" hasError={!!errors.fullName} />
                            {errors.fullName && <p style={fieldErr}>{errors.fullName.message}</p>}
                          </div>
                          <div>
                            <label style={lbl}>Work Email *</label>
                            <LightInput {...register("email")} type="email" placeholder="you@company.com" hasError={!!errors.email} />
                            {errors.email && <p style={fieldErr}>{errors.email.message}</p>}
                          </div>
                          <div>
                            <label style={lbl}>LinkedIn Profile *</label>
                            <LightInput {...register("linkedin")} placeholder="linkedin.com/in/yourname" hasError={!!errors.linkedin} />
                            {errors.linkedin && <p style={fieldErr}>{errors.linkedin.message}</p>}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* ── Step 1: Your Organization ── */}
                    {step === 1 && (
                      <motion.div key="step1" custom={direction} variants={stepVariants}
                        initial="enter" animate="center" exit="exit">
                        <div className="flex flex-col gap-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label style={lbl}>Company *</label>
                              <LightInput {...register("company")} placeholder="Company name" hasError={!!errors.company} />
                              {errors.company && <p style={fieldErr}>{errors.company.message}</p>}
                            </div>
                            <div>
                              <label style={lbl}>Role / Title *</label>
                              <LightInput {...register("role")} placeholder="CEO, COO, VP Ops…" hasError={!!errors.role} />
                              {errors.role && <p style={fieldErr}>{errors.role.message}</p>}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label style={lbl}>Company Size *</label>
                              <LightSelect {...register("companySize")} hasError={!!errors.companySize}>
                                <option value="">Select size</option>
                                {companySizes.map((s) => <option key={s} value={s}>{s}</option>)}
                              </LightSelect>
                              {errors.companySize && <p style={fieldErr}>{errors.companySize.message}</p>}
                            </div>
                            <div>
                              <label style={lbl}>Industry <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0, color: "#B0A090" }}>optional</span></label>
                              <LightInput {...register("industry")} placeholder="e.g. SaaS, Professional Services" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8 pt-6"
                  style={{ borderTop: "1px solid rgba(24,21,15,0.1)" }}>
                  {step > 0 ? (
                    <button type="button" onClick={goBack}
                      className="font-medium transition-colors duration-150"
                      style={{ fontSize: "14px", color: "rgba(24,21,15,0.45)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#18150F"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(24,21,15,0.45)"; }}>
                      ← Back
                    </button>
                  ) : <div />}

                  {step < 1 ? (
                    <button type="button" onClick={goNext}
                      className="inline-flex items-center gap-2 font-bold rounded-lg transition-all duration-200"
                      style={{ height: "46px", padding: "0 24px", fontSize: "14px", background: "#18150F", color: "#FAF6EE" }}
                      onMouseEnter={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.background = "#2D2820"; el.style.transform = "translateY(-1px)"; }}
                      onMouseLeave={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.background = "#18150F"; el.style.transform = "translateY(0)"; }}>
                      Continue <ArrowRight size={13} />
                    </button>
                  ) : (
                    <div className="flex flex-col items-end gap-3">
                      {serverError && <p style={{ fontSize: "12px", color: "#DC2626" }}>{serverError}</p>}
                      <button type="submit" disabled={loading}
                        className="inline-flex items-center gap-2 font-bold rounded-lg transition-all duration-200 disabled:opacity-50"
                        style={{ height: "50px", padding: "0 28px", fontSize: "14px", background: "#B45309", color: "#FAF6EE", boxShadow: "0 4px 18px rgba(180,83,9,0.22)" }}
                        onMouseEnter={(e) => { if (!loading) { const el = e.currentTarget as HTMLButtonElement; el.style.background = "#92400E"; el.style.transform = "translateY(-1px)"; el.style.boxShadow = "0 6px 24px rgba(180,83,9,0.32)"; } }}
                        onMouseLeave={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.background = "#B45309"; el.style.transform = "translateY(0)"; el.style.boxShadow = "0 4px 18px rgba(180,83,9,0.22)"; }}>
                        {loading ? "Submitting…" : <><span>Apply to Join</span><ArrowRight size={14} /></>}
                      </button>
                    </div>
                  )}
                </div>

                {/* Reassurance — shown on final step */}
                {step === 1 && (
                  <div className="mt-6 flex flex-col gap-1.5">
                    {[
                      "We'll follow up with a short call to learn more about you.",
                      "If it's a strong fit, we'll set up a meeting.",
                      "Selective, operator-led, and intentionally curated.",
                    ].map((line) => (
                      <p key={line} style={{ fontSize: "11.5px", color: "rgba(107,94,78,0.65)", display: "flex", alignItems: "center", gap: "7px" }}>
                        <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "rgba(180,83,9,0.4)", display: "inline-block", flexShrink: 0 }} />
                        {line}
                      </p>
                    ))}
                  </div>
                )}
              </form>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          WHAT HAPPENS NEXT — dark, horizontal process flow
      ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: "#0D0B08" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="mb-16">
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(245,158,11,0.45)", marginBottom: "10px" }}>
              What Happens Next
            </p>
            <h2 className="font-serif font-bold" style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", lineHeight: 1.1, color: "#FAF6EE" }}>
              After you apply.
            </h2>
          </motion.div>

          <div className="relative">
            {/* Connector line — desktop */}
            <div className="hidden lg:block absolute" aria-hidden="true"
              style={{ top: "20px", left: "calc(12.5% + 10px)", right: "calc(12.5% + 10px)", height: "1px", background: "linear-gradient(90deg, rgba(245,158,11,0.35), rgba(245,158,11,0.1) 50%, rgba(255,255,255,0.06))" }} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {nextSteps.map((step, i) => (
                <motion.div key={step.num} custom={i} initial="hidden" whileInView="show"
                  viewport={{ once: true, margin: "-30px" }} variants={fadeUp}
                  className="flex flex-col items-start lg:items-center lg:text-center">
                  {/* Step indicator */}
                  <div className="flex items-center justify-center w-10 h-10 rounded-full mb-5 shrink-0 relative z-10"
                    style={{
                      background: i === 0 ? "rgba(245,158,11,0.12)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${i === 0 ? "rgba(245,158,11,0.4)" : "rgba(255,255,255,0.1)"}`,
                    }}>
                    <span className="font-serif font-bold" style={{ fontSize: "12px", color: i === 0 ? "#f59e0b" : "rgba(255,255,255,0.25)", letterSpacing: "0.04em" }}>
                      {step.num}
                    </span>
                  </div>
                  <p style={{ fontSize: "14px", fontWeight: 700, color: "#FAF6EE", marginBottom: "7px", lineHeight: 1.3 }}>{step.label}</p>
                  <p style={{ fontSize: "12.5px", lineHeight: 1.65, color: "rgba(250,246,238,0.35)" }}>{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CROSS-LINK — not ready to apply? ═══ */}
      <section style={{ background: "#110F0B" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "32px" }}>
            <div>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "rgba(250,246,238,0.45)", marginBottom: "2px" }}>
                Not ready to apply?
              </p>
              <p style={{ fontSize: "13px", color: "rgba(250,246,238,0.25)" }}>
                Get early access to IMAGENN products while you explore.
              </p>
            </div>
            <Link href="/waitlist"
              className="shrink-0 inline-flex items-center gap-2 font-bold text-sm transition-colors duration-200"
              style={{ color: "rgba(245,158,11,0.6)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#f59e0b"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(245,158,11,0.6)"; }}>
              Join the Early Access Waitlist <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
