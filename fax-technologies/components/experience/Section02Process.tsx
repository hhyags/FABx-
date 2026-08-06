"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AnimeTextReveal } from "@/components/ui/AnimeTextReveal";
import { GitCommit, Workflow, Code, X, CheckCircle2 } from "lucide-react";

const processSteps = [
  {
    step: "01",
    title: "Blueprint & Architecture",
    description: "Translating business goals into strict software schemas, domain models, and API blueprints.",
    code: `interface SystemSpec {\n  scale: "enterprise";\n  latency: "<50ms";\n}`,
    details: "During the blueprint stage, our engineering team maps out domain-driven schemas, establishes strict type interfaces, and sets up high-performance GraphQL and REST API endpoints.",
  },
  {
    step: "02",
    title: "Component Assembly",
    description: "Building modular, reusable micro-services and micro-frontends with high performance constraints.",
    code: `const Agent = createScope({\n  model: "gpt-4o",\n  tools: [searchTool]\n});`,
    details: "Component assembly constructs isolated, containerized micro-frontends and autonomous AI agents capable of operating concurrently without blocking main event loops.",
  },
  {
    step: "03",
    title: "API & Data Mesh",
    description: "Wiring real-time GraphQL/gRPC data pipelines with sub-millisecond edge synchronization.",
    code: `export async function GET() {\n  return pipeline.execute();\n}`,
    details: "The data mesh synchronizes distributed vector databases (Qdrant, pgvector) with primary transaction databases, guaranteeing zero-loss data replication under high loads.",
  },
];

export function Section02Process() {
  const [selectedStep, setSelectedStep] = useState<(typeof processSteps)[0] | null>(null);

  return (
    <section id="process" className="fabx-story-section bg-[#060709] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.02] font-mono text-xs text-cyan-400">
            <Workflow className="size-3.5" />
            <span>CHAPTER 02 — ENGINEERING PROCESS</span>
          </div>
          <AnimeTextReveal
            text="From Wireframes to Living Systems."
            className="font-display text-[clamp(2.2rem,4.5vw,4.2rem)] font-bold tracking-tight text-white"
            as="h2"
          />
          <p className="text-white/50 text-base sm:text-lg font-sans leading-relaxed">
            We follow a disciplined engineering workflow where blueprint lines transform into responsive interfaces and resilient backend infrastructure. Click any card to inspect code specifications.
          </p>
        </div>

        {/* Process Assembly Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {processSteps.map((step, idx) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.8 }}
              onClick={() => setSelectedStep(step)}
              className="fabx-glass-module p-6 sm:p-8 space-y-6 flex flex-col justify-between cursor-pointer group hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(14,165,233,0.15)] transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-bold text-cyan-400">{step.step}</span>
                  <GitCommit className="size-5 text-white/40 group-hover:text-cyan-400 transition-colors" />
                </div>
                <h3 className="font-display text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed font-sans">{step.description}</p>
              </div>

              {/* Code Snippet Box */}
              <div className="p-3 rounded-xl bg-black/60 border border-white/10 font-mono text-[11px] text-cyan-300/90 overflow-x-auto whitespace-pre group-hover:border-cyan-400/30 transition-colors">
                {step.code}
              </div>

              <div className="pt-2 text-right font-mono text-[10px] text-cyan-400 font-bold group-hover:underline">
                INSPECT DETAILS →
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Code Inspector Modal */}
      <AnimatePresence>
        {selectedStep && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6 backdrop-blur-2xl"
            onClick={() => setSelectedStep(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-cyan-500/30 bg-[#07090e] p-6 sm:p-8 font-mono text-white shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                  <Code className="size-4" />
                  <span>PROCESS STEP {selectedStep.step} — {selectedStep.title}</span>
                </div>
                <button
                  onClick={() => setSelectedStep(null)}
                  className="p-1.5 rounded-lg text-white/60 hover:bg-white/10 hover:text-white"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="space-y-4 font-sans text-sm text-white/70 leading-relaxed">
                <p>{selectedStep.details}</p>

                <div className="space-y-2 pt-2">
                  <div className="font-mono text-xs text-white/40">EXECUTABLE CODE CONTRACT:</div>
                  <div className="p-4 rounded-xl bg-black border border-cyan-500/30 font-mono text-xs text-cyan-300 whitespace-pre">
                    {selectedStep.code}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setSelectedStep(null)}
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-xs hover:bg-cyan-400"
                >
                  Close Code Inspector
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
