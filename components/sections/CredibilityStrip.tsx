// components/sections/CredibilityStrip.tsx
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
    <section className="bg-obsidian-secondary border-y border-white/5">
      <div className="content-width px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-muted mb-4">
              Who We Help
            </p>
            <div className="flex flex-wrap gap-2">
              {audiences.map((a) => (
                <span
                  key={a}
                  className="text-sm text-slate-secondary px-3 py-1 rounded-full subtle-border bg-obsidian-surface"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-muted mb-4">
              Core Capabilities
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {capabilities.map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-start gap-2">
                  <div className="w-8 h-8 rounded-md bg-indigo/10 flex items-center justify-center">
                    <Icon size={16} className="text-indigo-light" />
                  </div>
                  <span className="text-sm text-slate-secondary leading-snug">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {siteConfig.showStats && (
          <div className="grid grid-cols-3 gap-8 mt-10 pt-10 border-t border-white/5">
            <div className="text-center">
              <p className="font-serif text-3xl font-bold text-gradient mb-1">
                {siteConfig.stats.organizationsServed}
              </p>
              <p className="text-sm text-slate-muted">Organizations Served</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-3xl font-bold text-gradient mb-1">
                {siteConfig.stats.automationsDeployed}
              </p>
              <p className="text-sm text-slate-muted">Automations Deployed</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-3xl font-bold text-gradient mb-1">
                {siteConfig.stats.avgEfficiencyGains}
              </p>
              <p className="text-sm text-slate-muted">Avg. Efficiency Gains</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
