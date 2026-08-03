"use client";

import { motion } from "framer-motion";

type ScrollIndicatorProps = {
  reducedMotion: boolean;
};

export function ScrollIndicator({ reducedMotion }: ScrollIndicatorProps) {
  return (
    <div className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex">
      {/* Mouse Icon Capsule */}
      <div className="relative flex h-10 w-6 justify-center rounded-full border border-white/30 p-1.5 backdrop-blur-sm transition-colors hover:border-white/60">
        <motion.div
          className="size-1 rounded-full bg-white"
          animate={reducedMotion ? undefined : { y: [0, 14, 0], opacity: [1, 0.2, 1] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: [0.45, 0, 0.55, 1],
          }}
        />
      </div>
    </div>
  );
}
