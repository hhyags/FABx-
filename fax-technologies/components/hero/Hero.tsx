"use client";

import { ArrowRight, Terminal, Cpu, Activity, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ScrollIndicator } from "@/components/hero/ScrollIndicator";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const BOOT_LOGS = [
  "Initializing FABX OS...",
  "Loading AI Runtime...",
  "✓ AI Engine Online",
  "✓ Cloud Infrastructure Connected",
  "✓ Agent Runtime Ready",
  "Launching FABX OS...",
];

export function Hero() {
  const reducedMotion = usePrefersReducedMotion();
  const [bootIndex, setBootIndex] = useState(0);
  const [bootComplete, setBootComplete] = useState(false);
  const [cpuLoad, setCpuLoad] = useState(42);
  const [memoryUsage, setMemoryUsage] = useState(3.8);
  const [activeTask, setActiveTask] = useState({ id: "#21", agent: "Resume Screening Agent", status: "Completed" });

  // Terminal boot sequence timer
  useEffect(() => {
    if (reducedMotion) {
      setBootComplete(true);
      return;
    }

    const interval = setInterval(() => {
      setBootIndex((prev) => {
        if (prev < BOOT_LOGS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => setBootComplete(true), 400);
          return prev;
        }
      });
    }, 280);

    return () => clearInterval(interval);
  }, [reducedMotion]);

  // Live telemetry pulse
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setCpuLoad(Math.floor(38 + Math.random() * 12));
      setMemoryUsage(+(3.6 + Math.random() * 0.5).toFixed(1));
    }, 2000);
    return () => clearInterval(pulseInterval);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-[100lvh] items-center overflow-hidden bg-transparent text-white"
    >
      {/* OS Boot Overlay */}
      <AnimatePresence>
        {!bootComplete && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505] p-6 font-mono text-sm"
          >
            <div className="w-full max-w-md rounded-xl border border-white/10 bg-[#0a0a0c] p-6 shadow-2xl space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs text-white/40">
                <span className="flex items-center gap-2">
                  <Terminal className="size-3.5 text-[hsl(192,82%,46%)]" />
                  <span>FABX OS v4.2 BOOTLOADER</span>
                </span>
                <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <div className="space-y-2 py-2 text-xs">
                {BOOT_LOGS.slice(0, bootIndex + 1).map((log, i) => (
                  <div key={i} className="flex items-center gap-2">
                    {log.startsWith("✓") ? (
                      <span className="text-emerald-400 font-bold">{log}</span>
                    ) : (
                      <span className="text-white/70">{log}</span>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 pt-2 border-t border-white/5 text-[11px] text-white/30">
                <span className="animate-pulse">_</span>
                <span>System initializing...</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chapter 1 — AI Core & Operating System Interface */}
      <div className="relative z-10 w-full px-6 py-32 sm:px-12 md:px-20 lg:px-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Left Column — Core OS Headline */}
          <div className="lg:col-span-6 space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-mono text-xs text-[hsl(192,82%,46%)]">
              <Cpu className="size-3.5" />
              <span>CHAPTER 01 — AI CORE OPERATING SYSTEM</span>
            </div>

            <h1 className="font-display text-[clamp(2.8rem,5.5vw,5.2rem)] font-bold leading-[1.04] tracking-tight text-white">
              Engineering <br />
              Intelligent <br />
              <span className="text-[hsl(192,82%,46%)]">Digital Products.</span>
            </h1>

            <p className="max-w-md text-base leading-[1.75] text-white/50 font-sans">
              We design, architect, and deploy custom AI agents, complex enterprise software,
              and automated digital products inside a unified cloud operating system.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="#contact"
                className="group inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 font-display text-sm font-semibold text-black transition-all hover:bg-white/90"
              >
                <span>Deploy Project</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#engineering"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 font-mono text-xs text-white/70 transition-all hover:border-white/30 hover:text-white"
              >
                <span>Inspect Architecture →</span>
              </Link>
            </div>
          </div>

          {/* Right Column — Live AI Core System Telemetry Dashboard */}
          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-[#0c0d10]/85 p-6 backdrop-blur-2xl space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs">
                <span className="flex items-center gap-2 text-white/80 font-bold">
                  <Activity className="size-4 text-[hsl(192,82%,46%)] animate-pulse" />
                  <span>AI CORE ENGINE TELEMETRY</span>
                </span>
                <span className="text-[10px] uppercase text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                  REALTIME RUNTIME
                </span>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-3 font-mono">
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 space-y-1">
                  <div className="text-[10px] text-white/40 uppercase">CPU LOAD</div>
                  <div className="text-xl font-bold text-white">{cpuLoad}%</div>
                  <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[hsl(192,82%,46%)] transition-all duration-500" style={{ width: `${cpuLoad}%` }} />
                  </div>
                </div>

                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 space-y-1">
                  <div className="text-[10px] text-white/40 uppercase">MEMORY</div>
                  <div className="text-xl font-bold text-white">{memoryUsage} GB</div>
                  <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 transition-all duration-500" style={{ width: `${(memoryUsage / 8) * 100}%` }} />
                  </div>
                </div>

                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 space-y-1">
                  <div className="text-[10px] text-white/40 uppercase">LATENCY</div>
                  <div className="text-xl font-bold text-emerald-400">42 ms</div>
                  <div className="text-[9px] text-white/30">SUB-50MS EDGE</div>
                </div>
              </div>

              {/* Live Agent Execution Log Card */}
              <div className="rounded-xl border border-white/10 bg-black/50 p-4 space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between text-white/50 text-[10px] uppercase">
                  <span>AGENT RUNTIME LOG</span>
                  <span className="text-[hsl(192,82%,46%)]">AGENT {activeTask.id} ACTIVE</span>
                </div>
                <div className="flex items-center justify-between text-white font-semibold">
                  <span>Task: {activeTask.agent}</span>
                  <span className="inline-flex items-center gap-1 text-emerald-400 text-[11px]">
                    <CheckCircle2 className="size-3" />
                    <span>{activeTask.status}</span>
                  </span>
                </div>
                <div className="text-[11px] text-white/40 leading-relaxed">
                  Parsing incoming dataset • Vector embeddings generated • Automated pipeline trigger completed.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ScrollIndicator reducedMotion={reducedMotion} />
    </section>
  );
}
