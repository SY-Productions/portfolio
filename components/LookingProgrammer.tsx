"use client";
import React, { memo } from "react";
import { useLang } from "@/app/context/LanguageContext";

// Memoized for better performance
const LookingProgrammer = memo(function LookingProgrammer() {
  const { t } = useLang();

  return (
    <div className="relative font-[ybb] w-full text-white h-auto min-h-[15vh] flex flex-col md:flex-row items-center justify-between py-[6vh] gap-8 overflow-hidden">
      {/* Improved gradient background with sharper look */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/40 backdrop-blur-2xl border-y border-white/10"></div>

      {/* Accent line similar to AboutMe component */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#3B070A]/50 to-[#3A0D12]/50"></div>
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#3A0D12]/50 to-[#3B070A]/50"></div>

      {/* Animated subtle shapes in background - more defined */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#3A0D12]/15 rounded-full blur-2xl animate-pulse"></div>
      <div
        className="absolute top-10 right-1/4 w-32 h-32 bg-[#3B070A]/15 rounded-full blur-2xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-0 right-20 w-24 h-24 bg-[#3A0D12]/15 rounded-full blur-2xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      {/* Content with higher contrast and modern styling */}
      <div className="font-[ybn] text-2xl 2xl:text-3xl md:ms-[5rem] lg:ms-[22vw] relative z-10 flex items-center">
        <span className="relative text-white drop-shadow-md">
          {t("looking.title")}
        </span>
      </div>

      <a
        href="#call-me"
        className="font-[ybb] w-[60vw] md:w-auto md:min-w-[180px] lg:min-w-0 lg:w-[15vw] h-[6vh] md:me-[10vw]
                  flex items-center justify-center
                  bg-gradient-to-r from-[#3B070A]/20 to-[#3A0D12]/20
                  hover:from-[#3B070A]/30 hover:to-[#3A0D12]/30
                  border border-white/10 hover:border-white/20
                  text-white text-base 2xl:text-lg
                  transition-all duration-300
                  hover:-translate-y-1
                  rounded-none
                  relative z-10 backdrop-blur-md
                  before:absolute before:content-[''] before:bottom-0 before:left-0 before:w-0 before:h-0
                  hover:before:w-full hover:before:h-full before:transition-all before:duration-500
                  before:border-l before:border-b before:border-[#3A0D12]/50
                  hover:after:w-full hover:after:h-full after:absolute after:content-[''] after:top-0
                  after:right-0 after:w-0 after:h-0 after:transition-all after:duration-500
                  after:border-t after:border-r after:border-[#3B070A]/50"
      >
        {t("looking.cta")}
      </a>
    </div>
  );
});

export default LookingProgrammer;
