"use client";

import { motion } from "framer-motion";

export default function IntroductionSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-20 lg:py-28 px-6 lg:px-8 bg-cream"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-semibold text-olive mb-6">
          {" "}
        </h1>
        <p className="font-sans text-olive/70 text-base lg:text-lg leading-relaxed">
          {" "}
        </p>
      </div>
    </motion.section>
  );
}
