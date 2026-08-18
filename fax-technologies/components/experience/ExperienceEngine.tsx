"use client";

import { useEffect, useRef } from "react";
import { Hero } from "@/components/hero/Hero";
import { LiveDevOverlay } from "@/components/scenes/Development/LiveDevOverlay";
import { ChapterIdea } from "@/components/scenes/Idea/ChapterIdea";
import { ChapterIdeaToSystem } from "@/components/scenes/Idea/ChapterIdeaToSystem";
import { EngineeringOverlay } from "@/components/scenes/Engineering/EngineeringOverlay";
import { AgentsOverlay } from "@/components/scenes/Agents/AgentsOverlay";
import { ProductsOverlay } from "@/components/scenes/Products/ProductsOverlay";
import { ImpactOverlay } from "@/components/scenes/Impact/ImpactOverlay";
import { ProcessOverlay } from "@/components/scenes/Process/ProcessOverlay";
import { ValuesOverlay } from "@/components/scenes/Values/ValuesOverlay";
import { ContactOverlay } from "@/components/scenes/Contact/ContactOverlay";
import { ContinuousNeuralBackground } from "@/components/experience/ContinuousNeuralBackground";
import { assetManager } from "@/lib/experience/engine/AssetManager";

export function ExperienceEngine() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    assetManager.preloadAll();
  }, []);

  return (
    <main ref={containerRef} className="relative text-white">
      {/* Continuous Neural Background Video Loop from Chapter 01 to Footer */}
      <ContinuousNeuralBackground />

      <div className="relative z-10">
        {/* SECTION 01 — HERO (LOCKED) */}
        <Hero />

        {/* SECTION 02 — VIDEO SCROLL EXPERIENCE (LOCKED) */}
        <LiveDevOverlay />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            NEW POST-VIDEO EXPERIENCE STARTS HERE
           ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}

        {/* CHAPTER 01 — THE IDEA */}
        <ChapterIdea />

        {/* CHAPTER 02 — FROM IDEA TO SYSTEM */}
        <ChapterIdeaToSystem />

        {/* CHAPTER 03 — ENGINEERING */}
        <EngineeringOverlay />

        {/* CHAPTER 04 — CAPABILITIES */}
        <AgentsOverlay />

        {/* CHAPTER 05 — REAL PRODUCTS */}
        <ProductsOverlay />

        {/* CHAPTER 06 — IMPACT */}
        <ImpactOverlay />

        {/* CHAPTER 07 — PROCESS */}
        <ProcessOverlay />

        {/* CHAPTER 08 — VALUES */}
        <ValuesOverlay />

        {/* CHAPTER 09 — CONTACT */}
        <ContactOverlay />
      </div>
    </main>
  );
}
