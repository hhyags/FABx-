"use client";

import { useRef, ReactNode, MouseEvent } from "react";
import { animate, spring } from "animejs";

interface AnimeCardHoverProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export function AnimeCardHover({
  children,
  className = "",
  glowColor = "rgba(14, 165, 233, 0.15)",
}: AnimeCardHoverProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * 6;
    const rotateY = ((x - centerX) / centerX) * 6;

    animate(cardRef.current, {
      rotateX,
      rotateY,
      duration: 350,
      ease: "out(quad)",
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    animate(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 750,
      ease: spring({ bounce: 0.4, mass: 1 }),
    });
  };

  const handleMouseEnter = () => {
    if (!cardRef.current) return;
    animate(cardRef.current, {
      scale: 1.015,
      duration: 400,
      ease: "out(expo)",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
      className={`relative transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}
