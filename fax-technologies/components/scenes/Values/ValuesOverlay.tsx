"use client";

import { motion } from "framer-motion";
import React from "react";

const valueStatements = [
  { statement: "Build with precision.", desc: "Every architecture, API signature, and state mutation is documented and type-checked before deployment." },
  { statement: "Design for people.", desc: "Software must feel effortless. Immersion earns trust—it never replaces proof." },
  { statement: "Engineer for scale.", desc: "Sub-10ms response times, vector indexing, and serverless edge deployment built for commercial velocity." },
];

export function ValuesOverlay() {
  return (
    <section
      id="values"
      className="relative flex min-h-screen items-center px-6 py-40 md:px-12 md:py-52 bg-[#050505] text-white"
    >
      <div className="max-w-4xl mx-auto z-10 w-full space-y-24">
        <div className="text-center space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-cyan-400">
            CHAPTER 08 — CORE PHILOSOPHY
          </p>
          <h2 className="font-display text-4xl sm:text-6xl font-bold">
            Engineering Values.
          </h2>
        </div>

        {/* Quiet Typography Moments */}
        <div className="space-y-20">
          {valueStatements.map((item, idx) => (
            <motion.div
              key={item.statement}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="p-10 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl space-y-4 hover:border-cyan-400/40 transition-colors"
            >
              <h3 className="font-display text-3xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-cyan-400">
                {item.statement}
              </h3>
              <p className="text-white/60 text-base sm:text-lg max-w-2xl leading-relaxed font-sans">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
