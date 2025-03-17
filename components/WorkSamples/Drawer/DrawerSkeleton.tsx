"use client";

import React from "react";

const DrawerSkeleton = () => {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center">
      <div className="w-[90vw] lg:w-[80vw] h-[80vh] bg-[#111] border border-[#222] rounded-none overflow-hidden flex flex-col">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between p-4 border-b border-[#222]">
          <div className="h-6 w-40 bg-white/10 animate-pulse"></div>
          <div className="h-6 w-6 bg-white/10 animate-pulse rounded-full"></div>
        </div>

        {/* Content Skeleton */}
        <div className="flex flex-col lg:flex-row h-full overflow-hidden">
          {/* Left Side - Image Gallery Skeleton */}
          <div className="lg:w-1/2 h-[30vh] lg:h-full border-r border-[#222] flex flex-col">
            {/* Main Image Skeleton */}
            <div className="h-[25vh] lg:h-[60%] w-full bg-white/5 animate-pulse flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-t-2 border-l-2 border-[#8C9EFF] animate-spin"></div>
            </div>

            {/* Thumbnails Skeleton */}
            <div className="flex overflow-x-auto p-2 gap-2 border-t border-[#222]">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="w-20 h-20 flex-shrink-0 bg-white/5 animate-pulse"
                ></div>
              ))}
            </div>
          </div>

          {/* Right Side - Information Skeleton */}
          <div className="lg:w-1/2 p-4 overflow-y-auto">
            {/* Title Skeleton */}
            <div className="h-8 w-[70%] bg-white/10 animate-pulse mb-6"></div>

            {/* Description Skeleton */}
            <div className="space-y-3 mb-8">
              <div className="h-4 w-full bg-white/10 animate-pulse"></div>
              <div className="h-4 w-[95%] bg-white/10 animate-pulse"></div>
              <div className="h-4 w-[90%] bg-white/10 animate-pulse"></div>
              <div className="h-4 w-[85%] bg-white/10 animate-pulse"></div>
            </div>

            {/* Technologies Skeleton */}
            <div className="h-6 w-40 bg-white/10 animate-pulse mb-4"></div>
            <div className="flex flex-wrap gap-2 mb-8">
              {Array.from({ length: 5 }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-8 w-20 bg-white/10 animate-pulse rounded-md"
                ></div>
              ))}
            </div>

            {/* Date Skeleton */}
            <div className="h-6 w-32 bg-white/10 animate-pulse mb-4"></div>
            <div className="h-4 w-40 bg-white/10 animate-pulse mb-8"></div>

            {/* Link Button Skeleton */}
            <div className="h-10 w-32 bg-white/10 animate-pulse rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawerSkeleton;
