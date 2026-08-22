/**
 * RFC 9110 §12.5.1 Accept-header parsing and proactive content negotiation.
 *
 * Used to decide whether a request wants `text/markdown` (agents) or
 * `text/html` (browsers) for the same URL, per acceptmarkdown.com. Kept free of
 * Next.js imports so it can be unit-tested directly.
 */

export const MARKDOWN_TYPE = "text/markdown";
export const HTML_TYPE = "text/html";

export type MediaRange = {
  type: string;
  subtype: string;
  quality: number;
  /** 2 = exact type/subtype, 1 = type wildcard, 0 = full wildcard. */
  specificity: 0 | 1 | 2;
};

const clampQuality = (raw: string | undefined): number => {
  if (raw === undefined) return 1;
  const value = Number.parseFloat(raw);
  if (Number.isNaN(value)) return 1;
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
};

/** Parses an Accept header into media ranges. Malformed entries are skipped. */
export function parseAccept(header: string | null | undefined): MediaRange[] {
  if (!header) return [];

  const ranges: MediaRange[] = [];

  for (const rawEntry of header.split(",")) {
    const [rawRange, ...rawParams] = rawEntry.trim().split(";");
    const range = rawRange.trim().toLowerCase();
    if (!range) continue;

    const [type, subtype] = range.split("/");
    if (!type || !subtype) continue;

    const qParam = rawParams
      .map((param) => param.trim().toLowerCase())
      .find((param) => param.startsWith("q="));

    const specificity: 0 | 1 | 2 =
      type === "*" && subtype === "*" ? 0 : subtype === "*" ? 1 : 2;

    ranges.push({
      type,
      subtype,
      quality: clampQuality(qParam?.slice(2)),
      specificity,
    });
  }

  return ranges;
}

/**
 * Quality the client assigned to `mediaType`. An absent Accept header means the
 * client accepts anything (RFC 9110 §12.5.1), so it scores 1.
 */
export function qualityFor(
  header: string | null | undefined,
  mediaType: string
): number {
  const ranges = parseAccept(header);
  if (ranges.length === 0) return 1;

  const [type, subtype] = mediaType.toLowerCase().split("/");
  let best: MediaRange | null = null;

  for (const range of ranges) {
    const matches =
      range.specificity === 0 ||
      (range.specificity === 1 && range.type === type) ||
      (range.type === type && range.subtype === subtype);
    if (!matches) continue;
    if (!best || range.specificity > best.specificity) best = range;
  }

  return best ? best.quality : 0;
}

/** True when the client would rather have markdown than HTML for this URL. */
export function prefersMarkdown(header: string | null | undefined): boolean {
  const markdown = qualityFor(header, MARKDOWN_TYPE);
  if (markdown === 0) return false;
  return markdown > qualityFor(header, HTML_TYPE);
}

/**
 * True when the client explicitly rules out both representations we can serve,
 * which is the only case where a 406 is the honest answer (RFC 9110 §15.5.7).
 */
export function isNotAcceptable(header: string | null | undefined): boolean {
  if (!header || !header.trim()) return false;
  if (parseAccept(header).length === 0) return false;
  return (
    qualityFor(header, MARKDOWN_TYPE) === 0 && qualityFor(header, HTML_TYPE) === 0
  );
}
