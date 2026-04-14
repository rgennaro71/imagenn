// components/ui/animated-form-primitives.tsx
// Adapted from: https://21st.dev/community/components/arunachalam0606/modern-animated-sign-in
"use client";

import { memo, forwardRef, useState, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

// ── Animated Input ──────────────────────────────────────────────────────────
// Radial indigo glow follows the cursor inside the input wrapper

export const AnimatedInput = memo(
  forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    function AnimatedInput({ className, type, ...props }, ref) {
      const [visible, setVisible] = useState(false);
      const mouseX = useMotionValue(0);
      const mouseY = useMotionValue(0);

      function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
      }

      const bg = useMotionTemplate`radial-gradient(
        ${visible ? "110px" : "0px"} circle at ${mouseX}px ${mouseY}px,
        #6366f1,
        transparent 80%
      )`;

      return (
        <motion.div
          style={{ background: bg }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
          className="group/input rounded-xl p-[2px] transition duration-300"
        >
          <input
            type={type}
            className={cn(
              "flex h-11 w-full rounded-[10px] border-none bg-[#F1F5F9]",
              "px-4 py-2.5 text-sm text-[#0F172A]",
              "placeholder:text-[#94A3B8]",
              "transition duration-300",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:bg-white",
              "disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            ref={ref}
            {...props}
          />
        </motion.div>
      );
    }
  )
);
AnimatedInput.displayName = "AnimatedInput";

// ── Animated Textarea ───────────────────────────────────────────────────────

export const AnimatedTextarea = memo(
  forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
    function AnimatedTextarea({ className, ...props }, ref) {
      const [visible, setVisible] = useState(false);
      const mouseX = useMotionValue(0);
      const mouseY = useMotionValue(0);

      function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
      }

      const bg = useMotionTemplate`radial-gradient(
        ${visible ? "140px" : "0px"} circle at ${mouseX}px ${mouseY}px,
        #6366f1,
        transparent 80%
      )`;

      return (
        <motion.div
          style={{ background: bg }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
          className="group/input rounded-xl p-[2px] transition duration-300"
        >
          <textarea
            className={cn(
              "flex w-full rounded-[10px] border-none bg-[#F1F5F9]",
              "px-4 py-3 text-sm text-[#0F172A]",
              "placeholder:text-[#94A3B8]",
              "transition duration-300 resize-none",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:bg-white",
              "disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            ref={ref}
            {...props}
          />
        </motion.div>
      );
    }
  )
);
AnimatedTextarea.displayName = "AnimatedTextarea";

// ── FieldReveal ─────────────────────────────────────────────────────────────
// Box-wipe reveal for each form field — indigo wipe slides from left to right

export function FieldReveal({
  children,
  delay = 0,
  className,
  overflow = "hidden",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  overflow?: string;
}) {
  return (
    <div className={cn("relative", className)} style={{ overflow }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: delay + 0.15, ease: [0.25, 0.4, 0.25, 1] }}
      >
        {children}
      </motion.div>
      <motion.div
        initial={{ left: 0 }}
        animate={{ left: "100%" }}
        transition={{ duration: 0.45, delay, ease: "easeIn" }}
        className="absolute inset-0 z-20 rounded-lg"
        style={{ background: "#6366f1" }}
        aria-hidden="true"
      />
    </div>
  );
}

// ── BottomGradient ──────────────────────────────────────────────────────────
// Shimmer line that glows on button hover

export function BottomGradient() {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-indigo-400 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-violet-400 to-transparent" />
    </>
  );
}
