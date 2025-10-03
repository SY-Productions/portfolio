import React, { memo } from "react";
import CallForm from "./CallForm";
import PicInfo from "./PicInfo";

// Memoized for better performance
const CallMe = memo(function CallMe() {
  return (
    <div
      id="call-me"
      className="relative z-[10] h-auto lg:h-screen flex flex-col lg:flex-row justify-center items-center gap-[5vh] lg:gap-[3vw] lg:px-10 lg:pr-[22vw] mt-[5vh] pb-12"
    >
      <div
        className="absolute top-20 left-10 w-64 h-64 bg-[#8C9EFF]/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: "10s" }}
      ></div>
      <div
        className="absolute bottom-1/4 right-10 w-72 h-72 bg-[#0F3D3E]/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: "15s", animationDelay: "2s" }}
      ></div>

      <div className="(H3&P)&(FORM) lg:basis-1/2 relative z-10">
        <div className="H3&P w-[80vw] lg:w-full lg:pr-0">
          <h3 className="xl:text-4xl 2xl:text-5xl font-[ybb] text-white/80 self-start mb-6 2xl:mb-10 text-nowrap relative inline-block">
            باهام در تماس باش
            <span className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-[#0F3D3E] to-[#8C9EFF]"></span>
          </h3>
          <p className="font-[ybn] text-white/60 self-start mb-8 2xl:text-lg text-wrap leading-7">
            اگه صحبتی هست میتونی از طریق این فرم بهم ایمیل بدی، اگه هم از ایمیل
            خوشت نمیاد، شماره م همونجاست، زنگ بزن بهم یا پیامک بده:)
          </p>
        </div>
        <CallForm />
      </div>

      {/* Add positioning for the right side */}
      <div className="lg:basis-1/2 relative z-10">
        <PicInfo />
      </div>
    </div>
  );
});

export default CallMe;
