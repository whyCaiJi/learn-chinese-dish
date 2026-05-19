"use client";

import { useState } from "react";
import { useLang } from "./LangProvider";
import { t } from "@/lib/i18n";
import type { Ingredient } from "@/lib/types";

interface Props {
  ingredients: Ingredient[];
  seasonings: Ingredient[];
}

function toGrams(amount: number, unit: string): number | null {
  if (unit === "g") return amount;
  if (unit === "ml") return amount;
  if (unit === "kg") return amount * 1000;
  return null;
}

function IngredientCard({
  item,
  maxGrams,
  servingMultiplier,
}: {
  item: Ingredient;
  maxGrams: number;
  servingMultiplier: number;
}) {
  const { lang } = useLang();
  const grams = toGrams(item.amount, item.unit);
  const scaled = item.amount * servingMultiplier;
  const displayAmount = scaled % 1 === 0 ? scaled.toFixed(0) : scaled.toFixed(1);
  const displayUnit = lang === "en" && item.unit_en ? item.unit_en : item.unit;
  const name = lang === "zh" ? item.name : item.name_en;
  const note = lang === "zh" ? item.note : (item.note_en ?? item.note);
  const barWidth = grams !== null ? Math.max(4, (grams / maxGrams) * 100) : null;

  return (
    <div className="bg-white rounded-xl border border-stone-100 p-4 shadow-sm">
      <div className="flex items-start justify-between mb-2">
        <span className="font-medium text-stone-800 text-sm">{name}</span>
        <span className="text-orange-600 font-semibold text-sm whitespace-nowrap ml-2">
          {displayAmount}
          <span className="text-stone-400 font-normal text-xs ml-0.5">{displayUnit}</span>
        </span>
      </div>

      {barWidth !== null && (
        <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-orange-300 rounded-full transition-all duration-300"
            style={{ width: `${barWidth}%` }}
          />
        </div>
      )}

      {note && <p className="text-xs text-stone-400 leading-relaxed">{note}</p>}
    </div>
  );
}

export function IngredientCards({ ingredients, seasonings }: Props) {
  const { lang } = useLang();
  const T = t(lang);
  const [servings, setServings] = useState(1);

  const maxGrams = Math.max(...ingredients.map((i) => toGrams(i.amount, i.unit) ?? 0), 1);
  const maxSeasonGrams = Math.max(...seasonings.map((i) => toGrams(i.amount, i.unit) ?? 0), 1);

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <span className="text-sm text-stone-500">{T.servingsLabel}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setServings((s) => Math.max(0.5, s - 0.5))}
            className="w-7 h-7 rounded-full bg-stone-100 text-stone-600 hover:bg-orange-100 hover:text-orange-600 font-medium transition-colors flex items-center justify-center"
          >−</button>
          <span className="text-sm font-semibold text-stone-800 w-8 text-center">×{servings}</span>
          <button
            onClick={() => setServings((s) => s + 0.5)}
            className="w-7 h-7 rounded-full bg-stone-100 text-stone-600 hover:bg-orange-100 hover:text-orange-600 font-medium transition-colors flex items-center justify-center"
          >+</button>
        </div>
      </div>

      <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-3">{T.mainIngredients}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        {ingredients.map((item) => (
          <IngredientCard key={item.name} item={item} maxGrams={maxGrams} servingMultiplier={servings} />
        ))}
      </div>

      <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-3">{T.seasonings}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {seasonings.map((item) => (
          <IngredientCard key={item.name} item={item} maxGrams={maxSeasonGrams} servingMultiplier={servings} />
        ))}
      </div>
    </div>
  );
}
