"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { audioManager } from "@/lib/experience/engine/AudioManager";

export interface MengToCardProps {
  children: React.ReactNode;
  className?: string;
  tint?: string;
  maxTilt?: number;
  depthZ?: number;
  onClick?: () => void;
}

export function MengToCard({
  children,
  className = "",
  tint = "rgba(255, 255, 255, 0.04)",
  maxTilt = 12,
  depthZ = 40,
  onClick,
}: MengToCardProps) {
  const reducedMotion = usePrefersReducedMotion();

  // Meng To Spring Motion Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Meng To Physics Springs (bouncy & natural response)
  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20 });

  // 3D Rotation Mapping
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${maxTilt}deg`, `-${maxTilt}deg`]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${maxTilt}deg`, `${maxTilt}deg`]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Normalize between -0.5 and 0.5
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseEnter = () => {
    if (reducedMotion) return;
    audioManager.playPulse();
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX: reducedMotion ? 0 : rotateX,
        rotateY: reducedMotion ? 0 : rotateY,
        transformStyle: "preserve-3d",
        backgroundColor: tint,
      }}
      whileHover={{ scale: reducedMotion ? 1 : 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={`group relative overflow-hidden rounded-3xl border border-white/15 p-8 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-colors hover:border-cyan-400/50 hover:shadow-[0_0_50px_rgba(34,211,238,0.25)] ${className}`}
    >
      {/* Meng To Specular Reflection Overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 50% 0%, rgba(255,255,255,0.18), transparent 70%)`,
        }}
      />
      {/* Parallax Content Layer */}
      <div style={{ transform: reducedMotion ? "none" : `translateZ(${depthZ}px)` }}>
        {children}
      </div>
    </motion.div>
  );
}
