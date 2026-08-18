"use client";

import { motion } from "framer-motion";
import { Activity, Cpu, ShieldCheck, Zap } from "lucide-react";
import React from "react";

export function MotionWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className="relative overflow-hidden rounded-3xl border border-cyan-400/30 bg-black/80 p-6 backdrop-blur-2xl shadow-[0_0_50px_rgba(34,211,238,0.25)] max-w-sm text-white"
    >
      {/* Animated Motion Graphics Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
        <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest">
          <Activity className="size-4 animate-pulse text-cyan-400" />
          <span>LIVE ENGINE GRAPHICS HUD</span>
        </div>
        <span className="flex items-center gap-1 font-mono text-[10px] text-emerald-400">
          <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
          ACTIVE
        </span>
      </div>

      {/* SVG Motion Graphic Circular Gauge */}
      <div className="flex items-center justify-between gap-4 my-4">
        <div className="relative size-20 grid place-items-center">
          <svg className="size-full -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-white/10"
              strokeWidth="3"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <motion.path
              className="text-cyan-400"
              strokeWidth="3"
              strokeDasharray="100, 100"
              initial={{ strokeDashoffset: 100 }}
              whileInView={{ strokeDashoffset: 25 }}
              viewport={{ once: false }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute font-mono text-xs font-bold text-white">75%</div>
        </div>

        <div className="space-y-2 flex-1 font-mono text-xs">
          <div className="flex justify-between text-white/70">
            <span>MODEL LATENCY</span>
            <span className="text-cyan-300 font-bold">12 ms</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-brand-purple to-cyan-400"
              initial={{ width: "0%" }}
              whileInView={{ width: "85%" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </div>

          <div className="flex justify-between text-white/70 pt-1">
            <span>RAG VECTOR SEARCH</span>
            <span className="text-emerald-400 font-bold">99.9%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400"
              initial={{ width: "0%" }}
              whileInView={{ width: "98%" }}
              transition={{ duration: 1.4, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* Floating Animated Badges */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-white/50">
        <span className="flex items-center gap-1">
          <Zap className="size-3 text-amber-400" /> ULTRA-LOW LATENCY
        </span>
        <span className="flex items-center gap-1">
          <Cpu className="size-3 text-cyan-400" /> GPU PIPELINE
        </span>
      </div>
    </motion.div>
  );
}
