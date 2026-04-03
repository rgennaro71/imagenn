// components/sections/ProblemSection.tsx
import { AlertCircle, Layers, Hand, Clock, Lightbulb, GitMerge } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";

const problems = [
  {
    icon: Layers,
    title: "Legacy Infrastructure Mindset",
    description: "Outdated systems and thinking patterns holding back modern execution.",
  },
  {
    icon: GitMerge,
    title: "Disconnected Tools & Data",
    description: "Teams working in silos, decisions made without the full picture.",
  },
  {
    icon: Hand,
    title: "Manual Everything",
    description: "High-value people spending their time on low-value, repetitive work.",
  },
  {
    icon: Clock,
    title: "Slow Decision-Making",
    description: "Missing the window to act because insight arrives too late.",
  },
  {
    icon: Lightbulb,
    title: "Innovation Paralysis",
    description: "Knowing AI matters but having no clear path to start with confidence.",
  },
  {
    icon: AlertCircle,
    title: "Operational Friction",
    description: "Bottlenecks that compound — slowing every team, every quarter.",
  },
];

export function ProblemSection() {
  return (
    <section className="section-padding bg-obsidian">
      <div className="content-width">
        <SectionHeader
          eyebrow="The Challenge"
          heading="Your Organization Deserves Better Than This."
          subheading="Most organizations are running on systems, processes, and mindsets built for a world that no longer exists."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group p-6 rounded-lg bg-obsidian-surface subtle-border hover:glow-border hover:bg-obsidian-elevated transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-md bg-red-500/10 flex items-center justify-center mb-4">
                <Icon size={20} className="text-red-400" />
              </div>
              <h3 className="font-sans font-semibold text-base text-slate-primary mb-2">{title}</h3>
              <p className="text-sm text-slate-muted leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
