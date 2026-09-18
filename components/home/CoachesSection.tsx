"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { TextReveal } from "@/components/animation/TextReveal";
import { SectionReveal } from "@/components/animation/SectionReveal";
import { CtaButton } from "@/components/ui/cta-button";
import type { Coach } from "@/lib/content";

interface CoachesContent {
  eyebrow: string;
  headline: string[];
  quote: string;
  cta: string;
}

export function CoachesSection({
  coaches: content,
  roster,
}: {
  coaches: CoachesContent;
  roster: Coach[];
}) {
  const [active, setActive] = useState(0);

  const handleNext = () => setActive((prev) => Math.min(roster.length - 1, prev + 1));
  const handlePrev = () => setActive((prev) => Math.max(0, prev - 1));

  return (
    <section className="bg-fight-black py-20 md:py-28 lg:py-32 relative overflow-hidden">
      {/* Mobile Background */}
      <div className="absolute inset-0 z-0 md:hidden pointer-events-none">
        <Image
          src="/Images/Bg Images/OurCoachesMobileBg.png"
          alt="Our Coaches Mobile Background"
          fill
          className="object-cover object-center"
          priority
        />
      </div>
      <div className="eff-container relative z-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end pt-4">
        <div>
          <SectionReveal>
            <div className="flex items-center gap-4">
              <span className="type-eyebrow text-blood-red font-bold tracking-[0.2em] uppercase">
                {content.eyebrow}
              </span>
              <span className="h-px w-12 bg-blood-red/70 block md:hidden" />
            </div>
          </SectionReveal>
          
          <TextReveal
            lines={content.headline}
            className="mt-4 md:mt-4"
            lineClassName="font-heading text-[clamp(4.5rem,15vw,5.5rem)] md:text-[7rem] lg:text-[8.5rem] leading-[0.85] md:leading-[0.95] text-off-white tracking-normal uppercase pb-2"
          />
          <SectionReveal delay={0.1} className="mt-3 md:hidden">
             <p className="text-[9px] font-bold tracking-[0.25em] text-off-white/70 uppercase">
               EXPERIENCE. DISCIPLINE. RESULTS.
             </p>
          </SectionReveal>
        </div>
        <SectionReveal delay={0.15} className="max-w-xs text-left md:text-right mt-2 md:mt-0">
          <p className="font-serif text-lg md:type-heading-md italic text-off-white/90">
            &ldquo;{content.quote}&rdquo;
          </p>
          <span className="type-caption mt-2 block text-off-white/50 tracking-widest">— EFF</span>
        </SectionReveal>
      </div>

      <div className="eff-container mt-14 md:mt-16">
        <div 
          className="hidden gap-2 md:flex md:h-[520px]"
          onMouseLeave={() => setActive(0)}
        >
          {roster.map((coach, i) => {
            const isActive = i === active;
            return (
              <button
                key={coach.id}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group relative h-full overflow-hidden transition-all duration-500 ease-out"
                style={{ flex: isActive ? "2.4" : "1" }}
                aria-label={`View ${coach.name}`}
              >
                <Image
                  src={coach.image}
                  alt={`${coach.name}, ${coach.role} at Elite Fight Force`}
                  fill
                  sizes="(min-width: 1280px) 60vw, (min-width: 768px) 70vw, 100vw"
                  className={`object-cover transition-all duration-700 ${
                    isActive ? "scale-100 grayscale-0 brightness-100" : "scale-105 grayscale-[0.7] brightness-[0.6]"
                  }`}
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-fight-black/85 via-fight-black/10 to-transparent transition-opacity ${
                    isActive ? "opacity-100" : "opacity-70"
                  }`}
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                  <span
                    className={`type-label transition-colors ${
                      isActive ? "text-blood-red" : "text-smoke"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <AnimatePresence mode="wait">
                    {isActive ? (
                      <motion.div
                        key={coach.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.32, ease: "easeOut" }}
                        className="text-right"
                      >
                        <span className="type-heading-md block text-off-white">
                          {coach.name}
                        </span>
                        <span className="type-label block text-blood-red mt-1">
                          {coach.role}
                        </span>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
                {!isActive ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-end pb-[5.5rem]">
                    <span className="type-label text-off-white/70 [writing-mode:vertical-lr] rotate-180 whitespace-nowrap tracking-widest">
                      {coach.name}
                    </span>
                  </div>
                ) : null}
              </button>
            );
          })}
        </div>

        {/* Mobile View - Animated Slider */}
        <div className="relative mt-12 flex h-[460px] w-full items-center justify-center md:hidden">
          {roster.map((coach, i) => {
            const offset = i - active;
            const isActive = offset === 0;
            const isVisible = Math.abs(offset) <= 1;

            if (!isVisible) return null;

            return (
              <motion.div
                key={coach.id}
                animate={{
                  x: `${offset * 105}%`,
                  scale: isActive ? 1 : 0.85,
                  opacity: isActive ? 1 : 0.4,
                  zIndex: isActive ? 10 : 5,
                }}
                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                className={`absolute w-[68vw] h-[420px] overflow-hidden bg-fight-black flex flex-col ${
                  isActive ? "border border-blood-red" : "border border-off-white/10 cursor-pointer"
                }`}
                onClick={() => !isActive && setActive(i)}
              >
                <div className="absolute inset-0 z-0">
                  <Image
                    src={coach.image}
                    alt={`${coach.name}, ${coach.role} at Elite Fight Force`}
                    fill
                    sizes="68vw"
                    className="object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-fight-black/95 via-fight-black/20 to-transparent transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-80'}`} />
                </div>
                
                <div className="relative z-10 flex flex-1 flex-col justify-between p-4 sm:p-5 h-full">
                  <span className={`text-lg font-heading tracking-wider ${isActive ? 'text-blood-red' : 'text-off-white/50'}`}>
                    0{i + 1}
                  </span>
                  
                  <div className="flex flex-col mt-auto">
                    <span className="font-heading text-3xl uppercase tracking-tight text-off-white">
                      {coach.name}
                    </span>
                    <span className={`text-[8px] sm:text-[9px] uppercase tracking-widest mt-1 mb-3 ${isActive ? 'text-blood-red' : 'text-off-white/60'}`}>
                      {coach.role}
                    </span>
                    
                    <AnimatePresence>
                      {isActive && (
                        <motion.p 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-[10px] sm:text-[11px] text-off-white/70 leading-relaxed font-medium pb-2 border-t border-off-white/10 pt-3"
                        >
                          {coach.notes}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    {!isActive && (
                      <div className="absolute bottom-4 right-4 text-off-white/50">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        <div className="mt-8 flex items-center justify-between px-6 md:hidden relative z-10">
          <div className="flex items-center gap-4 w-1/2">
             <span className="type-label font-bold tracking-widest text-off-white/50"><span className="text-blood-red">0{active + 1}</span> / 0{roster.length}</span>
             <div className="flex-1 h-0.5 bg-off-white/20 relative">
               <motion.div 
                 className="absolute left-0 top-0 h-full bg-blood-red" 
                 initial={false}
                 animate={{ width: `${((active + 1) / roster.length) * 100}%` }}
                 transition={{ duration: 0.3 }}
               />
             </div>
          </div>
          <div className="flex items-center gap-3">
             <button onClick={handlePrev} className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${active === 0 ? 'border-off-white/10 text-off-white/30 cursor-not-allowed' : 'border-off-white/30 text-off-white/70 hover:text-white hover:border-off-white/60'}`} disabled={active === 0}>
               <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
             </button>
             <button onClick={handleNext} className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${active === roster.length - 1 ? 'border-off-white/10 text-off-white/30 cursor-not-allowed' : 'border-blood-red text-blood-red hover:bg-blood-red hover:text-white'}`} disabled={active === roster.length - 1}>
               <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
             </button>
          </div>
        </div>
        
        <div className="mt-12 px-6 flex justify-between items-end md:hidden pb-4 relative z-10">
           <div className="flex items-center gap-3">
             <span className="w-8 h-px bg-blood-red" />
             <p className="text-[9px] tracking-[0.25em] font-bold text-off-white/60 leading-relaxed uppercase">
               MORE THAN A GYM,<br/>A STRONGER YOU.
             </p>
           </div>
        </div>
      </div>

      <SectionReveal delay={0.2} className="eff-container mt-10">
        <CtaButton href="/coaches" variant="secondary">
          {content.cta}
        </CtaButton>
      </SectionReveal>
    </section>
  );
}
