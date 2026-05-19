"use client";

import { useState } from "react";
import Link from "next/link";
import { recipes, searchByKeyword } from "@/lib/recipes";
import { useLang } from "@/components/LangProvider";
import { t } from "@/lib/i18n";
import type { Recipe } from "@/lib/types";

export default function RecipesPage() {
  const { lang } = useLang();
  const T = t(lang);
  const [query, setQuery] = useState("");
  const results: Recipe[] = query.trim() ? searchByKeyword(query) : recipes;

  return (
    <main className="min-h-screen px-6 py-10 max-w-xl mx-auto">
      <Link href="/" className="text-stone-400 text-sm mb-6 block hover:text-orange-500 transition-colors">
        {T.back}
      </Link>
      <h1 className="text-2xl font-bold text-stone-800 mb-6">{T.recipes}</h1>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={T.searchPlaceholder}
        className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-stone-800 placeholder-stone-400 focus:outline-none focus:border-orange-400 mb-6"
      />

      {results.length === 0 ? (
        <p className="text-stone-400 text-center py-12">{T.noResults}</p>
      ) : (
        <div className="space-y-3">
          {results.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/recipes/${recipe.id}`}
              className="flex items-start gap-4 bg-white rounded-2xl px-5 py-4 shadow-sm border border-stone-100 hover:border-orange-300 hover:shadow-md transition-all"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-semibold text-stone-800">
                    {lang === "zh" ? recipe.name : recipe.name_en}
                  </span>
                  <span className="text-xs text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">
                    {lang === "zh" ? recipe.category : recipe.category_en}
                  </span>
                  <span className="text-xs text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">
                    {lang === "zh" ? recipe.flavor : recipe.flavor_en}
                  </span>
                </div>
                <p className="text-stone-500 text-sm">
                  {lang === "zh" ? recipe.description : recipe.description_en}
                </p>
                <div className="flex gap-1.5 mt-2 flex-wrap">
                  {(lang === "zh" ? recipe.tags : recipe.tags_en).map((tag) => (
                    <span key={tag} className="text-xs text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right shrink-0 pt-0.5">
                <div className="text-sm font-medium text-stone-600">{recipe.time}{T.minutes}</div>
                <div className="text-xs text-stone-400">{recipe.serving} {T.servings}</div>
                <div className="flex gap-0.5 mt-1.5 justify-end">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${i < recipe.difficulty ? "bg-orange-400" : "bg-stone-200"}`}
                    />
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
