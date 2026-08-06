"use client";

import { useState } from "react";
import { FrameViewerModal } from "@/components/ui/FrameViewerModal";
import Link from "next/link";
import { Film, ArrowLeft } from "lucide-react";

export default function FrameViewerPage() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <main className="min-h-screen bg-[#05070c] text-white flex flex-col items-center justify-center p-6">
      <div className="text-center space-y-6 max-w-xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 font-mono text-xs text-cyan-400">
          <Film className="size-4 animate-pulse" />
          <span>FABX CINE STUDIO</span>
        </div>

        <h1 className="font-display text-4xl font-bold tracking-tight">
          Frame-by-Frame Cine Viewer
        </h1>

        <p className="text-white/60 font-sans text-base leading-relaxed">
          Interactive telemetry scrubbing engine parsing 240 high-resolution cinematic animation frames at 24 FPS.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4 font-mono text-xs">
          <button
            onClick={() => setIsOpen(true)}
            className="px-6 py-3 rounded-xl bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(14,165,233,0.4)]"
          >
            Launch Interactive Viewer Modal
          </button>
          <a
            href="/frame_viewer.html"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-bold transition-all"
          >
            Open Standalone HTML Viewer
          </a>
        </div>

        <div className="pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 font-mono"
          >
            <ArrowLeft className="size-4" />
            <span>Return to Main Website</span>
          </Link>
        </div>
      </div>

      <FrameViewerModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </main>
  );
}
