// components/shared/GlowOrb.tsx
import { cn } from "@/lib/utils";

interface GlowOrbProps {
  color?: "indigo" | "cyan" | "violet";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  sm: "w-64 h-64",
  md: "w-96 h-96",
  lg: "w-[32rem] h-[32rem]",
  xl: "w-[48rem] h-[48rem]",
};

const colorMap = {
  indigo: "radial-gradient(circle, rgba(99,102,241,0.22) 0%, rgba(99,102,241,0.08) 35%, transparent 70%)",
  cyan: "radial-gradient(circle, rgba(34,211,238,0.15) 0%, rgba(34,211,238,0.05) 35%, transparent 70%)",
  violet: "radial-gradient(circle, rgba(124,58,237,0.2) 0%, rgba(124,58,237,0.06) 35%, transparent 70%)",
};

export function GlowOrb({ color = "indigo", size = "md", className }: GlowOrbProps) {
  return (
    <div
      className={cn("absolute pointer-events-none rounded-full", sizeMap[size], className)}
      style={{ background: colorMap[color] }}
      aria-hidden="true"
    />
  );
}
