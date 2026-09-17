import { navigation } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";
import { HeaderClient } from "./HeaderClient";

export function Header() {
  return (
    <HeaderClient
      links={navigation.primary}
      phoneDisplay={siteConfig.phoneDisplay}
      phone={siteConfig.phone}
      ctaLabel={siteConfig.ctaLabels.primary}
    />
  );
}
