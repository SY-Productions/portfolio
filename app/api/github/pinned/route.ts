import { NextResponse } from "next/server";
import { fetchPinnedRepos, GitHubError } from "@/lib/github";

const GITHUB_LOGIN = process.env.GITHUB_USERNAME || "YOUSSSOF";

export const revalidate = 3600;

export async function GET() {
  try {
    const repos = await fetchPinnedRepos(GITHUB_LOGIN);
    return NextResponse.json(repos);
  } catch (error) {
    const status = error instanceof GitHubError ? error.status : 500;
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`Failed to fetch pinned repos for ${GITHUB_LOGIN}:`, message);
    return NextResponse.json({ error: "Failed to fetch pinned repositories" }, { status });
  }
}
