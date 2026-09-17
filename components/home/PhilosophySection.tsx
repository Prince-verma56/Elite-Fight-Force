import { TextReveal } from "@/components/animation/TextReveal";
import { SectionReveal } from "@/components/animation/SectionReveal";
import { MaskReveal } from "@/components/animation/MaskReveal";
import { CtaButton } from "@/components/ui/cta-button";
import Image from "next/image";

interface PhilosophyContent {
  eyebrow: string;
  headline: string[];
  copy: string;
  cta: string;
  values: { word: string; detail: string }[];
  media: {
    primary: { src: string; alt: string };
    secondary: { src: string; alt: string };
  };
}

export function PhilosophySection({
  philosophy,
}: {
  philosophy: PhilosophyContent;
}) {
  return (
    <section className="relative flex flex-col overflow-hidden py-14 md:py-20 lg:min-h-[clamp(700px,85vh,1000px)] lg:py-24">
      <div className="absolute inset-0 z-0">
        <Image
          src="/Images/Bg Images/MoreThanAGym03.png"
          alt="More Than A Gym"
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "85% center" }}
        />
      </div>

      {/* Smooth blurred gradient behind the text only, fading out before the fighter */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-white/70 via-white/20 to-transparent backdrop-blur-lg [mask-image:linear-gradient(to_right,black_40%,transparent_75%)]" />

      <div className="eff-container relative z-10 flex w-full flex-1 flex-col">
        {/* Main Content (Centered Vertically on desktop) */}
        <div className="flex max-w-3xl flex-1 flex-col justify-center py-2 lg:py-8">
          <div>
            <SectionReveal>
              <span className="type-eyebrow text-blood-red">
                {philosophy.eyebrow}
              </span>
            </SectionReveal>

            <TextReveal
              lines={philosophy.headline}
              className="mt-4"
              lineClassName="font-heading text-[5.5rem] md:text-[7rem] lg:text-[8.5rem] leading-none text-fight-black tracking-normal uppercase pb-2"
            />

            <SectionReveal delay={0.15} className="mt-4 max-w-md">
              <p className="type-body-lg text-fight-black/80">
                {philosophy.copy}
              </p>
              <CtaButton
                href="/about"
                className="mt-8 bg-fight-black text-off-white hover:bg-blood-red hover:text-off-white"
              >
                {philosophy.cta}
              </CtaButton>
            </SectionReveal>
          </div>
        </div>

        {/* Values Grid (Pushed to bottom on desktop) */}
        <SectionReveal delay={0.25} className="mt-8 w-full max-w-3xl lg:mt-16">
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-fight-black/15 pt-8 sm:grid-cols-4 sm:gap-x-4 lg:gap-x-8">
            {philosophy.values.map((value, idx) => (
              <div 
                key={value.word} 
                className={`relative ${idx !== 0 ? 'sm:before:absolute sm:before:-left-3 sm:before:top-1 sm:before:h-8 sm:before:w-[2px] sm:before:bg-blood-red/80 lg:before:-left-5' : ''}`}
              >
                <div className="type-heading-md text-fight-black tracking-tight">
                  {value.word}
                </div>
                <div className="type-body-sm mt-1.5 leading-snug text-fight-black/65">
                  {value.detail}
                </div>
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
