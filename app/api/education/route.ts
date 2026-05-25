import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { educationSchema } from "../schema";
import { requireAdmin } from "../auth/authOptions";

export async function GET(request: NextRequest) {
  try {
    const educations = await prisma.education.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(educations);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch educations ${error}` },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    const validation = educationSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });

    const maxOrder = await prisma.education.aggregate({
      _max: { order: true },
    });
    const nextOrder = (maxOrder._max.order ?? -1) + 1;

    const education = await prisma.education.create({
      data: {
        name: body.name,
        nameEn: body.nameEn ?? "",
        nameAr: body.nameAr ?? "",
        fromYear: body.fromYear,
        toYear: body.toYear ?? null,
        picture: body.picture,
        description: body.description,
        descriptionEn: body.descriptionEn ?? "",
        descriptionAr: body.descriptionAr ?? "",
        order: nextOrder,
      },
    });

    return NextResponse.json(education, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create education" },
      { status: 500 },
    );
  }
}
