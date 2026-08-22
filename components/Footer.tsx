"use client";
import React, { memo } from "react";
import Link from "next/link";
import { useLang } from "@/app/context/LanguageContext";

/** Standalone pages, in the order they are most likely to be wanted. */
const FOOTER_LINKS = [
  { href: "/about", key: "footer.links.about" },
  { href: "/blog", key: "footer.links.blog" },
  { href: "/contact", key: "footer.links.contact" },
  { href: "/developers", key: "footer.links.developers" },
  { href: "/privacy", key: "footer.links.privacy" },
] as const;

// Memoized for better performance
const Footer = memo(function Footer() {
  const { t, lang } = useLang();

  const year =
    lang === "fa"
      ? new Date().toLocaleDateString("fa-IR").split("/")[0]
      : lang === "ar"
      ? new Date().toLocaleDateString("ar-SA").split("/")[0]
      : new Date().getFullYear().toString();

  return (
    <div className="relative w-full py-[3vh] ps-[3vw] flex flex-col items-center justify-center font-[ybn] 2xl:text-lg border-t border-white/10 mt-0 mb-0 bg-black/20 backdrop-blur-sm">
      {/* Subtle gradient at the top of footer */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#3A0D12]/30 to-[#3B070A]/30"></div>

      {/*
        Standalone pages are otherwise unreachable from the homepage, so
        crawlers and agents never discover /about, /contact, /privacy or the
        developer index. This row is their only inbound link from the site root.
      */}
      <nav
        aria-label="Footer"
        className="relative z-10 mb-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 px-6 text-sm"
      >
        {FOOTER_LINKS.map(({ href, key }) => (
          <Link
            key={href}
            href={href}
            className="text-white/50 hover:text-white/90 transition-colors"
          >
            {t(key)}
          </Link>
        ))}
      </nav>

      {/* Footer content with subtle animation */}
      <p className="text-wrap text-white/80 px-14 lg:px-0 relative z-10 group">
        {`© ${year} ${t("footer.copyright")} `}
        <strong className="text-nowrap relative">
          {t("footer.owner")}
          <span className="absolute -bottom-1 right-0 w-0 group-hover:w-full h-[1px] bg-gradient-to-r from-[#3A0D12] to-[#3B070A] transition-all duration-700"></span>
        </strong>
        {t("footer.suffix")}
      </p>
    </div>
  );
});

export default Footer;
