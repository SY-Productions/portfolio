import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "../../auth/authOptions";
import { z } from "zod";

const updateSchema = z.object({
  title: z.string().min(1).optional(),
  titleEn: z.string().optional(),
  titleAr: z.string().optional(),
  description: z.string().min(1).optional(),
  descriptionEn: z.string().optional(),
  descriptionAr: z.string().optional(),
  url: z.string().url().optional(),
  imageUrl: z.string().optional(),
  price: z.string().optional(),
  category: z.string().optional(),
  order: z.number().int().optional(),
});

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  const id = parseInt(params.id);
  if (isNaN(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  try {
    const body = await request.json();
    const validation = updateSchema.safeParse(body);
    if (!validation.success) return NextResponse.json(validation.error.errors, { status: 400 });

    const product = await prisma.product.update({ where: { id }, data: validation.data });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: `Failed to update product ${error}` }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  const id = parseInt(params.id);
  if (isNaN(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  try {
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: `Failed to delete product ${error}` }, { status: 500 });
  }
}
