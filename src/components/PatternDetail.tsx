import { ArrowLeft, Lightbulb, Users, ThumbsUp, ThumbsDown, Target, Code2, Sparkles } from "lucide-react";
import type { Pattern } from "../data/patterns";

interface PatternDetailProps {
  pattern: Pattern;
  onBack: () => void;
}

const categoryStyle: Record<string, { badge: string; accent: string; label: string }> = {
  creational: {
    badge: "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-700/50",
    accent: "from-violet-500 to-purple-600",
    label: "创建型模式",
  },
  structural: {
    badge: "bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-700/50",
    accent: "from-sky-500 to-blue-600",
    label: "结构型模式",
  },
  behavioral: {
    badge: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-700/50",
    accent: "from-amber-500 to-orange-600",
    label: "行为型模式",
  },
};

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-slate-800 flex items-center justify-center text-[var(--color-accent)] dark:text-[var(--color-accent-dark)]">
          {icon}
        </div>
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
          {title}
        </h3>
      </div>
      {children}
    </section>
  );
}

export function PatternDetail({ pattern, onBack }: PatternDetailProps) {
  const style = categoryStyle[pattern.category];

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header area */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <span className={`text-xs px-3 py-1.5 rounded-lg border font-medium ${style.badge}`}>
            {style.label}
          </span>
        </div>

        <div className="flex items-start gap-4 mb-4">
          <span className="text-5xl">{pattern.icon}</span>
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              {pattern.name}
            </h2>
            <p className="text-base text-slate-400 dark:text-slate-500 font-code mt-1">
              {pattern.nameEn}
            </p>
          </div>
        </div>

        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          {pattern.brief}
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-stone-300 dark:via-slate-700 to-transparent mb-10" />

      {/* Analogy */}
      <Section icon={<Lightbulb className="w-4 h-4" />} title="生活中的类比">
        <div className="relative bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/10 rounded-2xl p-6 border border-teal-100 dark:border-teal-800/50">
          <div className="absolute top-4 left-4 text-4xl opacity-10 font-display">"</div>
          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed relative z-10 pl-4">
            {pattern.analogy}
          </p>
        </div>
      </Section>

      {/* Plain language explanation */}
      <Section icon={<Sparkles className="w-4 h-4" />} title="大白话解释">
        <div className="space-y-4">
          {pattern.explain.split("\n\n").map((para, i) => (
            <p
              key={i}
              className="text-base text-slate-600 dark:text-slate-300 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: para
                  .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-800 dark:text-slate-100 font-semibold">$1</strong>')
                  .replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 rounded-md bg-stone-100 dark:bg-slate-800 text-sm font-code text-teal-700 dark:text-teal-300">$1</code>')
              }}
            />
          ))}
        </div>
      </Section>

      {/* Roles */}
      <Section icon={<Users className="w-4 h-4" />} title="参与角色">
        <div className="grid gap-3">
          {pattern.roles.map((role) => (
            <div
              key={role.name}
              className="flex items-start gap-3 bg-white dark:bg-[var(--color-surface-card-dark)] rounded-xl p-4 border border-stone-200 dark:border-slate-800"
            >
              <div className="w-2 h-2 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 mt-2 shrink-0" />
              <div>
                <span className="font-semibold text-sm text-slate-800 dark:text-slate-100 font-code">
                  {role.name}
                </span>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  {role.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Pros & Cons */}
      <div className="grid sm:grid-cols-2 gap-5 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <ThumbsUp className="w-4 h-4 text-emerald-500" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
              优点
            </h3>
          </div>
          <ul className="space-y-2">
            {pattern.pros.map((pro, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300"
              >
                <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-3">
            <ThumbsDown className="w-4 h-4 text-rose-500" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
              缺点
            </h3>
          </div>
          <ul className="space-y-2">
            {pattern.cons.map((con, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300"
              >
                <span className="text-rose-500 mt-0.5 shrink-0">✗</span>
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Usage */}
      <Section icon={<Target className="w-4 h-4" />} title="适用场景">
        <div className="flex flex-wrap gap-2">
          {pattern.usage.map((u, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 dark:bg-slate-800 text-sm text-slate-600 dark:text-slate-300 border border-stone-200 dark:border-slate-700"
            >
              <span className="text-teal-500">◆</span>
              {u}
            </span>
          ))}
        </div>
      </Section>

      {/* Code */}
      <Section icon={<Code2 className="w-4 h-4" />} title="代码示例">
        <div className="relative rounded-2xl overflow-hidden border border-stone-200 dark:border-slate-800">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-stone-100 dark:bg-slate-800/80 border-b border-stone-200 dark:border-slate-700">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400/60" />
              <div className="w-3 h-3 rounded-full bg-amber-400/60" />
              <div className="w-3 h-3 rounded-full bg-emerald-400/60" />
            </div>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-code ml-2">
              TypeScript
            </span>
          </div>
          <pre className="p-5 overflow-x-auto bg-white dark:bg-slate-900 text-sm leading-relaxed">
            <code className="font-code text-slate-700 dark:text-slate-300 whitespace-pre">
              {pattern.code}
            </code>
          </pre>
        </div>
      </Section>

      {/* Back button at bottom */}
      <div className="mt-12 pt-8 border-t border-stone-200 dark:border-slate-800 flex justify-center">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-stone-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-stone-200 dark:hover:bg-slate-700 border border-stone-200 dark:border-slate-700 transition-all text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          返回所有模式
        </button>
      </div>
    </main>
  );
}
