import sharp from "sharp";

const MAX_DIMENSION = 2048;

type CompressResult = { buffer: Buffer; ext: string };

export async function compressImage(
  buffer: Buffer,
  mimeType: string
): Promise<CompressResult> {
  if (mimeType === "image/svg+xml") return { buffer, ext: "svg" };
  if (mimeType === "image/gif") return { buffer, ext: "gif" };

  const image = sharp(buffer).resize(MAX_DIMENSION, MAX_DIMENSION, {
    fit: "inside",
    withoutEnlargement: true,
  });

  if (mimeType === "image/jpeg") {
    return {
      buffer: await image.jpeg({ quality: 90, progressive: true, mozjpeg: true }).toBuffer(),
      ext: "jpg",
    };
  }

  if (mimeType === "image/png") {
    return {
      buffer: await image.png({ compressionLevel: 9, adaptiveFiltering: true }).toBuffer(),
      ext: "png",
    };
  }

  if (mimeType === "image/webp") {
    return {
      buffer: await image.webp({ quality: 90 }).toBuffer(),
      ext: "webp",
    };
  }

  // Fallback: convert unknown raster formats to WebP
  return {
    buffer: await image.webp({ quality: 90 }).toBuffer(),
    ext: "webp",
  };
}
