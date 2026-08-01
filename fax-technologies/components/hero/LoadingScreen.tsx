"use client";

import { motion } from "framer-motion";
import { useProgress } from "@react-three/drei";

type LoadingScreenProps = {
  visible: boolean;
};

export function LoadingScreen({ visible }: LoadingScreenProps) {
  const { progress } = useProgress();

  return (
    <motion.div
      aria-hidden={!visible}
      className="fixed inset-0 z-[80] grid place-items-center bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex flex-col items-center gap-6">
        <motion.div
          className="grid size-20 place-items-center rounded-lg border border-white/15 bg-white/[0.04] font-display text-xl font-semibold text-white shadow-glow"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          FX
        </motion.div>
        <div className="h-px w-48 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-brand-purple via-white to-brand-cyan"
            initial={{ width: "0%" }}
            animate={{ width: `${Math.max(progress, 12)}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-white/45">
          Loading {Math.round(progress)}%
        </p>
      </div>
    </motion.div>
  );
}
