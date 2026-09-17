import { TextReveal } from "@/components/animation/TextReveal";
import { SectionReveal } from "@/components/animation/SectionReveal";
import { Parallax } from "@/components/animation/Parallax";
import { MediaPlaceholder } from "@/components/media/MediaPlaceholder";
import { CtaButton } from "@/components/ui/cta-button";
import Image from "next/image";
import type { FightResult } from "@/lib/content";

interface FightTeamContent {
  eyebrow: string;
  headline: string[];
  copy: string;
  media: string;
  cta: string;
  quote: string;
}

export function FightTeamSection({
  fightTeam: content,
  results,
}: {
  fightTeam: FightTeamContent;
  results: FightResult[];
}) {
  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-fight-black lg:min-h-[clamp(760px,95vh,960px)]">
      <div className="absolute inset-0">
        <Parallax strength={50} className="h-full w-full">
          <Image
            src="/Images/Bg Images/Our Fight Team.png"
            alt="Elite Fight Force competition team"
            fill
            sizes="100vw"
            className="object-cover object-[center_30%]"
            priority
          />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-r from-fight-black via-fight-black/70 to-fight-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-fight-black via-transparent to-fight-black/50" />
      </div>

      <div className="eff-container relative z-10 flex min-h-[85vh] flex-col justify-center py-20 lg:min-h-[clamp(760px,95vh,960px)] lg:py-28">
        <div className="max-w-xl">
          <SectionReveal>
            <span className="type-eyebrow text-blood-red">
              {content.eyebrow}
            </span>
          </SectionReveal>
          <TextReveal
            lines={content.headline}
            className="mt-4"
            lineClassName="font-heading text-[clamp(4rem,13vw,8.5rem)] leading-[0.95] text-off-white tracking-normal uppercase pb-2"
          />
          <SectionReveal delay={0.15}>
            <p className="text-sm sm:type-body-lg mt-4 sm:mt-6 max-w-md text-off-white/80">
              {content.copy}
            </p>
            <CtaButton href="/fight-team" className="mt-6 sm:mt-8">
              {content.cta}
            </CtaButton>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
