import Link from "next/link";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "@/components/ui/social-icons";
import { navigation } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="bg-fight-black pt-16 pb-8 text-off-white">
      <div className="eff-container">
        <div className="grid grid-cols-1 gap-10 border-b border-line/70 pb-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex flex-col items-start leading-none">
              <span className="type-display-md italic tracking-normal text-off-white">
                EFF
              </span>
              <span className="type-caption mt-0.5 italic tracking-[0.15em] text-smoke">
                ELITE FIGHT FORCE
              </span>
            </div>
            <p className="type-body-sm mt-3 max-w-xs text-smoke">
              Elite Fight Force. Boxing, MMA, Muay Thai and BJJ in Sefton,
              NSW. Training since {siteConfig.tradingSince}.
            </p>
          </div>

          <div>
            <span className="type-label text-smoke">Navigate</span>
            <ul className="mt-4 flex flex-col gap-2.5">
              {navigation.primary.slice(0, 6).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="type-body-sm text-off-white/85 transition-colors hover:text-blood-red"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="type-label text-smoke">Classes</span>
            <ul className="mt-4 flex flex-col gap-2.5">
              {navigation.footerClasses.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="type-body-sm text-off-white/85 transition-colors hover:text-blood-red"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="type-label text-smoke">Contact</span>
            <ul className="mt-4 flex flex-col gap-2.5 type-body-sm text-off-white/85">
              <li>
                {siteConfig.address}, {siteConfig.suburb} {siteConfig.state}{" "}
                {siteConfig.postcode}
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="transition-colors hover:text-blood-red"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="transition-colors hover:text-blood-red"
                >
                  {siteConfig.email}
                </a>
              </li>
            </ul>
            <div className="mt-5 flex items-center gap-4">
              <a
                href={siteConfig.socialLinks.instagram}
                aria-label="Instagram"
                className="text-off-white/70 transition-colors hover:text-blood-red"
              >
                <InstagramIcon className="size-4" />
              </a>
              <a
                href={siteConfig.socialLinks.facebook}
                aria-label="Facebook"
                className="text-off-white/70 transition-colors hover:text-blood-red"
              >
                <FacebookIcon className="size-4" />
              </a>
              <a
                href={siteConfig.socialLinks.youtube}
                aria-label="YouTube"
                className="text-off-white/70 transition-colors hover:text-blood-red"
              >
                <YoutubeIcon className="size-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 pt-6 type-caption sm:flex-row sm:items-center">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.businessName}. All
            rights reserved.
          </p>
          <div className="flex gap-5">
            {navigation.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-off-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
