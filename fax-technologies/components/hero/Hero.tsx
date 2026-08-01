"use client";

import dynamic from "next/dynamic";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LoadingScreen } from "@/components/hero/LoadingScreen";
import { ScrollIndicator } from "@/components/hero/ScrollIndicator";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { fadeIn, motionEase, revealUp, staggerContainer } from "@/lib/animation/motion";

const HeroCanvas = dynamic(
  () => import("@/components/hero/HeroCanvas").then((module) => module.HeroCanvas),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-[#050505]" />,
  },
);

const headline = ["Building Intelligent", "Digital Products", "That Scale."];
const trustIndicators = ["AI Agentic Workflows", "Enterprise Systems", "Vector RAG Pipelines", "Cloud Infrastructure"];

export function Hero() {
  const reducedMotion = usePrefersReducedMotion();
  const [loadingVisible, setLoadingVisible] = useState(true);

  useEffect(() => {
    const duration = reducedMotion ? 600 : 1400;
    const timeout = window.setTimeout(() => setLoadingVisible(false), duration);
    return () => window.clearTimeout(timeout);
  }, [reducedMotion]);

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      <LoadingScreen visible={loadingVisible} />

      {/* R3F WebGL Background Scene */}
      <div className="absolute inset-0">
        <HeroCanvas reducedMotion={reducedMotion} />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(139,92,246,0.18),transparent_45%),linear-gradient(180deg,rgba(0,0,0,0.1),#050505_92%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/80 to-transparent" />
      </div>

      {/* Editorial Content Layer */}
      <motion.div
        className="container relative z-10 flex min-h-screen items-end justify-center pb-28 pt-32 sm:pb-36 lg:pb-40"
        variants={staggerContainer}
        initial="hidden"
        animate={loadingVisible ? "hidden" : "visible"}
      >
        <div className="w-full">
          <div className="mx-auto max-w-5xl text-center">
            <motion.p
              variants={fadeIn}
              className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-cyan-400"
            >
              FAX Technologies — Engineering Studio
            </motion.p>
            <h1 className="mx-auto font-display text-[clamp(3.25rem,7.6vw,6.9rem)] font-semibold leading-[0.93] tracking-tight">
              {headline.map((line) => (
                <motion.span
                  key={line}
                  variants={revealUp}
                  className="block"
                  transition={{ duration: 0.85, ease: motionEase }}
                >
                  {line}
                </motion.span>
              ))}
            </h1>
            <motion.p
              variants={revealUp}
              className="text-white/70 mx-auto mt-8 max-w-3xl text-base leading-8 md:text-lg"
            >
              We architect and deploy production AI agents, enterprise platforms, vector RAG pipelines, and digital software products engineered for revenue growth.
            </motion.p>
            <motion.div
              variants={revealUp}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <MagneticButton
                size="lg"
                className="hover:bg-white/90 group rounded-full border border-white/20 bg-white px-8 py-6 text-black font-semibold shadow-[0_0_40px_rgba(255,255,255,0.3)]"
              >
                <Link href="/contact" className="flex items-center gap-2">
                  Start Your Project
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </MagneticButton>
              <MagneticButton
                size="lg"
                variant="outline"
                className="text-white/80 rounded-full border-white/20 bg-white/[0.04] px-8 py-6 backdrop-blur-md hover:bg-white/10 hover:text-white"
              >
                <Link href="/work" className="flex items-center gap-2">
                  <Sparkles className="size-4 text-cyan-400" />
                  Explore Our Work
                </Link>
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Proof Strip Marquee Bar */}
      <motion.div
        className="absolute inset-x-0 bottom-12 z-20 border-y border-white/10 bg-white/[0.04] py-4 backdrop-blur-xl sm:bottom-14"
        variants={revealUp}
        initial="hidden"
        animate={loadingVisible ? "hidden" : "visible"}
      >
        <div className="text-white/60 container flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center text-xs font-mono tracking-wider sm:text-sm">
          {trustIndicators.map((indicator, index) => (
            <span key={indicator} className="flex items-center gap-6">
              {indicator}
              {index < trustIndicators.length - 1 ? <span className="text-cyan-400/40">•</span> : null}
            </span>
          ))}
        </div>
      </motion.div>
      <ScrollIndicator reducedMotion={reducedMotion} />
    </section>
  );
}
