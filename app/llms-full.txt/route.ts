import { llmsFullTxt } from "@/lib/agent-markdown";
import { getHomeData } from "@/lib/agent-data";

/**
 * /llms-full.txt — llms.txt plus the full text of every static surface, for
 * agents that would rather ingest one document than crawl the site.
 */
export const revalidate = 3600;

export async function GET() {
  return new Response(llmsFullTxt(await getHomeData()), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept, Accept-Encoding",
      "Cache-Control": "public, max-age=0, s-maxage=3600, must-revalidate",
    },
  });
}
