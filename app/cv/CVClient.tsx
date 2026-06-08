"use client";

import { useState } from "react";

type Lang = "fa" | "en" | "ar";
type Theme = "dark" | "light";

const labels: Record<Lang, { download: string; preview: string; langs: Record<Lang, string>; toggleTheme: string }> = {
  fa: {
    download: "دانلود / چاپ PDF",
    preview: "پیش‌نمایش رزومه",
    langs: { fa: "فارسی", en: "English", ar: "العربية" },
    toggleTheme: "تغییر تم",
  },
  en: {
    download: "Download / Print PDF",
    preview: "CV Preview",
    langs: { fa: "فارسی", en: "English", ar: "العربية" },
    toggleTheme: "Toggle Theme",
  },
  ar: {
    download: "تنزيل / طباعة PDF",
    preview: "معاينة السيرة الذاتية",
    langs: { fa: "فارسی", en: "English", ar: "العربية" },
    toggleTheme: "تبديل المظهر",
  },
};

export default function CVClient({ lang, theme }: { lang: Lang; theme: Theme }) {
  const [isPrinting, setIsPrinting] = useState(false);
  const l = labels[lang];
  const isRtl = lang === "fa" || lang === "ar";
  const isDark = theme === "dark";
  const nextTheme: Theme = isDark ? "light" : "dark";

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 100);
  };

  const toolbarBg = isDark ? "rgba(10,8,8,0.96)" : "rgba(245,240,240,0.96)";
  const toolbarBorder = isDark ? "rgba(90,14,18,0.4)" : "rgba(90,14,18,0.2)";
  const textColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(26,5,5,0.5)";
  const activeBg = isDark ? "rgba(59,7,10,0.6)" : "rgba(90,14,18,0.12)";
  const activeBorder = isDark ? "rgba(90,14,18,0.7)" : "rgba(90,14,18,0.4)";
  const activeColor = isDark ? "rgba(255,255,255,0.95)" : "#1a0505";
  const inactiveBg = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)";
  const inactiveBorder = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const inactiveColor = isDark ? "rgba(255,255,255,0.45)" : "rgba(26,5,5,0.45)";

  return (
    <>
      <style>{`
        @media (max-width: 640px) {
          .cv-toolbar-label { display: none; }
          .cv-toolbar-controls { transform: scale(0.78); transform-origin: right center; }
        }
        @media (max-width: 400px) {
          .cv-toolbar-controls { transform: scale(0.65); transform-origin: right center; }
        }
      `}</style>
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="no-print fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 py-3"
      style={{
        background: toolbarBg,
        borderBottom: `1px solid ${toolbarBorder}`,
        backdropFilter: "blur(20px)",
        fontFamily: isRtl ? '"ybn", sans-serif' : '"inter", sans-serif',
      }}
    >
      <span className="cv-toolbar-label" style={{ color: textColor, fontSize: 13 }}>{l.preview}</span>

      <div className="cv-toolbar-controls flex items-center gap-2" style={{ marginInlineStart: "auto" }}>
        {/* Language switcher */}
        {(["fa", "en", "ar"] as Lang[]).map((l2) => (
          <a
            key={l2}
            href={`/cv?lang=${l2}&theme=${theme}`}
            style={{
              padding: "4px 12px",
              fontSize: 12,
              border: `1px solid ${l2 === lang ? activeBorder : inactiveBorder}`,
              background: l2 === lang ? activeBg : inactiveBg,
              color: l2 === lang ? activeColor : inactiveColor,
              textDecoration: "none",
              transition: "all 0.2s",
            }}
          >
            {l.langs[l2]}
          </a>
        ))}

        {/* Divider */}
        <div style={{ width: 1, height: 20, background: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.12)", margin: "0 4px" }} />

        {/* Theme toggle */}
        <a
          href={`/cv?lang=${lang}&theme=${nextTheme}`}
          title={l.toggleTheme}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            border: `1px solid ${inactiveBorder}`,
            background: inactiveBg,
            color: inactiveColor,
            textDecoration: "none",
            fontSize: 16,
            transition: "all 0.2s",
          }}
        >
          {isDark ? "☀️" : "🌙"}
        </a>

        {/* Download button */}
        <button
          onClick={handlePrint}
          disabled={isPrinting}
          style={{
            padding: "7px 20px",
            background: "linear-gradient(135deg, #3B070A, #5A0E12)",
            border: "1px solid rgba(90,14,18,0.6)",
            color: "rgba(255,255,255,0.95)",
            fontSize: 13,
            cursor: isPrinting ? "wait" : "pointer",
            transition: "all 0.2s",
            opacity: isPrinting ? 0.7 : 1,
            fontFamily: isRtl ? '"ybn", sans-serif' : '"inter", sans-serif',
          }}
        >
          {isPrinting ? "..." : l.download}
        </button>
      </div>
    </div>
    </>
  );
}
