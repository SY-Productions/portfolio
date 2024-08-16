import Image from "next/image";
import React from "react";
import pic from "@/public/pic.png";
export default function PicInfo() {
  return (
    <div className="relative lg:basis-1/2 w-[80vw] lg:w-full h-[60vh] overflow-hidden flex justify-center items-center bg-black/20">
      <Image
        src={pic}
        alt=""
        className="h-full w-auto object-cover object-center"
      />
      <div className="TXTonPIC absolute flex flex-col sm:flex-row items-center justify-between gap-2 px-[2vw] py-4 bg-d/40 backdrop-blur-md drop-shadow-lg w-full bottom-5 [&>*]:text-xs sm:[&>*]:text-sm 2xl:[&>*]:text-lg [&>*]:gap-y-1 sm:[&>*]:py-0  [&>*]:text-white ">
        <span className="font-[ybb] ">ایران، اصفهان</span>
        <span dir="ltr" className="font-[inter] font-bold ">
          +98 936 471 2195
        </span>
        <span className="font-[inter] font-bold ">mardanisa10@gmail.com</span>
      </div>
    </div>
  );
}
