"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Film,
} from "lucide-react";

interface FrameViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TOTAL_FRAMES = 240;
const SRC_FPS = 24;

export function FrameViewerModal({ isOpen, onClose }: FrameViewerModalProps) {
  const [current, setCurrent] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [fps, setFps] = useState(24);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const pad4 = (n: number) => String(n).padStart(4, "0");
  const frameSrc = (n: number) => `/frames/frame_${pad4(n)}.jpg`;

  const goTo = (n: number) => {
    setCurrent(Math.min(TOTAL_FRAMES, Math.max(1, n)));
  };

  const step = (delta: number) => {
    setCurrent((prev) => {
      let next = prev + delta;
      if (next > TOTAL_FRAMES) next = 1;
      if (next < 1) next = TOTAL_FRAMES;
      return next;
    });
  };

  useEffect(() => {
    if (playing) {
      timerRef.current = setInterval(() => {
        step(1);
      }, 1000 / fps);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [playing, fps]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.code === "ArrowRight") {
        setPlaying(false);
        step(1);
      } else if (e.code === "ArrowLeft") {
        setPlaying(false);
        step(-1);
      } else if (e.code === "Space") {
        e.preventDefault();
        setPlaying((p) => !p);
      } else if (e.code === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-6 backdrop-blur-2xl"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-cyan-500/30 bg-[#07090e] p-6 font-mono text-white shadow-[0_0_50px_rgba(14,165,233,0.2)] space-y-4"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <Film className="size-5 text-cyan-400 animate-pulse" />
              <span className="font-bold text-sm sm:text-base tracking-wide text-white">
                FABX CINE — FRAME-BY-FRAME VIEWER
              </span>
              <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/30 hidden sm:inline-block">
                240 FRAMES ACTIVE
              </span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="/frame_viewer.html"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-white/50 hover:text-cyan-400 flex items-center gap-1 transition-colors"
                title="Open Standalone Window"
              >
                <Maximize2 className="size-4" />
                <span className="hidden sm:inline">Fullscreen Window</span>
              </a>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>

          {/* Viewport Frame Display */}
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/15 bg-black shadow-2xl">
            <img
              src={frameSrc(current)}
              alt={`Frame ${current}`}
              className="h-full w-full object-cover"
            />
            <div className="absolute top-4 left-4 rounded-full border border-cyan-500/40 bg-black/75 px-3 py-1 text-xs text-cyan-400 backdrop-blur-md font-bold">
              FRAME {current} / {TOTAL_FRAMES}
            </div>
            <div className="absolute bottom-4 left-4 rounded-lg border border-white/10 bg-black/75 px-3 py-1 text-xs text-white/60 backdrop-blur-md">
              t = {((current - 1) / SRC_FPS).toFixed(3)}s
            </div>
          </div>

          {/* Scrubber & Controls */}
          <div className="space-y-4 rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <input
              type="range"
              min={1}
              max={TOTAL_FRAMES}
              value={current}
              onChange={(e) => {
                setPlaying(false);
                goTo(parseInt(e.target.value, 10));
              }}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-cyan-400"
            />

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setPlaying(false);
                    goTo(1);
                  }}
                  className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/80 hover:bg-white/10 hover:text-white transition-all"
                  title="First Frame"
                >
                  <SkipBack className="size-4" />
                </button>
                <button
                  onClick={() => {
                    setPlaying(false);
                    step(-1);
                  }}
                  className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/80 hover:bg-white/10 hover:text-white transition-all"
                  title="Previous Frame"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  onClick={() => setPlaying(!playing)}
                  className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-2 text-xs font-bold text-black hover:bg-cyan-400 transition-all shadow-[0_0_15px_rgba(14,165,233,0.4)]"
                >
                  {playing ? (
                    <>
                      <Pause className="size-4 fill-black" />
                      <span>PAUSE</span>
                    </>
                  ) : (
                    <>
                      <Play className="size-4 fill-black" />
                      <span>PLAY</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    setPlaying(false);
                    step(1);
                  }}
                  className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/80 hover:bg-white/10 hover:text-white transition-all"
                  title="Next Frame"
                >
                  <ChevronRight className="size-4" />
                </button>
                <button
                  onClick={() => {
                    setPlaying(false);
                    goTo(TOTAL_FRAMES);
                  }}
                  className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/80 hover:bg-white/10 hover:text-white transition-all"
                  title="Last Frame"
                >
                  <SkipForward className="size-4" />
                </button>
              </div>

              {/* FPS Selector */}
              <div className="flex items-center gap-2 text-xs text-white/60">
                <span>FPS Speed:</span>
                <select
                  value={fps}
                  onChange={(e) => setFps(parseInt(e.target.value, 10))}
                  className="rounded-lg border border-white/15 bg-black px-3 py-1.5 text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value={6}>6 FPS</option>
                  <option value={12}>12 FPS</option>
                  <option value={24}>24 FPS</option>
                  <option value={30}>30 FPS</option>
                  <option value={60}>60 FPS</option>
                </select>
              </div>
            </div>

            <div className="text-center font-mono text-[11px] text-white/40 pt-1">
              Keyboard Shortcuts: <kbd className="px-1.5 py-0.5 rounded border border-white/20 bg-white/5">←</kbd> / <kbd className="px-1.5 py-0.5 rounded border border-white/20 bg-white/5">→</kbd> Step Frame • <kbd className="px-1.5 py-0.5 rounded border border-white/20 bg-white/5">Space</kbd> Play/Pause
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
