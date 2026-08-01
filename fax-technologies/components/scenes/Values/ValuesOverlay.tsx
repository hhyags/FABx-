"use client";

import { motion } from "framer-motion";
import { revealUp } from "@/lib/animation/motion";

const values = [
  { title: "Relentless Engineering", desc: "No shortcuts. Zero compromise on security, architecture, or performance." },
  { title: "Human-Centric AI", desc: "Building intelligent software that amplifies human capability." },
  { title: "Future Proof Scalability", desc: "Architecting infrastructure that thrives under hyper-growth." },
];

export function ValuesOverlay() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-6xl mx-auto z-10 w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            variants={revealUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="font-mono text-xs uppercase tracking-[0.3em] text-purple-400 mb-3"
          >
            Scene 08 — Core Principles
          </motion.p>
          <motion.h2
            variants={revealUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="font-display text-4xl sm:text-6xl font-semibold text-white"
          >
            What Drives Us.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, idx) => (
            <motion.div
              key={v.title}
              variants={revealUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl"
            >
              <h3 className="font-display text-2xl font-semibold text-white mb-3">{v.title}</h3>
              <p className="text-sm text-white/70 leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
