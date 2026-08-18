"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";

interface MovingTypographyProps {
  text: string;
  direction?: "left" | "right";
  speed?: number;
  className?: string;
}

export function MovingTypography({
  text,
  direction = "left",
  speed = 1,
  className = "",
}: MovingTypographyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });
  const x = useTransform(
    smoothScroll,
    [0, 1],
    direction === "left" ? ["0%", `-${30 * speed}%`] : ["-30%", `${0 * speed}%`]
  );

  return (
    <div ref={containerRef} className="overflow-hidden whitespace-nowrap py-6 select-none pointer-events-none">
      <motion.div style={{ x }} className={`flex items-center gap-12 font-display text-6xl sm:text-8xl font-black uppercase tracking-tighter opacity-15 ${className}`}>
        <span>{text}</span>
        <span className="text-cyan-400">•</span>
        <span>{text}</span>
        <span className="text-brand-purple">•</span>
        <span>{text}</span>
        <span className="text-cyan-400">•</span>
        <span>{text}</span>
      </motion.div>
    </div>
  );
}
