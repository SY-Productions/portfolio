export interface BlogCategory {
  id: number;
  name: string;
  nameEn: string;
  nameAr: string;
  slug: string;
  color: string;
  _count?: { posts: number };
}

export interface BlogPostSummary {
  id: number;
  slug: string;
  title: string;
  titleEn: string;
  titleAr: string;
  description: string;
  descriptionEn: string;
  descriptionAr: string;
  coverImage: string;
  tags: string;
  tagsEn: string;
  tagsAr: string;
  authorName: string;
  readTime: number;
  views: number;
  publishedAt: string | Date | null;
  featured: boolean;
  category: BlogCategory | null;
  _count: { comments: number };
}

export interface BlogComment {
  id: number;
  postId: number;
  name: string;
  email: string;
  content: string;
  lang: string;
  createdAt: string;
}

export interface BlogPostFull extends BlogPostSummary {
  content: string;
  contentEn: string;
  contentAr: string;
  keywords: string;
  keywordsEn: string;
  keywordsAr: string;
  createdAt: string;
  updatedAt: string;
  comments: BlogComment[];
}

export type Lang = "fa" | "en" | "ar";

export function getPostTitle(post: BlogPostSummary, lang: Lang): string {
  if (lang === "en") return post.titleEn || post.title;
  if (lang === "ar") return post.titleAr || post.title;
  return post.title;
}

export function getPostDescription(post: BlogPostSummary, lang: Lang): string {
  if (lang === "en") return post.descriptionEn || post.description;
  if (lang === "ar") return post.descriptionAr || post.description;
  return post.description;
}

export function getPostTags(post: BlogPostSummary, lang: Lang): string[] {
  const raw = lang === "en" ? (post.tagsEn || post.tags) : lang === "ar" ? (post.tagsAr || post.tags) : post.tags;
  return raw ? raw.split(",").map((t) => t.trim()).filter(Boolean) : [];
}

export function getCategoryName(cat: BlogCategory, lang: Lang): string {
  if (lang === "en") return cat.nameEn || cat.name;
  if (lang === "ar") return cat.nameAr || cat.name;
  return cat.name;
}

export function formatDate(dateStr: string | Date | null, lang: Lang): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (lang === "fa") {
    try {
      return date.toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" });
    } catch {
      return date.toISOString().slice(0, 10);
    }
  }
  if (lang === "ar") {
    try {
      return date.toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" });
    } catch {
      return date.toISOString().slice(0, 10);
    }
  }
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
    .slice(0, 100);
}

export function estimateReadTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, " ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}
