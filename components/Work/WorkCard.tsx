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
        className="group cursor-pointer w-[80vw] lg:w-[30vw] min-w-[150px] h-auto min-h-[12rem]
                  bg-black/20 border border-white/10 hover:border-white/20 backdrop-blur-2xl rounded-none
                  mx-auto flex flex-col font-[ybn] transition-all duration-300 hover:-translate-y-1 ease-out
                  relative before:absolute before:content-[''] before:bottom-0 before:left-0 before:w-0 before:h-0
                  hover:before:w-full hover:before:h-full before:transition-all before:duration-500
                  before:border-l before:border-b before:border-[#3A0D12]/50
                  hover:after:w-full hover:after:h-full after:absolute after:content-[''] after:top-0
                  after:right-0 after:w-0 after:h-0 after:transition-all after:duration-500
                  after:border-t after:border-r after:border-[#3B070A]/50 after:transition-delay-300"
      >
        <div className="PIC&CAlENDAR flex items-start w-full m-4 relative">
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
            className="absolute end-4 top-[0.75rem] z-10 bg-gradient-to-r from-[#3B070A]/20 to-[#3A0D12]/20
                        rounded-none flex items-center justify-center h-8 w-28 text-xs text-white/80
                        border border-white/10 backdrop-blur-md"
          >
            {`${work.fromYear} ${toLabel} ${
              work.toYear ? work.toYear : presentLabel
            }`}
          </div>
        </div>

        <div className="NAME&DESC flex flex-col px-4">
          <div className="relative text-lg py-2 text-white font-bold">
            {displayName}
          </div>

          <div className="text-sm pb-4 text-white/60 leading-6">
            {displayDesc}
          </div>
        </div>

        <div className="px-4 pb-4 flex flex-row-reverse gap-2 mt-auto">
          {work.technos.map((tech, index) => (
            <Skill key={index} name={tech} />
          ))}
        </div>
      </a>
    </Link>
  );
};

export default memo(WorkCard);
