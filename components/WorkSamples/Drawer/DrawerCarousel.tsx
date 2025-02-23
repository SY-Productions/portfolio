"use client";
import Image from "next/image";
import React from "react";
import PicSrcArray from "../PicSrcArray";
import { useZState } from "@/app/states";

export default function DrawerCarousel({ data }: { data: WorkSample[] }) {
  const picSrc = PicSrcArray({ data });
  const {
    samplePicIndex,
    increaseSamplePicIndex,
    decreaseSamplePicIndex,
    isWebFrame,
  } = useZState();

  const buttonClasses =
    "btn absolute h-[100%] lg:btn-square lg:h-[7vh] lg:w-[7vh] lg:mx-6 lg:rounded-none bg-white/5 border-0 m-0 w-[7vw] rounded-none lg:text-xl 2xl:text-2xl";

  return (
    <div className="relative w-full h-auto flex flex-col items-center bg-b/30 rounded-t-[2rem] lg:rounded-t-[5rem]">
      <div className="relative w-full flex flex-row items-center justify-between">
        <button
          onClick={() => {
            if (samplePicIndex === 0) return;
            decreaseSamplePicIndex();
          }}
          className={`${buttonClasses} text-white rounded-tr-[2rem] right-0`}
        >
          ❮
        </button>

        <Image
          width={500}
          height={500}
          src={picSrc.pics[samplePicIndex] ?? ""}
          unoptimized
          className={`${
            isWebFrame ? "w-[75%] lg:w-[50%]" : "w-[60%] lg:w-auto lg:h-[65vh]"
          } my-[6vh] h-auto mx-auto`}
          alt=""
        />

        <button
          onClick={() => {
            if (samplePicIndex + 1 === picSrc.pics.length) return;
            increaseSamplePicIndex();
          }}
          className={`${buttonClasses} text-white rounded-tl-[2rem] left-0`}
        >
          ❯
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        {picSrc.pics.map((_, idx) => (
          <span
            key={idx}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              idx === samplePicIndex ? "bg-white scale-110" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
