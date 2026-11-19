import Image from "next/image";
import { SparkleIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

// Gold / blue light positions for the placeholder, varied per card.
const TONES = [
  "bg-[radial-gradient(circle_at_28%_38%,rgb(255_190_60/0.38),transparent_42%),radial-gradient(circle_at_74%_68%,rgb(40_110_255/0.5),transparent_55%)]",
  "bg-[radial-gradient(circle_at_70%_30%,rgb(255_190_60/0.32),transparent_40%),radial-gradient(circle_at_30%_75%,rgb(40_110_255/0.5),transparent_55%)]",
  "bg-[radial-gradient(circle_at_50%_25%,rgb(40_110_255/0.5),transparent_50%),radial-gradient(circle_at_55%_85%,rgb(255_190_60/0.3),transparent_45%)]",
];

type PostImageProps = {
  src?: string;
  alt: string;
  sizes: string;
  /** Picks a placeholder variation so neighbouring cards differ. */
  tone?: number;
  priority?: boolean;
  className?: string;
};

/** Post cover. Until the Figma covers are exported, a branded gold/blue placeholder shows. */
export function PostImage({ src, alt, sizes, tone = 0, priority, className }: PostImageProps) {
  return (
    <div className={cn("relative overflow-hidden bg-[#05070f]", className)}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <div aria-hidden="true" className={cn("grid size-full place-items-center", TONES[tone % TONES.length])}>
          <SparkleIcon className="size-6 text-white/40" />
        </div>
      )}
    </div>
  );
}
