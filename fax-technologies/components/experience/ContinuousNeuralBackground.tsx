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

    function onScroll() {
      const progress = TimelineController.getProgress();

      // Show video starting at Chapter 01 (progress >= 0.12) down to the footer
      if (containerRef.current) {
        if (progress >= 0.12) {
          containerRef.current.style.opacity = "1";
        } else {
          containerRef.current.style.opacity = "0";
        }
      }

      if (video) {
        video.playbackRate = 0.9 + Math.min(progress * 0.3, 0.3);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 h-screen w-screen overflow-hidden transition-opacity duration-700 opacity-0"
    >
      {/* HTML Video Background replacing solid black screen */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        className="h-full w-full object-cover opacity-60 filter blur-[0.5px] scale-105"
      >
        <source src="/videos/fabx_cine.mp4" type="video/mp4" />
      </video>

      {/* Subtle Translucent Overlay for High-Contrast Text Readability */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505]/90" />
    </div>
  );
}
