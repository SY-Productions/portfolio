import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { z } from "zod";

const commentSchema = z.object({
  name: z.string().min(1).max(80),
  email: z.string().email().optional().or(z.literal("")),
  content: z.string().min(1).max(2000),
  lang: z.enum(["fa", "en", "ar"]).default("fa"),
});

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug, published: true },
    select: { id: true },
  });

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  const body = await req.json();
  const parsed = commentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  const comment = await prisma.blogComment.create({
    data: {
      postId: post.id,
      name: parsed.data.name,
      email: parsed.data.email || "",
      content: parsed.data.content,
      lang: parsed.data.lang,
    },
  });

  return NextResponse.json(comment, { status: 201 });
}
