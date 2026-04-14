// components/shared/ProcessStep.tsx
"use client";

import { motion } from "framer-motion";

interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  outcome: string;
  isLast?: boolean;
  index?: number;
}

export function ProcessStep({ number, title, description, outcome, isLast, index = 0 }: ProcessStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col items-start"
    >
      {/* Connector line between steps */}
      {!isLast && (
        <div
          className="hidden lg:block absolute top-6 left-full w-full h-px -translate-y-px z-0"
          style={{
            background: "linear-gradient(90deg, rgba(99,102,241,0.3) 0%, rgba(99,102,241,0.05) 100%)",
            width: "calc(100% - 2px)",
          }}
          aria-hidden="true"
        />
      )}

      {/* Step number — large decorative */}
      <div className="relative z-10 mb-5">
        <span
          className="font-serif text-7xl font-bold leading-none select-none"
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(34,211,238,0.1))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.03em",
          }}
        >
          {number}
        </span>
      </div>

      <h3 className="font-sans font-bold text-xl text-slate-primary mb-3">{title}</h3>
      <p className="text-sm text-slate-secondary leading-relaxed mb-5">{description}</p>

      <div
        className="w-full p-3 rounded-lg"
        style={{
          background: "rgba(16,185,129,0.07)",
          border: "1px solid rgba(16,185,129,0.18)",
        }}
      >
        <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#34d399" }}>
          Outcome
        </p>
        <p className="text-xs text-slate-muted leading-relaxed">{outcome}</p>
      </div>
    </motion.div>
  );
}
