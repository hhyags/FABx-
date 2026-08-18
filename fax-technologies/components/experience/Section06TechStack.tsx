"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimeTextReveal } from "@/components/ui/AnimeTextReveal";
import { Network, Server, Database, Cloud, Cpu, Activity, X } from "lucide-react";

const stackNodes = [
  { id: "node1", title: "API Gateway", role: "Request Routing & Auth", icon: Server, latency: "2ms", tech: "Kong / NGINX / Cloudflare Workers", desc: "Edge routing layer managing zero-trust authentication, rate-limiting, and micro-frontend path mapping." },
  { id: "node2", title: "Vector Engine", role: "Semantic Search & Embeddings", icon: Cpu, latency: "14ms", tech: "Qdrant Vector DB & OpenAI Embeddings", desc: "HNSW index vector cluster performing real-time cosine similarity matches across multi-million node datasets." },
  { id: "node3", title: "Database Cluster", role: "Postgres + Qdrant Distributed", icon: Database, latency: "8ms", tech: "PostgreSQL 16 & pgvector", desc: "High-availability primary database cluster with read-replicas and sub-millisecond connection pooling." },
  { id: "node4", title: "Cloud Mesh", role: "Kubernetes Edge Nodes", icon: Cloud, latency: "5ms", tech: "Kubernetes K8s & Docker Containers", desc: "Containerized Kubernetes pods auto-scaling dynamically based on inbound CPU load and request concurrency." },
];

export function Section06TechStack() {
  const [activeNode, setActiveNode] = useState<(typeof stackNodes)[0] | null>(null);

  return (
    <section id="tech-stack" className="fabx-story-section bg-[#060709] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.02] font-mono text-xs text-cyan-400">
            <Network className="size-3.5" />
            <span>CHAPTER 06 — LIVING TECH STACK</span>
          </div>
          <AnimeTextReveal
            text="Technologies as Interconnected Systems."
            className="font-display text-[clamp(2.2rem,4.5vw,4.2rem)] font-bold tracking-tight text-white"
            as="h2"
          />
          <p className="text-white/50 text-base sm:text-lg font-sans leading-relaxed">
            We don&apos;t just pick tools — we architect interconnected node networks that process data packets with sub-50ms round-trip latency. Click any cluster node to inspect system metrics.
          </p>
        </div>

        {/* Living Node Network Graphic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stackNodes.map((node, idx) => {
            const Icon = node.icon;
            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12, duration: 0.6 }}
                onClick={() => setActiveNode(node)}
                className="fabx-glass-module p-6 sm:p-8 space-y-6 relative overflow-hidden cursor-pointer group hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(14,165,233,0.15)] transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                      <Icon className="size-6" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {node.title}
                      </h3>
                      <p className="font-mono text-xs text-white/40">{node.role}</p>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded border border-emerald-400/20">
                    {node.latency}
                  </span>
                </div>

                {/* Animated Packet Stream Line */}
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative">
                  <motion.div
                    className="h-full w-1/3 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full"
                    animate={{ x: ["-100%", "300%"] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: "linear", delay: idx * 0.4 }}
                  />
                </div>

                <div className="text-right font-mono text-[10px] text-cyan-400 font-bold group-hover:underline">
                  INSPECT NODE METRICS →
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Node Inspector Modal */}
      <AnimatePresence>
        {activeNode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6 backdrop-blur-2xl"
            onClick={() => setActiveNode(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-cyan-500/30 bg-[#07090e] p-6 sm:p-8 font-mono text-white shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                  <Activity className="size-4" />
                  <span>CLUSTER NODE TELEMETRY — {activeNode.title}</span>
                </div>
                <button
                  onClick={() => setActiveNode(null)}
                  className="p-1.5 rounded-lg text-white/60 hover:bg-white/10 hover:text-white"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="space-y-4 font-sans text-sm text-white/70">
                <h3 className="font-display text-2xl font-bold text-white">{activeNode.title}</h3>
                <p className="text-white/80 text-base leading-relaxed">{activeNode.desc}</p>

                <div className="grid grid-cols-2 gap-3 font-mono text-xs pt-2">
                  <div className="p-3 rounded-xl border border-white/10 bg-white/[0.02]">
                    <div className="text-white/40">NODE LATENCY</div>
                    <div className="text-emerald-400 font-bold text-base">{activeNode.latency}</div>
                  </div>
                  <div className="p-3 rounded-xl border border-white/10 bg-white/[0.02]">
                    <div className="text-white/40">STACK ENGINE</div>
                    <div className="text-cyan-400 font-bold text-xs truncate">{activeNode.tech}</div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setActiveNode(null)}
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-xs hover:bg-cyan-400 font-mono"
                >
                  Close Telemetry
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
