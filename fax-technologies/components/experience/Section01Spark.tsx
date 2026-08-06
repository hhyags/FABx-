"use client";

import { motion } from "motion/react";
import { AnimeTextReveal } from "@/components/ui/AnimeTextReveal";
import { Cpu, Zap, Activity } from "lucide-react";

export function Section01Spark() {
  return (
    <section id="spark" className="fabx-story-section fabx-drafting-grid flex flex-col justify-center items-center text-center relative overflow-hidden">
      {/* Volumetric background energy glow */}
      <div className="absolute inset-0 fabx-cyan-glow pointer-events-none opacity-60" />

      {/* Blueprint Grid Lines & Technical Dimensions overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <line x1="10%" y1="0" x2="10%" y2="100%" stroke="rgba(14,165,233,0.3)" strokeDasharray="4 4" />
          <line x1="90%" y1="0" x2="90%" y2="100%" stroke="rgba(14,165,233,0.3)" strokeDasharray="4 4" />
          <line x1="0" y1="20%" x2="100%" y2="20%" stroke="rgba(14,165,233,0.3)" strokeDasharray="4 4" />
          <line x1="0" y1="80%" x2="100%" y2="80%" stroke="rgba(14,165,233,0.3)" strokeDasharray="4 4" />
          <text x="12%" y="18%" fill="rgba(14,165,233,0.6)" fontSize="10" fontFamily="monospace">
            [SYS_ORIGIN: 0x8F9A] • SCALE 1:1
          </text>
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl space-y-8 px-4">
        {/* Converging Glowing Energy Point Icon */}
        <motion.div
          initial={{ scale: 0.2, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center shadow-[0_0_40px_rgba(14,165,233,0.4)]"
        >
          <Zap className="size-8 text-cyan-400 animate-pulse" />
        </motion.div>

        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.02] font-mono text-xs text-cyan-400"
        >
          <Activity className="size-3.5" />
          <span>CHAPTER 01 — THE SPARK</span>
        </motion.div>

        {/* Headline */}
        <AnimeTextReveal
          text="Every breakthrough begins with one idea."
          className="font-display text-[clamp(2.4rem,5vw,4.8rem)] font-bold leading-tight tracking-tight text-white"
          as="h2"
          delay={200}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="max-w-2xl mx-auto text-base sm:text-lg text-white/50 leading-relaxed font-sans"
        >
          A single spark of intent — condensed into code, architecture, and purpose. We transform abstract thoughts into production-ready software systems.
        </motion.p>

        {/* Self-Drawing Engineering Blueprint SVG */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1.0 }}
          className="relative mt-8 p-6 sm:p-8 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl max-w-3xl mx-auto shadow-2xl space-y-4"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs text-white/50">
            <span className="flex items-center gap-2 text-cyan-400 font-bold">
              <Cpu className="size-4" />
              <span>BLUEPRINT DRAFTING ENGINE</span>
            </span>
            <span className="text-[10px] text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
              AUTOCAD / VECTOR ACTIVE
            </span>
          </div>

          {/* Animated Wireframe Lines */}
          <div className="h-48 w-full relative flex items-center justify-center border border-white/5 rounded-xl bg-white/[0.01]">
            <svg className="w-full h-full p-4" viewBox="0 0 400 160" fill="none">
              <path d="M 20 80 H 380 M 200 10 V 150" stroke="rgba(255,255,255,0.08)" strokeDasharray="2 2" />
              <circle cx="80" cy="80" r="16" stroke="rgba(14,165,233,0.8)" strokeWidth="1.5" fill="rgba(14,165,233,0.1)" />
              <circle cx="200" cy="40" r="16" stroke="rgba(14,165,233,0.8)" strokeWidth="1.5" fill="rgba(14,165,233,0.1)" />
              <circle cx="200" cy="120" r="16" stroke="rgba(14,165,233,0.8)" strokeWidth="1.5" fill="rgba(14,165,233,0.1)" />
              <circle cx="320" cy="80" r="16" stroke="rgba(14,165,233,0.8)" strokeWidth="1.5" fill="rgba(14,165,233,0.1)" />
              <path d="M 96 80 L 184 40 M 96 80 L 184 120 M 216 40 L 304 80 M 216 120 L 304 80" stroke="rgba(14,165,233,0.6)" strokeWidth="1.5" strokeDasharray="4 4" />
            </svg>
            <div className="absolute bottom-3 left-4 font-mono text-[10px] text-white/40">
              VECTOR MESH ID: #A92-VOLT • INTENT MAPPED
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
