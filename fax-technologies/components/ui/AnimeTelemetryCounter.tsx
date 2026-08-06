"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";

interface AnimeTelemetryCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}

export function AnimeTelemetryCounter({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  className = "",
}: AnimeTelemetryCounterProps) {
  const safeEnd = typeof value === "number" && !isNaN(value) ? value : 0;
  const [displayValue, setDisplayValue] = useState(safeEnd);
  const prevValueRef = useRef(safeEnd);

  useEffect(() => {
    const start = prevValueRef.current;
    const end = safeEnd;
    const dummyObj = { val: start };

    const animation = animate(dummyObj, {
      val: end,
      duration: 1000,
      ease: "out(expo)",
      onUpdate: () => {
        setDisplayValue(dummyObj.val);
      },
    });

    prevValueRef.current = safeEnd;

    return () => {
      animation.pause();
    };
  }, [safeEnd]);

  const numVal = typeof displayValue === "number" && !isNaN(displayValue) ? displayValue : 0;
  const formatted = numVal.toFixed(decimals);

  return (
    <span className={`font-mono transition-colors duration-300 ${className}`}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
