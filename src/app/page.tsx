import Link from "next/link";
import {
  ArrowRight,
  Award,
  BarChart3,
  Brain,
  HandCoins,
  HeartHandshake,
  UserPlus,
} from "lucide-react";
import ComparisonTable from "@/components/ComparisonTable";
import EthnicityChart from "@/components/EthnicityChart";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f9f7f2] px-4 py-10 text-[#2c3e50] md:px-8 md:py-14">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="rounded-2xl border border-[#e6dece] bg-[#fdfcf8] px-6 py-10 text-center shadow-sm md:px-10">
          <h1 className="font-serif text-4xl font-semibold tracking-wide md:text-5xl">
            学区初步印象
          </h1>
        </header>

        <EthnicityChart />

        <section className="rounded-2xl border border-[#efe6d6] bg-[#fdfaf5] px-6 py-8 shadow-sm md:px-10">
          <div className="mx-auto max-w-5xl space-y-3">
            <div className="mt-2">
              <p className="font-serif text-lg font-semibold text-[#2c3e50]">
                核心指标解读
              </p>
              <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl border border-[#d7e3f6] bg-[#eef4ff] p-4">
                  <div className="flex items-start gap-3">
                    <Award size={18} className="mt-0.5 text-[#56739a]" />
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-[#2f4766]">
                        Niche 评级
                      </p>
                      <p className="text-sm leading-6 text-[#4f6686]">
                        基于美国教育部数据、全美统一考试成绩及数百万真实家长/学生评论的综合评级。A+ 代表该校处于全美前 2.5% 的顶级水平。
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white/90 p-4">
                  <div className="flex items-start gap-3">
                    <BarChart3 size={18} className="mt-0.5 text-slate-500" />
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-[#2c3e50]">
                        CAASPP 达标率
                      </p>
                      <p className="text-sm leading-6 text-[#5f6f81]">
                        加州统一学业表现评估（州考）成绩。反映学生在英语和数学上达到年级标准的比例。它是衡量学校教学硬实力、老师教学质量最直接的指标。
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white/90 p-4">
                  <div className="flex items-start gap-3">
                    <UserPlus size={18} className="mt-0.5 text-slate-500" />
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-[#2c3e50]">
                        伙伴系统 (Buddy System)
                      </p>
                      <p className="text-sm leading-6 text-[#5f6f81]">
                        指学校官方组织的“老带新”配对机制。由资深学生在课堂、午餐及课间提供 1 对 1 社交引导。这对性格内向或刚从国内转学的孩子至关重要。
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white/90 p-4">
                  <div className="flex items-start gap-3">
                    <HandCoins size={18} className="mt-0.5 text-slate-500" />
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-[#2c3e50]">
                        PTA 资金
                      </p>
                      <p className="text-sm leading-6 text-[#5f6f81]">
                        由家长教师协会募集的私人捐款。在加州顶尖学区，这笔钱的厚度直接决定了学校是否有额外的小提琴、机器人、艺术或全职科学老师。
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white/90 p-4">
                  <div className="flex items-start gap-3">
                    <Brain size={18} className="mt-0.5 text-slate-500" />
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-[#2c3e50]">
                        GATE 优才计划
                      </p>
                      <p className="text-sm leading-6 text-[#5f6f81]">
                        专为学有余力的学生设计的“天才教育”。通常在 3 年级通过测试选拔。它提供的是更高难度的学术挑战，而非单纯增加家庭作业量。
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white/90 p-4">
                  <div className="flex items-start gap-3">
                    <HeartHandshake
                      size={18}
                      className="mt-0.5 text-slate-500"
                    />
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-[#2c3e50]">
                        社交情感与心理支持 (SEL)
                      </p>
                      <p className="text-sm leading-6 text-[#5f6f81]">
                        学校提供的软实力保障。包括专业的心理辅导员、处理冲突的“同伴调解”以及由高年级学生带动的“同伴支持计划”。这些机制是防范校园霸凌、关怀内向孩子的护城河。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ComparisonTable />

        <div className="pt-2 text-center">
          <Link
            href="/districts"
            className="inline-flex items-center gap-2 rounded-full border border-[#cfae67] bg-[#d9b56e] px-6 py-3 text-sm font-medium text-[#2c3e50] transition hover:bg-[#ceaa63]"
          >
            浏览学区导航
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}
