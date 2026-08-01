"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import React from "react";

export interface FramerCardProps extends HTMLMotionProps<"div"> {
  children?: React.ReactNode;
  tint?: string;
  className?: string;
  hoverRotate?: number;
  hoverScale?: number;
}

export function FramerCard({
  children,
  tint = "rgba(150,150,150,0.08)",
  className = "",
  hoverRotate = 2,
  hoverScale = 1.03,
  style,
  ...props
}: FramerCardProps) {
  return (
    <motion.div
      style={{
        backgroundColor: tint,
        borderRadius: 24,
        border: "1px solid rgba(255, 255, 255, 0.12)",
        backdropFilter: "blur(20px)",
        ...style,
      }}
      animate={{ scale: 1 }}
      whileHover={{ scale: hoverScale, rotate: hoverRotate }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative overflow-hidden p-8 transition-colors hover:border-cyan-400/50 hover:shadow-[0_0_40px_rgba(34,211,238,0.2)] ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
