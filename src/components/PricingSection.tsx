"use client";

import { motion } from "framer-motion";
import { ClipboardCheck, GraduationCap, MapPin } from "lucide-react";

const steps = [
  {
    icon: ClipboardCheck,
    title: "30% 确认合作",
    desc: "启动学校匹配与方案定制",
  },
  {
    icon: GraduationCap,
    title: "40% 录取到位",
    desc: "拿到正式入学通知\n住宿锁定后支付",
  },
  {
    icon: MapPin,
    title: "30% 落地到达",
    desc: "见面即付，开启为期一个月的\n游学+本地生活体验",
  },
];

export default function PricingSection() {
  return (
    <section className="bg-olive text-cream py-20 lg:py-28 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* 1. 顶部方案标题与价格 */}
        <div className="flex flex-col items-center gap-3 mb-6 lg:mb-8">
          <h2 className="font-serif text-base lg:text-lg xl:text-xl text-[#F5F5F5] font-medium">
            套餐价 / BUNDLE PRICE
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 6, scale: 0.985 }}
            whileInView={{ opacity: 1, y: 0, scale: [0.985, 1.03, 1] }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
            className="font-serif text-xl lg:text-2xl font-bold text-[#FBBF24] tracking-widest"
          >
            $2,980（包含在地支持4周）
          </motion.p>
        </div>

        {/* 2. 方案优势陈述 */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="font-sans text-sm lg:text-base text-[#F5F5F5]/95 italic max-w-2xl mx-auto mb-12 lg:mb-14 px-4 py-4 rounded-lg bg-white/5 border border-cream/10"
        >
          一次性锁定所有在地资源，您负责带孩子享受加州阳光，剩下的全部交给我
        </motion.p>

        {/* 3. 收费结构（保持原样） */}
        <p className="font-serif text-base lg:text-lg text-cream/90 mt-2 lg:mt-0">
          收费结构
        </p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full rounded-2xl border border-cream/15 bg-black/10 px-6 py-5 lg:px-8 lg:py-6 mt-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-cream/20">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.4, delay: 0.15 + idx * 0.12 }}
                  className="flex flex-col items-center gap-2 px-4 py-4"
                >
                  <Icon className="w-5 h-5 text-brown mb-1" strokeWidth={1.7} />
                  <p className="font-serif text-base lg:text-base font-semibold text-cream/90">
                    {step.title}
                  </p>
                  <p className="font-sans text-sm lg:text-sm text-cream/85 leading-relaxed whitespace-pre-line">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* 4. 底部信任陈述 */}
        <p className="font-sans text-sm lg:text-base text-cream/90 leading-relaxed text-center max-w-3xl mx-auto mt-10 lg:mt-12">
          别家中介帮你办好学校就算交差了 我的服务从你们落地那一刻才真正开始
          <br />
          我用真实生活在加州的认知替你把关 给你的不只是信息 而是那些人生地不熟不知道该找谁的瞬间有人接得住
        </p>
      </div>
    </section>
  );
}
