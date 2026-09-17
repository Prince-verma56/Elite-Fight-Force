"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { SectionReveal } from "@/components/animation/SectionReveal";
import { TextReveal } from "@/components/animation/TextReveal";
import Image from "next/image";
import type { Review } from "@/lib/content";

interface ReviewsContent {
  eyebrow: string;
  headline: string[];
  sideNote: string;
}

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

  return (
    <section className="bg-off-white py-20 md:py-24">
      <div className="eff-container grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
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
            <p className="type-heading-md mt-6 italic text-fight-black/40">
              {content.sideNote}
            </p>
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
                      className="object-cover grayscale transition-all duration-700 hover:scale-105 hover:grayscale-0"
                    />
                  </div>
                )}
                <div className="flex flex-col justify-center">
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

          <div className="mt-10 flex items-center gap-4 border-t border-fight-black/10 pt-6">
            <button
              onClick={prev}
              aria-label="Previous review"
              className="flex size-10 items-center justify-center border border-fight-black/20 text-fight-black transition-colors hover:border-fight-black"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              onClick={next}
              aria-label="Next review"
              className="flex size-10 items-center justify-center border border-fight-black/20 text-fight-black transition-colors hover:border-fight-black"
            >
              <ChevronRight className="size-4" />
            </button>
            <span className="type-caption ml-2">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(items.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
