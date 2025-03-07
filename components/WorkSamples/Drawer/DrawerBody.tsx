"use client";

import React, { useState, useCallback, memo } from "react";
import LaunchIcon from "@mui/icons-material/Launch";
import { Copy, CopySuccess } from "iconsax-react";
import Skill from "@/components/Skills/HardSkill";
import { useWorkSample } from "../WorkSampleContext";

const DrawerBody = memo(function DrawerBody() {
  const { getCurrentSample } = useWorkSample();
  const [isCopied, setCopied] = useState(false);

  const currentSample = getCurrentSample();

  if (!currentSample) return null;

  // Extract technologies array
  const techsArray = currentSample.technologys?.split(" ") || [];

  // Format link correctly
  const formattedLink = currentSample.link === "#"
    ? null
    : currentSample.link?.startsWith("http")
      ? currentSample.link
      : `https://${currentSample.link}`;

  // Handle copy link functionality
  const handleCopy = useCallback(() => {
    if (formattedLink) {
      navigator.clipboard.writeText(formattedLink).then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 3000);
      });
    }
  }, [formattedLink]);

  // Determine link type for copy button text
  const getLinkTypeText = () => {
    if (!currentSample.link || currentSample.link === "#") return "";

    if (currentSample.link.includes("rtl")) return "راستچین";
    if (currentSample.link.includes("liara")) return "دمو";
    if (currentSample.link.includes("github")) return "گیت هاب";
    return "محصول";
  };

  // Process description to handle special formatting
  const processDescription = (description: string) => {
    if (!description) return "";
    return description.replace("%g%", "");
  };

  return (
    <div className="DRAWERBODY font-[ybn] text-white/90 p-6 bg-[#0A0A0A]">
      {/* Title with optional link */}
      {formattedLink ? (
        <a
          href={formattedLink}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex w-fit items-center gap-2 text-lg xl:text-2xl 2xl:text-3xl 2xl:py-4 font-[ybb] pb-4 cursor-pointer"
        >
          <h4 className="inline group-hover:underline group-hover:underline-offset-2">
            {currentSample.faTitle}
          </h4>
          <LaunchIcon sx={{ fontSize: 20 }} />
        </a>
      ) : (
        <h4 className="text-lg xl:text-2xl 2xl:text-3xl 2xl:py-4 font-[ybb] pb-4">
          {currentSample.faTitle}
        </h4>
      )}

      {/* Description - first part */}
      <p className="DESC text-white/50 pb-4 text-sm lg:text-base 2xl:text-lg">
        {currentSample.faDescription?.split("%g%")[0] || ""}
      </p>

      {/* Copy link button - only show if there's a valid link */}
      {formattedLink && (
        <button
          className={`py-2 px-4 w-auto lg:text-md inline-flex gap-2 items-center justify-between text-nowrap border border-[#222] transition-colors duration-300 ${
            isCopied ? "bg-[#1A2A1A] text-white/90" : "bg-[#111] text-white/80 hover:bg-[#1A1A1A]"
          }`}
          onClick={handleCopy}
          disabled={isCopied}
        >
          {isCopied ? <CopySuccess size={18} /> : <Copy size={18} />}
          {isCopied ? (
            <span>کپی شد!</span>
          ) : (
            <span>
              کپی لینک {getLinkTypeText()}
            </span>
          )}
        </button>
      )}

      {/* Divider */}
      <div className="DIVIDER border-t border-[#222] w-full h-0 my-4" />

      {/* Technologies section */}
      {techsArray.length > 0 && (
        <div>
          <p className="text-lg 2xl:text-2xl pb-4 font-[ybb]">
            تکنولوژی های به کار رفته:
          </p>
          <div className="inline-grid grid-cols-2 gap-2">
            {techsArray.map((tech: React.Key | null | undefined) => (
              <Skill name={tech as string} key={tech} />
            ))}
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="DIVIDER border-t border-[#222] w-full h-0 my-4" />

      {/* Project timeframe */}
      <div className="SPENTTIME">
        <p className="text-lg 2xl:text-2xl pb-4 font-[ybb]">
          زمان صرف شده برای پروژه :
        </p>
        <div className="flex items-center justify-evenly h-[10vh] border-y border-[#222]">
          <div className="flex flex-col">
            <span className="text-xs lg:text-sm text-white/50">شروع :</span>
            <span className="text-sm lg:text-base 2xl:text-lg">
              {currentSample.faStartDate}
            </span>
          </div>
          <div className="DIVIDER border-l border-[#222] w-1 h-full" />
          <div className="flex flex-col">
            <span className="text-xs lg:text-sm text-white/50">اتمام :</span>
            <span className="text-sm lg:text-base 2xl:text-lg">
              {currentSample.faEndDate}
            </span>
          </div>
        </div>
      </div>

      {/* Full description */}
      <div className="FULLDECS pt-4 text-sm lg:text-base 2xl:text-lg text-white/70">
        <p>{processDescription(currentSample.faDescription)}</p>
      </div>
    </div>
  );
});

export default DrawerBody;
