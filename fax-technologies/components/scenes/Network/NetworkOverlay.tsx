"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { revealUp, fadeIn, staggerContainer } from "@/lib/animation/motion";
import { ENGINE_EVENTS, eventBus } from "@/lib/experience/engine/EventBus";

export function NetworkOverlay() {
  const [hoveredNode, setHoveredNode] = useState<{ id: string; label: string; category: string } | null>(null);

  useEffect(() => {
    const unsub = eventBus.on(ENGINE_EVENTS.NODE_HOVER, (data: unknown) => {
      setHoveredNode(data as { id: string; label: string; category: string } | null);
    });
    return () => unsub();
  }, []);

  return (
    <section
      id="network"
      className="relative flex min-h-screen items-center px-6 py-40 md:px-12 md:py-52"
    >
      <div className="container-editorial relative z-10 w-full">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column Text */}
          <motion.div
            className="lg:col-span-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.4 }}
          >
            <motion.p variants={fadeIn} className="text-overline mb-6">
              Chapter 03 — Intelligence
            </motion.p>

            <motion.h2
              variants={revealUp}
              className="font-display text-editorial font-semibold tracking-tight text-white mb-6"
            >
              Ideas Converge. <br />
              Intelligence Emerges.
            </motion.h2>

            <motion.p variants={revealUp} className="text-body-lg text-white/40">
              Multi-agent reasoning engines, vector embeddings, and autonomous RAG pipelines
              synergize into living digital intelligence.
            </motion.p>
          </motion.div>

          {/* Right Column Node Telemetry Panel */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 backdrop-blur-xl">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[hsl(192,82%,46%)] mb-4">
                3D Neural Mesh Topology
              </div>
              {hoveredNode ? (
                <div className="space-y-2">
                  <div className="font-display text-lg font-bold text-white">{hoveredNode.label}</div>
                  <div className="font-mono text-xs text-white/50">{hoveredNode.category}</div>
                </div>
              ) : (
                <div className="font-mono text-xs text-white/30 italic">
                  Hover 3D nodes in the neural network to inspect active reasoning components...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
