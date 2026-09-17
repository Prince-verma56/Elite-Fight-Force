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

  return (
    <section className="bg-fight-black py-20 md:py-28 lg:py-32">
      <div className="eff-container flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div>
          <SectionReveal>
            <span className="type-eyebrow text-blood-red">
              {content.eyebrow}
            </span>
          </SectionReveal>
          <TextReveal
            lines={content.headline}
            className="mt-4"
            lineClassName="font-heading text-[5.5rem] md:text-[7rem] lg:text-[8.5rem] leading-[0.95] text-off-white tracking-normal uppercase pb-2"
          />
        </div>
        <SectionReveal delay={0.15} className="max-w-xs text-right md:text-right">
          <p className="type-heading-md italic text-off-white/80">
            &ldquo;{content.quote}&rdquo;
          </p>
          <span className="type-caption mt-2 block">— EFF</span>
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

        {/* Mobile View */}
        <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 md:hidden">
          {roster.map((coach, i) => (
            <div
              key={coach.id}
              className="relative aspect-[3/4] w-[68vw] shrink-0 snap-start overflow-hidden border border-off-white/10"
            >
              <Image
                src={coach.image}
                alt={`${coach.name}, ${coach.role} at Elite Fight Force`}
                fill
                sizes="68vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-fight-black/90 via-fight-black/10 to-transparent" />
              <span className="type-label absolute left-4 top-4 text-blood-red">
                0{i + 1}
              </span>
              <div className="absolute inset-x-4 bottom-4 text-right">
                <span className="type-heading-md line-clamp-1 block text-off-white">
                  {coach.name}
                </span>
                <span className="type-label mt-1 line-clamp-1 block text-blood-red">
                  {coach.role}
                </span>
              </div>
            </div>
          ))}
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
