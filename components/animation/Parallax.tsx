"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { getGsap } from "@/lib/animations/gsap";
import { prefersReducedMotion } from "@/lib/animations/reduced-motion";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

/** ImageParallax: small vertical drift tied to scroll position. */
export function Parallax({ children, className, strength = 60 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return;
      const gsap = getGsap();

      gsap.fromTo(
        ref.current,
        { y: -strength },
        {
          y: strength,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={`relative ${className ?? ""}`}>
      {children}
    </div>
  );
}
