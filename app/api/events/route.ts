import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { eventSchema } from "../schema";
import { requireAdmin } from "../auth/authOptions";

export async function GET(request: NextRequest) {
  try {
    const events = await prisma.event.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    const validation = eventSchema.safeParse(body);

    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });

    const maxOrder = await prisma.event.aggregate({ _max: { order: true } });
    const nextOrder = (maxOrder._max.order ?? -1) + 1;

    const event = await prisma.event.create({
      data: {
        name: body.name,
        nameEn: body.nameEn ?? "",
        nameAr: body.nameAr ?? "",
        date: body.date,
        picture: body.picture,
        attachment: body.attachment,
        description: body.description,
        descriptionEn: body.descriptionEn ?? "",
        descriptionAr: body.descriptionAr ?? "",
        order: nextOrder,
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 },
    );
  }
}
