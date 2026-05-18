"use client";

import { useState } from "react";
import type { Step } from "@/lib/types";

export function StepsList({ steps }: { steps: Step[] }) {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [completed, setCompleted] = useState<Set<number>>(new Set());

  function toggle(step: number) {
    setExpanded((prev) => (prev === step ? null : step));
  }

  function toggleDone(step: number, e: React.MouseEvent) {
    e.stopPropagation();
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(step)) next.delete(step);
      else next.add(step);
      return next;
    });
  }

  return (
    <div className="space-y-3">
      {steps.map((step) => {
        const isExpanded = expanded === step.step;
        const isDone = completed.has(step.step);

        return (
          <div
            key={step.step}
            onClick={() => toggle(step.step)}
            className={`bg-white rounded-2xl border transition-all cursor-pointer ${
              isDone
                ? "border-stone-100 opacity-60"
                : isExpanded
                ? "border-orange-300 shadow-md"
                : "border-stone-100 hover:border-orange-200 shadow-sm"
            }`}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-4">
              <button
                onClick={(e) => toggleDone(step.step, e)}
                className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                  isDone
                    ? "bg-green-500 border-green-500 text-white"
                    : "border-stone-200 hover:border-orange-400"
                }`}
              >
                {isDone ? (
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8l3.5 3.5L13 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <span className="text-xs font-bold text-stone-400">
                    {step.step}
                  </span>
                )}
              </button>

              <div className="flex-1 min-w-0">
                <span
                  className={`font-semibold text-sm ${
                    isDone ? "text-stone-400 line-through" : "text-stone-800"
                  }`}
                >
                  {step.title}
                </span>
              </div>

              <svg
                className={`w-4 h-4 text-stone-300 transition-transform shrink-0 ${
                  isExpanded ? "rotate-180" : ""
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

            {/* Preview when collapsed */}
            {!isExpanded && (
              <p className="text-stone-400 text-sm px-4 pb-4 line-clamp-1 -mt-2">
                {step.desc}
              </p>
            )}

            {/* Expanded content */}
            {isExpanded && (
              <div className="px-4 pb-4 space-y-3 border-t border-stone-50 pt-3">
                <p className="text-stone-700 text-sm leading-relaxed">
                  {step.desc}
                </p>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                  <div className="flex items-start gap-2">
                    <span className="text-amber-500 text-sm shrink-0 mt-0.5">
                      👁
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-amber-700 mb-1">
                        状态指标
                      </p>
                      <p className="text-sm text-amber-800 leading-relaxed">
                        {step.indicator}
                      </p>
                    </div>
                  </div>
                </div>

                {step.tip && (
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
                    <div className="flex items-start gap-2">
                      <span className="text-blue-400 text-sm shrink-0 mt-0.5">
                        💡
                      </span>
                      <div>
                        <p className="text-xs font-semibold text-blue-700 mb-1">
                          小贴士
                        </p>
                        <p className="text-sm text-blue-800 leading-relaxed">
                          {step.tip}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
