import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

/** Public endpoint — returns site theme colors for client-side CSS variable injection */
export async function GET() {
  try {
    const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });
    if (!settings) return NextResponse.json({});
    return NextResponse.json({
      themeA: settings.themeA,
      themeB: settings.themeB,
      themeC: settings.themeC,
      themeD: settings.themeD,
      profilePic: settings.profilePic,
      technologies: settings.technologies,
    });
  } catch {
    return NextResponse.json({});
  }
}
