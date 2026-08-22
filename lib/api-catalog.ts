import { SITE_NAME, SITE_URL, absoluteUrl } from "./site-profile";

/**
 * Catalogue of the public, read-only HTTP endpoints this site exposes.
 *
 * Consumed by the /developers page, the generated OpenAPI document, llms.txt
 * and agents.md, so the documented surface and the advertised surface are the
 * same list. Admin and write endpoints are deliberately absent: they require an
 * authenticated session and are not part of the public contract.
 */

export type ApiParameter = {
  name: string;
  description: string;
  schema: { type: "string" | "integer" | "boolean"; enum?: string[] };
  example?: string;
};

export type ApiEndpoint = {
  /** Path relative to the origin, e.g. "/api/blog". */
  path: string;
  operationId: string;
  summary: string;
  description: string;
  query?: ApiParameter[];
  pathParams?: ApiParameter[];
};

export const API_ENDPOINTS: ApiEndpoint[] = [
  {
    path: "/api/blog",
    operationId: "listBlogPosts",
    summary: "List published blog posts",
    description:
      "Paginated list of published articles with title, description, cover image, tags, category, read time and view count in the requested language.",
    query: [
      {
        name: "lang",
        description: "Language of the returned title, description and tags.",
        schema: { type: "string", enum: ["fa", "en", "ar"] },
        example: "en",
      },
      {
        name: "page",
        description: "1-based page number.",
        schema: { type: "integer" },
        example: "1",
      },
      {
        name: "limit",
        description: "Posts per page.",
        schema: { type: "integer" },
        example: "9",
      },
      {
        name: "category",
        description: "Filter by category slug.",
        schema: { type: "string" },
        example: "flutter",
      },
      {
        name: "tag",
        description: "Filter by a single tag.",
        schema: { type: "string" },
        example: "dart",
      },
      {
        name: "search",
        description: "Full-text search across title and description.",
        schema: { type: "string" },
        example: "state management",
      },
      {
        name: "sort",
        description: "Ordering of the result set.",
        schema: { type: "string", enum: ["newest", "oldest", "views", "readTime"] },
        example: "newest",
      },
      {
        name: "featured",
        description: "Set to true to return only featured posts.",
        schema: { type: "boolean" },
        example: "true",
      },
    ],
  },
  {
    path: "/api/blog/{slug}",
    operationId: "getBlogPost",
    summary: "Get one blog post by slug",
    description:
      "Full article body plus metadata and comments for a single published post, in all three languages at once. The slug is the same one used in the /blog/{slug} page URL. Note that a GET increments the post's view counter.",
    pathParams: [
      {
        name: "slug",
        description: "URL slug of the post.",
        schema: { type: "string" },
        example: "getting-started-with-flutter",
      },
    ],
  },
  {
    path: "/api/blog/categories",
    operationId: "listBlogCategories",
    summary: "List blog categories",
    description:
      "Every blog category with its slug, localized names, colour and published post count.",
  },
  {
    path: "/api/worksamples",
    operationId: "listWorkSamples",
    summary: "List portfolio projects",
    description:
      "Shipped mobile and web projects with localized titles and descriptions, technologies used, project timeline, client and links.",
  },
  {
    path: "/api/products",
    operationId: "listProducts",
    summary: "List products and themes",
    description:
      "Premium WordPress themes and plugins for sale, with localized titles, descriptions, price, category and purchase URL.",
  },
  {
    path: "/api/works",
    operationId: "listWorkHistory",
    summary: "List work experience",
    description:
      "Employment and freelance history: organisation, localized role description, technologies, years and link.",
  },
  {
    path: "/api/education",
    operationId: "listEducation",
    summary: "List education history",
    description:
      "Academic background: institution, localized description and years attended.",
  },
  {
    path: "/api/events",
    operationId: "listEvents",
    summary: "List events, competitions and awards",
    description:
      "Hackathons, competitions and industry events, with localized descriptions, dates and certificate attachments.",
  },
  {
    path: "/api/github/pinned",
    operationId: "listPinnedRepositories",
    summary: "List pinned GitHub repositories",
    description:
      "Open source repositories pinned on GitHub, with description, primary language, star and fork counts, homepage and repository URL. Cached for one hour.",
  },
  {
    path: "/api/site-settings",
    operationId: "getSiteSettings",
    summary: "Get public site settings",
    description:
      "Theme colours, profile picture path and the technology list shown in the skills section.",
  },
];

/** Machine-readable and human documentation entry points, by name. */
export const DEVELOPER_RESOURCES = [
  {
    name: `${SITE_NAME} OpenAPI specification`,
    url: absoluteUrl("/openapi.json"),
    description:
      "OpenAPI 3.1 document describing every public read-only endpoint, its query parameters and responses.",
  },
  {
    name: `${SITE_NAME} developer index`,
    url: absoluteUrl("/developers"),
    description:
      "Human-readable index of the public API, rate limits, authentication policy and support contact.",
  },
  {
    name: `${SITE_NAME} llms.txt`,
    url: absoluteUrl("/llms.txt"),
    description:
      "Condensed site summary with when-to-use guidance for AI agents, per the llms.txt convention.",
  },
  {
    name: `${SITE_NAME} agent instructions`,
    url: absoluteUrl("/agents.md"),
    description:
      "Agent-facing instruction file: best-fit tasks, how to call the API and what this site cannot do.",
  },
  {
    name: `${SITE_NAME} sitemap`,
    url: absoluteUrl("/sitemap.xml"),
    description: "XML sitemap listing every indexable page.",
  },
] as const;

export const API_POLICY = {
  authentication:
    "None. Every endpoint listed here is public and read-only; no API key, token or sign-up is required.",
  writes:
    "Write operations exist only behind the authenticated admin session and are not part of the public API.",
  rateLimit:
    "No hard quota is enforced, but the site is a single personal deployment: keep requests under roughly 60 per minute and cache responses where you can.",
  cors:
    "The JSON endpoints are same-origin: call them server-side. The machine-readable documents (/openapi.json and the markdown representations) do send `Access-Control-Allow-Origin: *`, so a browser-side agent can read those directly.",
  formats: `Every endpoint returns JSON. Every HTML page also has a markdown representation: send \`Accept: text/markdown\` to the page URL (for example \`${SITE_URL}/about\`) and you get \`text/markdown; charset=utf-8\` back.`,
} as const;
