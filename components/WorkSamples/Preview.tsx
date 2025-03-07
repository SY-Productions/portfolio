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
        isWebFrame ? "h-auto w-[90%]" : "h-[60vh]"
      } mt-[10vh] lg:-mt-5 mb-10 flex justify-center lg:ml-[7rem] relative`}
    >
      {/* <div className="h-[60vh] lg:w-[30vw] bg-black/20 border border-white/10 backdrop-blur-md rounded-none */}
                    {/* flex items-center justify-center"> */}
        <SkeletonImage
          key={`preview-image-${currentImgKey}`}
          src={pictures[0]}
          width={500}
          height={500}
          className="h-[60vh] lg:w-[30vw] object-contain"
          alt="Project preview"
        />
      {/* </div> */}
    </div>
  );
});

export default Preview;
