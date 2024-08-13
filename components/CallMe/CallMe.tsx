import React from "react";
import CallForm from "./CallForm";
import PicInfo from "./PicInfo";

export default function CallMe() {
  return (
    <div className="h-auto lg:h-screen flex flex-col lg:flex-row justify-center items-center  gap-10 lg:px-10 lg:pr-[22vw] ">
      <div className="lg:basis-1/2">
        <div className="H3&P w-[80vw] lg:w-full lg:pr-0">
          <h3 className="xl:text-4xl font-[ybb] text-white/80 self-start mb-6 text-nowrap">
            باهام در تماس باش
          </h3>
          <p className="font-[ybn] text-white/40 self-start mb-8 text-wrap">
            اگه صحبتی هست میتونی از طریق این فرم بهم ایمیل بدی، اگه هم از ایمیل
            خوشت نمیاد، شماره م همونجاست، زنگ بزن بهم یا پیامک بده:)
          </p>
        </div>
        <CallForm />
      </div>
      <PicInfo />
    </div>
  );
}
