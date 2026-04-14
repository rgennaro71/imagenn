import type { Metadata } from "next";
import { WaitlistPageClient } from "@/components/sections/WaitlistPageClient";

export const metadata: Metadata = {
  title: "Early Access — IMAGENN.AI",
  description:
    "Join the IMAGENN.AI early access waitlist. Lock in founder pricing and get priority access before public launch.",
};

export default function WaitlistPage() {
  return <WaitlistPageClient />;
}
