import { districtsData } from "@/data/districts";

export default function ComparisonTable() {
  return (
    <section className="rounded-2xl border border-[#e6dece] bg-[#fdfcf8] p-5 shadow-sm md:p-7">
      <div className="mb-4">
        <h2 className="font-serif text-xl font-semibold text-[#2c3e50] md:text-2xl">
          核心指标横向对比
        </h2>
        <p className="mt-1 text-sm text-[#5f6f81]">
          横向滚动查看全部学区维度
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[1100px] w-full border-separate border-spacing-0 text-left text-sm">
          <thead>
            <tr className="bg-[#f6f1e7] text-[#2c3e50]">
              <th className="rounded-l-xl px-4 py-3 font-semibold">学区</th>
              <th className="px-4 py-3 font-semibold">Niche 排名</th>
              <th className="px-4 py-3 font-semibold">安全</th>
              <th className="px-4 py-3 font-semibold">亚裔占比</th>
              <th className="px-4 py-3 font-semibold">ESL</th>
              <th className="px-4 py-3 font-semibold">竞争强度</th>
              <th className="px-4 py-3 font-semibold">年税/房价</th>
              <th className="px-4 py-3 font-semibold">综合价值</th>
              <th className="rounded-r-xl px-4 py-3 font-semibold">简评</th>
            </tr>
          </thead>
          <tbody>
            {districtsData.map((district) => (
              <tr key={district.name} className="text-[#384b5d]">
                <td className="border-b border-[#ede5d8] px-4 py-4 font-medium">
                  {district.name}
                </td>
                <td className="border-b border-[#ede5d8] px-4 py-4">{district.nicheRank}</td>
                <td className="border-b border-[#ede5d8] px-4 py-4">{district.safety}</td>
                <td className="border-b border-[#ede5d8] px-4 py-4">
                  {district.asianPercent}
                </td>
                <td className="border-b border-[#ede5d8] px-4 py-4">{district.esl}</td>
                <td className="border-b border-[#ede5d8] px-4 py-4">{district.competition}</td>
                <td className="border-b border-[#ede5d8] px-4 py-4">{district.cost}</td>
                <td className="border-b border-[#ede5d8] px-4 py-4">{district.value}</td>
                <td className="border-b border-[#ede5d8] px-4 py-4">{district.summary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
