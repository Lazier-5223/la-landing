import Link from "next/link";
import { ChevronLeft, ChevronRight, Medal } from "lucide-react";
import { districtsData, splitDistrictName } from "@/data/districts";

function parseNicheRankNumber(nicheRank: string): number {
  // 支持 "#18 (A+)" / "No. 18, Niche 2026" 两种常见格式
  const m1 = nicheRank.match(/#\s*(\d+)/i);
  if (m1) return Number(m1[1]);
  const m2 = nicheRank.match(/No\.?\s*(\d+)/i);
  if (m2) return Number(m2[1]);
  return Number.POSITIVE_INFINITY;
}

function nicheLabel(nicheRank: string) {
  const n = parseNicheRankNumber(nicheRank);
  return n === Number.POSITIVE_INFINITY ? `Niche` : `Niche #${n}`;
}

export default function DistrictsPage() {
  // Niche 排名：越小越靠前（#1 最佳），因此按数字升序排序
  const sortedDistricts = [...districtsData].sort(
    (a, b) => parseNicheRankNumber(a.nicheRank) - parseNicheRankNumber(b.nicheRank),
  );

  return (
    <main className="min-h-screen bg-[#f9f7f2] px-4 py-10 text-[#2c3e50] md:px-8 md:py-14">
      <div className="mx-auto flex max-w-2xl flex-col gap-8">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#8a6a2b] transition hover:text-[#6e5421] hover:underline"
          >
            <ChevronLeft size={16} strokeWidth={1.75} />
            返回学区概览
          </Link>
          <h1 className="mt-5 font-serif text-2xl font-semibold tracking-wide md:text-3xl">
            学区导航
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#5f6f81]">
            点击下方卡片进入单学区详情。
          </p>
        </div>

        <ul className="flex flex-col gap-4 pb-8">
          {sortedDistricts.map((district) => {
            const { zh, en } = splitDistrictName(district.name);
            const grade = district.hardMetrics?.grade ?? "—";
            const gradeLabel = `Niche ${grade}`;

            return (
              <li key={district.id}>
                <Link
                  href={`/districts/${district.id}`}
                  className="group block rounded-xl border border-slate-200 bg-white/95 shadow-sm outline-none ring-0 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md focus-visible:ring-2 focus-visible:ring-[#cfae67]/40"
                >
                  <div className="flex items-center gap-4 px-4 py-4 sm:px-5 sm:py-5">
                    <div className="min-w-0 flex-1">
                      <p className="font-serif text-lg font-semibold text-[#2c3e50] sm:text-xl">
                        {zh}
                      </p>
                      {en ? (
                        <p className="mt-0.5 text-xs tracking-wide text-slate-500 sm:text-sm">
                          {en}
                        </p>
                      ) : null}
                    </div>

                    <div className="hidden min-w-0 shrink-0 flex-wrap items-center justify-end gap-2 sm:flex">
                      <span className="rounded-full border border-slate-200/80 bg-slate-50 px-3 py-1 text-xs font-medium text-[#384b5d]">
                        {nicheLabel(district.nicheRank)}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full border border-[#e3d6bd] bg-[#fbf6eb] px-3 py-1 text-xs font-medium text-[#6b5320]">
                        <Medal size={14} strokeWidth={1.75} />
                        {gradeLabel}
                      </span>
                    </div>

                    <ChevronRight
                      size={22}
                      strokeWidth={1.75}
                      className="shrink-0 text-[#6b5d3f] transition group-hover:translate-x-0.5 group-hover:text-[#4f4630]"
                      aria-hidden
                    />
                  </div>

                  <div className="flex flex-wrap gap-2 border-t border-slate-100 px-4 py-3 sm:hidden">
                    <span className="rounded-full border border-slate-200/80 bg-slate-50 px-3 py-1 text-[11px] font-medium text-[#384b5d]">
                      {nicheLabel(district.nicheRank)}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-[#e3d6bd] bg-[#fbf6eb] px-3 py-1 text-[11px] font-medium text-[#6b5320]">
                      <Medal size={13} strokeWidth={1.75} />
                      {gradeLabel}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
