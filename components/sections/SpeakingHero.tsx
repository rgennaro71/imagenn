// components/sections/SpeakingHero.tsx
"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ElegantShape } from "@/components/ui/shape-landing-hero";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, delay: 0.15 + i * 0.14, ease: "easeOut" },
  }),
};

const trustTags = [
  "Keynote · Panel · Workshop · Fireside Chat · Executive Briefing",
  "AI Innovation · Digital Transformation · Future of Work · Operational Intelligence",
  "In-person & Virtual · Global Availability · Customized for Your Audience",
];

export function SpeakingHero() {
  return (
    <section
      className="relative pt-28 pb-24 overflow-hidden"
      style={{ background: "#090C17" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute right-[-10%] top-[-15%] w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)" }}
      />
      <div
        className="absolute left-[-5%] bottom-[-10%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)" }}
      />

      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <ElegantShape
          delay={0.3}
          width={520}
          height={120}
          rotate={-10}
          gradient="from-indigo-500/[0.1]"
          className="right-[-4%] top-[20%]"
        />
        <ElegantShape
          delay={0.5}
          width={260}
          height={62}
          rotate={18}
          gradient="from-violet-500/[0.08]"
          className="left-[3%] bottom-[18%]"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16 items-center">

          {/* Left — copy */}
          <div>
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-3 mb-9"
            >
              <span className="w-6 h-px" style={{ background: "#6366f1" }} />
              <span
                className="text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ color: "rgba(255,255,255,0.32)" }}
              >
                Public Speaking &amp; Executive Briefings
              </span>
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="font-serif font-bold leading-[1.05] tracking-tight mb-8"
              style={{ fontSize: "clamp(2.6rem, 5vw, 4rem)", color: "#F1F5F9" }}
            >
              Bring AI Clarity<br />
              <span style={{ color: "#818cf8" }}>to Your Stage.</span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-lg leading-relaxed mb-10 max-w-[520px]"
              style={{ color: "rgba(255,255,255,0.48)" }}
            >
              Rob brings a grounded, executive-level perspective on AI innovation,
              digital transformation, and organizational readiness — making complex
              ideas practical, strategic, and relevant for the leaders in your audience.
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-4 mb-12"
            >
              <a
                href="#booking"
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
                Book Rob to Speak
                <ArrowRight size={15} />
              </a>
              <a
                href="#topics"
                className="inline-flex items-center gap-2 h-12 px-8 rounded-lg font-semibold text-sm transition-all duration-200"
                style={{
                  color: "rgba(255,255,255,0.65)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.28)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.65)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.12)";
                }}
              >
                View Speaking Topics
              </a>
            </motion.div>

            {/* Trust bullets */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-3"
            >
              {trustTags.map((tag) => (
                <div key={tag} className="flex items-start gap-3">
                  <span
                    className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: "#6366f1" }}
                  />
                  <span className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.34)" }}>
                    {tag}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Speaker photo frame */}
          <motion.div
            initial={{ opacity: 0, x: 28, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.45, ease: "easeOut" }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Glow behind */}
              <div
                className="absolute -inset-8 rounded-3xl opacity-20 blur-3xl pointer-events-none"
                style={{ background: "linear-gradient(135deg, #6366f1, #7c3aed)" }}
              />

              {/* Photo frame */}
              <div
                className="relative rounded-2xl flex flex-col items-center justify-center overflow-hidden"
                style={{
                  aspectRatio: "3/4",
                  background: "linear-gradient(160deg, #0D1120 0%, #111628 100%)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {/* Corner accents */}
                {[
                  "top-5 left-5 border-t border-l",
                  "top-5 right-5 border-t border-r",
                  "bottom-5 left-5 border-b border-l",
                  "bottom-5 right-5 border-b border-r",
                ].map((pos, i) => (
                  <div
                    key={i}
                    className={`absolute w-7 h-7 ${pos}`}
                    style={{ borderColor: "rgba(99,102,241,0.35)" }}
                  />
                ))}

                {/* Center: orbital rings + monogram */}
                <div className="relative flex flex-col items-center justify-center py-12">
                  <div className="relative w-44 h-44 mb-7">
                    {/* Outer ring */}
                    <svg viewBox="0 0 176 176" className="absolute inset-0 w-full h-full opacity-20">
                      <circle cx="88" cy="88" r="84" stroke="#6366f1" strokeWidth="1" fill="none" />
                      <circle cx="88" cy="88" r="66" stroke="#818cf8" strokeWidth="1" fill="none" strokeDasharray="5 8" />
                      <circle cx="88" cy="88" r="48" stroke="#6366f1" strokeWidth="1" fill="none" />
                    </svg>
                    {/* Monogram center */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        className="font-serif font-bold select-none"
                        style={{ fontSize: "5rem", color: "rgba(99,102,241,0.25)" }}
                      >
                        R
                      </span>
                    </div>
                  </div>

                  <p
                    className="text-xs uppercase tracking-[0.25em] text-center"
                    style={{ color: "rgba(255,255,255,0.16)" }}
                  >
                    Speaker Photo
                  </p>
                  <p
                    className="text-xs mt-1 text-center"
                    style={{ color: "rgba(255,255,255,0.1)" }}
                  >
                    Coming soon
                  </p>
                </div>

                {/* Bottom fade */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
                  style={{ background: "linear-gradient(to top, #0D1120, transparent)" }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
