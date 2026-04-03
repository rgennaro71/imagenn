// components/shared/InsightCard.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface InsightCardProps {
  category: string;
  title: string;
  description: string;
  readTime: string;
  slug: string;
}

export function InsightCard({ category, title, description, readTime, slug }: InsightCardProps) {
  return (
    <Link
      href={`/insights/${slug}`}
      className="group block p-6 rounded-lg bg-obsidian-surface subtle-border hover:glow-border hover:bg-obsidian-elevated transition-all duration-200"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-light px-2 py-1 bg-indigo/10 rounded">
          {category}
        </span>
        <span className="text-xs text-slate-muted">{readTime}</span>
      </div>
      <h3 className="font-sans font-semibold text-base text-slate-primary mb-3 leading-snug">
        {title}
      </h3>
      <p className="text-sm text-slate-muted leading-relaxed mb-4">{description}</p>
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-light group-hover:gap-2.5 transition-all">
        Read more <ArrowRight size={12} />
      </span>
    </Link>
  );
}
