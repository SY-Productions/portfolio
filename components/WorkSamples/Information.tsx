"use client";

import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useWorkSample } from "./WorkSampleContext";
import Drawer from "./Drawer/Drawer";
import { useLang } from "@/app/context/LanguageContext";

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

  // Common CSS classes
  const tabClasses =
    "TAB py-[2.5vh] px-1 w-[50%] font-[ybb] 2xl:text-xl border-b text-white/70 border-b-white/10";
  const tabContentClasses =
    "TABCONTENT min-h-[25vh] lg:min-h-[30vh] font-[ybb] text-sm bg-[#111] border border-[#222] border-t-0 flex flex-col justify-start px-[5vw] lg:px-[2vw]";

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
    if (lang === "ar" && (currentSample as any).arTitle)
      return (currentSample as any).arTitle;
    return currentSample.faTitle ?? "";
  };

  const getDesc = () => {
    if (!currentSample) return "";
    if (lang === "en" && currentSample.enDescription)
      return getDescription(currentSample.enDescription);
    if (lang === "ar" && (currentSample as any).arDescription)
      return getDescription((currentSample as any).arDescription);
    return getDescription(currentSample.faDescription);
  };

  if (!currentSample) return null;

  return (
    <div className="INFORMATION flex items-center justify-center lg:justify-normal">
      <Tabs
        className="ALL font-[ybn] w-[80vw] lg:w-[35vw] lg:ms-[22vw] border border-[#222] backdrop-blur-3xl relative"
        variant="unstyled"
        index={isWebFrame ? 1 : 0}
        onChange={(index) => setIsWebFrame(index === 1)}
      >
        <TabList className="JUSTTABS">
          <Tab
            className={tabClasses}
            _selected={{
              bg: "#111",
              borderBottomWidth: 0,
              color: "rgb(255 255 255 / 0.8)",
            }}
          >
            {t("portfolio.mobileApps")}
          </Tab>
          <Tab
            className={tabClasses}
            _selected={{
              bg: "#111",
              borderBottomWidth: 0,
              color: "rgb(255 255 255 / 0.8)",
            }}
          >
            {t("portfolio.webApps")}
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel padding={0}>
            <div className={tabContentClasses}>
              <div className="text-lg 2xl:text-2xl py-[2.5vh] text-white/80">
                {getTitle()}
              </div>
              <div className="font-[ybn] 2xl:text-lg text-white/70 pb-[10vh]">
                {getDesc()}
              </div>
            </div>
          </TabPanel>
          <TabPanel padding={0}>
            <div className={tabContentClasses}>
              <div className="text-lg 2xl:text-2xl py-[2.5vh] text-white/80">
                {getTitle()}
              </div>
              <div className="font-[ybn] 2xl:text-lg text-white/70 pb-[10vh]">
                {getDesc()}
              </div>
            </div>
          </TabPanel>
        </TabPanels>
        <button
          onClick={handleOpeningDrawer}
          className="absolute bottom-0 flex items-center justify-between px-4 hover:bg-[#1A1A1A] bg-[#151515] text-white w-full h-[5vh] min-h-12 border-t border-[#222]"
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
