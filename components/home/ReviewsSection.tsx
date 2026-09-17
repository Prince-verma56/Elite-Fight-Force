"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { SectionReveal } from "@/components/animation/SectionReveal";
import { TextReveal } from "@/components/animation/TextReveal";
import Image from "next/image";
import type { Review } from "@/lib/content";
import {
  MarvelLogo,
  PlumbingEliteLogo,
  AmsSolutionsLogo,
  WebDashLogo,
} from "@/components/media/PartnerLogos";

interface ReviewsContent {
  eyebrow: string;
  headline: string[];
  sideNote?: string;
}

const PARTNER_LOGOS = [
  { id: "marvel", Component: MarvelLogo },
  { id: "plumbing", Component: PlumbingEliteLogo },
  { id: "ams-1", Component: AmsSolutionsLogo },
  { id: "webdash", Component: WebDashLogo },
  { id: "ams-2", Component: AmsSolutionsLogo },
];

export function ReviewsSection({
  reviews: content,
  items,
}: {
  reviews: ReviewsContent;
  items: Review[];
}) {
  const [index, setIndex] = useState(0);
  const active = items[index];

  const next = () => setIndex((i) => (i + 1) % items.length);
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);

  // We duplicate logos to ensure seamless marquee loop
  const marqueeLogos = [...PARTNER_LOGOS, ...PARTNER_LOGOS, ...PARTNER_LOGOS];

  return (
    <section className="relative pt-20 md:pt-24 overflow-hidden flex flex-col">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Images/Bg Images/TestimonialsBg.png"
          alt="Testimonials background"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div className="relative z-10 eff-container grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8 pb-16 md:pb-20 flex-1">
        <div className="lg:col-span-4">
          <SectionReveal>
            <span className="type-eyebrow text-blood-red">
              {content.eyebrow}
            </span>
            <TextReveal
              lines={content.headline}
              className="mt-4"
              lineClassName="font-heading text-[5.5rem] md:text-[7rem] lg:text-[8.5rem] leading-[0.95] text-fight-black tracking-normal uppercase pb-2"
            />
            {content.sideNote && (
              <p className="type-heading-md mt-6 italic text-fight-black/40">
                {content.sideNote}
              </p>
            )}
          </SectionReveal>
        </div>

        <div className="flex flex-col lg:col-span-8">
          <div className="min-h-[400px] md:min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="grid items-center gap-8 md:grid-cols-2"
              >
                {active.image && (
                  <div className="relative aspect-square w-full max-w-[320px] overflow-hidden bg-fight-black/5">
                    <Image
                      src={active.image}
                      alt={active.name}
                      fill
                      sizes="320px"
                      className="object-cover grayscale transition-all duration-700 hover:scale-105 hover:grayscale-0"
                    />
                  </div>
                )}
                <div className="relative flex flex-col justify-center">
                  {/* Soft fog backdrop for text readability */}
                  <div className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-off-white/80 blur-3xl" />
                  
                  <div className="flex gap-1 text-blood-red">
                    {Array.from({ length: active.rating }).map((_, i) => (
                      <Star key={i} className="size-4" fill="currentColor" />
                    ))}
                  </div>
                  <p className="type-heading-md mt-5 text-fight-black">
                    &ldquo;{active.quote}&rdquo;
                  </p>
                  <div className="mt-6">
                    <span className="type-body-md block text-fight-black">
                      {active.name}
                    </span>
                    <span className="type-caption">{active.memberType}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center gap-3 border-t border-fight-black/10 pt-6">
            <button
              onClick={prev}
              aria-label="Previous review"
              className="flex size-11 items-center justify-center bg-fight-black text-off-white shadow-md transition-colors hover:bg-blood-red"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              onClick={next}
              aria-label="Next review"
              className="flex size-11 items-center justify-center bg-fight-black text-off-white shadow-md transition-colors hover:bg-blood-red"
            >
              <ChevronRight className="size-4" />
            </button>
            <span className="type-caption ml-2 text-fight-black/70">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(items.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      {/* Partner Logos Marquee */}
      <div className="relative z-10 border-t border-fight-black/10 bg-off-white/60 backdrop-blur-md pt-8 pb-8 mt-auto">
        <div className="flex w-[200%] md:w-max">
          <div className="flex shrink-0 animate-marquee items-center justify-around gap-16 pr-16 md:gap-32 md:pr-32 w-1/2">
            {marqueeLogos.map(({ id, Component }, i) => (
              <div 
                key={`${id}-${i}`} 
                className="h-12 w-auto text-fight-black/40 hover:text-fight-black transition-colors"
              >
                <Component className="h-full w-auto" />
              </div>
            ))}
          </div>
          <div className="flex shrink-0 animate-marquee items-center justify-around gap-16 pr-16 md:gap-32 md:pr-32 w-1/2" aria-hidden="true">
            {marqueeLogos.map(({ id, Component }, i) => (
              <div 
                key={`clone-${id}-${i}`} 
                className="h-12 w-auto text-fight-black/40 hover:text-fight-black transition-colors"
              >
                <Component className="h-full w-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
