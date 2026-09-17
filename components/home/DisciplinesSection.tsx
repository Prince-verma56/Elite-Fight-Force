"use client";

import { useState } from "react";
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
                  {isActive ? (
                    <span className="type-heading-md text-off-white">
                      {item.name}
                    </span>
                  ) : null}
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

        <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 md:hidden">
          {disciplines.items.map((item) => (
            <div
              key={item.slug}
              className="relative aspect-[3/4] w-[62vw] shrink-0 snap-start overflow-hidden"
            >
              <Image
                src={item.image}
                alt={`${item.name} training at Elite Fight Force`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-fight-black/85 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
                <span className="type-label text-blood-red">
                  {item.index}
                </span>
                <span className="type-heading-md text-off-white">
                  {item.name}
                </span>
              </div>
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
