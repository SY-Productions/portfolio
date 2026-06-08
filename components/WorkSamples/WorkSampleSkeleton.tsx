"use client";

import React from "react";

const WorkSampleSkeleton = () => {
  return (
    <section
      id="portfolio"
      className="flex flex-col lg:flex-row-reverse items-center justify-center mt-12 lg:mt-0 section-bg w-full lg:h-screen h-[90vh] gap-x-[5vw]"
    >
      {/* Preview Skeleton */}
      <div className="h-auto lg:h-[60vh] h-[30vh] mt-[10vh] lg:-mt-5 mb-10 flex justify-center lg:ml-[7rem] relative">
        <div className="lg:h-[60vh] h-[30vh] lg:w-[30vw] relative flex items-center justify-center">
          <div className="w-full h-full bg-white/5 animate-pulse flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-t-2 border-l-2 border-[#3A0D12] animate-spin"></div>
          </div>
        </div>
      </div>

      {/* Information & Switcher Skeleton */}
      <div className="INFO&SWITCH">
        {/* Information Skeleton */}
        <div className="INFORMATION flex items-center justify-center lg:justify-normal">
          <div className="ALL font-[ybn] w-[80vw] lg:w-[35vw] lg:mr-[22vw] border border-[#222] backdrop-blur-3xl">
            {/* Tabs Skeleton */}
            <div className="JUSTTABS flex">
              <div className="TAB py-[2.5vh] px-1 w-[50%] font-[ybb] 2xl:text-xl border-b text-white/70 border-b-white/10 bg-transparent">
                <div className="h-5 w-[80%] mx-auto bg-white/10 animate-pulse"></div>
              </div>
              <div className="TAB py-[2.5vh] px-1 w-[50%] font-[ybb] 2xl:text-xl border-b text-white/70 border-b-white/10 bg-[#111]">
                <div className="h-5 w-[80%] mx-auto bg-white/10 animate-pulse"></div>
              </div>
            </div>

            {/* Tab Content Skeleton */}
            <div className="TABCONTENT h-[25vh] lg:h-[30vh] font-[ybb] text-sm bg-[#111] border border-[#222] border-t-0 flex flex-col justify-start px-[5vw] lg:px-[2vw]">
              <div className="py-[2.5vh]">
                <div className="h-7 w-[60%] bg-white/10 animate-pulse"></div>
              </div>
              <div className="font-[ybn] pb-[10vh]">
                <div className="h-4 w-full bg-white/10 animate-pulse mb-3"></div>
                <div className="h-4 w-[90%] bg-white/10 animate-pulse mb-3"></div>
                <div className="h-4 w-[80%] bg-white/10 animate-pulse"></div>
              </div>
            </div>

            {/* More Info Button Skeleton */}
            <div className="absolute bottom-0 flex items-center justify-between px-4 bg-[#151515] w-full h-[5vh] min-h-12 border-t border-[#222]">
              <div className="h-4 w-24 bg-white/10 animate-pulse"></div>
              <div className="h-4 w-4 bg-white/10 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Sample Switcher Skeleton */}
        <div className="float-end my-6 lg:mb-0 mb-10 flex flex-row items-center justify-between w-[80vw] lg:w-[35vw] gap-3">
          {/* Sample index display */}
          <div className="NAME py-6">
            <div className="sample-index w-20 h-15">
              <div className="h-6 w-10 bg-white/10 animate-pulse"></div>
            </div>
          </div>

          {/* Pagination dots */}
          <div className="flex gap-2 overflow-x-auto overflow-y-hidden max-w-[50%] md:max-w-[60%]">
            <div className="flex gap-2 py-1 min-w-max">
              {Array.from({ length: 5 }).map((_, idx) => (
                <span
                  key={idx}
                  className={`h-3 w-3 md:h-4 md:w-4 shrink-0 rounded-full ${
                    idx === 0 ? "bg-white/30" : "bg-[#333]"
                  } animate-pulse`}
                />
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex gap-2">
            <div className="w-[15vw] lg:w-[4vw] h-[7vh] lg:h-[6vh] rounded-none bg-[#111] border border-[#222] flex items-center justify-center">
              <div className="h-5 w-5 bg-white/10 animate-pulse"></div>
            </div>
            <div className="w-[15vw] lg:w-[4vw] h-[7vh] lg:h-[6vh] rounded-none bg-[#111] border border-[#222] flex items-center justify-center">
              <div className="h-5 w-5 bg-white/10 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkSampleSkeleton;
