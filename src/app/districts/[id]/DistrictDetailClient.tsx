"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";
import { ChevronDown, GraduationCap, PieChart, School, Users } from "lucide-react";
import {
  type DistrictData,
  type DistrictSchool,
  splitDistrictName,
} from "@/data/districts";

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

function stripDetailPrefix(line: string) {
  return line.replace(/^【重点关注】/, "").replace(/^【补充信息】/, "");
}

function partitionSchoolDetails(details: string[]) {
  const focus = details.filter((d) => d.startsWith("【重点关注】"));
  const supplement = details.filter((d) => d.startsWith("【补充信息】"));
  return { focus, supplement };
}

function AccordionRow({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white/95">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left text-[#2c3e50] transition hover:bg-slate-50/80"
      >
        <span className="text-sm font-semibold">{title}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-slate-500 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open ? (
        <div className="space-y-3 border-t border-slate-100 px-4 pb-4 pt-3 text-sm leading-7 text-[#5f6f81]">
          {children}
        </div>
      ) : null}
    </div>
  );
}

function SchoolLevelSection({
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
      <div>
        <h3 className="font-serif text-lg font-semibold text-[#2c3e50]">
          {title}
        </h3>
        <p className="text-xs text-[#5f6f81]">{subtitle}</p>
      </div>
      <div className="flex flex-col gap-4">
        {schools.map((school) => (
          <SchoolProfileCard key={school.name} school={school} />
        ))}
      </div>
    </section>
  );
}

