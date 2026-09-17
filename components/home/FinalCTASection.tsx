"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { getGsap, ScrollTrigger } from "@/lib/animations/gsap";
import { easings } from "@/lib/animations/easings";
import { prefersReducedMotion } from "@/lib/animations/reduced-motion";
import { MediaPlaceholder } from "@/components/media/MediaPlaceholder";
import { TextReveal } from "@/components/animation/TextReveal";
import { CtaButton } from "@/components/ui/cta-button";
import { Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

interface FinalCtaContent {
  headline: string[];
  copy: string;
}

export function FinalCTASection({ finalCta }: { finalCta: FinalCtaContent }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!mediaRef.current || prefersReducedMotion()) return;
      const gsap = getGsap();

      gsap.fromTo(
        mediaRef.current,
        { scale: 1 },
        {
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to("[data-cta-line]", {
            scaleX: 1,
            duration: 0.9,
            ease: easings.out3,
          });
        },
      });
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-[65vh] items-center overflow-hidden bg-fight-black py-24 md:min-h-[75vh]"
    >
      <div ref={mediaRef} className="absolute inset-0">
        <MediaPlaceholder
          alt="Fighter training at Elite Fight Force, final call to action"
          aspect="h-full w-full"
          className="h-full w-full"
          label="final-cta.jpg"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-fight-black via-fight-black/70 to-fight-black/40" />
      <div className="absolute inset-0 bg-blood-red/10 mix-blend-multiply" />

      <div className="eff-container relative z-10 text-center">
          <TextReveal
            lines={finalCta.headline}
            className="mt-4 flex flex-col items-center"
            lineClassName="font-heading text-[5.5rem] md:text-[7rem] lg:text-[8.5rem] leading-[0.95] text-off-white tracking-normal uppercase pb-2"
          />
        <p className="type-body-lg mx-auto mt-6 max-w-md text-off-white/80">
          {finalCta.copy}
        </p>

        <span
          data-cta-line
          className="mx-auto mt-8 block h-px w-24 origin-left scale-x-0 bg-off-white/40"
        />

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
          <CtaButton href="/free-trial">Book Your Free Trial</CtaButton>
          <a
            href={`tel:${siteConfig.phone}`}
            className="type-label flex items-center gap-2 text-off-white/85 transition-colors hover:text-off-white"
          >
            <Phone className="size-4" aria-hidden />
            Call {siteConfig.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
