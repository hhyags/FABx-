"use client";

import { motion } from "framer-motion";
import { Bot, Cpu, CheckCircle2, RefreshCw, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { revealUp, fadeIn, staggerContainer } from "@/lib/animation/motion";

const aiAgentsList = [
  {
    id: "sales",
    title: "Autonomous Sales Agent",
    status: "WORKING",
    task: "Qualifying Enterprise Leads & CRM Sync",
    cpu: "32%",
    memory: "1.4 GB",
    latency: "34ms",
    confidence: "98.4%",
    logs: "Evaluating lead intent score -> CRM pipeline updated -> Response dispatched.",
  },
  {
    id: "inventory",
    title: "Inventory Prediction Agent",
    status: "WORKING",
    task: "Retail Demand Forecasting & Stock Reorder",
    cpu: "28%",
    memory: "2.1 GB",
    latency: "42ms",
    confidence: "96.8%",
    logs: "Analyzing 30-day velocity -> Stock reorder triggered -> Kirana AI notification.",
  },
  {
    id: "recruitment",
    title: "Recruitment AI Agent",
    status: "WORKING",
    task: "Resume Vector Parsing & Skill Match",
    cpu: "45%",
    memory: "3.2 GB",
    latency: "19ms",
    confidence: "99.1%",
    logs: "Vector embedding matched -> HRFlow candidate rank #01 assigned.",
  },
  {
    id: "support",
    title: "Customer Support Agent",
    status: "WORKING",
    task: "Multi-Turn SLA Resolution & Ticket Routing",
    cpu: "24%",
    memory: "1.1 GB",
    latency: "28ms",
    confidence: "97.5%",
    logs: "NLP sentiment verified -> Instant resolution posted -> Ticket closed.",
  },
];

export function AgentsOverlay() {
  const [agents, setAgents] = useState(aiAgentsList);

  useEffect(() => {
    const interval = setInterval(() => {
      setAgents((prev) =>
        prev.map((agent) => ({
          ...agent,
          cpu: `${Math.floor(20 + Math.random() * 30)}%`,
          latency: `${Math.floor(18 + Math.random() * 25)}ms`,
        }))
      );
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="agents"
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
            CHAPTER 05 — AUTONOMOUS AI AGENTS
          </motion.p>
          <motion.h2 variants={revealUp} className="text-editorial text-white">
            Living Agent Network.
          </motion.h2>
          <motion.p variants={revealUp} className="mt-4 text-body-lg text-white/50 font-sans">
            Specialized autonomous AI agents operating concurrently inside the FABX runtime, tracking telemetry and executing tasks.
          </motion.p>
        </motion.div>

        {/* 4 Agent Telemetry Windows Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {agents.map((agent, idx) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="rounded-2xl border border-white/10 bg-[#0c0d12]/90 p-6 backdrop-blur-2xl space-y-5 font-mono text-xs shadow-2xl hover:border-[hsl(192,82%,46%)]/60 transition-all"
            >
              {/* Agent Window Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Bot className="size-4 text-[hsl(192,82%,46%)]" />
                  <span>{agent.title}</span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                  <RefreshCw className="size-3 animate-spin" />
                  {agent.status}
                </span>
              </div>

              {/* Current Active Task */}
              <div className="space-y-1">
                <div className="text-[10px] text-white/40 uppercase">ACTIVE TASK</div>
                <div className="text-sm font-semibold text-white">{agent.task}</div>
              </div>

              {/* Agent Telemetry Grid */}
              <div className="grid grid-cols-4 gap-2 pt-2 border-t border-white/5 text-center">
                <div className="rounded-lg bg-white/[0.02] p-2 border border-white/5 space-y-0.5">
                  <div className="text-[9px] text-white/30">CPU</div>
                  <div className="text-xs font-bold text-white">{agent.cpu}</div>
                </div>
                <div className="rounded-lg bg-white/[0.02] p-2 border border-white/5 space-y-0.5">
                  <div className="text-[9px] text-white/30">MEM</div>
                  <div className="text-xs font-bold text-white">{agent.memory}</div>
                </div>
                <div className="rounded-lg bg-white/[0.02] p-2 border border-white/5 space-y-0.5">
                  <div className="text-[9px] text-white/30">LATENCY</div>
                  <div className="text-xs font-bold text-emerald-400">{agent.latency}</div>
                </div>
                <div className="rounded-lg bg-white/[0.02] p-2 border border-white/5 space-y-0.5">
                  <div className="text-[9px] text-white/30">CONFIDENCE</div>
                  <div className="text-xs font-bold text-[hsl(192,82%,46%)]">{agent.confidence}</div>
                </div>
              </div>

              {/* Execution Log */}
              <div className="rounded-lg bg-black/60 p-3 text-[11px] text-white/50 border border-white/5 leading-relaxed">
                <span className="text-emerald-400 font-bold">LOG &gt; </span>
                {agent.logs}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
