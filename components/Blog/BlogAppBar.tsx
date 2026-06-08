"use client";

import Link from "next/link";
import { Sun, Moon, ArrowLeft } from "lucide-react";
import { LangFlag } from "@/components/FlagIcons";
import { useLang, type Lang } from "@/app/context/LanguageContext";
import { useTheme } from "@/app/context/ThemeContext";

const LANGS: Lang[] = ["fa", "en", "ar"];

export default function BlogAppBar() {
  const { lang, setLang } = useLang();
  const { theme, toggleTheme } = useTheme();

  const isRtl = lang === "fa" || lang === "ar";

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 h-12 flex items-center px-4 sm:px-6 lg:px-8
                 bg-[var(--bg-main,#141010)]/80 backdrop-blur-md border-b border-white/5"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Back to home */}
      <Link
        href="/"
        className="flex items-center gap-1.5 text-white/40 hover:text-white/80 transition-colors text-xs font-[ybn] me-auto"
      >
        <ArrowLeft size={13} className={isRtl ? "rotate-180" : ""} />
        <span className="hidden sm:inline">Portfolio</span>
      </Link>

      {/* Center: Blog label */}
      <span className="absolute left-1/2 -translate-x-1/2 text-white/30 text-xs font-[ybn] tracking-widest uppercase pointer-events-none">
        Blog
      </span>

      {/* Right: lang + theme */}
      <div className="flex items-center gap-1 ms-auto">
        {LANGS.map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`w-8 h-7 flex items-center justify-center border transition-all ${
              lang === l
                ? "bg-[#3B070A]/60 border-[#5A0E12]/50"
                : "bg-transparent border-white/10 hover:border-white/20"
            }`}
            style={{ opacity: lang === l ? 1 : 0.45 }}
          >
            <LangFlag lang={l} size="1.3em" />
          </button>
        ))}

        <button
          onClick={toggleTheme}
          className="w-8 h-7 ms-1 flex items-center justify-center border border-white/10 text-white/40 hover:text-white/80 hover:border-white/25 transition-all"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
        </button>
      </div>
    </header>
  );
}
