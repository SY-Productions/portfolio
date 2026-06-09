import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "../auth/authOptions";
import { z } from "zod";

const productSchema = z.object({
  title: z.string().min(1),
  titleEn: z.string().optional().default(""),
  titleAr: z.string().optional().default(""),
  description: z.string().min(1),
  descriptionEn: z.string().optional().default(""),
  descriptionAr: z.string().optional().default(""),
  url: z.string().url(),
  imageUrl: z.string().optional().default(""),
  price: z.string().optional().default(""),
  category: z.string().optional().default("theme"),
});

export async function GET() {
  try {
    const products = await prisma.product.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: `Failed to fetch products ${error}` }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    const validation = productSchema.safeParse(body);
    if (!validation.success) return NextResponse.json(validation.error.errors, { status: 400 });

    const maxOrder = await prisma.product.aggregate({ _max: { order: true } });
    const nextOrder = (maxOrder._max.order ?? -1) + 1;

    const product = await prisma.product.create({
      data: { ...validation.data, order: nextOrder },
    });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: `Failed to create product ${error}` }, { status: 500 });
  }
}
