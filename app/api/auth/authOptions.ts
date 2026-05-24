import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/prisma/client";
import speakeasy from "speakeasy";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        totpToken: { label: "2FA Code", type: "text" },
      },
      async authorize(credentials) {
        if (
          credentials?.username !== process.env.ADMIN_USERNAME ||
          credentials?.password !== process.env.ADMIN_PASSWORD
        ) {
          return null;
        }

        // Check if TOTP is enabled
        const settings = await prisma.siteSettings.findUnique({
          where: { id: 1 },
        });
        if (settings?.totpSecret) {
          const token = credentials?.totpToken;
          if (!token) return null; // TOTP required but not provided

          const valid = speakeasy.totp.verify({
            secret: settings.totpSecret,
            encoding: "base32",
            token: String(token),
            window: 1,
          });
          if (!valid) return null;
        }

        return { id: "1", name: "Admin" };
      },
    }),
  ],
  pages: { signIn: "/admin/login" },
  session: { strategy: "jwt" as const, maxAge: 60 * 60 * 8 },
  secret: process.env.NEXTAUTH_SECRET,
};

/** Returns 401 response if the request has no valid admin session. */
export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
