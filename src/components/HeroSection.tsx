"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const heroImage = "/images/UCLA1.jpg";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="洛杉矶夕阳海滨"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-olive/20" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 pt-10 lg:pt-12 px-8 lg:px-12 max-w-7xl mx-auto"
      >
        <div className="bg-olive rounded-2xl p-6 lg:p-8 max-w-sm shadow-xl">
          <div className="flex flex-col items-center text-center">
            <div className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden mb-4 ring-2 ring-white/30">
              <Image
                src="/images/头像.jpg"
                alt="阿垚头像"
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
            <p className="text-white font-sans font-semibold text-lg lg:text-xl mb-1">
              UCLA毕业
            </p>
            <p className="text-white/90 font-sans text-sm lg:text-base font-light">
              加州在地生活7年
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
