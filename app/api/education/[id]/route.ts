import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "../../auth/authOptions";
import { educationSchema } from "../../schema";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = parseInt(params.id);
  if (isNaN(id))
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const edu = await prisma.education.findUnique({ where: { id } });
  if (!edu) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(edu);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;

  const id = parseInt(params.id);
  if (isNaN(id))
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const body = await req.json();
  const validation = educationSchema.partial().safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const { id: _id, ...data } = validation.data;
  const updated = await prisma.education.update({ where: { id }, data });
  return NextResponse.json(updated);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;

  const id = parseInt(params.id);
  if (isNaN(id))
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  await prisma.education.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
