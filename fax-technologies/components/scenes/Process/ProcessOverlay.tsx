"use client";

import { animate } from "animejs";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const stages = [
  { step: "01", title: "DISCOVER", desc: "Commercial alignment, problem definition, and initial technical discovery." },
  { step: "02", title: "RESEARCH", desc: "Deep architectural audit, competitor benchmark, and vector RAG feasibility analysis." },
  { step: "03", title: "DESIGN", desc: "Business Requirements Document (BRD) and SVG system topology blueprints." },
  { step: "04", title: "DEVELOP", desc: "Type-safe Next.js 15 sprint build with micro-commit history and snapshot tests." },
  { step: "05", title: "TEST", desc: "Lighthouse 95+ budget audit, unit test suites, and load testing under high concurrency." },
  { step: "06", title: "DEPLOY", desc: "AWS / K8s cloud mesh deployment with SSL, DNS, and automated CI/CD pipelines." },
  { step: "07", title: "SCALE", desc: "Ongoing telemetry monitoring, model fine-tuning, and sub-10ms API optimization." },
];

export function ProcessOverlay() {
  const [activeStep, setActiveStep] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const progressLineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (reducedMotion || !progressLineRef.current) return;

    const path = progressLineRef.current;
    const length = path.getTotalLength();

    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    // Anime.js Continuous Timeline Line Animation
    animate(path, {
      strokeDashoffset: [length, length * (1 - (activeStep + 1) / stages.length)],
      duration: 600,
      ease: "outQuad",
    });
  }, [activeStep, reducedMotion]);

  return (
    <section
      id="process"
      className="relative flex min-h-screen items-center px-6 py-40 md:px-12 md:py-52 bg-[#050505] text-white"
    >
      <div className="container-editorial relative z-10 w-full space-y-16">
        <div className="max-w-3xl space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-cyan-400">
            CHAPTER 07 — DELIVERY METHODOLOGY
          </p>
          <h2 className="font-display text-4xl sm:text-7xl font-bold tracking-tight">
            Continuous Progress Timeline.
          </h2>
          <p className="text-white/50 text-base sm:text-lg">
            7 structured phases from business requirements documentation (BRD) to production cloud deployment.
          </p>
        </div>

        {/* Continuous Progress Indicator Line */}
        <div className="relative pt-4 pb-6">
          <svg className="w-full h-2 overflow-visible hidden md:block">
            <path
              ref={progressLineRef}
              d="M 0,1 H 1200"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="3"
            />
          </svg>

          {/* 7 Interactive Stage Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 pt-6">
            {stages.map((stage, idx) => (
              <button
                key={stage.step}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl border font-mono text-xs text-left transition-all ${
                  activeStep === idx
                    ? "border-cyan-400 bg-cyan-950/40 text-white shadow-[0_0_30px_rgba(34,211,238,0.3)] scale-105"
                    : "border-white/10 bg-white/5 text-white/50 hover:border-white/30"
                }`}
              >
                <div className="text-[10px] text-cyan-400 font-bold mb-1">{stage.step}</div>
                <div className="font-bold text-white mb-1">{stage.title}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Active Stage Detailed Card (Motion UI State) */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-8 rounded-3xl border border-white/15 bg-white/[0.03] backdrop-blur-2xl max-w-2xl space-y-4"
        >
          <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
            <span>PHASE {stages[activeStep].step} OF 07</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="size-4" /> VERIFIED
            </span>
          </div>

          <h3 className="font-display text-3xl font-bold">{stages[activeStep].title}</h3>
          <p className="text-white/70 text-base leading-relaxed">{stages[activeStep].desc}</p>
        </motion.div>
      </div>
    </section>
  );
}
