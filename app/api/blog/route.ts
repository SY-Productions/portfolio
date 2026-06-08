import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lang = searchParams.get("lang") || "fa";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "9");
  const categorySlug = searchParams.get("category") || "";
  const tag = searchParams.get("tag") || "";
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "newest";
  const featured = searchParams.get("featured") === "true";

  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = { published: true };

  if (categorySlug) {
    where.category = { slug: categorySlug };
  }

  if (featured) {
    where.featured = true;
  }

  if (tag) {
    const tagField = lang === "en" ? "tagsEn" : lang === "ar" ? "tagsAr" : "tags";
    where[tagField] = { contains: tag };
  }

  if (search) {
    const titleField = lang === "en" ? "titleEn" : lang === "ar" ? "titleAr" : "title";
    const descField = lang === "en" ? "descriptionEn" : lang === "ar" ? "descriptionAr" : "description";
    where.OR = [
      { [titleField]: { contains: search } },
      { [descField]: { contains: search } },
      { title: { contains: search } },
      { titleEn: { contains: search } },
    ];
  }

  const orderBy =
    sort === "oldest"
      ? { publishedAt: "asc" as const }
      : sort === "views"
      ? { views: "desc" as const }
      : sort === "readTime"
      ? { readTime: "asc" as const }
      : { publishedAt: "desc" as const };

  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      select: {
        id: true,
        slug: true,
        title: true,
        titleEn: true,
        titleAr: true,
        description: true,
        descriptionEn: true,
        descriptionAr: true,
        coverImage: true,
        tags: true,
        tagsEn: true,
        tagsAr: true,
        authorName: true,
        readTime: true,
        views: true,
        publishedAt: true,
        createdAt: true,
        featured: true,
        category: {
          select: { id: true, slug: true, name: true, nameEn: true, nameAr: true, color: true },
        },
        _count: { select: { comments: true } },
      },
    }),
    prisma.blogPost.count({ where }),
  ]);

  return NextResponse.json({
    posts,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}
