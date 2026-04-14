import type { Metadata } from "next";
import { NetworkPageClient } from "@/components/sections/NetworkPageClient";

export const metadata: Metadata = {
  title: "Founders & Operators Network — IMAGENN.AI",
  description:
    "A curated network of founders, operators, and leaders shaping how AI is applied inside modern organizations. Applications reviewed. Not everyone is accepted.",
};

export default function NetworkPage() {
  return <NetworkPageClient />;
}
