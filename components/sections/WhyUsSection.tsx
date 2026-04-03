// components/sections/WhyUsSection.tsx
import { Target, Rocket, Wrench, Building2, Palette, TrendingUp } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";

const differentiators = [
  {
    icon: Target,
    title: "Business-First, Not Tech Theater",
    description: "Every engagement starts with business outcomes, not technology. If AI doesn't move the needle, we don't build it.",
  },
  {
    icon: Rocket,
    title: "Execution-Focused",
    description: "We bridge strategy and implementation. You don't get a deck — you get results.",
  },
  {
    icon: Wrench,
    title: "Practical AI, Not Hype",
    description: "We deploy AI that works in your organization today, not theoretical solutions for a hypothetical future.",
  },
  {
    icon: Building2,
    title: "Operational Depth",
    description: "We understand how organizations actually run — the processes, the friction, the people. That's where transformation happens.",
  },
  {
    icon: Palette,
    title: "Modern UX + Process Thinking",
    description: "We build AI tools your teams actually want to use. Adoption is part of the design.",
  },
  {
    icon: TrendingUp,
    title: "Scalable from Day One",
    description: "Everything we build is designed to grow with your organization, not become tomorrow's legacy problem.",
  },
];

export function WhyUsSection() {
  return (
    <section className="section-padding bg-obsidian-secondary">
      <div className="content-width">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="lg:sticky lg:top-32">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-muted mb-4">
              Why IMAGENN.AI
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-primary leading-tight tracking-tight mb-6">
              We Build for Real Impact.{" "}
              <span className="text-gradient">Not for the Demo.</span>
            </h2>
            <p className="text-lg text-slate-secondary leading-relaxed">
              Most AI engagements end at strategy. We start there and go all the way to
              implementation, adoption, and scale — because that's where organizations actually change.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {differentiators.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="p-5 rounded-lg bg-obsidian-surface subtle-border hover:glow-border transition-all duration-200"
              >
                <div className="w-9 h-9 rounded-md bg-indigo/10 flex items-center justify-center mb-3">
                  <Icon size={18} className="text-indigo-light" />
                </div>
                <h3 className="font-sans font-semibold text-sm text-slate-primary mb-2">{title}</h3>
                <p className="text-sm text-slate-muted leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
