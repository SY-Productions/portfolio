import Link from "next/link";
import BlogAppBar from "@/components/Blog/BlogAppBar";
import type { ContentSection } from "@/lib/site-content";
import {
  MACHINE_READABLE_LINKS,
  SITE_MAP_LINKS,
} from "@/lib/site-profile";

/**
 * Server-rendered shell for the standalone content pages (about, contact,
 * privacy, developers).
 *
 * Deliberately a server component with no data fetching in the client: these
 * are the pages AI agents and crawlers read to verify the business, so every
 * word has to be present in the raw HTML. Persian and English are rendered
 * side by side rather than swapped by a client-side language context.
 */

type Props = {
  label: string;
  titleFa: string;
  title: string;
  descriptionFa: string;
  description: string;
  sectionsFa: readonly ContentSection[];
  sectionsEn: readonly ContentSection[];
  /** Rendered after the localized sections — used by the developer index. */
  children?: React.ReactNode;
};

function Sections({
  sections,
  dir,
}: {
  sections: readonly ContentSection[];
  dir: "rtl" | "ltr";
}) {
  return (
    <div dir={dir} className={dir === "rtl" ? "text-right" : "text-left"}>
      {sections.map((section) => (
        <section key={section.heading} className="mb-10">
          <h3 className="font-[ybb] font-normal text-white/90 text-lg lg:text-xl mb-3">
            {section.heading}
          </h3>
          {section.body.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="font-[ybn] text-white/60 leading-8 mb-4 2xl:text-lg"
            >
              {paragraph}
            </p>
          ))}
          {section.bullets?.length ? (
            <ul className="font-[ybn] text-white/60 leading-8 2xl:text-lg space-y-2 list-disc ms-5">
              {section.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </div>
  );
}

export default function StaticPageShell({
  label,
  titleFa,
  title,
  descriptionFa,
  description,
  sectionsFa,
  sectionsEn,
  children,
}: Props) {
  return (
    <>
      <BlogAppBar label={label} />
      <main className="pt-20 pb-16 section-shell">
        <article className="glass-card max-w-4xl mx-auto p-6 sm:p-10">
          <header dir="rtl" className="mb-10 text-right">
            <h1 className="section-title in-view mb-4 whitespace-normal">
              {titleFa}
            </h1>
            <p className="font-[ybn] text-white/60 leading-8 2xl:text-lg mb-3">
              {descriptionFa}
            </p>
            <p
              dir="ltr"
              className="font-[ybn] text-white/40 leading-7 text-sm text-left"
            >
              {title} — {description}
            </p>
            <span className="block mt-5 w-16 h-[2px] bg-gradient-to-r from-[#3A0D12] to-[#3B070A]" />
          </header>

          <h2 className="font-[ybb] text-white/70 text-base mb-6" dir="rtl">
            فارسی
          </h2>
          <Sections sections={sectionsFa} dir="rtl" />

          <h2 className="font-[ybb] text-white/70 text-base mb-6 mt-4" dir="ltr">
            English
          </h2>
          <Sections sections={sectionsEn} dir="ltr" />

          {children}

          <nav
            dir="ltr"
            aria-label="Site pages and machine-readable files"
            className="mt-12 pt-8 border-t border-white/10 grid gap-8 sm:grid-cols-2 text-left"
          >
            <div>
              <h2 className="font-[ybb] text-white/70 text-base mb-3">Pages</h2>
              <ul className="font-[ybn] text-sm space-y-2">
                {SITE_MAP_LINKS.map(({ path, label: linkLabel }) => (
                  <li key={path}>
                    <Link
                      href={path}
                      className="text-white/50 hover:text-white/90 transition-colors"
                    >
                      {linkLabel}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-[ybb] text-white/70 text-base mb-3">
                For agents
              </h2>
              <ul className="font-[ybn] text-sm space-y-2">
                {MACHINE_READABLE_LINKS.map(({ path, label: linkLabel }) => (
                  <li key={path}>
                    <a
                      href={path}
                      className="text-white/50 hover:text-white/90 transition-colors"
                    >
                      <code>{path}</code> — {linkLabel}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </article>
      </main>
    </>
  );
}
