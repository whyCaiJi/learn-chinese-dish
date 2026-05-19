"use client";

import { useState } from "react";
import Link from "next/link";
import { searchByIngredients } from "@/lib/recipes";
import { useLang } from "@/components/LangProvider";
import { t } from "@/lib/i18n";
import type { Recipe } from "@/lib/types";

const COMMON_INGREDIENTS_ZH = ["鸡肉", "猪肉", "牛肉", "鱼", "鸡蛋", "西红柿", "土豆", "豆腐", "白菜", "茄子", "花生", "豆瓣酱", "生抽", "料酒"];
const COMMON_INGREDIENTS_EN = ["chicken", "pork", "beef", "fish", "egg", "tomato", "potato", "tofu", "cabbage", "eggplant", "peanut", "soy sauce", "vinegar", "ginger"];

export default function SuggestPage() {
  const { lang } = useLang();
  const T = t(lang);
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [results, setResults] = useState<Recipe[] | null>(null);

  const COMMON = lang === "zh" ? COMMON_INGREDIENTS_ZH : COMMON_INGREDIENTS_EN;

  function addIngredient(name: string) {
    const trimmed = name.trim();
    if (!trimmed || selected.includes(trimmed)) return;
    setSelected((prev) => [...prev, trimmed]);
    setInput("");
    setResults(null);
  }

  function removeIngredient(name: string) {
    setSelected((prev) => prev.filter((n) => n !== name));
    setResults(null);
  }

  function handleSearch() {
    if (selected.length === 0) return;
    setResults(searchByIngredients(selected));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addIngredient(input);
    }
  }

  return (
    <main className="min-h-screen px-6 py-10 max-w-xl mx-auto">
      <Link href="/" className="text-stone-400 text-sm mb-6 block hover:text-orange-500 transition-colors">
        {T.back}
      </Link>
      <h1 className="text-2xl font-bold text-stone-800 mb-2">{T.suggestTitle}</h1>
      <p className="text-stone-500 text-sm mb-6">{T.suggestSubtitle}</p>

      <div className="bg-white rounded-2xl border border-stone-200 p-4 mb-4">
        <div className="flex flex-wrap gap-2 mb-3">
          {selected.map((name) => (
            <span key={name} className="inline-flex items-center gap-1 bg-orange-50 text-orange-700 border border-orange-200 rounded-full px-3 py-1 text-sm">
              {name}
              <button onClick={() => removeIngredient(name)} className="hover:text-orange-900 text-orange-400 leading-none">×</button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={T.addPlaceholder}
            className="flex-1 border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-orange-400"
          />
          <button
            onClick={() => addIngredient(input)}
            disabled={!input.trim()}
            className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-200 disabled:opacity-40 transition-colors"
          >
            {T.addIngredient}
          </button>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-xs text-stone-400 mb-2">{T.commonIngredients}</p>
        <div className="flex flex-wrap gap-2">
          {COMMON.map((name) => (
            <button
              key={name}
              onClick={() => addIngredient(name)}
              disabled={selected.includes(name)}
              className="text-sm px-3 py-1.5 bg-white border border-stone-200 rounded-full text-stone-600 hover:border-orange-300 hover:text-orange-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleSearch}
        disabled={selected.length === 0}
        className="w-full py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors mb-8"
      >
        {T.searchButton}
      </button>

      {results !== null && (
        <div>
          {results.length === 0 ? (
            <p className="text-stone-400 text-center py-8">{T.noMatch}</p>
          ) : (
            <>
              <h2 className="text-stone-700 font-semibold mb-3">{T.foundRecipes(results.length)}</h2>
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
                      </div>
                      <p className="text-stone-500 text-sm">{lang === "zh" ? recipe.description : recipe.description_en}</p>
                      <div className="flex gap-1.5 mt-2 flex-wrap">
                        {recipe.ingredients.map((ing) => (
                          <span
                            key={ing.name}
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              selected.some((s) => ing.name.toLowerCase().includes(s.toLowerCase()) || ing.name_en.toLowerCase().includes(s.toLowerCase()))
                                ? "bg-orange-100 text-orange-700 font-medium"
                                : "bg-stone-100 text-stone-500"
                            }`}
                          >
                            {lang === "zh" ? ing.name : ing.name_en}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right shrink-0 pt-0.5">
                      <div className="text-sm font-medium text-stone-600">{recipe.time}{T.minutes}</div>
                      <div className="flex gap-0.5 mt-1.5 justify-end">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <div key={i} className={`w-2 h-2 rounded-full ${i < recipe.difficulty ? "bg-orange-400" : "bg-stone-200"}`} />
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </main>
  );
}
