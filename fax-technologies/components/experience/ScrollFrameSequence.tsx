"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface OverlayItem {
  frameStart: number;
  frameEnd: number;
  content: React.ReactNode;
}

export interface ScrollFrameSequenceProps {
  framePathPattern?: string;
  frameCount?: number;
  scrollDistance?: number;
  scrub?: number | boolean;
  overlays?: OverlayItem[];
  className?: string;
}

export function ScrollFrameSequence({
  framePathPattern = "/frames/frame_%N.jpg",
  frameCount = 240,
  scrollDistance = 5500,
  scrub = 0.5,
  overlays = [],
  className = "",
}: ScrollFrameSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    let isMounted = true;
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    const getFrameUrl = (index: number) => {
      const pad = String(index).padStart(4, "0");
      return framePathPattern.replace("%N", pad);
    };

    // Preload all 240 pre-decoded video frames for 60 FPS zero-lag playback
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        if (!isMounted) return;
        loadedCount++;
        const pct = Math.round((loadedCount / frameCount) * 100);
        setLoadProgress(pct);
        if (loadedCount === frameCount) {
          setLoaded(true);
        }
      };
      img.onerror = () => {
        if (!isMounted) return;
        loadedCount++;
        if (loadedCount === frameCount) {
          setLoaded(true);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      isMounted = false;
    };
  }, [frameCount, framePathPattern]);

  // GSAP ScrollTrigger Pinned Canvas Loop for Liquid Smooth Playback
  useEffect(() => {
    if (!loaded) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const currentFrameObj = { frame: 0 };

    // Responsive Object-Fit Cover Math
    const drawFrame = (frameIndexFloat: number) => {
      const frameIndex = Math.min(
        frameCount - 1,
        Math.max(0, Math.round(frameIndexFloat))
      );
      const img = imagesRef.current[frameIndex];
      if (!img || !img.complete) return;

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const imgW = img.naturalWidth || 1280;
      const imgH = img.naturalHeight || 720;
      const imgAspect = imgW / imgH;
      const canvasAspect = w / h;

      let renderW = w;
      let renderH = h;
      let renderX = 0;
      let renderY = 0;

      if (canvasAspect > imgAspect) {
        renderH = w / imgAspect;
        renderY = (h - renderH) / 2;
      } else {
        renderW = h * imgAspect;
        renderX = (w - renderW) / 2;
      }

      ctx.drawImage(img, renderX, renderY, renderW, renderH);
    };

    // Setup canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentFrameObj.frame);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // GSAP ScrollTrigger Pinned Sequence
    const tween = gsap.to(currentFrameObj, {
      frame: frameCount - 1,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: `+=${scrollDistance}`,
        pin: true,
        scrub: scrub,
        onUpdate: () => {
          // Direct canvas render call — ZERO seeking lag, ZERO dropped frames!
          drawFrame(currentFrameObj.frame);
          const fIdx = Math.round(currentFrameObj.frame) + 1;

          // Update Overlays opacity directly on DOM nodes
          overlays.forEach((ov, idx) => {
            const el = overlayRefs.current[idx];
            if (!el) return;

            if (fIdx >= ov.frameStart && fIdx <= ov.frameEnd) {
              const totalSpan = ov.frameEnd - ov.frameStart;
              const midPoint = ov.frameStart + totalSpan / 2;
              let opacity = 1;

              if (fIdx < midPoint) {
                opacity = (fIdx - ov.frameStart) / (totalSpan / 2);
              } else {
                opacity = (ov.frameEnd - fIdx) / (totalSpan / 2);
              }

              el.style.opacity = String(Math.min(1, Math.max(0, opacity)));
              el.style.pointerEvents = "auto";
            } else {
              el.style.opacity = "0";
              el.style.pointerEvents = "none";
            }
          });
        },
      },
    });

    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (tween.scrollTrigger) {
        tween.scrollTrigger.kill();
      }
      tween.kill();
    };
  }, [loaded, frameCount, framePathPattern, scrollDistance, scrub, overlays]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-screen overflow-hidden bg-[#05070c] ${className}`}
    >
      {/* Lightweight Loading Screen */}
      {!loaded && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#05070c] text-white font-mono space-y-4">
          <div className="flex items-center gap-3 text-cyan-400 text-sm font-bold tracking-widest">
            <span className="size-3 rounded-full bg-cyan-400 animate-ping" />
            <span>PRELOADING 240 CINEMATIC FRAMES ({loadProgress}%)</span>
          </div>
          <div className="h-1.5 w-64 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-cyan-400 transition-all duration-200"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Full-bleed 60 FPS responsive Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Optional Frame-Linked Text / UI Overlays */}
      {overlays.map((ov, idx) => (
        <div
          key={idx}
          ref={(el) => {
            overlayRefs.current[idx] = el;
          }}
          className="absolute inset-0 z-10 flex items-center justify-center p-6 text-center pointer-events-none transition-opacity duration-300 opacity-0"
        >
          {ov.content}
        </div>
      ))}
    </div>
  );
}
