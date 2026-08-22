import { buildOpenApiDocument } from "@/lib/openapi";

/**
 * /openapi.json — machine-readable description of the public read-only API,
 * published at a predictable URL and linked from llms.txt, agents.md and the
 * /developers index so agents can find it by name.
 */
export const revalidate = 3600;

export function GET() {
  return new Response(JSON.stringify(buildOpenApiDocument(), null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Vary: "Accept, Accept-Encoding",
      "Cache-Control": "public, max-age=0, s-maxage=3600, must-revalidate",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
