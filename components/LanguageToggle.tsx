"use client";

import { useLang } from "./LangProvider";

export function LanguageToggle() {
  const { lang, setLang } = useLang();
  return (
    <button
      onClick={() => setLang(lang === "zh" ? "en" : "zh")}
      className="fixed top-4 right-4 z-50 bg-white border border-stone-200 rounded-full px-3 py-1.5 text-sm font-medium text-stone-600 hover:border-orange-300 hover:text-orange-600 shadow-sm transition-all"
    >
      {lang === "zh" ? "EN" : "中文"}
    </button>
  );
}
