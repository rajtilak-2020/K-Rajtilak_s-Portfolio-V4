import BlurFade from "@/components/magicui/blur-fade";
import { getBlogPosts } from "@/data/blog";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen } from "lucide-react";

export const metadata = {
  title: "Blog",
  description: "My thoughts on tech, life, and more.",
};

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <section className="container max-w-5xl mx-auto px-4 py-16 sm:py-24">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <div className="space-y-6 mb-20 text-center">
            <div className="flex items-center justify-center">
              <BookOpen className="h-12 w-12 text-primary mb-4" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl xl:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/90 to-primary/70">
              Latest Articles
            </h1>
            <h2 className="max-w-2xl mx-auto text-lg text-muted-foreground md:text-xl">
              Exploring tech, life, and everything in between. Dive into a collection of thoughtfully crafted articles.
            </h2>
          </div>
        </BlurFade>

        <div className="grid gap-8 md:gap-12">
          {posts.map((post, id) => (
            <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05} key={post.slug}>
              <Link
                className="group block"
                href={`/blog/${post.slug}`}
              >
                <article className="relative flex flex-col md:flex-row gap-8 p-6 bg-card hover:bg-accent/50 rounded-2xl transition-all duration-300 hover:shadow-xl border border-border/50 hover:border-primary/20">
                  {post.metadata.image && (
                    <div className="relative w-full md:w-72 h-56 md:h-64 overflow-hidden rounded-xl shrink-0">
                      <Image
                        src={post.metadata.image}
                        fill
                        alt={post.metadata.title}
                        className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  )}
                  <div className="flex flex-col justify-between flex-grow space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-semibold group-hover:text-primary transition-colors duration-200 line-clamp-2">
                        {post.metadata.title}
                      </h3>
                      {post.metadata.summary && (
                        <p className="text-muted-foreground line-clamp-3 text-base leading-relaxed">
                          {post.metadata.summary}
                        </p>
                      )}
                      {post.metadata.tags && (
                        <div className="flex flex-wrap gap-2">
                          {post.metadata.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground hover:bg-primary/10 transition-colors duration-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <time dateTime={post.metadata.publishedAt} className="font-medium">
                          {new Date(post.metadata.publishedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </time>
                        
                      </div>
                      <div className="flex items-center text-primary text-sm font-medium opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        Read article <ArrowRight className="ml-1 h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </BlurFade>
          ))}
        </div>
      </section>
    </main>
  );
}