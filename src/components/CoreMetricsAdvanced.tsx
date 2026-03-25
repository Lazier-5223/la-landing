"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Award,
  ChevronDown,
  GraduationCap,
  Languages,
  PieChart as PieChartIcon,
  Shield,
} from "lucide-react";
import {
  type DistrictData,
  type DistrictSchool,
  splitDistrictName,
} from "@/data/districts";

const ETHNICITY_BAR = [
  { key: "Asian", color: "#e67e4a" },
  { key: "White", color: "#4f87c7" },
  { key: "Hispanic", color: "#79b879" },
  { key: "Other", color: "#b799d0" },
] as const;

function partitionSupport(support?: string[]) {
  const markers = ["最适合谁：", "谁需谨慎：", "客观评价："];
  const education: string[] = [];
  const advice: string[] = [];
  for (const line of support ?? []) {
    if (markers.some((m) => line.startsWith(m))) advice.push(line);
    else education.push(line);
  }
  return { education, advice };
}

function schoolLevel(name: string): "elementary" | "middle" | "high" {
  if (name.includes("7/8")) return "middle";
  if (name.includes("High School")) return "high";
  return "elementary";
}

function findStat(stats: string[], keywords: RegExp) {
  return stats.find((s) => keywords.test(s)) ?? null;
}

function partitionSchoolDetails(details: string[]) {
  const focus = details.filter((d) => d.startsWith("【重点关注】"));
  const supplement = details.filter((d) => d.startsWith("【补充信息】"));
  return { focus, supplement };
}

function stripDetailPrefix(line: string) {
  return line.replace(/^【重点关注】/, "").replace(/^【补充信息】/, "");
}

function LineBlock({ lines }: { lines: string[] }) {
  return (
    <div className="space-y-2">
      {lines.map((line) => (
        <p
          key={line}
          className="whitespace-pre-wrap break-words border-l-2 border-[#cfae67]/40 pl-3 text-sm leading-7 text-[#2c3e50]"
        >
          {line}
        </p>
      ))}
    </div>
  );
}

function CollapseSection({
  title,
  summary,
  defaultOpen = false,
  children,
}: {
  title: string;
  summary: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="overflow-hidden rounded-xl border border-[#e6dece] bg-[#fdfcf8] shadow-sm">
      <div className="px-4 py-4 sm:px-5">
        <h3 className="font-serif text-lg font-semibold text-[#2c3e50]">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#5f6f81]">{summary}</p>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[#8a6a2b] hover:underline"
        >
          {open ? "收起详细正文" : "展开详细正文"}
          <ChevronDown
            size={14}
            className={open ? "rotate-180 transition-transform" : "transition-transform"}
          />
        </button>
      </div>
      {open ? (
        <div className="border-t border-[#ebe4d8] bg-white/70 px-4 py-4 sm:px-5">
          {children}
        </div>
      ) : null}
    </div>
  );
}

