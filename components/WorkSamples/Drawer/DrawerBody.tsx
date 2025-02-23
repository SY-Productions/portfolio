"use client";

import { useZState } from "@/app/states";
import React, { useCallback, useState } from "react";
import LaunchIcon from "@mui/icons-material/Launch";
import { Copy, CopySuccess } from "iconsax-react";
import dynamic from "next/dynamic";
import Skill from "@/components/Skills/HardSkill";

export default function DrawerBody({
  web,
  mob,
}: {
  web: WorkSample[];
  mob: WorkSample[];
}) {
  const { isWebFrame, sampleMobIndex, sampleWebIndex, isDrawerOpen } =
    useZState();
  const target = isWebFrame ? web[sampleWebIndex] : mob[sampleMobIndex];
  const techsArray = isWebFrame
    ? web[sampleWebIndex]?.technologys.split(" ") ?? []
    : mob[sampleMobIndex]?.technologys.split(" ") ?? [];
  const spinnerSVG = (
    <svg
      className="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(target.link).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 5000);
    });
  }, [isWebFrame, sampleWebIndex, sampleMobIndex]);
  const [isCopied, setCopied] = useState(false);

  return (
    <div className="DRAWERBODY font-[ybn] text-white/90 p-6">
      <a
        href={
          target?.link === "#"
            ? undefined
            : target?.link?.startsWith("http")
            ? target.link
            : `https://${target?.link}`
        }
        target={target?.link === "#" ? undefined : "_blank"}
        rel={target?.link === "#" ? undefined : "noopener noreferrer"}
        className={`group flex w-fit items-center gap-2 text-lg xl:text-2xl 2xl:text-3xl 2xl:py-4 font-[ybb] pb-4 cursor-pointer ${
          target?.link === "#" ? "pointer-events-none" : ""
        }`}
      >
        <h4 className="inline group-hover:underline group-hover:underline-offset-2 ">
          {target?.faTitle}
        </h4>
        {target.link != "#"&&<LaunchIcon className="" sx={{ fontSize: 20 }} />}
      </a>

      <p className="DESC text-white/50 pb-4 text-sm lg:text-base 2xl:text-lg">
        {target?.faDescription.split("%g%")[0]}
      </p>
      {target.link != "#"&&<button
        className={`py-2 px-4 w-auto lg:text-md inline-flex gap-2 items-center justify-between text-nowrap rounded-sm transition-colors duration-300 ${
          isCopied ? "bg-green-500 text-white" : "bg-d text-white"
        }`}
        onClick={isCopied ? () => {} : handleCopy}
      >
        {isCopied  ? <CopySuccess /> : <Copy />}
        {isCopied  ? (
          <span>کپی شد!</span>
        ) : (
          <span>
            کپی لینک{" "}
            {target.link.includes("rtl")
              ? "راستچین"
              : target.link.includes("liara")
              ? "دمو": target.link.includes("github")?'گیت هاب'
              : "محصول"}
          </span>
        )}
      </button>}
      <div className="DIVIDER border-t border-white/20 w-full h-0 my-4" />
      <div>
        <p className="text-lg 2xl:text-2xl pb-4 font-[ybb]">
          تکنولوژی های به کار رفته:
        </p>
        {isDrawerOpen && (
          <div className="inline-grid grid-cols-2 gap-2">
            {techsArray.map((tech) => (
              <Skill name={tech} key={tech} />
            ))}
          </div>
        )}
      </div>
      <div className="DIVIDER border-t border-white/20 w-full h-0 my-4" />
      <div className="SPENTTIME">
        <p className="text-lg 2xl:text-2xl pb-4 font-[ybb]">
          زمان صرف شده برای پروژه :
        </p>
        <div className="flex items-center justify-evenly h-[10vh] border-y border-white/20">
          <div className="flex flex-col">
            <span className="text-xs lg:text-sm text-white/50">شروع :</span>
            <span className="text-sm lg:text-base 2xl:text-lg">
              {target?.faStartDate}
            </span>
          </div>
          <div className="DIVIDER border-l border-white/20 w-1 h-full " />
          <div className="flex flex-col">
            <span className="text-xs lg:text-sm text-white/50">اتمام :</span>
            <span className="text-sm lg:text-base 2xl:text-lg">
              {target?.faEndDate}
            </span>
          </div>
        </div>
      </div>
      <div className="FULLDECS pt-4 text-sm lg:text-base 2xl:text-lg">
        <p>{target?.faDescription.replace("%g%", "")}</p>
      </div>
    </div>
  );
}
