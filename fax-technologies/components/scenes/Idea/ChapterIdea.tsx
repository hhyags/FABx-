"use client";

import { motion } from "framer-motion";
import React from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const words = ["Every", "breakthrough", "begins", "with", "one", "idea."];

export function ChapterIdea() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="idea"
      className="relative flex min-h-[85vh] items-center justify-center px-6 py-32 md:px-12 text-white overflow-hidden"
    >
      {/* Thin Visual Thread Entry from Video */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-b from-cyan-400 to-transparent opacity-60" />

      <div className="max-w-4xl mx-auto text-center z-10 space-y-8">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs uppercase tracking-[0.35em] text-cyan-400"
        >
          CHAPTER 01 — THE ORIGIN
        </motion.p>

        {/* Split Text Word Reveal */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-display text-4xl sm:text-7xl font-bold tracking-tight leading-tight">
          {words.map((word, idx) => {
            const isHighlight = word.toLowerCase().includes("breakthrough");
            return (
              <div key={idx} className="overflow-hidden py-1">
                <motion.span
                  initial={
                    reducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 60, rotateX: 12, filter: "blur(6px)" }
                  }
                  whileInView={
                    reducedMotion
                      ? { opacity: 1 }
                      : { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }
                  }
                  viewport={{ once: false, amount: 0.6 }}
                  transition={{
                    duration: 0.8,
                    delay: idx * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`inline-block ${
                    isHighlight
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-200 to-white"
                      : "text-white"
                  }`}
                >
                  {word}
                </motion.span>
              </div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-white/70 text-base sm:text-lg max-w-xl mx-auto font-sans leading-relaxed pt-4"
        >
          Before code, before algorithms, before infrastructure—great systems emerge from singular problem clarity.
        </motion.p>
      </div>
    </section>
  );
}
