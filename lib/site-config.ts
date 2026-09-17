import siteData from "@/content/site.json";

export const siteConfig = {
  ...siteData,
  url: "https://www.elitefightforce.com.au",
  title: "Elite Fight Force | Boxing, MMA & Muay Thai Gym in Sefton, NSW",
  description:
    "Elite Fight Force is a premium boxing, MMA, Muay Thai and BJJ gym in Sefton, NSW. Real training, real people, real progress. Book your free trial today.",
  keywords: [
    "boxing gym Sefton",
    "MMA gym Sefton",
    "Muay Thai Sefton",
    "Brazilian Jiu Jitsu Sefton",
    "Elite Fight Force",
  ],
};

export type SiteConfig = typeof siteConfig;
