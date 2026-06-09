import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { workSampleSchema } from "../schema";
import { requireAdmin } from "../auth/authOptions";

export async function GET(request: NextRequest) {
  try {
    const workSamples = await prisma.workSample.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(workSamples);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch work samples ${error}` },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    const validation = workSampleSchema.safeParse(body);

    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });

    const maxOrder = await prisma.workSample.aggregate({
      _max: { order: true },
    });
    const nextOrder = (maxOrder._max.order ?? -1) + 1;

    const workSample = await prisma.workSample.create({
      data: {
        isWeb: body.isWeb,
        faTitle: body.faTitle,
        enTitle: body.enTitle,
        arTitle: body.arTitle ?? "",
        faDescription: body.faDescription,
        enDescription: body.enDescription,
        arDescription: body.arDescription ?? "",
        pictures: body.pictures,
        link: body.link,
        technologys: body.technologys,
        faStartDate: body.faStartDate,
        enStartDate: body.enStartDate,
        arStartDate: body.arStartDate ?? "",
        faEndDate: body.faEndDate,
        enEndDate: body.enEndDate,
        arEndDate: body.arEndDate ?? "",
        customLinks: body.customLinks ?? null,
        order: nextOrder,
      },
    });

    return NextResponse.json(workSample, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create work sample" },
      { status: 500 },
    );
  }
}
