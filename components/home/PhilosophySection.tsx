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
    <section className="relative flex flex-col overflow-hidden pt-14 pb-0 md:py-20 lg:min-h-[clamp(700px,85vh,1000px)] lg:py-24">
      <div className="absolute inset-0 z-0">
        <Image
          src="/Images/Bg Images/MoreThanAGymBgPhone.png"
          alt="More Than A Gym Mobile"
          fill
          sizes="100vw"
          className="object-cover md:hidden block"
          style={{ objectPosition: "center center" }}
        />
        <Image
          src="/Images/Bg Images/MoreThanAGym03.png"
          alt="More Than A Gym"
          fill
          sizes="100vw"
          className="object-cover hidden md:block"
          style={{ objectPosition: "85% center" }}
        />
      </div>

      {/* Scrim behind the text on desktop */}
      <div className="absolute inset-0 z-0 hidden bg-gradient-to-r from-white/70 via-white/20 to-transparent backdrop-blur-lg [mask-image:linear-gradient(to_right,black_40%,transparent_75%)] md:block" />

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
              lineClassName="font-heading text-[clamp(2.75rem,13vw,4rem)] md:text-[7rem] lg:text-[8.5rem] leading-[0.95] md:leading-none text-fight-black tracking-normal uppercase pb-2"
            />

            <SectionReveal delay={0.15} className="mt-3 max-w-md md:mt-4">
              <p className="type-body-sm md:type-body-lg text-fight-black/80">
                {philosophy.copy}
              </p>
              <CtaButton
                href="/about"
                className="mt-6 bg-fight-black text-off-white hover:bg-blood-red hover:text-off-white md:mt-8"
              >
                {philosophy.cta}
              </CtaButton>
            </SectionReveal>
          </div>
        </div>

        {/* Values Grid (Pushed to bottom on desktop & Mobile) */}
        <SectionReveal delay={0.25} className="relative z-10 mt-8 w-full md:max-w-3xl lg:mt-16 max-md:mt-auto max-md:w-[100vw] max-md:-ml-6 max-md:px-6 max-md:py-4 max-md:bg-white/10 max-md:backdrop-blur-xl max-md:border-t max-md:border-white/20">
          <div className="grid md:grid-cols-4 gap-x-4 lg:gap-x-8 border-t border-fight-black/15 pt-8 max-md:flex max-md:flex-row max-md:items-center max-md:justify-between max-md:border-none max-md:pt-0">
            {philosophy.values.map((value, idx) => (
              <div 
                key={value.word} 
                className={`relative max-md:flex max-md:flex-col max-md:items-center max-md:text-center ${idx !== 0 ? 'md:before:absolute md:before:-left-3 md:before:top-1 md:before:h-8 md:before:w-[2px] md:before:bg-blood-red/80 lg:before:-left-5' : ''}`}
              >
                <div className="type-heading-md text-fight-black tracking-tight max-md:text-[10px] max-md:uppercase max-md:tracking-widest">
                  {value.word}
                </div>
                <div className="type-body-sm mt-1.5 leading-snug text-fight-black/65 max-md:hidden">
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
