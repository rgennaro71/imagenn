// components/shared/SectionHeader.tsx
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  heading,
  subheading,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-16", align === "center" && "text-center", className)}>
      {eyebrow && (
        <p className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-slate-muted mb-4">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-primary leading-tight tracking-tight mb-4">
        {heading}
      </h2>
      {subheading && (
        <p className={cn("text-lg text-slate-secondary leading-relaxed", align === "center" && "max-w-2xl mx-auto")}>
          {subheading}
        </p>
      )}
    </div>
  );
}
