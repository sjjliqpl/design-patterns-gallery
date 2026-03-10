interface HeroProps {
  totalPatterns: number;
}

export function Hero({ totalPatterns }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-br from-teal-200/30 to-emerald-200/20 dark:from-teal-900/20 dark:to-emerald-900/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-amber-100/30 to-orange-100/20 dark:from-amber-900/10 dark:to-orange-900/5 blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-sm mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
            {totalPatterns} 种经典设计模式
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-slate-900 dark:text-white leading-tight tracking-tight mb-6">
            用
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400">
              大白话
            </span>
            <br className="sm:hidden" />
            理解设计模式
          </h2>

          <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            抛开晦涩的定义，用生活中的例子来解释每一种设计模式。
            <br className="hidden sm:block" />
            让你真正理解「为什么要用」以及「什么时候用」。
          </p>

          <div className="flex items-center justify-center gap-8 mt-10">
            {[
              { icon: "🏗️", label: "创建型", count: 5 },
              { icon: "🧩", label: "结构型", count: 6 },
              { icon: "🎭", label: "行为型", count: 5 },
            ].map((cat) => (
              <div key={cat.label} className="text-center">
                <div className="text-2xl mb-1">{cat.icon}</div>
                <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {cat.label}
                </div>
                <div className="text-xs text-slate-400 dark:text-slate-500">
                  {cat.count} 种模式
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-stone-300 dark:via-slate-700 to-transparent" />
    </section>
  );
}
