"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion } from "motion/react";
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
  const [active, setActive] = useState(0);

  const panelTitles = ["REAL PEOPLE", "REAL TRAINING", "REAL STORIES"];
  
  const handleNext = () => setActive((prev) => (prev + 1) % insideEff.panels.length);
  const handlePrev = () => setActive((prev) => (prev - 1 + insideEff.panels.length) % insideEff.panels.length);

  const carouselImages = insideEff.panels.map((src, index) => ({
    src,
    alt: `Elite Fight Force Training Experience ${index + 1}`,
    title: panelTitles[index] || `Effort & Discipline ${index + 1}`
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
      className="relative overflow-hidden bg-fight-black py-20 md:py-32 lg:min-h-[clamp(800px,105vh,1100px)] lg:py-40"
    >
      <div ref={bgRef} className="absolute inset-0 z-0">
        <Image
          src="/Images/Bg Images/InsideEffBgMobile.png"
          alt="Inside Elite Fight Force Mobile Background"
          fill
          sizes="100vw"
          className="object-cover md:hidden block pointer-events-none"
          priority
        />
        {/* Mobile Scrim to darken the bright areas behind text */}
        <div className="absolute inset-0 bg-gradient-to-b from-fight-black/80 via-fight-black/40 to-fight-black/90 md:hidden pointer-events-none" />
        
        <Image
          src="/Images/Bg Images/RealPeopleRealWorkBg.png"
          alt="Inside Elite Fight Force"
          fill
          sizes="100vw"
          className="object-cover opacity-50 hidden md:block"
          style={{ objectPosition: "center top" }}
        />
      </div>

      {/* Strong dark glassmorphism overlay for a minimal, blurred background effect on desktop */}
      <div className="absolute inset-0 z-0 bg-fight-black/80 backdrop-blur-[12px] hidden md:block" />

      <div className="eff-container relative flex flex-col items-start text-left md:items-center md:text-center z-10 pt-4 md:pt-0">
        <SectionReveal>
          <div className="flex items-center gap-4 md:justify-center">
            <span className="type-eyebrow text-blood-red font-bold tracking-[0.2em] uppercase">
              {insideEff.eyebrow}
            </span>
            <span className="h-px w-12 bg-blood-red/70 block md:hidden" />
          </div>
        </SectionReveal>

        <TextReveal
          lines={insideEff.headline}
          className="mt-4 md:mt-4"
          lineClassName="font-heading text-[clamp(4.5rem,16vw,5.5rem)] md:text-[7rem] lg:text-[8.5rem] leading-[0.85] md:leading-[0.95] text-off-white tracking-normal uppercase pb-2"
        />

        <SectionReveal delay={0.1} className="mt-1 md:hidden">
           <div className="text-[12px] md:hidden italic font-serif text-off-white/30 transform -rotate-6 mt-4 ml-2 max-w-[120px] leading-tight">
             MORE THAN A GYM
           </div>
        </SectionReveal>

        <SectionReveal delay={0.15} className="mt-6 md:mt-6 max-w-md">
          <p className="type-body-sm md:type-body-md text-off-white/90 drop-shadow-md">{insideEff.copy}</p>
        </SectionReveal>

        <SectionReveal delay={0.25} className="mt-6 md:mt-8">
          <button
            type="button"
            className="type-label flex items-center gap-4 text-off-white font-bold tracking-widest uppercase transition-colors hover:text-blood-red"
          >
            <span className="flex size-10 md:size-11 items-center justify-center rounded-full border border-off-white/30">
              <Play className="size-3.5 md:size-4 ml-0.5" fill="currentColor" aria-hidden />
            </span>
            {insideEff.cta}
          </button>
        </SectionReveal>

        {/* Mobile View - Custom Looping Slider */}
        <div className="relative mt-16 md:hidden w-full h-[400px] flex items-center justify-center overflow-visible">
          {insideEff.panels.map((src, i) => {
            let offset = i - active;
            if (active === 0 && i === insideEff.panels.length - 1) offset = -1;
            if (active === insideEff.panels.length - 1 && i === 0) offset = 1;

            const isActive = offset === 0;
            const isVisible = Math.abs(offset) <= 1;

            if (!isVisible) return null;

            return (
              <motion.div
                key={i}
                animate={{
                  x: `${offset * 105}%`,
                  scale: isActive ? 1 : 0.85,
                  opacity: isActive ? 1 : 0.4,
                  zIndex: isActive ? 10 : 5,
                }}
                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                className={`absolute w-[60vw] h-[360px] overflow-hidden bg-fight-black flex flex-col rounded-[2rem] ${
                  isActive ? "border border-off-white/20" : "border border-off-white/10 cursor-pointer"
                }`}
                onClick={() => !isActive && setActive(i)}
              >
                <div className="absolute inset-0 z-0">
                  <Image
                    src={src}
                    alt={`Elite Fight Force ${panelTitles[i]}`}
                    fill
                    sizes="60vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-fight-black/95 via-fight-black/10 to-transparent" />
                </div>
                
                <div className="relative z-10 flex flex-1 flex-col justify-between p-5 h-full">
                  <span className={`text-lg font-heading tracking-wider ${isActive ? 'text-blood-red' : 'text-off-white/50'}`}>
                    0{i + 1}
                  </span>
                  
                  <div className="flex flex-row items-end justify-between mt-auto">
                    <span className="font-bold text-[10px] tracking-[0.2em] uppercase text-off-white leading-tight w-24">
                      {panelTitles[i]}
                    </span>
                    
                    {isActive && (
                      <div className="w-10 h-10 rounded-full border border-off-white/30 flex items-center justify-center text-off-white shrink-0">
                        <svg className="w-4 h-4 -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Pagination */}
        <div className="mt-8 flex items-center justify-between px-2 md:hidden w-full relative z-10">
           <button onClick={handlePrev} className="w-10 h-10 rounded-full border border-off-white/20 flex items-center justify-center text-off-white hover:border-off-white/50 transition-colors">
             <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
           </button>
           <div className="flex items-center justify-center gap-1.5 flex-1 mx-4">
             {insideEff.panels.map((_, i) => (
               <div key={i} className="flex-1 h-[3px] bg-off-white/20 rounded-full overflow-hidden relative max-w-[40px]">
                 {i === active && (
                   <motion.div 
                     layoutId="active-indicator"
                     className="absolute inset-0 bg-blood-red rounded-full"
                   />
                 )}
               </div>
             ))}
           </div>
           <button onClick={handleNext} className="w-10 h-10 rounded-full border border-blood-red text-blood-red hover:bg-blood-red hover:text-white flex items-center justify-center transition-colors">
             <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
           </button>
        </div>
        
        {/* Mobile Footer Tags */}
        <div className="mt-12 w-full flex justify-between items-end md:hidden pb-4 relative z-10 px-2 border-t border-off-white/10 pt-6">
           <div className="flex flex-col gap-1">
             <p className="text-[8px] tracking-[0.25em] text-off-white/40 uppercase">DIFFERENT PEOPLE.</p>
             <p className="text-[8px] tracking-[0.25em] text-off-white/40 uppercase">SAME COMMITMENT.</p>
           </div>
           <div className="flex flex-col gap-1 text-right">
             <p className="text-[7px] tracking-[0.2em] text-off-white/40 uppercase">TRAIN<br/>BELONG<br/>GROW</p>
             <span className="w-8 h-[2px] bg-blood-red mt-1 ml-auto transform -rotate-12" />
           </div>
        </div>

        {/* Desktop View */}
        <div ref={panelsRef} className="mt-16 w-full lg:mt-20 hidden md:block">
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
