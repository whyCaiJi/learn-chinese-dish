import { notFound } from "next/navigation";
import { getRecipeById, recipes } from "@/lib/recipes";
import { RecipeDetailClient } from "@/components/RecipeDetailClient";

export function generateStaticParams() {
  return recipes.map((r) => ({ id: r.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const recipe = getRecipeById(id);
  if (!recipe) return { title: "Not found" };
  return { title: `${recipe.name} · ${recipe.name_en}` };
}

export default async function RecipePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const recipe = getRecipeById(id);
  if (!recipe) notFound();
  return <RecipeDetailClient recipe={recipe} />;
}
