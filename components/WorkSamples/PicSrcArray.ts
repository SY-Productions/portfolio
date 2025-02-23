"use client";

import { useZState } from "@/app/states";

export default function PicSrcArray({ data }: { data: WorkSample[] }) {
  const { sampleWebIndex, sampleMobIndex, isWebFrame } = useZState();
  const mobile = data.filter((sample) => !sample.isWeb);
  const web = data.filter((sample) => sample.isWeb);
  return isWebFrame && web[sampleWebIndex]
    ? {
        id: web[sampleWebIndex].id,
        pics: web[sampleWebIndex].pictures.split(" "),
      }
    : mobile[sampleMobIndex]
    ? {
        id: mobile[sampleMobIndex].id,
        pics: mobile[sampleMobIndex].pictures.split(" "),
      }
    : {
        id: 0,
        pics: [],
      };
}
