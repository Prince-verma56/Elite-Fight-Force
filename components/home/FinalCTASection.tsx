"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { getGsap, ScrollTrigger } from "@/lib/animations/gsap";
import { easings } from "@/lib/animations/easings";
import { prefersReducedMotion } from "@/lib/animations/reduced-motion";
import { TextReveal } from "@/components/animation/TextReveal";
import Image from "next/image";
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
      className="relative flex min-h-[65dvh] items-center overflow-hidden bg-fight-black py-24 md:min-h-[75dvh]"
    >
      <div ref={mediaRef} className="absolute inset-0">
        <Image
          src="/Images/Bg Images/FinalCTABgMobile.png"
          alt="Fighter training at Elite Fight Force mobile"
          fill
          sizes="100vw"
          className="object-cover md:hidden block"
          style={{ objectPosition: "center center" }}
        />
        <Image
          src="/Images/Bg Images/FinalCTABg.png"
          alt="Fighter training at Elite Fight Force, final call to action"
          fill
          sizes="100vw"
          className="object-cover hidden md:block"
          style={{ objectPosition: "center center" }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-fight-black via-fight-black/70 to-fight-black/40" />
      <div className="absolute inset-0 bg-blood-red/10 mix-blend-multiply" />

      <div className="eff-container relative z-10 text-center flex flex-col items-center">
          <TextReveal
            lines={finalCta.headline}
            className="mt-4 flex flex-col items-center [&>div:nth-child(2)]:text-blood-red text-off-white"
            lineClassName="font-heading text-[clamp(4.5rem,16vw,8.5rem)] leading-[0.95] tracking-normal uppercase pb-2"
          />
        <p className="text-sm sm:type-body-lg mx-auto mt-4 sm:mt-6 max-w-md text-off-white/80">
          {finalCta.copy}
        </p>

        <span
          data-cta-line
          className="mx-auto mt-6 sm:mt-8 block h-px w-24 origin-center scale-x-0 bg-off-white/40"
        />

        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-xs sm:max-w-none mx-auto">
          <CtaButton href="/free-trial" className="w-full sm:w-auto justify-center">
            Book Your Free Trial
          </CtaButton>
          <a
            href={`tel:${siteConfig.phone}`}
            className="group flex w-full sm:w-auto items-center justify-center gap-3 border border-off-white/20 bg-transparent py-4 px-8 text-xs font-bold uppercase tracking-[0.1em] text-off-white transition-all hover:border-blood-red hover:bg-blood-red"
          >
            <Phone className="size-4" aria-hidden />
            Call {siteConfig.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
