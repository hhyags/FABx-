"use client";

import { animate } from "animejs";
import { motion } from "framer-motion";
import { Lightbulb, Cpu, Bot, Code, Rocket } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const nodes = [
  { id: "idea", label: "Idea", icon: Lightbulb, color: "text-amber-400" },
  { id: "arch", label: "Architecture", icon: Cpu, color: "text-cyan-400" },
  { id: "ai", label: "AI Model", icon: Bot, color: "text-purple-400" },
  { id: "code", label: "Software", icon: Code, color: "text-emerald-400" },
  { id: "product", label: "Product", icon: Rocket, color: "text-white" },
];

export function ChapterIdeaToSystem() {
  const reducedMotion = usePrefersReducedMotion();
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || !pathRef.current) return;

    const path = pathRef.current;
    const length = path.getTotalLength();

    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    // Anime.js SVG Path Animation
    const animation = animate(path, {
      strokeDashoffset: [length, 0],
      duration: 1800,
      ease: "inOutQuad",
      autoplay: false,
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animation.play();
          }
        });
      },
      { threshold: 0.4 }
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
      id="idea-to-system"
      className="relative min-h-[75vh] flex flex-col justify-center px-6 py-28 md:px-12 text-white"
    >
      <div className="max-w-5xl mx-auto w-full z-10 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-cyan-400">
            CHAPTER 02 — FROM IDEA TO SYSTEM
          </p>
          <h3 className="font-display text-3xl sm:text-5xl font-bold">
            The Transformation Pipeline.
          </h3>
          <p className="text-white/60 text-sm sm:text-base">
            How raw concepts transform into autonomous software products.
          </p>
        </div>

        {/* SVG Pipeline Connection Nodes */}
        <div className="relative pt-8 pb-12">
          {/* Anime.js SVG Path */}
          <svg className="absolute top-1/2 left-0 right-0 w-full h-12 -translate-y-1/2 overflow-visible pointer-events-none z-0 hidden md:block">
            <path
              ref={pathRef}
              d="M 50,24 H 950"
              fill="none"
              stroke="url(#gradient-line)"
              strokeWidth="2"
            />
            <defs>
              <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="25%" stopColor="#22d3ee" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="75%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#ffffff" />
              </linearGradient>
            </defs>
          </svg>

          {/* Node Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 relative z-10">
            {nodes.map((node, idx) => {
              const Icon = node.icon;
              return (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="p-6 rounded-2xl border border-white/15 bg-black/40 backdrop-blur-xl text-center space-y-3 hover:border-cyan-400/40 transition-colors"
                >
                  <div className="size-12 rounded-xl bg-white/5 border border-white/10 grid place-items-center mx-auto">
                    <Icon className={`size-6 ${node.color}`} />
                  </div>
                  <div className="font-mono text-xs font-bold text-white">{node.label}</div>
                  <div className="font-mono text-[10px] text-white/50">STAGE 0{idx + 1}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
