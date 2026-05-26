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
        const response = await fetch(`${API_BASE_URL}/worksamples`, {
          cache: "no-store",
        });
        if (!response.ok) return;
        const workSamples = await response.json();
        if (Array.isArray(workSamples)) setData(workSamples);
      } catch (error) {
        console.error("Error fetching work samples:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const processedData = useMemo(() => {
    return data.map((sample) => ({
      ...sample,
      isWeb: sample.isWeb === "1",
    }));
  }, [data]);

  if (loading) return <WorkSampleSkeleton />;
  if (processedData.length === 0) return null;

  return (
    <WorkSampleProvider data={processedData}>
      <section
        id="portfolio"
        className={`flex flex-col lg:flex-row-reverse items-center justify-center mt-12 lg:mt-0 ${bgSvg} bg-no-repeat bg-cover w-full lg:h-screen h-auto min-h-[90vh] gap-x-[5vw] pb-8 lg:pb-0`}
      >
        <Preview />
        <div className="INFO&SWITCH">
          <Information />
          <SampleSwitcher />
        </div>
      </section>
    </WorkSampleProvider>
  );
}
