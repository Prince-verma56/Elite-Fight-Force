"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { TextReveal } from "@/components/animation/TextReveal";
import { SectionReveal } from "@/components/animation/SectionReveal";
import { Play } from "lucide-react";
import { Carousel_006 } from "@/components/ui/skiper-ui/skiper54";
import Image from "next/image";
import { getGsap, ScrollTrigger } from "@/lib/animations/gsap";
import { easings } from "@/lib/animations/easings";
import { prefersReducedMotion } from "@/lib/animations/reduced-motion";

interface InsideEffContent {
  eyebrow: string;
  headline: string[];
  sideMarkers: string[];
  copy: string;
  cta: string;
  panels: string[];
}

export function TrainingExperience({
  insideEff,
}: {
  insideEff: InsideEffContent;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);

  const carouselImages = insideEff.panels.map((src, index) => ({
    src,
    alt: `Elite Fight Force Training Experience ${index + 1}`,
    title: `Effort & Discipline ${index + 1}`
  }));

  useGSAP(
    () => {
      if (!rootRef.current || prefersReducedMotion()) return;
      const gsap = getGsap();

      // Signature-scene depth: background drifts slowly behind the panels,
      // never rotating — a slow scale/parallax read as distance.
      if (bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { scale: 1.08, yPercent: -4 },
          {
            scale: 1.18,
            yPercent: 4,
            ease: "none",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      // Panels arrive from depth (perspective push) after copy settles.
      if (panelsRef.current) {
        gsap.set(panelsRef.current, {
          y: 60,
          scale: 0.94,
          opacity: 0,
          transformPerspective: 1000,
        });

        let played = false;
        const play = () => {
          if (played) return;
          played = true;
          gsap.to(panelsRef.current, {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: easings.out4,
          });
        };

        ScrollTrigger.create({
          trigger: panelsRef.current,
          start: "top 88%",
          once: true,
          onEnter: play,
          onRefresh: (self) => {
            if (self.progress > 0) play();
          },
        });
      }
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden bg-fight-black py-24 md:py-32 lg:min-h-[clamp(800px,105vh,1100px)] lg:py-40"
    >
      <div ref={bgRef} className="absolute inset-0 z-0">
        <Image
          src="/Images/Bg Images/RealPeopleRealWorkBg.png"
          alt="Inside Elite Fight Force"
          fill
          sizes="100vw"
          className="object-cover opacity-50"
          style={{ objectPosition: "center top" }}
        />
      </div>

      {/* Strong dark glassmorphism overlay for a minimal, blurred background effect */}
      <div className="absolute inset-0 z-0 bg-fight-black/80 backdrop-blur-[12px]" />

      <div className="eff-container relative flex flex-col items-center text-center">
        <SectionReveal>
          <span className="type-eyebrow text-blood-red">
            {insideEff.eyebrow}
          </span>
        </SectionReveal>

        <TextReveal
          lines={insideEff.headline}
          className="mt-4"
          lineClassName="font-heading text-[5.5rem] md:text-[7rem] lg:text-[8.5rem] leading-[0.95] text-off-white tracking-normal uppercase pb-2"
        />

        <SectionReveal delay={0.15} className="mt-6 max-w-md">
          <p className="type-body-md text-off-white/70">{insideEff.copy}</p>
        </SectionReveal>

        <SectionReveal delay={0.25}>
          <button
            type="button"
            className="type-label mt-8 flex items-center gap-3 text-off-white transition-colors hover:text-blood-red"
          >
            <span className="flex size-11 items-center justify-center rounded-full border border-off-white/30">
              <Play className="size-4" fill="currentColor" aria-hidden />
            </span>
            {insideEff.cta}
          </button>
        </SectionReveal>

        <div ref={panelsRef} className="mt-16 w-full lg:mt-20">
          <div className="mx-auto flex h-[500px] w-full max-w-[1400px] items-center justify-center">
            <Carousel_006
              images={carouselImages}
              className="w-full"
              showPagination={true}
              showNavigation={true}
              loop={true}
              autoplay={true}
            />
          </div>
        </div>

        <div className="mt-16 hidden gap-10 lg:flex">
          {insideEff.sideMarkers.map((marker) => (
            <span key={marker} className="type-label text-smoke">
              {marker}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
