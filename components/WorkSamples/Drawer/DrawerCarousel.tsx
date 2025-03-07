"use client";

import React, { memo, useEffect, useState } from "react";
import Image from "next/image";
import { useWorkSample } from "../WorkSampleContext";

const DrawerCarousel = memo(function DrawerCarousel() {
  const {
    getCurrentPictures,
    currentPicIndex,
    setCurrentPicIndex,
    isWebFrame,
  } = useWorkSample();

  const [isLoading, setIsLoading] = useState(true);
  const [currentImgKey, setCurrentImgKey] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    setCurrentImgKey((prev: number) => prev + 1);
  }, [currentPicIndex]);

  const pictures = getCurrentPictures();

  const showPrevImage = () => {
    if (currentPicIndex > 0) {
      setCurrentPicIndex(currentPicIndex - 1);
    }
  };

  const showNextImage = () => {
    if (currentPicIndex + 1 < pictures.length) {
      setCurrentPicIndex(currentPicIndex + 1);
    }
  };

  // Navigation button classes
  const buttonClasses =
    "btn absolute h-[100%] lg:btn-square lg:h-[7vh] lg:w-[7vh] lg:mx-6 lg:rounded-none bg-[#111] border border-[#222] hover:bg-[#1A1A1A] hover:border-[#333] m-0 w-[7vw] rounded-none lg:text-xl 2xl:text-2xl transition-colors duration-200";

  // If no pictures, return null
  if (!pictures.length) return null;

  return (
    <div className="relative w-full h-auto flex flex-col items-center bg-[#0F0F0F] rounded-t-[2rem] lg:rounded-t-[5rem]">
      <div className="relative w-full flex flex-row items-center justify-between">
        {/* Previous button - only show if not at first image */}
        {currentPicIndex > 0 && (
          <button
            onClick={showPrevImage}
            className={`${buttonClasses} text-white rounded-tr-[2rem] right-0`}
            aria-label="Previous image"
          >
            ❮
          </button>
        )}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-t-2 border-l-2 border-[#66FF91] animate-spin"></div>
          </div>
        )}

        {/* Current image */}
        <Image
          width={1000}
          height={1000}
          src={pictures[currentPicIndex]}
          unoptimized
          className={`${
            isWebFrame ? "w-[75%] lg:w-[50%]" : "w-[60%] lg:w-auto lg:h-[65vh]"
          } my-[6vh] h-auto mx-auto object-contain`}
          alt="Project screenshot"
          priority
          onLoad={() => setIsLoading(false)}
            onLoadStart={() => setIsLoading(true)}
            onLoadingComplete={() => setIsLoading(false)}
        />

        {/* Next button - only show if not at last image */}
        {currentPicIndex < pictures.length - 1 && (
          <button
            onClick={showNextImage}
            className={`${buttonClasses} text-white rounded-tl-[2rem] left-0`}
            aria-label="Next image"
          >
            ❯
          </button>
        )}
      </div>

      {/* Pagination dots */}
      {pictures.length > 1 && (
        <div className="flex gap-2 mb-4 ">
          {pictures.map((_: any, idx: number) => (
            <button
              key={idx}
              onClick={() => setCurrentPicIndex(idx)}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                idx === currentPicIndex ? "bg-white" : "bg-[#333]"
              }`}
              aria-label={`View image ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
});

export default DrawerCarousel;
