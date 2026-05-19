import { notFound } from "next/navigation";
import Link from "next/link";
import { getWikiById, wikiEntries } from "@/lib/wiki";
import { WikiArticleClient } from "@/components/WikiArticleClient";

export function generateStaticParams() {
  return wikiEntries.map((e) => ({ id: e.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entry = getWikiById(id);
  if (!entry) return { title: "Not found" };
  return { title: `${entry.title} · ${entry.title_en}` };
}

export default async function WikiPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entry = getWikiById(id);
  if (!entry) notFound();
  return <WikiArticleClient entry={entry} />;
}
