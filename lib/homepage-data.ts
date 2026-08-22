import prisma from "@/prisma/client";
import { fetchPinnedRepos, type PinnedRepo } from "@/lib/github";
import type { WorkSample } from "@/components/WorkSamples/WorkSamples";
import type { Education } from "@/components/Education/Education";
import type { Work } from "@/components/Work/Work";
import type { Event } from "@/components/Events/Events";
import type { Product } from "@/components/Products/Products";

/**
 * Server-side seed data for the homepage sections.
 *
 * The section components still refetch on mount (they have to: the visible
 * language is resolved client-side), but seeding them means the raw HTML that
 * AI crawlers and no-JavaScript clients receive contains the real project,
 * education, work and product content instead of empty skeletons.
 *
 * Shapes deliberately mirror the matching `/api/*` responses so the seeded
 * render and the refetched render agree.
 */

const GITHUB_LOGIN = process.env.GITHUB_USERNAME || "YOUSSSOF";

export type HomepageData = {
  workSamples: WorkSample[];
  repositories: PinnedRepo[];
  products: Product[];
  educations: Education[];
  works: Work[];
  events: Event[];
};

/** Runs a query, degrading one section to empty rather than failing the page. */
async function safe<T>(label: string, run: () => Promise<T[]>): Promise<T[]> {
  try {
    return await run();
  } catch (error) {
    console.error(`homepage-data: ${label} failed`, error);
    return [];
  }
}

/** `technos` is stored as a JSON string; /api/works parses it before returning. */
function parseTechnos(raw: string): string[] {
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

export async function getHomepageData(): Promise<HomepageData> {
  const [workSamples, repositories, products, educations, works, events] =
    await Promise.all([
      safe<WorkSample>(
        "workSamples",
        () =>
          prisma.workSample.findMany({ orderBy: { order: "asc" } }) as Promise<
            WorkSample[]
          >
      ),
      safe<PinnedRepo>("pinnedRepos", () => fetchPinnedRepos(GITHUB_LOGIN)),
      safe<Product>(
        "products",
        () =>
          prisma.product.findMany({ orderBy: { order: "asc" } }) as Promise<
            Product[]
          >
      ),
      safe<Education>(
        "educations",
        () =>
          prisma.education.findMany({ orderBy: { order: "asc" } }) as Promise<
            Education[]
          >
      ),
      safe<Work>("works", async () => {
        const rows = await prisma.work.findMany({ orderBy: { order: "asc" } });
        return rows.map((row) => ({
          ...row,
          technos: parseTechnos(row.technos),
        })) as Work[];
      }),
      safe<Event>(
        "events",
        () =>
          prisma.event.findMany({ orderBy: { order: "asc" } }) as Promise<Event[]>
      ),
    ]);

  return { workSamples, repositories, products, educations, works, events };
}
