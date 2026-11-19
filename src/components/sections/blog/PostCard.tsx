import Link from "next/link";
import { SparkleIcon } from "@/components/ui/icons";
import { TextReveal } from "@/components/motion/TextReveal";
import type { BlogPost } from "@/types/content";
import { PostImage } from "./PostImage";

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

/** "Latest posts" card: cover, category · date, title, summary and "Read more". */
export function PostCard({ post, index = 0 }: { post: BlogPost; index?: number }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/60 backdrop-blur-sm transition-colors hover:border-white/25">
      <PostImage
        src={post.image}
        alt=""
        tone={index}
        sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
        className="aspect-[295/173] transition-transform duration-700 group-hover:scale-[1.02]"
      />
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <p className="font-display text-[11px] uppercase tracking-[0.12em] text-gold">
          {post.category} <span aria-hidden="true">·</span>{" "}
          <time dateTime={post.date}>{dateFormat.format(new Date(post.date))}</time>
        </p>
        <h3 className="mt-3 font-display text-xl leading-[1.35]">
          {/* The whole card is clickable via the stretched link. */}
          <Link href={post.href} className="after:absolute after:inset-0">
            <TextReveal as="span" text={post.title} />
          </Link>
        </h3>
        <TextReveal text={post.excerpt} delay={2} className="mt-3 font-body text-[13px] leading-relaxed text-white/55" />
        <span className="mt-auto flex items-center gap-2 pt-5 font-display text-xs uppercase tracking-[0.12em] text-white transition-colors group-hover:text-gold">
          Read more <SparkleIcon className="size-3" />
        </span>
      </div>
    </article>
  );
}
