"use client";

import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { TimelineController } from "@/lib/experience/engine/TimelineController";

export function ContinuousNeuralBackground() {
  const reducedMotion = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || !videoRef.current) return;

    const video = videoRef.current;

    // Synchronize video opacity / playback rate subtly with Lenis scroll progress
    function onScroll() {
      const progress = TimelineController.getProgress();

      // Show neural video starting at Chapter 01 (progress >= 0.15) down to the footer
      if (containerRef.current) {
        if (progress >= 0.15) {
          containerRef.current.style.opacity = "1";
        } else {
          containerRef.current.style.opacity = "0";
        }
      }

      // Slightly alter playback speed based on scroll velocity
      if (video) {
        video.playbackRate = 0.85 + Math.min(progress * 0.4, 0.4);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 h-screen w-screen overflow-hidden transition-opacity duration-1000 opacity-0"
    >
      {/* Background Neural AI Video Loop */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        className="h-full w-full object-cover opacity-25 filter blur-[1px] mix-blend-screen scale-105"
      >
        <source src="/videos/fabx_cine.mp4" type="video/mp4" />
      </video>

      {/* Dark Radial Contrast Vignette to Guarantee Text & UI Readability */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,5,5,0.4)_0%,#050505_85%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
    </div>
  );
}
