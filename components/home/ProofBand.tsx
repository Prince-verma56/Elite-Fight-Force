"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { getGsap, ScrollTrigger } from "@/lib/animations/gsap";
import { easings } from "@/lib/animations/easings";
import { prefersReducedMotion } from "@/lib/animations/reduced-motion";

interface ProofStat {
  value: string;
  label: string;
}

export function ProofBand({ stats }: { stats: ProofStat[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const gsap = getGsap();
      const items = ref.current.querySelectorAll("[data-proof-item]");
      const rules = ref.current.querySelectorAll("[data-proof-rule]");
      const counters =
        ref.current.querySelectorAll<HTMLElement>("[data-proof-value]");
      const reduced = prefersReducedMotion();

      gsap.set(items, { opacity: 0, y: 14 });
      gsap.set(rules, { scaleY: 0 });

      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: easings.out3,
          });
          gsap.to(rules, {
            scaleY: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: easings.out2,
          });

          if (reduced) return;

          counters.forEach((el, i) => {
            const raw = el.dataset.proofValue ?? "";
            const match = raw.match(/^(\d+)(.*)$/);
            if (!match) return;
            const [, digits, suffix] = match;
            const target = Number(digits);
            const counter = { val: 0 };

            gsap.to(counter, {
              val: target,
              duration: 1.1,
              delay: 0.15 + i * 0.08,
              ease: easings.out3,
              onUpdate: () => {
                el.textContent = `${Math.round(counter.val)}${suffix}`;
              },
            });
          });
        },
      });
    },
    { scope: ref }
  );

  return (
    <section className="relative overflow-hidden bg-bone py-7 md:py-9">
      <div
        className="pointer-events-none absolute -left-16 top-1/2 h-40 w-64 -translate-y-1/2 rounded-full bg-blood-red/[0.07] blur-[90px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, rgba(9,10,9,0.5) 0, rgba(9,10,9,0.5) 1px, transparent 1px, transparent 15px)",
        }}
        aria-hidden
      />

      <div
        ref={ref}
        className="eff-container relative grid grid-cols-2 gap-y-6 gap-x-4 sm:flex sm:flex-wrap sm:items-center sm:justify-between"
      >
        {stats.map((stat, i) => (
          <div key={stat.label} className="flex items-center">
            {i !== 0 ? (
              <span
                data-proof-rule
                className="mr-6 hidden h-9 w-px origin-top bg-fight-black/15 md:mr-8 md:block lg:mr-10"
              />
            ) : null}
            <div data-proof-item className="min-w-[110px]">
              <div
                data-proof-value={stat.value}
                className="type-stat text-fight-black"
              >
                {stat.value}
              </div>
              <div className="type-label mt-1 text-fight-black/60">
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
