import { requireAdmin } from "@/app/api/auth/authOptions";
import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { compressImage } from "@/lib/imageCompression";

export async function POST(req: NextRequest) {
  const authError = await requireAdmin(req);
  if (authError) return authError;

  const formData = await req.formData();
  const files = formData.getAll("files") as File[];
  const folder = (formData.get("folder") as string) || "uploads";

  if (!files.length) {
    return NextResponse.json({ error: "No files provided" }, { status: 400 });
  }

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/svg+xml",
  ];
  const uploadedPaths: string[] = [];

  // Ensure upload directory exists
  const uploadDir = path.join(process.cwd(), "public", folder);
  await mkdir(uploadDir, { recursive: true });

  for (const file of files) {
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: `File type ${file.type} not allowed` },
        { status: 400 },
      );
    }

    const bytes = await file.arrayBuffer();
    const { buffer: compressed, ext } = await compressImage(
      Buffer.from(bytes),
      file.type
    );

    const safeName = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}.${ext}`;
    const filePath = path.join(uploadDir, safeName);

    await writeFile(filePath, new Uint8Array(compressed));
    uploadedPaths.push(`/${folder}/${safeName}`);
  }

  return NextResponse.json({ paths: uploadedPaths });
}
