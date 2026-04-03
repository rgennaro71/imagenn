// components/shared/UseCaseCard.tsx
import { AlertCircle, Lightbulb, TrendingUp } from "lucide-react";

interface UseCaseCardProps {
  problem: string;
  solution: string;
  impact: string;
}

export function UseCaseCard({ problem, solution, impact }: UseCaseCardProps) {
  return (
    <div className="p-6 rounded-lg bg-obsidian-surface subtle-border hover:glow-border hover:bg-obsidian-elevated transition-all duration-200 flex flex-col gap-4">
      <div className="flex gap-3">
        <AlertCircle size={15} className="text-red-400 shrink-0 mt-0.5" />
        <p className="text-sm text-slate-secondary leading-relaxed">{problem}</p>
      </div>
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
