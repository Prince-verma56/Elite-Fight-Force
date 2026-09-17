"use client";

import { useRef, type ReactNode } from "react";
import { animate } from "motion/react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

/** MagneticCTA: desktop-only pointer attraction. Disabled on touch devices. */
export function MagneticButton({
  children,
  className,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    animate(ref.current, { x, y }, { duration: 0.3, ease: "easeOut" });
  };

  const handleLeave = () => {
    if (!ref.current) return;
    animate(ref.current, { x: 0, y: 0 }, { duration: 0.4, ease: "easeOut" });
  };

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={className}
    >
      {children}
    </div>
  );
}
