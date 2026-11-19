"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { blogFilters, posts } from "@/data/blog";
import { cn } from "@/lib/cn";
import type { BlogFilter } from "@/types/content";
import { PostCard } from "./PostCard";

const PAGE_SIZE = 6;

/** "Latest posts": category chips, a three-column grid of cards and "Load more posts". */
export function LatestPosts() {
  const [filter, setFilter] = useState<BlogFilter>("all");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = filter === "all" ? posts : posts.filter((p) => p.tags.includes(filter));
  const shown = filtered.slice(0, visible);

  return (
    <section className="pb-16 md:pb-[120px]">
      <SectionHeading solid="Latest" outline="Posts" compact />
      <Container>
        <div role="group" aria-label="Filter posts" className="flex flex-wrap justify-center gap-2.5">
          {blogFilters.map((f) => {
            const active = f.id === filter;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setFilter(f.id);
                  setVisible(PAGE_SIZE);
                }}
                className={cn(
                  "h-10 rounded-full border px-5 font-display text-xs uppercase tracking-[0.1em] transition-colors",
                  active
                    ? "border-gold-soft text-white"
                    : "border-white/15 text-white/60 hover:border-white/40 hover:text-white",
                )}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {shown.length ? (
          <div key={filter} className="tab-panel mx-auto mt-10 grid max-w-[1220px] gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        ) : (
          <p className="mt-12 text-center font-body text-white/60">No posts in this category yet.</p>
        )}

        {filtered.length > visible && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="h-11 rounded-full border border-white/70 px-6 font-display text-[13px] uppercase tracking-[0.1em] text-white transition-colors hover:bg-white hover:text-black"
            >
              Load more posts
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
