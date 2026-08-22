/**
 * Maps a requested page path to the markdown document that represents it.
 *
 * Pure and free of Next.js/database imports so the routing table can be
 * unit-tested: an agent asking for markdown must get a 200 for pages that
 * exist and a 404 for everything else, exactly like the HTML variant.
 */

export type MarkdownTarget =
  | { kind: "home" }
  | { kind: "about" }
  | { kind: "contact" }
  | { kind: "privacy" }
  | { kind: "developers" }
  | { kind: "cv" }
  | { kind: "blogIndex" }
  | { kind: "blogPost"; slug: string }
  | { kind: "notFound" };

/** Strips trailing slashes so "/about/" and "/about" resolve identically. */
export function normalizePath(path: string): string {
  const decoded = path.trim();
  const withSlash = decoded.startsWith("/") ? decoded : `/${decoded}`;
  return withSlash.length > 1 ? withSlash.replace(/\/+$/, "") : "/";
}

const FIXED: Record<string, MarkdownTarget> = {
  "/": { kind: "home" },
  "/about": { kind: "about" },
  "/contact": { kind: "contact" },
  "/privacy": { kind: "privacy" },
  "/developers": { kind: "developers" },
  "/cv": { kind: "cv" },
  "/blog": { kind: "blogIndex" },
};

export function resolveMarkdownTarget(rawPath: string): MarkdownTarget {
  const path = normalizePath(rawPath);

  const fixed = FIXED[path];
  if (fixed) return fixed;

  const blogMatch = /^\/blog\/([^/]+)$/.exec(path);
  if (blogMatch) {
    const slug = safeDecode(blogMatch[1]);
    if (slug) return { kind: "blogPost", slug };
  }

  return { kind: "notFound" };
}

/** A malformed percent-escape must 404, not throw. */
function safeDecode(value: string): string | null {
  try {
    const decoded = decodeURIComponent(value);
    return decoded.length ? decoded : null;
  } catch {
    return null;
  }
}
