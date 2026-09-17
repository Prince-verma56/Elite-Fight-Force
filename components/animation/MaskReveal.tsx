"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { getGsap, ScrollTrigger } from "@/lib/animations/gsap";
import { easings } from "@/lib/animations/easings";
import { prefersReducedMotion } from "@/lib/animations/reduced-motion";

interface MaskRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
}

/** SectionMask / MediaMaskOpen: content reveals through a clipped container. Use for image-heavy scenes. */
export function MaskReveal({
  children,
  className,
  direction = "up",
}: MaskRevealProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!wrapRef.current || !innerRef.current) return;
      if (prefersReducedMotion()) return;
      const gsap = getGsap();

      const clipFrom =
        direction === "up"
          ? "inset(100% 0% 0% 0%)"
          : direction === "left"
            ? "inset(0% 100% 0% 0%)"
            : "inset(0% 0% 0% 100%)";

      gsap.set(wrapRef.current, { clipPath: clipFrom });
      gsap.set(innerRef.current, {
        scale: 1.15,
        y: direction === "up" ? 40 : 0,
      });

      let played = false;
      const play = () => {
        if (played) return;
        played = true;
        gsap.to(wrapRef.current, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.1,
          ease: easings.expoOut,
        });
        gsap.to(innerRef.current, {
          scale: 1,
          y: 0,
          duration: 1.3,
          ease: easings.out4,
        });
      };

      ScrollTrigger.create({
        trigger: wrapRef.current,
        start: "top 80%",
        once: true,
        onEnter: play,
        // Same already-past-start safety net as SectionReveal/TextReveal.
        onRefresh: (self) => {
          if (self.progress > 0) play();
        },
      });
    },
    { scope: wrapRef }
  );

  return (
    <div ref={wrapRef} className={className}>
      <div ref={innerRef} className="h-full w-full">
        {children}
      </div>
    </div>
  );
}
