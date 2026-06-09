import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { requireAdmin } from "@/app/api/auth/authOptions";
import { z } from "zod";

const categorySchema = z.object({
  name: z.string().min(1),
  nameEn: z.string().default(""),
  nameAr: z.string().default(""),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  color: z.string().default("#5A8EFF"),
});

export async function GET(req: NextRequest) {
  const authError = await requireAdmin(req);
  if (authError) return authError;

  const categories = await prisma.blogCategory.findMany({
    include: { _count: { select: { posts: true } } },
    orderBy: { id: "asc" },
  });
  return NextResponse.json(categories);
}

export async function POST(req: NextRequest) {
  const authError = await requireAdmin(req);
  if (authError) return authError;

  const body = await req.json();
  const parsed = categorySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  const category = await prisma.blogCategory.create({ data: parsed.data });
  return NextResponse.json(category, { status: 201 });
}
