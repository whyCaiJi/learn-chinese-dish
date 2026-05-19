"use client";

import Link from "next/link";
import { useLang } from "./LangProvider";
import { t } from "@/lib/i18n";
import { IngredientCards } from "./IngredientCards";
import { StepsList } from "./StepsList";
import { PrinciplesSection } from "./PrinciplesSection";
import type { Recipe } from "@/lib/types";

export function RecipeDetailClient({ recipe }: { recipe: Recipe }) {
  const { lang } = useLang();
  const T = t(lang);

  const name = lang === "zh" ? recipe.name : recipe.name_en;
  const description = lang === "zh" ? recipe.description : recipe.description_en;
  const category = lang === "zh" ? recipe.category : recipe.category_en;
  const flavor = lang === "zh" ? recipe.flavor : recipe.flavor_en;
  const tags = lang === "zh" ? recipe.tags : recipe.tags_en;
  const steps = lang === "zh" ? recipe.steps : recipe.steps_en;
  const principles = lang === "zh" ? recipe.principles : recipe.principles_en;

  return (
    <main className="min-h-screen pb-20">
      <div className="px-6 pt-10 pb-6 max-w-2xl mx-auto">
        <Link href="/recipes" className="text-stone-400 text-sm mb-6 block hover:text-orange-500 transition-colors">
          {T.backToRecipes}
        </Link>
        <h1 className="text-3xl font-bold text-stone-800 mb-2">{name}</h1>
        <p className="text-stone-500">{description}</p>

        <div className="flex flex-wrap gap-2 mt-4">
          <span className="text-sm bg-stone-100 text-stone-600 px-3 py-1 rounded-full">{category}</span>
          <span className="text-sm bg-stone-100 text-stone-600 px-3 py-1 rounded-full">{flavor}</span>
          <span className="text-sm bg-orange-50 text-orange-600 px-3 py-1 rounded-full">⏱ {recipe.time} {lang === "zh" ? "分钟" : "min"}</span>
          <span className="text-sm bg-orange-50 text-orange-600 px-3 py-1 rounded-full">👥 {recipe.serving} {lang === "zh" ? "人份" : "servings"}</span>
          {tags.map((tag) => (
            <span key={tag} className="text-sm bg-orange-50 text-orange-600 px-3 py-1 rounded-full">{tag}</span>
          ))}
        </div>
      </div>

      <div className="border-t border-stone-100" />

      <section className="px-6 py-8 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-stone-800 mb-1">{T.ingredientsTitle}</h2>
        <p className="text-stone-400 text-sm mb-5">{T.ingredientsSubtitle(recipe.serving)}</p>
        <IngredientCards ingredients={recipe.ingredients} seasonings={recipe.seasonings} />
      </section>

      <div className="border-t border-stone-100" />

      <section className="px-6 py-8 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-stone-800 mb-1">{T.stepsTitle}</h2>
        <p className="text-stone-400 text-sm mb-6">{T.stepsSubtitle}</p>
        <StepsList steps={steps} />
      </section>

      <div className="border-t border-stone-100" />

      <section className="px-6 py-8 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-stone-800 mb-1">{T.principlesTitle}</h2>
        <p className="text-stone-400 text-sm mb-6">{T.principlesSubtitle}</p>
        <PrinciplesSection principles={principles} />
      </section>
    </main>
  );
}
