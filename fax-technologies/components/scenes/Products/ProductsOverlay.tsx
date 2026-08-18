"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AppWindow, ExternalLink, X, Play, Activity, Cpu, Layers } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { MengToCard } from "@/components/ui/mengto-card";
import { revealUp, fadeIn, staggerContainer } from "@/lib/animation/motion";

const osApps = [
  {
    id: "hrflow",
    appId: "APP-01",
    title: "HRFlow AI",
    category: "AI Product OS",
    image: "/images/projects/hrflow-ai.png",
    demoUrl: "/work/hrflow-ai",
    status: "SYSTEM READY",
    desc: "Intelligent human resources OS platform powered by AI — automating candidate screening, workflow scheduling, and resume matching.",
    metrics: { cpu: "14%", memory: "1.2 GB", latency: "28ms" },
    deliverables: ["AI Screening", "Workflow Engine", "Resume Vector Matching"],
  },
  {
    id: "medflow",
    appId: "APP-02",
    title: "MedFlow AI",
    category: "Healthcare OS",
    image: "/images/projects/medflow-ai.png",
    demoUrl: "/work/medflow-ai",
    status: "SYSTEM READY",
    desc: "AI-driven healthcare telemetry system streamlining patient vital workflows, appointment scheduling, and clinical decision support.",
    metrics: { cpu: "22%", memory: "2.4 GB", latency: "18ms" },
    deliverables: ["Patient Telemetry", "Clinical AI", "HIPAA Architecture"],
  },
  {
    id: "kirana",
    appId: "APP-03",
    title: "Kirana AI",
    category: "Retail Intelligence OS",
    image: "/images/projects/kirana-ai.png",
    demoUrl: "/work/godowniq",
    status: "SYSTEM READY",
    desc: "Intelligent inventory and demand forecasting platform built for retail businesses — bringing predictive AI to commerce.",
    metrics: { cpu: "18%", memory: "1.8 GB", latency: "34ms" },
    deliverables: ["Demand Prediction", "Sales Analytics", "Automated Restock"],
  },
  {
    id: "kgn",
    appId: "APP-04",
    title: "KGN Service",
    category: "Enterprise OS",
    image: "/images/projects/kgn-service.png",
    demoUrl: "/work/kgn-enterprise",
    status: "SYSTEM READY",
    desc: "Enterprise service management OS engineered for operational efficiency, CRM automation, and service delivery tracking.",
    metrics: { cpu: "12%", memory: "3.1 GB", latency: "22ms" },
    deliverables: ["CRM Automation", "Service Dispatch", "Realtime Analytics"],
  },
];

export function ProductsOverlay() {
  const [activeApp, setActiveApp] = useState<(typeof osApps)[0] | null>(null);

  return (
    <section
      id="products"
      className="relative flex min-h-screen items-center px-6 py-40 md:px-12 md:py-52"
    >
      <div className="container-editorial relative z-10 w-full space-y-16">
        {/* Header */}
        <motion.div
          className="max-w-3xl"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.p variants={fadeIn} className="text-overline mb-4 text-[hsl(192,82%,46%)] font-mono">
            CHAPTER 04 — FABX SOFTWARE APPLICATIONS
          </motion.p>
          <motion.h2 variants={revealUp} className="text-editorial text-white">
            Software Products Engine.
          </motion.h2>
          <motion.p variants={revealUp} className="mt-4 text-body-lg text-white/50 font-sans">
            Launch live software applications built by FABX Innovations inside the system environment.
          </motion.p>
        </motion.div>

        {/* Application Icons Launcher Grid with Meng To Glass Tilt Physics */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {osApps.map((app) => (
            <MengToCard
              key={app.id}
              onClick={() => setActiveApp(app)}
              tint="rgba(11, 12, 16, 0.9)"
              maxTilt={10}
              depthZ={30}
              className="cursor-pointer"
            >
              {/* Top OS App Bar */}
              <div className="flex items-center justify-between font-mono text-[10px] text-white/40 mb-4">
                <span>{app.appId}</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {app.status}
                </span>
              </div>

              {/* App Thumbnail Window */}
              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-white/5 border border-white/10">
                <img
                  src={app.image}
                  alt={app.title}
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-black/40 backdrop-blur-sm">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-mono text-xs font-bold text-black">
                    <Play className="size-3 fill-black" />
                    BOOT APPLICATION
                  </span>
                </div>
              </div>

              {/* App Info */}
              <div className="mt-5 space-y-2">
                <div className="font-mono text-[10px] uppercase text-[hsl(192,82%,46%)]">
                  {app.category}
                </div>
                <h3 className="font-display text-xl font-bold text-white group-hover:text-[hsl(192,82%,46%)] transition-colors">
                  {app.title}
                </h3>
                <p className="font-sans text-xs text-white/40 line-clamp-2 leading-relaxed">
                  {app.desc}
                </p>
              </div>

              {/* App Metrics Footer */}
              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-white/30">
                <span>LATENCY: {app.metrics.latency}</span>
                <span>MEM: {app.metrics.memory}</span>
              </div>
            </MengToCard>
          ))}
        </div>
      </div>

      {/* FABX OS Window Boot Modal */}
      <AnimatePresence>
        {activeApp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6 backdrop-blur-2xl"
            onClick={() => setActiveApp(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/15 bg-[#0a0b0e] p-6 md:p-8 font-mono shadow-2xl"
            >
              {/* Window Title Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="size-3 rounded-full bg-rose-500/80 cursor-pointer" onClick={() => setActiveApp(null)} />
                  <span className="size-3 rounded-full bg-amber-500/80" />
                  <span className="size-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-3 font-bold text-white text-sm">{activeApp.title} — FABX OS Runtime</span>
                </div>
                <button
                  onClick={() => setActiveApp(null)}
                  className="text-white/40 hover:text-white transition-colors"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* Window Image Preview */}
              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 mb-6">
                <img
                  src={activeApp.image}
                  alt={activeApp.title}
                  className="h-full w-full object-cover object-top"
                />
              </div>

              {/* App Description & Deliverables */}
              <div className="space-y-4">
                <div className="text-xs text-[hsl(192,82%,46%)]">{activeApp.category} • STATUS: ONLINE</div>
                <h3 className="font-display text-2xl font-bold text-white">{activeApp.title}</h3>
                <p className="font-sans text-sm text-white/60 leading-relaxed">{activeApp.desc}</p>

                <div className="pt-2 flex flex-wrap gap-2">
                  {activeApp.deliverables.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] text-white/50">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Window Action Bar */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <Link
                  href={activeApp.demoUrl}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-sans text-xs font-bold text-black hover:bg-white/90 transition-all"
                >
                  <span>Launch Live Case Study</span>
                  <ExternalLink className="size-3.5" />
                </Link>
                <span className="text-xs text-emerald-400">EXECUTION TIME: {activeApp.metrics.latency}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