function SchoolProfileCard({ school }: { school: DistrictSchool }) {
  const [open, setOpen] = useState(false);
  const niche = findStat(school.stats, /Niche/i);
  const achievement =
    findStat(school.stats, /CAASPP|学术表现|达标率|AP 通过率/) ??
    findStat(school.stats, /学术/);
  const enrollment =
    findStat(school.stats, /全校(人|⼈)数|全校人数/i) ??
    findStat(school.stats, /enrollment/i);
  const ratio =
    findStat(school.stats, /师(生|⽣)比|师生比例|师⽣⽐例/i) ??
    findStat(school.stats, /ratio/i);
  const ethnic =
    findStat(school.stats, /族裔(构成|组成)/i) ??
    findStat(school.stats, /ethnic|composition/i);

  const parsed = partitionSchoolDetails(school.details ?? []);
  const focusList =
    school.watch ??
    parsed.focus.map((f) => stripDetailPrefix(f));
  const supplementList =
    school.supplement ??
    parsed.supplement.map((s) => stripDetailPrefix(s));

  return (
    <article className="rounded-xl border border-slate-200 bg-white/95 p-4 shadow-sm sm:p-5">
      <header className="border-b border-slate-100 pb-4">
        <h4 className="font-serif text-base font-semibold text-[#2c3e50] sm:text-lg">
          {school.name}
        </h4>
        <div className="mt-2 flex flex-col gap-1 text-sm text-[#5f6f81] sm:flex-row sm:flex-wrap sm:gap-x-4">
          {niche ? <span>{niche}</span> : null}
          {achievement ? (
            <span className="font-semibold text-[#2c3e50]">{achievement}</span>
          ) : null}
        </div>
        {enrollment || ratio || ethnic ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {enrollment ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-slate-50 px-3 py-1 text-xs font-medium text-[#384b5d]">
                <Users size={14} strokeWidth={1.75} className="text-slate-500" />
                {enrollment}
              </span>
            ) : null}
            {ratio ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-slate-50 px-3 py-1 text-xs font-medium text-[#384b5d]">
                <GraduationCap
                  size={14}
                  strokeWidth={1.75}
                  className="text-slate-500"
                />
                {ratio}
              </span>
            ) : null}
            {ethnic ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d7e3f6] bg-[#eef4ff] px-3 py-1 text-xs font-medium text-[#2f4766]">
                <PieChart
                  size={14}
                  strokeWidth={1.75}
                  className="text-[#56739a]"
                />
                {ethnic}
              </span>
            ) : null}
          </div>
        ) : null}
      </header>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#8a6a2b]">
            学校优势
          </p>
          <ul className="list-inside list-disc space-y-1.5 text-sm leading-relaxed text-[#5f6f81]">
            {school.pros.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#7b2d3a]">
            关注点 / 短板
          </p>
          <ul className="list-inside list-disc space-y-1.5 text-sm leading-relaxed text-[#5f6f81]">
            {focusList.map((f) => (
              <li key={f}>{f}</li>
            ))}
            {school.cons.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 border-t border-slate-100 pt-3">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium text-[#8a6a2b] transition hover:bg-[#faf7f0]"
        >
          {open ? "收起补充信息" : "补充信息"}
          <ChevronDown
            size={14}
            className={
              open ? "rotate-180 transition-transform" : "transition-transform"
            }
          />
        </button>
        {open ? (
          <div className="mt-3 space-y-2 rounded-lg bg-slate-50/80 px-3 py-3 text-sm leading-relaxed text-[#5f6f81]">
            {supplementList.length ? (
              <ul className="list-inside list-disc space-y-1.5">
                {supplementList.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-500">暂无补充信息条目。</p>
            )}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export function DistrictDetailClient({
  district,
  children,
}: {
  district: DistrictData;
  children?: ReactNode;
}) {
  const { zh, en } = splitDistrictName(district.name);
  const { education, advice } = partitionSupport(district.support);

  const [openLife, setOpenLife] = useState(false);
  const [openEdu, setOpenEdu] = useState(false);
  const [openEstate, setOpenEstate] = useState(false);
  /** PDF 第 5 节在最后；默认展开本节，与先前交互约定一致 */
  const [openAdvice, setOpenAdvice] = useState(true);

  const schools = district.schools ?? [];
  const elementary = schools.filter((s) => schoolLevel(s.name) === "elementary");
  const middle = schools.filter((s) => schoolLevel(s.name) === "middle");
  const high = schools.filter((s) => schoolLevel(s.name) === "high");

  const oneLiner = district.overview?.oneLiner ?? district.summary;
  const tags = district.overview?.tags ?? [];
  const displayTitle =
    zh && en ? `${zh}(${en})` : district.name.trim() || zh || district.name;

  return (
    <main className="min-h-screen bg-[#f9f7f2] px-4 py-8 text-[#2c3e50] md:px-8 md:py-12">
      <div className="mx-auto max-w-3xl">
        <header className="relative text-center">
          <div className="absolute right-0 top-0">
            <Link
              href="/districts"
              className="inline-flex items-center justify-center rounded-full border border-[#e3d6bd] bg-[#fbf6eb] px-4 py-2 text-xs font-medium text-[#6b5320] transition hover:bg-[#f6efe0]"
            >
              返回学区列表
            </Link>
          </div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#8a6a2b]">
            学区详情
          </p>
          <h1 className="mt-2 font-serif text-2xl font-semibold tracking-wide text-[#2c3e50] md:text-3xl">
            {displayTitle}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#5f6f81] md:text-base">
            {oneLiner}
          </p>
          {tags.length ? (
            <div className="mx-auto mt-4 flex max-w-2xl flex-wrap justify-center gap-2">
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

        {children}

        <div className="mt-3 space-y-3">
          <AccordionRow
            title="2. 生活与社区画像"
            open={openLife}
            onToggle={() => setOpenLife((v) => !v)}
          >
            {district.vibe?.length ? (
              <ul className="list-inside list-disc space-y-2">
                {district.vibe.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-500">暂无生活与社区描述。</p>
            )}
          </AccordionRow>

          <AccordionRow
            title="3. 教育生态与支持"
            open={openEdu}
            onToggle={() => setOpenEdu((v) => !v)}
          >
            {education.length ? (
              <ul className="list-inside list-disc space-y-2">
                {education.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-500">暂无教育生态详细说明。</p>
            )}
          </AccordionRow>

          <AccordionRow
            title="4. 落户参考"
            open={openEstate}
            onToggle={() => setOpenEstate((v) => !v)}
          >
            {district.realEstate?.length ? (
              <ul className="list-inside list-disc space-y-2">
                {district.realEstate.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-500">暂无房产与门槛说明。</p>
            )}
          </AccordionRow>

          <AccordionRow
            title="5. 择校建议"
            open={openAdvice}
            onToggle={() => setOpenAdvice((v) => !v)}
          >
            {advice.length ? (
              <ul className="list-inside list-disc space-y-2">
                {advice.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-500">暂无择校建议条目。</p>
            )}
          </AccordionRow>
        </div>

        {schools.length ? (
          <div className="mt-12 space-y-10 scroll-mt-24">
            <div className="text-center">
              <p className="flex items-center justify-center gap-2 font-serif text-xl font-semibold text-[#2c3e50]">
                <School size={22} className="text-[#8a6a2b]" />
                核心学校分析
              </p>
            </div>

            <SchoolLevelSection
              title="小学推荐"
              subtitle={`Elementary · ${elementary.length} 所`}
              schools={elementary}
            />
            <SchoolLevelSection
              title="初中推荐"
              subtitle={`Middle · ${middle.length} 所`}
              schools={middle}
            />
            <SchoolLevelSection
              title="高中推荐"
              subtitle={`High · ${high.length} 所`}
              schools={high}
            />
          </div>
        ) : null}

        <div className="mt-14 flex justify-center pb-8">
          <Link
            href="/districts"
            className="inline-flex items-center justify-center rounded-full border border-[#cfae67] bg-[#d9b56e] px-8 py-3 text-sm font-medium text-[#2c3e50] transition hover:bg-[#ceaa63]"
          >
            返回学区列表
          </Link>
        </div>
      </div>
    </main>
  );
}
