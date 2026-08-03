"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Loader2, GitPullRequest, ShieldCheck, Rocket } from "lucide-react";
import { useEffect, useState } from "react";
import { revealUp, fadeIn, staggerContainer } from "@/lib/animation/motion";

const pipelineStages = [
  { id: "test", name: "1. Automated Testing", status: "PASS", desc: "142 unit & integration tests executed in parallel container.", icon: ShieldCheck },
  { id: "build", name: "2. Container Build", status: "PASS", desc: "Docker image compiled with zero vulnerabilities detected.", icon: GitPullRequest },
  { id: "optimize", name: "3. Model & Token Optimization", status: "PASS", desc: "Vector indexing & prompt cache optimization complete.", icon: Loader2 },
  { id: "deploy", name: "4. Multi-Region Deployment", status: "PASS", desc: "AWS Kubernetes mesh updated across US-East, EU-Central & AP-South.", icon: Rocket },
];

export function ProcessOverlay() {
  const [activeStep, setActiveStep] = useState(3);

  return (
    <section
      id="process"
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
            CHAPTER 06 — CONTINUOUS DEPLOYMENT PIPELINE
          </motion.p>
          <motion.h2 variants={revealUp} className="text-editorial text-white">
            Automated CI/CD Pipeline.
          </motion.h2>
          <motion.p variants={revealUp} className="mt-4 text-body-lg text-white/50 font-sans">
            Every build passes strict automated testing, container assembly, model optimization, and zero-downtime deployment.
          </motion.p>
        </motion.div>

        {/* Live CI/CD Pipeline UI */}
        <div className="rounded-2xl border border-white/10 bg-[#0c0d12]/90 p-6 md:p-8 backdrop-blur-2xl space-y-6 font-mono text-xs shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <Rocket className="size-4 text-[hsl(192,82%,46%)]" />
              <span className="font-bold text-white text-sm">FABX PRODUCTION DEPLOYMENT PIPELINE</span>
            </div>
            <span className="text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-3 py-1 rounded text-[11px] font-bold">
              ✓ PRODUCTION READY
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {pipelineStages.map((stage, idx) => {
              const Icon = stage.icon;
              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3"
                >
                  <div className="flex items-center justify-between text-white/60">
                    <Icon className="size-4 text-[hsl(192,82%,46%)]" />
                    <CheckCircle2 className="size-4 text-emerald-400" />
                  </div>
                  <div className="font-bold text-white">{stage.name}</div>
                  <div className="text-[11px] text-white/40 leading-relaxed">{stage.desc}</div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 w-full" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
