import test from "node:test";
import assert from "node:assert/strict";
import { htmlToMarkdown } from "../lib/html-to-markdown";

test("returns an empty string for empty input", () => {
  assert.equal(htmlToMarkdown(""), "");
});

test("keeps heading levels", () => {
  const md = htmlToMarkdown("<h2>What is Flutter?</h2><h3>Installing</h3>");

  assert.ok(md.includes("## What is Flutter?"));
  assert.ok(md.includes("### Installing"));
});

test("separates paragraphs with a blank line", () => {
  const md = htmlToMarkdown("<p>First.</p><p>Second.</p>");

  assert.equal(md, "First.\n\nSecond.");
});

test("renders list items as bullets", () => {
  const md = htmlToMarkdown("<ul><li>Dart</li><li>Flutter</li></ul>");

  assert.ok(md.includes("- Dart"));
  assert.ok(md.includes("- Flutter"));
});

test("fences code blocks and keeps the language", () => {
  const md = htmlToMarkdown(
    '<pre><code class="language-bash">flutter doctor</code></pre><p>Next.</p>'
  );

  assert.ok(md.includes("```bash\nflutter doctor\n```"));
  // The paragraph after a code block must not glue onto the fence.
  assert.ok(md.includes("```\n\nNext."));
});

test("fences a code block with no declared language", () => {
  assert.ok(htmlToMarkdown("<pre><code>npm test</code></pre>").includes("```\nnpm test\n```"));
});

test("converts inline marks and links", () => {
  const md = htmlToMarkdown(
    '<p>See <a href="https://example.com">the docs</a>, use <code>flutter</code>, it is <strong>fast</strong> and <em>small</em>.</p>'
  );

  assert.ok(md.includes("[the docs](https://example.com)"));
  assert.ok(md.includes("`flutter`"));
  assert.ok(md.includes("**fast**"));
  assert.ok(md.includes("_small_"));
});

test("converts images, quotes and rules", () => {
  assert.ok(
    htmlToMarkdown('<img alt="Chart" src="/chart.png">').includes("![Chart](/chart.png)")
  );
  assert.ok(htmlToMarkdown('<img src="/plain.png">').includes("![](/plain.png)"));
  assert.ok(htmlToMarkdown("<blockquote>Ship it.</blockquote>").includes("> Ship it."));
  assert.ok(htmlToMarkdown("<p>a</p><hr><p>b</p>").includes("---"));
});

test("decodes entities exactly once", () => {
  assert.equal(htmlToMarkdown("<p>Tom &amp;amp; Jerry</p>"), "Tom &amp; Jerry");
  assert.equal(htmlToMarkdown("<p>a &lt; b &amp;&amp; c &gt; d</p>"), "a < b && c > d");
});

test("does not treat code block contents as markup", () => {
  const md = htmlToMarkdown(
    '<pre><code class="language-html">&lt;div class="x"&gt;hi&lt;/div&gt;</code></pre>'
  );

  assert.ok(md.includes('<div class="x">hi</div>'));
});

test("drops unmodelled tags without leaving markup behind", () => {
  const md = htmlToMarkdown('<p>Hello <span class="x">world</span></p><table><tr><td>c</td></tr></table>');

  assert.ok(!md.includes("<"));
  assert.ok(md.includes("Hello world"));
});

test("collapses runs of blank lines", () => {
  assert.ok(!/\n{3,}/.test(htmlToMarkdown("<p>a</p><p></p><p></p><p>b</p>")));
});