function QuickStatPill({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-[128px] flex-1 items-start gap-2.5 rounded-xl border border-[#e6dece] bg-[#fdfcf8] px-3 py-2.5 shadow-sm">
      <Icon className="mt-0.5 shrink-0 text-[#8a6a2b]" size={18} />
      <div className="min-w-0">
        <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500">
          {label}
        </p>
        <p className="text-xs font-semibold leading-snug text-[#2c3e50]">{value}</p>
      </div>
    </div>
  );
}

function EthnicityStackedBar({
  ethnicities,
}: {
  ethnicities: { Asian: number; White: number; Hispanic: number; Other: number };
}) {
  const segments = ETHNICITY_BAR.map((def) => ({
    ...def,
    pct: ethnicities[def.key as keyof typeof ethnicities],
  }));

  return (
    <div className="rounded-xl border border-[#e6dece] bg-[#fdfcf8] p-4 shadow-sm sm:p-5">
      <p className="mb-4 text-center font-serif text-base font-semibold text-[#2c3e50]">
        族裔结构
      </p>
      <div className="flex w-full">
        {segments.map((s) => (
          <div
            key={s.key}
            className="flex min-w-0 flex-col items-stretch px-0.5"
            style={{ width: `${s.pct}%` }}
          >
            <span className="mb-2 text-center text-[11px] font-semibold leading-tight text-[#2c3e50] sm:text-xs">
              {s.key} {s.pct}%
            </span>
          </div>
        ))}
      </div>
      <div className="flex h-10 w-full overflow-hidden rounded-lg border border-slate-200/90 shadow-inner">
        {segments.map((s) => (
          <div
            key={`bar-${s.key}`}
            style={{ width: `${s.pct}%`, backgroundColor: s.color }}
            className="h-full min-w-[2px]"
            title={`${s.key} ${s.pct}%`}
          />
        ))}
      </div>
    </div>
  );
}

function AdvancedSchoolCard({ school }: { school: DistrictSchool }) {
  const [detailOpen, setDetailOpen] = useState(false);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const niche = findStat(school.stats, /Niche/i);
  const achievement =
    findStat(school.stats, /CAASPP|学术表现|达标率|AP 通过率/) ??
    findStat(school.stats, /学术/);
  const parsed = partitionSchoolDetails(school.details ?? []);
  const focusList =
    school.watch ?? parsed.focus.map((f) => stripDetailPrefix(f));
  const supplementList =
    school.supplement ?? parsed.supplement.map((s) => stripDetailPrefix(s));

  const summary =
    school.pros[0] ??
    niche ??
    "点击展开查看基础档案与分项说明。";

  const detailLines = [
    "—— 基础档案 ——",
    ...school.stats,
    "",
    "—— 学校优势 ——",
    ...school.pros.map((p) => (p.startsWith("•") ? p : `• ${p}`)),
    "",
    "—— 重点关注 ——",
    ...focusList.map((f) => (f.startsWith("•") ? f : `• ${f}`)),
    "",
    "—— 潜在短板 ——",
    ...school.cons.map((c) => (c.startsWith("•") ? c : `• ${c}`)),
  ];

  return (
    <article className="overflow-hidden rounded-xl border border-[#e6dece] bg-[#fdfcf8] shadow-sm">
      <div className="border-b border-[#ebe4d8] px-4 py-4 sm:px-5">
        <h4 className="font-serif text-base font-semibold text-[#2c3e50] sm:text-lg">
          {school.name}
        </h4>
        <p className="mt-2 text-sm leading-relaxed text-[#5f6f81]">{summary}</p>
        <button
          type="button"
          onClick={() => setDetailOpen((v) => !v)}
          className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[#8a6a2b] hover:underline"
        >
          {detailOpen ? "收起完整分析" : "展开完整分析"}
          <ChevronDown
            size={14}
            className={detailOpen ? "rotate-180 transition-transform" : "transition-transform"}
          />
        </button>
      </div>

      <div className="px-4 py-4 sm:px-5">
        <header className="border-b border-slate-100 pb-4">
          <div className="flex flex-col gap-1 text-sm text-[#5f6f81] sm:flex-row sm:flex-wrap sm:gap-x-4">
            {niche ? <span>{niche}</span> : null}
            {achievement ? (
              <span className="font-bold text-[#2c3e50]">{achievement}</span>
            ) : null}
          </div>
        </header>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#8a6a2b]">
              学校优势
            </p>
            <ul className="list-inside list-disc space-y-1.5 text-sm leading-relaxed text-[#5f6f81]">
              {school.pros.map((p) => (
                <li key={p} className="whitespace-pre-wrap">
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              关注点 / 短板
            </p>
            <ul className="list-inside list-disc space-y-1.5 text-sm leading-relaxed text-[#5f6f81]">
              {focusList.map((f) => (
                <li key={f} className="whitespace-pre-wrap">
                  {f}
                </li>
              ))}
              {school.cons.map((c) => (
                <li key={c} className="whitespace-pre-wrap">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {detailOpen ? (
          <div className="mt-6 rounded-lg border border-[#ebe4d8] bg-white/80 p-3 sm:p-4">
            <LineBlock lines={detailLines.filter((l) => l.trim() !== "")} />
          </div>
        ) : null}

        <div className="mt-4 border-t border-slate-100 pt-3">
          <button
            type="button"
            onClick={() => setArchiveOpen((o) => !o)}
            className="flex w-full items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium text-[#8a6a2b] transition hover:bg-[#faf7f0]"
          >
            {archiveOpen ? "收起完整档案" : "查看完整档案"}
            <ChevronDown
              size={14}
              className={
                archiveOpen ? "rotate-180 transition-transform" : "transition-transform"
              }
            />
          </button>
          {archiveOpen ? (
            <div className="mt-3 rounded-lg border border-[#ebe4d8] bg-slate-50/80 px-3 py-3">
              {supplementList.length ? (
                <ul className="space-y-2 text-sm leading-relaxed text-[#5f6f81]">
                  {supplementList.map((s) => (
                    <li key={s} className="whitespace-pre-wrap border-l-2 border-[#cfae67]/30 pl-3">
                      {s}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-slate-500">暂无补充信息条目。</p>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function SchoolTierBlock({
  title,
  subtitle,
  schools,
}: {
  title: string;
  subtitle: string;
  schools: DistrictSchool[];
}) {
  if (!schools.length) return null;
  return (
    <section className="space-y-4">
      <div className="border-b border-[#e6dece] pb-2">
        <h3 className="font-serif text-lg font-semibold text-[#2c3e50]">{title}</h3>
        <p className="text-xs text-[#5f6f81]">{subtitle}</p>
      </div>
      <div className="flex flex-col gap-4">
        {schools.map((school) => (
          <AdvancedSchoolCard key={school.name} school={school} />
        ))}
      </div>
    </section>
  );
}

export type CoreMetricsAdvancedProps = {
  district: DistrictData;
};

export default function CoreMetricsAdvanced({ district }: CoreMetricsAdvancedProps) {
  const { education, advice } = partitionSupport(district.support);
  const viz = district.visualizationData;
  const ethnicitiesViz = viz?.ethnicity ?? {
    Asian: district.ethnicity.asian,
    White: district.ethnicity.white,
    Hispanic: district.ethnicity.hispanic,
    Other: district.ethnicity.other,
  };

  const { zh, en } = splitDistrictName(district.name);
  const displayTitle =
    zh && en ? `${zh}(${en})` : district.name;

  const tagline = district.overview?.oneLiner ?? district.summary;
  const tags = district.overview?.tags ?? [];

  const quickPills = viz
    ? [
        {
          icon: Award,
          label: "Niche 排名",
          value: viz.nicheRank,
        },
        {
          icon: Shield,
          label: "综合评级",
          value: viz.overallRating,
        },
        {
          icon: PieChartIcon,
          label: "族裔速览",
          value: `${ethnicitiesViz.Asian}% / ${ethnicitiesViz.White}% / ${ethnicitiesViz.Hispanic}% / ${ethnicitiesViz.Other}%`,
        },
        {
          icon: GraduationCap,
          label: "学业压力",
          value: viz.stressScore,
        },
      ]
    : [
        { icon: Award, label: "Niche", value: district.nicheRank },
        { icon: Shield, label: "安全", value: district.safety },
        {
          icon: PieChartIcon,
          label: "亚裔比例",
          value: district.asianPercent,
        },
        {
          icon: GraduationCap,
          label: "竞争强度",
          value: `${district.competition}/5（参考）`,
        },
      ];

  const metricsSummary =
    district.metrics?.slice(0, 2).join("；") ??
    "核心硬指标见下方可视化与展开正文。";

  const schools = district.schools ?? [];
  const elementary = schools.filter((s) => schoolLevel(s.name) === "elementary");
  const middle = schools.filter((s) => schoolLevel(s.name) === "middle");
  const high = schools.filter((s) => schoolLevel(s.name) === "high");

  return (
    <div className="min-h-screen bg-[#f9f7f2] px-4 py-10 text-[#2c3e50] md:px-8 md:py-14">
      <div className="mx-auto max-w-4xl space-y-10">
        <header className="rounded-xl border border-[#e6dece] bg-[#fdfcf8] px-5 py-6 text-center shadow-sm sm:px-8 sm:py-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#8a6a2b]">
            Core Metrics · Advanced
          </p>
          <h1 className="mt-2 font-serif text-2xl font-semibold md:text-3xl">
            {displayTitle}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#5f6f81] md:text-base">
            {tagline}
          </p>
          {tags.length ? (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#e3d6bd] bg-[#fbf6eb] px-3 py-1 text-xs font-medium text-[#6b5320]"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </header>

        <section className="space-y-4">
          <h2 className="text-center font-serif text-lg font-semibold text-[#2c3e50]">
            核心指标一览
          </h2>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {quickPills.map((item) => (
              <QuickStatPill
                key={`${item.label}-${item.value}`}
                icon={item.icon}
                label={item.label}
                value={item.value}
              />
            ))}
          </div>
        </section>

        <EthnicityStackedBar ethnicities={ethnicitiesViz} />

        <div className="space-y-4">
          <CollapseSection
            title="1. 核心硬指标"
            summary={metricsSummary}
          >
            <LineBlock lines={district.metrics ?? []} />
          </CollapseSection>

          <CollapseSection
            title="2. 生活与社区画像"
            summary={
              district.vibe?.[0] ??
              "地理坐标、邻里画像与社区氛围，展开后逐条原文呈现。"
            }
          >
            <LineBlock lines={district.vibe ?? []} />
          </CollapseSection>

          <CollapseSection
            title="3. 教育生态与支持"
            summary={
              education[0] ??
              "ESL/校园文化、学术实力与学校结构等，展开查看完整条目。"
            }
          >
            <LineBlock lines={education} />
          </CollapseSection>

          <CollapseSection
            title="4. 落户参考"
            summary={
              district.realEstate?.[0] ?? "租房与购房门槛、流动性提示。"
            }
          >
            <LineBlock lines={district.realEstate ?? []} />
          </CollapseSection>

          <CollapseSection
            title="5. 择校建议"
            summary={
              advice[0] ??
              "最适合谁、谁需谨慎与客观评价，展开后分行显示，不合并为一段。"
            }
            defaultOpen
          >
            <LineBlock lines={advice} />
          </CollapseSection>
        </div>

        {schools.length ? (
          <div className="space-y-10 border-t border-[#e6dece] pt-10">
            <h2 className="text-center font-serif text-xl font-semibold text-[#2c3e50]">
              核心学校分析
            </h2>
            <SchoolTierBlock
              title="小学推荐"
              subtitle="Elementary"
              schools={elementary}
            />
            <SchoolTierBlock
              title="初中推荐"
              subtitle="Middle"
              schools={middle}
            />
            <SchoolTierBlock
              title="高中推荐"
              subtitle="High"
              schools={high}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
