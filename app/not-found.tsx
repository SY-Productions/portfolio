import Link from "next/link";
import { GiMinotaur } from "react-icons/gi";
import { notFoundMarkdown } from "@/lib/agent-markdown";
import { SITE_MAP_LINKS } from "@/lib/site-profile";

/**
 * 404 page.
 *
 * Returns a real HTTP 404 (Next.js does that for `not-found.tsx`) and, next to
 * the human copy, a visible markdown recovery block: an agent that lands here
 * with a plain `Accept: text/html` still gets machine-readable directions to
 * the sitemap and llms.txt instead of a dead end. Agents that negotiate
 * `Accept: text/markdown` receive the same text as a `text/markdown` body.
 */

const RECOVERY_MARKDOWN = notFoundMarkdown("(the requested path)");

const Custom404 = () => {
  return (
    <div className="bg-[url('/vectors/sec1-bgdark.svg')] bg-no-repeat bg-cover w-full min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden py-16">
      <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-black/0 backdrop-blur-sm"></div>

      <div className="relative z-10 flex flex-col items-center gap-8 px-4 w-full max-w-3xl">
        {/* 404 Icon */}
        <span className="text-7xl sm:text-8xl font-extrabold text-white tracking-tight">
          <GiMinotaur />
        </span>

        {/* Title */}
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl sm:text-5xl font-extrabold font-[ybn] text-white tracking-tight">
            صفحه پیدا نشد!
          </h1>
          <span className="w-16 h-1 bg-gradient-to-r from-[#3A0D12] to-[#3B070A]"></span>
        </div>

        {/* Description */}
        <p className="font-[ybn] text-white/60 text-sm lg:text-base 2xl:text-xl leading-7 max-w-md">
          متاسفانه صفحه‌ای که به دنبال آن بودید وجود ندارد. لطفاً به صفحه اصلی
          بازگردید.
        </p>

        {/* Back to Home Button */}
        <Link
          href="/"
          className="flex items-center text-white justify-center h-[6vh] lg:h-[8vh] px-[1.5vw] min-w-[22vw] sm:min-w-0 bg-gradient-to-r from-[#3B070A]/20 to-[#5A0E12]/20 hover:from-[#3B070A]/30 hover:to-[#5A0E12]/30 rounded-none font-[ybn] text-nowrap text-sm 2xl:text-base transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(140,158,255,0.2)] border border-white/10 hover:border-white/20 backdrop-blur-md"
        >
          بازگشت به صفحه اصلی
        </Link>

        {/* Recovery links — where to look next */}
        <nav
          dir="ltr"
          aria-label="Where to look next"
          className="w-full text-left border-t border-white/10 pt-8"
        >
          <h2 className="font-[ybb] text-white/70 text-base mb-3">
            Where to look instead
          </h2>
          <ul className="font-[ybn] text-sm space-y-2">
            {SITE_MAP_LINKS.map(({ path, label }) => (
              <li key={path}>
                <Link
                  href={path}
                  className="text-white/50 hover:text-white/90 transition-colors"
                >
                  <code>{path}</code> — {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Same directions in markdown, for agents that landed here as HTML */}
        <section
          dir="ltr"
          aria-label="Recovery directions in markdown"
          className="w-full text-left"
        >
          <h2 className="font-[ybb] text-white/50 text-xs tracking-widest uppercase mb-2">
            ~/404.md
          </h2>
          <pre className="font-[inter] text-white/40 text-[11px] leading-5 whitespace-pre-wrap overflow-x-auto bg-black/30 border border-white/10 p-4">
            {RECOVERY_MARKDOWN}
          </pre>
        </section>
      </div>
    </div>
  );
};

export default Custom404;
