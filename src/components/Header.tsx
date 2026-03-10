import { Search, Moon, Sun, ArrowLeft } from "lucide-react";

interface HeaderProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onBack?: () => void;
}

export function Header({
  theme,
  toggleTheme,
  searchQuery,
  setSearchQuery,
  onBack,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[var(--color-surface-warm)]/80 dark:bg-[var(--color-surface-deep)]/80 border-b border-stone-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <div className="flex items-center gap-3 shrink-0">
            {onBack ? (
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-[var(--color-accent)] dark:hover:text-[var(--color-accent-dark)] transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline text-sm font-medium">返回列表</span>
              </button>
            ) : (
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 dark:from-teal-400 dark:to-emerald-500 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-teal-500/20">
                  D
                </div>
                <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight">
                  设计模式<span className="hidden sm:inline text-slate-400 dark:text-slate-500 font-normal ml-1.5 text-sm">图鉴</span>
                </h1>
              </div>
            )}
          </div>

          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
              <input
                type="text"
                placeholder="搜索模式名称、关键词..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-stone-100 dark:bg-slate-800/80 border border-stone-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/40 dark:focus:ring-teal-400/40 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <button
            onClick={toggleTheme}
            className="shrink-0 w-10 h-10 rounded-xl bg-stone-100 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-[var(--color-accent)] dark:hover:text-[var(--color-accent-dark)] hover:border-teal-300 dark:hover:border-teal-600 transition-all"
            aria-label="切换主题"
          >
            {theme === "dark" ? (
              <Sun className="w-[18px] h-[18px]" />
            ) : (
              <Moon className="w-[18px] h-[18px]" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
