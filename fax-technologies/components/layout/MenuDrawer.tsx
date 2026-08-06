"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal, Cpu, Film, Layers, Globe, Smartphone, Sparkles, Send } from "lucide-react";
import Link from "next/link";

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenFrameViewer: () => void;
}

const siteSections = [
  { href: "#hero", label: "01. AI Core", desc: "Volumetric Intent & Blueprint Engine" },
  { href: "#process", label: "02. Engineering Pipeline", desc: "Wireframes to Production Architecture" },
  { href: "#services", label: "03. Capabilities & Modules", desc: "Autonomous AI Agents & Cloud Stack" },
  { href: "#projects", label: "04. Featured Systems", desc: "HRFlow, MedFlow, Kirana, KGN Service" },
  { href: "#contact", label: "05. Project Terminal", desc: "Configure & Dispatch Sprint Requirements" },
];

const externalPages = [
  { href: "/work", label: "Work & Case Studies" },
  { href: "/services", label: "Services Breakdown" },
  { href: "/about", label: "About FABX" },
  { href: "/style-guide", label: "Brand Style Guide" },
];

export function MenuDrawer({ isOpen, onClose, onOpenFrameViewer }: MenuDrawerProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[90] flex justify-end bg-black/80 backdrop-blur-xl"
        onClick={onClose}
      >
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          onClick={(e) => e.stopPropagation()}
          className="relative h-full w-full max-w-lg border-l border-white/10 bg-[#07090e] p-6 sm:p-10 font-mono text-white shadow-2xl flex flex-col justify-between overflow-y-auto"
        >
          {/* Top Bar */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 font-bold text-sm text-cyan-400">
                <Terminal className="size-4" />
                <span>FABX COMMAND CENTER</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-all"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Frame Viewer Spotlight Action */}
            <div className="p-4 rounded-xl border border-cyan-500/30 bg-cyan-500/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                  <Film className="size-4 animate-pulse" />
                  <span>FRAME-BY-FRAME CINE VIEWER</span>
                </span>
                <span className="text-[10px] text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                  240 FRAMES
                </span>
              </div>
              <p className="text-xs text-white/60 font-sans">
                Scrub through 240 rendered animation frames with variable FPS controls.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOpenFrameViewer();
                }}
                className="w-full mt-2 py-2.5 rounded-lg bg-cyan-500 text-black font-bold text-xs hover:bg-cyan-400 transition-all flex items-center justify-center gap-2"
              >
                <span>Launch Frame Viewer Modal</span>
                <Film className="size-3.5" />
              </button>
            </div>

            {/* Main Sections Navigation */}
            <div className="space-y-4 pt-2">
              <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                SYSTEM SECTIONS
              </div>

              <div className="space-y-2">
                {siteSections.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className="p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-cyan-500/10 hover:border-cyan-400/40 text-white transition-all block group"
                  >
                    <div className="text-sm font-bold group-hover:text-cyan-400 transition-colors">
                      {item.label}
                    </div>
                    <div className="text-xs text-white/40 font-sans mt-0.5">{item.desc}</div>
                  </a>
                ))}
              </div>
            </div>

            {/* Direct Route Links */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                PAGES & DESIGN SYSTEM
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {externalPages.map((pg) => (
                  <Link
                    key={pg.href}
                    href={pg.href}
                    onClick={onClose}
                    className="p-2.5 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/10 text-white/80 hover:text-white transition-all text-center"
                  >
                    {pg.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-8 border-t border-white/10 text-xs text-white/40 flex items-center justify-between">
            <span>FABX OS v4.2 ONLINE</span>
            <a
              href="#contact"
              onClick={onClose}
              className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
            >
              <span>Deploy Project</span>
              <Send className="size-3" />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
