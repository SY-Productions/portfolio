"use client";

import React, { useMemo, useEffect, useState } from "react";
import Preview from "./Preview";
import Information from "./Information";
import SampleSwitcher from "./SampleSwitcher";
import { WorkSampleProvider } from "./WorkSampleContext";
import { API_BASE_URL } from "@/app/config";
import WorkSampleSkeleton from "./WorkSampleSkeleton";
import { useTheme } from "@/app/context/ThemeContext";

export type WorkSample = {
  id: number;
  isWeb: string;
  faTitle: string;
  enTitle: string;
  arTitle?: string;
  faDescription: string;
  enDescription: string;
  arDescription?: string;
  pictures: string;
  link: string;
  technologys: string;
  faStartDate: string;
  enStartDate: string;
  arStartDate?: string;
  faEndDate: string;
  enEndDate: string;
  arEndDate?: string;
  customLinks: string;
};

export default function WorkSamples() {
  const [data, setData] = useState<WorkSample[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  const bgSvg =
    theme === "light"
      ? "bg-[url('/vectors/sec1-bglight.svg')]"
      : "bg-[url('/vectors/sec1-bgdark.svg')]";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/worksamples`, { cache: "no-store" });
        if (!response.ok) return;
        const workSamples = await response.json();
        if (Array.isArray(workSamples)) setData(workSamples);
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const processedData = useMemo(
    () => data.map((s) => ({ ...s, isWeb: s.isWeb === "1" })),
    [data]
  );

  if (loading) return <WorkSampleSkeleton />;
  if (processedData.length === 0) return null;

  return (
    <WorkSampleProvider data={processedData}>
      <section
        id="portfolio"
        className={`flex flex-col lg:flex-row items-center justify-center mt-8 lg:mt-0
          ${bgSvg} bg-no-repeat bg-cover w-full
          min-h-[90vh] lg:h-screen
          gap-x-[4vw] gap-y-4 pb-10 lg:pb-0`}
      >
        {/* Preview — shown above info on mobile, beside it on desktop */}
        <div className="lg:order-2 flex items-center justify-center w-full lg:w-auto lg:flex-1">
          <Preview />
        </div>
        <div className="lg:order-1 INFO&SWITCH flex flex-col items-center lg:items-start">
          <Information />
          <SampleSwitcher />
        </div>
      </section>
    </WorkSampleProvider>
  );
}
