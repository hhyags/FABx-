"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { NoomoCard } from "@/components/ui/noomo-card";
import { revealUp } from "@/lib/animation/motion";

const categories = ["All Showcase", "AI Agents", "Enterprise Platforms", "Mobile Apps"];

const showcaseItems = [
  {
    id: "crm",
    category: "AI Agents",
    title: "Autonomous Sales Agent CRM",
    client: "FabX Labs",
    year: "2026",
    desc: "AI-driven CRM system with automated lead intelligence, voice calling agents, and automated pipeline sync.",
    deliverables: ["RAG Architecture", "Real-Time Telemetry", "Next.js & WebGL UI"],
  },
  {
    id: "erp",
    category: "Enterprise Platforms",
    title: "Global Supply Chain ERP",
    client: "Nexus Global",
    year: "2026",
    desc: "Real-time ledger reconciliation, predictive inventory management, and multi-region cloud edge synchronization.",
    deliverables: ["Serverless Mesh", "Vector Search", "High-Throughput APIs"],
  },
  {
    id: "studio",
    category: "AI Agents",
    title: "AI Agent Orchestration Studio",
    client: "Vanguard Tech",
    year: "2026",
    desc: "Visual node-based agent workflow builder allowing enterprises to deploy multi-agent autonomous teams in minutes.",
    deliverables: ["Visual Canvas", "Sub-10ms Latency", "Multi-LLM Routing"],
  },
];

export function ProductsOverlay() {
  const [activeCategory, setActiveCategory] = useState("All Showcase");
  const [selectedItem, setSelectedItem] = useState<(typeof showcaseItems)[0] | null>(null);

  const filteredItems = showcaseItems.filter(
    (item) => activeCategory === "All Showcase" || item.category === activeCategory
  );

  return (
    <section id="products" className="relative min-h-screen flex items-center justify-center px-6 py-28">
      <div className="max-w-6xl mx-auto z-10 w-full">
        {/* Kinetic Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.div
              variants={revealUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-cyan-400 mb-3 px-4 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-950/20 backdrop-blur-md"
            >
              <Sparkles className="size-3.5" /> Noomo-Grade Digital Showcase
            </motion.div>
            <motion.h2
              variants={revealUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="font-display text-4xl sm:text-7xl font-semibold text-white leading-tight"
            >
              Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-cyan-400 to-white">Works.</span>
            </motion.h2>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full font-mono text-xs tracking-wider transition-all ${
                  activeCategory === cat
                    ? "bg-white text-black font-semibold shadow-[0_0_25px_rgba(255,255,255,0.4)]"
                    : "border border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Tilt Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <NoomoCard key={item.id} onClick={() => setSelectedItem(item)}>
              <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-4">
                <span>{item.category}</span>
                <span>{item.year}</span>
              </div>
              <h3 className="font-display text-2xl font-semibold text-white mb-3 flex items-center justify-between group">
                {item.title}
                <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 text-cyan-400" />
              </h3>
              <p className="text-sm text-white/70 leading-relaxed mb-6">{item.desc}</p>
              <div className="flex flex-wrap gap-2">
                {item.deliverables.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full border border-white/10 bg-white/5 font-mono text-[10px] text-white/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </NoomoCard>
          ))}
        </div>
      </div>

      {/* Interactive Case Study Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-2xl"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl rounded-3xl border border-white/20 bg-black/90 p-10 text-white shadow-[0_0_80px_rgba(139,92,246,0.3)]"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute right-6 top-6 p-2 rounded-full border border-white/20 bg-white/10 hover:bg-white/20"
              >
                <X className="size-5" />
              </button>

              <div className="font-mono text-xs text-cyan-400 uppercase tracking-widest mb-2">
                {selectedItem.category} • {selectedItem.client}
              </div>
              <h3 className="font-display text-4xl font-bold mb-4">{selectedItem.title}</h3>
              <p className="text-base text-white/70 leading-relaxed mb-8">{selectedItem.desc}</p>

              <div className="border-t border-white/10 pt-6 flex flex-wrap justify-between items-center text-sm">
                <span className="font-mono text-white/50">Engine Architecture: WebGL / R3F / Sub-10ms APIs</span>
                <button
                  onClick={() => setSelectedItem(null)}
                  aria-label="Close case study preview"
                  className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-white/90"
                >
                  Close Preview
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
