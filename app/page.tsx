"use client";

import Link from "next/link";
import { recipes } from "@/lib/recipes";
import { useLang } from "@/components/LangProvider";
import { t } from "@/lib/i18n";

export default function Home() {
  const { lang } = useLang();
  const T = t(lang);

  return (
    <main className="min-h-screen flex flex-col">
      <section className="px-6 pt-16 pb-10 text-center">
        <h1 className="text-4xl font-bold text-stone-800 mb-3 tracking-tight">
          {T.siteTitle}
        </h1>
        <p className="text-stone-500 text-lg max-w-md mx-auto">
          {T.siteSubtitle}
        </p>
      </section>

      <section className="px-6 pb-10 max-w-xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/recipes"
            className="group bg-white rounded-2xl p-6 shadow-sm border border-stone-100 hover:border-orange-300 hover:shadow-md transition-all"
          >
            <div className="text-3xl mb-3">🍳</div>
            <h2 className="font-semibold text-stone-800 text-lg mb-1">{T.browse}</h2>
            <p className="text-stone-500 text-sm">{T.browseDesc}</p>
          </Link>

          <Link
            href="/suggest"
            className="group bg-white rounded-2xl p-6 shadow-sm border border-stone-100 hover:border-orange-300 hover:shadow-md transition-all"
          >
            <div className="text-3xl mb-3">🥬</div>
            <h2 className="font-semibold text-stone-800 text-lg mb-1">{T.suggest}</h2>
            <p className="text-stone-500 text-sm">{T.suggestDesc}</p>
          </Link>

          <Link
            href="/wiki"
            className="group bg-white rounded-2xl p-6 shadow-sm border border-stone-100 hover:border-orange-300 hover:shadow-md transition-all sm:col-span-2"
          >
            <div className="text-3xl mb-3">🔬</div>
            <h2 className="font-semibold text-stone-800 text-lg mb-1">
              {lang === "zh" ? "烹饪原理 Wiki" : "Cooking Science Wiki"}
            </h2>
            <p className="text-stone-500 text-sm">
              {lang === "zh"
                ? "去腥公式、味型比例、油温判断、炝锅原理……系统学习中餐底层逻辑"
                : "Deodorizing formulas, flavor ratios, oil temperature, wok techniques — the underlying logic of Chinese cooking"}
            </p>
          </Link>
        </div>
      </section>

      <section className="px-6 pb-16 max-w-xl mx-auto w-full">
        <h2 className="text-stone-700 font-semibold mb-4">{T.allRecipes}</h2>
        <div className="space-y-3">
          {recipes.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/recipes/${recipe.id}`}
              className="flex items-center gap-4 bg-white rounded-2xl px-5 py-4 shadow-sm border border-stone-100 hover:border-orange-300 hover:shadow-md transition-all"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-stone-800">
                    {lang === "zh" ? recipe.name : recipe.name_en}
                  </span>
                  <span className="text-xs text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">
                    {lang === "zh" ? recipe.category : recipe.category_en}
                  </span>
                  {(lang === "zh" ? recipe.tags : recipe.tags_en).slice(0, 2).map((tag) => (
                    <span key={tag} className="text-xs text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-stone-500 text-sm mt-1 truncate">
                  {lang === "zh" ? recipe.description : recipe.description_en}
                </p>
              </div>
              <div className="text-right shrink-0">
                <div className="text-xs text-stone-400">{recipe.time}{T.minutes}</div>
                <div className="flex gap-0.5 mt-1">
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
      </section>
    </main>
  );
}
