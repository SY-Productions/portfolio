import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";
import { isNotAcceptable, prefersMarkdown } from "@/lib/http/accept";

const SIGN_IN_PATH = "/admin/login";
const MARKDOWN_ROUTE = "/api/markdown";
const MARKDOWN_PATH_HEADER = "x-markdown-path";

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

function requireAdminSession(req: NextRequest) {
  const signInUrl = req.nextUrl.clone();
  signInUrl.pathname = SIGN_IN_PATH;
  signInUrl.search = "";
  signInUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
  return NextResponse.redirect(signInUrl);
}

/**
 * Proactive content negotiation for pages (acceptmarkdown.com).
 *
 * This has to run in middleware rather than in the page: the HTML variant is
 * served from the CDN cache, whose key ignores `Accept`, so the decision must
 * happen before the cache lookup. `Vary: Accept` is advertised on both variants
 * so downstream caches key on it too.
 */
function negotiatePage(req: NextRequest) {
  const accept = req.headers.get("accept");

  if (isNotAcceptable(accept)) {
    return new NextResponse(
      "This URL can be served as text/html or text/markdown only.\n",
      {
        status: 406,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          Vary: "Accept, Accept-Encoding",
        },
      }
    );
  }

  if (prefersMarkdown(accept)) {
    const url = new URL(MARKDOWN_ROUTE, req.nextUrl.origin);
    url.searchParams.set("path", req.nextUrl.pathname);

    // The requested path also travels as a header: a rewritten request reaches
    // the handler with the *original* nextUrl, so the query string added here
    // is not visible to it. The header is the reliable channel; the query
    // parameter stays as a fallback for direct calls to /api/markdown.
    const headers = new Headers(req.headers);
    headers.set(MARKDOWN_PATH_HEADER, req.nextUrl.pathname);

    return NextResponse.rewrite(url, { request: { headers } });
  }

  // Next.js overwrites Vary on page responses with its own router values, so
  // this append does not survive for prerendered pages. The authoritative
  // `Vary: Accept` lives on the markdown responses themselves, which is the
  // variant a shared cache could otherwise mismatch.
  const response = NextResponse.next();
  response.headers.append("Vary", "Accept");
  return response;
}

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const isSignInPage =
      pathname === SIGN_IN_PATH || pathname.startsWith(`${SIGN_IN_PATH}/`);
    if (isSignInPage) return NextResponse.next();
    const token = await readSessionToken(req);
    return token ? NextResponse.next() : requireAdminSession(req);
  }

  if (req.method !== "GET" && req.method !== "HEAD") return NextResponse.next();

  return negotiatePage(req);
}

export const config = {
  /*
   * Every page route: admin (auth) plus public pages (content negotiation).
   * Excluded are API routes, Next.js internals, and any path with a file
   * extension — those serve a single fixed representation.
   */
  matcher: ["/((?!api/|_next/static|_next/image|.*\\.).*)"],
};
