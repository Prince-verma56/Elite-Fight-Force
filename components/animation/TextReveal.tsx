"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { getGsap, ScrollTrigger } from "@/lib/animations/gsap";
import { easings } from "@/lib/animations/easings";
import { prefersReducedMotion } from "@/lib/animations/reduced-motion";

interface TextRevealProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
  accentWord?: string;
  accentClassName?: string;
  delay?: number;
}

/** LineMaskReveal: each line slides upward out of a clipped container. Use for H1/H2 statements. */
export function TextReveal({
  lines,
  className,
  lineClassName,
  accentWord,
  accentClassName = "text-blood-red",
  delay = 0,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      if (prefersReducedMotion()) return;
      const gsap = getGsap();
      const rows = ref.current.querySelectorAll<HTMLElement>("[data-reveal-row]");

      gsap.set(rows, { y: "110%" });

      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(rows, {
            y: "0%",
            duration: 0.9,
            delay,
            stagger: 0.08,
            ease: easings.expoOut,
          });
        },
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) => (
        <div key={`${line}-${i}`} className="overflow-hidden">
          <div data-reveal-row className={lineClassName}>
            {line === accentWord ? (
              <span className={accentClassName}>{line}</span>
            ) : (
              line
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
