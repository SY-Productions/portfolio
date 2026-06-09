import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { requireAdmin } from "@/app/api/auth/authOptions";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const authError = await requireAdmin(req);
  if (authError) return authError;

  await prisma.blogComment.delete({ where: { id: parseInt(params.id) } });
  return NextResponse.json({ ok: true });
}
