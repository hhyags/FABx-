"use client";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { ScrollContainer } from "./ScrollContainer";
import { CinematicCanvas } from "./CinematicCanvas";
import { HtmlOverlays } from "./overlays/HtmlOverlays";

export function CinematicExperience() {
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) {
    return <StaticReducedMotionFallback />;
  }

  return (
    <div className="relative bg-black text-white min-h-screen">
      {/* 1. Fixed R3F 3D Canvas Layer */}
      <CinematicCanvas />

      {/* 2. Fixed HTML Editorial Overlays Layer */}
      <HtmlOverlays />

      {/* 3. 1000vh Tall Scroll Container for GSAP ScrollTrigger */}
      <ScrollContainer />
    </div>
  );
}

/* Reduced motion static fallback */
function StaticReducedMotionFallback() {
  return (
    <div className="min-h-screen bg-black text-white p-8 md:p-16 max-w-5xl mx-auto space-y-24 py-32 font-sans">
      <section className="space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1.5 font-mono text-xs text-cyan-400">
          FABX TECH
        </div>
        <h1 className="font-display text-5xl font-bold">Engineering Intelligent Digital Products.</h1>
        <p className="text-white/60 text-lg">
          We design, build, and deploy custom AI agents, enterprise software, and cloud platforms.
        </p>
      </section>

      <section className="space-y-6 border-t border-white/10 pt-12">
        <h2 className="font-display text-3xl font-bold text-cyan-400">AI Core & Operating System</h2>
        <p className="text-white/60">
          Powered by real-time neural routing, vector databases, and serverless edge orchestration.
        </p>
      </section>

      <section className="space-y-6 border-t border-white/10 pt-12">
        <h2 className="font-display text-3xl font-bold text-cyan-400">Product Showcase</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-white/10 p-6 bg-white/5 space-y-2">
            <h3 className="font-bold text-xl">HRFlow AI</h3>
            <p className="text-sm text-white/50">AI-powered recruitment & resume screening platform.</p>
          </div>
          <div className="rounded-xl border border-white/10 p-6 bg-white/5 space-y-2">
            <h3 className="font-bold text-xl">MedFlow AI</h3>
            <p className="text-sm text-white/50">Clinical decision support system streamlining healthcare workflows.</p>
          </div>
        </div>
      </section>

      <section className="space-y-6 border-t border-white/10 pt-12 text-center">
        <h2 className="font-display text-4xl font-bold">Ready to Start Your Project?</h2>
        <a
          href="/contact"
          className="inline-block rounded-full bg-cyan-400 px-8 py-4 font-bold text-black hover:bg-cyan-300"
        >
          Contact FABX Tech →
        </a>
      </section>
    </div>
  );
}
