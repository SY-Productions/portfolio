"use client";

import React, { useMemo, useEffect, useState } from "react";
import Preview from "./Preview";
import Information from "./Information";
import SampleSwitcher from "./SampleSwitcher";
import { WorkSampleProvider } from "./WorkSampleContext";
import { API_BASE_URL } from "@/app/config";
import WorkSampleSkeleton from "./WorkSampleSkeleton";
import { useTheme } from "@/app/context/ThemeContext";
import DeepLinkHandler from "./DeepLinkHandler";

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
  client?: string;
};

type WorkSamplesProps = {
  /** Server-rendered rows, so the section has real content without JavaScript. */
  initialSamples?: WorkSample[];
};

export default function WorkSamples({ initialSamples = [] }: WorkSamplesProps) {
  const [data, setData] = useState<WorkSample[]>(initialSamples);
  const [loading, setLoading] = useState(initialSamples.length === 0);
  const { theme } = useTheme();

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
    () => data
      .filter((s) => {
        if (s.link.includes("github.com")) return false;
        if (!s.customLinks) return true;
        try {
          const parsed = JSON.parse(s.customLinks);
          if (Array.isArray(parsed)) {
            return !parsed.some(
              (l) => l.url?.includes("github.com") || l.link?.includes("github.com")
            );
          }
        } catch {}
        return true;
      })
      .map((s) => ({ ...s, isWeb: s.isWeb === "1" || s.isWeb === "true" })),
    [data]
  );

  if (loading) return <WorkSampleSkeleton />;
  if (processedData.length === 0) return null;

  return (
    <WorkSampleProvider data={processedData}>
      <DeepLinkHandler />
      <section
        id="portfolio"
        className={`flex flex-col lg:flex-row items-center justify-center mt-8 lg:mt-0
          section-bg bg-no-repeat bg-cover w-full
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
