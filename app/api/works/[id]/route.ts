import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "../../auth/authOptions";
import { workSchema } from "../../schema";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = parseInt(params.id);
  if (isNaN(id))
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const work = await prisma.work.findUnique({ where: { id } });
  if (!work) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ ...work, technos: JSON.parse(work.technos) });
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
  const validation = workSchema.partial().safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const { id: _id, technos, ...rest } = validation.data;

  const updated = await prisma.work.update({
    where: { id },
    data: {
      ...rest,
      ...(technos !== undefined ? { technos: JSON.stringify(technos) } : {}),
    },
  });

  return NextResponse.json({
    ...updated,
    technos: JSON.parse(updated.technos),
  });
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

  await prisma.work.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
