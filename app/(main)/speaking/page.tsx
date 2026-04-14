// app/(main)/speaking/page.tsx
import type { Metadata } from "next";
import {
  Mic2, Users, Presentation, Headphones, Zap, MessageSquare,
  MapPin, Shield, CheckCircle2, ArrowRight,
  Building2, TrendingUp, Lightbulb, Layers,
} from "lucide-react";
import { SpeakingHero } from "@/components/sections/SpeakingHero";
import { SpeakingFAQ } from "@/components/sections/SpeakingFAQ";
import { SpeakingForm } from "@/components/forms/SpeakingForm";
import {
  TopicCard,
  CTAPrimary,
  CTAGhost,
  SecondaryCTA,
  SpeakerKitBar,
} from "@/components/sections/SpeakingInteractive";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Speaking — AI Keynote & Executive Briefings | IMAGENN.AI",
  description: `Book ${siteConfig.founder.firstName} for AI keynotes, executive briefings, panels, and workshops on AI innovation, digital transformation, and building AI-ready organizations.`,
};

// ─── Data ────────────────────────────────────────────────────────────────────

const topics = [
  {
    number: "01",
    title: "How Organizations Can Move Beyond Legacy Thinking",
    description:
      "Why the biggest barrier to AI adoption is rarely the technology — and what leaders must address first to unlock genuine organizational transformation. This session reframes the modernization challenge and offers a clear path forward.",
    audience: "Senior leaders, boards, and transformation teams",
    tags: ["Keynote", "Workshop"],
    featured: true,
  },
  {
    number: "02",
    title: "Practical AI: What Works, What Doesn't, and What's Next",
    description:
      "A grounded, execution-focused perspective on AI adoption — separating durable opportunity from passing hype, and helping leaders make better decisions about where to invest attention and resources.",
    audience: "Executive teams and operational leaders",
    tags: ["Keynote", "Panel"],
    featured: false,
  },
  {
    number: "03",
    title: "The Automation Imperative for Mid-Market Companies",
    description:
      "Why automation is now table stakes, not a competitive advantage — and how organizations of all sizes can move fast without breaking what works.",
    audience: "Operations leaders and growth-stage companies",
    tags: ["Keynote", "Workshop"],
    featured: false,
  },
  {
    number: "04",
    title: "Building an AI-Ready Organization",
    description:
      "The people, processes, and cultural shifts that determine whether AI initiatives succeed or stall — and how to stack the deck in your organization's favor.",
    audience: "HR, L&D, and transformation leaders",
    tags: ["Workshop", "Executive Briefing"],
    featured: false,
  },
  {
    number: "05",
    title: "AI and the Future of Operations",
    description:
      "How AI is reshaping how organizations plan, execute, and adapt — and what leaders need to understand to navigate the next 3–5 years with confidence.",
    audience: "COOs, operations teams, and boards",
    tags: ["Keynote", "Fireside Chat"],
    featured: false,
  },
  {
    number: "06",
    title: "Leadership in the Age of Intelligent Systems",
    description:
      "What it means to lead effectively when AI is woven into how your organization thinks, decides, and operates — and how to build teams ready for this reality.",
    audience: "Senior leaders and executive teams",
    tags: ["Keynote", "Panel"],
    featured: false,
  },
];

