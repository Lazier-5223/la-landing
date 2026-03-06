"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const columns = [
  {
    title: "精准匹配 & 生活避坑",
    items: [
      "结合孩子年龄性格和规划，筛选最合适的私校插班或营地，协助完成申请全流程，",
      "提前帮你评估住宿区域的治安和生活便利度，选个住着舒服省心的地方",
      "提前对接租车、出行等落地事项，确保下飞机就能顺畅运转",
    ],
  },
  {
    title: "校园衔接 & 全程保障",
    items: [
      "抵达头天，带你把社区转一遍：哪里安全、哪里买菜、急诊在哪、驾驶习惯，日常场景怎么应对，真实生活快速上手，少走弯路",
      "开学第一天陪进校园，帮孩子认识老师、熟悉环境，家长也能少担心。",
      "每周定期帮你和老师们沟通，及时了解孩子在校真实状态，给孩子更多支持",
      "游学期间遇到突发情况，车辆剐蹭、医疗突发、生活疑问，随时联系我，第一时间帮你理清楚怎么处理。",
    ],
  },
  {
    title: "地道体验 & 资源链接",
    items: [
      "大人能放松,小孩长见识：课余时间别只会去游乐园和大众打卡地；分享当地人才知道的周边游线路和玩法",
      "同步推荐本地亲子活动的时间和资讯：比如博物馆的主题互动课程、节日庆典、社区活动，让孩子真正融入，而不只是旁观",
    ],
  },
];

export default function ServiceDetails() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-cream pt-6 pb-12 lg:pt-8 lg:pb-16 px-6 lg:px-12"
    >
      <div className="max-w-6xl mx-auto space-y-8 lg:space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {columns.map((col, idx) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col h-full"
            >
              <ul className="flex-1 space-y-3 text-sm lg:text-lg text-gray-700 leading-relaxed tracking-wide">
                {col.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="mt-1 w-3.5 h-3.5 text-brown shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>
    </motion.section>
  );
}

