"use client";

import { useEffect, useRef } from "react";
import { getScrollProgress, mapRange } from "@/lib/scrollStore";

export function HtmlOverlays() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerProgressRef = useRef<HTMLSpanElement>(null);

  // Scene overlay refs
  const bootRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const aiCoreRef = useRef<HTMLDivElement>(null);
  const osRef = useRef<HTMLDivElement>(null);
  const engRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const agentsRef = useRef<HTMLDivElement>(null);
  const deployRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frameId: number;

    const tick = () => {
      const progress = getScrollProgress();
      
      // Update header text
      if (headerProgressRef.current) {
        headerProgressRef.current.innerText = `${(progress * 100).toFixed(1)}%`;
      }

      // Update overlays without React re-renders
      const updateOverlay = (
        ref: React.RefObject<HTMLDivElement | null>,
        minP: number, maxP: number,
        fadeInStart: number, fadeInEnd: number,
        fadeOutStart: number, fadeOutEnd: number
      ) => {
        if (!ref.current) return;
        if (progress < minP || progress > maxP) {
          if (ref.current.style.display !== "none") {
            ref.current.style.display = "none";
            ref.current.style.opacity = "0";
          }
          return;
        }
        
        if (ref.current.style.display === "none") {
          ref.current.style.display = "block";
        }

        let opacity = 1;
        if (progress < fadeInEnd) {
          opacity = mapRange(progress, fadeInStart, fadeInEnd, 0, 1);
        } else if (progress > fadeOutStart) {
          opacity = mapRange(progress, fadeOutStart, fadeOutEnd, 1, 0);
        }
        
        ref.current.style.opacity = opacity.toString();
      };

      // Define boundaries identical to the old React logic
      // Scene 01: Boot (0-8%) - Visible immediately
      if (bootRef.current) {
        if (progress > 0.09) {
          if (bootRef.current.style.display !== "none") {
            bootRef.current.style.display = "none";
            bootRef.current.style.opacity = "0";
          }
        } else {
          if (bootRef.current.style.display === "none") bootRef.current.style.display = "block";
          const op = mapRange(progress, 0.00, 0.05, 1, 1) * mapRange(progress, 0.06, 0.09, 1, 0);
          bootRef.current.style.opacity = op.toString();
        }
      }

      updateOverlay(logoRef, 0.07, 0.16, 0.08, 0.10, 0.14, 0.16);
      updateOverlay(aiCoreRef, 0.14, 0.29, 0.15, 0.18, 0.26, 0.29);
      updateOverlay(osRef, 0.27, 0.41, 0.28, 0.31, 0.38, 0.41);
      updateOverlay(engRef, 0.39, 0.56, 0.40, 0.43, 0.53, 0.56);
      updateOverlay(productsRef, 0.54, 0.69, 0.55, 0.57, 0.66, 0.69);
      updateOverlay(agentsRef, 0.67, 0.81, 0.68, 0.70, 0.78, 0.81);
      updateOverlay(deployRef, 0.79, 0.91, 0.80, 0.82, 0.88, 0.91);
      updateOverlay(networkRef, 0.89, 0.97, 0.90, 0.92, 0.95, 0.97);

      // Scene 10: CTA (97-100%)
      if (ctaRef.current) {
        if (progress < 0.96) {
          if (ctaRef.current.style.display !== "none") {
            ctaRef.current.style.display = "none";
            ctaRef.current.style.opacity = "0";
          }
        } else {
          if (ctaRef.current.style.display === "none") ctaRef.current.style.display = "block";
          const op = mapRange(progress, 0.97, 0.99, 0, 1);
          ctaRef.current.style.opacity = op.toString();
        }
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-10 flex flex-col justify-between p-6 sm:p-12 md:p-16 text-white font-sans selection:bg-cyan-500/30 selection:text-white">
      {/* Background Dimming Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.75)_100%)] -z-10" />

      {/* Top Header Status Bar */}
      <header className="flex items-center justify-between font-mono text-xs text-white/70 border-b border-white/10 pb-4 backdrop-blur-md bg-black/40 px-4 py-2 rounded-lg">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-bold text-white tracking-widest">FABX TECH</span>
          <span className="text-white/30">•</span>
          <span className="text-cyan-400 font-semibold">CINEMATIC RUNTIME v4.2</span>
        </div>
        <div className="hidden sm:block text-[11px] uppercase tracking-wider">
          SCROLL PROGRESS: <span ref={headerProgressRef} className="text-cyan-400 font-bold">0.0%</span>
        </div>
      </header>

      {/* Main Overlay Content Stack */}
      <main className="relative my-auto w-full max-w-4xl mx-auto">
        
        {/* 01. Boot */}
        <div ref={bootRef} className="space-y-6 rounded-2xl bg-black/60 p-8 md:p-10 border border-white/15 backdrop-blur-2xl shadow-2xl" style={{ display: "none" }}>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-1.5 font-mono text-xs font-semibold text-cyan-400">
            <span>SCENE 01</span>
            <span>•</span>
            <span>SYSTEM BOOT</span>
          </div>
          <h1 className="font-display text-[clamp(2.5rem,5.5vw,5rem)] font-extrabold leading-[1.0] tracking-tight text-white drop-shadow-md">
            Engineering <br />
            <span className="text-cyan-400">Intelligent Digital</span> Products.
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-white/80 font-sans">
            We design, build, and deploy custom AI agents, enterprise software, and automated cloud platforms inside a unified digital operating system.
          </p>
        </div>

        {/* 02. Logo Evolution */}
        <div ref={logoRef} className="space-y-4 max-w-xl rounded-2xl bg-black/60 p-8 md:p-10 border border-white/15 backdrop-blur-2xl shadow-2xl" style={{ display: "none" }}>
          <div className="font-mono text-xs text-cyan-400 font-semibold uppercase tracking-widest">SCENE 02 • LOGO EVOLUTION</div>
          <h2 className="font-display text-4xl font-bold text-white drop-shadow-md">Logo Becomes Intelligence.</h2>
          <p className="text-white/80 leading-relaxed">
            The solid metallic structure fractures into thousands of GPU-instanced particles, swirling into a central persistent intelligence guide.
          </p>
        </div>

        {/* 03. AI Core */}
        <div ref={aiCoreRef} className="space-y-4 max-w-xl rounded-2xl bg-black/60 p-8 md:p-10 border border-white/15 backdrop-blur-2xl shadow-2xl" style={{ display: "none" }}>
          <div className="font-mono text-xs text-cyan-400 font-semibold uppercase tracking-widest">SCENE 03 • AI CORE ENGINE</div>
          <h2 className="font-display text-4xl font-bold text-white drop-shadow-md">Neural Core Convergence.</h2>
          <p className="text-white/80 leading-relaxed">
            Expanding neural paths and high-frequency data pulse rings power real-time reasoning, decision loops, and vector storage.
          </p>
        </div>

        {/* 04. OS */}
        <div ref={osRef} className="space-y-4 max-w-xl rounded-2xl bg-black/60 p-8 md:p-10 border border-white/15 backdrop-blur-2xl shadow-2xl" style={{ display: "none" }}>
          <div className="font-mono text-xs text-cyan-400 font-semibold uppercase tracking-widest">SCENE 04 • CLOUD OPERATING SYSTEM</div>
          <h2 className="font-display text-4xl font-bold text-white drop-shadow-md">Unified System Architecture.</h2>
          <p className="text-white/80 leading-relaxed">
            Terminal kernels, API gateway nodes, database cylinders, and cloud mesh sync seamlessly across edge networks.
          </p>
        </div>

        {/* 05. Engineering */}
        <div ref={engRef} className="space-y-4 max-w-xl rounded-2xl bg-black/60 p-8 md:p-10 border border-white/15 backdrop-blur-2xl shadow-2xl" style={{ display: "none" }}>
          <div className="font-mono text-xs text-cyan-400 font-semibold uppercase tracking-widest">SCENE 05 • SOFTWARE ENGINEERING</div>
          <h2 className="font-display text-4xl font-bold text-white drop-shadow-md">Precision UI & Component Assembly.</h2>
          <p className="text-white/80 leading-relaxed">
            Wireframe blueprints materialize into complete production UI suites with self-drawing analytics graphs and sub-50ms latency.
          </p>
        </div>

        {/* 06. Products */}
        <div ref={productsRef} className="space-y-4 max-w-xl rounded-2xl bg-black/60 p-8 md:p-10 border border-white/15 backdrop-blur-2xl shadow-2xl" style={{ display: "none" }}>
          <div className="font-mono text-xs text-cyan-400 font-semibold uppercase tracking-widest">SCENE 06 • PRODUCT SHOWCASE</div>
          <h2 className="font-display text-4xl font-bold text-white drop-shadow-md">Production AI Products.</h2>
          <p className="text-white/80 leading-relaxed">
            Discover HRFlow AI, MedFlow AI, Kirana AI, and KGN Service Enterprise — custom AI applications powering modern businesses.
          </p>
        </div>

        {/* 07. Agents */}
        <div ref={agentsRef} className="space-y-4 max-w-xl rounded-2xl bg-black/60 p-8 md:p-10 border border-white/15 backdrop-blur-2xl shadow-2xl" style={{ display: "none" }}>
          <div className="font-mono text-xs text-cyan-400 font-semibold uppercase tracking-widest">SCENE 07 • AUTONOMOUS AGENTS</div>
          <h2 className="font-display text-4xl font-bold text-white drop-shadow-md">Living Agent Swarm.</h2>
          <p className="text-white/80 leading-relaxed">
            Autonomous AI agents execute complex multi-step workflows, parsing data, dispatching requests, and updating CRM systems.
          </p>
        </div>

        {/* 08. Deployment */}
        <div ref={deployRef} className="space-y-4 max-w-xl rounded-2xl bg-black/60 p-8 md:p-10 border border-white/15 backdrop-blur-2xl shadow-2xl" style={{ display: "none" }}>
          <div className="font-mono text-xs text-cyan-400 font-semibold uppercase tracking-widest">SCENE 08 • DEPLOYMENT PIPELINE</div>
          <h2 className="font-display text-4xl font-bold text-white drop-shadow-md">Continuous Delivery Track.</h2>
          <p className="text-white/80 leading-relaxed">
            From unit testing to edge deployment and realtime telemetry monitoring — zero downtime software delivery.
          </p>
        </div>

        {/* 09. Network */}
        <div ref={networkRef} className="space-y-4 max-w-xl rounded-2xl bg-black/60 p-8 md:p-10 border border-white/15 backdrop-blur-2xl shadow-2xl" style={{ display: "none" }}>
          <div className="font-mono text-xs text-cyan-400 font-semibold uppercase tracking-widest">SCENE 09 • GLOBAL NETWORK</div>
          <h2 className="font-display text-4xl font-bold text-white drop-shadow-md">Connected Ecosystem.</h2>
          <p className="text-white/80 leading-relaxed">
            Linking products, cloud infrastructure, AI intelligence, and global end-users into a single unified digital network.
          </p>
        </div>

        {/* 10. CTA */}
        <div ref={ctaRef} className="space-y-8 max-w-2xl mx-auto text-center pointer-events-auto rounded-2xl bg-black/70 p-10 md:p-12 border border-cyan-500/30 backdrop-blur-2xl shadow-2xl" style={{ display: "none" }}>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-1.5 font-mono text-xs font-semibold text-cyan-400">
            <span>SCENE 10</span>
            <span>•</span>
            <span>FINAL CTA</span>
          </div>
          <h2 className="font-display text-5xl font-extrabold text-white leading-tight drop-shadow-md">
            Ready to Build Your <br />
            <span className="text-cyan-400">Next Intelligent Product?</span>
          </h2>
          <p className="text-white/80 text-base max-w-lg mx-auto">
            Collaborate with FABX Tech to engineer your AI platform, enterprise software, or digital product.
          </p>

          <div className="pt-2 flex items-center justify-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-8 py-4 font-display text-sm font-bold text-black hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-500/20"
            >
              <span>Start Your Project →</span>
            </a>
          </div>
        </div>
      </main>

      {/* Footer Scroll Prompt / Counter */}
      <footer className="flex items-center justify-between font-mono text-xs text-white/50 pt-4 border-t border-white/10 backdrop-blur-md bg-black/40 px-4 py-2 rounded-lg">
        <div className="flex items-center gap-2">
          <span className="animate-bounce text-cyan-400">↓</span>
          <span className="tracking-wide">SCROLL TO DRIVE TIMELINE</span>
        </div>
        <div className="text-[10px] text-white/40 uppercase tracking-widest">
          FABX INNOVATIONS ENGINE
        </div>
      </footer>
    </div>
  );
}
