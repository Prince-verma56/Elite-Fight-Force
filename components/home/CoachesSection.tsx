import { TextReveal } from "@/components/animation/TextReveal";
import { SectionReveal } from "@/components/animation/SectionReveal";
import { MaskReveal } from "@/components/animation/MaskReveal";
import { MediaPlaceholder } from "@/components/media/MediaPlaceholder";
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
  const featured = roster.find((c) => c.featured) ?? roster[0];
  const secondary = roster.filter((c) => c.id !== featured.id);

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

      <div className="eff-container mt-14 flex flex-col gap-4 md:mt-16 lg:flex-row lg:h-[560px]">
        <MaskReveal className="relative h-[480px] w-full overflow-hidden lg:h-full lg:w-[45%]">
          <MediaPlaceholder
            alt={`${featured.name}, ${featured.role} at Elite Fight Force`}
            aspect="h-full w-full"
            className="h-full w-full"
            label={featured.image.split("/").pop()}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-fight-black/90 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
            <span className="type-heading-lg block text-off-white">
              {featured.name}
            </span>
            <span className="type-label mt-1 block text-blood-red">
              {featured.role}
            </span>
            <span className="type-caption mt-2 block">{featured.record}</span>
          </div>
        </MaskReveal>

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3 lg:h-full lg:w-[55%]">
          {secondary.map((coach, i) => (
            <SectionReveal
              key={coach.id}
              delay={i * 0.08}
              className="relative aspect-[3/4] overflow-hidden sm:aspect-auto sm:h-[400px] lg:h-full"
            >
              <MediaPlaceholder
                alt={`${coach.name}, ${coach.role} at Elite Fight Force`}
                aspect="h-full w-full"
                className="h-full w-full"
                label={coach.image.split("/").pop()}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-fight-black/90 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <span className="type-heading-md block text-off-white">
                  {coach.name}
                </span>
                <span className="type-caption mt-1 block">{coach.role}</span>
              </div>
            </SectionReveal>
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
