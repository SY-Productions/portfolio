import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/prisma/client";
import { authOptions, requireAdmin } from "../authOptions";

export async function GET() {
  const unauth = await requireAdmin();
  if (unauth) return unauth;

  const session = await getServerSession(authOptions) as { jti?: string } | null;
  const currentJti = session?.jti;

  const sessions = await prisma.adminSession.findMany({
    where: { isRevoked: false },
    orderBy: { lastSeenAt: "desc" },
  });

  return NextResponse.json(
    sessions.map((s) => ({
      id: s.id,
      userAgent: s.userAgent,
      ip: s.ip,
      createdAt: s.createdAt,
      lastSeenAt: s.lastSeenAt,
      isCurrent: s.jti === currentJti,
    }))
  );
}
