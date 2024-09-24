import React from "react";
import CallForm from "./CallForm";
import PicInfo from "./PicInfo";

export default function CallMe() {
  return (
    <div
      id="call-me"
      className="h-auto lg:h-screen flex flex-col lg:flex-row justify-center items-center gap-[5vh] lg:gap-[3vw] lg:px-10 lg:pr-[22vw] mt-[5vh]"
      style={{
        WebkitUserSelect: "text",
        KhtmlUserSelect: "text",
        MozUserSelect: "text",
        msUserSelect: "text",
        userSelect: "text",
      }}
    >
      <div className="(H3&P)&(FORM) lg:basis-1/2">
        <div className="H3&P w-[80vw] lg:w-full lg:pr-0">
          <h3 className="xl:text-4xl 2xl:text-5xl font-[ybb] text-white/80 self-start mb-6 2xl:mb-10 text-nowrap">
            باهام در تماس باش
          </h3>
          <p className="font-[ybn] text-white/40 self-start mb-8 2xl:text-lg text-wrap">
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
