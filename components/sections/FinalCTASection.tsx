// components/sections/FinalCTASection.tsx
"use client";

import { motion } from "framer-motion";
import { ContactForm } from "@/components/forms/ContactForm";
import { Shield, CalendarDays, Clock } from "lucide-react";

const trustPoints = [
  { icon: CalendarDays, text: "Strategy calls are 30–45 min, no hard sell" },
  { icon: Clock, text: "We respond within 1 business day" },
  { icon: Shield, text: "No commitment required" },
];

export function FinalCTASection() {
  return (
    <section
      className="relative section-padding overflow-hidden"
      style={{ background: "#090C17" }}
    >
      {/* Ambient top glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(99,102,241,0.08) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      {/* Top rule */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "rgba(255,255,255,0.05)" }}
        aria-hidden="true"
      />

      <div className="relative content-width px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — copy + trust */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:sticky lg:top-32"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-muted mb-6 inline-flex items-center gap-2">
              <span className="w-1 h-1 rounded-full inline-block" style={{ background: "#6366f1" }} />
              Get Started
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-primary leading-[1.08] tracking-tight mb-6">
              Ready to Modernize How Your Organization Works?
            </h2>
            <p className="text-lg text-slate-secondary leading-[1.75] mb-12">
              Whether you're ready to start or still working out where to begin — let's talk.
              A strategy conversation costs nothing. The status quo costs everything.
            </p>

            <ul className="flex flex-col gap-5">
              {trustPoints.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-4">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      background: "rgba(99,102,241,0.1)",
                      border: "1px solid rgba(99,102,241,0.18)",
                    }}
                  >
                    <Icon size={15} className="text-indigo-light" />
                  </div>
                  <span className="text-sm text-slate-secondary">{text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right — light form card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="p-8 rounded-2xl"
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(15,23,42,0.08)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
