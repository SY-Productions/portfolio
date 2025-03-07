import React, { memo } from "react";
import { Event } from "./Events";
import Image from "next/image";
import { Calendar } from "iconsax-react";

// Memoized for better performance
const EventCard = memo(function EventCard({ data }: { data: Event }) {
  return (
    <div
      className="group w-[80vw] lg:w-[30vw] min-w-[150px] h-auto min-h-[12rem]
                  bg-black/20 border border-white/10 hover:border-white/20 backdrop-blur-2xl rounded-none
                  mx-auto flex flex-col font-[ybn] transition-all duration-300 hover:-translate-y-1 cursor-pointer ease-out
                  relative before:absolute before:content-[''] before:bottom-0 before:left-0 before:w-0 before:h-0
                  hover:before:w-full hover:before:h-full before:transition-all before:duration-500
                  before:border-l before:border-b before:border-[#8C9EFF]/50
                  hover:after:w-full hover:after:h-full after:absolute after:content-[''] after:top-0
                  after:right-0 after:w-0 after:h-0 after:transition-all after:duration-500
                  after:border-t after:border-r after:border-[#7B2CBF]/50 after:transition-delay-300"
    >
      <div className="PIC&CAlENDAR flex items-start w-full m-4 relative">
        {/* Event logo with modern styling */}
        <div className="overflow-hidden border border-white/10 rounded-none aspect-square">
          <Image
            className="aspect-square transition-all duration-300"
            width={60}
            height={60}
            src={data.picture}
            alt={data.name}
          />
        </div>

        {/* Date with gradient styling - adjusted position */}
        <div
          className="absolute left-4 top-[0.75rem] z-10 bg-gradient-to-r from-[#7B2CBF]/20 to-[#8C9EFF]/20
                      rounded-none flex items-center justify-center h-8 w-28 text-xs text-white/80
                      border border-white/10 backdrop-blur-md"
        >
          {data.date}
        </div>
      </div>

      <div className="NAME&DESC flex flex-col px-4">
        {/* Title with subtle line accent */}
        <div className="relative text-lg py-2 text-white font-bold h-20 overflow-hidden">
          {data.name}
          <span className="absolute -bottom-1 right-0 w-12 h-[2px] bg-gradient-to-r from-[#8C9EFF] to-[#7B2CBF]"></span>
        </div>

        {/* Description with enhanced styling */}
        <div className="text-sm pb-4 text-white/60 leading-6">
          {data.description}
        </div>
      </div>

      {/* Certificate/Award image with improved container */}
      <div
        className="relative w-[90%] h-[350px] mx-auto rounded-none my-8 overflow-hidden border border-white/10
                     transition-all duration-300 group-hover:border-white/20 group-hover:shadow-[0_0_15px_rgba(102,255,145,0.1)]"
      >
        <Image
          layout="fill"
          objectFit="cover"
          src={data.attachment}
          alt={data.description ?? ""}
          className="transition-all duration-500 group-hover:scale-105"
        />
      </div>
    </div>
  );
});

export default EventCard;
