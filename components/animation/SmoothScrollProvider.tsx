"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { getGsap, ScrollTrigger } from "@/lib/animations/gsap";
import { prefersReducedMotion } from "@/lib/animations/reduced-motion";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    // Coarse-pointer (touch) devices already get well-tuned native momentum
    // scrolling; layering Lenis on top there fights the OS scroll physics
    // and is the primary source of scroll jank on phones.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const gsap = getGsap();
    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
