"use client";

import gsap from "gsap";
import { useLayoutEffect, useEffect } from "react";

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function createGsapContext(callback: gsap.ContextFunc, scope?: string | object | Element) {
  return gsap.context(callback, scope);
}

export { gsap };
