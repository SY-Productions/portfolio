import { requireAdmin } from "@/app/api/auth/authOptions";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";


const DEFAULT_SETTINGS = {
  themeA: "#5A0E12",
  themeB: "#3B070A",
  themeC: "#141010",
  themeD: "#8B1E24",
  profilePic: "/pic.jpg",
  technologies:
    "Flutter,Dart,Python,FastAPI,Firebase,SQLite,PostgreSQL,Next.js,React,TypeScript,JavaScript,Node.js,Prisma,TailwindCSS,GetX,BLoC,REST API,Git,Docker,Linux",
  totpSecret: null,
};

export async function GET(req: NextRequest) {
  const authError = await requireAdmin(req);
  if (authError) return authError;

  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  return NextResponse.json(settings ?? { id: 1, ...DEFAULT_SETTINGS });
}

export async function PUT(req: NextRequest) {
  const authError = await requireAdmin(req);
  if (authError) return authError;

  const body = await req.json();

  // Only allow updating safe fields (not totpSecret from this endpoint)
  const data: Record<string, string> = {};
  if (body.themeA) data.themeA = body.themeA;
  if (body.themeB) data.themeB = body.themeB;
  if (body.themeC) data.themeC = body.themeC;
  if (body.themeD) data.themeD = body.themeD;
  if (body.profilePic !== undefined) data.profilePic = body.profilePic;
  if (body.technologies !== undefined) data.technologies = body.technologies;

  const settings = await prisma.siteSettings.upsert({
    where: { id: 1 },
    create: { id: 1, ...DEFAULT_SETTINGS, ...data },
    update: data,
  });

  return NextResponse.json(settings);
}
