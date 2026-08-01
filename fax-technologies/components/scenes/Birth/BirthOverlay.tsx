"use client";

import { motion } from "framer-motion";
import { revealUp } from "@/lib/animation/motion";

export function BirthOverlay() {
  return (
    <section id="birth" className="relative min-h-screen flex items-center justify-center text-center px-6 py-24">
      <div className="max-w-4xl mx-auto z-10">
        <motion.p
          variants={revealUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
          className="font-mono text-xs uppercase tracking-[0.3em] text-brand-cyan mb-4"
        >
          Scene 02 — Birth of Intelligence
        </motion.p>

        <motion.h2
          variants={revealUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
          className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold text-white leading-[1.05]"
        >
          Every breakthrough begins with <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-cyan-400 to-white">one idea.</span>
        </motion.h2>

        <motion.p
          variants={revealUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
          className="mt-6 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed"
        >
          Raw potential collapses into singular vision. Watch as isolated concepts converge, ignite, and transform into active digital intelligence.
        </motion.p>
      </div>
    </section>
  );
}
