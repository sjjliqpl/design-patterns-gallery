import { useState, useEffect, useCallback } from "react";
import {
  patterns,
  categories,
  searchPatterns,
  type Category,
} from "./data/patterns";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { CategoryNav } from "./components/CategoryNav";
import { PatternCard } from "./components/PatternCard";
import { PatternDetail } from "./components/PatternDetail";
import "./index.css";

type View = "grid" | "detail";
type FilterCategory = "all" | Category;

function App() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("dp-theme") as "light" | "dark") || "dark";
    }
    return "dark";
  });
  const [view, setView] = useState<View>("grid");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [category, setCategory] = useState<FilterCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("dp-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  const openPattern = useCallback((id: string) => {
    setSelectedId(id);
    setView("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const goBack = useCallback(() => {
    setView("grid");
    setSelectedId(null);
  }, []);

  const filteredPatterns = (() => {
    let result = patterns;
    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }
    if (searchQuery.trim()) {
      const searched = searchPatterns(searchQuery);
      if (category !== "all") {
        result = searched.filter((p) => p.category === category);
      } else {
        result = searched;
      }
    }
    return result;
  })();

  const selectedPattern = selectedId
    ? patterns.find((p) => p.id === selectedId) ?? null
    : null;

  return (
    <div className="min-h-screen bg-[var(--color-surface-warm)] dark:bg-[var(--color-surface-deep)] font-body transition-colors duration-300">
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onBack={view === "detail" ? goBack : undefined}
      />

      {view === "grid" && (
        <>
          <Hero totalPatterns={patterns.length} />

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
            <CategoryNav
              categories={categories}
              active={category}
              onChange={setCategory}
              counts={{
                all: patterns.length,
                creational: patterns.filter((p) => p.category === "creational").length,
                structural: patterns.filter((p) => p.category === "structural").length,
                behavioral: patterns.filter((p) => p.category === "behavioral").length,
              }}
            />

            {searchQuery && (
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                找到 <span className="font-semibold text-[var(--color-accent)] dark:text-[var(--color-accent-dark)]">{filteredPatterns.length}</span> 个匹配的模式
              </p>
            )}

            {filteredPatterns.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-6xl mb-4">🔍</p>
                <p className="text-xl text-slate-500 dark:text-slate-400">
                  没有找到匹配的设计模式
                </p>
                <p className="text-sm text-slate-400 dark:text-slate-500 mt-2">
                  试试其他关键词？
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredPatterns.map((pattern, index) => (
                  <PatternCard
                    key={pattern.id}
                    pattern={pattern}
                    index={index}
                    onClick={() => openPattern(pattern.id)}
                  />
                ))}
              </div>
            )}
          </main>
        </>
      )}

      {view === "detail" && selectedPattern && (
        <PatternDetail pattern={selectedPattern} onBack={goBack} />
      )}

      <footer className="border-t border-stone-200 dark:border-slate-800 py-8 text-center">
        <p className="text-sm text-slate-400 dark:text-slate-500">
          基于{" "}
          <a
            href="https://github.com/me115/design_patterns"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-accent)] dark:text-[var(--color-accent-dark)] hover:underline"
          >
            图说设计模式
          </a>{" "}
          重新演绎 · 用大白话解释设计模式
        </p>
      </footer>
    </div>
  );
}

export default App;
