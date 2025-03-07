"use client";

import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useWorkSample } from "./WorkSampleContext";
import Drawer from "./Drawer/Drawer";

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

  // Common CSS classes
  const tabClasses =
    "TAB py-[2.5vh] px-1 w-[50%] font-[ybb] 2xl:text-xl border-b text-white/70 border-b-white/10";
  const tabContentClasses =
    "TABCONTENT h-[35vh] lg:h-[30vh] min-h-[30vh] font-[ybb] text-sm bg-[#111] border border-[#222] border-t-0 flex flex-col justify-start px-[5vw] lg:px-[2vw]";

  // Handle drawer opening
  const handleOpeningDrawer = () => {
    setCurrentPicIndex(0);
    setIsDrawerOpen(true);
  };

  // Process description to handle special formatting
  const getDescription = (description: string) => {
    return description.includes("%g%")
      ? description.split("%g%")[0]
      : description;
  };

  if (!currentSample) return null;

  return (
    <div className="INFORMATION flex items-center justify-center lg:justify-normal">
      <Tabs
        className="ALL font-[ybn] w-[80vw] lg:w-[35vw] lg:mr-[22vw] border border-[#222] backdrop-blur-3xl"
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
            اپلیکیشن های موبایل
          </Tab>
          <Tab
            className={tabClasses}
            _selected={{
              bg: "#111",
              borderBottomWidth: 0,
              color: "rgb(255 255 255 / 0.8)",
            }}
          >
            اپلیکیشن های وب
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel padding={0}>
            <div className={tabContentClasses}>
              <div className="text-lg 2xl:text-2xl py-[2.5vh] text-white/80">
                {currentSample?.faTitle ?? ""}
              </div>
              <div className="font-[ybn] 2xl:text-lg text-white/70 pb-[10vh]">
                {getDescription(currentSample.faDescription)}
              </div>
            </div>
          </TabPanel>
          <TabPanel padding={0}>
            <div className={tabContentClasses}>
              <div className="text-lg 2xl:text-2xl py-[2.5vh] text-white/80">
                {currentSample?.faTitle ?? ""}
              </div>
              <div className="font-[ybn] 2xl:text-lg text-white/70 pb-[10vh]">
                {getDescription(currentSample.faDescription)}
              </div>
            </div>
          </TabPanel>
        </TabPanels>
        <button
          onClick={handleOpeningDrawer}
          className="absolute bottom-0 flex items-center justify-between px-4 hover:bg-[#1A1A1A] bg-[#151515] text-white w-full h-[5vh] min-h-12 border-t border-[#222]"
        >
          اطلاعات بیشتر <ArrowBackIosNewIcon sx={{ fontSize: 12 }} />
        </button>
      </Tabs>

      <Drawer />
    </div>
  );
}
