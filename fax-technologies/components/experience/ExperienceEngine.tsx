"use client";

import { useEffect, useRef } from "react";
import { Hero } from "@/components/hero/Hero";
import { AgentsOverlay } from "@/components/scenes/Agents/AgentsOverlay";
import { LiveDevOverlay } from "@/components/scenes/Development/LiveDevOverlay";
import { EngineeringOverlay } from "@/components/scenes/Engineering/EngineeringOverlay";
import { ImpactOverlay } from "@/components/scenes/Impact/ImpactOverlay";
import { ProcessOverlay } from "@/components/scenes/Process/ProcessOverlay";
import { ProductsOverlay } from "@/components/scenes/Products/ProductsOverlay";
import { ValuesOverlay } from "@/components/scenes/Values/ValuesOverlay";
import { ContactOverlay } from "@/components/scenes/Contact/ContactOverlay";
import { assetManager } from "@/lib/experience/engine/AssetManager";

export function ExperienceEngine() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    assetManager.preloadAll();
  }, []);

  return (
    <main ref={containerRef} className="relative text-white">
      {/* FABX OS Layered Storyline Sections */}
      <div className="relative z-10">
        <Hero />
        <EngineeringOverlay />
        <LiveDevOverlay />
        <ProductsOverlay />
        <AgentsOverlay />
        <ProcessOverlay />
        <ImpactOverlay />
        <ValuesOverlay />
        <ContactOverlay />
      </div>
    </main>
  );
}
