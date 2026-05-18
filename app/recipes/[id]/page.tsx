import { notFound } from "next/navigation";
import Link from "next/link";
import { getRecipeById, recipes } from "@/lib/recipes";
import { IngredientCards } from "@/components/IngredientCards";
import { StepsList } from "@/components/StepsList";
import { PrinciplesSection } from "@/components/PrinciplesSection";

export function generateStaticParams() {
  return recipes.map((r) => ({ id: r.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipe = getRecipeById(id);
  if (!recipe) return { title: "菜谱不存在" };
  return { title: `${recipe.name} - 学做菜` };
}

export default async function RecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipe = getRecipeById(id);
  if (!recipe) notFound();

  return (
    <main className="min-h-screen pb-20">
      {/* Header */}
      <div className="px-6 pt-10 pb-6 max-w-2xl mx-auto">
        <Link
          href="/recipes"
          className="text-stone-400 text-sm mb-6 block hover:text-orange-500 transition-colors"
        >
          ← 菜谱
        </Link>

        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-stone-800 mb-2">
              {recipe.name}
            </h1>
            <p className="text-stone-500">{recipe.description}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <span className="text-sm bg-stone-100 text-stone-600 px-3 py-1 rounded-full">
            {recipe.category}
          </span>
          <span className="text-sm bg-stone-100 text-stone-600 px-3 py-1 rounded-full">
            {recipe.flavor}
          </span>
          <span className="text-sm bg-orange-50 text-orange-600 px-3 py-1 rounded-full">
            ⏱ {recipe.time} 分钟
          </span>
          <span className="text-sm bg-orange-50 text-orange-600 px-3 py-1 rounded-full">
            👥 {recipe.serving} 人份
          </span>
          {recipe.tags.map((tag) => (
            <span
              key={tag}
              className="text-sm bg-orange-50 text-orange-600 px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-stone-100" />

      {/* Ingredients */}
      <section className="px-6 py-8 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-stone-800 mb-1">食材用量</h2>
        <p className="text-stone-400 text-sm mb-5">
          以下用量供 {recipe.serving} 人份，购买时可参考比例
        </p>
        <IngredientCards
          ingredients={recipe.ingredients}
          seasonings={recipe.seasonings}
        />
      </section>

      <div className="border-t border-stone-100" />

      {/* Steps */}
      <section className="px-6 py-8 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-stone-800 mb-1">烹饪步骤</h2>
        <p className="text-stone-400 text-sm mb-6">
          每一步都有「状态指标」——告诉你做对了长什么样
        </p>
        <StepsList steps={recipe.steps} />
      </section>

      <div className="border-t border-stone-100" />

      {/* Principles */}
      <section className="px-6 py-8 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-stone-800 mb-1">原理解释</h2>
        <p className="text-stone-400 text-sm mb-6">
          知道为什么，下次才能举一反三
        </p>
        <PrinciplesSection principles={recipe.principles} />
      </section>
    </main>
  );
}
