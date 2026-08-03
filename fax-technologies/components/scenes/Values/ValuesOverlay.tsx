"use client";

import { motion } from "framer-motion";
import { revealUp, fadeIn, staggerContainer } from "@/lib/animation/motion";

export function ValuesOverlay() {
  return (
    <section
      id="values"
      className="relative flex min-h-screen items-center justify-center px-6 py-40 text-center md:px-12 md:py-52"
    >
      <div className="container-editorial relative z-10 max-w-4xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
          className="space-y-12"
        >
          <motion.p variants={fadeIn} className="text-overline">
            Chapter 08 — Trust
          </motion.p>

          <motion.div variants={revealUp} className="space-y-6">
            <h2 className="font-display text-[clamp(2.5rem,5.5vw,5.5rem)] font-bold tracking-tight text-white leading-none">
              Built with precision.
            </h2>
            <h2 className="font-display text-[clamp(2.5rem,5.5vw,5.5rem)] font-bold tracking-tight text-white/70 leading-none">
              Engineered for scale.
            </h2>
            <h2 className="font-display text-[clamp(2.5rem,5.5vw,5.5rem)] font-bold tracking-tight text-[hsl(192,82%,46%)] leading-none">
              Designed for people.
            </h2>
          </motion.div>

          <motion.p
            variants={revealUp}
            className="mx-auto max-w-xl text-body-lg text-white/35 leading-relaxed"
          >
            No decorative fluff. No unverified claims. Pure engineering discipline.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
