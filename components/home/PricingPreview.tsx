"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { TextReveal } from "@/components/animation/TextReveal";
import { SectionReveal } from "@/components/animation/SectionReveal";
import { CtaButton } from "@/components/ui/cta-button";
import { getGsap, ScrollTrigger } from "@/lib/animations/gsap";
import { easings } from "@/lib/animations/easings";
import { prefersReducedMotion } from "@/lib/animations/reduced-motion";
import type { PricingPlan } from "@/lib/content";

interface PricingContent {
  eyebrow: string;
  headline: string[];
}

export function PricingPreview({
  pricing: content,
  plans,
}: {
  pricing: PricingContent;
  plans: PricingPlan[];
}) {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!gridRef.current || prefersReducedMotion()) return;
      const gsap = getGsap();
      const featured =
        gridRef.current.querySelector<HTMLElement>("[data-plan-featured]");
      if (!featured) return;

      const restScale = window.matchMedia("(min-width: 768px)").matches
        ? 1.06
        : 1;
      const glow = featured.querySelector<HTMLElement>("[data-plan-glow]");
      gsap.set(featured, { scale: restScale * 0.94 });
      if (glow) gsap.set(glow, { opacity: 0 });

      ScrollTrigger.create({
        trigger: gridRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(featured, {
            scale: restScale,
            duration: 0.9,
            delay: 0.32,
            ease: easings.out4,
          });
          if (glow) {
            gsap.to(glow, {
              opacity: 1,
              duration: 1.1,
              delay: 0.4,
              ease: easings.out2,
            });
          }
        },
      });
    },
    { scope: gridRef }
  );

  return (
    <section className="bg-off-white py-20 md:py-28">
      <div className="eff-container">
        <div className="max-w-2xl">
          <SectionReveal>
            <span className="type-eyebrow text-blood-red">
              {content.eyebrow}
            </span>
          </SectionReveal>
          <TextReveal
            lines={content.headline}
            className="mt-4"
            lineClassName="font-heading text-[5.5rem] md:text-[7rem] lg:text-[8.5rem] leading-[0.95] text-fight-black tracking-normal uppercase pb-2"
          />
        </div>

        <div
          ref={gridRef}
          className="mt-14 grid grid-cols-1 divide-y divide-fight-black/12 border-t border-b border-fight-black/12 md:grid-cols-3 md:divide-x md:divide-y-0"
        >
          {plans.map((plan, i) => (
            <SectionReveal
              key={plan.id}
              delay={i * 0.08}
              data-plan-featured={plan.featured ? "" : undefined}
              className={`relative px-6 py-10 md:px-8 ${
                plan.featured
                  ? "z-10 origin-center bg-fight-black text-off-white motion-reduce:md:scale-[1.06] md:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.35)]"
                  : ""
              }`}
            >
              {plan.featured ? (
                <span
                  data-plan-glow
                  className="pointer-events-none absolute -inset-x-6 -top-10 h-24 rounded-full bg-blood-red/25 blur-3xl"
                  aria-hidden
                />
              ) : null}
              <div className="flex items-center justify-between gap-3">
                <h3
                  className={`type-label ${
                    plan.featured ? "text-smoke" : "text-fight-black/50"
                  }`}
                >
                  {plan.name}
                </h3>
                {plan.badge ? (
                  <span className="type-label shrink-0 whitespace-nowrap text-blood-red">
                    {plan.badge}
                  </span>
                ) : null}
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span
                  className={`type-display-md ${
                    plan.featured ? "text-off-white" : "text-fight-black"
                  }`}
                >
                  {plan.price}
                </span>
                <span
                  className={`type-body-sm ${
                    plan.featured ? "text-smoke" : "text-fight-black/50"
                  }`}
                >
                  {plan.period}
                </span>
              </div>

              <ul className="mt-7 flex flex-col gap-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className={`type-body-sm flex items-start gap-2 ${
                      plan.featured ? "text-off-white/85" : "text-fight-black/75"
                    }`}
                  >
                    <span
                      className={`mt-1.5 size-1 shrink-0 rounded-full ${
                        plan.featured ? "bg-blood-red" : "bg-fight-black/40"
                      }`}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <CtaButton
                href="/free-trial"
                variant={plan.featured ? "primary" : "ghost-light"}
                className={`mt-8 w-full justify-center ${
                  plan.featured ? "" : "!text-fight-black"
                }`}
              >
                {plan.cta}
              </CtaButton>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
