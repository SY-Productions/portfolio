"use client";

import React, { memo, useRef, useEffect, useState } from "react";
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

  const dotsContainerRef = useRef<HTMLDivElement | null>(null);
  const dotsScrollerRef = useRef<HTMLDivElement | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  // Check if dots container is overflowing
  useEffect(() => {
    if (dotsContainerRef.current) {
      const container = dotsContainerRef.current;
      const isOverflow = container.scrollWidth > container.clientWidth;
      setIsOverflowing(isOverflow);
    }
  }, [totalSamples]);

  // Scroll to current dot
  useEffect(() => {
    if (dotsContainerRef.current && isOverflowing) {
      const container = dotsContainerRef.current;
      const dotWidth = 24; // Width of dot + gap
      const targetScroll = Math.max(0, (currentSampleIndex * dotWidth) - (container.clientWidth / 2) + (dotWidth / 2));

      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  }, [currentSampleIndex, isOverflowing]);

  // Add auto-scrolling animation when overflowing
  useEffect(() => {
    if (!isOverflowing || !dotsScrollerRef.current) return;

    // Add animation class dynamically
    const scroller = dotsScrollerRef.current;

    // Only apply animation when not interacting (for better UX)
    const startAnimation = () => {
      if (scroller && isOverflowing) {
        scroller.style.animation = 'none'; // Reset animation
        void scroller.offsetWidth; // Force reflow
        scroller.style.animation = 'dotsSpin 15s linear infinite alternate';
      }
    };

    const stopAnimation = () => {
      if (scroller) {
        scroller.style.animation = 'none';
      }
    };

    // Start animation after a delay
    const timer = setTimeout(startAnimation, 2000);

    // Stop animation on user interaction
    dotsContainerRef.current?.addEventListener('mouseenter', stopAnimation);
    dotsContainerRef.current?.addEventListener('touchstart', stopAnimation);

    // Clean up
    return () => {
      clearTimeout(timer);
      dotsContainerRef.current?.removeEventListener('mouseenter', stopAnimation);
      dotsContainerRef.current?.removeEventListener('touchstart', stopAnimation);
    };
  }, [isOverflowing]);

  // Button classes for consistent styling
  const buttonClasses =
    "btn w-[15vw] lg:w-[4vw] h-[7vh] lg:h-[6vh] rounded-none bg-[#111] hover:bg-[#1A1A1A] hover:border-[#333] border border-[#222] active:bg-[#151515] transition-colors duration-200";

  return (
    <>
      {/* Inject the required CSS for animation */}
      <style jsx global>{`
        @keyframes dotsSpin {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% + 100vw)); }
        }

        .dots-container::-webkit-scrollbar {
          display: none;
        }

        .dots-container {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="float-end my-6 lg:mb-0 mb-10 flex flex-row items-center justify-between w-[80vw] lg:w-[35vw] gap-3">
        {/* Sample index display */}
        <div className="NAME py-6">
          <p className="sample-index w-20 h-15">
            {String(currentSampleIndex + 1).padStart(2, '0')}
          </p>
        </div>

        {/* Pagination dots with scroll container */}
        <div
          ref={dotsContainerRef}
          className="dots-container flex gap-2 overflow-x-auto overflow-y-hidden max-w-[50%] md:max-w-[60%]"
          style={{
            maskImage: isOverflowing ? 'linear-gradient(90deg, transparent 0%, #000 10%, #000 90%, transparent 100%)' : 'none',
            WebkitMaskImage: isOverflowing ? 'linear-gradient(90deg, transparent 0%, #000 10%, #000 90%, transparent 100%)' : 'none'
          }}
        >
          <div
            ref={dotsScrollerRef}
            className="flex gap-2 py-1 min-w-max"
          >
            {Array.from({ length: totalSamples }).map((_, idx) => (
              <span
                key={idx}
                className={`h-3 w-3 md:h-4 md:w-4 shrink-0 transition-all rounded-full duration-300 cursor-pointer ${
                  idx === currentSampleIndex
                    ? "bg-white scale-110"
                    : "bg-[#333] hover:bg-[#444]"
                }`}
                onClick={() => {
                  // Navigate directly to this sample
                  const diff = idx - currentSampleIndex;
                  if (diff > 0) {
                    for (let i = 0; i < diff; i++) goToNextSample();
                  } else if (diff < 0) {
                    for (let i = 0; i > diff; i--) goToPrevSample();
                  }
                }}
              />
            ))}
          </div>
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
    </>
  );
});

export default SampleSwitcher;
