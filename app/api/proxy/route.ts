import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  if (!url) return new NextResponse("Missing url", { status: 400 });

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return new NextResponse("Invalid url", { status: 400 });
  }

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,*/*",
        "Accept-Language": "en-US,en;q=0.9",
      },
      redirect: "follow",
    });

    const contentType = res.headers.get("content-type") ?? "text/html";
    const isHtml = contentType.includes("text/html");

    if (!isHtml) {
      // For non-HTML (CSS, fonts, images from same proxy call) just pass through
      const body = await res.arrayBuffer();
      return new NextResponse(body, {
        headers: { "Content-Type": contentType },
      });
    }

    let html = await res.text();

    // Inject base tag so relative URLs resolve against the origin
    const baseTag = `<base href="${parsed.origin}/">`;
    if (html.includes("<head>")) {
      html = html.replace("<head>", `<head>${baseTag}`);
    } else if (html.includes("<HEAD>")) {
      html = html.replace("<HEAD>", `<HEAD>${baseTag}`);
    } else {
      html = baseTag + html;
    }

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        // Intentionally omit X-Frame-Options and CSP frame-ancestors
        // so the browser will allow framing inside our own page
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return new NextResponse("Proxy error", { status: 502 });
  }
}
