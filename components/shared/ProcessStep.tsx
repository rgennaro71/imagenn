// components/shared/ProcessStep.tsx

interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  outcome: string;
  isLast?: boolean;
}

export function ProcessStep({ number, title, description, outcome, isLast }: ProcessStepProps) {
  return (
    <div className="relative flex flex-col items-start">
      {!isLast && (
        <div
          className="hidden lg:block absolute top-5 left-full w-full h-px -translate-y-px"
          style={{ background: "linear-gradient(90deg, rgba(99,102,241,0.3), transparent)" }}
          aria-hidden="true"
        />
      )}

      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white mb-5 shrink-0"
        style={{ background: "linear-gradient(135deg, #6366f1, #22d3ee)" }}
      >
        {number}
      </div>

      <h3 className="font-sans font-bold text-lg text-slate-primary mb-3">{title}</h3>
      <p className="text-sm text-slate-secondary leading-relaxed mb-4">{description}</p>
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-light">
          Outcome:{" "}
        </span>
        <span className="text-xs text-slate-muted">{outcome}</span>
      </div>
    </div>
  );
}
