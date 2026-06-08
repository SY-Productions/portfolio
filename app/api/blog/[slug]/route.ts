import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug, published: true },
    include: {
      category: true,
      comments: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Increment view count (fire-and-forget)
  prisma.blogPost.update({
    where: { id: post.id },
    data: { views: { increment: 1 } },
  }).catch(() => {});

  return NextResponse.json(post);
}
