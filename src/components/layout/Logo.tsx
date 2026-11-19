import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="iBoson home" className={cn("flex items-center gap-[11px]", className)}>
      <Image src="/brand/logo-mark.svg" alt="" width={40} height={40} loading="eager" className="size-10" />
      <Image src="/brand/logo-wordmark.svg" alt="" width={66} height={28} loading="eager" className="h-7 w-auto" />
    </Link>
  );
}
