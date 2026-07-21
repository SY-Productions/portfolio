"use client";
import React from "react";
import Link from "next/link";
import { useLang } from "@/app/context/LanguageContext";

export interface BlogPost {
  id?: number;
  slug?: string;
  title: string;
  description: string;
  date: string;
  readTime: number;
  tag: string;
  coverColor: string;
  coverImage?: string;
}

interface Props {
  post: BlogPost;
  index: number;
}

const COVER_COLORS = ["#5A8EFF", "#FF7A5A", "#5AFFA0"];

export default function BlogCard({ post, index }: Props) {
  const { t } = useLang();
  const color = post.coverColor || COVER_COLORS[index % COVER_COLORS.length];

  const card = (
    <article
      className="blog-card will-animate flex flex-col overflow-hidden group cursor-pointer"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Cover stripe */}
      <div
        className="w-full h-44 relative overflow-hidden flex-shrink-0"
        style={
          post.coverImage
            ? { backgroundImage: `url(${post.coverImage})`, backgroundSize: "cover", backgroundPosition: "center" }
            : { background: `linear-gradient(135deg, ${color}33 0%, ${color}11 100%)` }
        }
      >
        {!post.coverImage && (
          <>
            <div className="absolute -top-4 -end-4 w-24 h-24 rounded-full blur-2xl opacity-40" style={{ background: color }} />
            <div className="absolute bottom-4 start-8 w-16 h-16 rounded-full blur-xl opacity-20" style={{ background: color }} />
          </>
        )}
        {post.coverImage && <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />}
        {post.tag && (
          <span className="absolute top-3 start-3 text-xs font-[ybn] font-semibold px-2.5 py-1 bg-black/30 text-white/80 border border-white/15 backdrop-blur-sm">
            {post.tag}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-2 text-xs text-white/40 font-[ybn] mb-3">
          <span>{post.date}</span>
          {post.readTime > 0 && (
            <>
              <span>·</span>
              <span>{post.readTime} {t("blog.minRead")}</span>
            </>
          )}
        </div>

        <h4 className="font-[ybb] text-white/90 text-base lg:text-lg leading-snug mb-2 line-clamp-2 group-hover:text-white transition-colors">
          {post.title}
        </h4>

        <p className="font-[ybn] text-white/50 text-sm leading-6 flex-1 line-clamp-3">
          {post.description}
        </p>

        <div className="mt-4 self-start text-xs font-[ybn] font-medium px-4 py-2 border border-white/15 text-white/70 group-hover:text-white group-hover:border-white/30 group-hover:bg-white/5 transition-all duration-200">
          {t("blog.readMore")} →
        </div>
      </div>
    </article>
  );

  if (post.slug) {
    return <Link href={`/blog/${post.slug}`} className="block">{card}</Link>;
  }

  return card;
}
