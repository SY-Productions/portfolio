import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const path =
      typeof body.path === "string"
        ? body.path.slice(0, 255).replace(/[^a-zA-Z0-9/_\-?=&#.%]/g, "")
        : "/";

    const lang = ["fa", "en", "ar"].includes(body.lang) ? body.lang : "fa";

    // Don't track admin pages
    if (path.startsWith("/admin")) {
      return NextResponse.json({ ok: true });
    }

    await prisma.pageView.create({ data: { path, lang } });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
