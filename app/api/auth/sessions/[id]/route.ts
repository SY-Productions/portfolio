import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/prisma/client";
import { authOptions, requireAdmin } from "../../authOptions";

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const unauth = await requireAdmin();
  if (unauth) return unauth;

  const session = await getServerSession(authOptions) as { jti?: string } | null;
  const id = Number(params.id);

  const adminSession = await prisma.adminSession.findUnique({ where: { id } });
  if (!adminSession) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }
  if (adminSession.jti === session?.jti) {
    return NextResponse.json({ error: "Cannot revoke your current session" }, { status: 400 });
  }

  await prisma.adminSession.update({ where: { id }, data: { isRevoked: true } });
  return NextResponse.json({ success: true });
}
