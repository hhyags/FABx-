"use client";

import dynamic from "next/dynamic";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LoadingScreen } from "@/components/hero/LoadingScreen";
import { ScrollIndicator } from "@/components/hero/ScrollIndicator";
import { Button } from "@/components/ui/button";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { fadeIn, motionEase, revealUp, staggerContainer } from "@/lib/animation/motion";

const HeroCanvas = dynamic(
  () => import("@/components/hero/HeroCanvas").then((module) => module.HeroCanvas),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-black" />,
  },
);

const headline = ["Building Intelligent", "Digital Products", "That Scale."];
const trustIndicators = ["AI Development", "Enterprise Software", "Automation", "Cloud Solutions"];

export function Hero() {
  const reducedMotion = usePrefersReducedMotion();
  const [loadingVisible, setLoadingVisible] = useState(true);

  useEffect(() => {
    const duration = reducedMotion ? 900 : 1800;
    const timeout = window.setTimeout(() => setLoadingVisible(false), duration);

    return () => window.clearTimeout(timeout);
  }, [reducedMotion]);

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      <LoadingScreen visible={loadingVisible} />
      <div className="absolute inset-0">
        <HeroCanvas reducedMotion={reducedMotion} />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_43%_30%,rgba(139,92,246,0.28),transparent_28%),radial-gradient(circle_at_60%_33%,rgba(34,211,238,0.22),transparent_26%),radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.08),transparent_24%),linear-gradient(180deg,rgba(0,0,0,0.2),#050505_88%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#050505_0%,transparent_18%,transparent_82%,#050505_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black/80 to-transparent" />
        <motion.div
          aria-hidden
          className="bg-brand-purple/12 absolute left-1/2 top-[34%] h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl md:h-[40rem] md:w-[40rem]"
          animate={
            reducedMotion ? undefined : { opacity: [0.34, 0.62, 0.34], scale: [0.96, 1.04, 0.96] }
          }
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        className="container relative z-10 flex min-h-screen items-end justify-center pb-28 pt-28 sm:pb-32 lg:pb-36"
        variants={staggerContainer}
        initial="hidden"
        animate={loadingVisible ? "hidden" : "visible"}
      >
        <div className="w-full">
          <div className="mx-auto max-w-5xl text-center">
            <motion.p
              variants={fadeIn}
              className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-brand-cyan/85"
            >
              FAX Technologies
            </motion.p>
            <h1 className="mx-auto font-display text-[clamp(3.25rem,7.6vw,6.9rem)] font-semibold leading-[0.93] tracking-normal">
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
              className="text-white/64 mx-auto mt-7 max-w-4xl text-base leading-8 md:text-lg"
            >
              We design and build AI-powered software, enterprise platforms, automation systems, and
              modern digital experiences for startups and growing businesses.
            </motion.p>
            <motion.div
              variants={revealUp}
              className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <Button
                size="lg"
                className="hover:bg-white/92 group rounded-full border border-white/20 bg-white px-7 text-black shadow-[0_0_32px_rgba(139,92,246,0.36)]"
              >
                Start Your Project
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white/76 rounded-full border-white/20 bg-black/10 px-7 backdrop-blur-md hover:bg-white/[0.07] hover:text-white"
              >
                <Sparkles className="size-4" />
                Explore Our Work
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute inset-x-0 bottom-14 z-20 border-y border-white/10 bg-white/[0.055] py-4 backdrop-blur-xl sm:bottom-16"
        variants={revealUp}
        initial="hidden"
        animate={loadingVisible ? "hidden" : "visible"}
      >
        <div className="text-white/54 container flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center text-xs sm:text-sm md:text-base">
          {trustIndicators.map((indicator, index) => (
            <span key={indicator} className="flex items-center gap-4">
              {indicator}
              {index < trustIndicators.length - 1 ? <span className="text-white/35">•</span> : null}
            </span>
          ))}
        </div>
      </motion.div>
      <ScrollIndicator reducedMotion={reducedMotion} />
    </section>
  );
}
