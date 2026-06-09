import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { requireAdmin } from "@/app/api/auth/authOptions";
import { z } from "zod";

const updateSchema = z.object({
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/),
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

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const authError = await requireAdmin(req);
  if (authError) return authError;

  const post = await prisma.blogPost.findUnique({
    where: { id: parseInt(params.id) },
    include: { category: true, comments: { orderBy: { createdAt: "desc" } } },
  });

  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const authError = await requireAdmin(req);
  if (authError) return authError;

  const body = await req.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  const id = parseInt(params.id);
  const existing = await prisma.blogPost.findUnique({ where: { id }, select: { published: true, publishedAt: true, featured: true } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const { categoryId, ...data } = parsed.data;

  if (data.featured && !existing.featured) {
    const pinnedCount = await prisma.blogPost.count({ where: { featured: true, id: { not: id } } });
    if (pinnedCount >= 3) {
      return NextResponse.json({ error: "Maximum 3 pinned posts allowed. Unpin an existing one first." }, { status: 422 });
    }
  }

  // Set publishedAt when first publishing
  let publishedAt = existing.publishedAt;
  if (data.published && !existing.published) {
    publishedAt = new Date();
  } else if (!data.published) {
    publishedAt = null;
  }

  const post = await prisma.blogPost.update({
    where: { id },
    data: {
      ...data,
      categoryId: categoryId ?? null,
      publishedAt,
    },
  });

  return NextResponse.json(post);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const authError = await requireAdmin(req);
  if (authError) return authError;

  await prisma.blogPost.delete({ where: { id: parseInt(params.id) } });
  return NextResponse.json({ ok: true });
}
