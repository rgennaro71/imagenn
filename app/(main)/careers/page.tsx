import type { Metadata } from "next";
import { CareersPageClient } from "@/components/sections/CareersPageClient";

export const metadata: Metadata = {
  title: "Join Our Team — IMAGENN.AI",
  description:
    "We're building AI-powered systems that define how modern organizations operate. If you want to build something that matters — not just work on it — this is where you belong.",
};

export default function CareersPage() {
  return <CareersPageClient />;
}
