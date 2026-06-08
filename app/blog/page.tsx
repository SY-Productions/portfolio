import type { Metadata } from "next";
import BlogListingClient from "@/components/Blog/BlogListingClient";
import prisma from "@/prisma/client";

export const metadata: Metadata = {
  title: "Blog — Articles & Insights",
  description: "Explore articles on Flutter, mobile development, FastAPI, web technologies, and software engineering from Yousof Hashemzade.",
  keywords: ["Flutter", "Mobile Development", "FastAPI", "Next.js", "Software Engineering", "Yousof Hashemzade", "مقاله", "برنامه نویسی"],
  alternates: {
    canonical: "/blog",
    languages: {
      "fa": "/blog?lang=fa",
      "en": "/blog?lang=en",
      "ar": "/blog?lang=ar",
    },
  },
  openGraph: {
    title: "Blog — Yousof Hashemzade",
    description: "Articles on Flutter, mobile development, FastAPI, and software engineering.",
    type: "website",
    url: "/blog",
  },
};

const POST_SELECT = {
  id: true, slug: true, title: true, titleEn: true, titleAr: true,
  description: true, descriptionEn: true, descriptionAr: true,
  coverImage: true, tags: true, tagsEn: true, tagsAr: true,
  authorName: true, readTime: true, views: true, publishedAt: true,
  featured: true,
  category: { select: { id: true, slug: true, name: true, nameEn: true, nameAr: true, color: true } },
  _count: { select: { comments: true } },
} as const;

async function getInitialData() {
  const [categories, pinnedPosts] = await Promise.all([
    prisma.blogCategory.findMany({
      include: { _count: { select: { posts: { where: { published: true } } } } },
    }),
    prisma.blogPost.findMany({
      where: { published: true, featured: true },
      take: 3,
      orderBy: { publishedAt: "desc" },
      select: POST_SELECT,
    }),
  ]);
  return { categories, pinnedPosts };
}

export default async function BlogPage() {
  const { categories, pinnedPosts } = await getInitialData();
  return <BlogListingClient categories={categories} pinnedPosts={pinnedPosts} />;
}
