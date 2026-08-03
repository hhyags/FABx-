"use client";

import { motion } from "framer-motion";
import { Terminal, Code2, GitCommit, CheckCircle2, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { revealUp, fadeIn, staggerContainer } from "@/lib/animation/motion";

const IDE_CODE_LINES = [
  { num: 1, code: "import { FabxEngine, AgentOrchestrator } from '@fabx/ai-runtime';" },
  { num: 2, code: "import { QdrantVectorStore } from '@fabx/vector-db';" },
  { num: 3, code: "" },
  { num: 4, code: "export async function deployAgentSystem(config: AgentConfig) {" },
  { num: 5, code: "  const runtime = await FabxEngine.init({ mode: 'autonomous' });" },
  { num: 6, code: "  const pipeline = new AgentOrchestrator({ vectorDb: QdrantVectorStore });" },
  { num: 7, code: "  return await pipeline.compileAndDeploy(config);" },
  { num: 8, code: "}" },
];

const TERMINAL_LOGS = [
  "$ git commit -m 'feat: autonomous agent pipeline v4.2'",
  "$ npm run build:production",
  "Compiling TypeScript modules...",
  "Generating production bundle...",
  "✓ Build completed in 1.42s",
  "$ npm run deploy:cloud",
  "Connecting to AWS / K8s Cloud Mesh...",
  "Deploying Docker container [fabx-core:latest]...",
  "✓ Production Deployment Successful [200 OK]",
];

export function LiveDevOverlay() {
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogIndex((prev) => (prev + 1) % TERMINAL_LOGS.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="development"
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
            CHAPTER 03 — LIVE DEVELOPMENT ENVIRONMENT
          </motion.p>
          <motion.h2 variants={revealUp} className="text-editorial text-white">
            Software Built in Real Time.
          </motion.h2>
          <motion.p variants={revealUp} className="mt-4 text-body-lg text-white/50 font-sans">
            Clean codebases, type-safe architectures, automated tests, and instant deployment pipelines.
          </motion.p>
        </motion.div>

        {/* Floating Floating IDE & Warp Terminal Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Window: VS Code Floating IDE */}
          <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#0c0d12]/90 shadow-2xl backdrop-blur-2xl overflow-hidden font-mono text-xs">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-rose-500/80" />
                <span className="size-3 rounded-full bg-amber-500/80" />
                <span className="size-3 rounded-full bg-emerald-500/80" />
                <span className="ml-3 text-white/60 text-[11px]">agent-orchestrator.ts — FABX IDE</span>
              </div>
              <Code2 className="size-4 text-[hsl(192,82%,46%)]" />
            </div>

            <div className="p-6 space-y-2 font-mono text-xs overflow-x-auto">
              {IDE_CODE_LINES.map((line) => (
                <div key={line.num} className="flex gap-4">
                  <span className="w-6 select-none text-right text-white/20">{line.num}</span>
                  <span className="text-slate-300">
                    {line.code.includes("import") ? (
                      <span className="text-cyan-400">{line.code}</span>
                    ) : line.code.includes("export") || line.code.includes("return") ? (
                      <span className="text-emerald-400">{line.code}</span>
                    ) : (
                      line.code
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Window: Warp Terminal Build Logs */}
          <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#050608]/95 shadow-2xl backdrop-blur-2xl overflow-hidden font-mono text-xs space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 bg-white/[0.02]">
              <div className="flex items-center gap-2 text-white/80">
                <Terminal className="size-4 text-[hsl(192,82%,46%)]" />
                <span className="font-bold">WARP TERMINAL</span>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">CI/CD ACTIVE</span>
            </div>

            <div className="p-6 space-y-3 font-mono text-[11px] text-white/70">
              {TERMINAL_LOGS.slice(0, logIndex + 1).map((log, i) => (
                <div key={i} className="flex items-start gap-2">
                  {log.startsWith("✓") ? (
                    <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : log.startsWith("$") ? (
                    <Play className="size-3 text-[hsl(192,82%,46%)] shrink-0 mt-0.5" />
                  ) : (
                    <GitCommit className="size-3.5 text-white/30 shrink-0 mt-0.5" />
                  )}
                  <span className={log.startsWith("✓") ? "text-emerald-400 font-bold" : "text-white/80"}>
                    {log}
                  </span>
                </div>
              ))}
              <div className="pt-2 text-[10px] text-white/30 animate-pulse">_ executing cloud pipeline...</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
