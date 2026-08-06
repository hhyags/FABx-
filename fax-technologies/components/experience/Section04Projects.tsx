"use client";

import { motion, AnimatePresence } from "motion/react";
import { AnimeTextReveal } from "@/components/ui/AnimeTextReveal";
import { AnimeTelemetryCounter } from "@/components/ui/AnimeTelemetryCounter";
import { Terminal, CheckCircle2, Activity, ExternalLink, Play, X, Minus, Maximize2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const projects = [
  {
    id: "hrflow",
    name: "HRFlow AI",
    category: "AI Recruitment & Resume Analytics",
    status: "v2.4 Live",
    image: "/images/projects/hrflow-ai.png",
    demoUrl: "/work/hrflow-ai",
    metrics: { metric1Name: "Resumes Filtered", metric1Value: 142000, metric2Name: "Match Accuracy", metric2Value: 98.4 },
    summary: "Autonomous candidate screening pipeline integrating LLM embedding vectors for high-volume enterprise hiring.",
  },
  {
    id: "medflow",
    name: "MedFlow AI",
    category: "Clinical Workflow & EHR Automation",
    status: "v1.9 HIPAA Compliant",
    image: "/images/projects/medflow-ai.png",
    demoUrl: "/work/medflow-ai",
    metrics: { metric1Name: "Charts Processed", metric1Value: 89000, metric2Name: "Doctor Hours Saved", metric2Value: 14500 },
    summary: "Real-time speech-to-charting clinical assistant parsing patient conversations into structured electronic health records.",
  },
  {
    id: "kirana",
    name: "Kirana AI",
    category: "Retail Inventory & Demand Forecasting",
    status: "v3.1 Production",
    image: "/images/projects/kirana-ai.png",
    demoUrl: "/work/godowniq",
    metrics: { metric1Name: "SKUs Tracked", metric1Value: 520000, metric2Name: "Forecast Accuracy", metric2Value: 96.8 },
    summary: "Predictive supply chain engine optimizing regional retail inventory reordering with zero manual input.",
  },
  {
    id: "kgn",
    name: "KGN Service",
    category: "Automated Logistics & Field Service ERP",
    status: "v4.0 Enterprise",
    image: "/images/projects/kgn-service.png",
    demoUrl: "/work/kgn-enterprise",
    metrics: { metric1Name: "Routes Optimized", metric1Value: 340000, metric2Name: "Fuel Cost Reduced", metric2Value: 24.5 },
    summary: "Dynamic fleet dispatching system computing optimal delivery routes using multi-variable graph algorithms.",
  },
];

export function Section04Projects() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [windowMinimized, setWindowMinimized] = useState(false);
  const activeProj = projects[selectedIdx];

  return (
    <section id="projects" className="fabx-story-section bg-[#060709] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.02] font-mono text-xs text-cyan-400">
              <Terminal className="size-3.5" />
              <span>CHAPTER 04 — FEATURED SYSTEMS</span>
            </div>
            <AnimeTextReveal
              text="Software Built for Industry Leaders."
              className="font-display text-[clamp(2.2rem,4.5vw,4.2rem)] font-bold tracking-tight text-white"
              as="h2"
            />
          </div>

          {/* Project Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {projects.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedIdx(idx);
                  setWindowMinimized(false);
                }}
                className={`px-4 py-2 rounded-full font-mono text-xs transition-all cursor-pointer ${
                  selectedIdx === idx
                    ? "bg-white text-black font-bold shadow-lg scale-105"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Floating Software Application Window */}
        {!windowMinimized ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProj.id}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-white/10 bg-[#0a0b0e] overflow-hidden shadow-2xl space-y-0"
            >
              {/* Window Titlebar */}
              <div className="fabx-window-header flex items-center justify-between p-4 bg-[#0d1017] border-b border-white/10">
                <div className="fabx-window-dots flex items-center gap-2">
                  <span
                    onClick={() => setWindowMinimized(true)}
                    className="fabx-window-dot bg-rose-500/80 size-3 rounded-full cursor-pointer hover:opacity-80"
                    title="Minimize Window"
                  />
                  <span
                    onClick={() => setWindowMinimized(true)}
                    className="fabx-window-dot bg-amber-500/80 size-3 rounded-full cursor-pointer hover:opacity-80"
                    title="Minimize Window"
                  />
                  <span
                    onClick={() => setWindowMinimized(false)}
                    className="fabx-window-dot bg-emerald-500/80 size-3 rounded-full cursor-pointer hover:opacity-80"
                    title="Maximize Window"
                  />
                </div>
                <div className="text-white/60 flex items-center gap-2 font-mono text-xs">
                  <Activity className="size-3.5 text-cyan-400 animate-pulse" />
                  <span>{activeProj.name} • {activeProj.status}</span>
                </div>
                <div className="text-[10px] text-emerald-400 font-mono">SYSTEM ACTIVE</div>
              </div>

              {/* Dashboard Content Panel */}
              <div className="p-6 sm:p-10 space-y-8 bg-gradient-to-b from-black/80 to-[#07080a]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left Overview */}
                  <div className="lg:col-span-6 space-y-6">
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                      {activeProj.category}
                    </span>
                    <h3 className="font-display text-3xl font-bold text-white">{activeProj.name}</h3>
                    <p className="text-white/60 text-base leading-relaxed font-sans">{activeProj.summary}</p>

                    <div className="grid grid-cols-2 gap-4 font-mono">
                      <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] space-y-1">
                        <div className="text-[10px] text-white/40 uppercase">{activeProj.metrics.metric1Name}</div>
                        <div className="text-2xl font-bold text-white">
                          <AnimeTelemetryCounter value={activeProj.metrics.metric1Value} />
                        </div>
                      </div>
                      <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] space-y-1">
                        <div className="text-[10px] text-white/40 uppercase">{activeProj.metrics.metric2Name}</div>
                        <div className="text-2xl font-bold text-emerald-400">
                          <AnimeTelemetryCounter value={activeProj.metrics.metric2Value} decimals={1} suffix="%" />
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Link
                        href={activeProj.demoUrl}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-mono text-xs font-bold hover:bg-cyan-300 transition-all shadow-lg"
                      >
                        <span>Launch Live Case Study</span>
                        <ExternalLink className="size-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Right Product UI Screenshot Frame */}
                  <Link
                    href={activeProj.demoUrl}
                    className="lg:col-span-6 rounded-xl border border-white/10 bg-black/80 p-2 overflow-hidden relative group block cursor-pointer"
                  >
                    <div className="relative h-64 sm:h-72 w-full rounded-lg overflow-hidden border border-white/5">
                      <img
                        src={activeProj.image}
                        alt={activeProj.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-mono text-xs font-bold text-black shadow-2xl">
                          <Play className="size-3.5 fill-black" />
                          LAUNCH FULL APP CASE STUDY
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center font-mono text-xs text-white">
                        <span className="flex items-center gap-1.5 text-cyan-300">
                          <CheckCircle2 className="size-3.5 text-emerald-400" />
                          <span>{activeProj.name} Dashboard UI</span>
                        </span>
                        <ExternalLink className="size-3.5 text-white/60" />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="p-6 rounded-xl border border-white/10 bg-[#0a0b0e] text-center font-mono space-y-3">
            <div className="text-xs text-white/40">APPLICATION WINDOW MINIMIZED</div>
            <button
              onClick={() => setWindowMinimized(false)}
              className="px-6 py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-xs hover:bg-cyan-400"
            >
              Restore {activeProj.name} Window
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
