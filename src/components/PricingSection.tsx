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
    title: "30% 录取到位",
    desc: "拿到正式录取信\n住宿锁定后支付",
  },
  {
    icon: MapPin,
    title: "40% 落地到达",
    desc: "见面即付，开启为期一个月的\n游学+本地生活体验",
  },
];

export default function PricingSection() {
  return (
    <section className="bg-olive text-cream py-16 lg:py-20 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-8 lg:gap-10">
        <div className="max-w-3xl flex flex-col items-center">
          <p className="font-sans text-xs lg:text-sm tracking-[0.28em] uppercase text-cream/70 mb-4">
            总服务费 / TOTAL SERVICE FEE
          </p>

          <motion.div
            initial={{ scale: 1, opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            animate={{ scale: [1, 1.04, 1] }}
            transition={{
              duration: 1.4,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 3,
            }}
            viewport={{ once: false, amount: 0.6 }}
            className="inline-flex flex-col items-center gap-2 mb-6"
          >
            <div className="flex items-baseline gap-3 font-serif">
              <span className="text-sm lg:text-base text-cream/70 line-through">
                <span className="font-semibold">¥26,800/月</span>
              </span>
              <span className="text-3xl lg:text-4xl font-bold text-[#FBBF24]">
                ¥18,800/月
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex max-w-md items-center justify-center rounded-full border border-cream/25 bg-white/5 px-5 py-3 shadow-sm"
          >
            <p className="font-sans text-xs lg:text-sm text-cream/90 leading-relaxed">
              出发前 10 周确认，锁定优惠价
            </p>
          </motion.div>
        </div>

        <p className="font-serif text-sm lg:text-base text-cream/90 mt-2 lg:mt-0">
          收费结构
        </p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full rounded-2xl border border-cream/15 bg-black/10 px-6 py-5 lg:px-8 lg:py-6"
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
                  <p className="font-serif text-sm lg:text-base font-semibold">
                    {step.title}
                  </p>
                  <p className="font-sans text-xs lg:text-sm text-cream/85 leading-relaxed whitespace-pre-line">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <p className="font-sans text-[15px] lg:text-lg text-cream/90 leading-relaxed text-center max-w-4xl mx-auto">
          别家中介帮你办好学校就算交差了 我的服务从你们落地那一刻才真正开始
          <br />
          我用真实生活在加州的认知替你把关 给你的不只是信息 而是那些人生地不熟不知道该找谁的瞬间有人接得住
        </p>
      </div>
    </section>
  );
}

