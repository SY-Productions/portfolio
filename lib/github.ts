/**
 * GitHub pinned-repository fetching.
 *
 * Pinned repos are only exposed through GitHub's GraphQL API (`user.pinnedItems`),
 * which requires authentication even for public data. Set GITHUB_TOKEN to a
 * read-only classic PAT with no scopes selected — that is enough for public repos.
 */

const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";
const MAX_PINNED_ITEMS = 6;
const REVALIDATE_SECONDS = 3600;
const DEFAULT_MAX_TECHS = 4;

export interface PinnedRepo {
  id: string;
  name: string;
  nameWithOwner: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  stars: number;
  forks: number;
  primaryLanguage: string | null;
  topics: string[];
  isArchived: boolean;
  updatedAt: string;
}

const PINNED_REPOS_QUERY = `
  query PinnedRepos($login: String!, $first: Int!) {
    user(login: $login) {
      pinnedItems(first: $first, types: REPOSITORY) {
        nodes {
          ... on Repository {
            id
            name
            nameWithOwner
            description
            url
            homepageUrl
            stargazerCount
            forkCount
            isArchived
            updatedAt
            primaryLanguage {
              name
            }
            repositoryTopics(first: 6) {
              nodes {
                topic {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

interface GraphQlRepoNode {
  id?: string;
  name?: string;
  nameWithOwner?: string;
  description?: string | null;
  url?: string;
  homepageUrl?: string | null;
  stargazerCount?: number;
  forkCount?: number;
  isArchived?: boolean;
  updatedAt?: string;
  primaryLanguage?: { name: string } | null;
  repositoryTopics?: { nodes?: Array<{ topic?: { name?: string } }> };
}

interface GraphQlResponse {
  data?: { user?: { pinnedItems?: { nodes?: Array<GraphQlRepoNode | null> } } | null };
  errors?: Array<{ message: string }>;
}

export class GitHubError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "GitHubError";
  }
}

function normalize(node: GraphQlRepoNode): PinnedRepo | null {
  // pinnedItems can include gists, which the inline fragment leaves as empty objects.
  if (!node.id || !node.name || !node.url) return null;

  return {
    id: node.id,
    name: node.name,
    nameWithOwner: node.nameWithOwner ?? node.name,
    description: node.description ?? null,
    url: node.url,
    homepageUrl: node.homepageUrl?.trim() ? node.homepageUrl : null,
    stars: node.stargazerCount ?? 0,
    forks: node.forkCount ?? 0,
    primaryLanguage: node.primaryLanguage?.name ?? null,
    topics:
      node.repositoryTopics?.nodes
        ?.map((t) => t?.topic?.name)
        .filter((name): name is string => Boolean(name)) ?? [],
    isArchived: node.isArchived ?? false,
    updatedAt: node.updatedAt ?? "",
  };
}

/** Turns "my-cool-repo" into "My Cool Repo" for a headline. */
export function humanizeRepoName(name: string): string {
  return name
    .replace(/[-_.]+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Primary language first, then repo topics — deduped, capped for layout. */
export function getRepoTechs(repo: PinnedRepo, max = DEFAULT_MAX_TECHS): string[] {
  const all = repo.primaryLanguage ? [repo.primaryLanguage, ...repo.topics] : repo.topics;
  const seen = new Set<string>();
  return all
    .filter((tech) => {
      const key = tech.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, max);
}

/**
 * Fetches the repositories pinned on the given user's GitHub profile,
 * in the order GitHub returns them (the order shown on the profile).
 *
 * @throws {GitHubError} when the token is missing or GitHub rejects the request.
 */
export async function fetchPinnedRepos(login: string): Promise<PinnedRepo[]> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new GitHubError("GITHUB_TOKEN is not configured", 500);
  }

  const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/vnd.github+json",
    },
    body: JSON.stringify({
      query: PINNED_REPOS_QUERY,
      variables: { login, first: MAX_PINNED_ITEMS },
    }),
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new GitHubError(`GitHub API responded with ${response.status}`, 502);
  }

  const payload = (await response.json()) as GraphQlResponse;

  if (payload.errors?.length) {
    throw new GitHubError(payload.errors.map((e) => e.message).join("; "), 502);
  }

  const nodes = payload.data?.user?.pinnedItems?.nodes;
  if (!nodes) {
    throw new GitHubError(`No GitHub user found for "${login}"`, 404);
  }

  return nodes
    .filter((node): node is GraphQlRepoNode => Boolean(node))
    .map(normalize)
    .filter((repo): repo is PinnedRepo => repo !== null);
}
