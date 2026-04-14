// app/(main)/services/page.tsx
import type { Metadata } from "next";
import {
  Brain, BarChart2, Users, Zap, Settings2, BookOpen, MessageSquare, Laptop2,
  ArrowRight, CheckCircle2, AlertCircle, ChevronRight,
} from "lucide-react";
import { ServicesHero } from "@/components/sections/ServicesHero";

export const metadata: Metadata = {
  title: "Services — AI Strategy, Automation & Transformation | IMAGENN.AI",
  description:
    "IMAGENN.AI offers 8 execution-focused AI services — from AI strategy and decision support to workflow automation, operational transformation, and intelligent knowledge systems.",
};

// ─── Service data ─────────────────────────────────────────────────────────────

type Service = {
  id: string;
  icon: React.ElementType;
  number: string;
  title: string;
  positioning: string;
  overview: string;
  whoFor: string;
  painPoints: string[];
  deliverables: string[];
  outcomes: string[];
};

const services: Service[] = [
  {
    id: "ai-strategy",
    icon: Brain,
    number: "01",
    title: "AI Strategy & Opportunity Mapping",
    positioning: "Clarity before commitment.",
    overview:
      "We work with your leadership team to map your organization's highest-leverage AI opportunities — grounded in how you actually operate, not abstract potential. This is strategy built for execution, not a slide deck.",
    whoFor: "Founders, CEOs, Innovation Leaders, and growth-focused operators who know AI matters but need a clear path forward.",
    painPoints: [
      "You've seen the potential but don't know where your organization should start",
      "Internal initiatives have stalled because no one owns the strategy",
      "You're unsure which AI investments will actually move the business forward",
      "Leadership is misaligned on what AI adoption should look like in practice",
    ],
    deliverables: [
      "AI opportunity audit mapped to your specific operations and priorities",
      "Prioritized roadmap with 90-day, 6-month, and 12-month horizons",
      "Build vs. buy vs. integrate analysis for key opportunity areas",
      "Executive briefing and alignment session with leadership team",
    ],
    outcomes: [
      "Organizational clarity on where to act — and where not to",
      "A roadmap that connects strategy to execution from day one",
      "Faster decision-making on AI investments going forward",
      "Leadership alignment that eliminates internal friction",
    ],
  },
  {
    id: "decision-support",
    icon: BarChart2,
    number: "02",
    title: "AI-Powered Decision Support",
    positioning: "Replace guesswork with operational intelligence.",
    overview:
      "We build intelligent systems that surface the right information at the right moment — so your leaders make faster, better-informed decisions. From executive dashboards to AI-assisted briefings, we eliminate the data assembly that slows leadership down.",
    whoFor: "Executives, department heads, and operations leaders who need accurate, timely intelligence to lead effectively.",
    painPoints: [
      "Leaders make critical decisions on stale or incomplete data",
      "Board meeting prep takes days of manual data assembly",
      "No single source of truth — teams pull different answers from different systems",
      "Flying blind on leading indicators that could prevent costly surprises",
    ],
    deliverables: [
      "Custom executive dashboard connected to your live data sources",
      "AI-assisted briefing system that synthesizes data before key decisions",
      "Anomaly detection and alert infrastructure for critical KPIs",
      "Decision workflow documentation and leadership team training",
    ],
    outcomes: [
      "Decisions made on current, complete data — not last week's report",
      "Board and strategy prep time cut from days to hours",
      "Early visibility into issues before they become crises",
      "Leadership operating with consistent, shared intelligence",
    ],
  },
  {
    id: "change-enablement",
    icon: Users,
    number: "03",
    title: "Change Enablement & AI Adoption",
    positioning: "The technology only works if people use it.",
    overview:
      "The organizations that fail at AI almost always fail on the people dimension. We design and deliver change programs that ensure your teams understand, trust, and actually use the AI systems you invest in — driving adoption that translates to ROI.",
    whoFor: "HR leaders, COOs, change managers, and executives overseeing transformation programs where adoption is the make-or-break factor.",
    painPoints: [
      "New tools get deployed but teams revert to old workflows within weeks",
      "Resistance from staff who fear AI will replace them",
      "Training is generic and doesn't address how people actually do their jobs",
      "Nobody owns adoption — it's assumed the technology will sell itself",
    ],
    deliverables: [
      "Stakeholder mapping and change impact assessment",
      "Tailored adoption program with role-specific training materials",
      "Champion network — identifying and enabling internal AI advocates",
      "30/60/90-day adoption tracking with success metrics and course-correction plan",
    ],
    outcomes: [
      "AI tools that actually get used — not abandoned after launch",
      "Teams that trust the technology and understand how it helps them",
      "Measurable adoption rates that justify continued investment",
      "A sustainable internal capability for future AI change programs",
    ],
  },
  {
    id: "workflow-automation",
    icon: Zap,
    number: "04",
    title: "Workflow Automation",
    positioning: "Reclaim the hours your team shouldn't be spending.",
    overview:
      "We identify, design, and build automation for your highest-friction operational workflows — replacing manual, repetitive processes with intelligent systems that run reliably at scale. From approvals to reporting to data entry, we automate what's holding your team back.",
    whoFor: "Operations leaders, department heads, and business owners who want to reclaim capacity from repetitive work.",
    painPoints: [
      "Critical workflows depend on manual steps that slow everything down",
      "Approval chains travel through email and take days when they should take hours",
      "Staff spend significant time on data entry and format conversion between systems",
      "Errors from manual processing create downstream rework that compounds over time",
    ],
    deliverables: [
      "Workflow audit identifying your highest-impact automation candidates",
      "Automated workflows built and integrated into your existing systems",
      "Exception handling and escalation logic for edge cases",
      "Monitoring dashboard and performance reporting for all automated processes",
    ],
    outcomes: [
      "Hours reclaimed per person per week from repetitive work",
      "Faster cycle times on approvals, reports, and operational tasks",
      "Fewer errors and the rework costs that follow them",
      "Staff capacity redirected to higher-value, higher-satisfaction work",
    ],
  },
  {
    id: "operational-transformation",
    icon: Settings2,
    number: "05",
    title: "Operational Transformation",
    positioning: "Systemic change, not a collection of fixes.",
    overview:
      "We go beyond individual automations to redesign how your organization operates — reengineering core processes with AI at their foundation. This is structural change that compounds over time, not a list of disconnected improvements.",
    whoFor: "COOs, operations executives, and business owners ready to fundamentally modernize how their organization runs.",
    painPoints: [
      "Operational inefficiencies have compounded for years and are now structural problems",
      "You've automated individual tasks but the underlying processes still have too much friction",
      "Cross-functional workflows break down at handoff points between departments",
      "Scaling the business means scaling the manual work — which is unsustainable",
    ],
    deliverables: [
      "End-to-end operational diagnostic with process mapping and gap analysis",
      "Redesigned process architecture with AI and automation embedded throughout",
      "Implementation roadmap with phased delivery to minimize business disruption",
      "Governance framework and ownership model for ongoing optimization",
    ],
    outcomes: [
      "Operations that scale with growth instead of breaking under it",
      "Structural efficiency gains that persist and compound over time",
      "Cross-functional workflows that run with minimal friction",
      "An organization that moves faster as it gets larger, not slower",
    ],
  },
  {
    id: "knowledge-systems",
    icon: BookOpen,
    number: "06",
    title: "Intelligent Knowledge Systems",
    positioning: "Turn expertise into a durable organizational asset.",
    overview:
      "We build AI-powered knowledge infrastructure that makes your organization's expertise searchable, accessible, and permanent. No more institutional knowledge living in people's heads or buried in shared drives no one can navigate.",
    whoFor: "Knowledge-intensive organizations, professional services firms, and any business where expertise is a core asset that needs to be protected and leveraged.",
    painPoints: [
      "Critical expertise walks out the door when people leave",
      "New employees take months to reach productivity because knowledge is tribal",
      "Staff waste hours searching for information spread across emails, docs, and chat",
      "The same questions get answered from scratch over and over across the organization",
    ],
    deliverables: [
      "Knowledge audit and architecture design for your organization's information ecosystem",
      "AI-powered knowledge base connected to your existing content sources",
      "Natural language Q&A interface for instant, cited answers from your own content",
      "Onboarding knowledge pathways for new team members across key roles",
    ],
    outcomes: [
      "Institutional knowledge preserved and accessible regardless of staff changes",
      "New hire time-to-productivity improved significantly",
      "Hours reclaimed from information search and repeated knowledge transfer",
      "Expertise becomes an organizational asset, not an individual dependency",
    ],
  },
  {
    id: "cx-automation",
    icon: MessageSquare,
    number: "07",
    title: "Customer Experience Automation",
    positioning: "Scale your CX without scaling your headcount.",
    overview:
      "We design and build AI-powered CX systems that resolve common requests instantly, route complex cases intelligently, and maintain the consistency your customers expect — at any volume. Your support team focuses on human judgment; AI handles everything else.",
    whoFor: "Customer success, support, and operations leaders managing high volumes of customer interactions across any industry.",
    painPoints: [
      "Support team spends most of their time answering the same questions repeatedly",
      "Ticket routing is inconsistent — wrong agents get the wrong cases",
      "Customer onboarding relies on individual reps remembering the right steps",
      "Scaling support volume means hiring more people, which is expensive and slow",
    ],
    deliverables: [
      "Customer journey audit identifying top automation opportunities by volume and impact",
      "AI-powered resolution system for tier-1 queries with escalation paths",
      "Intelligent routing logic connecting customers to the right resource, every time",
      "Automated onboarding workflows that trigger the right actions at the right time",
    ],
    outcomes: [
      "50–70% of tier-1 queries handled without human intervention",
      "Faster resolution times and improved customer satisfaction scores",
      "Support capacity freed for complex, high-value customer interactions",
      "Consistent customer experience regardless of volume spikes or staffing",
    ],
  },
  {
    id: "productivity",
    icon: Laptop2,
    number: "08",
    title: "Internal Productivity Systems",
    positioning: "Give your team back the time they're losing to busywork.",
    overview:
      "We build AI-powered tools that help your teams work faster, find information instantly, and eliminate the busywork that drains capacity. From meeting intelligence to internal copilots, we design productivity systems that actually get adopted.",
    whoFor: "Executives, team leads, and HR leaders focused on improving organizational productivity and employee experience at scale.",
    painPoints: [
      "Teams spend hours weekly searching for information they should find in seconds",
      "Meeting follow-up is inconsistent — action items get lost and decisions aren't documented",
      "Repetitive internal workflows slow every department but aren't worth a full engineering project",
      "Managers struggle to maintain visibility across distributed or large teams",
    ],
    deliverables: [
      "Internal AI copilot connected to your knowledge sources and tools",
      "Meeting intelligence system for automated transcription, summary, and action item tracking",
      "Lightweight workflow tools for the most common internal repetitive tasks",
      "Manager visibility dashboards for team health and follow-through",
    ],
    outcomes: [
      "Hours reclaimed per team member per week from search and busywork",
      "Every meeting with a clear record, tracked action items, and real accountability",
      "Internal tools people actually use — designed around how work gets done",
      "Managers with better visibility and teams with less friction",
    ],
  },
];

