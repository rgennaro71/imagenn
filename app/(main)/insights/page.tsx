import type { Metadata } from "next";
import { getAllInsights } from "@/lib/mdx";
import { InsightsPageClient } from "@/components/sections/InsightsPageClient";

export const metadata: Metadata = {
  title: "Insights — IMAGENN.AI",
  description:
    "Practical perspectives on AI adoption, operational transformation, and building organizations that actually execute. Built for leaders navigating real-world change.",
};

export default function InsightsPage() {
  const insights = getAllInsights();
  return <InsightsPageClient insights={insights} />;
}
