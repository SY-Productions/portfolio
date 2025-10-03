"use client";

import Image from "next/image";
import React, { memo, useState } from "react";
import pic from "@/public/me.jpg";

// Memoized for better performance
const PicInfo = memo(function PicInfo() {
  const [copied, setCopied] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText("98135655644");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="relative lg:basis-1/2 w-[80vw] lg:w-full h-[60vh] overflow-hidden
                   flex justify-center items-center bg-black/20 border border-white/10
                   backdrop-blur-2xl rounded-none"
    >
      {/* Subtle overlay for image */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-black/0 z-10"></div>

      <Image
        src={pic}
        alt="Yousof Hashemzade, Flutter Developer | یوسف هاشم زاده، توسعه دهنده فلاتر"
        title="Yousof Hashemzade - Flutter Developer | یوسف هاشم زاده - توسعه دهنده فلاتر"
        className="h-full w-[80vw] object-cover object-center transition-all duration-700 hover:scale-105"
      />

      <div
        className="TXTonPIC absolute flex flex-col sm:flex-row items-center justify-between
                     gap-2 px-[2vw] py-4 bg-black/40 backdrop-blur-md w-full bottom-5
                     [&>*]:text-xs sm:[&>*]:text-sm 2xl:[&>*]:text-lg [&>*]:gap-y-1
                     sm:[&>*]:py-0 [&>*]:text-white border-t border-white/10 z-20"
      >
        <span className="font-[ybb] relative">
          ایران، اصفهان
          <span className="absolute -bottom-1 right-0 w-12 h-[1px] bg-gradient-to-r from-[#8C9EFF] to-[#0F3D3E]"></span>
        </span>

        <button
          onClick={handleCopyPhone}
          className="relative group transition-all duration-300"
        >
          <span dir="ltr" className="font-[inter] relative">
            +98 913 565 5644
            <span
              className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-[#8C9EFF] to-[#0F3D3E]
                           group-hover:w-full transition-all duration-300"
            ></span>
          </span>
          <span
            className={`absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-xs
                          px-2 py-1 rounded-none backdrop-blur-md border border-white/10
                          transition-opacity duration-300 ${
                            copied ? "opacity-100" : "opacity-0"
                          }`}
          >
            کپی شد!
          </span>
        </button>

        <span className="font-[inter] relative">
          yousofh255@gmail.com
          <span className="absolute -bottom-1 left-0 w-12 h-[1px] bg-gradient-to-r from-[#0F3D3E] to-[#8C9EFF]"></span>
        </span>
      </div>
    </div>
  );
});

export default PicInfo;
