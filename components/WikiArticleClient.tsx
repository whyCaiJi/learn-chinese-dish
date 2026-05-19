"use client";

import Link from "next/link";
import { useLang } from "./LangProvider";
import { WikiArticle } from "./WikiArticle";
import type { WikiEntry } from "@/lib/wiki-types";

const WIKI_UI = {
  zh: { back: "← Wiki" },
  en: { back: "← Wiki" },
};

export function WikiArticleClient({ entry }: { entry: WikiEntry }) {
  const { lang } = useLang();
  return (
    <main className="min-h-screen pb-20">
      <div className="px-6 pt-10 pb-6 max-w-2xl mx-auto">
        <Link href="/wiki" className="text-stone-400 text-sm mb-6 block hover:text-orange-500 transition-colors">
          {WIKI_UI[lang].back}
        </Link>
        <WikiArticle entry={entry} />
      </div>
    </main>
  );
}
