import test from "node:test";
import assert from "node:assert/strict";
import { STATIC_PAGES, type ContentSection } from "../lib/site-content";

/** Visible characters a crawler would extract from a rendered section list. */
const textLength = (sections: readonly ContentSection[]) =>
  sections
    .flatMap((section) => [section.heading, ...section.body, ...(section.bullets ?? [])])
    .join(" ").length;

test("every trust-anchor page exists at its own path", () => {
  const paths = STATIC_PAGES.map((page) => page.path);

  assert.deepEqual(paths.sort(), ["/about", "/contact", "/privacy"]);
});

test("every trust-anchor page carries 500+ characters per language", () => {
  for (const page of STATIC_PAGES) {
    assert.ok(
      textLength(page.sectionsFa) >= 500,
      `${page.path} Persian content is ${textLength(page.sectionsFa)} characters`
    );
    assert.ok(
      textLength(page.sectionsEn) >= 500,
      `${page.path} English content is ${textLength(page.sectionsEn)} characters`
    );
  }
});

test("every trust-anchor page has a title and description in both languages", () => {
  for (const page of STATIC_PAGES) {
    for (const field of ["title", "titleFa", "description", "descriptionFa"] as const) {
      assert.ok(page[field]?.trim().length, `${page.path} is missing ${field}`);
    }
  }
});

test("no section is an empty shell", () => {
  for (const page of STATIC_PAGES) {
    for (const section of [...page.sectionsFa, ...page.sectionsEn]) {
      assert.ok(section.heading.trim().length, `${page.path} has an unnamed section`);
      assert.ok(
        section.body.length > 0 && section.body.every((line) => line.trim().length),
        `${page.path} section "${section.heading}" has no body`
      );
    }
  }
});

test("section headings are unique within a language", () => {
  for (const page of STATIC_PAGES) {
    for (const sections of [page.sectionsFa, page.sectionsEn]) {
      const headings = sections.map((section) => section.heading);
      assert.equal(
        new Set(headings).size,
        headings.length,
        `${page.path} repeats a heading`
      );
    }
  }
});
