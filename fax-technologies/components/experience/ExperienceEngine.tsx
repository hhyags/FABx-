"use client";

import Lenis from "lenis";
import { useEffect, useRef } from "react";
import { SceneManager } from "@/components/experience/SceneManager";
import { Hero } from "@/components/hero/Hero";
import { BirthOverlay } from "@/components/scenes/Birth/BirthOverlay";
import { ContactOverlay } from "@/components/scenes/Contact/ContactOverlay";
import { EngineeringOverlay } from "@/components/scenes/Engineering/EngineeringOverlay";
import { ImpactOverlay } from "@/components/scenes/Impact/ImpactOverlay";
import { NetworkOverlay } from "@/components/scenes/Network/NetworkOverlay";
import { ProcessOverlay } from "@/components/scenes/Process/ProcessOverlay";
import { ProductsOverlay } from "@/components/scenes/Products/ProductsOverlay";
import { ValuesOverlay } from "@/components/scenes/Values/ValuesOverlay";
import { AnimatedCursor } from "@/components/ui/animated-cursor";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { assetManager } from "@/lib/experience/engine/AssetManager";
import { TimelineController } from "@/lib/experience/engine/TimelineController";

export function ExperienceEngine() {
  const reducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    assetManager.preloadAll();

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function onScroll() {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const progress = window.scrollY / scrollHeight;
        TimelineController.updateProgress(progress);
      }
    }

    lenis.on("scroll", onScroll);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main ref={containerRef} className="relative bg-[#050505] text-white">
      {/* Precision Cursor Ring */}
      <AnimatedCursor />

      {/* 3D WebGL Canvas Layer */}
      <SceneManager reducedMotion={reducedMotion} />

      {/* HTML DOM Storyline Sections */}
      <div className="relative z-10">
        <Hero />
        <BirthOverlay />
        <NetworkOverlay />
        <EngineeringOverlay />
        <ProductsOverlay />
        <ImpactOverlay />
        <ProcessOverlay />
        <ValuesOverlay />
        <ContactOverlay />
      </div>
    </main>
  );
}
