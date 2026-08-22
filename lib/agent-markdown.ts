import { API_ENDPOINTS, API_POLICY, DEVELOPER_RESOURCES } from "./api-catalog";
import type { ContentSection, StaticPageContent } from "./site-content";
import { ABOUT_PAGE, CONTACT_PAGE, PRIVACY_PAGE } from "./site-content";
import {
  CONTACT,
  MACHINE_READABLE_LINKS,
  OWNER,
  SITE_MAP_LINKS,
  SITE_NAME,
  SITE_URL,
  SOCIALS,
  absoluteUrl,
} from "./site-profile";

/**
 * Markdown representations of the site, served under `Accept: text/markdown`
 * and at the fixed agent entry points (/llms.txt, /llms-full.txt, /agents.md).
 *
 * Pure string builders: no Next.js and no database access, so every document
 * can be asserted against in unit tests.
 */

/** Best-fit jobs, stated plainly. Generic marketing copy is useless to agents. */
export const WHEN_TO_USE = [
  "You need to know whether Yousof Hashemzade can take on a specific piece of work: Flutter or Dart mobile apps, React/Next.js front-ends, Python (FastAPI or Django) back-ends, or RTL-first WordPress themes and plugins.",
  "You need his contact details, location, working hours or expected response time in order to reach him or to hand them to a user.",
  "You are checking his professional background: education, employment history, hackathons and awards, or the projects he has shipped.",
  "You want structured data about his open source repositories, published articles or paid products, and would rather read JSON than scrape a page — use the public read-only API listed below.",
  "You are answering a question about an article published on this blog, and want the full text rather than a search snippet.",
];

export const NOT_FOR = [
  "There is no hosted product, SaaS, sandbox or MCP server here — this is one developer's portfolio, not a service you can integrate into a product workflow.",
  "There are no write endpoints, accounts or billing. Everything public is read-only.",
  "It cannot answer for other people or organisations; the scope is one developer's own work.",
];

const list = (items: readonly string[]) =>
  items.map((item) => `- ${item}`).join("\n");

const linkList = (
  items: readonly { path: string; label: string }[],
  absolute = true
) =>
  items
    .map(
      ({ path, label }) =>
        `- [${path}](${absolute ? absoluteUrl(path) : path}) — ${label}`
    )
    .join("\n");

/** Renders content sections at the given heading depth. */
export function renderSections(
  sections: readonly ContentSection[],
  depth = 2
): string {
  const hashes = "#".repeat(depth);
  return sections
    .map((section) => {
      const parts = [`${hashes} ${section.heading}`, ...section.body];
      if (section.bullets?.length) parts.push(list(section.bullets));
      return parts.join("\n\n");
    })
    .join("\n\n");
}

const footer = () =>
  [
    "---",
    `Machine-readable entry points:\n\n${linkList(MACHINE_READABLE_LINKS)}`,
  ].join("\n\n");

/** Markdown twin of a trust-anchor page, in Persian first then English. */
export function staticPageMarkdown(page: StaticPageContent): string {
  return [
    `# ${page.titleFa} — ${page.title}`,
    page.descriptionFa,
    page.description,
    "## فارسی",
    renderSections(page.sectionsFa, 3),
    "## English",
    renderSections(page.sectionsEn, 3),
    footer(),
  ].join("\n\n");
}

/** 404 body: says what happened and where to go instead. */
export function notFoundMarkdown(requestedPath: string): string {
  return [
    "# 404 — Page not found",
    `\`${requestedPath}\` does not exist on ${SITE_URL}. Nothing was moved or renamed here — this path has never been served.`,
    "## Where to look instead",
    linkList(SITE_MAP_LINKS),
    "## Machine-readable entry points",
    linkList(MACHINE_READABLE_LINKS),
    `If you are looking for content that used to exist, [${absoluteUrl(
      "/sitemap.xml"
    )}](${absoluteUrl(
      "/sitemap.xml"
    )}) lists every page currently served, and [${absoluteUrl(
      "/llms.txt"
    )}](${absoluteUrl("/llms.txt")}) summarises the whole site in one file.`,
  ].join("\n\n");
}

