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

      // HeroScrollCollapse + background scale drift on scroll
      gsap.to(mediaInnerRef.current, {
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

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
      className="hero-pre-animate relative flex min-h-dvh flex-col bg-fight-black lg:min-h-[clamp(700px,92dvh,980px)]"
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
        <div className="absolute inset-0 bg-gradient-to-r from-fight-black via-fight-black/55 to-fight-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-fight-black via-transparent to-fight-black/40" />
      </div>

      <div
        data-hero-content
        className="eff-container relative z-10 flex flex-1 flex-col gap-0 sm:gap-6 pt-24 pb-4 sm:pb-8 md:pt-28"
      >
        <div data-hero-fade className="flex items-center gap-3 text-off-white">
          <span className="w-0.5 h-4 bg-blood-red" />
          <span className="type-eyebrow font-bold tracking-[0.15em]">{hero.eyebrow}</span>
          <span className="h-3 w-px bg-off-white/30" />
          <span className="type-eyebrow text-smoke tracking-[0.15em]">
            {hero.eyebrowSecondary}
          </span>
        </div>

        <div className="flex flex-1 flex-col justify-end pb-4 sm:pb-0 sm:justify-center max-w-4xl mt-12 sm:mt-0">
          <div className="flex flex-col gap-0 sm:gap-0">
            <span data-hero-fade className="text-blood-red text-[9px] sm:text-xs font-bold tracking-[0.2em] mb-1 sm:mb-4 uppercase">
              Elite Fight Force
            </span>
            {hero.headline.map((word, i) => (
              <div key={`${word}-${i}`} className="overflow-hidden pb-0">
                <div
                  data-hero-row
                  className="font-heading text-[clamp(2.75rem,11vw,7.5rem)] leading-[0.9] tracking-normal uppercase text-off-white flex flex-wrap gap-[0.25em]"
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

          <p
            data-hero-fade
            className="text-sm sm:type-body-lg mt-2 sm:mt-5 max-w-xs sm:max-w-md text-off-white/85"
          >
            {hero.supportingCopy}
          </p>

          <div
            data-hero-fade
            className="mt-4 sm:mt-8 flex flex-col items-start gap-3 sm:gap-6"
          >
            <CtaButton
              href="/free-trial"
              className="w-[280px] sm:w-[320px] justify-between sm:justify-between [clip-path:polygon(0_0,100%_0,calc(100%-1.5rem)_100%,0_100%)] pr-12 group"
            >
              <span className="tracking-[0.1em] text-xs font-bold uppercase">Book Your Free Trial</span>
            </CtaButton>
            <div className="flex items-center gap-4">
              <Link
                href="/about"
                className="group flex items-center gap-4 transition-colors hover:text-off-white text-off-white/85"
              >
                <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-off-white/30 group-hover:border-off-white/70 transition-colors">
                  <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current ml-0.5" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">Watch Our Story</span>
              </Link>
              <span className="hidden sm:block h-px w-16 bg-off-white/30" />
            </div>
          </div>
        </div>

        <div
          data-hero-fade
          className="mt-auto flex items-end justify-between pt-0 pb-4 sm:pt-5 sm:pb-5"
        >
          <div className="flex items-center gap-6">
            <span className="type-label text-off-white font-bold tracking-widest">{hero.sectionIndex}</span>
            <div className="flex items-center gap-2">
              <span className="w-8 h-0.5 bg-blood-red" />
              <span className="w-8 h-0.5 bg-off-white/20" />
              <span className="w-8 h-0.5 bg-off-white/20" />
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 text-off-white">
            <span className="type-label [writing-mode:vertical-rl] tracking-[0.3em] text-[10px]">SCROLL</span>
            <svg className="w-3 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
