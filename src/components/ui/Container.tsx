import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/cn";

type ContainerProps<T extends ElementType> = {
  as?: T;
  /** "content" = 1200px column (Figma 120px gutters), "wide" = 1280px (nav/footer, 80px gutters). */
  size?: "content" | "wide";
} & Omit<ComponentPropsWithoutRef<T>, "as">;

export function Container<T extends ElementType = "div">({
  as,
  size = "content",
  className,
  ...props
}: ContainerProps<T>) {
  const Tag = as ?? "div";
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-5 sm:px-8",
        size === "content" ? "max-w-[1440px] lg:px-16 xl:px-[120px]" : "max-w-[1440px] lg:px-12 xl:px-20",
        className,
      )}
      {...props}
    />
  );
}
