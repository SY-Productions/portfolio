"use client";

import React, { useEffect, useState, memo } from "react";
import { Work } from "./Work";
import Image from "next/image";
import Skill from "../Skills/HardSkill";
import Link from "next/link";
import { useLang } from "@/app/context/LanguageContext";

interface WorkCardProps {
  work: Work;
  lang?: string;
}

const WorkCard = ({ work, lang }: WorkCardProps) => {
  const [mounted, setMounted] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const displayName =
    lang === "en" && work.nameEn
      ? work.nameEn
      : lang === "ar" && work.nameAr
      ? work.nameAr
      : work.name;

  const displayDesc =
    lang === "en" && work.descriptionEn
      ? work.descriptionEn
      : lang === "ar" && work.descriptionAr
      ? work.descriptionAr
      : work.description;

  const presentLabel = t("work.present");
  const toLabel = t("work.to");

  return (
    <Link
      href={work.url}
      target="_blank"
      rel="noopener noreferrer"
      legacyBehavior
      passHref
    >
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="glass-card group cursor-pointer w-full h-auto min-h-[12rem] flex flex-col font-[ybn]"
      >
        <div className="PIC&CAlENDAR flex items-start w-full p-5 relative">
          <div className="overflow-hidden border border-white/10 rounded-none aspect-square">
            <Image
              className="aspect-square transition-all duration-300"
              width={60}
              height={60}
              src={work.picture}
              alt={displayName}
            />
          </div>

          <div
            className="absolute end-5 top-5 z-10 bg-gradient-to-r from-[#3B070A]/20 to-[#3A0D12]/20
                        rounded-none flex items-center justify-center h-8 w-28 text-xs text-white/80
                        border border-white/10 backdrop-blur-md"
          >
            {`${work.fromYear} ${toLabel} ${
              work.toYear ? work.toYear : presentLabel
            }`}
          </div>
        </div>

        <div className="NAME&DESC flex flex-col px-5">
          <div className="relative text-lg pb-2 text-white font-bold">
            {displayName}
          </div>

          <div className="text-sm pb-4 text-white/60 leading-6">
            {displayDesc}
          </div>
        </div>

        <div className="px-5 pb-5 flex flex-row-reverse gap-2 mt-auto">
          {work.technos.map((tech, index) => (
            <Skill key={index} name={tech} />
          ))}
        </div>
      </a>
    </Link>
  );
};

export default memo(WorkCard);
