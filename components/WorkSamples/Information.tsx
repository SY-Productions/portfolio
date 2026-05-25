"use client";

import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
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

  // Common CSS classes — theme-aware
  const tabClasses = isLight
    ? "TAB py-[2.5vh] px-1 w-[50%] font-[ybb] 2xl:text-xl border-b text-gray-500 border-b-gray-200 bg-gray-50"
    : "TAB py-[2.5vh] px-1 w-[50%] font-[ybb] 2xl:text-xl border-b text-white/70 border-b-white/10";

  const tabSelectedStyle = isLight
    ? { bg: "#fff", borderBottomWidth: 0, color: "#1a0505" }
    : { bg: "#111", borderBottomWidth: 0, color: "rgb(255 255 255 / 0.8)" };

  const tabContentClasses = isLight
    ? "TABCONTENT min-h-[25vh] lg:min-h-[30vh] font-[ybb] text-sm bg-white border border-gray-200 border-t-0 flex flex-col justify-start px-[5vw] lg:px-[2vw]"
    : "TABCONTENT min-h-[25vh] lg:min-h-[30vh] font-[ybb] text-sm bg-[#111] border border-[#222] border-t-0 flex flex-col justify-start px-[5vw] lg:px-[2vw]";

  const titleTextClass = isLight ? "text-lg 2xl:text-2xl py-[2.5vh] text-gray-800" : "text-lg 2xl:text-2xl py-[2.5vh] text-white/80";
  const descTextClass = isLight ? "font-[ybn] 2xl:text-lg text-gray-500 pb-[10vh]" : "font-[ybn] 2xl:text-lg text-white/70 pb-[10vh]";

  const tabsContainerClass = isLight
    ? "ALL font-[ybn] w-[80vw] lg:w-[35vw] lg:ms-[22vw] border border-gray-200 backdrop-blur-3xl relative bg-gray-50"
    : "ALL font-[ybn] w-[80vw] lg:w-[35vw] lg:ms-[22vw] border border-[#222] backdrop-blur-3xl relative";

  const drawerBtnClass = isLight
    ? "absolute bottom-0 flex items-center justify-between px-4 hover:bg-gray-100 bg-gray-50 text-gray-700 w-full h-[5vh] min-h-12 border-t border-gray-200"
    : "absolute bottom-0 flex items-center justify-between px-4 hover:bg-[#1A1A1A] bg-[#151515] text-white w-full h-[5vh] min-h-12 border-t border-[#222]";

  const handleOpeningDrawer = () => {
    setCurrentPicIndex(0);
    setIsDrawerOpen(true);
  };

  const getDescription = (description: string) => {
    return description.includes("%g%")
      ? description.split("%g%")[0]
      : description;
  };

  const getTitle = () => {
    if (!currentSample) return "";
    if (lang === "en" && currentSample.enTitle) return currentSample.enTitle;
    if (lang === "ar" && currentSample.arTitle) return currentSample.arTitle;
    return currentSample.faTitle ?? "";
  };

  const getDesc = () => {
    if (!currentSample) return "";
    if (lang === "en" && currentSample.enDescription)
      return getDescription(currentSample.enDescription);
    if (lang === "ar" && currentSample.arDescription)
      return getDescription(currentSample.arDescription);
    return getDescription(currentSample.faDescription);
  };

  if (!currentSample) return null;

  return (
    <div className="INFORMATION flex items-center justify-center lg:justify-normal">
      <Tabs
        className={tabsContainerClass}
        variant="unstyled"
        index={isWebFrame ? 1 : 0}
        onChange={(index) => setIsWebFrame(index === 1)}
      >
        <TabList className="JUSTTABS">
          <Tab
            className={tabClasses}
            _selected={tabSelectedStyle}
          >
            {t("portfolio.mobileApps")}
          </Tab>
          <Tab
            className={tabClasses}
            _selected={tabSelectedStyle}
          >
            {t("portfolio.webApps")}
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel padding={0}>
            <div className={tabContentClasses}>
              <div className={titleTextClass}>
                {getTitle()}
              </div>
              <div className={descTextClass}>
                {getDesc()}
              </div>
            </div>
          </TabPanel>
          <TabPanel padding={0}>
            <div className={tabContentClasses}>
              <div className={titleTextClass}>
                {getTitle()}
              </div>
              <div className={descTextClass}>
                {getDesc()}
              </div>
            </div>
          </TabPanel>
        </TabPanels>
        <button
          onClick={handleOpeningDrawer}
          className={drawerBtnClass}
        >
          {t("portfolio.moreInfo")}{" "}
          {dir === "rtl" ? (
            <ArrowBackIosNewIcon sx={{ fontSize: 12 }} />
          ) : (
            <ArrowForwardIosIcon sx={{ fontSize: 12 }} />
          )}
        </button>
      </Tabs>

      <Drawer />
    </div>
  );
}
