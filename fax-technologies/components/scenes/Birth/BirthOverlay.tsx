"use client";

import { motion } from "framer-motion";
import { revealUp, fadeIn, staggerContainer } from "@/lib/animation/motion";

export function BirthOverlay() {
  return (
    <section
      id="birth"
      className="relative flex min-h-screen items-center justify-center px-6 py-40 text-center md:px-12 md:py-52"
    >
      <div className="container-editorial relative z-10 max-w-3xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
          className="space-y-6"
        >
          <motion.p variants={fadeIn} className="text-overline">
            Chapter 02 — The Spark
          </motion.p>

          <motion.h2
            variants={revealUp}
            className="font-display text-[clamp(2.2rem,4.5vw,4.2rem)] font-semibold tracking-tight text-white leading-tight"
          >
            Every breakthrough begins with one idea.
          </motion.h2>

          <motion.p
            variants={revealUp}
            className="mx-auto max-w-reading text-body-lg text-white/40"
          >
            A single spark of intent — condensed into code, architecture, and purpose.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
