import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { requireAdmin } from "@/app/api/auth/authOptions";
import { z } from "zod";

const blogPostSchema = z.object({
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers and hyphens"),
  title: z.string().min(1),
  description: z.string().min(1),
  content: z.string().default(""),
  keywords: z.string().default(""),
  titleEn: z.string().default(""),
  descriptionEn: z.string().default(""),
  contentEn: z.string().default(""),
  keywordsEn: z.string().default(""),
  titleAr: z.string().default(""),
  descriptionAr: z.string().default(""),
  contentAr: z.string().default(""),
  keywordsAr: z.string().default(""),
  coverImage: z.string().default(""),
  tags: z.string().default(""),
  tagsEn: z.string().default(""),
  tagsAr: z.string().default(""),
  authorName: z.string().default("Yousof Hashemzade"),
  categoryId: z.number().nullable().default(null),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
  readTime: z.number().int().min(1).default(5),
});

export async function GET(req: NextRequest) {
  const authError = await requireAdmin(req);
  if (authError) return authError;

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const search = searchParams.get("search") || "";

  const where = search
    ? {
        OR: [
          { title: { contains: search } },
          { titleEn: { contains: search } },
          { slug: { contains: search } },
        ],
      }
    : {};

  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        category: { select: { id: true, name: true, nameEn: true, slug: true, color: true } },
        _count: { select: { comments: true } },
      },
    }),
    prisma.blogPost.count({ where }),
  ]);

  return NextResponse.json({ posts, total, page, totalPages: Math.ceil(total / limit) });
}

export async function POST(req: NextRequest) {
  const authError = await requireAdmin(req);
  if (authError) return authError;

  const body = await req.json();
  const parsed = blogPostSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  const { categoryId, ...data } = parsed.data;

  if (data.featured) {
    const pinnedCount = await prisma.blogPost.count({ where: { featured: true } });
    if (pinnedCount >= 3) {
      return NextResponse.json({ error: "Maximum 3 pinned posts allowed. Unpin an existing one first." }, { status: 422 });
    }
  }

  const post = await prisma.blogPost.create({
    data: {
      ...data,
      categoryId: categoryId ?? undefined,
      publishedAt: data.published ? new Date() : null,
    },
  });

  return NextResponse.json(post, { status: 201 });
}
