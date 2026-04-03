// content/use-cases.ts

export type UseCase = {
  category: string;
  problem: string;
  solution: string;
  impact: string;
};

export const useCases: Record<string, UseCase[]> = {
  Operations: [
    {
      problem: "Reporting takes hours of manual data aggregation every week.",
      solution: "Automated reporting pipelines pull data from all sources and deliver formatted reports on schedule.",
      impact: "Eliminate 80% of manual reporting time. Insights arrive faster, decisions improve.",
      category: "Operations",
    },
    {
      problem: "Approval workflows are slow, inconsistent, and tracked in email threads.",
      solution: "Structured digital workflows route requests, capture decisions, and enforce SLAs automatically.",
      impact: "Decisions in hours instead of days. Full audit trail. Fewer things falling through the cracks.",
      category: "Operations",
    },
    {
      problem: "Staff spend hours on manual data entry across disconnected systems.",
      solution: "AI-powered integrations and automation eliminate duplicate entry and keep systems in sync.",
      impact: "Hours reclaimed per week per person. Data accuracy improves. Staff focus on higher-value work.",
      category: "Operations",
    },
  ],
  Sales: [
    {
      problem: "Sales reps waste time manually qualifying leads that will never convert.",
      solution: "AI scoring models evaluate inbound leads against your ideal customer profile automatically.",
      impact: "Reps focus only on high-probability opportunities. Conversion rates improve. Pipeline moves faster.",
      category: "Sales",
    },
    {
      problem: "Writing proposals takes days and still ends up inconsistent.",
      solution: "AI-assisted proposal generation pulls from a curated library and customizes for each opportunity.",
      impact: "Proposals produced in hours. Consistent, on-brand, and tailored every time.",
      category: "Sales",
    },
    {
      problem: "No visibility into where deals are stalling or why pipeline is slipping.",
      solution: "Pipeline intelligence dashboards surface risk signals and stall points in real time.",
      impact: "Managers intervene early. Forecasting accuracy improves. Revenue leakage reduced.",
      category: "Sales",
    },
  ],
  Marketing: [
    {
      problem: "Campaign performance data is scattered across 5 different platforms.",
      solution: "Unified marketing automation pulls all performance data into one dashboard with automated alerts.",
      impact: "Single source of truth. Marketing decisions backed by complete data. Faster optimization cycles.",
      category: "Marketing",
    },
    {
      problem: "Content briefs take days to research and write from scratch.",
      solution: "AI brief generation tools produce research-backed content outlines from a target keyword or topic.",
      impact: "Brief production time cut by 70%. Content team focuses on writing, not research.",
      category: "Marketing",
    },
    {
      problem: "Audience segmentation is manual and based on guesswork.",
      solution: "AI-assisted segmentation analyzes behavioral data to identify meaningful audience clusters.",
      impact: "More precise targeting. Higher engagement rates. Less budget wasted on wrong audiences.",
      category: "Marketing",
    },
  ],
  "Customer Experience": [
    {
      problem: "Support tickets get routed to the wrong team and bounce between agents.",
      solution: "Intelligent routing classifies incoming requests by type, urgency, and expertise needed.",
      impact: "First-contact resolution improves. Handle time drops. Customer satisfaction scores rise.",
      category: "Customer Experience",
    },
    {
      problem: "New customer onboarding is inconsistent and relies on individual reps remembering the process.",
      solution: "Automated onboarding workflows trigger the right actions at the right time, every time.",
      impact: "Consistent experience for every customer. Time-to-value improves. Churn in first 90 days drops.",
      category: "Customer Experience",
    },
    {
      problem: "Support team spends most of their time answering the same questions repeatedly.",
      solution: "AI-powered FAQ resolution handles common queries automatically with escalation paths for complex cases.",
      impact: "50–70% of tier-1 queries handled without human intervention. Team focuses on complex issues.",
      category: "Customer Experience",
    },
  ],
  Leadership: [
    {
      problem: "Leadership doesn't have real-time visibility into KPIs — they wait for weekly reports.",
      solution: "Executive dashboards surface the metrics that matter, updated in real time from live data sources.",
      impact: "Leaders make decisions on current data. Weekly status meetings get shorter. Surprises decrease.",
      category: "Leadership",
    },
    {
      problem: "Board reporting takes the leadership team 2–3 days to compile every quarter.",
      solution: "Automated board reporting pulls data, formats slides, and flags anomalies for human review.",
      impact: "Reporting time drops from days to hours. Leadership spends time on narrative, not data assembly.",
      category: "Leadership",
    },
    {
      problem: "No structured way to capture and act on data needed for strategic decisions.",
      solution: "AI-powered decision briefing tools aggregate relevant data and surface it in the right format at decision time.",
      impact: "Faster, better-informed strategic decisions. Less meeting time spent gathering information.",
      category: "Leadership",
    },
  ],
  "Team Productivity": [
    {
      problem: "Teams spend hours searching for information spread across emails, docs, and chat.",
      solution: "Internal AI copilots connect to your knowledge sources and answer questions in natural language.",
      impact: "Information retrieval time drops dramatically. Onboarding new staff becomes faster and easier.",
      category: "Team Productivity",
    },
    {
      problem: "Meeting follow-up is inconsistent — action items get lost and decisions aren't recorded.",
      solution: "Meeting intelligence tools capture, transcribe, summarize, and distribute action items automatically.",
      impact: "Every meeting has a clear record. Action items tracked. Accountability improves.",
      category: "Team Productivity",
    },
    {
      problem: "Repetitive internal workflows slow every department but aren't worth a full engineering project.",
      solution: "Lightweight AI workflow tools handle the most common internal tasks with no engineering overhead.",
      impact: "Hours reclaimed per team per week. Morale improves when busywork disappears.",
      category: "Team Productivity",
    },
  ],
  "Knowledge Management": [
    {
      problem: "Institutional knowledge lives in people's heads and walks out the door when they leave.",
      solution: "Centralized, searchable knowledge bases capture processes, decisions, and expertise in structured formats.",
      impact: "Knowledge becomes a durable organizational asset. Onboarding faster. Expertise accessible to all.",
      category: "Knowledge Management",
    },
    {
      problem: "Staff can't find answers in long policy documents or dense internal guides.",
      solution: "Document Q&A systems let staff ask questions in plain language and get accurate, cited answers instantly.",
      impact: "Information retrieval time drops from hours to seconds. Fewer interruptions to senior staff.",
      category: "Knowledge Management",
    },
    {
      problem: "Onboarding new employees takes weeks because knowledge is unstructured and tribal.",
      solution: "AI-powered onboarding knowledge systems guide new hires through the right information at the right time.",
      impact: "Time-to-productivity for new hires improves significantly. Consistent onboarding every time.",
      category: "Knowledge Management",
    },
  ],
};

export const useCaseCategories = Object.keys(useCases);
