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
            <Image
              src={hero.media.src}
              alt={hero.media.alt}
              fill
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: "85% center" }}
              priority
            />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-fight-black via-fight-black/55 to-fight-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-fight-black via-transparent to-fight-black/40" />
      </div>

      <div
        data-hero-content
        className="eff-container relative z-10 flex flex-1 flex-col gap-6 pt-24 pb-8 md:pt-28"
      >
        <div data-hero-fade className="flex items-center gap-3 text-off-white">
          <span className="type-eyebrow">{hero.eyebrow}</span>
          <span className="h-3 w-px bg-off-white/30" />
          <span className="type-eyebrow text-smoke">
            {hero.eyebrowSecondary}
          </span>
        </div>

        <div className="flex flex-1 flex-col justify-center max-w-4xl">
          <div className="flex flex-col gap-1 sm:gap-0">
            {hero.headline.map((word, i) => (
              <div key={`${word}-${i}`} className="overflow-hidden pb-1 sm:pb-2">
                <div
                  data-hero-row
                  className="font-heading text-[clamp(3rem,9vw,7.5rem)] leading-[0.95] tracking-normal uppercase text-off-white flex flex-wrap gap-[0.25em]"
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
            className="type-body-lg mt-5 max-w-md text-off-white/85"
          >
            {hero.supportingCopy}
          </p>

          <div
            data-hero-fade
            className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5"
          >
            <CtaButton
              href="/free-trial"
              className="w-full justify-center sm:w-auto sm:justify-start"
            >
              Book Your Free Trial
            </CtaButton>
            <Link
              href="/about"
              className="type-label flex items-center gap-2 text-off-white/85 transition-colors hover:text-off-white"
            >
              Watch Our Story
            </Link>
          </div>
        </div>

        <div
          data-hero-fade
          className="mt-auto flex items-end justify-between border-t border-off-white/15 pt-5"
        >
          <span className="type-label text-smoke">{hero.sectionIndex}</span>
          <div className="hidden gap-6 md:flex">
            {hero.sideMarkers.map((marker) => (
              <span key={marker} className="type-label text-off-white/70">
                {marker}
              </span>
            ))}
          </div>
          <span className="type-label text-smoke">Scroll</span>
        </div>
      </div>
    </section>
  );
}
