"use client";
import Image from "next/image";
import React from "react";
import PicSrcArray from "../PicSrcArray";
import { WorkSample } from "@prisma/client";
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
    <div className="relative w-full h-auto flex flex-row items-center justify-between bg-b/30 rounded-t-[2rem] lg:rounded-t-[5rem] ">
      <button
        onClick={() => {
          samplePicIndex + 1 < picSrc.pics.length
            ? increaseSamplePicIndex()
            : decreaseSamplePicIndex();
        }}
        className={`${buttonClasses} rounded-tr-[2rem] right-0`}
      >
        ❮
      </button>
      <Image
        width={500}
        height={500}
        src={picSrc.pics[samplePicIndex]}
        className={`${
          isWebFrame ? "w-[75%] lg:w-[50%]" : "w-auto h-[65vh] "
        } my-[6vh] h-auto mx-auto`}
        alt=""
      />
      <button
        onClick={() => {
          samplePicIndex + 1 <= picSrc.pics.length && samplePicIndex != 0
            ? decreaseSamplePicIndex()
            : increaseSamplePicIndex();
        }}
        className={`${buttonClasses} rounded-tl-[2rem] left-0`}
      >
        ❯
      </button>
    </div>
  );
}
