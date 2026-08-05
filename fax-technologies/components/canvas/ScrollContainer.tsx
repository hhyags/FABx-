"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollStore } from "@/lib/scrollStore";

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollContainer — renders a tall spacer div (1200vh) with scrub: 1.2
 * for butter-smooth inertia and fluid scroll progress mapping.
 */
export function ScrollContainer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const setProgress = useScrollStore((s) => s.setProgress);

  useEffect(() => {
    if (!containerRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.2, // Ultra-smooth 1.2s inertia lag for cinematic motion
      onUpdate: (self) => {
        setProgress(self.progress);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [setProgress]);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: "1200vh" }}
      aria-hidden="true"
    />
  );
}
