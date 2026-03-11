"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Check } from "lucide-react";

const row1 = {
  image: "/images/school.jpg",
  title: "精准匹配 · 深度方案定制",
  price: "$2,180",
  priceUnit: "/ 单次项目服务费",
  items: [
    "结合孩子性格与未来规划，筛选最契合的私校插班或营地名额，协助完成全流程申请",
    "提前帮你评估住宿区域的治安和生活便利度，选个住着舒服省心的地方",
    "提前对接租车、出行等落地事项，确保下飞机就能顺畅运转",
    "抵达头天，线下带你把社区转一遍：哪里有公园、哪里买菜、药房在哪、驾驶习惯，日常场景怎么应对，真实生活快速上手，少走弯路",
    "开学第一天陪进校园，帮孩子认识老师、熟悉环境，家长也能少担心",
  ],
};

const row2 = {
  image: "/images/日落.jpg",
  title: "在地支持 · 游学成长伙伴",
  price: "$350",
  priceUnit: "/ 周",
  items: [
    "游学反馈：每周定期帮你和老师们沟通，及时了解孩子在校真实状态，给孩子更多支持",
    "地道体验：大人能放松，小孩长见识，课余时间别只会去游乐园和大众打卡地，我会分享当地人才知道的周边游线路和玩法；同步推荐本地亲子活动比如节日庆典、社区活动，让孩子真正融入，而不只是旁观",
    "全程保障：游学期间遇到生活疑问或突发情况，随时联系我，第一时间帮你理清楚怎么处理",
  ],
};

function PriceBlock({ price, priceUnit }: { price: string; priceUnit: string }) {
  const boldTarget = "单次";
  const hasBold = priceUnit.includes(boldTarget);
  const [before, after] = hasBold ? priceUnit.split(boldTarget) : [priceUnit, ""];

  return (
    <div className="inline-block bg-brown/[0.06] px-4 py-2.5 rounded-sm">
      <p className="font-serif text-xl lg:text-2xl text-brown tracking-widest">
        {price}
        <span className="font-sans text-sm text-olive/80 tracking-normal ml-1">
          {hasBold ? (
            <>
              {before}
              <span className="font-semibold">{boldTarget}</span>
              {after}
            </>
          ) : (
            priceUnit
          )}
        </span>
      </p>
      <span className="block mt-2 h-px w-full max-w-[120px] bg-brown/25" />
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section className="pt-14 pb-4 lg:pt-20 lg:pb-8">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 mb-12 lg:mb-16">
        <h2 className="font-serif text-2xl lg:text-3xl xl:text-4xl text-olive">
          我会提供 / What I Offer
        </h2>
      </div>

      {/* 第一行：左图 60% · 右文 40% */}
      <div className="bg-white py-24 lg:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-stretch gap-10 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
              className="relative lg:w-[60%] shrink-0 h-[33vh] min-h-[240px] lg:h-[380px] lg:min-h-[320px] rounded-xl overflow-hidden"
            >
              <Image
                src={row1.image}
                alt=""
                fill
                className="object-cover object-[center_68%]"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 0.61, 0.36, 1] }}
              className="flex flex-col lg:w-[40%] lg:pl-4 lg:justify-center"
            >
              <h3 className="font-serif text-xl lg:text-2xl text-olive mb-3">
                {row1.title}
              </h3>
              <div className="mb-6">
                <PriceBlock price={row1.price} priceUnit={row1.priceUnit} />
              </div>
              <ul className="space-y-3 text-[13px] lg:text-sm text-gray-700 leading-relaxed tracking-wide">
                {row1.items.map((item) => (
                  <li key={item.slice(0, 24)} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 w-3.5 h-3.5 text-brown shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 第二行：左文 40% · 右图 60%（Zig-zag） */}
      <div className="bg-[#F9F8F6] py-24 lg:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-stretch gap-10 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 0.61, 0.36, 1] }}
              className="flex flex-col lg:w-[40%] lg:pr-4 lg:justify-center order-2 lg:order-1"
            >
              <h3 className="font-serif text-xl lg:text-2xl text-olive mb-3">
                {row2.title}
              </h3>
              <div className="mb-6">
                <PriceBlock price={row2.price} priceUnit={row2.priceUnit} />
              </div>
              <ul className="space-y-3 text-[13px] lg:text-sm text-gray-700 leading-relaxed tracking-wide">
                {row2.items.map((item) => (
                  <li key={item.slice(0, 24)} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 w-3.5 h-3.5 text-brown shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
              className="relative lg:w-[60%] shrink-0 h-[33vh] min-h-[240px] lg:h-[380px] lg:min-h-[320px] rounded-xl overflow-hidden order-1 lg:order-2"
            >
              <Image
                src={row2.image}
                alt=""
                fill
                className="object-cover object-[center_72%]"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
