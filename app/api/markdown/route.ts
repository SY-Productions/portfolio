import { NextRequest } from "next/server";
import {
  blogIndexMarkdown,
  blogPostMarkdown,
  cvMarkdown,
  developersMarkdown,
  homeMarkdown,
  notFoundMarkdown,
  staticPageMarkdown,
} from "@/lib/agent-markdown";
import {
  getBlogIndexData,
  getBlogPostData,
  getHomeData,
} from "@/lib/agent-data";
import { ABOUT_PAGE, CONTACT_PAGE, PRIVACY_PAGE } from "@/lib/site-content";
import { normalizePath, resolveMarkdownTarget } from "@/lib/markdown-routes";

/**
 * Markdown representation of any page, per acceptmarkdown.com.
 *
 * Not meant to be requested directly: `middleware.ts` rewrites here when a
 * client's `Accept` header prefers `text/markdown` over `text/html`, so the
 * canonical page URL serves both representations. `Vary: Accept` is set so a
 * CDN never hands the HTML variant to an agent that asked for markdown.
 */

export const dynamic = "force-dynamic";

function markdownResponse(body: string, status: number) {
  return new Response(body, {
    status,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept, Accept-Encoding",
      "Cache-Control": "public, max-age=0, must-revalidate",
      "Access-Control-Allow-Origin": "*",
      // The HTML variant at the same URL is the canonical, indexable one.
      "X-Robots-Tag": "noindex",
    },
  });
}

async function renderMarkdown(
  path: string
): Promise<{ body: string; status: number }> {
  const target = resolveMarkdownTarget(path);

  switch (target.kind) {
    case "home":
      return { body: homeMarkdown(await getHomeData()), status: 200 };
    case "about":
      return { body: staticPageMarkdown(ABOUT_PAGE), status: 200 };
    case "contact":
      return { body: staticPageMarkdown(CONTACT_PAGE), status: 200 };
    case "privacy":
      return { body: staticPageMarkdown(PRIVACY_PAGE), status: 200 };
    case "developers":
      return { body: developersMarkdown(), status: 200 };
    case "cv":
      return { body: cvMarkdown(), status: 200 };
    case "blogIndex":
      return { body: blogIndexMarkdown(await getBlogIndexData()), status: 200 };
    case "blogPost": {
      const post = await getBlogPostData(target.slug);
      if (post) return { body: blogPostMarkdown(post), status: 200 };
      break;
    }
    default:
      break;
  }

  return { body: notFoundMarkdown(normalizePath(path)), status: 404 };
}

/**
 * Middleware forwards the originally requested path as a header, because a
 * rewritten request still exposes the *original* URL through `nextUrl`. The
 * query parameter is the fallback for direct calls to this route.
 */
function requestedPath(request: NextRequest): string {
  return (
    request.headers.get("x-markdown-path") ||
    request.nextUrl.searchParams.get("path") ||
    "/"
  );
}

export async function GET(request: NextRequest) {
  const requested = requestedPath(request);
  const { body, status } = await renderMarkdown(requested);
  return markdownResponse(body, status);
}
