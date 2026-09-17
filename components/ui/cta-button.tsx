import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "cn";

interface CtaButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost-light";
  className?: string;
  showArrow?: boolean;
}

/** CTAArrowPush / CTABorderSweep — the site's cinematic call-to-action button. */
export function CtaButton({
  href,
  children,
  variant = "primary",
  className,
  showArrow = true,
}: CtaButtonProps) {
  const base =
    "group relative inline-flex items-center gap-2.5 overflow-hidden px-7 py-3.5 type-label transition-colors duration-[260ms]";

  const variants = {
    primary: "bg-blood-red text-off-white hover:bg-hot-red",
    secondary:
      "border border-off-white/30 text-off-white hover:border-off-white",
    "ghost-light":
      "border border-fight-black/25 text-fight-black hover:border-fight-black",
  };

  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      <span>{children}</span>
      {showArrow ? (
        <ArrowRight
          className="size-4 transition-transform duration-[260ms] group-hover:translate-x-1"
          aria-hidden
        />
      ) : null}
    </Link>
  );
}
