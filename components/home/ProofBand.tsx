"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { getGsap, ScrollTrigger } from "@/lib/animations/gsap";
import { easings } from "@/lib/animations/easings";

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
        },
      });
    },
    { scope: ref }
  );

  return (
    <section className="bg-bone py-7 md:py-9">
      <div
        ref={ref}
        className="eff-container flex flex-wrap items-center justify-between gap-y-6"
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
              <div className="type-stat text-fight-black">{stat.value}</div>
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
