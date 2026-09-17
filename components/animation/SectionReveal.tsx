"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { getGsap, ScrollTrigger } from "@/lib/animations/gsap";
import { easings } from "@/lib/animations/easings";

interface SectionRevealProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
  y?: number;
  duration?: number;
  delay?: number;
  as?: "div" | "section";
}

/** Basic upward opacity/transform reveal for standard content sections (Level 2). */
export function SectionReveal({
  children,
  className,
  y = 40,
  duration = 0.9,
  delay = 0,
  as = "div",
  ...props
}: SectionRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const gsap = getGsap();

      gsap.set(ref.current, { y, opacity: 0 });

      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(ref.current, {
            y: 0,
            opacity: 1,
            duration,
            delay,
            ease: easings.out3,
          });
        },
      });
    },
    { scope: ref }
  );

  const Tag = as as any;
  return (
    <Tag ref={ref} className={className} {...props}>
      {children}
    </Tag>
  );
}
