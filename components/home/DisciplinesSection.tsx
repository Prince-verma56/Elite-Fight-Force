"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { TextReveal } from "@/components/animation/TextReveal";
import { SectionReveal } from "@/components/animation/SectionReveal";
import Image from "next/image";
import { CtaButton } from "@/components/ui/cta-button";

interface DisciplineItem {
  index: string;
  name: string;
  slug: string;
  image: string;
}

interface DisciplinesContent {
  eyebrow: string;
  headline: string[];
  cta: string;
  items: DisciplineItem[];
}

export function DisciplinesSection({
  disciplines,
}: {
  disciplines: DisciplinesContent;
}) {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-fight-black py-20 md:py-28 lg:py-32">
      <div className="eff-container flex items-start justify-between">
        <div>
          <SectionReveal>
            <span className="type-eyebrow text-blood-red">
              {disciplines.eyebrow}
            </span>
          </SectionReveal>
          <TextReveal
            lines={[disciplines.headline.join(" ")]}
            className="mt-4"
            lineClassName="font-heading text-[5.5rem] md:text-[7rem] lg:text-[8.5rem] leading-[0.95] text-off-white tracking-normal uppercase pb-2"
          />
        </div>
        <SectionReveal delay={0.2} className="hidden md:block">
          <CtaButton href="/classes" variant="secondary">
            {disciplines.cta}
          </CtaButton>
        </SectionReveal>
      </div>

      <div className="eff-container mt-14 md:mt-16">
        <div 
          className="hidden gap-2 md:flex md:h-[520px]"
          onMouseLeave={() => setActive(0)}
        >
          {disciplines.items.map((item, i) => {
            const isActive = i === active;
            return (
              <button
                key={item.slug}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group relative h-full overflow-hidden transition-all duration-500 ease-out"
                style={{ flex: isActive ? "2.4" : "1" }}
                aria-label={`View ${item.name}`}
              >
                <Image
                  src={item.image}
                  alt={`${item.name} training at Elite Fight Force`}
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
                    {item.index}
                  </span>
                  <AnimatePresence mode="wait">
                    {isActive ? (
                      <motion.span
                        key={item.slug}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.32, ease: "easeOut" }}
                        className="type-heading-md text-off-white"
                      >
                        {item.name}
                      </motion.span>
                    ) : null}
                  </AnimatePresence>
                </div>
                {!isActive ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-end pb-[5.5rem]">
                    <span className="type-label text-off-white/70 [writing-mode:vertical-lr] rotate-180 whitespace-nowrap tracking-widest">
                      {item.name}
                    </span>
                  </div>
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 md:hidden">
          {disciplines.items.map((item) => (
            <div
              key={item.slug}
              className="relative aspect-[3/4] w-[68vw] shrink-0 snap-start overflow-hidden border border-off-white/10"
            >
              <Image
                src={item.image}
                alt={`${item.name} training at Elite Fight Force`}
                fill
                sizes="68vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-fight-black/90 via-fight-black/10 to-transparent" />
              <span className="type-label absolute left-4 top-4 text-blood-red">
                {item.index}
              </span>
              <span className="type-heading-md absolute inset-x-4 bottom-4 line-clamp-2 text-off-white">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        <SectionReveal className="mt-8 md:hidden">
          <CtaButton href="/classes" variant="secondary">
            {disciplines.cta}
          </CtaButton>
        </SectionReveal>
      </div>
    </section>
  );
}
