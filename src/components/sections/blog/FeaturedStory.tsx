import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextReveal } from "@/components/motion/TextReveal";
import { featuredPost } from "@/data/blog";
import { PostImage } from "./PostImage";

/** "Featured story": large card with the cover on the left and the story on the right. */
export function FeaturedStory() {
  return (
    <section className="pt-[72px] md:pt-[60px]">
      <SectionHeading solid="Featured" outline="Story" as="h1" compact />
      <Container>
        <article className="mx-auto grid max-w-[1220px] overflow-hidden rounded-2xl border border-white/10 bg-black/60 backdrop-blur-sm md:grid-cols-2">
          <PostImage
            src={featuredPost.image}
            alt=""
            priority
            sizes="(min-width: 768px) 610px, 100vw"
            className="aspect-[16/10] md:aspect-auto md:min-h-[445px]"
          />
          <div className="flex flex-col justify-center p-6 md:px-14 md:py-12">
            <p className="font-display text-xs uppercase tracking-[0.12em] text-gold">
              {featuredPost.category} <span aria-hidden="true">·</span> {featuredPost.author}
            </p>
            <TextReveal
              as="h2"
              text={featuredPost.title}
              className="mt-5 font-display text-[clamp(1.6rem,2.6vw,2.125rem)] uppercase leading-[1.3]"
            />
            <TextReveal
              text={featuredPost.excerpt}
              delay={3}
              className="mt-5 font-body text-[15px] leading-relaxed text-white/70"
            />
            <div className="mt-8">
              <Button href={featuredPost.href} variant="gold">
                Read article
              </Button>
            </div>
          </div>
        </article>
      </Container>
    </section>
  );
}
