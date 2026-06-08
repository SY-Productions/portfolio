import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/prisma/client";
import speakeasy from "speakeasy";
import crypto from "crypto";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        totpToken: { label: "2FA Code", type: "text" },
      },
      async authorize(credentials, req) {
        if (
          credentials?.username !== process.env.ADMIN_USERNAME ||
          credentials?.password !== process.env.ADMIN_PASSWORD
        ) {
          return null;
        }

        const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });
        if (settings?.totpSecret) {
          const token = credentials?.totpToken;
          if (!token) return null;
          const valid = speakeasy.totp.verify({
            secret: settings.totpSecret,
            encoding: "base32",
            token: String(token),
            window: 1,
          });
          if (!valid) return null;
        }

        // Capture device info to attach to the session record
        const h = (req as { headers?: Record<string, string | string[] | undefined> })?.headers ?? {};
        const ua = Array.isArray(h["user-agent"]) ? h["user-agent"][0] : (h["user-agent"] ?? "");
        const ip = Array.isArray(h["x-forwarded-for"])
          ? h["x-forwarded-for"][0]
          : (h["x-forwarded-for"] ?? h["x-real-ip"] ?? "");
        const ipStr = Array.isArray(ip) ? ip[0] : (ip ?? "");

        return { id: "1", name: "Admin", userAgent: ua, ip: ipStr } as never;
      },
    }),
  ],
  pages: { signIn: "/admin/login" },
  session: { strategy: "jwt" as const, maxAge: 60 * 60 * 8 },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, trigger }: { token: any; user: any; trigger?: string }) {
      if (trigger === "signIn" && user) {
        const jti = crypto.randomUUID();
        token.jti = jti;
        try {
          await prisma.adminSession.create({
            data: { jti, userAgent: user.userAgent ?? "", ip: user.ip ?? "" },
          });
        } catch { /* non-fatal — session tracking best-effort */ }
      } else if (token.jti) {
        try {
          const adminSession = await prisma.adminSession.findUnique({
            where: { jti: token.jti },
          });
          if (!adminSession || adminSession.isRevoked) {
            token.error = "SESSION_REVOKED";
            return token;
          }
          // Throttle lastSeenAt updates to once per 5 minutes
          const staleSince = Date.now() - adminSession.lastSeenAt.getTime();
          if (staleSince > 5 * 60 * 1000) {
            await prisma.adminSession.update({
              where: { jti: token.jti },
              data: { lastSeenAt: new Date() },
            });
          }
        } catch { /* non-fatal */ }
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.jti = token.jti;
      if (token.error) session.error = token.error;
      return session;
    },
  },
};

/** Returns 401 response if the request has no valid admin session. */
export async function requireAdmin() {
  const session = await getServerSession(authOptions) as { error?: string } | null;
  if (!session || session.error === "SESSION_REVOKED") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
