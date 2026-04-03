// components/sections/SpeakingSection.tsx
"use client";

import Link from "next/link";
import { Mic, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const expertiseTags = [
  "AI Innovation", "Digital Transformation", "Future of Work",
  "Operational Intelligence", "AI Adoption & Change", "Business Modernization",
];

const topics = [
  "How Organizations Can Move Beyond Legacy Thinking",
  "Practical AI: What Works, What Doesn't, and What's Next",
  "The Automation Imperative for Mid-Market Companies",
  "Building an AI-Ready Organization",
  "AI and the Future of Operations",
];

export function SpeakingSection() {
  return (
    <section className="section-padding bg-obsidian-secondary">
      <div className="content-width">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center mb-6">
              <Mic size={24} className="text-yellow-400" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-muted mb-4">
              Speaking & Panels
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-primary leading-tight tracking-tight mb-6">
              Bring AI Innovation to Your Stage.
            </h2>
            <p className="text-lg text-slate-secondary leading-relaxed mb-8">
              {siteConfig.founder.firstName} is a sought-after voice on AI innovation,
              digital transformation, and the future of how organizations work — bringing
              practical insight to panels, keynotes, and executive briefings.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {expertiseTags.map((tag) => (
                <span key={tag} className="text-xs font-medium px-3 py-1.5 rounded-full subtle-border bg-obsidian-surface text-slate-secondary">
                  {tag}
                </span>
              ))}
            </div>

            <Link
              href="/speaking"
              className={cn(
                buttonVariants(),
                "bg-indigo hover:bg-indigo-dark text-white font-semibold inline-flex items-center gap-2"
              )}
            >
              Invite {siteConfig.founder.firstName} to Speak
              <ArrowRight size={16} />
            </Link>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-muted mb-5">Topics</p>
            <ul className="flex flex-col gap-3">
              {topics.map((topic, i) => (
                <li key={topic} className="flex items-start gap-4 p-4 rounded-lg bg-obsidian-surface subtle-border">
                  <span
                    className="text-xs font-bold shrink-0 mt-0.5"
                    style={{ background: "linear-gradient(90deg,#818cf8,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-slate-secondary">{topic}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
