import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "../../auth/authOptions";
import { workSampleSchema } from "../../schema";
import { z } from "zod";

const updateSchema = workSampleSchema.partial().extend({
  id: z.number().optional(),
});

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = parseInt(params.id);
  if (isNaN(id))
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const sample = await prisma.workSample.findUnique({ where: { id } });
  if (!sample)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(sample);
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
  const validation = updateSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const { id: _id, isWeb, ...rest } = validation.data;
  const data = {
    ...rest,
    ...(isWeb !== undefined ? { isWeb: isWeb ? "1" : "0" } : {}),
  };

  const updated = await prisma.workSample.update({ where: { id }, data });
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

  await prisma.workSample.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
