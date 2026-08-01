"use client";

import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { audioManager } from "@/lib/experience/engine/AudioManager";

interface NoomoCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function NoomoCard({ children, className = "", onClick }: NoomoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Calculate 3D tilt angle (max 12 deg)
    const rY = (mouseX / (rect.width / 2)) * 12;
    const rX = -(mouseY / (rect.height / 2)) * 12;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    audioManager.playPulse();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ transformStyle: "preserve-3d" }}
      animate={{
        rotateX,
        rotateY,
        scale: isHovered ? 1.03 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative cursor-pointer rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-colors hover:border-cyan-400/50 hover:shadow-[0_0_50px_rgba(34,211,238,0.25)] ${className}`}
    >
      {/* Glare specular reflection highlight overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: isHovered
            ? `radial-gradient(circle at 50% 0%, rgba(255,255,255,0.15), transparent 70%)`
            : "none",
        }}
      />
      <div style={{ transform: "translateZ(30px)" }}>{children}</div>
    </motion.div>
  );
}
