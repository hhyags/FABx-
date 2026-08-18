"use client";

import { animate, stagger } from "animejs";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, LayoutGrid, Database, Cloud, RefreshCw, Cpu, Smartphone } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const capabilities = [
  {
    id: "ai-agents",
    title: "AI Agents",
    icon: Bot,
    category: "Agentic Engineering",
    desc: "Autonomous multi-agent systems with vector RAG memory, tool-calling capabilities, and human-in-the-loop safeguards.",
    deliverables: ["Role-Aware Routing", "Hallucination Protection", "Sub-10ms Latency"],
    diagramNodes: ["Orchestrator", "RAG Vector Store", "Tool Sandbox", "Telemetry"],
  },
  {
    id: "saas",
    title: "SaaS Platforms",
    icon: LayoutGrid,
    category: "Cloud Software",
    desc: "Multi-tenant enterprise SaaS applications with billing integration, role-based access, and real-time synchronization.",
    deliverables: ["Multi-Tenant Architecture", "Stripe Billing", "Realtime WebSockets"],
    diagramNodes: ["Client App", "API Mesh", "DB Cluster", "Cache Layer"],
  },
  {
    id: "crm",
    title: "CRM Automation",
    icon: Database,
    category: "Sales Intelligence",
    desc: "Custom AI-powered customer relationship management platforms automating lead scoring, outreach, and pipeline sync.",
    deliverables: ["Lead Scoring Model", "Voice Call AI", "Pipeline Telemetry"],
    diagramNodes: ["Inbound Lead", "NLP Classifier", "CRM Database", "Slack Notifier"],
  },
  {
    id: "erp",
    title: "ERP & Supply Chain",
    icon: Cpu,
    category: "Operations",
    desc: "Warehouse inventory management, SKU tracking, and real-time ledger reconciliation built for scale.",
    deliverables: ["Barcode Scanner UI", "Demand Forecasting", "Automated Restock"],
    diagramNodes: ["Warehouse Scanner", "Stock Ledger", "Alert Trigger", "Admin UI"],
  },
  {
    id: "automation",
    title: "Process Automation",
    icon: RefreshCw,
    category: "Workflow Engine",
    desc: "End-to-end business process automation eliminating manual data entry and cross-platform bottlenecks.",
    deliverables: ["Event Queue", "Error Retries", "Audit Logging"],
    diagramNodes: ["Webhook Trigger", "Queue Worker", "Transformer", "DB Persist"],
  },
  {
    id: "web-apps",
    title: "Web Applications",
    icon: LayoutGrid,
    category: "Frontend & Full-Stack",
    desc: "High-density Next.js 15 web applications with server components, responsive layouts, and WebGL physics.",
    deliverables: ["React 19 Server Components", "TailwindCSS & Shadcn UI", "Lighthouse 95+ Budget"],
    diagramNodes: ["Browser Engine", "RSC Server", "API Handler", "CDN Edge"],
  },
  {
    id: "mobile-apps",
    title: "Mobile Applications",
    icon: Smartphone,
    category: "iOS & Android",
    desc: "Cross-platform mobile applications with offline storage, push notifications, and native performance.",
    deliverables: ["React Native / Expo", "Offline Sync", "Push Telemetry"],
    diagramNodes: ["Mobile Client", "Local SQLite", "Sync Engine", "Cloud Gateway"],
  },
  {
    id: "cloud-ai",
    title: "Cloud & AI Integration",
    icon: Cloud,
    category: "Infrastructure",
    desc: "Serverless Kubernetes clusters, AWS/GCP deployments, and model fine-tuning infrastructure.",
    deliverables: ["K8s Mesh", "GPU Worker Nodes", "AES-256 Encryption"],
    diagramNodes: ["API Gateway", "K8s Ingress", "GPU Pods", "S3 Storage"],
  },
];

export function AgentsOverlay() {
  const [activeTab, setActiveTab] = useState(capabilities[0]);
  const reducedMotion = usePrefersReducedMotion();
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || !diagramRef.current) return;

    const els = diagramRef.current.querySelectorAll(".anime-node");
    if (els.length === 0) return;

    const animation = animate(els, {
      scale: [0.95, 1.05, 0.95],
      opacity: [0.7, 1, 0.7],
      ease: "inOutSine",
      duration: 2000,
      loop: true,
      delay: stagger(200),
    });

    return () => {
      animation.pause();
    };
  }, [activeTab, reducedMotion]);

  return (
    <section
      id="capabilities"
      className="relative flex min-h-screen items-center px-6 py-40 md:px-12 md:py-52 text-white"
    >
      <div className="container-editorial relative z-10 w-full space-y-16">
        <div className="max-w-3xl space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-cyan-400">
            CHAPTER 04 — SYSTEM CAPABILITIES
          </p>
          <h2 className="font-display text-4xl sm:text-7xl font-bold tracking-tight">
            Interactive Capability System.
          </h2>
          <p className="text-white/60 text-base sm:text-lg">
            Modules engineered inside the FABX architecture. Click or select a capability to inspect its live technical topology.
          </p>
        </div>

        {/* Capability Selection Tabs */}
        <div className="flex flex-wrap gap-2 pt-2 border-b border-white/10 pb-6">
          {capabilities.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item)}
              className={`px-5 py-2.5 rounded-full font-mono text-xs tracking-wider transition-all ${
                activeTab.id === item.id
                  ? "bg-white text-black font-bold shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                  : "border border-white/10 bg-black/40 backdrop-blur-md text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* Active Capability Visualization Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Details Box (Motion UI State) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-6 p-8 sm:p-10 rounded-3xl border border-white/15 bg-black/50 backdrop-blur-2xl space-y-6"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">
                  {activeTab.category}
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-400">
                  <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
                  MODULE READY
                </span>
              </div>

              <h3 className="font-display text-3xl sm:text-4xl font-bold text-white flex items-center gap-3">
                <activeTab.icon className="size-8 text-cyan-400" />
                {activeTab.title}
              </h3>

              <p className="text-white/80 text-sm sm:text-base leading-relaxed font-sans">
                {activeTab.desc}
              </p>

              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="font-mono text-xs text-cyan-400 uppercase font-bold">Key Deliverables</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs">
                  {activeTab.deliverables.map((item) => (
                    <div key={item} className="p-3 rounded-xl border border-white/10 bg-white/5 text-white/80 text-center">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right SVG Technical Diagram (Anime.js Animation) */}
          <div ref={diagramRef} className="lg:col-span-6 p-8 rounded-3xl border border-cyan-400/20 bg-black/80 backdrop-blur-xl">
            <div className="font-mono text-xs text-cyan-400 uppercase tracking-widest mb-6 text-center">
              SYSTEM TOPOLOGY DIAGRAM
            </div>

            <div className="grid grid-cols-2 gap-4">
              {activeTab.diagramNodes.map((nodeName, idx) => (
                <div
                  key={nodeName}
                  className="anime-node p-5 rounded-2xl border border-cyan-400/40 bg-cyan-950/20 text-center space-y-1"
                >
                  <div className="font-mono text-[10px] text-cyan-400/60">NODE 0{idx + 1}</div>
                  <div className="font-mono text-xs font-bold text-white">{nodeName}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
