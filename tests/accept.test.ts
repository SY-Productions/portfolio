import test from "node:test";
import assert from "node:assert/strict";
import {
  HTML_TYPE,
  MARKDOWN_TYPE,
  isNotAcceptable,
  parseAccept,
  prefersMarkdown,
  qualityFor,
} from "../lib/http/accept";

const BROWSER_ACCEPT =
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8";

test("parses a media range list with q-values", () => {
  const ranges = parseAccept("text/markdown;q=0.9, text/html;q=0.5");

  assert.equal(ranges.length, 2);
  assert.deepEqual(
    ranges.map((range) => [`${range.type}/${range.subtype}`, range.quality]),
    [
      ["text/markdown", 0.9],
      ["text/html", 0.5],
    ]
  );
});

test("defaults a missing q parameter to 1 and clamps out-of-range values", () => {
  const ranges = parseAccept("text/markdown, text/html;q=5, text/plain;q=-1");

  assert.deepEqual(
    ranges.map((range) => range.quality),
    [1, 1, 0]
  );
});

test("skips malformed entries instead of throwing", () => {
  assert.deepEqual(parseAccept("notamediarange, , text/markdown").length, 1);
});

test("treats an absent Accept header as accepting anything", () => {
  assert.equal(qualityFor(null, MARKDOWN_TYPE), 1);
  assert.equal(prefersMarkdown(null), false);
  assert.equal(isNotAcceptable(null), false);
});

test("resolves quality through the most specific matching range", () => {
  const header = "*/*;q=0.2, text/*;q=0.5, text/markdown;q=0.9";

  assert.equal(qualityFor(header, MARKDOWN_TYPE), 0.9);
  assert.equal(qualityFor(header, HTML_TYPE), 0.5);
  assert.equal(qualityFor(header, "application/json"), 0.2);
});

test("serves markdown when the client asks for it explicitly", () => {
  assert.equal(prefersMarkdown("text/markdown"), true);
  assert.equal(prefersMarkdown("text/markdown, text/html;q=0.9"), true);
});

test("serves HTML to a browser, whose wildcard scores below text/html", () => {
  assert.equal(prefersMarkdown(BROWSER_ACCEPT), false);
});

test("honours q-values when both representations are listed", () => {
  assert.equal(prefersMarkdown("text/markdown;q=0.4, text/html;q=0.8"), false);
  assert.equal(prefersMarkdown("text/markdown;q=0.8, text/html;q=0.4"), true);
  // A tie goes to HTML: markdown must be strictly preferred to win.
  assert.equal(prefersMarkdown("text/markdown;q=0.5, text/html;q=0.5"), false);
});

test("never serves markdown when it is explicitly rejected", () => {
  assert.equal(prefersMarkdown("text/markdown;q=0, text/html;q=0"), false);
  assert.equal(prefersMarkdown("*/*;q=0, text/markdown;q=0"), false);
});

test("406 only when both representations are excluded", () => {
  assert.equal(isNotAcceptable("application/pdf"), true);
  assert.equal(isNotAcceptable("text/html;q=0, text/markdown;q=0"), true);

  assert.equal(isNotAcceptable(BROWSER_ACCEPT), false);
  assert.equal(isNotAcceptable("text/markdown"), false);
  assert.equal(isNotAcceptable("*/*"), false);
  assert.equal(isNotAcceptable("   "), false);
});
