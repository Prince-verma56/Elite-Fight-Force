import Image from "next/image";
import { SectionReveal } from "@/components/animation/SectionReveal";
import { CtaButton } from "@/components/ui/cta-button";
import type { FightResult } from "@/lib/content";

export function RecentFightsSection({
  results,
  quote,
}: {
  results: FightResult[];
  quote: string;
}) {
  return (
    <section className="relative flex items-center min-h-[85vh] overflow-hidden bg-fight-black py-20 lg:min-h-[clamp(760px,95vh,960px)] lg:py-28">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Images/Bg Images/LandingPageBg.png"
          alt="Recent Fights Background"
          fill
          className="object-cover object-right opacity-60 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-fight-black via-fight-black/60 to-transparent" />
      </div>

      <div className="eff-container relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 items-center">
        {/* Left Side: Fights List */}
        {/* Left Side: Fights List inside a Premium Glass Card */}
        <div className="bg-fight-black/40 backdrop-blur-md border border-off-white/10 p-8 md:p-12 relative z-20 shadow-2xl">
          <SectionReveal>
            <h2 className="type-eyebrow text-blood-red mb-8">RECENT FIGHTS</h2>
          </SectionReveal>

          <div className="flex flex-col">
            {results.map((result, idx) => (
              <SectionReveal key={`${result.date}-${idx}`} delay={0.1 * idx}>
                <div className="group flex flex-wrap items-center justify-between gap-4 border-b border-off-white/10 py-5 px-2 transition-all hover:bg-off-white/5 hover:border-blood-red/50 sm:flex-nowrap">
                  <div className="w-24 shrink-0">
                    <span className="type-caption text-off-white/70">
                      {result.date}
                    </span>
                  </div>
                  <div className="flex-1 min-w-[120px]">
                    <span className="type-body-md text-off-white">
                      EFF Fighter
                    </span>
                  </div>
                  <div className="w-16 shrink-0">
                    <span
                      className={`type-heading-sm ${
                        result.result === "Win"
                          ? "text-off-white"
                          : "text-smoke"
                      }`}
                    >
                      {result.result}
                    </span>
                  </div>
                  <div className="flex-1 text-right sm:text-left min-w-[120px]">
                    <span className="type-caption text-off-white/60">
                      {result.note}
                    </span>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.4} className="mt-12">
            <CtaButton href="/fight-team" className="w-full sm:w-auto bg-transparent border border-off-white/30 hover:border-off-white hover:bg-off-white hover:text-fight-black">
              VIEW ALL RESULTS
            </CtaButton>
          </SectionReveal>
        </div>

        {/* Right Side: Floating Quote */}
        <div className="hidden lg:flex h-full w-full items-center justify-center lg:justify-end">
          <SectionReveal delay={0.3} className="relative z-10">
            <p className="font-heading text-5xl md:text-7xl lg:text-[6rem] leading-[0.9] text-off-white/90 transform -rotate-2 max-w-sm text-right pr-12">
              SAME GYM.<br />
              DIFFERENT<br />
              <span className="text-blood-red">LEVEL.</span>
            </p>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
