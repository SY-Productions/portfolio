"use client";
import React, { useEffect, useRef, useState } from "react";
import { useLang } from "@/app/context/LanguageContext";
import { useTheme } from "@/app/context/ThemeContext";
import BlogCard, { BlogPost } from "./BlogCard";
import Link from "next/link";

export default function Blog() {
  const { t, lang } = useLang();
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(`/api/blog?lang=${lang}&limit=3&sort=newest`);
        if (res.ok) {
          const data = await res.json();
          const mapped: BlogPost[] = data.posts.map((p: Record<string, unknown>) => ({
            id: p.id as number,
            slug: p.slug as string,
            title: lang === "en" ? ((p.titleEn as string) || (p.title as string)) : lang === "ar" ? ((p.titleAr as string) || (p.title as string)) : (p.title as string),
            description: lang === "en" ? ((p.descriptionEn as string) || (p.description as string)) : lang === "ar" ? ((p.descriptionAr as string) || (p.description as string)) : (p.description as string),
            date: p.publishedAt ? new Date(p.publishedAt as string).toLocaleDateString(lang === "fa" ? "fa-IR" : lang === "ar" ? "ar-SA" : "en-US") : "",
            readTime: p.readTime as number,
            tag: lang === "en" ? (((p.tagsEn as string) || (p.tags as string)) || "").split(",")[0]?.trim() || "" : lang === "ar" ? (((p.tagsAr as string) || (p.tags as string)) || "").split(",")[0]?.trim() || "" : ((p.tags as string) || "").split(",")[0]?.trim() || "",
            coverColor: (p.category as { color?: string } | null)?.color || "",
            coverImage: (p.coverImage as string) || "",
          }));
          setPosts(mapped);
        }
      } catch {
        // keep empty
      }
      setLoading(false);
    }
    fetchPosts();
  }, [lang]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll(".will-animate").forEach((child, i) => {
            setTimeout(() => child.classList.add("in-view"), i * 70);
          });
          el.querySelector(".section-title")?.classList.add("in-view");
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [posts]);

  if (!loading && !posts.length) return null;

  return (
    <div
      id="blog"
      ref={sectionRef}
      className={`relative section-bg bg-no-repeat bg-cover h-auto`}
    >
      {/* Background accents */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/0 pointer-events-none" />
      <div className="absolute top-20 end-10 w-56 h-56 bg-[#3A0D12]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 start-16 w-72 h-72 bg-[#5A8EFF]/5 rounded-full blur-3xl" />

      <div className="relative z-10 lg:w-[78vw] lg:ms-[22vw] pb-14 px-4 lg:px-8">
        {/* Header */}
        <div className="pt-[5vh] mb-8">
          <h2 className="section-title mb-6 will-animate">{t("blog.title")}</h2>
          <p className="font-[ybn] text-white/60 text-sm lg:text-base 2xl:text-lg leading-7 will-animate">
            {t("blog.description")}
          </p>
        </div>

        {/* Cards grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="blog-card h-72 animate-pulse">
                <div className="h-40 bg-white/5" />
                <div className="p-5 space-y-3">
                  <div className="h-3 bg-white/5 w-1/3" />
                  <div className="h-4 bg-white/8 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <BlogCard key={post.slug || i} post={post} index={i} />
            ))}
          </div>
        )}

        {/* View all */}
        {!loading && posts.length > 0 && (
          <div className="mt-8 will-animate">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-[ybn] px-6 py-2.5 border border-white/15 text-white/60 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-200"
            >
              {t("blog.viewAll")} →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
