// components/sections/SpeakingInteractive.tsx
"use client";

import { ArrowRight, Download } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

// ─── Topic cards with hover ──────────────────────────────────────────────────

interface Topic {
  number: string;
  title: string;
  description: string;
  audience: string;
  tags: string[];
}

export function TopicCard({ topic }: { topic: Topic }) {
  return (
    <div
      className="group flex gap-5 rounded-xl p-7 transition-all duration-200 cursor-default"
      style={{
        background: "#111628",
        border: "1px solid rgba(255,255,255,0.05)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(99,102,241,0.2)";
        (e.currentTarget as HTMLDivElement).style.background = "#141930";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.05)";
        (e.currentTarget as HTMLDivElement).style.background = "#111628";
      }}
    >
      <span className="font-serif text-2xl font-bold opacity-40 shrink-0 mt-0.5" style={{ color: "#6366f1" }}>
        {topic.number}
      </span>
      <div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {topic.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-semibold px-2 py-0.5 rounded"
              style={{ background: "rgba(99,102,241,0.1)", color: "#818cf8" }}
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-sans font-semibold text-base mb-2.5 leading-snug" style={{ color: "#E2E8F0" }}>
          {topic.title}
        </h3>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.38)" }}>
          {topic.description}
        </p>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
          Ideal for: {topic.audience}
        </p>
      </div>
    </div>
  );
}

// ─── Primary CTA anchor ──────────────────────────────────────────────────────

export function CTAPrimary({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
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
      {children}
    </a>
  );
}

export function CTAGhost({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 h-12 px-8 rounded-lg font-semibold text-sm transition-all duration-200"
      style={{ color: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.12)" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
        (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.28)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.65)";
        (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.12)";
      }}
    >
      {children}
    </a>
  );
}

// ─── Mid-page secondary CTA block ────────────────────────────────────────────

export function SecondaryCTA() {
  return (
    <div className="flex flex-wrap lg:justify-end gap-4">
      <a
        href="#booking"
        className="inline-flex items-center gap-2.5 h-12 px-8 rounded-lg font-semibold text-sm transition-all duration-200"
        style={{ background: "#FFFFFF", color: "#312E81" }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.background = "#EEF2FF";
          (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.background = "#FFFFFF";
          (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
        }}
      >
        Inquire About Availability
        <ArrowRight size={15} />
      </a>
      <a
        href="#faq"
        className="inline-flex items-center gap-2 h-12 px-8 rounded-lg font-semibold text-sm transition-all duration-200"
        style={{ color: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.15)" }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
          (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.3)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.65)";
          (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.15)";
        }}
      >
        Common Questions
      </a>
    </div>
  );
}

// ─── Speaker kit bar ─────────────────────────────────────────────────────────

export function SpeakerKitBar() {
  return (
    <div className="flex flex-wrap gap-3 shrink-0">
      <a
        href="#booking"
        className="inline-flex items-center gap-2 h-11 px-7 rounded-lg font-semibold text-sm text-white transition-all duration-200"
        style={{ background: "#312E81" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#3730a3"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#312E81"; }}
      >
        <Download size={14} />
        Request Speaker Kit
      </a>
      <a
        href={siteConfig.calendlyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 h-11 px-7 rounded-lg font-semibold text-sm transition-all duration-200"
        style={{ color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
          (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.22)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.6)";
          (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.1)";
        }}
      >
        Book a Discovery Call
      </a>
    </div>
  );
}
