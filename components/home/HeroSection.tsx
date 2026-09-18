"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { getGsap } from "@/lib/animations/gsap";
import { easings } from "@/lib/animations/easings";
import { prefersReducedMotion } from "@/lib/animations/reduced-motion";
import { MediaPlaceholder } from "@/components/media/MediaPlaceholder";
import { CtaButton } from "@/components/ui/cta-button";
import type { HeroContent } from "@/lib/content";

export function HeroSection({ hero }: { hero: HeroContent }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const mediaInnerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const gsap = getGsap();
      const reduced = prefersReducedMotion();
      const rows = rootRef.current?.querySelectorAll<HTMLElement>(
        "[data-hero-row]"
      );
      const fadeEls = rootRef.current?.querySelectorAll<HTMLElement>(
        "[data-hero-fade]"
      );

      // The hero starts in its hidden state via the `.hero-pre-animate` CSS
      // class (applied in markup) so nothing flashes fully-visible before
      // GSAP takes over; this always removes it, reduced-motion or not.
      rootRef.current?.classList.remove("hero-pre-animate");

      if (reduced) return;

      gsap.set(mediaInnerRef.current, { scale: 1.18 });
      gsap.set(rows ?? [], { y: "115%" });
      gsap.set(fadeEls ?? [], { opacity: 0, y: 16 });

      const tl = gsap.timeline({ delay: 0.15 });

      tl.to(mediaInnerRef.current, {
        scale: 1.02,
        duration: 1.8,
        ease: easings.out4,
      })
        .to(
          rows ?? [],
          {
            y: "0%",
            duration: 1,
            stagger: 0.07,
            ease: easings.expoOut,
          },
          0.25
        )
        .to(
          fadeEls ?? [],
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: easings.out3,
          },
          0.9
        );

      // Background fade drift on scroll (removed scale increase as requested)

      gsap.to("[data-hero-content]", {
        y: -60,
        opacity: 0.4,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className="hero-pre-animate relative flex min-h-[100dvh] w-full flex-col overflow-hidden bg-fight-black lg:min-h-[clamp(700px,92dvh,980px)]"
    >
      <div
        ref={mediaRef}
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: "inset(0% 0% 0% 0%)" }}
      >
        <div
          ref={mediaInnerRef}
          data-hero-media-inner
          className="h-full w-full relative"
        >
          {hero.media.src.includes("placeholder") ? (
            <MediaPlaceholder
              alt={hero.media.alt}
              aspect="h-full w-full"
              className="h-full w-full"
              label="hero-placeholder.jpg"
            />
          ) : (
            <>
              {hero.media.mobileSrc && (
                <Image
                  src={hero.media.mobileSrc}
                  alt={hero.media.alt}
                  fill
                  sizes="100vw"
                  className="object-cover md:hidden block"
                  style={{ objectPosition: "center 10%" }}
                  fetchPriority="high"
                />
              )}
              <Image
                src={hero.media.src}
                alt={hero.media.alt}
                fill
                sizes="100vw"
                className={`object-cover ${
                  hero.media.mobileSrc ? "hidden md:block" : ""
                }`}
                style={{ objectPosition: "85% center" }}
                fetchPriority="high"
              />
            </>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-fight-black/60 md:from-fight-black via-fight-black/40 md:via-fight-black/55 to-fight-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-fight-black via-fight-black/20 md:via-transparent to-fight-black/40 md:to-fight-black/40" />
      </div>

      <div
        data-hero-content
        className="eff-container relative z-10 flex flex-1 flex-col gap-0 sm:gap-6 pt-28 pb-8 sm:pb-12 md:pt-40"
      >
        <div data-hero-fade className="flex items-start justify-between w-full text-off-white">
          <div className="flex items-start gap-2">
            <svg className="w-3.5 h-3.5 text-blood-red mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase">{hero.eyebrow}</span>
              <span className="text-[9px] text-off-white/60 tracking-[0.15em] uppercase mt-1">{hero.eyebrowSecondary}</span>
            </div>
          </div>
          
          <div className="flex flex-col items-start border-b border-blood-red/70 pb-1">
            <span className="text-[8px] sm:text-[9px] text-off-white/70 tracking-[0.2em] uppercase leading-tight">DISCIPLINE</span>
            <span className="text-[8px] sm:text-[9px] text-off-white/70 tracking-[0.2em] uppercase leading-tight">BUILDS</span>
            <span className="text-[8px] sm:text-[9px] text-off-white/70 tracking-[0.2em] uppercase leading-tight">FREEDOM</span>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-end pb-8 sm:pb-0 sm:justify-center items-start text-left max-w-4xl mt-12 sm:mt-0">
          <div className="flex flex-col gap-0 items-start">
            <span data-hero-fade className="text-blood-red text-[10px] sm:text-xs font-bold tracking-[0.2em] mb-2 sm:mb-4 uppercase">
              Elite Fight Force
            </span>
            {hero.headline.map((word, i) => (
              <div key={`${word}-${i}`} className="overflow-hidden pb-0">
                <div
                  data-hero-row
                  className="font-heading text-[clamp(2.5rem,9.5vw,5.5rem)] leading-[0.95] tracking-tight uppercase text-off-white flex flex-wrap justify-start gap-x-2"
                >
                  {word.split(" ").map((w, wIdx) => (
                    <span
                      key={wIdx}
                      className={
                        w === hero.headlineAccentWord ? "text-blood-red" : ""
                      }
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div data-hero-fade className="mt-3 sm:mt-5 text-[8.5px] sm:text-[10px] font-bold tracking-[0.25em] uppercase text-off-white/70 leading-loose max-w-sm">
             BOXING <span className="text-blood-red mx-1.5">/</span> MMA <span className="text-blood-red mx-1.5">/</span> MUAY THAI<br/>
             STRENGTH <span className="text-blood-red mx-1.5">/</span> CONDITIONING
          </div>

          <p
            data-hero-fade
            className="text-sm sm:type-body-lg mt-3 sm:mt-5 max-w-[280px] sm:max-w-md text-off-white/85 leading-relaxed"
          >
            {hero.supportingCopy}
          </p>

          <div
            data-hero-fade
            className="mt-5 sm:mt-7 flex flex-row items-center justify-start gap-3 sm:gap-6 w-full"
          >
            <Link
              href="/free-trial"
              className="bg-blood-red hover:bg-blood-red/90 text-off-white px-4 sm:px-6 py-3 sm:py-3.5 flex items-center justify-center gap-2 sm:gap-3 transition-colors shrink-0"
            >
              <span className="tracking-[0.1em] text-[9px] sm:text-[10px] font-bold uppercase">Book Your Free Trial</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0.5">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            
            <Link
              href="/about"
              className="group flex flex-row items-center gap-2 sm:gap-3 transition-colors hover:text-off-white text-off-white/85 shrink-0"
            >
              <div className="flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-off-white/30 group-hover:border-off-white/70 transition-colors">
                <svg className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-current ml-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="text-[7.5px] sm:text-[8.5px] font-bold tracking-[0.2em] uppercase text-left leading-tight">
                Watch<br/>Our Story
              </span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
