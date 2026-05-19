"use client";

import { useLang } from "./LangProvider";
import { t } from "@/lib/i18n";
import type { WikiEntry, WikiSection } from "@/lib/wiki-types";

function renderText(raw: string) {
  return raw.split("\n").map((line, i) => {
    if (!line.trim()) return <br key={i} />;
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={i} className="mb-2 last:mb-0">
        {parts.map((part, j) =>
          part.startsWith("**") && part.endsWith("**") ? (
            <strong key={j} className="font-semibold text-stone-800">
              {part.slice(2, -2)}
            </strong>
          ) : (
            part
          )
        )}
      </p>
    );
  });
}

function TextSection({ section, lang }: { section: WikiSection; lang: "zh" | "en" }) {
  const content = lang === "zh" ? section.content : section.content_en;
  return (
    <div className="text-stone-600 text-sm leading-relaxed">
      {renderText(content ?? "")}
    </div>
  );
}

function FormulaSection({ section, lang }: { section: WikiSection; lang: "zh" | "en" }) {
  const content = lang === "zh" ? section.content : section.content_en;
  return (
    <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5">
      <div className="flex items-start gap-2 mb-3">
        <span className="text-orange-500 text-base mt-0.5">📋</span>
        <p className="text-xs font-bold text-orange-700 uppercase tracking-wide">
          {lang === "zh" ? "公式" : "Formula"}
        </p>
      </div>
      <div className="text-stone-700 text-sm leading-relaxed font-mono whitespace-pre-wrap">
        {content}
      </div>
    </div>
  );
}

function RulesSection({ section, lang }: { section: WikiSection; lang: "zh" | "en" }) {
  const items = section.items ?? [];
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-stone-600">
          <span className="text-orange-400 mt-0.5 shrink-0">•</span>
          <span>{lang === "zh" ? item.zh : item.en}</span>
        </li>
      ))}
    </ul>
  );
}

function TableSection({ section, lang }: { section: WikiSection; lang: "zh" | "en" }) {
  const headers = section.headers ?? [];
  const rows = section.rows ?? [];
  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wide py-2 px-3 bg-stone-50 border-b border-stone-200 first:rounded-tl-lg last:rounded-tr-lg"
              >
                {lang === "zh" ? h.zh : h.en}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-stone-100 last:border-0">
              <td className="py-2.5 px-3 font-medium text-stone-800 align-top">
                {lang === "zh" ? row.col1 : row.col1_en}
              </td>
              <td className="py-2.5 px-3 text-stone-600 align-top">
                {lang === "zh" ? row.col2 : row.col2_en}
              </td>
              {(row.col3 || row.col3_en) && (
                <td className="py-2.5 px-3 text-stone-500 align-top text-xs">
                  {lang === "zh" ? row.col3 : row.col3_en}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Section({ section, lang }: { section: WikiSection; lang: "zh" | "en" }) {
  const title = lang === "zh" ? section.title : section.title_en;
  return (
    <div className="mb-6">
      {title && (
        <h3 className="font-semibold text-stone-800 mb-3 text-base">{title}</h3>
      )}
      {section.type === "text" && <TextSection section={section} lang={lang} />}
      {section.type === "formula" && <FormulaSection section={section} lang={lang} />}
      {section.type === "rules" && <RulesSection section={section} lang={lang} />}
      {section.type === "table" && <TableSection section={section} lang={lang} />}
    </div>
  );
}

export function WikiArticle({ entry }: { entry: WikiEntry }) {
  const { lang } = useLang();

  const title = lang === "zh" ? entry.title : entry.title_en;
  const summary = lang === "zh" ? entry.summary : entry.summary_en;
  const category = lang === "zh" ? entry.category : entry.category_en;

  return (
    <article>
      <div className="flex items-start gap-3 mb-4">
        <span className="text-3xl">{entry.icon}</span>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-stone-800">{title}</h2>
            <span className="text-xs text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">
              {category}
            </span>
          </div>
          <p className="text-stone-500 text-sm">{summary}</p>
        </div>
      </div>

      <div className="space-y-0">
        {entry.sections.map((section, i) => (
          <Section key={i} section={section} lang={lang} />
        ))}
      </div>
    </article>
  );
}
