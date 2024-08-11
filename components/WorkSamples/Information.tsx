"use client";
import { useZState } from "@/app/states";
import React, { useEffect } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { WorkSample } from "@prisma/client";

export default function Information({ data }: { data: WorkSample[] }) {
  const {
    sampleWebIndex,
    sampleMobIndex,
    setMobSamples,
    setWebSamples,
    setIsWebFrame,
  } = useZState();
  const mobile = data.filter((sample) => !sample.isWeb);
  const web = data.filter((sample) => sample.isWeb);
  useEffect(() => {
    setWebSamples(web.length - 1);
    setMobSamples(mobile.length - 1);
  }, [data]);
  const tabClasses =
    "py-4 lg:py-6 px-1 w-[50%] font-[ybb] border-b text-white/70 border-b-white/10";
  const tabContentClasses =
    "h-48 font-[ybb] text-sm bg-white/5 flex flex-col justify-start px-4";
  return (
    <div className="flex items-center justify-center lg:justify-normal">
      <Tabs
        className="ALL font-[ybn] w-[80vw] lg:w-[35vw] lg:mr-[22vw] border border-white/10"
        variant="unstyled"
      >
        <TabList className="JUSTTABS">
          <Tab
            className={tabClasses}
            _selected={{
              bg: "rgb(255 255 255 / 0.05)",
              borderBottomWidth: 0,
              color: "rgb(255 255 255 / 0.8)",
            }}
            onClick={() => setIsWebFrame(true)}
            defaultChecked
          >
            اپلیکیشن های وب
          </Tab>
          <Tab
            className={tabClasses}
            _selected={{
              bg: "rgb(255 255 255 / 0.05)",
              borderBottomWidth: 0,
              color: "rgb(255 255 255 / 0.8)",
            }}
            onClick={() => setIsWebFrame(false)}
          >
            اپلیکیشن های موبایل
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div className={tabContentClasses}>
              <div className="text-lg py-5 text-white/80">
                {web[sampleWebIndex].faTitle}
              </div>
              <div className="font-[ybn] text-white/70">
                {web[sampleWebIndex].faDescription}
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className={tabContentClasses}>
              <div className="text-lg py-5 text-white/80">
                {mobile[sampleMobIndex].faTitle}
              </div>
              <div className="font-[ybn] text-white/70">
                {mobile[sampleMobIndex].faDescription}
              </div>
            </div>
          </TabPanel>
        </TabPanels>
        <button className="absolute bottom-0 flex items-center justify-between px-4 hover:bg-b/70 bg-b/60 text-white w-full h-12">
          اطلاعات بیشتر <ArrowBackIosNewIcon sx={{ fontSize: 12 }} />
        </button>
      </Tabs>
    </div>
  );
}
