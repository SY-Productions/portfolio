"use client";

import React, { memo, useState, useEffect } from "react";
import { useWorkSample } from "./WorkSampleContext";
import SkeletonImage from "../SkeletonImage";

// Use memo to prevent unnecessary re-renders
const Preview = memo(function Preview() {
  const { isWebFrame, getCurrentPictures, currentSampleIndex } = useWorkSample();
  const pictures = getCurrentPictures();
  const [currentImgKey, setCurrentImgKey] = useState(0);

  // Update a key when the sample changes to force re-render
  useEffect(() => {
    setCurrentImgKey(prev => prev + 1);
  }, [currentSampleIndex, isWebFrame]);

  if (!pictures.length) return null;

  return (
    <div
      className={`${
        isWebFrame ? "h-auto w-[90%]" : "lg:h-[60vh] h-[30vh]"
      } mt-[10vh] lg:-mt-5 mb-10 flex justify-center lg:ml-[7rem] relative`}
    >
        <SkeletonImage
          key={`preview-image-${currentImgKey}`}
          src={pictures[0]}
          width={500}
          height={500}
          className="lg:h-[60vh] h-[30vh] lg:w-[30vw] object-contain"
          alt="Project preview"
        />
    </div>
  );
});

export default Preview;
