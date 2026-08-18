"use client";

import { animate } from "animejs";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const verifiedMetrics = [
  { id: "audit", label: "UX & System Audits", value: 18, suffix: "-point audit executed", desc: "Friction points identified and resolved during 3-week sprint." },
  { id: "roles", label: "Hospital Roles", value: 8, suffix: " roles supported", desc: "Nurse, admin, and clinical intake role workflows automated in MedFlow AI." },
  { id: "revenue", label: "Client Revenue Enabled", value: 6, suffix: ".25L client revenue", desc: "Commercial water supply platform revenue generated for KGN Water." },
  { id: "uptime", label: "System Uptime", value: 99, suffix: ".99% uptime", desc: "Production API availability maintained across cloud edge deployments." },
];

export function ImpactOverlay() {
  const reducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;

    // Anime.js Counter Roll Animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            verifiedMetrics.forEach((m, idx) => {
              const el = countersRef.current[idx];
              if (!el) return;

              const obj = { val: 0 };
              animate(obj, {
                val: m.value,
                duration: 2000,
                ease: "outExpo",
                onUpdate: () => {
                  el.innerText = `${Math.round(obj.val)}`;
                },
              });
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [reducedMotion]);

  return (
    <section
      ref={containerRef}
      id="impact"
      className="relative flex min-h-screen items-center px-6 py-40 md:px-12 md:py-52 bg-[#050505] text-white"
    >
      <div className="container-editorial relative z-10 w-full space-y-16">
        <div className="max-w-3xl space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-cyan-400">
            CHAPTER 06 — VERIFIED IMPACT
          </p>
          <h2 className="font-display text-4xl sm:text-7xl font-bold tracking-tight">
            Delivered Commercial Outcomes.
          </h2>
          <p className="text-white/50 text-base sm:text-lg">
            No invented stats. Every metric represents real delivered software performance and client milestones.
          </p>
        </div>

        {/* 4 Verified Metric Telemetry Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {verifiedMetrics.map((metric, idx) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-8 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl space-y-4 hover:border-cyan-400/50 transition-colors"
            >
              <div className="flex items-center justify-between font-mono text-xs text-cyan-400">
                <span>{metric.label}</span>
                <CheckCircle2 className="size-4 text-emerald-400" />
              </div>

              <div className="font-display text-4xl sm:text-5xl font-bold text-white flex items-baseline gap-1">
                <div
                  ref={(el) => {
                    countersRef.current[idx] = el;
                  }}
                >
                  {metric.value}
                </div>
                <span className="text-lg text-white/60 font-mono font-normal">{metric.suffix}</span>
              </div>

              <p className="text-xs text-white/50 leading-relaxed pt-2 border-t border-white/10">
                {metric.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
