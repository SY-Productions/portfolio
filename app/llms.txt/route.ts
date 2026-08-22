import { llmsTxt } from "@/lib/agent-markdown";

/**
 * /llms.txt — the llmstxt.org entry point: what this site is, when an agent
 * should reach for it, and how to call it. Regenerated hourly so the endpoint
 * list and contact details can never go stale relative to the code.
 */
export const revalidate = 3600;

export function GET() {
  return new Response(llmsTxt(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept, Accept-Encoding",
      "Cache-Control": "public, max-age=0, s-maxage=3600, must-revalidate",
    },
  });
}
