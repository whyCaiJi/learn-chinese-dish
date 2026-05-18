"use client";

import { useState } from "react";
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
  const grams = toGrams(item.amount, item.unit);
  const displayAmount = (item.amount * servingMultiplier).toFixed(
    item.amount * servingMultiplier % 1 === 0 ? 0 : 1
  );
  const barWidth =
    grams !== null ? Math.max(4, (grams / maxGrams) * 100) : null;

  return (
    <div className="bg-white rounded-xl border border-stone-100 p-4 shadow-sm">
      <div className="flex items-start justify-between mb-2">
        <span className="font-medium text-stone-800 text-sm">{item.name}</span>
        <span className="text-orange-600 font-semibold text-sm whitespace-nowrap ml-2">
          {displayAmount}
          <span className="text-stone-400 font-normal text-xs ml-0.5">
            {item.unit}
          </span>
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

      {item.note && (
        <p className="text-xs text-stone-400 leading-relaxed">{item.note}</p>
      )}
    </div>
  );
}

export function IngredientCards({ ingredients, seasonings }: Props) {
  const [servings, setServings] = useState(1);

  const allWithGrams = [...ingredients].map((item) => ({
    item,
    grams: toGrams(item.amount, item.unit) ?? 0,
  }));
  const maxGrams = Math.max(...allWithGrams.map((x) => x.grams), 1);

  const allSeasonGrams = [...seasonings].map((item) => ({
    item,
    grams: toGrams(item.amount, item.unit) ?? 0,
  }));
  const maxSeasonGrams = Math.max(...allSeasonGrams.map((x) => x.grams), 1);

  return (
    <div>
      {/* Serving multiplier */}
      <div className="flex items-center gap-3 mb-5">
        <span className="text-sm text-stone-500">调整人份</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setServings((s) => Math.max(0.5, s - 0.5))}
            className="w-7 h-7 rounded-full bg-stone-100 text-stone-600 hover:bg-orange-100 hover:text-orange-600 font-medium transition-colors flex items-center justify-center"
          >
            −
          </button>
          <span className="text-sm font-semibold text-stone-800 w-8 text-center">
            ×{servings}
          </span>
          <button
            onClick={() => setServings((s) => s + 0.5)}
            className="w-7 h-7 rounded-full bg-stone-100 text-stone-600 hover:bg-orange-100 hover:text-orange-600 font-medium transition-colors flex items-center justify-center"
          >
            +
          </button>
        </div>
      </div>

      {/* Main ingredients */}
      <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-3">
        主料
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        {ingredients.map((item) => (
          <IngredientCard
            key={item.name}
            item={item}
            maxGrams={maxGrams}
            servingMultiplier={servings}
          />
        ))}
      </div>

      {/* Seasonings */}
      <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-3">
        调料
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {seasonings.map((item) => (
          <IngredientCard
            key={item.name}
            item={item}
            maxGrams={maxSeasonGrams}
            servingMultiplier={servings}
          />
        ))}
      </div>
    </div>
  );
}
