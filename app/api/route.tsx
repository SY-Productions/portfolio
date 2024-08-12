import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { schema } from "./schema";

export async function GET(request: NextRequest) {
  const workSamples = await prisma.workSample.findMany();
  return NextResponse.json(workSamples);
}
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  const workSample = await prisma.workSample.create({
    data: {
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
}
