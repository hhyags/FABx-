"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AnimeTextReveal } from "@/components/ui/AnimeTextReveal";
import { Compass, CheckCircle2, ArrowRight, X, Activity } from "lucide-react";

const caseStudyStages = [
  { stage: "01", title: "Challenge", detail: "High-latency legacy infrastructure causing 4.2s response delays during peak loads.", fullSpec: "Legacy monolith architectures struggled under 50k+ daily concurrent users. We conducted full profiling logs to pinpoint database locking and unindexed joins." },
  { stage: "02", title: "Research", detail: "Domain modeling and vector embedding benchmarks to evaluate custom LLM vs fine-tuned models.", fullSpec: "Benchmarked OpenAI GPT-4o against fine-tuned Llama-3 70B models. Evaluated memory footprints, vector quantization levels, and response latency targets." },
  { stage: "03", title: "Architecture", detail: "Event-driven micro-services architecture with Qdrant vector DB and Postgres fallback.", fullSpec: "Designed a stateless microservices topology using gRPC protocol for inter-service RPC calls and Kafka topic queues for async telemetry." },
  { stage: "04", title: "Development", detail: "TypeScript + Rust core runtime modules engineered for sub-20ms execution.", fullSpec: "Built high-criticality parsing modules in Rust compiled to WebAssembly/Native for sub-20ms execution times across edge server nodes." },
  { stage: "05", title: "Deployment", detail: "Zero-downtime multi-region Kubernetes cluster deployment with automated canary testing.", fullSpec: "Automated GitOps CI/CD pipelines deploying canary pods to US-East, EU-Central, and AP-South regions with automated rollback." },
  { stage: "06", title: "Outcome", detail: "94% latency reduction down to 38ms, with 10x user throughput capacity.", fullSpec: "Achieved sub-50ms global latency, 99.99% system availability during traffic spikes, and an 80% reduction in cloud server operational expenses." },
];

export function Section05CaseStudy() {
  const [activeStage, setActiveStage] = useState<(typeof caseStudyStages)[0] | null>(null);

  return (
    <section id="case-study" className="fabx-story-section bg-[#050505] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.02] font-mono text-xs text-cyan-400">
            <Compass className="size-3.5" />
            <span>CHAPTER 05 — CASE STUDY PIPELINE</span>
          </div>
          <AnimeTextReveal
            text="End-to-End System Evolution."
            className="font-display text-[clamp(2.2rem,4.5vw,4.2rem)] font-bold tracking-tight text-white"
            as="h2"
          />
          <p className="text-white/50 text-base sm:text-lg font-sans leading-relaxed">
            Every product journey follows a strict engineering lifecycle from initial challenge identification to post-launch scaling metrics. Click any stage to inspect complete telemetry details.
          </p>
        </div>

        {/* Horizontal Timeline Track */}
        <div className="fabx-timeline-track flex gap-6 pb-6 overflow-x-auto">
          {caseStudyStages.map((stg, idx) => (
            <motion.div
              key={stg.stage}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              onClick={() => setActiveStage(stg)}
              className="min-w-[280px] sm:min-w-[320px] fabx-glass-module p-6 flex flex-col justify-between space-y-6 cursor-pointer group hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(14,165,233,0.15)] transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs">
                  <span className="text-cyan-400 font-bold">STAGE {stg.stage}</span>
                  {idx === caseStudyStages.length - 1 ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="size-3.5" />
                      <span>COMPLETED</span>
                    </span>
                  ) : (
                    <ArrowRight className="size-3.5 text-white/30 group-hover:text-cyan-400 transition-colors" />
                  )}
                </div>

                <h3 className="font-display text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {stg.title}
                </h3>
                <p className="text-sm text-white/50 font-sans leading-relaxed">{stg.detail}</p>
              </div>

              <div className="space-y-2">
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400" style={{ width: `${((idx + 1) / caseStudyStages.length) * 100}%` }} />
                </div>
                <div className="text-right font-mono text-[10px] text-cyan-400 font-bold group-hover:underline">
                  INSPECT STAGE DETAILS →
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stage Detail Inspector Modal */}
      <AnimatePresence>
        {activeStage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6 backdrop-blur-2xl"
            onClick={() => setActiveStage(null)}
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
                  <Activity className="size-4" />
                  <span>STAGE {activeStage.stage} — {activeStage.title}</span>
                </div>
                <button
                  onClick={() => setActiveStage(null)}
                  className="p-1.5 rounded-lg text-white/60 hover:bg-white/10 hover:text-white"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="space-y-4 font-sans text-sm text-white/70 leading-relaxed">
                <h3 className="font-display text-2xl font-bold text-white">{activeStage.title}</h3>
                <p className="text-base text-white/80">{activeStage.detail}</p>
                <div className="p-4 rounded-xl bg-black border border-white/10 font-mono text-xs text-cyan-300">
                  {activeStage.fullSpec}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setActiveStage(null)}
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-xs hover:bg-cyan-400 font-mono"
                >
                  Close Stage Inspector
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
