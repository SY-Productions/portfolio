"use client";

import React, { memo } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useWorkSample } from "./WorkSampleContext";

// Use memo to prevent unnecessary re-renders
const SampleSwitcher = memo(function SampleSwitcher() {
  const {
    isWebFrame,
    currentSampleIndex,
    totalSamples,
    goToNextSample,
    goToPrevSample
  } = useWorkSample();

  // Button classes for consistent styling
  const buttonClasses =
    "btn w-[15vw] lg:w-[4vw] h-[7vh] lg:h-[6vh] rounded-none bg-[#111] hover:bg-[#1A1A1A] hover:border-[#333] border border-[#222] active:bg-[#151515] transition-colors duration-200";

  return (
    <div className="float-end my-6 lg:mb-0 flex flex-row items-center justify-between w-[80vw] lg:w-[35vw] gap-3">
      {/* Sample index display */}
      <div className="NAME py-6">
        <p className="sample-index w-20 h-15">
          {String(currentSampleIndex + 1).padStart(2, '0')}
        </p>
      </div>

      {/* Pagination dots */}
      <div className="flex gap-2">
        {Array.from({ length: totalSamples }).map((_, idx) => (
          <span
            key={idx}
            className={`h-3 w-3 transition-all rounded-full duration-300 ${
              idx === currentSampleIndex
                ? "bg-white scale-110"
                : "bg-[#333]"
            }`}
          />
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="flex gap-2">
        <button
          onClick={goToPrevSample}
          className={buttonClasses}
          aria-label="Previous sample"
        >
          <KeyboardArrowRightIcon sx={{ fontSize: 20, color: "white" }} />
        </button>
        <button
          onClick={goToNextSample}
          className={buttonClasses}
          aria-label="Next sample"
        >
          <KeyboardArrowRightIcon
            sx={{ transform: "rotate(180deg)", fontSize: 20, color: "white" }}
          />
        </button>
      </div>
    </div>
  );
});

export default SampleSwitcher;
