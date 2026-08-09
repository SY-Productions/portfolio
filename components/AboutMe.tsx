"use client";

import Image from "next/image";
import Link from "next/link";
import { memo, useEffect, useState } from "react";
import { useLang } from "@/app/context/LanguageContext";

// Optimized imports
import prof from "@/public/pic.png";
import github from "@/public/icons/github.svg";
import insta from "@/public/icons/instagram.svg";
import tel from "@/public/icons/telegram.svg";
import linkedin from "@/public/icons/linkedin.svg";
import SkeletonImage from "./SkeletonImage";

// Social media links data structure
const socialLinks = [
  {
    url: "https://www.github.com/YOUSSSOF",
    icon: github,
    alt: "Yousof Hashemzade GitHub Profile | پروفایل گیت‌هاب یوسف هاشم زاده",
    title: "پروژه‌های من رو در گیت‌هاب ببین!",
  },
  {
    url: "https://www.instagram.com/youdexsof",
    icon: insta,
    alt: "Yousof Hashemzade Instagram Profile | پروفایل اینستاگرام یوسف هاشم زاده",
    title: "اینستاگرام من رو دنبال کن!",
  },
  {
    url: "https://www.t.me/YOUDEXSOF",
    icon: tel,
    alt: "Yousof Hashemzade Telegram Account | پروفایل تلگرام یوسف هاشم زاده",
    title: "تلگرام من رو دنبال کن!",
  },
  {
    url: "https://www.linkedin.com/in/yousof-hashemezade",
    icon: linkedin,
    alt: "Yousof Hashemzade LinkedIn Profile | پروفایل لینکدین یوسف هاشم زاده",
    title: "در لینکدین با من ارتباط برقرار کن!",
  },
];

const AboutMe = memo(function AboutMe() {
  const [isVisible, setIsVisible] = useState(false);
  const { t, dir } = useLang();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      id="about-me"
      className="w-full h-auto lg:h-screen relative overflow-hidden pt-[64px] lg:pt-0"
    >
      {/* Enhanced animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/5 to-black/0 backdrop-blur-sm animate-gradient-shift"></div>

      {/* Floating particles for depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
      </div>

      <div className="(PROF)&(NAME&DESC&BUTTONS) flex flex-col lg:flex-row items-center lg:ms-[calc(var(--sidebar-width)+var(--shell-gutter))] lg:me-8 lg:h-screen relative z-10">
        {/* Enhanced profile picture card with advanced glassmorphism */}
        <div
          className={`PROF group p-5 mx-[5vw] lg:mx-0 mt-[5vh] lg:mt-[0rem]
            glass-card-enhanced
            self-center basis-1/3 aspect-square w-[90%]
            overflow-hidden
            transition-all duration-700 ease-out
            ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
        >
          {/* Inner glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#3A0D12]/10 via-transparent to-[#3B070A]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Corner accents */}
          <div className="corner-accent corner-top-left"></div>
          <div className="corner-accent corner-top-right"></div>
          <div className="corner-accent corner-bottom-left"></div>
          <div className="corner-accent corner-bottom-right"></div>

          <SkeletonImage
            src={prof}
            alt="Yousof Hashemzade, Flutter Developer | یوسف هاشم زاده، توسعه دهنده فلاتر"
            title="Yousof Hashemzade - Flutter Developer | یوسف هاشم زاده - توسعه دهنده فلاتر"
            className="aspect-square rounded-none relative z-10 transition-all duration-500 ease-out group-hover:scale-[1.02] active:scale-95 hover:cursor-grab active:cursor-grabbing"
            draggable={false}
            priority
          />
        </div>

        <div className="NAME&DESC&BUTTONS flex flex-col items-center basis-2/3">
          {/* Name section with staggered animation */}
          <div
            className={`NAME py-6 w-[80%] transition-all duration-700 delay-200 ease-out ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <p className="mobile-developer tracking-tight font-extrabold" style={{ fontSize: "clamp(1.6rem, 4vw, 3rem)" }}>
              MOBILE <br />
              DEVELOPER
            </p>
            <h1 className="developer-name relative">
              یوسف هاشم زاده
              {/* Enhanced animated accent line */}
              <span className="accent-line"></span>
            </h1>
          </div>

          {/* Description with fade-in animation */}
          <p
            className={`DESC font-[ybn] text-white/60 text-sm lg:text-base 2xl:text-xl leading-7 w-[80%] mb-6 text-wrap transition-all duration-700 delay-300 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            {t("aboutMe.description")}
          </p>

          {/* Buttons with staggered hover effects */}
          <div
            className={`BUTTONS flex items-center gap-3 w-[80%] mb-8 transition-all duration-700 delay-400 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            {/* Simple enhanced CTA button */}
            <a
              href="#call-me"
              className="flex items-center text-white justify-center h-[6vh] lg:h-[8vh] px-[1.5vw] min-w-[22vw] sm:min-w-0 bg-gradient-to-r from-[#3B070A]/20 to-[#5A0E12]/20 hover:from-[#3B070A]/30 hover:to-[#5A0E12]/30 rounded-none font-[ybn] text-nowrap text-sm 2xl:text-base transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(140,158,255,0.2)] border border-white/10 hover:border-white/20 backdrop-blur-md"
            >
              {t("aboutMe.contactBtn")}
            </a>

            {/* Enhanced social media buttons */}
            {socialLinks.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-button group relative"
                style={{ animationDelay: `${(index + 5) * 100}ms` }}
              >
                {/* Ripple effect on hover */}
                <span className="ripple-effect"></span>

                <Image
                  className="w-[45%] relative z-10 transition-all duration-300 filter brightness-0 invert opacity-80 group-hover:opacity-100 group-hover:scale-110"
                  src={link.icon}
                  alt={link.alt}
                  title={link.title}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default AboutMe;
