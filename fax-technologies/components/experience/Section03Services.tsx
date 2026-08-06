"use client";

import { motion, AnimatePresence } from "motion/react";
import { AnimeTextReveal } from "@/components/ui/AnimeTextReveal";
import { AnimeCardHover } from "@/components/ui/AnimeCardHover";
import {
  Bot,
  Cloud,
  Database,
  Smartphone,
  Globe,
  Cpu,
  Boxes,
  Zap,
  Network,
  X,
  Send,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";

const servicesList = [
  { id: "ai-agents", title: "AI Agents", icon: Bot, desc: "Autonomous, multi-agent frameworks executing complex workflows.", metric: "99.4% Accuracy", spec: "LangGraph, CrewAI, AutoGen multi-agent orchestrator with vector memory fallback." },
  { id: "saas", title: "SaaS Development", icon: Boxes, desc: "High-concurrency multi-tenant cloud platforms designed for scale.", metric: "100k+ Concurrency", spec: "Next.js App Router, Stripe Billing, Tenant Isolation, Redis Caching." },
  { id: "crm", title: "Custom CRM", icon: Network, desc: "Intelligent customer relationship management with integrated AI insights.", metric: "Sub-50ms Query", spec: "PostgreSQL, Realtime GraphQL, Predictive Lead Scoring, Telemetry Dashboard." },
  { id: "erp", title: "Enterprise ERP", icon: Database, desc: "Unified enterprise resource planning across supply, HR, and finance.", metric: "Realtime Sync", spec: "Event-Driven Microservices, Apache Kafka, SAP / Oracle API Adapters." },
  { id: "mobile", title: "Mobile Apps", icon: Smartphone, desc: "Cross-platform iOS & Android apps with native performance feel.", metric: "60 FPS Native", spec: "React Native / Expo, Metal/Vulkan Shaders, Offline-First SQLite Sync." },
  { id: "web", title: "Web Apps", icon: Globe, desc: "Interactive web applications powered by modern frontend frameworks.", metric: "100 Lighthouse", spec: "Next.js 15, Tailwind CSS, WebGL 3D Canvas, PWA Edge Caching." },
  { id: "automation", title: "Automation", icon: Zap, desc: "End-to-end workflow automation reducing manual overhead by 80%.", metric: "10x Throughput", spec: "Temporal.io Workflow Engine, Playwright Web Scraping, Webhook Hooks." },
  { id: "cloud", title: "Cloud Architecture", icon: Cloud, desc: "Serverless, kubernetes, and edge computing multi-cloud setups.", metric: "99.99% Uptime", spec: "AWS, GCP, Cloudflare Workers, Terraform IaC, Prometheus Monitoring." },
  { id: "ai-integration", title: "AI Integration", icon: Cpu, desc: "Seamlessly embedding LLMs and vector models into legacy systems.", metric: "Zero Downtime", spec: "OpenAI, Anthropic Claude, Qdrant Vector DB, Private Fine-Tuned Llama." },
];

export function Section03Services() {
  const [activeHover, setActiveHover] = useState<string | null>(null);
  const [selectedModule, setSelectedModule] = useState<(typeof servicesList)[0] | null>(null);

  const handleDeployToTerminal = () => {
    setSelectedModule(null);
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="fabx-story-section bg-[#050505] border-t border-white/5 relative overflow-hidden">
      {/* Background Lighting Shift on Hover */}
      <div
        className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
        style={{
          background: activeHover
            ? "radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.18) 0%, transparent 65%)"
            : "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.02) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.02] font-mono text-xs text-cyan-400">
            <span>CHAPTER 03 — CAPABILITIES & MODULES</span>
          </div>
          <AnimeTextReveal
            text="Autonomous Modules Engineered to Scale."
            className="font-display text-[clamp(2.2rem,4.5vw,4.2rem)] font-bold tracking-tight text-white"
            as="h2"
          />
          <p className="text-white/50 text-base sm:text-lg font-sans leading-relaxed">
            Instead of standard software agency packages, we craft high-performance modular systems. Click any module to inspect tech specifications or configure deployment.
          </p>
        </div>

        {/* Floating Interactive 3x3 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((service, idx) => {
            const Icon = service.icon;
            const isHovered = activeHover === service.id;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.6 }}
                onMouseEnter={() => setActiveHover(service.id)}
                onMouseLeave={() => setActiveHover(null)}
                onClick={() => setSelectedModule(service)}
              >
                <AnimeCardHover className="fabx-glass-module p-6 h-full flex flex-col justify-between space-y-6 cursor-pointer group">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-xl border transition-colors ${isHovered ? "bg-cyan-500/20 border-cyan-400/50 text-cyan-300" : "bg-white/5 border-white/10 text-white"}`}>
                        <Icon className="size-6" />
                      </div>
                      <span className="font-mono text-[10px] text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                        {service.metric}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-white/50 font-sans leading-relaxed">
                      {service.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-white/40">
                    <span>STATUS: READY</span>
                    <span className="text-cyan-400 group-hover:underline">DEPLOY MODULE →</span>
                  </div>
                </AnimeCardHover>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Module Deployment Modal */}
      <AnimatePresence>
        {selectedModule && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6 backdrop-blur-2xl"
            onClick={() => setSelectedModule(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-cyan-500/30 bg-[#07090e] p-6 sm:p-8 font-mono text-white shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                  <span>MODULE DEPLOYMENT CONFIGURATOR</span>
                </div>
                <button
                  onClick={() => setSelectedModule(null)}
                  className="p-1.5 rounded-lg text-white/60 hover:bg-white/10 hover:text-white"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="space-y-4 font-sans text-sm text-white/70">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                    <selectedModule.icon className="size-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-white">{selectedModule.title}</h3>
                    <span className="font-mono text-xs text-emerald-400">{selectedModule.metric}</span>
                  </div>
                </div>

                <p className="text-base text-white/80 leading-relaxed">{selectedModule.desc}</p>

                <div className="p-4 rounded-xl bg-black border border-white/10 space-y-1 font-mono text-xs">
                  <div className="text-white/40">ENGINEERING STACK SPECIFICATION:</div>
                  <div className="text-cyan-300 font-semibold">{selectedModule.spec}</div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs">
                <button
                  onClick={() => setSelectedModule(null)}
                  className="px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 text-white/70 hover:text-white"
                >
                  Back to Modules
                </button>
                <button
                  onClick={handleDeployToTerminal}
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-all flex items-center gap-2"
                >
                  <span>Configure in Terminal</span>
                  <Send className="size-3.5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
