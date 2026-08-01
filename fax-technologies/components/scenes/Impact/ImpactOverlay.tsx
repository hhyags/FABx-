"use client";

import { motion } from "framer-motion";
import { revealUp } from "@/lib/animation/motion";

const metrics = [
  { value: "99.99%", label: "System Uptime" },
  { value: "10x", label: "Workflow Velocity" },
  { value: "50M+", label: "Daily API Invocations" },
  { value: "2.4x", label: "ROI Acceleration" },
];

export function ImpactOverlay() {
  return (
    <section id="impact" className="relative min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-6xl mx-auto z-10 w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            variants={revealUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="font-mono text-xs uppercase tracking-[0.3em] text-yellow-400 mb-3"
          >
            Scene 06 — Impact
          </motion.p>
          <motion.h2
            variants={revealUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="font-display text-4xl sm:text-6xl font-semibold text-white"
          >
            Proven Outcomes.
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {metrics.map((m, idx) => (
            <motion.div
              key={m.label}
              variants={revealUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: idx * 0.1 }}
              className="text-center p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md"
            >
              <div className="font-display text-4xl sm:text-5xl font-bold text-yellow-400 mb-2">{m.value}</div>
              <div className="font-mono text-xs uppercase tracking-wider text-white/60">{m.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
