"use client";

import { useEffect, useRef } from "react";
import { animate, createScope, stagger } from "animejs";

interface AnimeTextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  staggerSpeed?: number;
}

export function AnimeTextReveal({
  text,
  className = "",
  as: Component = "h2",
  delay = 100,
  staggerSpeed = 40,
}: AnimeTextRevealProps) {
  const rootRef = useRef<HTMLElement>(null);
  const scopeRef = useRef<any>(null);
  const words = text.split(" ");

  useEffect(() => {
    if (!rootRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            scopeRef.current = createScope({ root: rootRef }).add(() => {
              animate(".anime-word", {
                opacity: [0, 1],
                translateY: [24, 0],
                duration: 800,
                delay: stagger(staggerSpeed, { start: delay }),
                ease: "out(expo)",
              });
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(rootRef.current);

    return () => {
      observer.disconnect();
      scopeRef.current?.revert();
    };
  }, [text, delay, staggerSpeed]);

  return (
    <Component ref={rootRef as any} className={`inline-block overflow-hidden ${className}`}>
      {words.map((word, idx) => (
        <span key={idx} className="inline-block overflow-hidden mr-[0.25em] vertical-align-top">
          <span className="anime-word inline-block opacity-0 transform-gpu font-bold">
            {word}
          </span>
        </span>
      ))}
    </Component>
  );
}
