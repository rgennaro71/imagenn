// app/(main)/coming-soon/page.tsx
import type { Metadata } from "next";
import { ComingSoonClient } from "@/components/sections/ComingSoonClient";

export const metadata: Metadata = {
  title: "IMAGENN.AI — Something big is coming.",
  description:
    "AI & Digital Innovation. We're building the systems that bridge AI potential and real organizational change. Join the waitlist.",
};

export default function ComingSoonPage() {
  return <ComingSoonClient />;
}
