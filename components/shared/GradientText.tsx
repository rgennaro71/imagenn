// components/shared/GradientText.tsx
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function GradientText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("bg-gradient-brand bg-clip-text text-transparent", className)}>
      {children}
    </span>
  );
}
