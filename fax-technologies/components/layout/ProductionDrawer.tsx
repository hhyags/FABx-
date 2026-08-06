"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Activity, Server, Cpu, Database, ShieldCheck, RefreshCw } from "lucide-react";
import { useState } from "react";

interface ProductionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const liveNodes = [
  { name: "us-east-cluster (API Gateway)", status: "OPERATIONAL", ping: "4ms", load: "18%" },
  { name: "eu-central-cluster (Vector DB)", status: "OPERATIONAL", ping: "12ms", load: "24%" },
  { name: "ap-south-cluster (AI Inference)", status: "OPERATIONAL", ping: "8ms", load: "31%" },
  { name: "postgres-primary (Data Mesh)", status: "OPERATIONAL", ping: "2ms", load: "12%" },
];

export function ProductionDrawer({ isOpen, onClose }: ProductionDrawerProps) {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[90] flex justify-end bg-black/80 backdrop-blur-xl"
        onClick={onClose}
      >
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          onClick={(e) => e.stopPropagation()}
          className="relative h-full w-full max-w-lg border-l border-white/10 bg-[#07090e] p-6 sm:p-10 font-mono text-white shadow-2xl flex flex-col justify-between overflow-y-auto"
        >
          {/* Header */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 font-bold text-sm text-emerald-400">
                <Activity className="size-4 animate-pulse" />
                <span>PRODUCTION SYSTEMS MONITOR</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-all"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Health Score Overview */}
            <div className="p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/60">GLOBAL SYSTEM STATUS</span>
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="size-4 text-emerald-400" />
                  <span>99.99% UPTIME</span>
                </span>
              </div>
              <div className="text-2xl font-bold text-white flex items-baseline gap-2">
                <span>ALL CLUSTER NODES HEALTHY</span>
              </div>
              <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 w-full animate-pulse" />
              </div>
            </div>

            {/* Live Nodes List */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                  ACTIVE CLUSTER NODES
                </span>
                <button
                  onClick={handleRefresh}
                  className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  <RefreshCw className={`size-3 ${refreshing ? "animate-spin" : ""}`} />
                  <span>Ping Test</span>
                </button>
              </div>

              <div className="space-y-2">
                {liveNodes.map((node) => (
                  <div
                    key={node.name}
                    className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-between"
                  >
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-white">{node.name}</div>
                      <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                        <span className="size-1.5 rounded-full bg-emerald-400" />
                        <span>{node.status}</span>
                      </div>
                    </div>

                    <div className="text-right font-mono text-xs">
                      <div className="text-cyan-400 font-bold">{node.ping}</div>
                      <div className="text-[10px] text-white/40">LOAD: {node.load}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-8 border-t border-white/10 space-y-3">
            <a
              href="#contact"
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-white text-black font-bold text-xs hover:bg-cyan-300 transition-all text-center block"
            >
              Request Custom Enterprise Deployment
            </a>
            <div className="text-center text-[10px] text-white/30">
              FABX TELEMETRY PROTOCOL v4.2 • REAL-TIME EDGE
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
