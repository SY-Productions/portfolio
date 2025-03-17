// EventCardSkeleton.jsx
import React from "react";

const EventCardSkeleton = () => {
  return (
    <div className="w-[80vw] lg:w-[30vw] min-w-[150px] h-auto min-h-[12rem] bg-black/20 border border-white/10 backdrop-blur-2xl rounded-none mx-auto flex flex-col font-[ybn]">
      <div className="PIC&CAlENDAR flex items-start w-full m-4 relative">
        {/* Image placeholder */}
        <div className="overflow-hidden border border-white/10 rounded-none aspect-square">
          <div className="w-[60px] h-[60px] bg-white/10 animate-pulse"></div>
        </div>

        {/* Date placeholder */}
        <div className="absolute left-4 top-[0.75rem] z-10 bg-gradient-to-r from-[#7B2CBF]/20 to-[#8C9EFF]/20 rounded-none flex items-center justify-center h-8 w-28 border border-white/10 backdrop-blur-md">
          <div className="h-3 w-16 bg-white/10 animate-pulse"></div>
        </div>
      </div>

      <div className="NAME&DESC flex flex-col px-4">
        {/* Title placeholder */}
        <div className="py-2">
          <div className="h-6 w-[70%] bg-white/10 animate-pulse"></div>
        </div>

        {/* Description placeholder */}
        <div className="pb-3">
          <div className="h-4 w-full bg-white/10 animate-pulse mb-2"></div>
          <div className="h-4 w-[90%] bg-white/10 animate-pulse mb-2"></div>
          <div className="h-4 w-[80%] bg-white/10 animate-pulse"></div>
        </div>

        {/* Button placeholder */}
        <div className="pb-6">
          <div className="h-5 w-24 bg-white/10 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default EventCardSkeleton;
