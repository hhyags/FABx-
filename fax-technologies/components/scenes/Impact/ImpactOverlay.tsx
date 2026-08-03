"use client";

import { motion } from "framer-motion";
import { Activity, Globe, Cpu, Server, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { revealUp, fadeIn, staggerContainer } from "@/lib/animation/motion";

export function ImpactOverlay() {
  const [requestsCount, setRequestsCount] = useState(12421);

  useEffect(() => {
    const interval = setInterval(() => {
      setRequestsCount((prev) => prev + Math.floor(1 + Math.random() * 5));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="monitoring"
      className="relative flex min-h-screen items-center px-6 py-40 md:px-12 md:py-52"
    >
      <div className="container-editorial relative z-10 w-full space-y-16">
        <motion.div
          className="max-w-3xl"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.p variants={fadeIn} className="text-overline mb-4 text-[hsl(192,82%,46%)] font-mono">
            CHAPTER 07 — LIVE SYSTEM MONITORING DASHBOARD
          </motion.p>
          <motion.h2 variants={revealUp} className="text-editorial text-white">
            Live Mission Control.
          </motion.h2>
          <motion.p variants={revealUp} className="mt-4 text-body-lg text-white/50 font-sans">
            Realtime telemetry tracking active API requests, sub-50ms latencies, cloud regions, and agent execution across production clusters.
          </motion.p>
        </motion.div>

        {/* Live Mission Control Dashboard */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 font-mono">
          <div className="rounded-2xl border border-white/10 bg-[#0c0d12]/90 p-6 space-y-3 shadow-2xl">
            <div className="flex items-center justify-between text-white/40 text-xs">
              <span>API REQUESTS</span>
              <Activity className="size-4 text-[hsl(192,82%,46%)] animate-pulse" />
            </div>
            <div className="text-3xl font-bold text-white">{requestsCount.toLocaleString()}</div>
            <div className="text-[11px] text-emerald-400">↑ 14% THRU PUT BOOST</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0c0d12]/90 p-6 space-y-3 shadow-2xl">
            <div className="flex items-center justify-between text-white/40 text-xs">
              <span>AVERAGE LATENCY</span>
              <Server className="size-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-bold text-emerald-400">42 ms</div>
            <div className="text-[11px] text-white/30">SUB-MILLISECOND EDGE ROUTING</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0c0d12]/90 p-6 space-y-3 shadow-2xl">
            <div className="flex items-center justify-between text-white/40 text-xs">
              <span>ACTIVE AGENTS</span>
              <Cpu className="size-4 text-[hsl(192,82%,46%)]" />
            </div>
            <div className="text-3xl font-bold text-white">12 RUNTIMES</div>
            <div className="text-[11px] text-emerald-400">100% CONCURRENT HEALTH</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0c0d12]/90 p-6 space-y-3 shadow-2xl">
            <div className="flex items-center justify-between text-white/40 text-xs">
              <span>CLOUD REGIONS</span>
              <Globe className="size-4 text-cyan-400" />
            </div>
            <div className="text-3xl font-bold text-white">3 CLUSTERS</div>
            <div className="text-[11px] text-white/40">US-EAST • EU • AP-SOUTH</div>
          </div>
        </div>
      </div>
    </section>
  );
}
