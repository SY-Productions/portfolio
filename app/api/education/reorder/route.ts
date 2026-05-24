import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "../../auth/authOptions";

/** PATCH /api/education/reorder
 * Body: { ids: number[] }
 */
export async function PATCH(req: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const body = await req.json();
  const ids: number[] = body.ids;

  if (!Array.isArray(ids) || ids.some((id) => typeof id !== "number")) {
    return NextResponse.json(
      { error: "ids must be an array of numbers" },
      { status: 400 },
    );
  }

  await Promise.all(
    ids.map((id, index) =>
      prisma.education.update({ where: { id }, data: { order: index } }),
    ),
  );

  return NextResponse.json({ success: true });
}
