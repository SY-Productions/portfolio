"use client";

import React from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useWorkSample } from "./WorkSampleContext";
import Drawer from "./Drawer/Drawer";
import { useLang } from "@/app/context/LanguageContext";
import { useTheme } from "@/app/context/ThemeContext";

export default function Information() {
  const {
    isWebFrame,
    setIsWebFrame,
    getCurrentSample,
    setIsDrawerOpen,
    setCurrentPicIndex,
    isDrawerOpen,
  } = useWorkSample();

  const currentSample = getCurrentSample();
  const { t, lang, dir } = useLang();
  const { theme } = useTheme();
  const isLight = theme === "light";

  const handleOpenDrawer = () => {
    setCurrentPicIndex(0);
    setIsDrawerOpen(true);
  };

  const getTitle = () => {
    if (!currentSample) return "";
    if (lang === "en" && currentSample.enTitle) return currentSample.enTitle;
    if (lang === "ar" && currentSample.arTitle) return currentSample.arTitle;
    return currentSample.faTitle ?? "";
  };

  const getDesc = () => {
    if (!currentSample) return "";
    const raw =
      lang === "en" && currentSample.enDescription
        ? currentSample.enDescription
        : lang === "ar" && currentSample.arDescription
        ? currentSample.arDescription
        : currentSample.faDescription;
    return raw.includes("%g%") ? raw.split("%g%")[0] : raw;
  };

  if (!currentSample) return null;

  const wrapperClass = isLight
    ? "font-[ybn] w-[88vw] lg:w-[38vw] lg:ms-[22vw] relative overflow-hidden border border-gray-200/60 bg-white/80 backdrop-blur-xl shadow-lg"
    : "font-[ybn] w-[88vw] lg:w-[38vw] lg:ms-[22vw] relative overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-xl";

  return (
    <div className="INFORMATION flex items-center justify-center lg:justify-normal">
      <div className={wrapperClass}>
        {/* Tab selector — pill segmented control */}
        <div className={`flex p-1.5 m-4 gap-1 rounded-none ${isLight ? "bg-gray-100 border border-gray-200" : "bg-black/30 border border-white/8"}`}>
          <button
            onClick={() => setIsWebFrame(false)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium transition-all duration-200 ${
              !isWebFrame
                ? isLight
                  ? "bg-white shadow-sm text-gray-800 border border-gray-200"
                  : "bg-gradient-to-r from-[#3B070A]/80 to-[#5A0E12]/80 text-white shadow-sm border border-[#5A0E12]/40"
                : isLight
                  ? "text-gray-400 hover:text-gray-600"
                  : "text-white/35 hover:text-white/60"
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <rect x="5" y="2" width="14" height="20" rx="3" ry="3" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <circle cx="12" cy="19" r="1" fill="currentColor"/>
              <rect x="9" y="1" width="6" height="1.5" rx="0.75" fill="currentColor"/>
            </svg>
            <span>{t("portfolio.mobileApps")}</span>
          </button>

          <button
            onClick={() => setIsWebFrame(true)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium transition-all duration-200 ${
              isWebFrame
                ? isLight
                  ? "bg-white shadow-sm text-gray-800 border border-gray-200"
                  : "bg-gradient-to-r from-[#3B070A]/80 to-[#5A0E12]/80 text-white shadow-sm border border-[#5A0E12]/40"
                : isLight
                  ? "text-gray-400 hover:text-gray-600"
                  : "text-white/35 hover:text-white/60"
            }`}
          >
            <svg width="15" height="12" viewBox="0 0 24 19" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="1" y="1" width="22" height="14" rx="2"/>
              <path d="M8 18h8M12 15v3"/>
            </svg>
            <span>{t("portfolio.webApps")}</span>
          </button>
        </div>

        {/* Divider */}
        <div className={`mx-4 h-px ${isLight ? "bg-gray-100" : "bg-white/5"}`} />

        {/* Content */}
        <div className="min-h-[20vh] lg:min-h-[24vh] flex flex-col justify-start px-5 lg:px-6 pb-14">
          <div className={`text-base lg:text-lg 2xl:text-xl py-4 font-[ybb] ${isLight ? "text-gray-800" : "text-white/90"}`}>
            {getTitle()}
          </div>
          <div className={`font-[ybn] text-sm 2xl:text-base leading-7 ${isLight ? "text-gray-500" : "text-white/60"}`}>
            {getDesc()}
          </div>
        </div>

        {/* More details button */}
        <button
          onClick={handleOpenDrawer}
          className={`absolute bottom-0 w-full flex items-center justify-between px-5 py-3 min-h-11 text-sm font-[ybn] transition-colors ${
            isLight
              ? "border-t border-gray-200 bg-gray-50/80 text-gray-600 hover:bg-gray-100"
              : "border-t border-white/10 bg-black/20 text-white/70 hover:bg-white/5"
          }`}
        >
          {t("portfolio.moreInfo")}
          {dir === "rtl" ? (
            <ArrowBackIosNewIcon sx={{ fontSize: 12 }} />
          ) : (
            <ArrowForwardIosIcon sx={{ fontSize: 12 }} />
          )}
        </button>
      </div>

      <Drawer />
    </div>
  );
}
