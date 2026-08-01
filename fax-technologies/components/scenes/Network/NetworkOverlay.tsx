"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { revealUp } from "@/lib/animation/motion";
import { ENGINE_EVENTS, eventBus } from "@/lib/experience/engine/EventBus";

export function NetworkOverlay() {
  const [telemetry, setTelemetry] = useState<{ id: string; label: string; category: string } | null>(null);

  useEffect(() => {
    const unsubscribe = eventBus.on(ENGINE_EVENTS.NODE_HOVER, (data) => {
      setTelemetry(data as { id: string; label: string; category: string } | null);
    });
    return unsubscribe;
  }, []);

  return (
    <section id="network" className="relative min-h-screen flex items-center justify-between px-8 py-24">
      <div className="max-w-xl z-10">
        <motion.p
          variants={revealUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
          className="font-mono text-xs uppercase tracking-[0.3em] text-brand-purple mb-4"
        >
          Scene 03 — Neural Network
        </motion.p>

        <motion.h2
          variants={revealUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
          className="font-display text-4xl sm:text-6xl font-semibold text-white leading-tight"
        >
          Intelligence Taking Shape.
        </motion.h2>

        <motion.p
          variants={revealUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
          className="mt-6 text-base text-white/70 leading-relaxed"
        >
          Interconnected neural nodes processing high-throughput data pipelines, real-time autonomous reasoning, and predictive model inference.
        </motion.p>
      </div>

      {/* Floating Telemetry Card on Node Hover */}
      {telemetry && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          className="fixed right-12 top-1/3 z-20 p-6 rounded-2xl border border-cyan-500/30 bg-black/60 backdrop-blur-xl max-w-xs text-left shadow-[0_0_40px_rgba(34,211,238,0.2)]"
        >
          <div className="font-mono text-[10px] uppercase tracking-widest text-cyan-400 mb-1">
            {telemetry.category}
          </div>
          <h4 className="font-display text-lg font-bold text-white mb-2">{telemetry.label}</h4>
          <div className="flex items-center gap-2 font-mono text-xs text-white/60">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            Active Node • Latency 1.2ms
          </div>
        </motion.div>
      )}
    </section>
  );
}
