import test from "node:test";
import assert from "node:assert/strict";
import { normalizePath, resolveMarkdownTarget } from "../lib/markdown-routes";
import { STATIC_PAGES } from "../lib/site-content";

test("normalizes trailing slashes and missing leading slashes", () => {
  assert.equal(normalizePath("/"), "/");
  assert.equal(normalizePath("/about/"), "/about");
  assert.equal(normalizePath("/about///"), "/about");
  assert.equal(normalizePath("about"), "/about");
});

test("resolves every fixed page to its own document", () => {
  assert.deepEqual(resolveMarkdownTarget("/"), { kind: "home" });
  assert.deepEqual(resolveMarkdownTarget("/about"), { kind: "about" });
  assert.deepEqual(resolveMarkdownTarget("/contact/"), { kind: "contact" });
  assert.deepEqual(resolveMarkdownTarget("/privacy"), { kind: "privacy" });
  assert.deepEqual(resolveMarkdownTarget("/developers"), { kind: "developers" });
  assert.deepEqual(resolveMarkdownTarget("/cv"), { kind: "cv" });
  assert.deepEqual(resolveMarkdownTarget("/blog"), { kind: "blogIndex" });
});

test("every trust-anchor page has a markdown representation", () => {
  for (const page of STATIC_PAGES) {
    assert.notEqual(
      resolveMarkdownTarget(page.path).kind,
      "notFound",
      `${page.path} has no markdown target`
    );
  }
});

test("resolves a blog post to its slug", () => {
  assert.deepEqual(resolveMarkdownTarget("/blog/hello-world"), {
    kind: "blogPost",
    slug: "hello-world",
  });
  assert.deepEqual(resolveMarkdownTarget("/blog/%D8%B3%D9%84%D8%A7%D9%85"), {
    kind: "blogPost",
    slug: "سلام",
  });
});

test("unknown paths resolve to notFound", () => {
  for (const path of [
    "/some-path-that-does-not-exist",
    "/blog/hello/extra",
    "/admin",
    "/api/blog",
    "/about/team",
  ]) {
    assert.equal(
      resolveMarkdownTarget(path).kind,
      "notFound",
      `${path} should 404`
    );
  }
});

test("a malformed percent-escape 404s instead of throwing", () => {
  assert.doesNotThrow(() => resolveMarkdownTarget("/blog/%E0%A4%A"));
  assert.equal(resolveMarkdownTarget("/blog/%E0%A4%A").kind, "notFound");
});
