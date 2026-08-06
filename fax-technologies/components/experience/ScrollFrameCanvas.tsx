"use client";

import { useEffect, useRef, useState } from "react";
import { Film } from "lucide-react";
import { FrameViewerModal } from "@/components/ui/FrameViewerModal";

const TOTAL_FRAMES = 240;

export function ScrollFrameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentFrameDisplay, setCurrentFrameDisplay] = useState(1);
  const [scrollPct, setScrollPct] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Preload 240 frame images
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const pad = String(i).padStart(4, "0");
      img.src = `/frames/frame_${pad}.jpg`;
      images.push(img);
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Particle mesh setup
    const numParticles = 80;
    const particles = Array.from({ length: numParticles }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      baseRadius: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.2,
    }));

    let smoothFrame = 1;

    const renderFrame = () => {
      ctx.clearRect(0, 0, width, height);

      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight; // Hero section height

      // Render ONLY after hero section
      if (scrollY >= heroHeight * 0.7) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollableDist = Math.max(1, docHeight - heroHeight);

      let scrollProgress = 0;
      if (scrollY >= heroHeight) {
        scrollProgress = Math.min(1, Math.max(0, (scrollY - heroHeight) / scrollableDist));
      }

      const targetFrame = Math.min(
        TOTAL_FRAMES,
        Math.max(1, Math.floor(scrollProgress * (TOTAL_FRAMES - 1)) + 1)
      );

      smoothFrame += (targetFrame - smoothFrame) * 0.15;
      const frameIdx = Math.min(TOTAL_FRAMES, Math.max(1, Math.round(smoothFrame))) - 1;

      // 1. Draw Frame Video Background if loaded and scrolled past hero
      const activeImg = images[frameIdx];
      if (scrollY >= heroHeight * 0.7 && activeImg && activeImg.complete && activeImg.naturalWidth > 0) {
        const imgAspect = activeImg.naturalWidth / activeImg.naturalHeight;
        const canvasAspect = width / height;

        let renderW = width;
        let renderH = height;
        let renderX = 0;
        let renderY = 0;

        if (canvasAspect > imgAspect) {
          renderH = width / imgAspect;
          renderY = (height - renderH) / 2;
        } else {
          renderW = height * imgAspect;
          renderX = (width - renderW) / 2;
        }

        ctx.drawImage(activeImg, renderX, renderY, renderW, renderH);

        // Dark overlay gradient for readable story text
        ctx.fillStyle = "rgba(5, 7, 12, 0.75)";
        ctx.fillRect(0, 0, width, height);
      } else {
        ctx.fillStyle = "rgba(5, 7, 12, 1)";
        ctx.fillRect(0, 0, width, height);
      }

      // 2. Draw Cyber Grid Overlay
      ctx.strokeStyle = `rgba(14, 165, 233, ${0.04 + scrollProgress * 0.04})`;
      ctx.lineWidth = 1;
      const gridSize = 60;
      const offsetY = (scrollY * 0.2) % gridSize;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = -gridSize + offsetY; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 3. Draw Particle Mesh
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const pulseFactor = Math.sin(Date.now() * 0.002 + idx) * 0.5 + 1;
        const radius = p.baseRadius * pulseFactor * (1 + scrollProgress * 0.4);

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(14, 165, 233, ${p.alpha * (0.3 + scrollProgress * 0.4)})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(14, 165, 233, 0.5)";
        ctx.fill();

        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(14, 165, 233, ${(1 - dist / 100) * 0.12})`;
            ctx.stroke();
          }
        }
      });

      setCurrentFrameDisplay(frameIdx + 1);
      setScrollPct(Math.round(scrollProgress * 100));

      animationFrameId = requestAnimationFrame(renderFrame);
    };

    renderFrame();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-700 ${
          isVisible ? "opacity-90" : "opacity-0"
        }`}
      />

      {/* Floating Cine Scroll Telemetry HUD — visible only after hero section */}
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center gap-3 px-4 py-2 rounded-full border border-cyan-500/30 bg-black/80 text-white font-mono text-xs backdrop-blur-md shadow-2xl transition-all">
          <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
            <span className="size-2 rounded-full bg-cyan-400 animate-ping" />
            <span>FRAME {String(currentFrameDisplay).padStart(3, "0")} / {TOTAL_FRAMES}</span>
          </span>
          <span className="text-white/30">|</span>
          <span className="text-emerald-400">{scrollPct}% SYNC</span>
          <button
            onClick={() => setModalOpen(true)}
            className="ml-1 p-1 rounded-full hover:bg-cyan-500/20 text-white/60 hover:text-cyan-300 transition-colors"
            title="Open Fullscreen Frame Viewer Modal"
          >
            <Film className="size-3.5" />
          </button>
        </div>
      )}

      <FrameViewerModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
