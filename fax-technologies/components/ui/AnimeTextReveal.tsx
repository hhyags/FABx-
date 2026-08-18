"use client";

import { useEffect, useRef, useCallback } from "react";
import { animate, stagger } from "animejs";

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
  const hasAnimated = useRef(false);
  const words = text.split(" ");

  const runAnimation = useCallback(() => {
    if (hasAnimated.current || !rootRef.current) return;
    hasAnimated.current = true;

    const wordEls = rootRef.current.querySelectorAll(".anime-word");
    if (wordEls.length === 0) return;

    animate(wordEls, {
      opacity: [0, 1],
      translateY: [24, 0],
      duration: 800,
      delay: stagger(staggerSpeed, { start: delay }),
      ease: "out(expo)",
    });
  }, [delay, staggerSpeed]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            runAnimation();
            observer.disconnect();
            break;
          }
        }
      },
      {
        threshold: 0.05,
        rootMargin: "200px 0px",
      }
    );

    observer.observe(el);

    const fallbackTimer = setTimeout(() => {
      if (!hasAnimated.current) {
        runAnimation();
      }
    }, 4000);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, [text, runAnimation]);

  return (
    <Component
      ref={rootRef as unknown as React.Ref<HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>}
      className={`inline-block overflow-hidden ${className}`}
    >
      {words.map((word, idx) => (
        <span
          key={idx}
          className="inline-block overflow-hidden mr-[0.25em]"
          style={{ verticalAlign: "top" }}
        >
          <span
            className="anime-word inline-block transform-gpu font-bold"
            style={{ opacity: 0 }}
          >
            {word}
          </span>
        </span>
      ))}
    </Component>
  );
}
