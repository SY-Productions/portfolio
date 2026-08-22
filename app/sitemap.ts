import { MetadataRoute } from "next";
import prisma from "@/prisma/client";
import { SITE_URL, absoluteUrl } from "@/lib/site-profile";

/** Pages served from the app router that are not driven by the database. */
const STATIC_ROUTES: { path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/blog", priority: 0.9, changeFrequency: "daily" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "/developers", priority: 0.7, changeFrequency: "monthly" },
  { path: "/cv", priority: 0.7, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.4, changeFrequency: "monthly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true, publishedAt: true },
    orderBy: { publishedAt: "desc" },
  });

  const staticPages: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: route.path === "/" ? SITE_URL : absoluteUrl(route.path),
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: post.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.8,
    // Multilingual alternates
    alternates: {
      languages: {
        fa: absoluteUrl(`/blog/${post.slug}?lang=fa`),
        en: absoluteUrl(`/blog/${post.slug}?lang=en`),
        ar: absoluteUrl(`/blog/${post.slug}?lang=ar`),
      },
    },
  }));

  return [...staticPages, ...blogPages];
}
