import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

/** Public endpoint — tells the login page if 2FA is enabled (not the secret itself) */
export async function GET() {
  try {
    const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });
    return NextResponse.json({ enabled: !!settings?.totpSecret });
  } catch {
    return NextResponse.json({ enabled: false });
  }
}
