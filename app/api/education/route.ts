import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { educationSchema } from "../schema";

export async function GET(request: NextRequest) {
  try {
    const educations = await prisma.education.findMany();
    return NextResponse.json(educations);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch educations ${error}` },
      { status: 500 }
    );
  }
}
