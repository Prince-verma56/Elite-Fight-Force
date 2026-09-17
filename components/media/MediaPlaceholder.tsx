import { ImageOff } from "lucide-react";

interface MediaPlaceholderProps {
  alt: string;
  aspect?: string;
  className?: string;
  label?: string;
  tone?: "dark" | "light";
}

/**
 * Designed placeholder standing in for real EFF photography/video.
 * Preserves the final aspect ratio/crop so real media can drop in later
 * without layout changes — swap the future <Image> src into this slot.
 */
export function MediaPlaceholder({
  alt,
  aspect = "aspect-[4/5]",
  className = "",
  label,
  tone = "dark",
}: MediaPlaceholderProps) {
  const base =
    tone === "dark"
      ? "from-line via-carbon to-fight-black"
      : "from-smoke/55 via-smoke/25 to-line/60";

  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative overflow-hidden border border-off-white/10 ${aspect} ${className}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${base}`} />
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(255,255,255,0.09) 0, rgba(255,255,255,0.09) 1px, transparent 1px, transparent 16px)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-fight-black/75 via-transparent to-black/10" />
      <div className="absolute inset-0 flex items-center justify-center">
        <ImageOff className="size-7 text-off-white/20" aria-hidden strokeWidth={1.25} />
      </div>
      {label ? (
        <span className="type-caption absolute bottom-4 left-4 uppercase tracking-[0.2em] text-off-white/50">
          {label}
        </span>
      ) : null}
    </div>
  );
}
