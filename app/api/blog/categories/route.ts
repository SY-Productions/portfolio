import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET() {
  const categories = await prisma.blogCategory.findMany({
    include: {
      _count: { select: { posts: { where: { published: true } } } },
    },
    orderBy: { id: "asc" },
  });
  return NextResponse.json(categories);
}
