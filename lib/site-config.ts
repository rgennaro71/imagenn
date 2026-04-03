// lib/site-config.ts

export const siteConfig = {
  name: "IMAGENN.AI",
  tagline: "Modernize How Your Business Thinks.",
  description:
    "IMAGENN.AI is an AI innovation and automation company helping organizations modernize operations, eliminate bottlenecks, and build AI-powered foundations for scalable growth.",
  url: "https://imagenn.ai",
  ogImage: "/og-image.png",

  // Contact & booking
  calendlyUrl: "https://calendly.com/imagennai", // Rob to update
  adminEmail: "hello@imagenn.ai", // Rob to update
  contactEmail: "hello@imagenn.ai",

  // Founder
  founder: {
    firstName: "Rob",
    lastName: "LAST_NAME_PLACEHOLDER", // Rob to update before launch
    fullName: "Rob LAST_NAME_PLACEHOLDER",
    title: "Founder & CEO, IMAGENN.AI",
    bio: "Rob is a sought-after voice on AI innovation, digital transformation, and the future of how organizations work.",
  },

  // Stats — set showStats: true and populate values before launch
  showStats: false,
  stats: {
    organizationsServed: "50+",
    automationsDeployed: "200+",
    avgEfficiencyGains: "40%",
  },

  // Speaking engagements — add entries to show section on /speaking
  speakingEngagements: [] as Array<{
    event: string;
    role: string;
    date: string;
    location: string;
  }>,

  // Speaking testimonials — add entries to show section on /speaking
  speakingTestimonials: [] as Array<{
    quote: string;
    name: string;
    title: string;
    company: string;
  }>,

  // Social links
  social: {
    linkedin: "https://linkedin.com/company/imagennai",
    twitter: "https://twitter.com/imagennai",
  },

  // Navigation
  nav: [
    { label: "Services", href: "/services" },
    { label: "Solutions", href: "/solutions" },
    { label: "About", href: "/about" },
    { label: "Speaking", href: "/speaking" },
    { label: "Insights", href: "/insights" },
  ],
};
