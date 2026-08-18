"use client";

import React, { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function ContinuousNeuralBackground() {
  const reducedMotion = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || !videoRef.current) return;

    const video = videoRef.current;

    function handleScroll() {
      if (!containerRef.current) return;
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight * 1.5;

      // Show neural video starting at Chapter 01 (after scrollY > heroHeight * 0.5)
      if (scrollY > heroHeight * 0.3) {
        containerRef.current.style.opacity = "0.85";
      } else {
        containerRef.current.style.opacity = "0";
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 h-screen w-screen overflow-hidden transition-opacity duration-500 opacity-0"
    >
      {/* HTML Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        className="h-full w-full object-cover filter blur-[0.5px] scale-105"
      >
        <source src="/videos/fabx_cine.mp4" type="video/mp4" />
      </video>

      {/* Subtle Contrast Overlay for Crisp Readability */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/90 via-transparent to-[#050505]/95" />
    </div>
  );
}
