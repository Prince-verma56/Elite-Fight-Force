"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { TextReveal } from "@/components/animation/TextReveal";
import { SectionReveal } from "@/components/animation/SectionReveal";
import { CtaButton } from "@/components/ui/cta-button";
import type { TimetableEntry } from "@/lib/content";

interface TimetableContent {
  eyebrow: string;
  headline: string[];
  cta: string;
}

export function TimetablePreview({
  timetable: content,
  days,
  entries,
}: {
  timetable: TimetableContent;
  days: string[];
  entries: Record<string, TimetableEntry[]>;
}) {
  const [activeDay, setActiveDay] = useState(days[0]);
  const rows = entries[activeDay] ?? [];

  return (
    <section className="bg-bone py-20 md:py-24">
      <div className="eff-container grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <SectionReveal>
            <span className="type-eyebrow text-blood-red">
              {content.eyebrow}
            </span>
          </SectionReveal>
          <TextReveal
            lines={content.headline}
            className="mt-4"
            lineClassName="font-heading text-[5.5rem] md:text-[7rem] lg:text-[8.5rem] leading-[0.95] text-fight-black tracking-normal uppercase pb-2"
          />
          <SectionReveal delay={0.15}>
            <CtaButton
              href="/timetable"
              variant="ghost-light"
              className="mt-8"
            >
              {content.cta}
            </CtaButton>
          </SectionReveal>
        </div>

        <SectionReveal delay={0.1} className="lg:col-span-8">
          <div className="flex gap-1 overflow-x-auto border-b border-fight-black/15 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {days.map((day) => {
              const isActive = activeDay === day;
              return (
                <button
                  key={day}
                  onClick={() => setActiveDay(day)}
                  className={`type-label relative shrink-0 px-4 py-3 transition-colors ${
                    isActive ? "text-fight-black" : "text-fight-black/45 hover:text-fight-black/70"
                  }`}
                >
                  {day}
                  {isActive && (
                    <motion.div
                      layoutId="timetable-active-tab"
                      className="absolute inset-x-0 bottom-[-1px] h-0.5 bg-blood-red"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-2 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDay}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="divide-y divide-fight-black/10"
              >
                {rows.length === 0 ? (
                  <p className="type-body-md py-8 text-fight-black/50">
                    No scheduled classes — rest day.
                  </p>
                ) : (
                  rows.map((row) => (
                    <div
                      key={`${row.time}-${row.className}`}
                      className="group flex items-center justify-between gap-4 py-4 px-2 transition-colors hover:bg-fight-black/5"
                    >
                      <span className="type-heading-md w-28 shrink-0 text-fight-black transition-colors group-hover:text-blood-red">
                        {row.time}
                      </span>
                      <span className="type-body-lg flex-1 text-fight-black/80">
                        {row.className}
                      </span>
                      <span className="type-caption shrink-0">{row.level}</span>
                    </div>
                  ))
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
