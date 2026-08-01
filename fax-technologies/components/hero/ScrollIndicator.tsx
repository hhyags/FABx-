"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

type ScrollIndicatorProps = {
  reducedMotion: boolean;
};

export function ScrollIndicator({ reducedMotion }: ScrollIndicatorProps) {
  return (
    <div className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-3 text-white/55 sm:flex">
      <span className="font-mono text-[10px] uppercase tracking-[0.26em]">Scroll</span>
      <motion.div
        className="grid size-9 place-items-center rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md"
        animate={reducedMotion ? undefined : { y: [0, 7, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="size-4" />
      </motion.div>
    </div>
  );
}
