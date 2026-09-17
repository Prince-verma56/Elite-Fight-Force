"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { getGsap, ScrollTrigger } from "@/lib/animations/gsap";
import { prefersReducedMotion } from "@/lib/animations/reduced-motion";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  // Runs regardless of reduced-motion/touch: late-loading images and web
  // fonts shift section heights after ScrollTrigger's initial layout pass,
  // leaving reveal triggers pointed at stale pixel offsets (most visible on
  // mobile, where more of the page's total height comes from image-heavy
  // sections). Re-measuring once everything has settled keeps them accurate.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh).catch(() => {});
    return () => window.removeEventListener("load", refresh);
  }, []);

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
