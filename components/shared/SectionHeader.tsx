// components/shared/SectionHeader.tsx
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  align?: "left" | "center";
  theme?: "dark" | "light";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  heading,
  subheading,
  align = "center",
  theme = "dark",
  className,
}: SectionHeaderProps) {
  const isLight = theme === "light";

  return (
    <div className={cn("mb-16", align === "center" && "text-center", className)}>
      {eyebrow && (
        <p
          className={cn(
            "inline-flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-[0.22em] mb-5",
            isLight ? "text-ink-muted" : "text-slate-muted"
          )}
        >
          <span
            className="w-1 h-1 rounded-full inline-block shrink-0"
            style={{ background: "linear-gradient(135deg, #6366f1, #818cf8)" }}
          />
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-serif text-4xl md:text-5xl font-bold leading-[1.08] tracking-tight mb-5",
          isLight ? "ink-primary" : "text-slate-primary"
        )}
        style={isLight ? { color: "#0F172A" } : undefined}
      >
        {heading}
      </h2>
      {subheading && (
        <p
          className={cn(
            "text-lg leading-[1.75]",
            align === "center" && "max-w-2xl mx-auto",
            isLight ? "ink-secondary" : "text-slate-secondary"
          )}
          style={isLight ? { color: "#475569" } : undefined}
        >
          {subheading}
        </p>
      )}
    </div>
  );
}
