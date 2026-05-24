import { requireAdmin } from "@/app/api/auth/authOptions";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

/** Disable 2FA by clearing the TOTP secret */
export async function DELETE() {
  const authError = await requireAdmin();
  if (authError) return authError;

  await prisma.siteSettings.upsert({
    where: { id: 1 },
    create: { id: 1, totpSecret: null },
    update: { totpSecret: null },
  });

  return NextResponse.json({ success: true });
}

/** Check if 2FA is enabled */
export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  return NextResponse.json({ enabled: !!settings?.totpSecret });
}
