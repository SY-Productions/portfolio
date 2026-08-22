/**
 * Minimal HTML → Markdown converter for article bodies.
 *
 * Blog posts are authored in Tiptap, which stores a small, predictable subset
 * of HTML. Stripping tags outright would flatten headings, lists and code into
 * one undifferentiated blob, which is exactly the structure an agent reading
 * the markdown representation needs. This handles that subset and degrades to
 * plain text for anything else — it is not a general-purpose converter.
 */

/** Sentinel wrapping stashed code blocks while the rest of the HTML is parsed. */
const CODE_OPEN = "%%CODEBLOCK-";
const CODE_CLOSE = "%%";

const ENTITIES: [RegExp, string][] = [
  [/&nbsp;/g, " "],
  [/&lt;/g, "<"],
  [/&gt;/g, ">"],
  [/&quot;/g, '"'],
  [/&#39;/g, "'"],
  [/&apos;/g, "'"],
  // Ampersand last, so a decoded entity cannot be decoded twice.
  [/&amp;/g, "&"],
];

const decodeEntities = (value: string) =>
  ENTITIES.reduce(
    (text, [pattern, replacement]) => text.replace(pattern, replacement),
    value
  );

/** Strips tags from inline content and decodes entities. */
const inlineText = (html: string) =>
  decodeEntities(html.replace(/<[^>]+>/g, "")).trim();

export function htmlToMarkdown(html: string): string {
  if (!html) return "";

  let text = html;

  /*
   * Code blocks are lifted out first and restored at the very end. Decoding
   * `&lt;div&gt;` inside a code sample produces real angle brackets, and the
   * final tag-stripping pass would otherwise eat them as markup.
   */
  const codeBlocks: string[] = [];
  const stash = (language: string, body: string) => {
    const content = decodeEntities(body.replace(/<[^>]+>/g, "")).trim();
    codeBlocks.push("```" + language + "\n" + content + "\n```");
    return `\n\n${CODE_OPEN}${codeBlocks.length - 1}${CODE_CLOSE}\n\n`;
  };

  text = text.replace(
    /<pre[^>]*>\s*<code[^>]*class="[^"]*language-(\w+)[^"]*"[^>]*>([\s\S]*?)<\/code>\s*<\/pre>/gi,
    (_match, language: string, body: string) => stash(language, body)
  );
  text = text.replace(
    /<pre[^>]*>([\s\S]*?)<\/pre>/gi,
    (_match, body: string) => stash("", body)
  );

  // Inline marks.
  text = text.replace(
    /<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi,
    (_match, href: string, label: string) => `[${inlineText(label)}](${href})`
  );
  text = text.replace(
    /<code[^>]*>([\s\S]*?)<\/code>/gi,
    (_match, body: string) => `\`${inlineText(body)}\``
  );
  text = text.replace(
    /<(strong|b)[^>]*>([\s\S]*?)<\/\1>/gi,
    (_match, _tag: string, body: string) => `**${inlineText(body)}**`
  );
  text = text.replace(
    /<(em|i)[^>]*>([\s\S]*?)<\/\1>/gi,
    (_match, _tag: string, body: string) => `_${inlineText(body)}_`
  );

  // Block elements.
  text = text.replace(
    /<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi,
    (_match, level: string, body: string) =>
      `\n\n${"#".repeat(Number(level))} ${inlineText(body)}\n\n`
  );
  text = text.replace(
    /<li[^>]*>([\s\S]*?)<\/li>/gi,
    (_match, body: string) => `\n- ${inlineText(body)}`
  );
  text = text.replace(
    /<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi,
    (_match, body: string) => `\n\n> ${inlineText(body)}\n\n`
  );
  text = text.replace(
    /<img[^>]*alt="([^"]*)"[^>]*src="([^"]*)"[^>]*>/gi,
    "\n\n![$1]($2)\n\n"
  );
  text = text.replace(/<img[^>]*src="([^"]*)"[^>]*>/gi, "\n\n![]($1)\n\n");
  text = text.replace(/<hr\s*\/?>/gi, "\n\n---\n\n");
  text = text.replace(/<br\s*\/?>/gi, "\n");
  text = text.replace(/<\/(p|div|ul|ol|table|section)>/gi, "\n\n");

  // Anything left over is markup this converter does not model.
  text = decodeEntities(text.replace(/<[^>]+>/g, ""));

  text = text
    .split("\n")
    .map((line) => line.replace(/[ \t]+$/g, "").replace(/^[ \t]+/, ""))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return text.replace(
    new RegExp(`${CODE_OPEN}(\\d+)${CODE_CLOSE}`, "g"),
    (_match, index: string) => codeBlocks[Number(index)] ?? ""
  );
}
