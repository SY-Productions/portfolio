"use client";
import React, { useEffect, useRef } from "react";
import { useLang } from "@/app/context/LanguageContext";
import { useTheme } from "@/app/context/ThemeContext";
import BlogCard, { BlogPost } from "./BlogCard";

import fa from "@/messages/fa.json";
import en from "@/messages/en.json";
import ar from "@/messages/ar.json";

const COVER_COLORS = ["#5A8EFF", "#FF7A5A", "#5AFFA0"];

type MsgShape = typeof fa;

const MSG: Record<string, MsgShape> = { fa, en, ar };

export default function Blog() {
  const { t, lang } = useLang();
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);

  const bgSvg =
    theme === "light"
      ? "bg-[url('/vectors/sec1-bglight.svg')]"
      : "bg-[url('/vectors/sec1-bgdark.svg')]";

  const msgs = MSG[lang] ?? MSG.fa;
  const rawPosts = msgs.blog.posts as Array<{ title: string; description: string; date: string; readTime: number; tag: string }>;
  const posts: BlogPost[] = rawPosts.map((p, i) => ({
    ...p,
    coverColor: COVER_COLORS[i % COVER_COLORS.length],
  }));

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
  }, []);

  if (!posts.length) return null;

  return (
    <div
      id="blog"
      ref={sectionRef}
      className={`relative ${bgSvg} bg-no-repeat bg-cover h-auto`}
    >
      {/* Background accents */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/0 pointer-events-none" />
      <div className="absolute top-20 end-10 w-56 h-56 bg-[#3A0D12]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 start-16 w-72 h-72 bg-[#5A8EFF]/5 rounded-full blur-3xl" />

      <div className="relative z-10 lg:w-[78vw] lg:ms-[22vw] pb-14 px-4 lg:px-8">
        {/* Header */}
        <div className="pt-[5vh] mb-8">
          <h3 className="section-title mb-6 will-animate">{t("blog.title")}</h3>
          <p className="font-[ybn] text-white/60 text-sm lg:text-base 2xl:text-lg leading-7 will-animate">
            {t("blog.description")}
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <BlogCard key={i} post={post} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
