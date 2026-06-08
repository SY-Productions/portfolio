"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLang } from "@/app/context/LanguageContext";
import { useTheme } from "@/app/context/ThemeContext";
import {
  ArrowLeft, ArrowRight, Calendar, Clock, Eye, Tag,
  MessageCircle, Send, User, ChevronRight,
} from "lucide-react";
import {
  BlogPostFull, BlogPostSummary, BlogCategory, Lang,
  getPostTitle, getPostDescription, getPostTags,
  getCategoryName, formatDate,
} from "./blogTypes";
import toast from "react-hot-toast";

interface Props {
  post: BlogPostFull & { category: BlogCategory | null };
  relatedPosts: BlogPostSummary[];
}

function sanitizeHtml(html: string): string {
  // Basic client-side sanitization - strips script tags only
  // Full sanitization happens via TipTap's output being trusted admin content
  return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
}

function CommentForm({ slug, lang, onAdded }: { slug: string; lang: Lang; onAdded: () => void }) {
  const { t } = useLang();
  const [form, setForm] = useState({ name: "", email: "", content: "" });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.content.trim()) {
      toast.error(t("blog.commentRequired"));
      return;
    }
    setSubmitting(true);
    const res = await fetch(`/api/blog/${slug}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, lang }),
    });
    setSubmitting(false);
    if (res.ok) {
      toast.success(t("blog.commentPosted"));
      setForm({ name: "", email: "", content: "" });
      onAdded();
    } else {
      toast.error(t("blog.commentError"));
    }
  }

  const inputClass = "w-full bg-black/20 border border-white/10 focus:border-white/30 outline-none px-3 py-2.5 text-white text-sm placeholder:text-white/20 transition-colors font-[ybn]";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-white/50 text-xs font-[ybn] mb-1.5">{t("blog.commentName")} *</label>
          <input
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            placeholder={t("blog.commentNamePlaceholder")}
            className={inputClass}
            maxLength={80}
          />
        </div>
        <div>
          <label className="block text-white/50 text-xs font-[ybn] mb-1.5">{t("blog.commentEmail")}</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            placeholder={t("blog.commentEmailPlaceholder")}
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <label className="block text-white/50 text-xs font-[ybn] mb-1.5">{t("blog.commentContent")} *</label>
        <textarea
          value={form.content}
          onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
          placeholder={t("blog.commentContentPlaceholder")}
          rows={4}
          className={`${inputClass} resize-none`}
          maxLength={2000}
        />
        <p className="text-white/20 text-xs mt-1 text-end">{form.content.length}/2000</p>
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="flex items-center gap-2 px-6 py-2.5 bg-[#3B070A]/60 hover:bg-[#5A0E12]/60 border border-[#5A0E12]/50 text-white text-sm font-[ybn] transition-all disabled:opacity-50"
      >
        <Send size={14} />
        {submitting ? t("blog.commentSubmitting") : t("blog.commentSubmit")}
      </button>
    </form>
  );
}

export default function BlogDetailClient({ post, relatedPosts }: Props) {
  const { t, lang } = useLang();
  const { theme } = useTheme();
  const [comments, setComments] = useState(post.comments);

  const isRtl = lang === "fa" || lang === "ar";
  const l = lang as Lang;

  const title = getPostTitle(post, l);
  const description = getPostDescription(post, l);
  const tags = getPostTags(post, l);
  const date = formatDate(post.publishedAt, l);
  const catName = post.category ? getCategoryName(post.category, l) : null;

  const content =
    l === "en" ? (post.contentEn || post.content) :
    l === "ar" ? (post.contentAr || post.content) :
    post.content;

  async function refreshComments() {
    const res = await fetch(`/api/blog/${post.slug}`);
    if (res.ok) {
      const data = await res.json();
      setComments(data.comments);
    }
  }

  const BackIcon = isRtl ? ArrowRight : ArrowLeft;

  return (
    <div className={`min-h-screen section-bg bg-no-repeat bg-cover`} dir={isRtl ? "rtl" : "ltr"}>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-[ybn] text-white/30 mb-8">
          <Link href="/" className="hover:text-white/60 transition-colors">{t("nav.home") || "Home"}</Link>
          <ChevronRight size={12} className={isRtl ? "rotate-180" : ""} />
          <Link href="/blog" className="hover:text-white/60 transition-colors">{t("blog.navTitle")}</Link>
          <ChevronRight size={12} className={isRtl ? "rotate-180" : ""} />
          <span className="text-white/50 line-clamp-1">{title}</span>
        </nav>

        {/* Back button */}
        <div className="mb-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-[ybn] text-white/50 hover:text-white border border-white/10 hover:border-white/30 px-4 py-2 transition-all"
          >
            <BackIcon size={14} /> {t("blog.backToList")}
          </Link>
        </div>

        {/* Category */}
        {catName && post.category && (
          <div className="mb-4">
            <Link href={`/blog?category=${post.category.slug}`}>
              <span
                className="inline-block text-xs font-[ybn] font-semibold px-3 py-1 text-white/80 border border-white/15"
                style={{ background: `${post.category.color}30`, borderColor: `${post.category.color}50` }}
              >
                {catName}
              </span>
            </Link>
          </div>
        )}

        {/* Title */}
        <h1 className="font-[ybb] text-white text-2xl sm:text-3xl lg:text-4xl leading-tight mb-4">
          {title}
        </h1>

        {/* Description */}
        <p className="font-[ybn] text-white/60 text-base lg:text-lg leading-7 mb-6">
          {description}
        </p>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-[ybn] text-white/40 mb-6 pb-6 border-b border-white/10">
          <span className="flex items-center gap-1.5">
            <User size={12} /> {post.authorName}
          </span>
          {date && (
            <span className="flex items-center gap-1.5">
              <Calendar size={12} /> {date}
            </span>
          )}
          {post.readTime > 0 && (
            <span className="flex items-center gap-1.5">
              <Clock size={12} /> {post.readTime} {t("blog.minRead")}
            </span>
          )}
          {post.views > 0 && (
            <span className="flex items-center gap-1.5">
              <Eye size={12} /> {post.views} {t("blog.views")}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <MessageCircle size={12} /> {comments.length} {t("blog.comments")}
          </span>
        </div>

        {/* Cover image */}
        {post.coverImage && (
          <div className="mb-8 overflow-hidden border border-white/10">
            <img
              src={post.coverImage}
              alt={title}
              className="w-full object-cover max-h-[480px]"
              loading="eager"
            />
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}&lang=${lang}`}
                className="flex items-center gap-1 text-xs font-[ybn] px-2.5 py-1 bg-black/20 border border-white/10 text-white/50 hover:text-white/80 hover:border-white/25 transition-all"
              >
                <Tag size={10} /> {tag}
              </Link>
            ))}
          </div>
        )}

        {/* Article content */}
        <div
          className="blog-content font-[ybn]"
          dir={isRtl ? "rtl" : "ltr"}
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }}
        />

        {/* Divider */}
        <div className="border-t border-white/10 my-12" />

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="mb-12">
            <h2 className="font-[ybb] text-white/70 text-lg mb-6">{t("blog.relatedPosts")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedPosts.map((rp) => {
                const rpTitle = getPostTitle(rp, l);
                const rpDesc = getPostDescription(rp, l);
                const rpDate = formatDate(rp.publishedAt, l);
                return (
                  <Link
                    key={rp.id}
                    href={`/blog/${rp.slug}`}
                    className="blog-card p-4 hover:border-white/20 transition-all group"
                  >
                    {rp.coverImage && (
                      <div className="h-28 mb-3 overflow-hidden">
                        <img src={rp.coverImage} alt={rpTitle} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                    )}
                    <p className="text-xs text-white/30 font-[ybn] mb-1">{rpDate}</p>
                    <h3 className="font-[ybb] text-white/80 text-sm leading-snug line-clamp-2 group-hover:text-white transition-colors">{rpTitle}</h3>
                    <p className="font-[ybn] text-white/40 text-xs mt-1 line-clamp-2">{rpDesc}</p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Comments section */}
        <section id="comments">
          <h2 className="font-[ybb] text-white/70 text-lg mb-6 flex items-center gap-2">
            <MessageCircle size={18} /> {t("blog.commentsSection")} ({comments.length})
          </h2>

          {/* Comment list */}
          {comments.length > 0 && (
            <div className="space-y-4 mb-10">
              {comments.map((comment) => (
                <div key={comment.id} className="blog-card p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 flex-shrink-0 bg-[#3B070A]/60 border border-[#5A0E12]/40 flex items-center justify-center">
                      <User size={14} className="text-white/40" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-[ybb] text-white/80 text-sm">{comment.name}</span>
                        <span className="text-white/25 text-xs font-[ybn]">{formatDate(comment.createdAt, l)}</span>
                      </div>
                      <p className="font-[ybn] text-white/60 text-sm leading-6 whitespace-pre-wrap">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Comment form */}
          <div className="blog-card p-6">
            <h3 className="font-[ybb] text-white/70 text-base mb-5">{t("blog.leaveComment")}</h3>
            <CommentForm slug={post.slug} lang={l} onAdded={refreshComments} />
          </div>
        </section>
      </div>
    </div>
  );
}
