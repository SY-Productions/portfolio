import React from "react";
import Preview from "./Preview";
import Information from "./Information";
import { WorkSample } from "@prisma/client";
import SampleSwitcher from "./SampleSwitcher";
import data from "../data";

export default async function WorkSamples() {
  const getData: WorkSample[] = await data();
  return (
    <div
      id="portfolio"
      className="flex flex-col lg:flex-row-reverse items-center justify-center mt-12 lg:mt-0 bg-[url('/vectors/sec1-bgdark.svg')] bg-no-repeat bg-cover w-full h-auto lg:h-screen gap-x-[5vw]"
    >
      <Preview data={getData} />
      <div className="INFO&SWITCH">
        <Information data={getData} />
        <SampleSwitcher />
      </div>
    </div>
  );
}
