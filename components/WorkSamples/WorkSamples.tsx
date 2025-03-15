"use client";

import React, { useMemo } from "react";
import Preview from "./Preview";
import Information from "./Information";
import SampleSwitcher from "./SampleSwitcher";
import { WorkSampleProvider } from "./WorkSampleContext";
import db from '@/public/db.json';

export default function WorkSamples() {
  // Process data once with useMemo for better performance
  const processedData = useMemo(() => {
    return db.WorkSmaples.map((sample) => ({
      ...sample,
      isWeb: sample.isWeb === "1",
    }));
  }, []);

  if (processedData.length === 0) return null;

  return (
    <WorkSampleProvider data={processedData}>
      <section
        id="portfolio"
        className="flex flex-col lg:flex-row-reverse items-center justify-center mt-12 lg:mt-0 bg-[url('/vectors/sec1-bgdark.svg')] bg-no-repeat bg-cover w-full lg:h-screen h-[90vh] gap-x-[5vw]"
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
