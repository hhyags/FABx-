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
      className="fixed inset-0 z-[80] grid place-items-center bg-[#050505]"
      initial={{ opacity: 1 }}
      animate={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Brand wordmark */}
        <motion.span
          className="font-display text-2xl font-semibold tracking-tight text-white"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          FABX
        </motion.span>

        {/* Progress line */}
        <div className="h-px w-48 overflow-hidden bg-white/[0.08]">
          <motion.div
            className="h-full bg-[hsl(192,82%,46%)]"
            initial={{ width: "0%" }}
            animate={{ width: `${Math.max(progress, 8)}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        {/* Status */}
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
          {Math.round(progress)}%
        </p>
      </div>
    </motion.div>
  );
}
