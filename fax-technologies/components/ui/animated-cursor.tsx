"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function AnimatedCursor() {
  const reducedMotion = usePrefersReducedMotion();
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;

    // Only show on devices with fine pointer (no touch)
    const hasPointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasPointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") ||
          target.closest("a"))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <>
      {/* Outer ring — subtle, no mix-blend-difference */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full border border-white/20"
        animate={{
          x: position.x - (isHovered ? 20 : 14),
          y: position.y - (isHovered ? 20 : 14),
          width: isHovered ? 40 : 28,
          height: isHovered ? 40 : 28,
          opacity: isHovered ? 0.6 : 0.3,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
      />
      {/* Central dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] size-1.5 rounded-full bg-white/60"
        animate={{
          x: position.x - 3,
          y: position.y - 3,
          scale: isHovered ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
      />
    </>
  );
}
