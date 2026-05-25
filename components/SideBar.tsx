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
} from "iconsax-react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/app/context/ThemeContext";
import { useLang, LANG_LABEL, Lang } from "@/app/context/LanguageContext";

// Import logo
import logo from "../public/vectors/logo.svg";

// Navigation items data structure
const navigationItems = [
  {
    titleKey: "nav.aboutMe",
    logo1: <Hashtag size={26} color="white" variant="Bold" />,
    logo2: <Hashtag size={25} />,
    to: "#about-me",
  },
  {
    titleKey: "nav.skills",
    logo1: <Box size={26} color="white" variant="Bold" />,
    logo2: <Box size={25} />,
    to: "#skills",
  },
  {
    titleKey: "nav.portfolio",
    logo1: <Code size={26} color="white" variant="Bold" />,
    logo2: <Code size={25} />,
    to: "#portfolio",
  },
  {
    titleKey: "nav.education",
    logo1: <Clipboard size={26} color="white" variant="Bold" />,
    logo2: <Clipboard size={25} />,
    to: "#education",
  },
  {
    titleKey: "nav.work",
    logo1: <Archive size={26} color="white" variant="Bold" />,
    logo2: <Archive size={25} />,
    to: "#work",
  },
  {
    titleKey: "nav.events",
    logo1: <Cup size={26} color="white" variant="Bold" />,
    logo2: <Cup size={25} />,
    to: "#events",
  },
  {
    titleKey: "nav.contact",
    logo1: <Headphone size={26} color="white" variant="Bold" />,
    logo2: <Headphone size={25} />,
    to: "#call-me",
  },
];

