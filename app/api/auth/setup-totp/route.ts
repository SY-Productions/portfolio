import { requireAdmin } from "@/app/api/auth/authOptions";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import speakeasy from "speakeasy";
import QRCode from "qrcode";

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  // Generate a new TOTP secret
  const secret = speakeasy.generateSecret({
    name: `Yousof Portfolio Admin`,
    issuer: "Portfolio Admin",
    length: 32,
  });

  // Generate QR code as data URL
  const qrDataUrl = await QRCode.toDataURL(secret.otpauth_url!);

  return NextResponse.json({
    secret: secret.base32,
    otpauthUrl: secret.otpauth_url,
    qrCode: qrDataUrl,
  });
}
