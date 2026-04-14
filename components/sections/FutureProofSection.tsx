// components/sections/FutureProofSection.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FutureProofSection() {
  return (
    <section
      className="relative section-padding overflow-hidden"
      style={{ background: "#090C17" }}
    >
      {/* Radial vignette — subtle depth only */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 70% at 50% 100%, rgba(99,102,241,0.07) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      {/* Top/bottom rules */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "rgba(255,255,255,0.05)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "rgba(255,255,255,0.04)" }}
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative content-width px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-muted mb-6 inline-flex items-center gap-2">
          <span className="w-1 h-1 rounded-full inline-block" style={{ background: "#6366f1" }} />
          The Stakes
        </p>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-slate-primary leading-[1.08] tracking-tight mb-8">
          The organizations winning the next decade aren't waiting for the right moment.{" "}
          <span style={{ color: "#818cf8" }}>They're building it.</span>
        </h2>
        <p className="text-lg text-slate-secondary leading-[1.75] mb-12 max-w-2xl mx-auto">
          IMAGENN.AI exists to help ambitious organizations get ahead of change — not react to it.
          The tools, the strategy, the execution. All of it, built around what your organization
          actually needs to move forward.
        </p>
        <Link
          href="/contact"
          className={cn(
            buttonVariants({ size: "lg" }),
            "relative h-13 px-10 text-base font-semibold text-white overflow-hidden group"
          )}
          style={{
            background: "#6366f1",
            boxShadow: "0 2px 8px rgba(99,102,241,0.4), 0 8px 24px rgba(0,0,0,0.4)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "#5558e8";
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 16px rgba(99,102,241,0.5), 0 12px 32px rgba(0,0,0,0.4)";
            (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "#6366f1";
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 2px 8px rgba(99,102,241,0.4), 0 8px 24px rgba(0,0,0,0.4)";
            (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
          }}
        >
          Start Your Transformation →
        </Link>
      </motion.div>
    </section>
  );
}
