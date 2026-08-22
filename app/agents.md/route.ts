import { agentsMd } from "@/lib/agent-markdown";

/**
 * /agents.md — dedicated agent instruction file: best-fit tasks, explicit
 * non-goals, calling conventions and the rules agents are asked to follow.
 */
export const revalidate = 3600;

export function GET() {
  return new Response(agentsMd(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept, Accept-Encoding",
      "Cache-Control": "public, max-age=0, s-maxage=3600, must-revalidate",
    },
  });
}