const formats = [
  {
    icon: Mic2,
    title: "Keynote",
    duration: "30–60 min",
    setting: "Conferences, summits, and leadership events",
    description: "High-impact opening or closing session that sets the tone and gives your audience a clear, actionable perspective on AI innovation.",
  },
  {
    icon: Users,
    title: "Panel",
    duration: "30–45 min",
    setting: "Industry events and conferences",
    description: "Structured or open panel discussion on AI, transformation, and the future of work. Rob is a sharp, direct voice that elevates the conversation.",
  },
  {
    icon: Presentation,
    title: "Workshop",
    duration: "Half-day or full-day",
    setting: "Executive teams and leadership cohorts",
    description: "Interactive session with frameworks, discussion, and practical application. Designed for teams who want to move from understanding to action.",
  },
  {
    icon: Headphones,
    title: "Podcast",
    duration: "30–90 min",
    setting: "Business, leadership, and technology podcasts",
    description: "In-depth conversations on AI strategy, organizational transformation, and the future of work — for audiences who want substance over soundbites.",
  },
  {
    icon: Zap,
    title: "Executive Briefing",
    duration: "60–90 min",
    setting: "Leadership teams and boards",
    description: "A focused, high-signal session for senior leaders — structured to answer the specific questions your team is wrestling with around AI and transformation.",
  },
  {
    icon: MessageSquare,
    title: "Fireside Chat",
    duration: "30–45 min",
    setting: "Events, offsites, and leadership summits",
    description: "Conversational format — more flexible and dynamic than a keynote. Great for events that want authenticity and real dialogue alongside insight.",
  },
  {
    icon: MapPin,
    title: "Leadership Offsite",
    duration: "Half-day",
    setting: "Executive retreats and strategy sessions",
    description: "Ideal for when your leadership team is stepping back to think bigger. Rob can anchor a session around AI readiness, strategic clarity, and organizational modernization.",
  },
  {
    icon: Shield,
    title: "Private Team Session",
    duration: "2–3 hours",
    setting: "Internal teams and corporate groups",
    description: "A private session tailored entirely to your organization — your team, your challenges, your goals. High impact, no wasted time.",
  },
];

const audiences = [
  { group: "Leadership & Strategy", items: ["Executive Leadership Teams", "Boards & Advisory Groups", "Founders & CEOs", "Growth-Stage Company Leaders"] },
  { group: "Operations & Change", items: ["Operations Leaders & COOs", "Digital Transformation Teams", "Innovation & Technology Groups", "Change Management Leaders"] },
  { group: "Events & Communities", items: ["Industry Conferences & Summits", "Associations & Professional Groups", "Corporate Leadership Offsites", "Business & Technology Podcasts"] },
];

const takeaways = [
  "A clearer picture of where AI creates real, sustainable business value",
  "Practical frameworks for evaluating and prioritizing AI initiatives",
  "Confidence in how to approach organizational modernization without disruption",
  "Shared language for aligning leadership teams around AI strategy",
  "Understanding of how AI impacts operations, people, and customer experience",
  "Actionable next steps — not just inspiration, but a direction to move toward",
  "Insight into what is actually working in organizations moving fast on AI",
  "A clear-eyed view of risks, trade-offs, and what to avoid",
];

