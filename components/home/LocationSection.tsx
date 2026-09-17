import Image from "next/image";
import { MapPin } from "lucide-react";
import { TextReveal } from "@/components/animation/TextReveal";
import { SectionReveal } from "@/components/animation/SectionReveal";
import { MediaPlaceholder } from "@/components/media/MediaPlaceholder";
import { CtaButton } from "@/components/ui/cta-button";
import { siteConfig } from "@/lib/site-config";

interface LocationContent {
  eyebrow: string;
  headline: string[];
  cta: string;
  watchTour: string;
  serviceAreaLabel: string;
  serviceAreas: string[];
}

export function LocationSection({ location }: { location: LocationContent }) {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Images/Bg Images/OurLocationBg.png"
          alt="Our Location background"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div className="relative z-10 eff-container">
        <SectionReveal>
          <span className="type-eyebrow text-blood-red">
            {location.eyebrow}
          </span>
        </SectionReveal>
        <TextReveal
          lines={location.headline}
          className="mt-4"
          lineClassName="font-heading text-[5.5rem] md:text-[7rem] lg:text-[8.5rem] leading-[0.95] text-off-white tracking-normal uppercase pb-2"
        />
      </div>

      <div className="relative z-10 eff-container mt-14 grid grid-cols-1 gap-4 md:mt-16 lg:grid-cols-3">
        <SectionReveal className="flex flex-col justify-between border border-line/70 p-7">
          <div>
            <MapPin className="size-5 text-blood-red" aria-hidden />
            <p className="type-heading-md mt-4 text-off-white">
              {siteConfig.address}
            </p>
            <p className="type-body-md mt-1 text-off-white/70">
              {siteConfig.suburb} {siteConfig.state} {siteConfig.postcode}
            </p>
          </div>
          <CtaButton href="/locations" variant="secondary" className="mt-8">
            {location.cta}
          </CtaButton>
        </SectionReveal>

        <SectionReveal
          delay={0.1}
          className="relative aspect-[4/3] overflow-hidden border border-line/70 lg:aspect-auto"
        >
          <Image
            src="/Images/Bg Images/OurLocationBg.png"
            alt="Elite Fight Force neighborhood in Sefton, NSW"
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover object-center saturate-[0.35] contrast-125"
          />
          <div className="absolute inset-0 bg-fight-black/55" />
          <div
            className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(247,245,240,0.5) 0, rgba(247,245,240,0.5) 1px, transparent 1px, transparent 32px), repeating-linear-gradient(90deg, rgba(247,245,240,0.5) 0, rgba(247,245,240,0.5) 1px, transparent 1px, transparent 32px)",
            }}
            aria-hidden
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="relative mx-auto flex size-8 items-center justify-center">
                <span
                  data-location-pin-ping
                  className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blood-red/50"
                />
                <MapPin
                  className="relative size-7 text-blood-red drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
                  fill="currentColor"
                  fillOpacity={0.15}
                  aria-hidden
                />
              </span>
              <span className="type-label mt-3 block text-off-white">
                Sefton, NSW
              </span>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.2} className="relative overflow-hidden">
          <MediaPlaceholder
            alt="Elite Fight Force gym exterior in Sefton"
            aspect="h-full w-full"
            className="h-full min-h-[220px] w-full"
            label="location-exterior.jpg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-fight-black/85 via-transparent to-transparent" />
          <span className="type-label absolute bottom-5 left-5 text-off-white">
            {location.watchTour}
          </span>
        </SectionReveal>
      </div>

      <SectionReveal delay={0.3} className="relative z-10 eff-container mt-10">
        <div className="border-t border-line/70 pt-6">
          <span className="type-label text-smoke">
            {location.serviceAreaLabel}
          </span>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            {location.serviceAreas.map((area) => (
              <span key={area} className="type-body-sm text-off-white/75">
                {area}
              </span>
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
