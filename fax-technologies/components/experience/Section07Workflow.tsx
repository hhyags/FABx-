"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AnimeTextReveal } from "@/components/ui/AnimeTextReveal";
import { GitPullRequest, ArrowDown, ChevronDown, CheckCircle2 } from "lucide-react";

const workflowSteps = [
  { step: "01", name: "Discover", desc: "Understanding domain architecture & identifying performance bottlenecks.", details: "In-depth discovery sprint mapping business intent, data flow schemas, user personas, and target SLAs." },
  { step: "02", name: "Research", desc: "Evaluating LLM/SLM models, benchmarks, and vector index configurations.", details: "Benchmark matrix testing model accuracy, quantization impact, vector retrieval precision, and cost per million tokens." },
  { step: "03", name: "Design", desc: "Crafting technical specifications, schema diagrams, and UX wireframes.", details: "Precision engineering specs containing OpenAPI 3.0 schemas, entity-relationship diagrams, and high-fidelity wireframes." },
  { step: "04", name: "Develop", desc: "Building modular micro-services with continuous automated testing.", details: "Agile engineering sprints with strict TypeScript type-checking, unit test coverage (>90%), and integration suites." },
  { step: "05", name: "Deploy", desc: "Staging deployment, canary releases, and zero-downtime production launch.", details: "Multi-region Kubernetes deployment with automated blue/green traffic swapping and rollback triggers." },
  { step: "06", name: "Scale", desc: "Post-launch observability, telemetry optimization, and capacity scaling.", details: "Continuous observability monitoring Prometheus metrics, Datadog traces, and server auto-scaling rules." },
];

export function Section07Workflow() {
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  const toggleStep = (step: string) => {
    setExpandedStep((prev) => (prev === step ? null : step));
  };

  return (
    <section id="workflow" className="fabx-story-section bg-[#050505] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-5xl mx-auto space-y-16 relative z-10">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.02] font-mono text-xs text-cyan-400">
            <GitPullRequest className="size-3.5" />
            <span>CHAPTER 07 — DELIVERY WORKFLOW</span>
          </div>
          <AnimeTextReveal
            text="6 Stages from Intent to Scale."
            className="font-display text-[clamp(2.2rem,4.5vw,4.2rem)] font-bold tracking-tight text-white"
            as="h2"
          />
          <p className="text-white/50 text-base sm:text-lg font-sans leading-relaxed">
            Click any workflow stage to expand technical execution details.
          </p>
        </div>

        {/* Vertical Assembly Timeline */}
        <div className="space-y-4 relative">
          {workflowSteps.map((wf, idx) => {
            const isExpanded = expandedStep === wf.step;
            return (
              <motion.div
                key={wf.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                onClick={() => toggleStep(wf.step)}
                className={`fabx-glass-module p-6 flex flex-col justify-between gap-4 cursor-pointer transition-all ${
                  isExpanded ? "border-cyan-400/60 bg-cyan-500/5 shadow-[0_0_30px_rgba(14,165,233,0.15)]" : "hover:border-white/20"
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-2xl font-bold text-cyan-400">{wf.step}</span>
                    <div>
                      <h3 className="font-display text-lg font-bold text-white">{wf.name}</h3>
                      <p className="text-sm text-white/50 font-sans">{wf.desc}</p>
                    </div>
                  </div>
                  <button
                    className="p-2 rounded-lg bg-white/5 text-white/60 hover:text-white transition-colors self-end sm:self-center"
                    aria-label="Toggle step details"
                  >
                    <ChevronDown className={`size-4 transition-transform duration-300 ${isExpanded ? "rotate-180 text-cyan-400" : ""}`} />
                  </button>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden pt-3 border-t border-white/10"
                    >
                      <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-sans text-xs text-white/80 leading-relaxed space-y-2">
                        <div className="font-mono text-cyan-400 text-[10px] uppercase font-bold">
                          EXECUTION SPECIFICATION:
                        </div>
                        <p>{wf.details}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
