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

  const containerClass = isLight
    ? "font-[ybn] w-[88vw] lg:w-[38vw] lg:ms-[calc(var(--sidebar-width)+var(--shell-gutter))] glass-card-enhanced border border-gray-200 relative"
    : "font-[ybn] w-[88vw] lg:w-[38vw] lg:ms-[calc(var(--sidebar-width)+var(--shell-gutter))] glass-card-enhanced relative";

  const titleClass = isLight
    ? "text-base lg:text-lg 2xl:text-xl py-4 text-gray-800 font-[ybb]"
    : "text-base lg:text-lg 2xl:text-xl py-4 text-white/90 font-[ybb]";

  const descClass = isLight
    ? "font-[ybn] text-sm 2xl:text-base text-gray-500 pb-14 leading-7"
    : "font-[ybn] text-sm 2xl:text-base text-white/60 pb-14 leading-7";

  const contentClass = "min-h-[20vh] lg:min-h-[24vh] flex flex-col justify-start px-5 lg:px-6";

  const drawerBtnClass = isLight
    ? "absolute bottom-0 w-full flex items-center justify-between px-5 py-3 min-h-11 border-t border-gray-200 bg-gray-50/80 text-gray-600 hover:bg-gray-100 transition-colors text-sm font-[ybn]"
    : "absolute bottom-0 w-full flex items-center justify-between px-5 py-3 min-h-11 border-t border-white/10 bg-black/20 text-white/70 hover:bg-white/5 transition-colors text-sm font-[ybn]";

  return (
    <div className="INFORMATION flex items-center justify-center lg:justify-normal">
      <div className={containerClass}>
        {/* Original custom tab bar */}
        <div className="custom-tab-bar">
          <button
            className={`custom-tab${!isWebFrame ? " active" : ""}`}
            onClick={() => setIsWebFrame(false)}
          >
            {t("portfolio.mobileApps")}
          </button>
          <button
            className={`custom-tab${isWebFrame ? " active" : ""}`}
            onClick={() => setIsWebFrame(true)}
          >
            {t("portfolio.webApps")}
          </button>
        </div>

        {/* Tab content */}
        <div className={contentClass}>
          <div className={titleClass}>{getTitle()}</div>
          <div className={descClass}>{getDesc()}</div>
        </div>

        {/* More details button */}
        <button onClick={handleOpenDrawer} className={drawerBtnClass}>
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
