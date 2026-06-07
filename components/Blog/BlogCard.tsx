"use client";
import React from "react";
import { useLang } from "@/app/context/LanguageContext";

export interface BlogPost {
  title: string;
  description: string;
  date: string;
  readTime: number;
  tag: string;
  coverColor: string;
}

interface Props {
  post: BlogPost;
  index: number;
}

export default function BlogCard({ post, index }: Props) {
  const { t } = useLang();

  return (
    <article
      className="blog-card will-animate flex flex-col overflow-hidden"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Cover stripe */}
      <div
        className="w-full h-40 lg:h-44 relative overflow-hidden flex-shrink-0"
        style={{
          background: `linear-gradient(135deg, ${post.coverColor}33 0%, ${post.coverColor}11 100%)`,
        }}
      >
        {/* Decorative blobs */}
        <div
          className="absolute -top-4 -end-4 w-24 h-24 rounded-full blur-2xl opacity-40"
          style={{ background: post.coverColor }}
        />
        <div
          className="absolute bottom-4 start-8 w-16 h-16 rounded-full blur-xl opacity-20"
          style={{ background: post.coverColor }}
        />
        {/* Tag chip — plain style */}
        <span className="absolute top-3 start-3 text-xs font-[ybn] font-semibold px-2.5 py-1 bg-black/30 text-white/80 border border-white/15 backdrop-blur-sm">
          {post.tag}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-2 text-xs text-white/40 font-[ybn] mb-3">
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readTime} {t("blog.minRead")}</span>
        </div>

        <h4 className="font-[ybb] text-white/90 text-base lg:text-lg leading-snug mb-2 line-clamp-2">
          {post.title}
        </h4>

        <p className="font-[ybn] text-white/50 text-sm leading-6 flex-1 line-clamp-3">
          {post.description}
        </p>

        <button className="mt-4 self-start text-xs font-[ybn] font-medium px-4 py-2 border border-white/15 text-white/70 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-200">
          {t("blog.readMore")} →
        </button>
      </div>
    </article>
  );
}
