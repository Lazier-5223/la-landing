"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const services = [
  {
    image: "/images/房子.jpg",
    title: "精准匹配 & 生活避坑",
    offset: "left",
  },
  {
    image: "/images/school.jpg",
    title: "校园衔接 & 全程保障",
    offset: "right",
  },
  {
    image: "/images/日落.jpg",
    title: "地道体验 & 资源链接",
    offset: "left",
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
          {services.map((item, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex flex-col"
            >
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden bg-olive/10">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div
                  className={`absolute bottom-0 z-10 flex items-center px-4 py-4 lg:py-5 bg-white shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5 left-0 right-0 md:w-[92%] ${
                    item.offset === "left"
                      ? "md:left-[4%] md:right-auto"
                      : "md:left-auto md:right-[4%]"
                  }`}
                >
                  <span className="font-sans text-base lg:text-lg font-medium text-gray-700 tracking-wide">
                    {item.title}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