const differentiators = [
  {
    icon: TrendingUp,
    title: "Grounded in reality, not hype",
    description: "No futurist speculation or vague inspiration. Every talk is built on what is actually working in organizations today — what moves the needle and what doesn't.",
  },
  {
    icon: Layers,
    title: "Strategy and execution in one voice",
    description: "Rob bridges the gap between executive vision and operational reality. His perspective is relevant at every level — from board-level strategy to day-to-day operations.",
  },
  {
    icon: Building2,
    title: "Built for decision-makers",
    description: "Audiences leave with clarity and a direction to move toward — not just enthusiasm. Designed for leaders who need to act, not just think about AI.",
  },
  {
    icon: Lightbulb,
    title: "Customized for your context",
    description: "Every engagement is shaped around your industry, organization type, and specific audience challenges. There is no off-the-shelf talk — only relevant content.",
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function SpeakingPage() {
  const featuredTopic = topics.find((t) => t.featured)!;
  const supportingTopics = topics.filter((t) => !t.featured);

  return (
    <>
      {/* 1. Hero */}
      <SpeakingHero />

      {/* 2. Credibility Strip */}
      <section style={{ background: "#F8F9FC" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-5" style={{ color: "#6366f1" }}>
                Why Event Organizers Book Rob
              </p>
              <h2 className="font-serif text-3xl font-bold leading-snug mb-6" style={{ color: "#0F172A" }}>
                A Practical Voice on AI, Innovation, and the Future of Work
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: "#475569" }}>
                Rob sits at the intersection of executive strategy and operational execution —
                with direct experience leading organizations through AI adoption, automation, and
                digital transformation. He doesn&apos;t theorize. He speaks from the work.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  "Practical, execution-focused perspective — not academic or speculative",
                  "Relevant across industries and organization sizes",
                  "Bridges leadership, operations, and technology in a single session",
                  "Speaks to both strategy-level and implementation-level audiences",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: "#6366f1" }} />
                    <span className="text-sm leading-relaxed" style={{ color: "#374151" }}>{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Speaking Formats", value: "8 Available", sub: "Keynote to private team session" },
                { label: "Event Types", value: "In-person & Virtual", sub: "Global availability" },
                { label: "Topics Covered", value: "AI, Automation & Transformation", sub: "Practical and strategy-level" },
                { label: "Audience Types", value: "Executive to Frontline", sub: "Relevant at every level" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-6 rounded-2xl"
                  style={{
                    background: "#FFFFFF",
                    boxShadow: "0 1px 4px rgba(15,23,42,0.05), 0 8px 24px rgba(15,23,42,0.04)",
                    border: "1px solid rgba(15,23,42,0.05)",
                  }}
                >
                  <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#94A3B8" }}>
                    {item.label}
                  </p>
                  <p className="font-serif text-lg font-bold mb-1" style={{ color: "#0F172A" }}>
                    {item.value}
                  </p>
                  <p className="text-xs" style={{ color: "#64748B" }}>{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Speaking Topics */}
      <section id="topics" style={{ background: "#0D1120" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: "rgba(255,255,255,0.32)" }}>
              Speaking Topics
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold" style={{ color: "#F1F5F9" }}>
              What Rob Speaks About
            </h2>
          </div>

          {/* Featured topic — static, no hover */}
          <div
            className="rounded-2xl p-8 md:p-10 mb-6"
            style={{
              background: "linear-gradient(135deg, #111628 0%, #141930 100%)",
              border: "1px solid rgba(99,102,241,0.15)",
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-8 items-start">
              <span className="font-serif text-5xl font-bold opacity-60 select-none" style={{ color: "#6366f1" }}>
                {featuredTopic.number}
              </span>
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {featuredTopic.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-semibold px-2.5 py-1 rounded-md"
                      style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4" style={{ color: "#F1F5F9" }}>
                  {featuredTopic.title}
                </h3>
                <p className="text-base leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.48)" }}>
                  {featuredTopic.description}
                </p>
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.25)" }}>
                  Ideal for: {featuredTopic.audience}
                </p>
              </div>
            </div>
          </div>

          {/* Supporting topic cards — client component */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {supportingTopics.map((topic) => (
              <TopicCard key={topic.number} topic={topic} />
            ))}
          </div>

          <p className="text-sm mt-8 text-center" style={{ color: "rgba(255,255,255,0.25)" }}>
            All topics can be customized for your industry, event format, and specific audience needs.
          </p>
        </div>
      </section>

      {/* 4. Who This Is For */}
      <section style={{ background: "#F1F5F9" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-16 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-5" style={{ color: "#6366f1" }}>
                Audience Fit
              </p>
              <h2 className="font-serif text-3xl font-bold leading-snug mb-6" style={{ color: "#0F172A" }}>
                Built for Leaders Navigating Change
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "#475569" }}>
                Rob&apos;s talks are designed for the leaders who are making real decisions — not
                watching from the sidelines. If your audience is trying to figure out what AI means
                for their organization, their teams, or their next chapter of growth, this is for them.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {audiences.map((group) => (
                <div key={group.group}>
                  <p
                    className="text-xs font-semibold uppercase tracking-widest mb-5 pb-3"
                    style={{ color: "#6366f1", borderBottom: "1px solid rgba(99,102,241,0.2)" }}
                  >
                    {group.group}
                  </p>
                  <ul className="flex flex-col gap-3">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="mt-[7px] w-1 h-1 rounded-full shrink-0" style={{ background: "#94A3B8" }} />
                        <span className="text-sm leading-relaxed" style={{ color: "#334155" }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. What Audiences Take Away */}
      <section style={{ background: "#090C17" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-5" style={{ color: "rgba(255,255,255,0.32)" }}>
                Session Outcomes
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold leading-snug mb-6" style={{ color: "#F1F5F9" }}>
                Practical Takeaways,<br />Not Just Inspiration
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                Every session is built for leaders who need to return to their organization and move.
                The goal is not to motivate — it is to equip. Audiences leave with a clearer picture,
                a sharper framing, and a practical direction forward.
              </p>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {takeaways.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 p-5 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <CheckCircle2 size={15} className="mt-0.5 shrink-0" style={{ color: "#6366f1" }} />
                  <span className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 6. Speaking Formats */}
      <section style={{ background: "#F8F9FC" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: "#6366f1" }}>
              Speaking Formats
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold" style={{ color: "#0F172A" }}>
              Every Format, Every Context
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
            {formats.map((f, i) => {
              const Icon = f.icon;
              const isLastRow = i >= formats.length - 2;
              return (
                <div
                  key={f.title}
                  className="flex gap-5 py-7"
                  style={{ borderBottom: isLastRow ? "none" : "1px solid rgba(15,23,42,0.07)" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: "rgba(99,102,241,0.08)" }}
                  >
                    <Icon size={18} style={{ color: "#6366f1" }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1.5">
                      <h3 className="font-sans font-semibold text-base" style={{ color: "#0F172A" }}>
                        {f.title}
                      </h3>
                      <span
                        className="text-xs px-2 py-0.5 rounded-md font-medium"
                        style={{ background: "rgba(15,23,42,0.05)", color: "#64748B" }}
                      >
                        {f.duration}
                      </span>
                    </div>
                    <p className="text-xs font-medium mb-2" style={{ color: "#6366f1" }}>
                      {f.setting}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>
                      {f.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Why Book Rob */}
      <section style={{ background: "#0D1120" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-20 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-5" style={{ color: "rgba(255,255,255,0.32)" }}>
                Why Rob
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold leading-snug mb-6" style={{ color: "#F1F5F9" }}>
                More Than Inspiration —<br />Strategic Clarity With Practical Relevance
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                Most AI speakers fall into one of two traps: they are either too high-level to be
                useful, or too technical to be relevant to leadership. Rob lives in the space between —
                where real decisions get made.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {differentiators.map((d) => {
                const Icon = d.icon;
                return (
                  <div
                    key={d.title}
                    className="p-6 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <Icon size={20} className="mb-4" style={{ color: "#818cf8" }} />
                    <h3 className="font-sans font-semibold text-sm mb-2" style={{ color: "#F1F5F9" }}>
                      {d.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>
                      {d.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Secondary CTA */}
      <section style={{ background: "#1E1B4B" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-5" style={{ color: "rgba(255,255,255,0.35)" }}>
                Speaking Inquiries
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold leading-tight mb-5" style={{ color: "#EEF2FF" }}>
                Bring Practical AI Insight<br />to Your Audience
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                Whether you are planning a conference keynote, a leadership team offsite, or a private
                executive briefing — reach out to discuss fit, availability, and what a session could
                look like for your organization.
              </p>
            </div>
            <SecondaryCTA />
          </div>
        </div>
      </section>

      {/* 9. Social Proof Placeholder */}
      <section style={{ background: "#F8F9FC" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: "#6366f1" }}>
              What Organizers Say
            </p>
            <h2 className="font-serif text-3xl font-bold" style={{ color: "#0F172A" }}>
              Audience &amp; Organizer Feedback
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { context: "Conference Keynote", audience: "Executive Leadership Summit" },
              { context: "Executive Workshop", audience: "Corporate Innovation Forum" },
              { context: "Podcast Interview", audience: "Business & Technology Podcast" },
            ].map((item, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl flex flex-col"
                style={{
                  background: "#FFFFFF",
                  boxShadow: "0 1px 4px rgba(15,23,42,0.05), 0 8px 24px rgba(15,23,42,0.04)",
                  border: "1px solid rgba(15,23,42,0.05)",
                  minHeight: "220px",
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center mb-6"
                  style={{ background: "rgba(99,102,241,0.08)" }}
                >
                  <span className="font-serif text-2xl" style={{ color: "rgba(99,102,241,0.3)", lineHeight: 1 }}>
                    &ldquo;
                  </span>
                </div>
                <div className="flex-1 flex flex-col gap-2 mb-6">
                  {[90, 100, 70].map((w, j) => (
                    <div key={j} className="h-2.5 rounded-full" style={{ width: `${w}%`, background: "rgba(15,23,42,0.06)" }} />
                  ))}
                </div>
                <div className="pt-5" style={{ borderTop: "1px solid rgba(15,23,42,0.06)" }}>
                  <div className="h-2 w-24 rounded-full mb-1.5" style={{ background: "rgba(15,23,42,0.09)" }} />
                  <p className="text-xs" style={{ color: "#94A3B8" }}>{item.context} · {item.audience}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-center mt-8" style={{ color: "#94A3B8" }}>
            Speaker references and past engagement details available upon request.
          </p>
        </div>
      </section>

      {/* 10. Booking Form */}
      <section id="booking" style={{ background: "#F1F5F9" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-16 items-start">
            <div className="lg:sticky lg:top-28">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-5" style={{ color: "#6366f1" }}>
                Book a Speaking Engagement
              </p>
              <h2 className="font-serif text-3xl font-bold leading-snug mb-6" style={{ color: "#0F172A" }}>
                Invite Rob to Speak at Your Event
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: "#475569" }}>
                Fill out the form with your event details and we will get back to you within 2 business
                days. The more context you provide, the better we can assess fit and respond with a
                useful proposal.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  "Response within 2 business days",
                  "In-person and virtual available globally",
                  "All formats customized to your audience",
                  "No commitment required to inquire",
                ].map((text) => (
                  <div key={text} className="flex items-center gap-3">
                    <CheckCircle2 size={15} style={{ color: "#6366f1" }} />
                    <span className="text-sm" style={{ color: "#374151" }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="rounded-2xl p-8 md:p-10"
              style={{
                background: "#FFFFFF",
                boxShadow: "0 1px 4px rgba(15,23,42,0.06), 0 16px 48px rgba(15,23,42,0.06)",
                border: "1px solid rgba(15,23,42,0.05)",
              }}
            >
              <SpeakingForm />
            </div>
          </div>
        </div>
      </section>

      {/* 11. FAQ */}
      <section id="faq" style={{ background: "#090C17" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: "rgba(255,255,255,0.32)" }}>
              Common Questions
            </p>
            <h2 className="font-serif text-3xl font-bold" style={{ color: "#F1F5F9" }}>
              Frequently Asked Questions
            </h2>
          </div>
          <SpeakingFAQ />
        </div>
      </section>

      {/* 12. Speaker Kit bar */}
      <section style={{ background: "#0D1120", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div>
              <h3 className="font-serif text-xl font-bold mb-2" style={{ color: "#F1F5F9" }}>
                Need a Speaker Overview?
              </h3>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.38)" }}>
                Request Rob&apos;s speaker one-sheet, bio, and topic overview for your planning documents.
              </p>
            </div>
            <SpeakerKitBar />
          </div>
        </div>
      </section>
    </>
  );
}
