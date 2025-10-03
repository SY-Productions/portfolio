import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { workSampleSchema } from "../schema";

export async function GET(request: NextRequest) {
  try {
    const workSamples = await prisma.workSample.findMany();
    console.log('heelo');
    console.log(workSamples);
    return NextResponse.json(workSamples);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch work samples ${error}` },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = workSampleSchema.safeParse(body);

    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });

    const workSample = await prisma.workSample.create({
      data: {
        id: body.id,
        isWeb: body.isWeb,
        faTitle: body.faTitle,
        enTitle: body.enTitle,
        faDescription: body.faDescription,
        enDescription: body.enDescription,
        pictures: body.pictures,
        link: body.link,
        technologys: body.technologys,
        faStartDate: body.faStartDate,
        enStartDate: body.enStartDate,
        faEndDate: body.faEndDate,
        enEndDate: body.enEndDate,
      },
    });

    return NextResponse.json(workSample, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create work sample" },
      { status: 500 }
    );
  }
}
