import Link from "next/link";
import { recipes } from "@/lib/recipes";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero */}
      <section className="px-6 pt-16 pb-10 text-center">
        <h1 className="text-4xl font-bold text-stone-800 mb-3 tracking-tight">
          学做菜
        </h1>
        <p className="text-stone-500 text-lg max-w-md mx-auto">
          不只是菜谱——告诉你为什么这样做，以及怎么判断做对了
        </p>
      </section>

      {/* Entry points */}
      <section className="px-6 pb-10 max-w-xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/recipes"
            className="group bg-white rounded-2xl p-6 shadow-sm border border-stone-100 hover:border-orange-300 hover:shadow-md transition-all"
          >
            <div className="text-3xl mb-3">🍳</div>
            <h2 className="font-semibold text-stone-800 text-lg mb-1">找菜谱</h2>
            <p className="text-stone-500 text-sm">按分类浏览，搜索菜名</p>
          </Link>

          <Link
            href="/suggest"
            className="group bg-white rounded-2xl p-6 shadow-sm border border-stone-100 hover:border-orange-300 hover:shadow-md transition-all"
          >
            <div className="text-3xl mb-3">🥬</div>
            <h2 className="font-semibold text-stone-800 text-lg mb-1">
              有什么食材？
            </h2>
            <p className="text-stone-500 text-sm">
              输入手头的食材，推荐适合的菜
            </p>
          </Link>
        </div>
      </section>

      {/* All recipes */}
      <section className="px-6 pb-16 max-w-xl mx-auto w-full">
        <h2 className="text-stone-700 font-semibold mb-4">全部菜谱</h2>
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
                    {recipe.name}
                  </span>
                  <span className="text-xs text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">
                    {recipe.category}
                  </span>
                  {recipe.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-stone-500 text-sm mt-1 truncate">
                  {recipe.description}
                </p>
              </div>
              <div className="text-right shrink-0">
                <div className="text-xs text-stone-400">{recipe.time}min</div>
                <div className="flex gap-0.5 mt-1">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i < recipe.difficulty ? "bg-orange-400" : "bg-stone-200"
                      }`}
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
