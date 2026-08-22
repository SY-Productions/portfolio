import prisma from "@/prisma/client";
import { fetchPinnedRepos } from "@/lib/github";
import type { HomeData } from "@/lib/agent-markdown";
import { htmlToMarkdown } from "@/lib/html-to-markdown";

/**
 * Server-side reads shared by the server-rendered homepage and the markdown
 * representations. Every query is wrapped so a single failing source degrades
 * to an empty section instead of taking the whole page or document down.
 */

const GITHUB_LOGIN = process.env.GITHUB_USERNAME || "YOUSSSOF";

const DEFAULT_TECHNOLOGIES =
  "Flutter,Dart,Python,FastAPI,Firebase,SQLite,Prisma,Next.js,React,TailwindCSS";

/** Runs a query, logging and swallowing failures so a section can degrade. */
async function safe<T>(label: string, run: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await run();
  } catch (error) {
    console.error(`agent-data: ${label} failed`, error);
    return fallback;
  }
}

const years = (from: number, to: number | null | undefined) =>
  `${from}–${to ?? "Present"}`;

const isoDate = (value: Date | null | undefined) =>
  value ? value.toISOString().slice(0, 10) : undefined;

/**
 * Everything the homepage and its markdown twin render, in one round trip.
 * English fields are preferred for the markdown/agent view, falling back to the
 * Persian original when a translation is missing.
 */
export async function getHomeData(): Promise<HomeData> {
  const [settings, workSamples, products, education, works, events, posts, repositories] =
    await Promise.all([
      safe("siteSettings", () => prisma.siteSettings.findUnique({ where: { id: 1 } }), null),
      safe("workSamples", () => prisma.workSample.findMany({ orderBy: { order: "asc" } }), []),
      safe("products", () => prisma.product.findMany({ orderBy: { order: "asc" } }), []),
      safe("education", () => prisma.education.findMany({ orderBy: { order: "asc" } }), []),
      safe("works", () => prisma.work.findMany({ orderBy: { order: "asc" } }), []),
      safe("events", () => prisma.event.findMany({ orderBy: { order: "asc" } }), []),
      safe(
        "posts",
        () =>
          prisma.blogPost.findMany({
            where: { published: true },
            orderBy: { publishedAt: "desc" },
            take: 10,
            select: {
              slug: true,
              title: true,
              titleEn: true,
              description: true,
              descriptionEn: true,
              publishedAt: true,
            },
          }),
        []
      ),
      safe("pinnedRepos", () => fetchPinnedRepos(GITHUB_LOGIN), []),
    ]);

  return {
    technologies: (settings?.technologies || DEFAULT_TECHNOLOGIES)
      .split(",")
      .map((tech) => tech.trim())
      .filter(Boolean),
    workSamples: workSamples.map((sample) => ({
      title: sample.enTitle || sample.faTitle,
      description: sample.enDescription || sample.faDescription,
      link: sample.link || undefined,
    })),
    repositories: repositories.map((repo) => ({
      name: repo.name,
      description: repo.description || "No description provided.",
      url: repo.url,
      language: repo.primaryLanguage || undefined,
      stars: repo.stars,
    })),
    products: products.map((product) => ({
      title: product.titleEn || product.title,
      description: product.descriptionEn || product.description,
      url: product.url,
      price: product.price || undefined,
    })),
    education: education.map((item) => ({
      name: item.nameEn || item.name,
      years: years(item.fromYear, item.toYear),
      description: item.descriptionEn || item.description,
    })),
    works: works.map((item) => ({
      name: item.nameEn || item.name,
      years: years(item.fromYear, item.toYear),
      description: item.descriptionEn || item.description,
      url: item.url || undefined,
    })),
    events: events.map((item) => ({
      name: item.nameEn || item.name,
      date: item.date,
      description: item.descriptionEn || item.description,
    })),
    posts: posts.map((post) => ({
      title: post.titleEn || post.title,
      description: post.descriptionEn || post.description,
      slug: post.slug,
      publishedAt: isoDate(post.publishedAt),
    })),
  };
}

export async function getBlogIndexData() {
  return safe(
    "blogIndex",
    async () => {
      const posts = await prisma.blogPost.findMany({
        where: { published: true },
        orderBy: { publishedAt: "desc" },
        select: {
          slug: true,
          title: true,
          titleEn: true,
          description: true,
          descriptionEn: true,
          publishedAt: true,
        },
      });
      return posts.map((post) => ({
        title: post.titleEn || post.title,
        description: post.descriptionEn || post.description,
        slug: post.slug,
        publishedAt: isoDate(post.publishedAt),
      }));
    },
    []
  );
}

export async function getBlogPostData(slug: string) {
  return safe(
    `blogPost:${slug}`,
    async () => {
      const post = await prisma.blogPost.findFirst({
        where: { slug, published: true },
      });
      if (!post) return null;
      const tags = (post.tagsEn || post.tags || "")
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
      return {
        title: post.titleEn || post.title,
        description: post.descriptionEn || post.description,
        slug: post.slug,
        content: htmlToMarkdown(post.contentEn || post.content),
        publishedAt: isoDate(post.publishedAt),
        author: post.authorName || undefined,
        tags,
      };
    },
    null
  );
}
