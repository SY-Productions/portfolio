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

// Import logo
import logo from "../public/vectors/logo.svg";

// Navigation items data structure
const navigationItems = [
  {
    title: "درباره من",
    logo1: <Hashtag size={26} color="white" variant="Bold" />,
    logo2: <Hashtag size={25} />,
    to: "#about-me",
  },
  {
    title: "مهارت ها",
    logo1: <Box size={26} color="white" variant="Bold" />,
    logo2: <Box size={25} />,
    to: "#skills",
  },
  {
    title: "نمونه کارها",
    logo1: <Code size={26} color="white" variant="Bold" />,
    logo2: <Code size={25} />,
    to: "#portfolio",
  },
  {
    title: "سوابق تحصیلی",
    logo1: <Clipboard size={26} color="white" variant="Bold" />,
    logo2: <Clipboard size={25} />,
    to: "#education",
  },
  {
    title: "سوابق کاری",
    logo1: <Archive size={26} color="white" variant="Bold" />,
    logo2: <Archive size={25} />,
    to: "#work",
  },
  {
    title: "رویدادها",
    logo1: <Cup size={26} color="white" variant="Bold" />,
    logo2: <Cup size={25} />,
    to: "#events",
  },
  {
    title: "تماس با من",
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

  const observerRef = useRef<IntersectionObserver | null>(null);

  // Classes for sidebar container
  const sideBarFullClasses =
    "z-50 w-[100vw] lg:w-[20vw] flex flex-row h-screen fixed transition-all duration-300 ";

  // Classes for navigation items
  const navItemBaseClasses =
    "flex flex-row justify-start items-center gap-3 py-2 my-[1.5vh] rounded-none cursor-pointer hover:bg-white/5 transition-all duration-200 border-r-2 border-transparent";

  const navItemActiveClasses =
    "border-white/10 border border-l-0 border-r-2 border-r-[#7B2CBF] bg-black/40 shadow-sm py-[5%]";

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
      }
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
            : sideBarFullClasses + "translate-x-[100vw]"
          : sideBarFullClasses
      }
    >
      <aside className="font-[ybn] border-l border-white/10 h-screen bg-black/20 w-[70vw] sm:w-[50vw] md:w-[30vw] lg:w-[20vw] backdrop-blur-3xl flex flex-col justify-between shadow-2xl">
        {/* Mobile spacing for navbar - only visible on mobile */}
        <div className="lg:hidden h-[60px]"></div>

        <div className="LOGO&OPTIONS text-base text-white/50 mr-8 overflow-y-auto flex-grow">
          {/* Logo container with subtle glow */}
          <div className="relative hidden lg:flex items-center justify-start w-full my-[3vh]">
            <Image
              className="w-[30%] h-auto transition-all duration-300 hover:opacity-100 opacity-90"
              src={logo}
              alt="Logo of Yousof Hashemzade, Flutter Developer | لوگوی یوسف هاشم زاده، توسعه دهنده فلاتر"
            />
            {/* Subtle glow behind logo */}
            <div className="absolute -z-10 w-[30%] h-full bg-[#7B2CBF]/5 filter blur-xl"></div>
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
                key={item.title}
                className={`${navItemBaseClasses} ${
                  item.to === sideBarScroll ? navItemActiveClasses : ""
                }`}
              >
                <span
                  className={
                    item.to === sideBarScroll
                      ? "bg-gradient-to-r from-[#7B2CBF] to-[#8C9EFF] p-2 rounded-none mr-2 shadow-lg"
                      : "bg-white/5 p-2 rounded-none mr-2 transition-all duration-300"
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
                  {item.title}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="SWITCHES&BUTTON pb-[3vh]">
          <div className="h-0 border-t border-white/10 mb-6" />

          {/* Download Resume Button */}
          <div className="px-8">
            <a
              href="/youdexsof-fa-cv.pdf"
              download="Yousof-Hashemzade-Cv-Fa.pdf"
              className="DOWNLOADPDF w-full h-12 flex items-center justify-center lg:flex border border-white/10 bg-gradient-to-r from-[#7B2CBF]/10 to-[#8C9EFF]/10 hover:from-[#7B2CBF]/20 hover:to-[#8C9EFF]/20 font-normal text-nowrap text-sm transition-all duration-300 text-white/90 hover:text-white hover:border-white/20 rounded-none shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              دانلود رزومه بصورت PDF
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
