"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { getGsap, ScrollTrigger } from "@/lib/animations/gsap";
import { easings } from "@/lib/animations/easings";
import { prefersReducedMotion } from "@/lib/animations/reduced-motion";

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
      if (prefersReducedMotion()) return;
      const gsap = getGsap();

      gsap.set(ref.current, { y, opacity: 0 });

      let played = false;
      const play = () => {
        if (played) return;
        played = true;
        gsap.to(ref.current, {
          y: 0,
          opacity: 1,
          duration,
          delay,
          ease: easings.out3,
        });
      };

      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 85%",
        once: true,
        onEnter: play,
        // If the trigger's start line is already scrolled past by the time
        // this refresh runs (short mobile viewport, restored scroll position,
        // or a layout shift from a late-loading image), onEnter never fires
        // and the element would stay stuck at opacity:0 forever — catch that
        // here and snap straight to the revealed state instead.
        onRefresh: (self) => {
          if (self.progress > 0) play();
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
