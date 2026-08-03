"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { CanvasErrorBoundary } from "@/components/experience/CanvasErrorBoundary";
import { SceneManager } from "@/components/experience/SceneManager";
import { AnimatedCursor } from "@/components/ui/animated-cursor";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { TimelineController } from "@/lib/experience/engine/TimelineController";

export function GlobalCanvas() {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
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
    <>
      <AnimatedCursor />
      <CanvasErrorBoundary>
        <SceneManager reducedMotion={reducedMotion} />
      </CanvasErrorBoundary>
    </>
  );
}
