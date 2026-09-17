import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { ProofBand } from "@/components/home/ProofBand";
import { PhilosophySection } from "@/components/home/PhilosophySection";
import { DisciplinesSection } from "@/components/home/DisciplinesSection";
import { TrainingExperience } from "@/components/home/TrainingExperience";
import { TimetablePreview } from "@/components/home/TimetablePreview";
import { PricingPreview } from "@/components/home/PricingPreview";
import { CoachesSection } from "@/components/home/CoachesSection";
import { FightTeamSection } from "@/components/home/FightTeamSection";
import { RecentFightsSection } from "@/components/home/RecentFightsSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { LocationSection } from "@/components/home/LocationSection";
import { FinalCTASection } from "@/components/home/FinalCTASection";
import {
  home,
  coaches,
  timetable,
  pricing,
  fightTeam,
  reviews,
} from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: siteConfig.businessName,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      addressLocality: siteConfig.suburb,
      addressRegion: siteConfig.state,
      postalCode: siteConfig.postcode,
      addressCountry: "AU",
    },
    telephone: siteConfig.phone,
    email: siteConfig.email,
    url: siteConfig.url,
    description: siteConfig.businessDescription,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-1">
        <h1 className="sr-only">
          {siteConfig.businessName} — Boxing, MMA, Muay Thai & BJJ Gym in
          Sefton, NSW
        </h1>

        <HeroSection hero={home.hero} />
        <ProofBand stats={home.proof.stats} />
        <PhilosophySection philosophy={home.philosophy} />
        <DisciplinesSection disciplines={home.disciplines} />
        <TrainingExperience insideEff={home.insideEff} />
        <TimetablePreview
          timetable={home.timetable}
          days={timetable.days}
          entries={timetable.entries}
        />
        <PricingPreview pricing={home.pricing} plans={pricing} />
        <CoachesSection coaches={home.coaches} roster={coaches} />
        <FightTeamSection
          fightTeam={home.fightTeam}
          results={fightTeam.results}
        />
        <RecentFightsSection 
          results={fightTeam.results} 
          quote={home.fightTeam.quote} 
        />
        <ReviewsSection reviews={home.reviews} items={reviews} />
        <LocationSection location={home.location} />
        <FinalCTASection finalCta={home.finalCta} />
      </main>
      <Footer />
    </>
  );
}
