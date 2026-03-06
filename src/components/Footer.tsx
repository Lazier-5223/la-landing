"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-olive text-white py-12 lg:py-16 px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center lg:justify-end">
        <div className="font-sans text-base lg:text-lg text-white/95 text-center lg:text-right max-w-xl">
          <p className="font-semibold tracking-wide">
            更多疑问可添加微信：ayaocali
          </p>
        </div>
      </div>
      <p className="font-sans text-xs text-white/60 text-center mt-10">
        © {new Date().getFullYear()} 阿垚在洛杉矶
      </p>
    </motion.footer>
  );
}
