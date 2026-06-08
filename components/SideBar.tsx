"use client";
import React, { useEffect, memo, useRef } from "react";
import Image from "next/image";
import { useZState } from "@/app/states";
import {
  Hashtag,
  Box,
  Code,
  Clipboard,
  Archive,
  Cup,
  Headphone,
  Book,
  CodeCircle,
  ShoppingBag,
} from "iconsax-react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/app/context/ThemeContext";
import { useLang, LANG_LABEL, Lang } from "@/app/context/LanguageContext";
import ReactCountryFlag from "react-country-flag";

import logo from "../public/vectors/logo.svg";

const navigationItems = [
  { titleKey: "nav.aboutMe",   logo1: <Hashtag size={20} color="white" variant="Bold" />, logo2: <Hashtag size={20} />,  to: "#about-me" },
  { titleKey: "nav.skills",    logo1: <Box     size={20} color="white" variant="Bold" />, logo2: <Box     size={20} />,  to: "#skills" },
  { titleKey: "nav.portfolio", logo1: <Code    size={20} color="white" variant="Bold" />, logo2: <Code    size={20} />,  to: "#portfolio" },
  { titleKey: "nav.education", logo1: <Clipboard size={20} color="white" variant="Bold" />, logo2: <Clipboard size={20} />, to: "#education" },
  { titleKey: "nav.work",      logo1: <Archive size={20} color="white" variant="Bold" />, logo2: <Archive size={20} />,  to: "#work" },
  { titleKey: "nav.events",    logo1: <Cup     size={20} color="white" variant="Bold" />, logo2: <Cup     size={20} />,  to: "#events" },
  { titleKey: "openSource.navTitle", logo1: <CodeCircle  size={20} color="white" variant="Bold" />, logo2: <CodeCircle  size={20} />, to: "#open-source" },
  { titleKey: "products.navTitle",   logo1: <ShoppingBag size={20} color="white" variant="Bold" />, logo2: <ShoppingBag size={20} />, to: "#products" },
  { titleKey: "blog.navTitle",       logo1: <Book        size={20} color="white" variant="Bold" />, logo2: <Book        size={20} />, to: "#blog" },
  { titleKey: "nav.contact",         logo1: <Headphone   size={20} color="white" variant="Bold" />, logo2: <Headphone   size={20} />, to: "#call-me" },
];

const SideBar = memo(function SideBar() {
  const { isOpen, setFixedOpen, setOpen, sideBarScroll, setSideBarScroll, isOnMobile, setIsOnMobile } = useZState();
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t, dir } = useLang();
  const observerRef = useRef<IntersectionObserver | null>(null);

  const hideTranslation = "-translate-x-[100vw]";
  const sideBarFullClasses = "z-50 w-[100vw] lg:w-[20vw] flex h-dvh fixed top-0 start-0 transition-all duration-300 ";

  const navItemBase = "flex flex-row justify-start items-center gap-3 py-2 my-0 cursor-pointer hover:bg-white/5 transition-all duration-200 border-e-2 border-transparent";
  const navItemActive = "border-white/10 border border-s-0 border-e-2 border-e-[#3B070A] bg-black/40 shadow-sm";

  useEffect(() => {
    const handleResize = () => {
      setIsOnMobile(window.innerWidth <= 1024);
      if (window.innerWidth >= 1024) setFixedOpen();
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [setFixedOpen, setIsOnMobile]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setSideBarScroll(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );
    navigationItems.forEach((item) => {
      const el = document.getElementById(item.to.replace("#", ""));
      if (el) observerRef.current?.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, [setSideBarScroll]);

  return (
    <div
      className={
        isOnMobile
          ? isOpen
            ? sideBarFullClasses
            : sideBarFullClasses + hideTranslation
          : sideBarFullClasses
      }
    >
      <aside className="font-[ybn] border-e border-white/10 h-dvh bg-black/20 w-[70vw] sm:w-[50vw] md:w-[30vw] lg:w-[20vw] backdrop-blur-3xl flex flex-col shadow-2xl order-first overflow-hidden">
        {/* Mobile spacer — clears the fixed appbar + adds breathing room */}
        <div className="lg:hidden flex-shrink-0 h-[72px]" />

        {/* Logo */}
        <div className="flex-shrink-0 relative hidden lg:flex items-center justify-between w-full px-8 my-[3vh]">
          <Image
            className="w-[30%] h-auto opacity-90 hover:opacity-100 transition-opacity"
            src={logo}
            alt="Logo of Yousof Hashemzade"
          />
          <div className="absolute -z-10 w-[30%] h-full bg-[#3B070A]/5 filter blur-xl" />
        </div>

        {/* Navigation — scrollable */}
        <nav className="sidebar-nav-scroll flex-1 min-h-0 px-0 ms-8 space-y-0.5">
          {navigationItems.map((item) => (
            <a
              key={item.to}
              href={item.to}
              onClick={() => {
                setSideBarScroll(item.to);
                if (isOnMobile) setOpen();
              }}
              className={`${navItemBase} ${item.to === sideBarScroll ? navItemActive : ""}`}
            >
              <span
                className={
                  item.to === sideBarScroll
                    ? "bg-gradient-to-r from-[#3B070A] to-[#3A0D12] p-1.5 rounded-none ms-2 shadow-lg flex-shrink-0"
                    : "bg-white/5 p-1.5 rounded-none ms-2 transition-all duration-300 flex-shrink-0"
                }
              >
                {item.to === sideBarScroll ? item.logo1 : item.logo2}
              </span>
              <span
                className={`text-sm transition-all duration-200 truncate ${
                  item.to === sideBarScroll ? "text-white font-bold" : "text-white/50 hover:text-white/80"
                }`}
              >
                {t(item.titleKey)}
              </span>
            </a>
          ))}
        </nav>

        {/* Bottom controls — fixed, never shrinks */}
        <div className="flex-shrink-0" style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}>
          <div className="h-px border-t border-white/10 mb-3" />

          <div className="px-8 mb-3 flex items-center gap-2">
            {(["fa", "en", "ar"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                title={LANG_LABEL[l]}
                className={`flex-1 py-1 flex items-center justify-center transition-all border ${
                  lang === l
                    ? "bg-[#3B070A]/60 border-[#5A0E12]/60"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                <ReactCountryFlag
                  countryCode={l === "fa" ? "IR" : l === "ar" ? "SA" : "GB"}
                  svg
                  style={{ width: "1.4em", height: "1.4em" }}
                />
              </button>
            ))}

            <div className="w-px h-5 bg-white/10 mx-1" />

            <button
              onClick={toggleTheme}
              title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              className="flex-1 py-1 flex items-center justify-center bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white/60 hover:text-white"
            >
              {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
            </button>
          </div>

          <div className="px-8">
            <a
              href="/youdexsof-fa-cv.pdf"
              download="Yousof-Hashemzade-Cv-Fa.pdf"
              className="w-full h-10 flex items-center justify-center border border-white/10 bg-gradient-to-r from-[#3B070A]/10 to-[#3A0D12]/10 hover:from-[#3B070A]/20 hover:to-[#3A0D12]/20 font-normal text-sm transition-all duration-300 text-white/90 hover:text-white hover:border-white/20 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              {t("nav.downloadCV")}
            </a>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      <div
        onClick={() => setOpen()}
        className="w-[30vw] sm:w-[50vw] md:w-[70vw] lg:hidden"
      />
    </div>
  );
});

export default SideBar;
