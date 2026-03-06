"use client";

import { motion } from "framer-motion";

export default function AboutMe() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="bg-[#F9F8F6] py-16 lg:py-24 px-6 lg:px-12"
    >
      <div className="max-w-5xl mx-auto">
        <div className="w-full lg:w-4/5 mx-auto">
          <h2 className="font-serif text-2xl lg:text-3xl xl:text-4xl text-olive mb-6">
            关于我 / About Me
          </h2>
          <div className="font-sans text-[15px] lg:text-base text-olive/85 leading-relaxed space-y-4">
            <p>
              我是阿垚，毕业于{" "}
              <span className="font-semibold text-brown">UCLA</span>。这{" "}
              <span className="font-semibold text-brown">7 年</span> 的在地生活，让我学会了用加州人的方式思考。
              在这里，生活不是赶路，而是在包容与平和中寻找生命力。
              我深知对于初到美国的家庭来说，「安全感」与「融入感」远比一个插班 / 夏令营的名额更重要。
              我将结合在地{" "}
              <span className="font-semibold text-brown">7 年</span> 的独特视角、经验与资源，
              帮助家庭做决策并优化游学体验，为您和孩子策划一场不仅限于课堂的深度游学。
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

