// components/sections/SpeakingFAQ.tsx
"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "What topics does Rob speak on?",
    a: "Rob speaks on AI innovation and adoption, digital transformation, the future of work, operational intelligence, practical automation strategy, and how organizations build AI-ready cultures and capabilities. Each talk can be tailored to your specific industry and audience.",
  },
  {
    q: "What types of events is Rob available for?",
    a: "Rob is available for keynotes, conference sessions, panel discussions, fireside chats, executive workshops, leadership offsites, corporate briefings, podcast interviews, and private team sessions. If you have a format not listed here, reach out — he is flexible.",
  },
  {
    q: "Is Rob available for virtual or hybrid events?",
    a: "Yes. Rob is available for in-person, virtual, and hybrid engagements globally. Virtual sessions are delivered with the same level of preparation, engagement, and quality as in-person appearances.",
  },
  {
    q: "Does Rob customize talks for specific industries or audiences?",
    a: "Every engagement is prepared with your audience in mind. Rob researches your industry context, organization type, and audience composition before each session to ensure the content is directly relevant and immediately applicable — not generic.",
  },
  {
    q: "How far in advance should we book?",
    a: "We recommend reaching out at least 6–8 weeks before your event to confirm availability and allow adequate time for preparation and customization. For large conferences or complex engagements, earlier is better. For shorter-notice inquiries, reach out anyway — if the timing works, we will make it happen.",
  },
  {
    q: "Can Rob participate in panels and fireside chats?",
    a: "Yes. Rob is an experienced panelist and is comfortable in structured and unstructured conversation formats. He can participate as a panelist, moderator, or fireside chat guest depending on your format and goals.",
  },
  {
    q: "Are workshops or executive sessions available?",
    a: "Yes. Rob offers half-day and full-day interactive workshops for executive teams, leadership cohorts, and operational groups. These sessions go deeper than a keynote — with frameworks, discussion, and practical application built into the experience.",
  },
  {
    q: "What information should we include in the inquiry?",
    a: "The most helpful details are: event name and type, expected audience size and composition, your preferred date and location, the speaking format you are considering, and any specific themes or challenges you want the session to address. The more context you provide, the better we can assess fit and respond with a useful proposal.",
  },
  {
    q: "Is this suitable for corporate leadership teams?",
    a: "Yes — and this is where Rob's perspective is most valuable. His work sits at the intersection of executive strategy and operational reality, making him particularly relevant for leadership teams navigating AI adoption, transformation, and organizational modernization.",
  },
  {
    q: "How long are typical sessions?",
    a: "Keynotes typically run 30–60 minutes. Panels and fireside chats are usually 30–45 minutes. Workshops are half-day (3–4 hours) or full-day (6–7 hours). Executive briefings are typically 60–90 minutes. All session lengths can be adjusted to fit your program.",
  },
  {
    q: "Does Rob provide supporting materials after the session?",
    a: "Yes. Depending on the engagement type, Rob can provide a summary framework document, key takeaway sheet, or recommended next steps for your audience following the session.",
  },
  {
    q: "What is the process after we submit an inquiry?",
    a: "After submitting the inquiry form, you will receive a confirmation within 1 business day. We will then follow up within 2 business days to discuss your event in more detail, confirm availability, and outline next steps. We aim to make the booking process straightforward and low-friction.",
  },
];

export function SpeakingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="flex flex-col divide-y" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
      {faqs.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => toggle(i)}
              className="w-full flex items-start justify-between gap-6 py-6 text-left transition-colors duration-150 group"
              aria-expanded={isOpen}
            >
              <span
                className="font-sans font-medium text-base leading-snug transition-colors duration-150"
                style={{ color: isOpen ? "#F1F5F9" : "rgba(241,245,249,0.75)" }}
              >
                {item.q}
              </span>
              <span
                className="mt-0.5 shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200"
                style={{
                  background: isOpen ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.05)",
                  border: isOpen ? "1px solid rgba(99,102,241,0.3)" : "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {isOpen
                  ? <Minus size={13} style={{ color: "#818cf8" }} />
                  : <Plus size={13} style={{ color: "rgba(255,255,255,0.4)" }} />
                }
              </span>
            </button>

            {/* CSS grid-based height animation — no layout reflow */}
            <div
              style={{
                display: "grid",
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                transition: "grid-template-rows 0.32s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <div style={{ overflow: "hidden" }}>
                <p
                  className="text-sm leading-relaxed pb-6"
                  style={{ color: "rgba(255,255,255,0.42)" }}
                >
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