const SideBar = memo(function SideBar() {
  const {
    isOpen,
    setFixedOpen,
    setOpen,
    sideBarScroll,
    setSideBarScroll,
    isOnMobile,
    setIsOnMobile,
  } = useZState();

  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t, dir } = useLang();

  const observerRef = useRef<IntersectionObserver | null>(null);

  // Direction-aware hide translation
  const hideTranslation =
    dir === "rtl" ? "translate-x-[100vw]" : "-translate-x-[100vw]";

  // Classes for sidebar container — use CSS logical positioning (start-0 = right in RTL, left in LTR)
  const sideBarFullClasses =
    "z-50 w-[100vw] lg:w-[20vw] flex h-screen fixed top-0 start-0 transition-all duration-300 ";

  // Classes for navigation items — direction-aware active border
  const navItemBaseClasses = `flex flex-row justify-start items-center gap-3 py-2 my-[1.5vh] rounded-none cursor-pointer hover:bg-white/5 transition-all duration-200 border-e-2 border-transparent`;

  const navItemActiveClasses =
    "border-white/10 border border-s-0 border-e-2 border-e-[#3B070A] bg-black/40 shadow-sm py-[5%]";

  useEffect(() => {
    const handleSideBar = () => {
      setIsOnMobile(window.innerWidth <= 1024);
      if (window.innerWidth >= 1024) {
        setFixedOpen();
      }
    };

    window.addEventListener("resize", handleSideBar);
    handleSideBar();

    return () => window.removeEventListener("resize", handleSideBar);
  }, [setFixedOpen, setIsOnMobile]);

  useEffect(() => {
    // Create intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setSideBarScroll(`#${id}`);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px", // Trigger when section is in middle of viewport
        threshold: 0,
      },
    );

    // Observe all sections
    navigationItems.forEach((item) => {
      const sectionId = item.to.replace("#", "");
      const section = document.getElementById(sectionId);
      if (section) {
        observerRef.current?.observe(section);
      }
    });

    // Cleanup
    return () => {
      observerRef.current?.disconnect();
    };
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
      <aside className="font-[ybn] border-e border-white/10 h-screen bg-black/20 w-[70vw] sm:w-[50vw] md:w-[30vw] lg:w-[20vw] backdrop-blur-3xl flex flex-col justify-between shadow-2xl order-first">
        {/* Mobile spacing for navbar - only visible on mobile */}
        <div className="lg:hidden h-[60px]"></div>

        <div className="LOGO&OPTIONS text-base text-white/50 ms-8 overflow-y-auto flex-grow">
          {/* Logo container with subtle glow */}
          <div className="relative hidden lg:flex items-center justify-start w-full my-[3vh]">
            <Image
              className="w-[30%] h-auto transition-all duration-300 hover:opacity-100 opacity-90"
              src={logo}
              alt="Logo of Yousof Hashemzade, Flutter Developer | لوگوی یوسف هاشم زاده، توسعه دهنده فلاتر"
            />
            {/* Subtle glow behind logo */}
            <div className="absolute -z-10 w-[30%] h-full bg-[#3B070A]/5 filter blur-xl"></div>
          </div>

          {/* Navigation items */}
          <div className="mt-4 space-y-1">
            {navigationItems.map((item) => (
              <a
                onClick={() => {
                  setSideBarScroll(item.to);
                  // Close sidebar on mobile when clicking a navigation item
                  if (isOnMobile) {
                    setOpen();
                  }
                }}
                href={item.to}
                key={item.to}
                className={`${navItemBaseClasses} ${
                  item.to === sideBarScroll ? navItemActiveClasses : ""
                }`}
              >
                <span
                  className={
                    item.to === sideBarScroll
                      ? "bg-gradient-to-r from-[#3B070A] to-[#3A0D12] p-2 rounded-none ms-2 shadow-lg"
                      : "bg-white/5 p-2 rounded-none ms-2 transition-all duration-300"
                  }
                >
                  {item.to === sideBarScroll ? item.logo1 : item.logo2}
                </span>
                <span
                  className={`transition-all duration-200 ${
                    item.to === sideBarScroll
                      ? "text-white font-bold"
                      : "hover:text-white/80"
                  }`}
                >
                  {t(item.titleKey)}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="SWITCHES&BUTTON pb-[3vh]">
          <div className="h-0 border-t border-white/10 mb-4" />

          {/* Language + Theme Row */}
          <div className="px-8 mb-3 flex items-center gap-2">
            {/* Language switcher */}
            {(["fa", "en", "ar"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`flex-1 py-1.5 font-bold transition-all border leading-none ${
                  lang === l
                    ? "bg-[#3B070A]/60 border-[#5A0E12]/60 text-white"
                    : "bg-white/5 border-white/10 text-white/40 hover:text-white/70 hover:bg-white/8"
                }`}
                style={{
                  fontSize: l === "en" ? "0.7rem" : "0.75rem",
                  fontFamily:
                    l === "en" ? "'Inter', 'Segoe UI', sans-serif" : "inherit",
                  letterSpacing: l === "en" ? "0.05em" : "normal",
                  fontWeight: 700,
                }}
              >
                {LANG_LABEL[l]}
              </button>
            ))}

            {/* Divider */}
            <div className="w-px h-5 bg-white/10 mx-1" />

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              title={
                theme === "dark"
                  ? "Switch to light theme"
                  : "Switch to dark theme"
              }
              className="flex items-center justify-center w-9 h-7 bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white/60 hover:text-white"
            >
              {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>

          {/* Download Resume Button */}
          <div className="px-8">
            <a
              href="/youdexsof-fa-cv.pdf"
              download="Yousof-Hashemzade-Cv-Fa.pdf"
              className="DOWNLOADPDF w-full h-12 flex items-center justify-center lg:flex border border-white/10 bg-gradient-to-r from-[#3B070A]/10 to-[#3A0D12]/10 hover:from-[#3B070A]/20 hover:to-[#3A0D12]/20 font-normal text-nowrap text-sm transition-all duration-300 text-white/90 hover:text-white hover:border-white/20 rounded-none shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              {t("nav.downloadCV")}
            </a>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      <div
        onClick={() => setOpen()}
        className="just-for-clicking-outside-to-close-sidebar w-[30vw] sm:w-[50vw] md:w-[70vw] lg:hidden"
      />
    </div>
  );
});

export default SideBar;