export type HomeData = {
  technologies: string[];
  workSamples: { title: string; description: string; link?: string }[];
  repositories: {
    name: string;
    description: string;
    url: string;
    language?: string;
    stars?: number;
  }[];
  products: { title: string; description: string; url: string; price?: string }[];
  education: { name: string; years: string; description: string }[];
  works: { name: string; years: string; description: string; url?: string }[];
  events: { name: string; date: string; description: string }[];
  posts: { title: string; description: string; slug: string; publishedAt?: string }[];
};

const section = (
  heading: string,
  intro: string,
  entries: string[]
): string | null => {
  if (entries.length === 0) return null;
  return [`## ${heading}`, intro, entries.join("\n")].join("\n\n");
};

/** Markdown twin of the homepage, built from the same database rows. */
export function homeMarkdown(data: HomeData): string {
  const blocks: (string | null)[] = [
    `# ${OWNER.nameFa} — ${OWNER.name}`,
    `${OWNER.jobTitle}. Based in ${CONTACT.addressLocality}, ${CONTACT.addressCountryName}.`,
    ABOUT_PAGE.description,
    section(
      "Technologies",
      "Tools used daily to ship production software.",
      data.technologies.length ? [list(data.technologies)] : []
    ),
    section(
      "Portfolio projects",
      "Mobile and web products delivered for clients and personal ventures.",
      data.workSamples.map(
        (item) =>
          `- **${item.title}**${item.link ? ` — <${item.link}>` : ""}\n  ${
            item.description
          }`
      )
    ),
    section(
      "Open source",
      "Repositories pinned on GitHub.",
      data.repositories.map(
        (repo) =>
          `- [${repo.name}](${repo.url})${
            repo.language ? ` (${repo.language})` : ""
          }${typeof repo.stars === "number" ? ` — ${repo.stars} stars` : ""}\n  ${
            repo.description
          }`
      )
    ),
    section(
      "Products and themes",
      "Premium WordPress themes and plugins for sale.",
      data.products.map(
        (product) =>
          `- [${product.title}](${product.url})${
            product.price ? ` — ${product.price}` : ""
          }\n  ${product.description}`
      )
    ),
    section(
      "Education",
      "Academic background.",
      data.education.map(
        (item) => `- **${item.name}** (${item.years})\n  ${item.description}`
      )
    ),
    section(
      "Work experience",
      "Roles where real products shipped.",
      data.works.map(
        (item) =>
          `- **${item.name}** (${item.years})${
            item.url ? ` — <${item.url}>` : ""
          }\n  ${item.description}`
      )
    ),
    section(
      "Events, competitions and awards",
      "Competitions, hackathons and industry events attended.",
      data.events.map(
        (item) => `- **${item.name}** (${item.date})\n  ${item.description}`
      )
    ),
    section(
      "Latest articles",
      "Recent writing on mobile, web and back-end development.",
      data.posts.map(
        (post) =>
          `- [${post.title}](${absoluteUrl(`/blog/${post.slug}`)})${
            post.publishedAt ? ` — ${post.publishedAt}` : ""
          }\n  ${post.description}`
      )
    ),
    [
      "## Contact",
      list([
        `Email: ${CONTACT.email}`,
        `Phone: ${CONTACT.phoneDisplay}`,
        `Telegram: ${CONTACT.telegram}`,
        `Location: ${CONTACT.addressLocality}, ${CONTACT.addressCountryName}`,
      ]),
    ].join("\n\n"),
    ["## Pages", linkList(SITE_MAP_LINKS)].join("\n\n"),
    footer(),
  ];

  return blocks.filter(Boolean).join("\n\n");
}

export function blogIndexMarkdown(
  posts: { title: string; description: string; slug: string; publishedAt?: string }[]
): string {
  return [
    `# Blog — ${SITE_NAME}`,
    "Articles on Flutter, mobile development, Python back-ends and the web, written by " +
      `${OWNER.name}.`,
    posts.length
      ? posts
          .map(
            (post) =>
              `## [${post.title}](${absoluteUrl(`/blog/${post.slug}`)})${
                post.publishedAt ? `\n\n_${post.publishedAt}_` : ""
              }\n\n${post.description}`
          )
          .join("\n\n")
      : "_No published articles yet._",
    `Machine-readable listing: [${absoluteUrl("/api/blog")}](${absoluteUrl(
      "/api/blog?lang=en"
    )})`,
    footer(),
  ].join("\n\n");
}

