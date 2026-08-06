"use client";

import { ScrollFrameSequence } from "./ScrollFrameSequence";
import { Section01Spark } from "./Section01Spark";
import { Section02Process } from "./Section02Process";
import { Section03Services } from "./Section03Services";
import { Section04Projects } from "./Section04Projects";
import { Section05CaseStudy } from "./Section05CaseStudy";
import { Section06TechStack } from "./Section06TechStack";
import { Section07Workflow } from "./Section07Workflow";
import { Section08WhyFabx } from "./Section08WhyFabx";
import { Section09ContactTerminal } from "./Section09ContactTerminal";
import "@/styles/cinematic.css";

const cinematicOverlays = [
  {
    frameStart: 20,
    frameEnd: 80,
    content: (
      <div className="max-w-2xl space-y-3 font-mono text-center">
        <div className="inline-block px-3 py-1 rounded-full border border-cyan-500/40 bg-black/60 text-cyan-400 text-xs font-bold backdrop-blur-md">
          SYSTEM BLUEPRINT MATRIX
        </div>
        <h3 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
          Transforming Intent into Architecture.
        </h3>
        <p className="text-white/60 font-sans text-sm sm:text-base">
          Sub-50ms edge processing engineered for high-concurrency enterprise workloads.
        </p>
      </div>
    ),
  },
  {
    frameStart: 100,
    frameEnd: 160,
    content: (
      <div className="max-w-2xl space-y-3 font-mono text-center">
        <div className="inline-block px-3 py-1 rounded-full border border-emerald-500/40 bg-black/60 text-emerald-400 text-xs font-bold backdrop-blur-md">
          AUTONOMOUS MULTI-AGENT ENGINE
        </div>
        <h3 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
          One Team, Zero Limits.
        </h3>
        <p className="text-white/60 font-sans text-sm sm:text-base">
          Vector memory mesh with real-time semantic search indexing.
        </p>
      </div>
    ),
  },
  {
    frameStart: 175,
    frameEnd: 235,
    content: (
      <div className="max-w-2xl space-y-3 font-mono text-center">
        <div className="inline-block px-3 py-1 rounded-full border border-cyan-500/40 bg-black/60 text-cyan-400 text-xs font-bold backdrop-blur-md">
          FABX OS PRODUCTION RUNTIME
        </div>
        <h3 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
          Scroll Down to Explore living chapters.
        </h3>
        <p className="text-white/60 font-sans text-sm sm:text-base">
          From wireframes to production-tested cloud systems.
        </p>
      </div>
    ),
  },
];

export function FabxCinematicJourney() {
  return (
    <div className="fabx-cinematic-wrapper relative">
      {/* Full-bleed pinned Apple-style 240-frame scroll animation section immediately after hero */}
      <ScrollFrameSequence
        frameCount={240}
        scrollDistance={5500}
        scrub={0.8}
        overlays={cinematicOverlays}
      />

      {/* Living Story Chapters */}
      <Section01Spark />
      <Section02Process />
      <Section03Services />
      <Section04Projects />
      <Section05CaseStudy />
      <Section06TechStack />
      <Section07Workflow />
      <Section08WhyFabx />
      <Section09ContactTerminal />
    </div>
  );
}
