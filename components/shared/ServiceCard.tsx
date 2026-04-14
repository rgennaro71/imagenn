// components/shared/ServiceCard.tsx
"use client";

import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  variant?: "lead" | "secondary";
  theme?: "dark" | "light";
}

export function ServiceCard({ icon: Icon, title, description, href, variant = "secondary", theme = "dark" }: ServiceCardProps) {
  const isLight = theme === "light";

  if (variant === "lead") {
    if (isLight) {
      return (
        <Link
          href={href}
          className="group block p-7 rounded-2xl transition-all duration-300"
          style={{
            background: "#FFFFFF",
            border: "1px solid rgba(15,23,42,0.07)",
            boxShadow: "0 1px 4px rgba(15,23,42,0.06), 0 8px 24px rgba(15,23,42,0.05)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 16px rgba(15,23,42,0.08), 0 20px 48px rgba(99,102,241,0.08)";
            (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 1px 4px rgba(15,23,42,0.06), 0 8px 24px rgba(15,23,42,0.05)";
            (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
          }}
        >
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
            style={{
              background: "rgba(99,102,241,0.08)",
              border: "1px solid rgba(99,102,241,0.15)",
            }}
          >
            <Icon size={20} style={{ color: "#6366f1" }} />
          </div>
          <h3 className="font-sans font-semibold text-[1.05rem] leading-snug mb-3" style={{ color: "#0F172A" }}>
            {title}
          </h3>
          {description && (
            <p className="text-sm leading-relaxed mb-5" style={{ color: "#64748B" }}>{description}</p>
          )}
          <span
            className="inline-flex items-center gap-1.5 text-xs font-semibold group-hover:gap-3 transition-all duration-200"
            style={{ color: "#6366f1" }}
          >
            Learn more <ArrowRight size={12} />
          </span>
        </Link>
      );
    }

    return (
      <Link
        href={href}
        className="group block p-7 rounded-2xl transition-all duration-300"
        style={{
          background: "linear-gradient(145deg, #111826, #0D1120)",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 2px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(99,102,241,0.3)";
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 40px rgba(0,0,0,0.5), 0 0 32px rgba(99,102,241,0.1), inset 0 1px 0 rgba(255,255,255,0.06)";
          (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.07)";
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 2px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)";
          (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
        }}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.22), rgba(99,102,241,0.07))",
            border: "1px solid rgba(99,102,241,0.22)",
          }}
        >
          <Icon size={22} className="text-indigo-light" />
        </div>
        <h3 className="font-sans font-semibold text-[1.05rem] text-slate-primary mb-3 leading-snug">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-slate-muted leading-relaxed mb-5">{description}</p>
        )}
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-light group-hover:gap-3 transition-all duration-200">
          Learn more <ArrowRight size={12} />
        </span>
      </Link>
    );
  }

  // Secondary variant
  if (isLight) {
    return (
      <Link
        href={href}
        className="group flex flex-col items-start p-4 rounded-xl transition-all duration-200"
        style={{
          background: "#FFFFFF",
          border: "1px solid rgba(15,23,42,0.07)",
          boxShadow: "0 1px 3px rgba(15,23,42,0.05)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(99,102,241,0.2)";
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 16px rgba(99,102,241,0.08)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(15,23,42,0.07)";
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 1px 3px rgba(15,23,42,0.05)";
        }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110"
          style={{
            background: "rgba(99,102,241,0.07)",
            border: "1px solid rgba(99,102,241,0.12)",
          }}
        >
          <Icon size={15} style={{ color: "#6366f1" }} />
        </div>
        <h3 className="font-sans font-semibold text-sm leading-snug" style={{ color: "#0F172A" }}>
          {title}
        </h3>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group flex flex-col items-start p-5 rounded-xl transition-all duration-300"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.background = "rgba(99,102,241,0.06)";
        (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(99,102,241,0.2)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.03)";
        (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.06)";
      }}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110"
        style={{
          background: "linear-gradient(135deg, rgba(99,102,241,0.18), rgba(99,102,241,0.06))",
          border: "1px solid rgba(99,102,241,0.18)",
        }}
      >
        <Icon size={16} className="text-indigo-light" />
      </div>
      <h3 className="font-sans font-semibold text-sm text-slate-primary group-hover:text-slate-primary transition-colors leading-snug">
        {title}
      </h3>
    </Link>
  );
}
