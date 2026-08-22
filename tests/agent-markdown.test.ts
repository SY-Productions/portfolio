import test from "node:test";
import assert from "node:assert/strict";
import {
  agentsMd,
  blogIndexMarkdown,
  blogPostMarkdown,
  developersMarkdown,
  homeMarkdown,
  llmsFullTxt,
  llmsTxt,
  notFoundMarkdown,
  staticPageMarkdown,
  type HomeData,
} from "../lib/agent-markdown";
import { ABOUT_PAGE, CONTACT_PAGE, PRIVACY_PAGE } from "../lib/site-content";
import { API_ENDPOINTS } from "../lib/api-catalog";
import { CONTACT, SITE_URL } from "../lib/site-profile";

const EMPTY_HOME: HomeData = {
  technologies: [],
  workSamples: [],
  repositories: [],
  products: [],
  education: [],
  works: [],
  events: [],
  posts: [],
};

const FULL_HOME: HomeData = {
  technologies: ["Flutter", "Dart"],
  workSamples: [
    { title: "Hitaqnia", description: "A booking app.", link: "https://example.com" },
  ],
  repositories: [
    {
      name: "portfolio",
      description: "This site.",
      url: "https://github.com/YOUSSSOF/portfolio",
      language: "TypeScript",
      stars: 4,
    },
  ],
  products: [
    { title: "Zura", description: "An RTL theme.", url: "https://example.com/zura", price: "$39" },
  ],
  education: [{ name: "Software Engineering", years: "2019–2023", description: "BSc." }],
  works: [{ name: "Modertize", years: "2023–Present", description: "Mobile lead." }],
  events: [{ name: "Hackathon", date: "2024", description: "First place." }],
  posts: [
    {
      title: "Getting started with Flutter",
      description: "An intro.",
      slug: "getting-started-with-flutter",
      publishedAt: "2025-01-01",
    },
  ],
};

test("llms.txt carries explicit when-to-use guidance", () => {
  const doc = llmsTxt();

  assert.match(doc, /^# /, "starts with an H1 as llmstxt.org requires");
  assert.match(doc, /^> /m, "carries a blockquote summary");
  assert.ok(doc.includes("## When to use this"));
  assert.ok(doc.includes("## When not to use this"));
  assert.ok(doc.includes("## How to call it"));
  assert.ok(doc.includes(CONTACT.email));
});

test("llms.txt names concrete jobs rather than generic marketing copy", () => {
  const doc = llmsTxt();
  const whenToUse = doc.slice(
    doc.indexOf("## When to use this"),
    doc.indexOf("## When not to use this")
  );

  for (const marker of ["Flutter", "contact details", "open source", "blog"]) {
    assert.ok(
      whenToUse.toLowerCase().includes(marker.toLowerCase()),
      `when-to-use should mention ${marker}`
    );
  }
});

test("llms.txt lists every documented endpoint", () => {
  const doc = llmsTxt();
  for (const endpoint of API_ENDPOINTS) {
    assert.ok(doc.includes(endpoint.path), `missing ${endpoint.path}`);
  }
});

test("agents.md explains negotiation, limits and when to use the site", () => {
  const doc = agentsMd();

  assert.ok(doc.includes("## When to use this site"));
  assert.ok(doc.includes("## When not to use this site"));
  assert.ok(doc.includes('Accept: text/markdown'));
  assert.ok(doc.includes("406"));
  assert.ok(doc.includes("Vary: Accept"));
  assert.ok(doc.includes("/openapi.json"));
});

test("404 markdown names the missing path and where to go next", () => {
  const doc = notFoundMarkdown("/does-not-exist");

  assert.ok(doc.startsWith("# 404"));
  assert.ok(doc.includes("/does-not-exist"));
  assert.ok(doc.includes("/sitemap.xml"));
  assert.ok(doc.includes("/llms.txt"));
  assert.ok(doc.includes("/about"));
  assert.ok(doc.includes("/blog"));
});

test("trust-anchor markdown carries both languages and real length", () => {
  for (const page of [ABOUT_PAGE, CONTACT_PAGE, PRIVACY_PAGE]) {
    const doc = staticPageMarkdown(page);

    assert.ok(doc.includes("## فارسی"), `${page.path} missing Persian block`);
    assert.ok(doc.includes("## English"), `${page.path} missing English block`);
    assert.ok(
      doc.length > 1000,
      `${page.path} markdown is only ${doc.length} characters`
    );
  }
});

test("contact markdown exposes email, phone and location", () => {
  const doc = staticPageMarkdown(CONTACT_PAGE);

  assert.ok(doc.includes(CONTACT.email));
  assert.ok(doc.includes(CONTACT.phoneDisplay));
  assert.ok(doc.includes(CONTACT.addressLocality));
});

test("home markdown omits empty sections but always keeps contact and pages", () => {
  const doc = homeMarkdown(EMPTY_HOME);

  assert.ok(!doc.includes("## Open source"));
  assert.ok(!doc.includes("## Education"));
  assert.ok(doc.includes("## Contact"));
  assert.ok(doc.includes("## Pages"));
});

test("home markdown renders every populated section", () => {
  const doc = homeMarkdown(FULL_HOME);

  for (const heading of [
    "## Technologies",
    "## Portfolio projects",
    "## Open source",
    "## Products and themes",
    "## Education",
    "## Work experience",
    "## Events, competitions and awards",
    "## Latest articles",
  ]) {
    assert.ok(doc.includes(heading), `missing ${heading}`);
  }

  assert.ok(doc.includes("Hitaqnia"));
  assert.ok(doc.includes(`${SITE_URL}/blog/getting-started-with-flutter`));
});

test("blog markdown links posts by canonical URL", () => {
  const index = blogIndexMarkdown(FULL_HOME.posts);
  assert.ok(index.includes(`${SITE_URL}/blog/getting-started-with-flutter`));

  const empty = blogIndexMarkdown([]);
  assert.ok(empty.includes("No published articles yet"));

  const post = blogPostMarkdown({
    title: "Getting started with Flutter",
    description: "An intro.",
    slug: "getting-started-with-flutter",
    content: "Body text.",
    publishedAt: "2025-01-01",
    author: "Yousof Hashemzade",
    tags: ["flutter", "dart"],
  });
  assert.ok(post.startsWith("# Getting started with Flutter"));
  assert.ok(post.includes("Canonical: "));
  assert.ok(post.includes("Tags: flutter, dart"));
  assert.ok(post.includes("Body text."));
});

test("developer markdown documents every endpoint and the access policy", () => {
  const doc = developersMarkdown();

  for (const endpoint of API_ENDPOINTS) {
    assert.ok(doc.includes(endpoint.path), `missing ${endpoint.path}`);
  }
  assert.ok(doc.includes("Authentication:"));
  assert.ok(doc.includes("Rate limits:"));
  assert.ok(doc.includes("/openapi.json"));
});

test("llms-full.txt embeds the summary and every static surface", () => {
  const doc = llmsFullTxt(FULL_HOME);

  assert.ok(doc.includes("## When to use this"));
  assert.ok(doc.includes(ABOUT_PAGE.sectionsEn[0].heading));
  assert.ok(doc.includes(PRIVACY_PAGE.sectionsEn[0].heading));
  assert.ok(doc.length > llmsTxt().length);
});
