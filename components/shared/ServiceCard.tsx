// components/shared/ServiceCard.tsx
import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  variant?: "lead" | "secondary";
}

export function ServiceCard({ icon: Icon, title, description, href, variant = "secondary" }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group block p-6 rounded-lg subtle-border transition-all duration-200",
        variant === "lead"
          ? "bg-obsidian-surface hover:bg-obsidian-elevated hover:glow-border"
          : "bg-obsidian-secondary hover:bg-obsidian-surface hover:border-white/10"
      )}
    >
      <div className={cn("w-10 h-10 rounded-md flex items-center justify-center mb-4", variant === "lead" ? "bg-indigo/15" : "bg-indigo/10")}>
        <Icon size={variant === "lead" ? 22 : 18} className="text-indigo-light" />
      </div>
      <h3 className={cn("font-sans font-semibold text-slate-primary mb-2", variant === "lead" ? "text-lg" : "text-base")}>
        {title}
      </h3>
      {description && (
        <p className="text-sm text-slate-muted leading-relaxed mb-4">{description}</p>
      )}
      <span className="inline-flex items-center gap-1 text-xs font-medium text-indigo-light group-hover:gap-2 transition-all">
        Learn more <ArrowRight size={12} />
      </span>
    </Link>
  );
}
