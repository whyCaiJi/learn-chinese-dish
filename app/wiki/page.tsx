"use client";

import Link from "next/link";
import { wikiEntries, getWikiCategories } from "@/lib/wiki";
import { useLang } from "@/components/LangProvider";
import { t } from "@/lib/i18n";

const WIKI_UI = {
  zh: { title: "烹饪原理 Wiki", subtitle: "万能公式与底层逻辑，知道为什么，才能举一反三", back: "← 返回" },
  en: { title: "Cooking Science Wiki", subtitle: "Universal formulas and underlying logic — understand the why, and everything else follows", back: "← Back" },
};

export default function WikiPage() {
  const { lang } = useLang();
  const W = WIKI_UI[lang];
  const categories = getWikiCategories(lang);

  return (
    <main className="min-h-screen px-6 py-10 max-w-xl mx-auto">
      <Link href="/" className="text-stone-400 text-sm mb-6 block hover:text-orange-500 transition-colors">
        {W.back}
      </Link>
      <h1 className="text-2xl font-bold text-stone-800 mb-1">{W.title}</h1>
      <p className="text-stone-500 text-sm mb-8">{W.subtitle}</p>

      {categories.map((cat) => {
        const entries = wikiEntries.filter(
          (e) => (lang === "zh" ? e.category : e.category_en) === cat
        );
        return (
          <div key={cat} className="mb-8">
            <h2 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3 px-1">
              {cat}
            </h2>
            <div className="space-y-2">
              {entries.map((entry) => (
                <Link
                  key={entry.id}
                  href={`/wiki/${entry.id}`}
                  className="flex items-center gap-4 bg-white rounded-2xl px-5 py-4 shadow-sm border border-stone-100 hover:border-orange-300 hover:shadow-md transition-all"
                >
                  <span className="text-2xl shrink-0">{entry.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-stone-800 text-sm">
                      {lang === "zh" ? entry.title : entry.title_en}
                    </p>
                    <p className="text-stone-400 text-xs mt-0.5 truncate">
                      {lang === "zh" ? entry.summary : entry.summary_en}
                    </p>
                  </div>
                  <svg className="w-4 h-4 text-stone-300 shrink-0" viewBox="0 0 16 16" fill="none">
                    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </main>
  );
}
