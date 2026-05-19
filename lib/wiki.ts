import wikiData from "@/data/wiki.json";
import type { WikiEntry } from "./wiki-types";

export const wikiEntries = wikiData as WikiEntry[];

export function getWikiById(id: string): WikiEntry | undefined {
  return wikiEntries.find((e) => e.id === id);
}

export function getWikiCategories(lang: "zh" | "en"): string[] {
  const key = lang === "zh" ? "category" : "category_en";
  return [...new Set(wikiEntries.map((e) => e[key]))];
}
