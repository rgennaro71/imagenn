import type { Metadata } from "next";
import { ContactPageClient } from "@/components/sections/ContactPageClient";

export const metadata: Metadata = {
  title: "Contact — IMAGENN.AI",
  description: "Book a strategy call or send a message. We respond within 1 business day.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
