// components/shared/UseCaseCard.tsx
"use client";

import { AlertCircle, Lightbulb, TrendingUp } from "lucide-react";

interface UseCaseCardProps {
  problem: string;
  solution: string;
  impact: string;
  theme?: "dark" | "light";
}

export function UseCaseCard({ problem, solution, impact, theme = "dark" }: UseCaseCardProps) {
  const isLight = theme === "light";

  if (isLight) {
    return (
      <div
        className="p-6 rounded-2xl flex flex-col gap-4 transition-all duration-300 cursor-default"
        style={{
          background: "#FFFFFF",
          border: "1px solid rgba(15,23,42,0.07)",
          boxShadow: "0 1px 4px rgba(15,23,42,0.06), 0 8px 24px rgba(15,23,42,0.05)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(15,23,42,0.08), 0 20px 48px rgba(99,102,241,0.07)";
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 4px rgba(15,23,42,0.06), 0 8px 24px rgba(15,23,42,0.05)";
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        }}
      >
        <div className="flex gap-3">
          <AlertCircle size={15} style={{ color: "#ef4444" }} className="shrink-0 mt-0.5" />
          <p className="text-sm leading-relaxed" style={{ color: "#334155" }}>{problem}</p>
        </div>
        <div
          className="h-px"
          style={{ background: "rgba(15,23,42,0.06)" }}
        />
        <div className="flex gap-3">
          <Lightbulb size={15} style={{ color: "#6366f1" }} className="shrink-0 mt-0.5" />
          <p className="text-sm leading-relaxed" style={{ color: "#334155" }}>{solution}</p>
        </div>
        <div className="flex gap-3">
          <TrendingUp size={15} style={{ color: "#059669" }} className="shrink-0 mt-0.5" />
          <p className="text-sm leading-relaxed" style={{ color: "#64748B" }}>{impact}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="p-6 rounded-2xl flex flex-col gap-4 transition-all duration-300 cursor-default group"
      style={{
        background: "linear-gradient(145deg, rgba(17,20,40,0.7), rgba(13,16,32,0.7))",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 2px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(99,102,241,0.2)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-1px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 28px rgba(0,0,0,0.5), 0 0 16px rgba(99,102,241,0.07), inset 0 1px 0 rgba(255,255,255,0.05)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)";
      }}
    >
      <div className="flex gap-3">
        <AlertCircle size={15} className="text-red-400 shrink-0 mt-0.5" />
        <p className="text-sm text-slate-secondary leading-relaxed">{problem}</p>
      </div>
      <div
        className="h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)" }}
      />
      <div className="flex gap-3">
        <Lightbulb size={15} className="text-indigo-light shrink-0 mt-0.5" />
        <p className="text-sm text-slate-secondary leading-relaxed">{solution}</p>
      </div>
      <div className="flex gap-3">
        <TrendingUp size={15} className="text-cyan-brand shrink-0 mt-0.5" />
        <p className="text-sm text-slate-muted leading-relaxed">{impact}</p>
      </div>
    </div>
  );
}
