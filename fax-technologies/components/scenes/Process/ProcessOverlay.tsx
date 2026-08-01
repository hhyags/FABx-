"use client";

import { motion } from "framer-motion";
import { revealUp } from "@/lib/animation/motion";

const steps = ["Discover", "Research", "Design", "Develop", "Test", "Deploy", "Scale"];

export function ProcessOverlay() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-6xl mx-auto z-10 w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            variants={revealUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-400 mb-3"
          >
            Scene 07 — Process
          </motion.p>
          <motion.h2
            variants={revealUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="font-display text-4xl sm:text-6xl font-semibold text-white"
          >
            Precision Methodology.
          </motion.h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={step}
              variants={revealUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: idx * 0.08 }}
              className="flex items-center gap-4"
            >
              <div className="px-6 py-4 rounded-full border border-cyan-500/30 bg-cyan-950/20 backdrop-blur-md font-mono text-sm text-cyan-300 font-semibold shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                0{idx + 1}. {step}
              </div>
              {idx < steps.length - 1 && <span className="text-white/20 text-lg">→</span>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
