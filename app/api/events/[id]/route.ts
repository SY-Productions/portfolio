import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "../../auth/authOptions";
import { eventSchema } from "../../schema";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = parseInt(params.id);
  if (isNaN(id))
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(event);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const id = parseInt(params.id);
  if (isNaN(id))
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const body = await req.json();
  const validation = eventSchema.partial().safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const { id: _id, ...data } = validation.data;
  const updated = await prisma.event.update({ where: { id }, data });
  return NextResponse.json(updated);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const id = parseInt(params.id);
  if (isNaN(id))
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  await prisma.event.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
