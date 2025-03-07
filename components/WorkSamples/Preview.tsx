"use client";

import React, { memo } from "react";
import { useWorkSample } from "./WorkSampleContext";
import SkeletonImage from "../SkeletonImage";

// Use memo to prevent unnecessary re-renders
const Preview = memo(function Preview() {
  const { isWebFrame, getCurrentPictures } = useWorkSample();
  const pictures = getCurrentPictures();

  if (!pictures.length) return null;

  return (
    <div
      className={`${
        isWebFrame ? "h-auto w-[90%]" : "h-[60vh]"
      } mt-[10vh] lg:-mt-5 mb-10 flex justify-center lg:ml-[7rem]`}
    >
      <SkeletonImage
        src={pictures[0]}
        width={500}
        height={500}
        className="h-[60vh] lg:w-[30vw] object-contain"
        alt="Project preview"
      />
    </div>
  );
});

export default Preview;
