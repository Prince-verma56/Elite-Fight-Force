import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ChevronsRight } from "lucide-react";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "@/components/ui/social-icons";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-fight-black pt-32 pb-12 text-off-white min-h-[60vh] flex flex-col justify-end">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Images/Bg Images/FooterBg.png"
          alt="Footer background"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Minimalistic Subtle Red Fog */}
        <div className="absolute left-0 top-1/4 h-[500px] w-[500px] rounded-full bg-blood-red/20 blur-[120px]" />
        
        {/* Premium Glassmorphism Overlay */}
        <div className="absolute inset-0 bg-fight-black/50 backdrop-blur-md" />

        {/* Bottom anchor dark fade for content readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-fight-black via-fight-black/50 to-transparent" />
      </div>

      <div className="relative z-10 eff-container mt-auto pt-10">
        <div className="grid grid-cols-1 gap-12 border-b border-line/70 pb-12 lg:grid-cols-12">
          
          {/* Left Column: Brand & Social */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="flex flex-col items-start leading-none mb-6">
              <span className="type-display-md italic tracking-normal text-off-white">
                EFF
              </span>
              <span className="type-caption mt-0.5 italic tracking-[0.15em] text-smoke">
                ELITE FIGHT FORCE
              </span>
            </div>
            <p className="type-body-sm text-off-white/80 leading-relaxed mb-8 max-w-sm">
              Elite Fight Force or EFF is a MMA gym offering Boxing classes, Brazilian Jiu Jitsu classes (BJJ), Muay Thai classes, Strength & Conditioning and more. Our team boasts over 50 years of combined experience and have lead many fighters to amateur and professional titles and championships.
            </p>
            
            <h3 className="type-label mb-4 text-off-white uppercase tracking-wider">Social Media</h3>
            <div className="flex items-center gap-3">
              <a href={siteConfig.socialLinks.facebook} aria-label="Facebook" className="flex size-10 items-center justify-center border border-line/50 transition-colors hover:border-blood-red hover:text-blood-red">
                <FacebookIcon className="size-4" />
              </a>
              <a href={siteConfig.socialLinks.instagram} aria-label="Instagram" className="flex size-10 items-center justify-center border border-line/50 transition-colors hover:border-blood-red hover:text-blood-red">
                <InstagramIcon className="size-4" />
              </a>
              <a href={siteConfig.socialLinks.youtube} aria-label="YouTube" className="flex size-10 items-center justify-center border border-line/50 transition-colors hover:border-blood-red hover:text-blood-red">
                <YoutubeIcon className="size-4" />
              </a>
            </div>
          </div>

          {/* Right Column Group */}
          <div className="lg:col-span-8 flex flex-col gap-12 lg:pl-8 border-t border-line/30 pt-10 lg:border-t-0 lg:pt-0">
            
            {/* Top Row: Contact Methods */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div>
                <h3 className="type-label mb-5 text-off-white uppercase">Want to call us?</h3>
                <div className="flex items-start gap-3">
                  <Phone className="size-5 text-blood-red shrink-0 mt-0.5" />
                  <div>
                    <span className="block type-body-md font-bold text-off-white">Phone</span>
                    <a href={`tel:${siteConfig.phone}`} className="type-body-sm text-off-white/70 transition-colors hover:text-blood-red mt-1 block">
                      {siteConfig.phoneDisplay}
                    </a>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="type-label mb-5 text-off-white uppercase">Want to email us?</h3>
                <div className="flex items-start gap-3">
                  <Mail className="size-5 text-blood-red shrink-0 mt-0.5" />
                  <div>
                    <span className="block type-body-md font-bold text-off-white">Email</span>
                    <a href={`mailto:${siteConfig.email}`} className="type-body-sm text-off-white/70 transition-colors hover:text-blood-red mt-1 block">
                      {siteConfig.email}
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="type-label mb-5 text-off-white uppercase">Want to visit us?</h3>
                <div className="flex items-start gap-3">
                  <MapPin className="size-5 text-blood-red shrink-0 mt-0.5" />
                  <div>
                    <span className="block type-body-md font-bold text-off-white">Location</span>
                    <span className="type-body-sm text-off-white/70 mt-1 block max-w-[200px]">
                      {siteConfig.address} {siteConfig.suburb} {siteConfig.state} {siteConfig.postcode}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row: Links & Sponsors */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 pt-8 border-t border-line/30">
              <div className="sm:col-span-1">
                <h3 className="type-label mb-5 text-off-white uppercase">Quick Links</h3>
                <ul className="flex flex-col gap-2.5">
                  {['Home', 'About', 'Team', 'Contact'].map((item) => (
                    <li key={item}>
                      <Link href={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`} className="group flex items-center gap-2 type-body-sm text-off-white/80 transition-colors hover:text-blood-red">
                        <ChevronsRight className="size-3.5 text-blood-red transition-transform group-hover:translate-x-1" />
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sm:col-span-2">
                <h3 className="type-label mb-5 text-off-white uppercase">Sponsors</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4">
                  {['WebDash', 'EPH', 'Marvel Skip Bins', 'AMS Solutions', 'Masnad Health Clinic', 'Confidential Cosmemtics', 'Plumbing Elite'].map((sponsor) => (
                    <li key={sponsor} className="flex items-center gap-2 type-body-sm text-off-white/80">
                      <ChevronsRight className="size-3.5 text-blood-red shrink-0" />
                      {sponsor}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 pt-8 pb-4">
          <p className="type-caption text-off-white/70 text-center">
            Copyright &copy; {new Date().getFullYear()}. All rights reserved.
          </p>
          <p className="type-caption text-off-white/50 text-center">
            Made by WebDash &ndash; developing affordable futuristic websites
          </p>
          <div className="mt-2 text-off-white font-heading text-xl tracking-widest flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity">
            <span className="font-light">WEB</span><span className="font-bold ml-1">DASH</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
