"use client";
import React, { memo } from "react";
import CallForm from "./CallForm";
import PicInfo from "./PicInfo";
import { useLang } from "@/app/context/LanguageContext";

// Memoized for better performance
const CallMe = memo(function CallMe() {
  const { t } = useLang();

  return (
    <div
      id="call-me"
      className="relative z-[10] h-auto lg:h-screen flex flex-col lg:flex-row justify-center items-center gap-[5vh] lg:gap-[3vw] lg:px-10 lg:ps-[22vw] mt-[5vh] pb-12"
    >
      <div
        className="absolute top-20 left-10 w-64 h-64 bg-[#3A0D12]/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: "10s" }}
      ></div>
      <div
        className="absolute bottom-1/4 right-10 w-72 h-72 bg-[#3B070A]/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: "15s", animationDelay: "2s" }}
      ></div>

      <div className="(H3&P)&(FORM) lg:basis-1/2 relative z-10">
        <div className="H3&P w-[80vw] lg:w-full lg:ps-0">
          <h3 className="section-title mb-6 2xl:mb-10">{t("contact.title")}</h3>
          <p className="font-[ybn] text-white/60 self-start mb-8 2xl:text-lg text-wrap leading-7">
            {t("contact.description")}
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
