"use client";
import Image from "next/image";
import React from "react";
import { useZState } from "@/app/states";
import PicSrcArray from "./PicSrcArray";
import { WorkSample } from "@prisma/client";

export default function Preview({ data }: { data: WorkSample[] }) {
  const picSrc = PicSrcArray({ data });
  const { isWebFrame } = useZState();
  return (
    <div
      className={`${
        isWebFrame ? "h-auto" : "h-[60vh]"
      } mt-[10vh] lg:-mt-5 mb-10 flex justify-center lg:ml-[7rem]`}
    >
      <Image
        src={picSrc.pics[0]}
        width={500}
        height={500}
        className="h-[60vh] lg:w-[30vw] object-contain"
        alt=""
      />
    </div>
  );
}
