import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solutions — AI Use Cases for Operations, Sales & CX | IMAGENN.AI",
  description:
    "Explore how IMAGENN.AI applies AI across operations, sales, customer experience, and leadership. Real use cases for mid-market and scaling organizations ready to execute.",
  openGraph: {
    title: "Solutions — AI Use Cases for Operations, Sales & CX | IMAGENN.AI",
    description:
      "Real AI use cases across operations, sales, customer experience, and leadership — built for organizations ready to move beyond experimentation.",
    url: "https://imagenn.ai/solutions",
    siteName: "IMAGENN.AI",
    type: "website",
  },
};

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
