"use client";

import React, { memo, useEffect, useState } from "react";
import { useWorkSample } from "../WorkSampleContext";
import { PhoneFrame, BrowserFrame } from "../Preview";

const DrawerCarousel = memo(function DrawerCarousel() {
  const {
    getCurrentPictures,
    currentPicIndex,
    setCurrentPicIndex,
    isWebFrame,
  } = useWorkSample();

  const [currentImgKey, setCurrentImgKey] = useState(0);

  useEffect(() => {
    setCurrentImgKey((prev) => prev + 1);
  }, [currentPicIndex]);

  const pictures = getCurrentPictures();

  const showPrevImage = () => {
    if (currentPicIndex > 0) setCurrentPicIndex(currentPicIndex - 1);
  };

  const showNextImage = () => {
    if (currentPicIndex + 1 < pictures.length) setCurrentPicIndex(currentPicIndex + 1);
  };

  const buttonClasses =
    "absolute top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 bg-black/60 border border-white/15 text-white hover:bg-black/80 transition-all text-sm";

  if (!pictures.length) return null;

  return (
    <div className="relative w-full flex flex-col items-center bg-[#0F0F0F] rounded-t-[2rem] lg:rounded-t-[5rem] py-8 overflow-hidden">
      {/* Ambient glow behind frame */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] bg-[#3B070A]/15 rounded-full blur-3xl" />
      </div>

      {/* Nav: prev */}
      {currentPicIndex > 0 && (
        <button onClick={showPrevImage} className={`${buttonClasses} start-3`} aria-label="Previous image">
          ❮
        </button>
      )}

      {/* Frame + image */}
      <div key={currentImgKey} className="flex items-center justify-center px-12 lg:px-16 w-full animate-scale-in" style={{ animationDuration: "0.35s" }}>
        {isWebFrame ? (
          <BrowserFrame src={pictures[currentPicIndex]} />
        ) : (
          <PhoneFrame src={pictures[currentPicIndex]} />
        )}
      </div>

      {/* Nav: next */}
      {currentPicIndex < pictures.length - 1 && (
        <button onClick={showNextImage} className={`${buttonClasses} end-3`} aria-label="Next image">
          ❯
        </button>
      )}

      {/* Pagination dots */}
      {pictures.length > 1 && (
        <div className="flex gap-2 mt-6">
          {pictures.map((_: string, idx: number) => (
            <button
              key={idx}
              onClick={() => setCurrentPicIndex(idx)}
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                idx === currentPicIndex ? "bg-white scale-110" : "bg-[#333] hover:bg-[#555]"
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
