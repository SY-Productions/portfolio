import React from "react";
import Preview from "./Preview";
import Information from "./Information";
import SampleSwitcher from "./SampleSwitcher";
import db from '@/public/db.json';

export default async function WorkSamples() {
  const getData = db.WorkSmaples.map((sample) => ({
    ...sample,
    isWeb: sample.isWeb === "1",
  }));

  return (
    <>
      {getData.length === 0 ? (
        <div />
      ) : (
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
      )}
    </>
  );
}
