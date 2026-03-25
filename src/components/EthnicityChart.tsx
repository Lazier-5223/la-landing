"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { districtsData } from "@/data/districts";

const chartData = districtsData.map((district) => ({
  name: district.name.split(" (")[0],
  asian: district.ethnicity.asian,
  white: district.ethnicity.white,
  hispanic: district.ethnicity.hispanic,
  other: district.ethnicity.other,
}));

export default function EthnicityChart() {
  return (
    <section className="rounded-2xl border border-[#e6dece] bg-[#fdfcf8] p-5 shadow-sm md:p-7">
      <div className="mb-4">
        <h2 className="font-serif text-xl font-semibold text-[#2c3e50] md:text-2xl">
          8大学区族裔结构对比
        </h2>
        <p className="mt-1 text-sm text-[#5f6f81]">
          2024-25学年，单位：学生占比（%）
        </p>
      </div>
      <div className="h-[420px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barCategoryGap={24}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ebe4d8" />
            <XAxis
              dataKey="name"
              tick={{ fill: "#2c3e50", fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "#ded4c2" }}
            />
            <YAxis
              tick={{ fill: "#2c3e50", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              label={{
                value: "学生比例 %",
                angle: -90,
                position: "insideLeft",
                fill: "#2c3e50",
                fontSize: 12,
              }}
            />
            <Tooltip
              formatter={(value) =>
                value != null && value !== "" ? `${value}%` : ""
              }
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e6dece",
                backgroundColor: "#fffdf8",
              }}
            />
            <Legend />
            <Bar dataKey="asian" stackId="a" name="亚裔 Asian" fill="#e67e4a" />
            <Bar dataKey="white" stackId="a" name="白人 White" fill="#4f87c7" />
            <Bar dataKey="hispanic" stackId="a" name="西裔 Hispanic" fill="#79b879" />
            <Bar dataKey="other" stackId="a" name="其他 Other" fill="#b799d0" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
