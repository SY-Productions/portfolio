import { MetadataRoute } from "next";
import prisma from "@/prisma/client";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://yousof.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true, publishedAt: true },
    orderBy: { publishedAt: "desc" },
  });

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.8,
    // Multilingual alternates
    alternates: {
      languages: {
        fa: `${BASE_URL}/blog/${post.slug}?lang=fa`,
        en: `${BASE_URL}/blog/${post.slug}?lang=en`,
        ar: `${BASE_URL}/blog/${post.slug}?lang=ar`,
      },
    },
  }));

  return [...staticPages, ...blogPages];
}
