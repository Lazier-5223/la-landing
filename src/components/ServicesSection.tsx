"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Check } from "lucide-react";

const cards = [
  {
    image: "/images/房子.jpg",
    title: "精准匹配 & 生活避坑",
    items: [
      "结合孩子年龄性格和规划，筛选最合适的私校插班或营地，协助完成申请全流程",
      "提前帮你评估住宿区域的治安和生活便利度，选个住着舒服省心的地方",
      "提前对接租车、出行等落地事项，确保下飞机就能顺畅运转",
    ],
  },
  {
    image: "/images/school.jpg",
    title: "校园衔接 & 全程保障",
    items: [
      "抵达头天，带你把社区转一遍：哪里安全、哪里买菜、急诊在哪、驾驶习惯，日常场景怎么应对，真实生活快速上手，少走弯路",
      "开学第一天陪进校园，帮孩子认识老师、熟悉环境，家长也能少担心",
      "每周定期帮你和老师们沟通，及时了解孩子在校真实状态，给孩子更多支持",
      "游学期间遇到突发情况，车辆剐蹭、医疗突发、生活疑问，随时联系我，第一时间帮你理清楚怎么处理",
    ],
  },
  {
    image: "/images/日落.jpg",
    title: "地道体验 & 资源链接",
    items: [
      "大人能放松,小孩长见识：课余时间别只会去游乐园和大众打卡地；分享当地人才知道的周边游线路和玩法",
      "同步推荐本地亲子活动的时间和资讯：比如博物馆的主题互动课程、节日庆典、社区活动，让孩子真正融入，而不只是旁观",
    ],
  },
];

export default function ServicesSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="bg-[#F3F4F6] pt-12 pb-10 lg:pt-16 lg:pb-14 px-6 lg:px-12"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-2xl lg:text-3xl xl:text-4xl text-olive mb-10 lg:mb-12">
          我会提供 / What I Offer
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {cards.map((card, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex flex-col h-full"
            >
              <div className="bg-[#F9F8F6] rounded-2xl shadow-sm border border-brown/10 flex flex-col h-full overflow-hidden">
                <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-col items-stretch text-left px-5 pt-5 pb-6 lg:px-6 lg:pt-6 lg:pb-7 gap-4">
                  <h3 className="font-serif text-lg lg:text-xl text-olive">
                    {card.title}
                  </h3>
                  <ul className="space-y-2.5 text-[13px] lg:text-sm text-gray-700 leading-relaxed tracking-wide">
                    {card.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2"
                      >
                        <Check className="mt-0.5 w-3.5 h-3.5 text-brown shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
