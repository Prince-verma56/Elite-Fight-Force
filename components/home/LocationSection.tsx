import Image from "next/image";
import { MapPin, Navigation, ArrowRight, Play, ExternalLink } from "lucide-react";
import { TextReveal } from "@/components/animation/TextReveal";
import { SectionReveal } from "@/components/animation/SectionReveal";
import { MediaPlaceholder } from "@/components/media/MediaPlaceholder";
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
          src="/Images/Bg Images/OurLocationBgMobile.png"
          alt="Our Location background mobile"
          fill
          sizes="100vw"
          className="object-cover object-center md:hidden block"
        />
        <Image
          src="/Images/Bg Images/OurLocationBg.png"
          alt="Our Location background"
          fill
          sizes="100vw"
          className="object-cover object-center hidden md:block"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-fight-black/90 via-fight-black/40 to-transparent max-md:bg-gradient-to-t max-md:from-fight-black/95 max-md:via-fight-black/60" />
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
          lineClassName="font-heading text-[clamp(4.5rem,17vw,8.5rem)] leading-[0.95] text-off-white tracking-normal uppercase pb-2"
        />
        
        <SectionReveal delay={0.15}>
          <div className="flex items-center gap-4 mt-4 md:mt-8">
            <span className="h-0.5 w-16 bg-blood-red" />
            <span className="type-label text-off-white/60 tracking-[0.25em] text-xs">
              TRAIN &nbsp; BELONG &nbsp; GROW
            </span>
          </div>
        </SectionReveal>
      </div>

      <div className="relative z-10 eff-container mt-12 grid grid-cols-1 gap-6 md:mt-16 lg:grid-cols-3 lg:gap-4">
        {/* Address Card */}
        <SectionReveal className="flex flex-col justify-between border border-line/40 p-6 rounded-lg bg-fight-black/40 backdrop-blur-md">
          <div className="flex justify-between items-start">
            <div>
              <MapPin className="size-6 text-blood-red" aria-hidden />
              <p className="type-heading-md mt-4 text-off-white">
                {siteConfig.address}
              </p>
              <p className="type-body-md mt-1 text-off-white/70">
                {siteConfig.suburb} {siteConfig.state} {siteConfig.postcode}
              </p>
            </div>
            <Navigation className="size-5 text-off-white/50" />
          </div>
          <a href="/locations" className="mt-8 flex items-center justify-center gap-2 border border-line/70 py-4 w-full text-xs font-bold uppercase tracking-widest text-off-white transition-colors hover:bg-blood-red hover:border-blood-red">
            {location.cta} <ArrowRight className="size-4" />
          </a>
        </SectionReveal>

        {/* Desktop Pulse Map Pin Card */}
        <SectionReveal
          delay={0.1}
          className="relative aspect-[4/3] overflow-hidden border border-line/70 rounded-lg lg:aspect-auto max-lg:hidden"
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

        {/* Watch Tour Card */}
        <SectionReveal delay={0.2} className="relative overflow-hidden border border-line/40 rounded-lg aspect-[21/9] sm:aspect-[4/3] lg:aspect-auto flex items-center justify-center group cursor-pointer">
          <MediaPlaceholder
            alt="Elite Fight Force gym exterior in Sefton"
            aspect="h-full w-full"
            className="absolute inset-0 h-full w-full"
            label="location-exterior.jpg"
          />
          <div className="absolute inset-0 bg-fight-black/60 transition-colors group-hover:bg-fight-black/40" />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full border border-off-white/40 p-4 bg-fight-black/50 backdrop-blur-sm transition-transform group-hover:scale-110">
              <Play className="size-6 text-off-white" fill="currentColor" />
            </div>
          </div>

          <div className="absolute bottom-5 left-5 z-10">
            <span className="type-label text-off-white/70 block uppercase tracking-widest text-[10px]">
              SEFTON, NSW
            </span>
            <span className="type-heading-sm text-off-white block mt-1 tracking-tight">
              {location.watchTour}
            </span>
          </div>
          <ExternalLink className="absolute bottom-5 right-5 size-5 text-off-white/50" />
        </SectionReveal>
      </div>

      {/* Serving Our Local Area */}
      <SectionReveal delay={0.3} className="relative z-10 eff-container mt-12 md:mt-16">
        <div className="flex items-center gap-4">
          <span className="type-label text-smoke uppercase tracking-widest whitespace-nowrap">
            {location.serviceAreaLabel}
          </span>
          <span className="h-[1px] w-full bg-line/30" />
        </div>
        <div className="mt-6 flex flex-wrap gap-x-3 gap-y-3">
          {location.serviceAreas.map((area) => (
            <span key={area} className="px-5 py-2.5 border border-line/40 rounded-md type-body-sm text-off-white/75 bg-fight-black/40 backdrop-blur-sm transition-colors hover:bg-fight-black hover:text-off-white hover:border-line/80">
              {area}
            </span>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
