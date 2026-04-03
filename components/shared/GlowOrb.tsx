// components/shared/GlowOrb.tsx
import { cn } from "@/lib/utils";

interface GlowOrbProps {
  color?: "indigo" | "cyan";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = { sm: "w-48 h-48", md: "w-72 h-72", lg: "w-96 h-96" };

export function GlowOrb({ color = "indigo", size = "md", className }: GlowOrbProps) {
  const style =
    color === "indigo"
      ? { background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)" }
      : { background: "radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)" };

  return (
    <div
      className={cn("absolute pointer-events-none rounded-full", sizeMap[size], className)}
      style={style}
      aria-hidden="true"
    />
  );
}
