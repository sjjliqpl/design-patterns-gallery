import type { Pattern } from "../data/patterns";

interface PatternCardProps {
  pattern: Pattern;
  index: number;
  onClick: () => void;
}

const categoryBadge: Record<string, string> = {
  creational:
    "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-700/50",
  structural:
    "bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-700/50",
  behavioral:
    "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-700/50",
};

const categoryLabel: Record<string, string> = {
  creational: "创建型",
  structural: "结构型",
  behavioral: "行为型",
};

export function PatternCard({ pattern, index, onClick }: PatternCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative text-left bg-white dark:bg-[var(--color-surface-card-dark)] rounded-2xl border border-stone-200 dark:border-slate-800 p-6 hover:border-teal-300 dark:hover:border-teal-700 hover:shadow-xl hover:shadow-teal-500/5 dark:hover:shadow-teal-500/5 transition-all duration-300 hover:-translate-y-0.5"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Top row: icon + category */}
      <div className="flex items-start justify-between mb-4">
        <span className="text-3xl">{pattern.icon}</span>
        <span
          className={`text-xs px-2.5 py-1 rounded-lg border font-medium ${categoryBadge[pattern.category]}`}
        >
          {categoryLabel[pattern.category]}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1 group-hover:text-[var(--color-accent)] dark:group-hover:text-[var(--color-accent-dark)] transition-colors">
        {pattern.name}
      </h3>
      <p className="text-xs text-slate-400 dark:text-slate-500 font-code mb-3">
        {pattern.nameEn}
      </p>

      {/* Brief */}
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
        {pattern.brief}
      </p>

      {/* Bottom hint */}
      <div className="mt-4 pt-4 border-t border-stone-100 dark:border-slate-800 flex items-center justify-between">
        <span className="text-xs text-slate-400 dark:text-slate-500">
          点击查看详情
        </span>
        <span className="text-xs text-[var(--color-accent)] dark:text-[var(--color-accent-dark)] opacity-0 group-hover:opacity-100 transition-opacity font-medium">
          了解更多 →
        </span>
      </div>
    </button>
  );
}
