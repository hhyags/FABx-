"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function AnimatedCursor() {
  const reducedMotion = usePrefersReducedMotion();
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for outer ring
  const ringX = useSpring(mouseX, { stiffness: 350, damping: 28 });
  const ringY = useSpring(mouseY, { stiffness: 350, damping: 28 });

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;

    // Only show on devices with fine pointer (no touch)
    const hasPointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasPointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Direct motion value updates — 0 React re-renders on mousemove!
      mouseX.set(e.clientX - 14);
      mouseY.set(e.clientY - 14);

      const target = e.target as HTMLElement | null;
      const hovered = Boolean(
        target &&
          (target.tagName === "BUTTON" ||
            target.tagName === "A" ||
            target.closest("button") ||
            target.closest("a"))
      );

      // Only update state when hover state actually changes
      setIsHovered((prev) => (prev !== hovered ? hovered : prev));
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [reducedMotion, mouseX, mouseY]);

  if (reducedMotion) return null;

  return (
    <>
      {/* Outer ring — smooth spring, zero React re-renders on move */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full border border-white/20"
        style={{
          x: ringX,
          y: ringY,
          width: isHovered ? 40 : 28,
          height: isHovered ? 40 : 28,
          opacity: isHovered ? 0.6 : 0.3,
        }}
      />
      {/* Central dot — direct motion value tracking */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] size-1.5 rounded-full bg-white/60"
        style={{
          x: mouseX,
          y: mouseY,
          scale: isHovered ? 0 : 1,
        }}
      />
    </>
  );
}
