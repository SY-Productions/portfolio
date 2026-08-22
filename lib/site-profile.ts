/**
 * Single source of truth for the facts agents and crawlers ask for: who owns the
 * site, how to reach them, and which machine-readable surfaces exist.
 *
 * Everything that renders JSON-LD, llms.txt, agents.md, the OpenAPI document or
 * the trust-anchor pages reads from here so the answers can never drift apart.
 */

/**
 * Canonical origin. The production host is the fallback on purpose: an unset
 * NEXT_PUBLIC_BASE_URL previously made robots.txt and sitemap.xml advertise a
 * domain this site does not serve, which points crawlers at dead URLs.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_BASE_URL || "https://www.youdexsof.ir"
).replace(/\/+$/, "");

export const SITE_NAME = "Youdexsof";

export const OWNER = {
  name: "Yousof Hashemzade",
  nameFa: "یوسف هاشم زاده",
  jobTitle: "Mobile & Web Developer (Flutter, React, Python)",
  jobTitleFa: "توسعه‌دهنده موبایل و وب (فلاتر، ریکت، پایتون)",
} as const;

export const CONTACT = {
  email: "yousofh255@gmail.com",
  phone: "+989135655644",
  phoneDisplay: "+98 913 565 5644",
  telegram: "https://t.me/YOUDEXSOF",
  addressLocality: "Isfahan",
  addressLocalityFa: "اصفهان",
  addressRegion: "Isfahan Province",
  addressCountry: "IR",
  addressCountryName: "Iran",
} as const;

export const SOCIALS = [
  "https://github.com/YOUSSSOF",
  "https://www.linkedin.com/in/yousof-hashemezade",
  "https://www.instagram.com/youdexsof",
  "https://t.me/YOUDEXSOF",
] as const;

/** Human pages an agent may want to recover to after a 404. */
export const SITE_MAP_LINKS = [
  { path: "/", label: "Home — portfolio, skills, projects, contact" },
  { path: "/about", label: "About — background, focus areas, how I work" },
  { path: "/contact", label: "Contact — email, phone, location, response time" },
  { path: "/privacy", label: "Privacy — what this site collects and why" },
  { path: "/developers", label: "Developer resources — public read-only API" },
  { path: "/blog", label: "Blog — articles on Flutter, Python and the web" },
  { path: "/cv", label: "CV — full résumé" },
] as const;

/** Machine-readable surfaces, listed everywhere an agent might start. */
export const MACHINE_READABLE_LINKS = [
  { path: "/llms.txt", label: "Site summary and when-to-use guidance for agents" },
  { path: "/llms-full.txt", label: "Expanded agent brief with full section content" },
  { path: "/agents.md", label: "Agent instructions: capabilities, limits, how to call" },
  { path: "/openapi.json", label: "OpenAPI 3.1 description of the public read-only API" },
  { path: "/sitemap.xml", label: "XML sitemap of every indexable page" },
  { path: "/robots.txt", label: "Crawl policy" },
] as const;

export const absoluteUrl = (path: string) =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
