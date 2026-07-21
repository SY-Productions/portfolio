"use client";
import React, { memo } from "react";
import { Education } from "./Education";
import Image from "next/image";
import { useLang } from "@/app/context/LanguageContext";

const EduCard = memo(function EduCard({
  data,
  lang,
}: {
  data: Education;
  lang?: string;
}) {
  const { t } = useLang();

  const displayName =
    lang === "en" && data.nameEn
      ? data.nameEn
      : lang === "ar" && data.nameAr
      ? data.nameAr
      : data.name;

  const displayDesc =
    lang === "en" && data.descriptionEn
      ? data.descriptionEn
      : lang === "ar" && data.descriptionAr
      ? data.descriptionAr
      : data.description;

  const presentLabel = t("education.present");
  const toLabel = t("education.to");

  return (
    <div className="glass-card will-animate group w-[80vw] max-w-[500px] lg:w-[30vw] min-w-[150px] h-auto min-h-[12rem] mx-auto flex flex-col font-[ybn] cursor-pointer">
      <div className="PIC&CAlENDAR flex items-start w-full p-5 relative">
        <div className="overflow-hidden border border-white/10 rounded-none aspect-square">
          <Image
            className="aspect-square transition-all duration-300"
            width={60}
            height={60}
            src={data.picture}
            alt={displayName}
          />
        </div>

        <div className="absolute end-5 top-5 z-10 bg-gradient-to-r from-[#3B070A]/20 to-[#3A0D12]/20 rounded-none flex items-center justify-center h-8 w-28 text-xs text-white/80 border border-white/10 backdrop-blur-md">
          {`${data.fromYear} ${toLabel} ${
            data.toYear ? data.toYear : presentLabel
          }`}
        </div>
      </div>

      <div className="NAME&DESC flex flex-col px-5">
        <div className="relative text-lg pb-2 text-white font-bold">
          {displayName}
        </div>

        <div className="text-sm pb-5 text-white/60 leading-6">
          {displayDesc}
        </div>
      </div>
    </div>
  );
});

export default EduCard;