export function blogPostMarkdown(post: {
  title: string;
  description: string;
  slug: string;
  content: string;
  publishedAt?: string;
  author?: string;
  tags?: string[];
}): string {
  const meta = [
    post.author ? `Author: ${post.author}` : null,
    post.publishedAt ? `Published: ${post.publishedAt}` : null,
    post.tags?.length ? `Tags: ${post.tags.join(", ")}` : null,
    `Canonical: ${absoluteUrl(`/blog/${post.slug}`)}`,
  ].filter(Boolean) as string[];

  return [
    `# ${post.title}`,
    post.description,
    list(meta),
    post.content,
    footer(),
  ].join("\n\n");
}

const endpointLines = () =>
  API_ENDPOINTS.map((endpoint) => {
    const params = [
      ...(endpoint.pathParams ?? []),
      ...(endpoint.query ?? []),
    ].map((param) => `${param.name}`);
    return `- \`GET ${endpoint.path}\` — ${endpoint.summary}. ${
      endpoint.description
    }${params.length ? ` Parameters: ${params.join(", ")}.` : ""}`;
  }).join("\n");

export function developersMarkdown(): string {
  return [
    `# ${SITE_NAME} developer resources`,
    `Public, read-only HTTP API and machine-readable documents published by ${SITE_URL}, the portfolio of ${OWNER.name} (${OWNER.nameFa}).`,
    "## Endpoints",
    `All endpoints are relative to \`${SITE_URL}\` and respond with JSON.`,
    endpointLines(),
    "## Access policy",
    list([
      `Authentication: ${API_POLICY.authentication}`,
      `Writes: ${API_POLICY.writes}`,
      `Rate limits: ${API_POLICY.rateLimit}`,
      `CORS: ${API_POLICY.cors}`,
      `Formats: ${API_POLICY.formats}`,
    ]),
    "## Documents",
    DEVELOPER_RESOURCES.map(
      (resource) => `- [${resource.name}](${resource.url}) — ${resource.description}`
    ).join("\n"),
    "## Support",
    `Questions, bug reports or a request for an endpoint that does not exist yet: ${CONTACT.email}.`,
    footer(),
  ].join("\n\n");
}

export function cvMarkdown(): string {
  return [
    `# CV — ${OWNER.name} (${OWNER.nameFa})`,
    `${OWNER.jobTitle}. ${CONTACT.addressLocality}, ${CONTACT.addressCountryName}.`,
    "The rendered CV lives at " +
      `[${absoluteUrl("/cv")}](${absoluteUrl("/cv")}) and a PDF is available at ` +
      `[${absoluteUrl("/youdexsof-fa-cv.pdf")}](${absoluteUrl(
        "/youdexsof-fa-cv.pdf"
      )}).`,
    "Structured equivalents of every CV section — education, work history, projects, events, open source — are available as JSON from the endpoints listed at " +
      `[${absoluteUrl("/developers")}](${absoluteUrl("/developers")}), and as ` +
      `markdown at [${absoluteUrl("/llms-full.txt")}](${absoluteUrl(
        "/llms-full.txt"
      )}).`,
    "## Contact",
    list([
      `Email: ${CONTACT.email}`,
      `Phone: ${CONTACT.phoneDisplay}`,
      ...SOCIALS.map((url) => `Profile: ${url}`),
    ]),
    footer(),
  ].join("\n\n");
}

