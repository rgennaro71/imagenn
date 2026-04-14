// components/shared/InsightCard.tsx
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface InsightCardProps {
  category: string;
  title: string;
  description: string;
  readTime: string;
  slug: string;
  theme?: "dark" | "light";
}

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  "Strategy": { bg: "rgba(99,102,241,0.08)", text: "#6366f1", border: "rgba(99,102,241,0.18)" },
  "Automation": { bg: "rgba(16,185,129,0.08)", text: "#059669", border: "rgba(16,185,129,0.18)" },
  "AI Readiness": { bg: "rgba(245,158,11,0.08)", text: "#d97706", border: "rgba(245,158,11,0.18)" },
};

export function InsightCard({ category, title, description, readTime, slug, theme = "dark" }: InsightCardProps) {
  const isLight = theme === "light";
  const catStyle = categoryColors[category] ?? { bg: "rgba(99,102,241,0.08)", text: "#6366f1", border: "rgba(99,102,241,0.18)" };

  if (isLight) {
    return (
      <Link
        href={`/insights/${slug}`}
        className="group block p-6 rounded-2xl transition-all duration-300"
        style={{
          background: "#FFFFFF",
          border: "1px solid rgba(15,23,42,0.07)",
          boxShadow: "0 1px 4px rgba(15,23,42,0.06), 0 8px 24px rgba(15,23,42,0.05)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 16px rgba(15,23,42,0.08), 0 20px 48px rgba(99,102,241,0.07)";
          (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 1px 4px rgba(15,23,42,0.06), 0 8px 24px rgba(15,23,42,0.05)";
          (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
        }}
      >
        <div className="flex items-center justify-between mb-5">
          <span
            className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
            style={{
              background: catStyle.bg,
              border: `1px solid ${catStyle.border}`,
              color: catStyle.text,
            }}
          >
            {category}
          </span>
          <span className="text-xs" style={{ color: "#94A3B8" }}>{readTime}</span>
        </div>
        <h3 className="font-sans font-semibold text-base leading-snug mb-3 transition-colors duration-200" style={{ color: "#0F172A" }}>
          {title}
        </h3>
        <p className="text-sm leading-relaxed mb-5" style={{ color: "#64748B" }}>{description}</p>
        <span
          className="inline-flex items-center gap-1.5 text-xs font-semibold group-hover:gap-3 transition-all duration-200"
          style={{ color: catStyle.text }}
        >
          Read more <ArrowRight size={12} />
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={`/insights/${slug}`}
      className="group block p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "linear-gradient(145deg, rgba(17,20,40,0.8), rgba(13,16,32,0.8))",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 2px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(99,102,241,0.25)";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 40px rgba(0,0,0,0.5), 0 0 24px rgba(99,102,241,0.08), inset 0 1px 0 rgba(255,255,255,0.06)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.07)";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 2px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)";
      }}
    >
      <div className="flex items-center justify-between mb-5">
        <span
          className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
          style={{
            background: catStyle.bg,
            border: `1px solid ${catStyle.border}`,
            color: theme === "dark" ? (catStyle.text === "#6366f1" ? "#a78bfa" : catStyle.text) : catStyle.text,
          }}
        >
          {category}
        </span>
        <span className="text-xs text-slate-muted">{readTime}</span>
      </div>
      <h3 className="font-sans font-semibold text-base text-slate-primary mb-3 leading-snug group-hover:text-white transition-colors duration-200">
        {title}
      </h3>
      <p className="text-sm text-slate-muted leading-relaxed mb-5">{description}</p>
      <span
        className="inline-flex items-center gap-1.5 text-xs font-semibold group-hover:gap-3 transition-all duration-200"
        style={{ color: "#818cf8" }}
      >
        Read more <ArrowRight size={12} />
      </span>
    </Link>
  );
}