// ─── Static styled components ────────────────────────────────────────────────

function ProblemItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <AlertCircle size={13} className="shrink-0 mt-[3px]" style={{ color: "#ef4444" }} />
      <span className="text-sm leading-relaxed" style={{ color: "#374151" }}>{text}</span>
    </li>
  );
}

function DeliverableItem({ text, dark }: { text: string; dark?: boolean }) {
  return (
    <li className="flex items-start gap-3">
      <ChevronRight size={13} className="shrink-0 mt-[3px]" style={{ color: dark ? "#818cf8" : "#6366f1" }} />
      <span className="text-sm leading-relaxed" style={{ color: dark ? "rgba(255,255,255,0.55)" : "#374151" }}>{text}</span>
    </li>
  );
}

function OutcomeItem({ text, dark }: { text: string; dark?: boolean }) {
  return (
    <li className="flex items-start gap-3">
      <CheckCircle2 size={13} className="shrink-0 mt-[3px]" style={{ color: dark ? "#34d399" : "#059669" }} />
      <span className="text-sm leading-relaxed" style={{ color: dark ? "rgba(255,255,255,0.55)" : "#374151" }}>{text}</span>
    </li>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <>
      {/* 1. Hero */}
      <ServicesHero />

      {/* 2. How We Deliver Impact */}
      <section style={{ background: "#F8F9FC" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-18">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 items-center py-14">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-3" style={{ color: "#6366f1" }}>
                  How We Deliver Impact
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "#64748B" }}>
                  Every engagement follows a structured methodology designed for real execution — not just strategy.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
                {[
                  { step: "01", title: "Discover", desc: "Identify highest-impact opportunities specific to your operations" },
                  { step: "02", title: "Design", desc: "Map solutions to real workflows — not generic frameworks" },
                  { step: "03", title: "Build", desc: "Implement systems that integrate cleanly with what you have" },
                  { step: "04", title: "Scale", desc: "Drive adoption and build long-term organizational capability" },
                ].map((item, i) => (
                  <div
                    key={item.step}
                    className="relative flex flex-col px-7 py-6"
                    style={{
                      borderLeft: i > 0 ? "1px solid rgba(15,23,42,0.08)" : "none",
                    }}
                  >
                    <span
                      className="font-serif text-4xl font-bold mb-4 select-none"
                      style={{ color: "rgba(99,102,241,0.12)" }}
                    >
                      {item.step}
                    </span>
                    <h3 className="font-sans font-bold text-sm mb-2" style={{ color: "#0F172A" }}>
                      {item.title}
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: "#64748B" }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Services — Alternating light/dark sections */}
      {services.map((service, i) => {
        const Icon = service.icon;
        const isDark = i % 2 !== 0;
        const bg = isDark ? "#0D1120" : "#FFFFFF";
        const borderColor = isDark ? "rgba(255,255,255,0.05)" : "rgba(15,23,42,0.07)";
        const numberColor = isDark ? "rgba(99,102,241,0.1)" : "rgba(99,102,241,0.07)";
        const labelColor = isDark ? "rgba(255,255,255,0.25)" : "#94A3B8";
        const titleColor = isDark ? "#F1F5F9" : "#0F172A";
        const bodyColor = isDark ? "rgba(255,255,255,0.45)" : "#475569";
        const iconBg = isDark ? "rgba(99,102,241,0.12)" : "rgba(99,102,241,0.07)";
        const iconColor = isDark ? "#818cf8" : "#6366f1";
        const posColor = isDark ? "rgba(255,255,255,0.35)" : "#6366f1";
        const sectionBg = isDark ? "rgba(255,255,255,0.03)" : "rgba(15,23,42,0.02)";
        const sectionBorder = isDark ? "rgba(255,255,255,0.05)" : "rgba(15,23,42,0.06)";
        const sectionLabel = isDark ? "rgba(255,255,255,0.22)" : "#94A3B8";

        return (
          <section
            key={service.id}
            id={service.id}
            style={{ background: bg, borderTop: `1px solid ${borderColor}` }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

              {/* Header row */}
              <div className="flex items-start gap-5 mb-14">
                {/* Large number */}
                <span
                  className="font-serif font-bold leading-none select-none hidden sm:block shrink-0"
                  style={{ fontSize: "5rem", color: numberColor, marginTop: "-8px" }}
                >
                  {service.number}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: iconBg }}
                    >
                      <Icon size={16} style={{ color: iconColor }} />
                    </div>
                    <span className="text-sm font-medium italic" style={{ color: posColor }}>
                      {service.positioning}
                    </span>
                  </div>
                  <h2
                    className="font-serif font-bold leading-tight tracking-tight"
                    style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: titleColor }}
                  >
                    {service.title}
                  </h2>
                </div>
              </div>

              {/* Two-column layout */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-x-16 gap-y-12">

                {/* Left: overview + who for */}
                <div className="flex flex-col gap-8">
                  <p className="text-base leading-relaxed" style={{ color: bodyColor }}>
                    {service.overview}
                  </p>

                  {/* Who for */}
                  <div
                    className="p-5 rounded-xl"
                    style={{ background: sectionBg, border: `1px solid ${sectionBorder}` }}
                  >
                    <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: sectionLabel }}>
                      Who This Is For
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: bodyColor }}>
                      {service.whoFor}
                    </p>
                  </div>

                  {/* Problems */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: sectionLabel }}>
                      What This Solves
                    </p>
                    <ul className="flex flex-col gap-3">
                      {service.painPoints.map((point) => (
                        <li key={point} className="flex items-start gap-3">
                          <AlertCircle size={13} className="shrink-0 mt-[3px]" style={{ color: "#ef4444" }} />
                          <span className="text-sm leading-relaxed" style={{ color: bodyColor }}>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right: deliverables + outcomes */}
                <div className="flex flex-col gap-8">
                  {/* Deliverables */}
                  <div
                    className="p-6 rounded-xl"
                    style={{ background: sectionBg, border: `1px solid ${sectionBorder}` }}
                  >
                    <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: sectionLabel }}>
                      What We Deliver
                    </p>
                    <ul className="flex flex-col gap-3.5">
                      {service.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-3">
                          <ChevronRight size={13} className="shrink-0 mt-[3px]" style={{ color: iconColor }} />
                          <span className="text-sm leading-relaxed" style={{ color: bodyColor }}>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Outcomes */}
                  <div
                    className="p-6 rounded-xl"
                    style={{
                      background: isDark ? "rgba(5,150,105,0.04)" : "rgba(5,150,105,0.03)",
                      border: isDark ? "1px solid rgba(52,211,153,0.1)" : "1px solid rgba(5,150,105,0.1)",
                    }}
                  >
                    <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: isDark ? "rgba(52,211,153,0.5)" : "rgba(5,150,105,0.5)" }}>
                      What It Unlocks
                    </p>
                    <ul className="flex flex-col gap-3.5">
                      {service.outcomes.map((o) => (
                        <li key={o} className="flex items-start gap-3">
                          <CheckCircle2 size={13} className="shrink-0 mt-[3px]" style={{ color: isDark ? "#34d399" : "#059669" }} />
                          <span className="text-sm leading-relaxed" style={{ color: bodyColor }}>{o}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* 4. Who This Is For */}
      <section style={{ background: "#090C17", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-5" style={{ color: "rgba(255,255,255,0.3)" }}>
                Audience Fit
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold leading-snug mb-6" style={{ color: "#F1F5F9" }}>
                Designed for Organizations<br />Ready to Move Forward
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>
                These services are built for organizations that have moved past the question of whether
                AI matters — and are now focused on how to make it work in the real context of their
                business.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { title: "Scaling companies (50–500 people)", desc: "Complex enough to have real operational friction. Agile enough to actually change." },
                { title: "Teams buried in manual workflows", desc: "The team has grown but the systems haven't kept up. Automation is overdue." },
                { title: "Operations-heavy businesses", desc: "High process volume, real cost to inefficiency, and the margin to fix it." },
                { title: "Organizations with fragmented systems", desc: "Data in five places, no single source of truth, constant manual reconciliation." },
                { title: "Leadership teams needing clarity", desc: "Decisions being made on last week's data — or no structured data at all." },
                { title: "Post-pilot organizations", desc: "You've run the pilot. Now you need someone to help you scale it." },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 p-5 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <CheckCircle2 size={15} className="shrink-0 mt-0.5" style={{ color: "#6366f1" }} />
                  <div>
                    <p className="text-sm font-semibold mb-1" style={{ color: "#E2E8F0" }}>{item.title}</p>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. When to Engage */}
      <section style={{ background: "#F1F5F9" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: "#6366f1" }}>
              Timing & Urgency
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold max-w-xl" style={{ color: "#0F172A" }}>
              When This Becomes Critical
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { signal: "Your team is buried in manual work", consequence: "Capacity is being consumed by tasks that shouldn't require human effort. Every week this continues, it compounds." },
              { signal: "You have data but no visibility", consequence: "Leaders are making decisions based on instinct or stale reports. The data exists — it's just not being used." },
              { signal: "AI feels unclear or overwhelming", consequence: "The team knows it matters but can't agree on where to start. Internal initiatives have stalled or been abandoned." },
              { signal: "Processes are slowing growth", consequence: "You can see the growth opportunity, but the operations can't keep pace. Scaling means scaling the problems." },
              { signal: "Knowledge is leaving with your people", consequence: "Critical expertise is held by individuals, not systems. Every departure is a knowledge loss event." },
              { signal: "Your CX isn't keeping up with volume", consequence: "Response times are slipping. Consistency is breaking down. Customer satisfaction is at risk." },
            ].map((item, i) => (
              <div
                key={i}
                className="p-7 rounded-2xl"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid rgba(15,23,42,0.07)",
                  boxShadow: "0 1px 3px rgba(15,23,42,0.05), 0 6px 18px rgba(15,23,42,0.04)",
                }}
              >
                <div
                  className="w-2 h-2 rounded-full mb-5"
                  style={{ background: "#ef4444" }}
                />
                <h3 className="font-sans font-semibold text-base mb-3 leading-snug" style={{ color: "#0F172A" }}>
                  {item.signal}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>
                  {item.consequence}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Why IMAGENN.AI */}
      <section style={{ background: "#0D1120" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-16 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-5" style={{ color: "rgba(255,255,255,0.3)" }}>
                The Difference
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold leading-snug mb-6" style={{ color: "#F1F5F9" }}>
                Why IMAGENN.AI
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>
                There&apos;s no shortage of consultants who will tell you about AI, or vendors who will
                sell you a tool. We do something different: we implement solutions that actually work
                inside how your organization operates today.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                {
                  title: "Not generic consulting",
                  desc: "No 200-slide strategy decks. Everything we deliver is mapped to your specific operation, systems, and people.",
                },
                {
                  title: "Not AI hype",
                  desc: "We focus on the intersection of what AI does well and what your organization actually needs. No solutions in search of problems.",
                },
                {
                  title: "Built for adoption",
                  desc: "The best implementation fails if nobody uses it. Change enablement and adoption are built into every engagement — not added on at the end.",
                },
                {
                  title: "Designed for real operations",
                  desc: "We understand that organizations run on complex, imperfect workflows. Solutions are designed around reality, not an idealized future state.",
                },
                {
                  title: "Execution from day one",
                  desc: "Strategy is the starting point, not the deliverable. Every engagement is scoped to move from clarity to implementation.",
                },
                {
                  title: "Built for the long term",
                  desc: "We build internal capability alongside every solution — so your organization becomes more capable of running and improving these systems over time.",
                },
              ].map((d) => (
                <div
                  key={d.title}
                  className="p-6 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="w-1 h-7 rounded-full mb-5" style={{ background: "linear-gradient(to bottom, #6366f1, transparent)" }} />
                  <h3 className="font-sans font-semibold text-sm mb-2" style={{ color: "#F1F5F9" }}>
                    {d.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>
                    {d.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Engagement Models */}
      <section style={{ background: "#F8F9FC" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-16 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-5" style={{ color: "#6366f1" }}>
                How We Work Together
              </p>
              <h2 className="font-serif text-3xl font-bold leading-snug mb-6" style={{ color: "#0F172A" }}>
                Engagement Models
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "#475569" }}>
                Every organization is at a different stage. We structure engagements to match where you
                are — and where you want to go.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {[
                {
                  model: "Strategy Engagement",
                  duration: "4–6 weeks",
                  desc: "A focused diagnostic and planning engagement. Ideal when you need clarity before committing to implementation.",
                  fit: "Best for organizations beginning their AI journey or restarting after a stalled initiative.",
                },
                {
                  model: "Implementation Project",
                  duration: "6–16 weeks",
                  desc: "End-to-end build and deploy. Scoped to a specific system, workflow, or set of use cases. Includes testing, integration, and adoption support.",
                  fit: "Best when you have identified a clear opportunity and are ready to build.",
                },
                {
                  model: "Ongoing Advisory",
                  duration: "Monthly retainer",
                  desc: "A structured advisory relationship — regular sessions, on-call access, and strategic guidance as your AI initiatives evolve.",
                  fit: "Best for organizations with multiple active initiatives needing consistent senior-level oversight.",
                },
                {
                  model: "Embedded Support",
                  duration: "Flexible",
                  desc: "An IMAGENN.AI practitioner embedded in your team for a defined period — accelerating delivery and building internal capability.",
                  fit: "Best for larger transformations where continuity and velocity both matter.",
                },
              ].map((m) => (
                <div
                  key={m.model}
                  className="p-6 rounded-xl"
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid rgba(15,23,42,0.07)",
                    boxShadow: "0 1px 3px rgba(15,23,42,0.04), 0 4px 12px rgba(15,23,42,0.03)",
                  }}
                >
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <h3 className="font-sans font-semibold text-base" style={{ color: "#0F172A" }}>
                      {m.model}
                    </h3>
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-md shrink-0"
                      style={{ background: "rgba(99,102,241,0.07)", color: "#6366f1" }}
                    >
                      {m.duration}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: "#374151" }}>{m.desc}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "#94A3B8" }}>{m.fit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Proof placeholder */}
      <section style={{ background: "#090C17" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>
              Transformation Examples
            </p>
            <h2 className="font-serif text-3xl font-bold" style={{ color: "#F1F5F9" }}>
              Results in Practice
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { service: "AI Strategy & Opportunity Mapping", result: "Organization moved from 18 months of stalled initiative to a clear, executed roadmap in 6 weeks." },
              { service: "Workflow Automation", result: "Operations team reclaimed 12 hours per week across 3 departments — redirected to higher-value work." },
              { service: "Intelligent Knowledge Systems", result: "New hire onboarding time reduced from 6 weeks to 3. Senior staff interruptions dropped by over 60%." },
            ].map((item, i) => (
              <div
                key={i}
                className="p-7 rounded-2xl"
                style={{ background: "#0D1120", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-md mb-6 inline-block"
                  style={{ background: "rgba(99,102,241,0.1)", color: "#818cf8" }}
                >
                  {item.service}
                </span>
                <p className="text-sm leading-relaxed mt-4" style={{ color: "rgba(255,255,255,0.55)" }}>
                  {item.result}
                </p>
              </div>
            ))}
          </div>
          <p className="text-xs text-center mt-8" style={{ color: "rgba(255,255,255,0.2)" }}>
            Illustrative examples. Specific outcomes available upon request during strategy session.
          </p>
        </div>
      </section>

      {/* 9. CTA */}
      <section style={{ background: "#1E1B4B" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-5" style={{ color: "rgba(255,255,255,0.35)" }}>
                Ready to Get Started?
              </p>
              <h2
                className="font-serif font-bold leading-tight mb-5"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: "#EEF2FF" }}
              >
                Not Sure Which Service<br />You Need? Let&apos;s Work It Out Together.
              </h2>
              <p className="text-base leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.52)" }}>
                Most engagements start with a strategy conversation. We&apos;ll help you identify where
                to begin and what the right scope looks like for your organization.
              </p>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
                We&apos;ll help you identify where AI creates the most value — no pressure, just clarity.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 lg:justify-end">
              <a
                href="/contact?intent=call"
                className="inline-flex items-center justify-center gap-2.5 h-12 px-8 rounded-lg font-semibold text-sm transition-colors duration-200 hover:bg-[#EEF2FF]"
                style={{ background: "#FFFFFF", color: "#312E81" }}
              >
                Book a Strategy Call
                <ArrowRight size={15} />
              </a>
              <a
                href="/solutions"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg font-semibold text-sm transition-colors duration-200 hover:border-white/30 hover:text-white"
                style={{ color: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.15)" }}
              >
                View Solutions
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
