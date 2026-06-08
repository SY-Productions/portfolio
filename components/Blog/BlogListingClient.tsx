"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLang } from "@/app/context/LanguageContext";
import { useTheme } from "@/app/context/ThemeContext";
import Link from "next/link";
import { Search, X, ChevronLeft, ChevronRight, TrendingUp, Clock, Star, Pin } from "lucide-react";
import {
  BlogCategory,
  BlogPostSummary,
  Lang,
  getPostTitle,
  getPostDescription,
  getPostTags,
  getCategoryName,
  formatDate,
} from "./blogTypes";

interface Props {
  categories: BlogCategory[];
  pinnedPosts: BlogPostSummary[];
}

const SORT_OPTIONS = [
  { value: "newest", labelKey: "blog.sortNewest" },
  { value: "oldest", labelKey: "blog.sortOldest" },
  { value: "views", labelKey: "blog.sortViews" },
  { value: "readTime", labelKey: "blog.sortReadTime" },
];

const COVER_COLORS = ["#5A8EFF", "#FF7A5A", "#5AFFA0", "#FFD35A", "#C45AFF", "#FF5A8E"];

function getCoverColor(slug: string) {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) hash = slug.charCodeAt(i) + ((hash << 5) - hash);
  return COVER_COLORS[Math.abs(hash) % COVER_COLORS.length];
}

