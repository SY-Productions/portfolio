import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { requireAdmin } from "@/app/api/auth/authOptions";
import { z } from "zod";

const updateSchema = z.object({
  name: z.string().min(1),
  nameEn: z.string().default(""),
  nameAr: z.string().default(""),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  color: z.string().default("#5A8EFF"),
});

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

  const category = await prisma.blogCategory.update({
    where: { id: parseInt(params.id) },
    data: parsed.data,
  });
  return NextResponse.json(category);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const authError = await requireAdmin(req);
  if (authError) return authError;

  await prisma.blogCategory.delete({ where: { id: parseInt(params.id) } });
  return NextResponse.json({ ok: true });
}