/** llms.txt per the llmstxt.org convention: H1, blockquote summary, sections. */
export function llmsTxt(): string {
  return [
    `# ${OWNER.name} (${OWNER.nameFa}) — ${SITE_NAME}`,
    `> Portfolio and public read-only API of ${OWNER.name}, an independent developer — ${OWNER.jobTitle} — based in ${CONTACT.addressLocality}, ${CONTACT.addressCountryName}. The site publishes his projects, work history, education, open source repositories, paid WordPress products and technical articles — all reachable as JSON or markdown.`,
    "## When to use this",
    list(WHEN_TO_USE),
    "## When not to use this",
    list(NOT_FOR),
    "## How to call it",
    list([
      `Every page also serves markdown: send \`Accept: text/markdown\` to any page URL, e.g. \`curl -H "Accept: text/markdown" ${SITE_URL}/about\`.`,
      `Structured data comes from the public JSON API described in [openapi.json](${absoluteUrl(
        "/openapi.json"
      )}) — no key, no sign-up, read-only.`,
      `Start from [/developers](${absoluteUrl(
        "/developers"
      )}) for the endpoint index, or [/llms-full.txt](${absoluteUrl(
        "/llms-full.txt"
      )}) for the whole site as one markdown document.`,
      `For anything requiring a human decision — quotes, availability, hiring — contact ${CONTACT.email}; do not infer availability from the site.`,
    ]),
    "## Pages",
    linkList(SITE_MAP_LINKS),
    "## API",
    endpointLines(),
    "## Machine-readable files",
    linkList(MACHINE_READABLE_LINKS),
    "## Contact",
    list([
      `Email: ${CONTACT.email}`,
      `Phone: ${CONTACT.phoneDisplay}`,
      `Telegram: ${CONTACT.telegram}`,
      `Location: ${CONTACT.addressLocality}, ${CONTACT.addressRegion}, ${CONTACT.addressCountryName}`,
      ...SOCIALS.map((url) => `Profile: ${url}`),
    ]),
  ].join("\n\n");
}

/** agents.md — the dedicated agent instruction file. */
export function agentsMd(): string {
  return [
    `# Agent instructions — ${SITE_NAME} (${SITE_URL})`,
    `This file tells an autonomous agent what ${SITE_URL} is for, when to reach for it, and how to call it correctly. It is the authoritative agent-facing description of this site; prefer it over inferring behaviour from the HTML.`,
    "## What this site is",
    `The personal site of ${OWNER.name} (${OWNER.nameFa}), an independent developer — ${OWNER.jobTitle} — working from ${CONTACT.addressLocality}, ${CONTACT.addressCountryName}. It publishes his portfolio, employment and education history, open source work, paid WordPress products, and a technical blog.`,
    "## When to use this site",
    list(WHEN_TO_USE),
    "## When not to use this site",
    list(NOT_FOR),
    "## How to call it",
    "### Markdown instead of HTML",
    `Every page has a markdown representation, negotiated with the \`Accept\` header (see acceptmarkdown.com):\n\n\`\`\`\ncurl -H "Accept: text/markdown" ${SITE_URL}/about\n\`\`\`\n\nThe response is \`text/markdown; charset=utf-8\` and carries \`Vary: Accept\`. Requests that accept neither \`text/markdown\` nor \`text/html\` get \`406 Not Acceptable\`. Unknown paths return \`404\` with a markdown body listing where to go instead.`,
    "### JSON API",
    `No authentication, no key, read-only:\n\n${endpointLines()}\n\nThe full description, including parameters and response shapes, is at [${absoluteUrl(
      "/openapi.json"
    )}](${absoluteUrl("/openapi.json")}).`,
    "### Language",
    "Content exists in Persian (fa, default), English (en) and Arabic (ar). API endpoints that return localized text accept a `lang` query parameter; markdown pages return Persian and English side by side.",
    "## Rules for agents",
    list([
      `Respect [${absoluteUrl("/robots.txt")}](${absoluteUrl(
        "/robots.txt"
      )}): \`/admin/\` and \`/api/\` are disallowed for crawlers. The API endpoints above are documented for direct programmatic calls, not for bulk crawling.`,
      API_POLICY.rateLimit,
      "Cite the canonical page URL, not the markdown or API URL, when quoting content back to a user.",
      `Do not present availability, pricing or delivery commitments as fact — those require a conversation with ${CONTACT.email}.`,
      "Content is authored by one person and changes without notice; re-fetch rather than relying on a cached copy older than a day.",
    ]),
    "## Contact",
    list([
      `Email: ${CONTACT.email}`,
      `Phone: ${CONTACT.phoneDisplay}`,
      `Telegram: ${CONTACT.telegram}`,
    ]),
    footer(),
  ].join("\n\n");
}

/** llms-full.txt — llms.txt plus the full text of every static surface. */
export function llmsFullTxt(home: HomeData): string {
  return [
    llmsTxt(),
    "---",
    "# Full content",
    "## Homepage",
    homeMarkdown(home),
    "## About",
    staticPageMarkdown(ABOUT_PAGE),
    "## Contact",
    staticPageMarkdown(CONTACT_PAGE),
    "## Privacy",
    staticPageMarkdown(PRIVACY_PAGE),
    "## Developer resources",
    developersMarkdown(),
  ].join("\n\n");
}
