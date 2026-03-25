"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { type DistrictData } from "@/data/districts";

function resolveMetrics(district: DistrictData): string[] {
  const m = district.metrics ?? [];
  if (m.length > 0) return m;

  const stress =
    district.visualizationData?.stressScore != null
      ? `学业压力:${district.visualizationData.stressScore}(极高压,以“雄心勃勃”的竞争文化著称)。`
      : "";

  return [
    `全州排名: ${district.nicheRank ?? "—"}`,
    `综合评级:${district.visualizationData?.overallRating ?? "—"}`,
    `族裔结构:亚裔${district.ethnicity.asian}% | 白人${district.ethnicity.white}% | 西裔${district.ethnicity.hispanic}%(比例极其均衡)`,
    stress || "学业压力:—",
  ];
}

/**
 * 「1. 核心硬指标」：与详情页「2. 生活与社区画像」相同的手风琴 + 圆点列表排版。
 */
export function CoreHardMetricsDashboard({
  district,
}: {
  district: DistrictData;
}) {
  const lines = resolveMetrics(district);
  const [open, setOpen] = useState(true);

  return (
    <div className="mt-10 overflow-hidden rounded-xl border border-slate-200 bg-white/95">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left text-[#2c3e50] transition hover:bg-slate-50/80"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="text-sm font-semibold">1. 核心硬指标</span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-slate-500 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open ? (
        <div className="space-y-3 border-t border-slate-100 px-4 pb-4 pt-3 text-sm leading-7 text-[#5f6f81]">
          {lines.length ? (
            <ul className="list-inside list-disc space-y-2">
              {lines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500">暂无核心硬指标条目。</p>
          )}
        </div>
      ) : null}
    </div>
  );
}
