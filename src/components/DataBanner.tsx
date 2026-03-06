"use client";

import { motion } from "framer-motion";

export default function DataBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-10 lg:py-12 px-6 lg:px-8 bg-brown"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center text-white">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <p className="font-sans font-semibold text-2xl lg:text-3xl mb-1">
                {" "}
              </p>
              <p className="font-sans text-sm lg:text-base text-white/80">
                {" "}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
