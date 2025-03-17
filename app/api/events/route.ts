import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { eventSchema } from "../schema";

export async function GET(request: NextRequest) {
  try {
    const events = await prisma.event.findMany();
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = eventSchema.safeParse(body);

    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });

    const event = await prisma.event.create({
      data: {
        name: body.name,
        date: body.date,
        picture: body.picture,
        attachment: body.attachment,
        description: body.description,
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
