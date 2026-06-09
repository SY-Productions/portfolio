import { requireAdmin } from "@/app/api/auth/authOptions";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import speakeasy from "speakeasy";

export async function POST(req: NextRequest) {
  const authError = await requireAdmin(req);
  if (authError) return authError;

  const { secret, token } = await req.json();

  if (!secret || !token) {
    return NextResponse.json(
      { error: "Missing secret or token" },
      { status: 400 },
    );
  }

  const valid = speakeasy.totp.verify({
    secret,
    encoding: "base32",
    token: String(token),
    window: 1,
  });

  if (!valid) {
    return NextResponse.json(
      { error: "Invalid code. Please try again." },
      { status: 400 },
    );
  }

  // Save secret to SiteSettings (ensure singleton row exists)
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    create: { id: 1, totpSecret: secret },
    update: { totpSecret: secret },
  });

  return NextResponse.json({ success: true });
}
