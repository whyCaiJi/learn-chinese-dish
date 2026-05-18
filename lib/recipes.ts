import recipesData from "@/data/recipes.json";
import type { Recipe } from "./types";

export const recipes = recipesData as Recipe[];

export function getRecipeById(id: string): Recipe | undefined {
  return recipes.find((r) => r.id === id);
}

export function searchByIngredients(ingredientNames: string[]): Recipe[] {
  if (ingredientNames.length === 0) return [];
  const lower = ingredientNames.map((n) => n.toLowerCase().trim());
  return recipes
    .map((recipe) => {
      const allIngredients = [...recipe.ingredients, ...recipe.seasonings];
      const matchCount = lower.filter((name) =>
        allIngredients.some((ing) => ing.name.toLowerCase().includes(name))
      ).length;
      return { recipe, matchCount };
    })
    .filter(({ matchCount }) => matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount)
    .map(({ recipe }) => recipe);
}

export function searchByKeyword(keyword: string): Recipe[] {
  const lower = keyword.toLowerCase().trim();
  if (!lower) return recipes;
  return recipes.filter(
    (r) =>
      r.name.includes(lower) ||
      r.category.includes(lower) ||
      r.flavor.includes(lower) ||
      r.tags.some((t) => t.includes(lower)) ||
      r.description.includes(lower) ||
      r.ingredients.some((ing) => ing.name.includes(lower))
  );
}
