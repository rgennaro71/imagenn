// components/shared/GradientText.tsx
import { cn } from "@/lib/utils";

export function GradientText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("bg-gradient-brand bg-clip-text text-transparent", className)}>
      {children}
    </span>
  );
}