function PostCard({ post, index }: { post: BlogPostSummary; index: number }) {
  const { t, lang } = useLang();
  const color = post.coverImage ? undefined : getCoverColor(post.slug);
  const title = getPostTitle(post, lang as Lang);
  const description = getPostDescription(post, lang as Lang);
  const tags = getPostTags(post, lang as Lang);
  const date = formatDate(post.publishedAt, lang as Lang);
  const catName = post.category ? getCategoryName(post.category, lang as Lang) : null;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="blog-card will-animate flex flex-col overflow-hidden group"
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      {/* Cover */}
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
        {post.coverImage && <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />}

        <div className="absolute top-3 start-3 flex items-center gap-2">
          {catName && (
            <span
              className="text-xs font-[ybn] font-semibold px-2.5 py-1 text-white/90 border border-white/20 backdrop-blur-sm"
              style={{ background: `${post.category?.color || color}40` }}
            >
              {catName}
            </span>
          )}
          {post.featured && (
            <span className="flex items-center gap-1 text-xs font-[ybn] px-2 py-1 bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 backdrop-blur-sm">
              <Star size={10} /> {t("blog.featured")}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-2 text-xs text-white/40 font-[ybn] mb-3 flex-wrap">
          <span>{date}</span>
          {post.readTime > 0 && (
            <>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock size={10} /> {post.readTime} {t("blog.minRead")}
              </span>
            </>
          )}
          {post.views > 0 && (
            <>
              <span>·</span>
              <span className="flex items-center gap-1">
                <TrendingUp size={10} /> {post.views}
              </span>
            </>
          )}
        </div>

        <h2 className="font-[ybb] text-white/90 text-base lg:text-lg leading-snug mb-2 line-clamp-2 group-hover:text-white transition-colors">
          {title}
        </h2>

        <p className="font-[ybn] text-white/50 text-sm leading-6 flex-1 line-clamp-3">
          {description}
        </p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs font-[ybn] px-2 py-0.5 bg-black/20 border border-white/10 text-white/40">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-4">
          <span className="text-xs font-[ybn] text-white/30">{post.authorName}</span>
          <span className="text-xs font-[ybn] font-medium px-4 py-2 border border-white/15 text-white/70 group-hover:text-white group-hover:border-white/30 group-hover:bg-white/5 transition-all duration-200">
            {t("blog.readMore")} →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function BlogListingClient({ categories, pinnedPosts }: Props) {
  const { t, lang } = useLang();
  const { theme } = useTheme();
  const bgSvg = theme === "light" ? "bg-[url('/vectors/sec1-bglight.svg')]" : "bg-[url('/vectors/sec1-bgdark.svg')]";

  const containerRef = useRef<HTMLDivElement>(null);
  const [posts, setPosts] = useState<BlogPostSummary[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sort, setSort] = useState("newest");

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({
      lang,
      page: String(page),
      limit: "9",
      sort,
    });
    if (selectedCategory) params.set("category", selectedCategory);
    if (debouncedSearch) params.set("search", debouncedSearch);

    const res = await fetch(`/api/blog?${params}`);
    if (res.ok) {
      const data = await res.json();
      setPosts(data.posts);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    }
    setLoading(false);
  }, [lang, page, sort, selectedCategory, debouncedSearch]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [selectedCategory, sort, debouncedSearch, lang]);

  const revealCards = useCallback(() => {
    requestAnimationFrame(() => {
      containerRef.current
        ?.querySelectorAll<HTMLElement>(".will-animate:not(.in-view)")
        .forEach((el, i) => setTimeout(() => el.classList.add("in-view"), i * 60));
    });
  }, []);

  useEffect(() => { revealCards(); }, [revealCards]);

  useEffect(() => {
    if (!loading) revealCards();
  }, [loading, revealCards]);

  const isRtl = lang === "fa" || lang === "ar";

  return (
    <div ref={containerRef} className={`min-h-screen ${bgSvg} bg-no-repeat bg-cover`} dir={isRtl ? "rtl" : "ltr"}>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Header */}
        <div className="mb-10">
          <h1 className="section-title in-view mb-3">{t("blog.title")}</h1>
          <p className="font-[ybn] text-white/60 text-sm lg:text-base leading-7 max-w-2xl">
            {t("blog.description")}
          </p>
        </div>

        {/* Pinned posts */}
        {pinnedPosts.length > 0 && !debouncedSearch && !selectedCategory && page === 1 && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Pin size={13} className="text-blue-400 rotate-45" />
              <span className="font-[ybn] text-white/40 text-xs tracking-widest uppercase">Pinned</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {pinnedPosts.map((post, i) => (
                <PostCard key={post.id} post={post} index={i} />
              ))}
            </div>
            <div className="mt-8 border-t border-white/5" />
          </div>
        )}

        {/* Search + Sort row */}
        <div className="flex gap-3 mb-4">
          <div className="relative flex-1">
            <Search size={14} className="absolute start-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("blog.searchPlaceholder")}
              className="w-full bg-black/20 border border-white/10 ps-9 pe-9 py-2.5 text-white text-sm font-[ybn] placeholder:text-white/20 outline-none focus:border-white/30 transition-colors"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute end-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                <X size={12} />
              </button>
            )}
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-black/20 border border-white/10 text-white/60 text-xs font-[ybn] px-3 py-2 outline-none focus:border-white/30 transition-colors shrink-0"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-[#141010]">
                {t(opt.labelKey)}
              </option>
            ))}
          </select>
        </div>

        {/* Category pills */}
        {categories.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <button
              onClick={() => setSelectedCategory("")}
              className={`px-3 py-1.5 text-xs font-[ybn] border transition-all ${
                !selectedCategory
                  ? "bg-[#3B070A]/60 border-[#5A0E12]/50 text-white"
                  : "bg-black/20 border-white/10 text-white/40 hover:text-white/70 hover:border-white/20"
              }`}
            >
              All <span className="opacity-50 ms-1">({total})</span>
            </button>
            {categories.map((cat) => {
              const name = lang === "en" ? cat.nameEn || cat.name : lang === "ar" ? cat.nameAr || cat.name : cat.name;
              const count = cat._count?.posts ?? 0;
              const active = selectedCategory === cat.slug;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(active ? "" : cat.slug)}
                  className={`px-3 py-1.5 text-xs font-[ybn] border transition-all ${
                    active
                      ? "text-white"
                      : "bg-black/20 border-white/10 text-white/40 hover:text-white/70 hover:border-white/20"
                  }`}
                  style={active ? { background: `${cat.color}25`, borderColor: `${cat.color}50` } : {}}
                >
                  {name} <span className="opacity-50 ms-1">({count})</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Posts grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="blog-card h-80 animate-pulse">
                <div className="h-44 bg-white/5" />
                <div className="p-5 space-y-3">
                  <div className="h-3 bg-white/5 w-1/3" />
                  <div className="h-4 bg-white/5 w-3/4" />
                  <div className="h-3 bg-white/5 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-24 text-white/30 font-[ybn]">
            {debouncedSearch ? t("blog.noResults") : t("blog.noPosts")}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-12">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 border border-white/10 text-white/50 hover:text-white hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              {isRtl ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-9 h-9 text-sm font-[ybn] border transition-all ${
                  p === page
                    ? "bg-[#3B070A]/60 border-[#5A0E12]/50 text-white"
                    : "border-white/10 text-white/40 hover:text-white hover:border-white/30"
                }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 border border-white/10 text-white/50 hover:text-white hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              {isRtl ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
