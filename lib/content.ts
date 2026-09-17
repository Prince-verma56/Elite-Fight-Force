import homeData from "@/content/home.json";
import coachesData from "@/content/coaches.json";
import timetableData from "@/content/timetable.json";
import pricingData from "@/content/pricing.json";
import fightTeamData from "@/content/fight-team.json";
import reviewsData from "@/content/reviews.json";
import navigationData from "@/content/navigation.json";

export interface HeroContent {
  eyebrow: string;
  eyebrowSecondary: string;
  headline: string[];
  headlineAccentWord: string;
  supportingCopy: string;
  media: { src: string; alt: string; focalArea: string };
  sideMarkers: string[];
  sectionIndex: string;
}

export interface Coach {
  id: string;
  slug: string;
  name: string;
  role: string;
  disciplines: string[];
  record: string;
  image: string;
  featured: boolean;
  source: string;
  notes: string;
}

export interface TimetableEntry {
  time: string;
  className: string;
  level: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  featured: boolean;
  badge?: string;
  cta: string;
}

export interface FightResult {
  date: string;
  event: string;
  result: "Win" | "Loss" | "Draw";
  note: string;
  source: string;
}

export interface Review {
  id: string;
  quote: string;
  name: string;
  memberType: string;
  rating: number;
  source: string;
  image?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export const home = homeData;
export const coaches: Coach[] = coachesData as Coach[];
export const timetable = timetableData as {
  days: string[];
  entries: Record<string, TimetableEntry[]>;
};
export const pricing: PricingPlan[] = pricingData as PricingPlan[];
export const fightTeam = fightTeamData as {
  results: FightResult[];
  notes: string;
};
export const reviews: Review[] = reviewsData as Review[];
export const navigation = navigationData as {
  primary: NavLink[];
  footerClasses: NavLink[];
  legal: NavLink[];
};
