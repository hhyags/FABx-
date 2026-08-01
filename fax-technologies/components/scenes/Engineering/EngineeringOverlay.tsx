"use client";

import { motion } from "framer-motion";
import { Cpu, Database, Cloud, Code2 } from "lucide-react";
import { revealUp } from "@/lib/animation/motion";

const capabilities = [
  { icon: Cpu, title: "Autonomous AI Agents", desc: "Multi-agent workflows operating with contextual memory." },
  { icon: Database, title: "High-Throughput Data", desc: "Distributed vector storage with sub-millisecond retrieval." },
  { icon: Cloud, title: "Serverless Mesh", desc: "Global edge deployment auto-scaling across regions." },
  { icon: Code2, title: "Modern API Architecture", desc: "GraphQL & gRPC microservices built for scalability." },
];

export function EngineeringOverlay() {
  return (
    <section id="engineering" className="relative min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-6xl mx-auto z-10 w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            variants={revealUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-400 mb-3"
          >
            Scene 04 — Engineering
          </motion.p>
          <motion.h2
            variants={revealUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="font-display text-4xl sm:text-6xl font-semibold text-white"
          >
            Engineered for Scale.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((item, index) => (
            <motion.div
              key={item.title}
              variants={revealUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md hover:border-white/20 transition-colors"
            >
              <item.icon className="size-8 text-brand-cyan mb-4" />
              <h3 className="font-display text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
