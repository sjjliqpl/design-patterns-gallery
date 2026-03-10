import type { CategoryInfo, Category } from "../data/patterns";

type FilterCategory = "all" | Category;

interface CategoryNavProps {
  categories: CategoryInfo[];
  active: FilterCategory;
  onChange: (c: FilterCategory) => void;
  counts: Record<FilterCategory, number>;
}

const categoryColors: Record<FilterCategory, string> = {
  all: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700",
  creational:
    "bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800",
  structural:
    "bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800",
  behavioral:
    "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
};

const activeColors: Record<FilterCategory, string> = {
  all: "bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 border-slate-800 dark:border-slate-200 shadow-lg shadow-slate-800/20",
  creational:
    "bg-violet-600 dark:bg-violet-500 text-white border-violet-600 dark:border-violet-500 shadow-lg shadow-violet-600/20",
  structural:
    "bg-sky-600 dark:bg-sky-500 text-white border-sky-600 dark:border-sky-500 shadow-lg shadow-sky-600/20",
  behavioral:
    "bg-amber-600 dark:bg-amber-500 text-white border-amber-600 dark:border-amber-500 shadow-lg shadow-amber-600/20",
};

export function CategoryNav({
  categories,
  active,
  onChange,
  counts,
}: CategoryNavProps) {
  const allItems: { id: FilterCategory; name: string; icon: string }[] = [
    { id: "all", name: "全部", icon: "✦" },
    ...categories.map((c) => ({ id: c.id as FilterCategory, name: c.name.replace("模式", ""), icon: c.icon })),
  ];

  return (
    <nav className="py-8">
      <div className="flex flex-wrap items-center gap-3">
        {allItems.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200 ${
                isActive
                  ? activeColors[item.id]
                  : `${categoryColors[item.id]} hover:scale-[1.02]`
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
              <span
                className={`text-xs px-1.5 py-0.5 rounded-md ${
                  isActive
                    ? "bg-white/20 text-white/90"
                    : "bg-black/5 dark:bg-white/10 text-current opacity-60"
                }`}
              >
                {counts[item.id]}
              </span>
            </button>
          );
        })}
      </div>

      {active !== "all" && (
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          {categories.find((c) => c.id === active)?.desc}
        </p>
      )}
    </nav>
  );
}
