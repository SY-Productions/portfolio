"use client";
import Image from "next/image";
import React from "react";
import { useZState } from "@/app/states";
// import { PreviewProps } from "./WorkSamples";
import { WorkSample } from "@prisma/client";

export default function Preview({ data }: { data: WorkSample[] }) {
  const { sampleWebIndex, sampleMobIndex, isWebFrame } = useZState();
  const mobile = data.filter((sample) => !sample.isWeb);
  const web = data.filter((sample) => sample.isWeb);

  // let output = { loc: "", howMany: 1 };
  // let locs = pictures.split(" ");
  // Bejaye data[0] data[state] bezar ke vasle be felesh paeen
  // const index = isWebFrame ? sampleWebIndex : sampleMobIndex;
  const picSrc = isWebFrame
    ? web[sampleWebIndex].pictures.split(" ")[0]
    : mobile[sampleMobIndex].pictures.split(" ")[0];
  return (
    <div
      className={`${
        isWebFrame ? "h-auto" : "h-[60vh]"
      } w-[80vw] mt-16 lg:-mt-5 mb-10 flex justify-center lg:w-[30vw] lg:mr-[5vw] lg:ml-[7rem]`}
    >
      <Image
        src={picSrc}
        width={500}
        height={500}
        className="h-[60vh] object-contain"
        alt=""
      />
    </div>
  );
}
