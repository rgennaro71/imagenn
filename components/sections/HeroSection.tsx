// components/sections/HeroSection.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Circle, Sparkles } from "lucide-react";
// ArrowRight used in waitlist link
import { ElegantShape } from "@/components/ui/shape-landing-hero";
import { ContactModal } from "@/components/shared/ContactModal";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: 0.4 + i * 0.18,
      ease: "easeOut",
    },
  }),
};

const headlines = [
  // Variant 0 — current
  {
    line1: "Modernize How Your Business",
    line2: "Thinks.",
    line1Class: "bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80",
    line2Class: "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-violet-300",
  },
  // Variant 1 — new
  {
    line1: "Ship AI That Actually Works.",
    line2: "Lead the Shift. Don\u2019t Chase It.",
    line1Class: "bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80",
    line2Class: "bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-white/90 to-indigo-300",
  },
] as const;

export function HeroSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIntent, setModalIntent] = useState<"call" | "message">("call");
  const [headlineIdx, setHeadlineIdx] = useState(0);

  useEffect(() => {
    setHeadlineIdx(Math.floor(Math.random() * headlines.length));
  }, []);

  const hl = headlines[headlineIdx];

  const openModal = (intent: "call" | "message") => {
    setModalIntent(intent);
    setModalOpen(true);
  };

  return (
    <>
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303] pt-20">

        {/* Ambient background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.07] via-transparent to-violet-500/[0.05] blur-3xl pointer-events-none" />

        {/* Floating geometric shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <ElegantShape
            delay={0.3}
            width={580}
            height={140}
            rotate={12}
            gradient="from-indigo-500/[0.18]"
            className="left-[-8%] md:left-[-3%] top-[18%] md:top-[22%]"
          />
          <ElegantShape
            delay={0.5}
            width={480}
            height={115}
            rotate={-15}
            gradient="from-violet-500/[0.14]"
            className="right-[-4%] md:right-[1%] top-[68%] md:top-[72%]"
          />
          <ElegantShape
            delay={0.4}
            width={290}
            height={75}
            rotate={-8}
            gradient="from-indigo-400/[0.12]"
            className="left-[5%] md:left-[8%] bottom-[8%] md:bottom-[12%]"
          />
          <ElegantShape
            delay={0.6}
            width={190}
            height={55}
            rotate={20}
            gradient="from-violet-400/[0.12]"
            className="right-[16%] md:right-[22%] top-[10%] md:top-[14%]"
          />
          <ElegantShape
            delay={0.7}
            width={140}
            height={38}
            rotate={-25}
            gradient="from-indigo-300/[0.1]"
            className="left-[22%] md:left-[28%] top-[6%] md:top-[9%]"
          />
        </div>

        {/* Top-bottom vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(3,3,3,0.7) 0%, transparent 25%, transparent 75%, rgba(3,3,3,0.9) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-28">

          {/* Badge */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-10 mx-auto"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.09)",
            }}
          >
            <Circle className="h-2 w-2 fill-indigo-400" style={{ color: "transparent" }} />
            <span className="text-sm font-medium tracking-wide" style={{ color: "rgba(255,255,255,0.55)" }}>
              AI Innovation & Automation
            </span>
          </motion.div>

          {/* H1 */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.04] mb-8">
              <span className={hl.line1Class}>{hl.line1}</span>
              <br />
              <span className={hl.line2Class}>{hl.line2}</span>
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <p
              className="text-lg sm:text-xl font-light leading-relaxed tracking-wide max-w-2xl mx-auto mb-12"
              style={{ color: "rgba(255,255,255,0.42)" }}
            >
              We help ambitious organizations eliminate operational friction,
              automate what slows them down, and build the AI-powered foundation
              their next stage of growth demands.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center mb-8"
          >
            <button
              onClick={() => openModal("call")}
              className="h-13 px-10 text-base font-semibold text-white rounded-xl transition-all duration-200"
              style={{
                background: "#6366f1",
                boxShadow: "0 2px 12px rgba(99,102,241,0.45), 0 8px 28px rgba(0,0,0,0.4)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#5558e8";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(99,102,241,0.55), 0 12px 36px rgba(0,0,0,0.4)";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#6366f1";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 2px 12px rgba(99,102,241,0.45), 0 8px 28px rgba(0,0,0,0.4)";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              }}
            >
              Book a Strategy Call
            </button>
          </motion.div>

          {/* Waitlist link */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center gap-3"
          >
            <div className="h-px w-8" style={{ background: "rgba(245,158,11,0.4)" }} />
            <a
              href="#waitlist"
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200 group"
              style={{ color: "#f59e0b" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#fbbf24"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#f59e0b"; }}
            >
              <Sparkles size={13} />
              Join the product waitlist
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </a>
            <div className="h-px w-8" style={{ background: "rgba(245,158,11,0.4)" }} />
          </motion.div>

          {/* Trust line */}
          <motion.p
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-sm mt-8"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            Trusted by founders, CEOs, and operations leaders building the next chapter of their organization.
          </motion.p>
        </div>
      </section>

      <ContactModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultIntent={modalIntent}
      />
    </>
  );
}
