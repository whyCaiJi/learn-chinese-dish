"use client";

import { useState } from "react";
import type { Principle } from "@/lib/types";

export function PrinciplesSection({ principles }: { principles: Principle[] }) {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {principles.map((p, i) => (
        <div
          key={i}
          className={`bg-white rounded-2xl border transition-all cursor-pointer ${
            expanded === i
              ? "border-stone-300 shadow-md"
              : "border-stone-100 hover:border-stone-200 shadow-sm"
          }`}
          onClick={() => setExpanded((prev) => (prev === i ? null : i))}
        >
          <div className="flex items-center gap-3 px-4 py-4">
            <span className="text-lg shrink-0">🔬</span>
            <span className="flex-1 font-semibold text-stone-800 text-sm">
              {p.title}
            </span>
            <svg
              className={`w-4 h-4 text-stone-300 transition-transform shrink-0 ${
                expanded === i ? "rotate-180" : ""
              }`}
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M4 6l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          {expanded === i && (
            <div className="px-4 pb-4 -mt-1 border-t border-stone-50 pt-3">
              <p className="text-stone-600 text-sm leading-relaxed">{p.content}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
