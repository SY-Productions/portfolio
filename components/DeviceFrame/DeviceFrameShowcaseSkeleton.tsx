// components/DeviceFrame/DeviceFrameSkeleton.tsx
import React from "react";

interface DeviceFrameSkeletonProps {
  orientation: "portrait" | "landscape";
}

const DeviceFrameSkeleton: React.FC<DeviceFrameSkeletonProps> = ({ orientation }) => {
  return (
    <div className="lg:h-[60vh] h-[50vh] mt-[10vh] mb-10 flex flex-col items-center justify-center lg:ml-[7rem] w-full gap-6">
      {/* Device Frame Skeleton */}
      <div className="relative">
        <div
          className={`relative bg-black/40 backdrop-blur-lg border-[6px] border-white/5 rounded-[2rem] p-1 overflow-hidden shadow-xl ${
            orientation === "portrait"
              ? "w-[240px] h-[480px] md:w-[270px] md:h-[540px]"
              : "w-[480px] h-[240px] md:w-[540px] md:h-[270px]"
          }`}
        >
          {/* Status bar */}
          <div className="absolute top-0 left-0 right-0 bg-black/60 h-6 z-10 flex items-center justify-between px-4">
            <div className="w-8 h-2 bg-white/20 animate-pulse rounded-sm"></div>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-white/20 animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-white/20 animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-white/20 animate-pulse"></div>
            </div>
          </div>

          {/* Content area skeleton */}
          <div className="w-full h-full flex items-center justify-center bg-black/20">
            <div className="w-12 h-12 rounded-full border-t-2 border-l-2 border-[#8C9EFF] animate-spin"></div>
          </div>

          {/* Home indicator */}
          <div className="absolute bottom-1 left-0 right-0 flex justify-center">
            <div className="w-24 h-1 bg-white/20 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Features list skeleton */}
      <div className="w-full max-w-md overflow-x-auto">
        <div className="flex gap-2 justify-center">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="w-24 h-8 bg-black/20 border border-white/10 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeviceFrameSkeleton;
