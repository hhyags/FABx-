"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { revealUp } from "@/lib/animation/motion";

const products = [
  { name: "Enterprise CRM", tag: "AI-Powered Sales Engine", desc: "Automated lead scoring, intelligent email cadence, and CRM sync." },
  { name: "Global ERP Platform", tag: "Operations Core", desc: "Real-time supply chain forecasting, ledger reconciliation, and analytics." },
  { name: "AI Agent Studio", tag: "Autonomous Ops", desc: "Deploy custom LLM-driven autonomous agents in minutes." },
];

export function ProductsOverlay() {
  return (
    <section id="products" className="relative min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-6xl mx-auto z-10 w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            variants={revealUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="font-mono text-xs uppercase tracking-[0.3em] text-amber-400 mb-3"
          >
            Scene 05 — Products
          </motion.p>
          <motion.h2
            variants={revealUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="font-display text-4xl sm:text-6xl font-semibold text-white"
          >
            Digital Ecosystems.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((prod, idx) => (
            <motion.div
              key={prod.name}
              variants={revealUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: idx * 0.1 }}
              className="group p-8 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl hover:border-amber-400/50 hover:bg-white/[0.07] transition-all"
            >
              <div className="font-mono text-xs text-amber-400 uppercase tracking-wider mb-3">{prod.tag}</div>
              <h3 className="font-display text-2xl font-semibold text-white mb-3 flex items-center justify-between">
                {prod.name}
                <ArrowUpRight className="size-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-white/70 leading-relaxed">{prod.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
