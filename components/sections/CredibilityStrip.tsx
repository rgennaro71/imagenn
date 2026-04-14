// components/sections/CredibilityStrip.tsx
"use client";

import { motion } from "framer-motion";
import { Brain, Zap, Settings, BarChart3 } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const audiences = [
  "Founders", "CEOs", "COOs", "Innovation Leaders", "Operations Teams", "Transformation Leaders",
];

const capabilities = [
  { icon: Brain, label: "AI Strategy & Roadmapping" },
  { icon: Zap, label: "Workflow Automation" },
  { icon: Settings, label: "Operational Transformation" },
  { icon: BarChart3, label: "AI-Powered Decision Support" },
];

export function CredibilityStrip() {
  return (
    <section
      className="relative"
      style={{
        background: "#090C17",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div className="content-width px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_2fr] gap-10 items-stretch">

          {/* Who we help */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-muted mb-5">
              Who We Help
            </p>
            <div className="flex flex-wrap gap-2">
              {audiences.map((a) => (
                <span
                  key={a}
                  className="text-sm text-slate-secondary px-3 py-1.5 rounded-full transition-colors duration-200 hover:text-slate-primary cursor-default"
                  style={{
                    border: "1px solid rgba(255,255,255,0.07)",
                    background: "rgba(255,255,255,0.03)",
                  }}
                >
                  {a}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Vertical divider */}
          <div
            className="hidden lg:block w-px self-stretch"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(99,102,241,0.15), transparent)" }}
          />

          {/* Capabilities */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-muted mb-5">
              Core Capabilities
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              {capabilities.map(({ icon: Icon, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-start gap-3 group cursor-default"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: "rgba(99,102,241,0.1)",
                      border: "1px solid rgba(99,102,241,0.18)",
                    }}
                  >
                    <Icon size={16} className="text-indigo-light" />
                  </div>
                  <span className="text-sm text-slate-secondary leading-snug group-hover:text-slate-primary transition-colors duration-200">
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {siteConfig.showStats && (
          <div
            className="grid grid-cols-3 gap-8 mt-12 pt-12"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
          >
            {[
              { value: siteConfig.stats.organizationsServed, label: "Organizations Served" },
              { value: siteConfig.stats.automationsDeployed, label: "Automations Deployed" },
              { value: siteConfig.stats.avgEfficiencyGains, label: "Avg. Efficiency Gains" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="font-serif text-3xl font-bold text-slate-primary mb-1">{value}</p>
                <p className="text-sm text-slate-muted">{label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
