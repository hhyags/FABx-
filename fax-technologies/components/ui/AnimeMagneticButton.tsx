"use client";

import { useRef, ReactNode, MouseEvent } from "react";
import { animate, spring } from "animejs";

interface AnimeMagneticButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  magneticStrength?: number;
}

export function AnimeMagneticButton({
  children,
  onClick,
  href,
  className = "",
  magneticStrength = 0.35,
}: AnimeMagneticButtonProps) {
  const btnRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * magneticStrength;
    const distanceY = (e.clientY - centerY) * magneticStrength;

    animate(btnRef.current, {
      translateX: distanceX,
      translateY: distanceY,
      duration: 400,
      ease: "out(quad)",
    });
  };

  const handleMouseLeave = () => {
    if (!btnRef.current) return;
    animate(btnRef.current, {
      translateX: 0,
      translateY: 0,
      duration: 800,
      ease: spring({ bounce: 0.5, mass: 0.9 }),
    });
  };

  const handleMouseDown = () => {
    if (!btnRef.current) return;
    animate(btnRef.current, {
      scale: 0.94,
      duration: 200,
      ease: "out(cubic)",
    });
  };

  const handleMouseUp = () => {
    if (!btnRef.current) return;
    animate(btnRef.current, {
      scale: 1,
      duration: 600,
      ease: spring({ bounce: 0.6, mass: 0.8 }),
    });
  };

  if (href) {
    return (
      <a
        ref={btnRef as unknown as React.Ref<HTMLAnchorElement>}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onClick={onClick}
        className={`inline-flex items-center justify-center transition-shadow cursor-pointer select-none ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={btnRef as unknown as React.Ref<HTMLButtonElement>}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={onClick}
      className={`inline-flex items-center justify-center transition-shadow cursor-pointer select-none ${className}`}
    >
      {children}
    </button>
  );
}
