"use client";

import { motion } from "motion/react";
import { AnimeTextReveal } from "@/components/ui/AnimeTextReveal";
import { Shield, Sparkles, Send, Activity } from "lucide-react";

const whyPillars = [
  { title: "Engineering Excellence", desc: "Strict type safety, sub-50ms latencies, and production-tested architecture." },
  { title: "Human-Centered AI", desc: "Designing AI agents that enhance human decision-making without adding friction." },
  { title: "Scalable Systems", desc: "Stateless micro-services built to auto-scale dynamically under high demand." },
  { title: "Reliable Delivery", desc: "On-time engineering milestones with transparent telemetry and zero guesswork." },
];

export function Section08WhyFabx() {
  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTech = () => {
    const el = document.getElementById("tech-stack");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="why-fabx" className="fabx-story-section bg-[#060709] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.02] font-mono text-xs text-cyan-400">
            <Sparkles className="size-3.5" />
            <span>CHAPTER 08 — WHY FABX INNOVATIONS</span>
          </div>
          <AnimeTextReveal
            text="Crafted with Precision. Built to Last."
            className="font-display text-[clamp(2.4rem,5vw,5rem)] font-bold tracking-tight text-white leading-tight"
            as="h2"
          />
        </div>

        {/* Large Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/10 pt-12">
          {whyPillars.map((p, idx) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.8 }}
              className="space-y-4 p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-cyan-500/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-cyan-400">[0{idx + 1}]</span>
                <h3 className="font-display text-2xl font-bold text-white">{p.title}</h3>
              </div>
              <p className="text-white/50 text-base leading-relaxed font-sans max-w-md">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Action CTA Bar */}
        <div className="p-8 rounded-2xl border border-white/10 bg-gradient-to-r from-[#0a0d16] to-[#05070c] flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs">
          <div className="space-y-1 text-center sm:text-left">
            <div className="font-bold text-white text-sm sm:text-base">Ready to Build Your System?</div>
            <div className="text-white/50">Schedule a direct engineering consultation with our core architects.</div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={scrollToContact}
              className="px-6 py-3 rounded-xl bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(14,165,233,0.3)]"
            >
              <span>Initiate Project Sprint</span>
              <Send className="size-3.5" />
            </button>
            <button
              onClick={scrollToTech}
              className="px-6 py-3 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-bold transition-all cursor-pointer flex items-center gap-2"
            >
              <Activity className="size-3.5 text-cyan-400" />
              <span>Inspect Living Tech Stack</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
