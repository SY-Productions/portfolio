import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

const SIGN_IN_PATH = "/admin/login";

/**
 * NextAuth names the session cookie `__Secure-next-auth.session-token` on HTTPS
 * and `next-auth.session-token` otherwise. `getToken` infers which to read from
 * NEXTAUTH_URL, so a stale or http:// value in the environment makes it look for
 * a cookie that was never set and log the admin straight back out. Try both
 * names instead of trusting the environment — same approach as requireAdmin().
 */
async function readSessionToken(req: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET;
  return (
    (await getToken({ req, secret, secureCookie: true }).catch(() => null)) ??
    (await getToken({ req, secret, secureCookie: false }).catch(() => null))
  );
}

export default async function middleware(req: NextRequest) {
  const token = await readSessionToken(req);
  if (token) return NextResponse.next();

  const signInUrl = req.nextUrl.clone();
  signInUrl.pathname = SIGN_IN_PATH;
  signInUrl.search = "";
  signInUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
  return NextResponse.redirect(signInUrl);
}

export const config = {
  // Protect /admin itself and everything under it except the login page.
  matcher: ["/admin", "/admin/((?!login).*)"],
};
