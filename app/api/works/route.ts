import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { workSchema } from "../schema";
import { requireAdmin } from "../auth/authOptions";

export async function GET(request: NextRequest) {
  try {
    const works = await prisma.work.findMany({ orderBy: { order: "asc" } });

    const parsedWorks = works.map((work: { technos: string }) => ({
      ...work,
      technos: JSON.parse(work.technos),
    }));

    return NextResponse.json(parsedWorks);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch works" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    const validation = workSchema.safeParse(body);

    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });

    const maxOrder = await prisma.work.aggregate({ _max: { order: true } });
    const nextOrder = (maxOrder._max.order ?? -1) + 1;

    const work = await prisma.work.create({
      data: {
        name: body.name,
        technos: JSON.stringify(body.technos),
        fromYear: body.fromYear,
        toYear: body.toYear,
        picture: body.picture,
        url: body.url,
        description: body.description,
        order: nextOrder,
      },
    });

    return NextResponse.json(
      { ...work, technos: body.technos },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create work" },
      { status: 500 },
    );
  }
}
