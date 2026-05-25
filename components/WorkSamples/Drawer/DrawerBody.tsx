"use client";

import React, { useState, useCallback, memo, useMemo } from "react";
import LaunchIcon from "@mui/icons-material/Launch";
import { Copy, CopySuccess } from "iconsax-react";
import Skill from "@/components/Skills/HardSkill";
import { useWorkSample } from "../WorkSampleContext";
import { useLang } from "@/app/context/LanguageContext";

interface CustomLink {
  label: string;
  link: string;
}

const DrawerBody = memo(function DrawerBody() {
  const { getCurrentSample } = useWorkSample();
  const { lang, t } = useLang();
  const [isCopied, setCopied] = useState(false);

  const currentSample = getCurrentSample();

  // Extract technologies array
  const techsArray = currentSample?.technologys?.split(" ") || [];

  // Format link correctly
  const formattedLink =
    currentSample?.link === "#"
      ? null
      : currentSample?.link?.startsWith("http")
      ? currentSample.link
      : `https://${currentSample?.link}`;

  // Parse custom links with proper error handling
  const customLinks: CustomLink[] = useMemo(() => {
    if (!currentSample?.customLinks) return [];
    try {
      const parsed = JSON.parse(currentSample.customLinks);
      if (Array.isArray(parsed)) return parsed;
      if (
        parsed &&
        typeof parsed === "object" &&
        "label" in parsed &&
        "link" in parsed
      )
        return [parsed];
    } catch {}
    return [];
  }, [currentSample?.customLinks]);

  // Language-aware title
  const getTitle = () => {
    if (!currentSample) return "";
    if (lang === "en" && currentSample.enTitle) return currentSample.enTitle;
    if (lang === "ar" && (currentSample as any).arTitle)
      return (currentSample as any).arTitle;
    return currentSample.faTitle ?? "";
  };

  // Language-aware description
  const getDescription = () => {
    if (!currentSample) return "";
    let desc = "";
    if (lang === "en" && currentSample.enDescription)
      desc = currentSample.enDescription;
    else if (lang === "ar" && (currentSample as any).arDescription)
      desc = (currentSample as any).arDescription;
    else desc = currentSample.faDescription ?? "";
    return desc.replace("%g%", "");
  };

  // Language-aware dates
  const getStartDate = () => {
    if (!currentSample) return "";
    if (lang === "en" && currentSample.enStartDate)
      return currentSample.enStartDate;
    if (lang === "ar" && (currentSample as any).arStartDate)
      return (currentSample as any).arStartDate;
    return currentSample.faStartDate ?? "";
  };

  const getEndDate = () => {
    if (!currentSample) return "";
    if (lang === "en" && currentSample.enEndDate)
      return currentSample.enEndDate;
    if (lang === "ar" && (currentSample as any).arEndDate)
      return (currentSample as any).arEndDate;
    return currentSample.faEndDate ?? "";
  };

  // Handle copy link functionality
  const handleCopy = useCallback(() => {
    if (formattedLink) {
      navigator.clipboard.writeText(formattedLink).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      });
    }
  }, [formattedLink]);

  if (!currentSample) return null;

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
            {getTitle()}
          </h4>
          <LaunchIcon sx={{ fontSize: 20 }} />
        </a>
      ) : (
        <h4 className="text-lg xl:text-2xl 2xl:text-3xl 2xl:py-4 font-[ybb] pb-4">
          {getTitle()}
        </h4>
      )}

      {/* Description */}
      <p className="DESC text-white/50 pb-4 text-sm lg:text-base 2xl:text-lg">
        {getDescription()}
      </p>

      {/* Copy link button */}
      {formattedLink && (
        <button
          className={`py-2 px-4 w-auto lg:text-md inline-flex gap-2 items-center justify-between text-nowrap border border-[#222] transition-colors duration-300 ${
            isCopied
              ? "bg-[#1A2A1A] text-white/90"
              : "bg-[#111] text-white/80 hover:bg-[#1A1A1A]"
          }`}
          onClick={handleCopy}
          disabled={isCopied}
        >
          {isCopied ? <CopySuccess size={18} /> : <Copy size={18} />}
          {isCopied ? (
            <span>{t("contact.copied")}</span>
          ) : (
            <span>{t("workSamples.copyLink")}</span>
          )}
        </button>
      )}

      {/* Custom links section */}
      {customLinks.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {customLinks.map((customLink, index) => (
            <a
              key={index}
              href={customLink.link}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-4 bg-[#111] text-white/80 hover:bg-[#1A1A1A] border border-[#222] transition-colors duration-300 inline-flex items-center gap-2"
            >
              <span>{customLink.label}</span>
              <LaunchIcon sx={{ fontSize: 16 }} />
            </a>
          ))}
        </div>
      )}

      {/* Divider */}
      <div className="DIVIDER border-t border-[#222] w-full h-0 my-4" />

      {/* Technologies section */}
      {techsArray.length > 0 && (
        <div>
          <p className="text-lg 2xl:text-2xl pb-4 font-[ybb]">
            {t("workSamples.technologies")}
          </p>
          <div className="inline-grid grid-cols-2 gap-2">
            {techsArray.map((tech) => (
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
          {t("workSamples.timeSpent")}
        </p>
        <div className="flex items-center justify-evenly h-[10vh] border-y border-[#222]">
          <div className="flex flex-col">
            <span className="text-xs lg:text-sm text-white/50">
              {t("workSamples.start")}
            </span>
            <span className="text-sm lg:text-base 2xl:text-lg">
              {getStartDate()}
            </span>
          </div>
          <div className="DIVIDER border-l border-[#222] w-1 h-full" />
          <div className="flex flex-col">
            <span className="text-xs lg:text-sm text-white/50">
              {t("workSamples.end")}
            </span>
            <span className="text-sm lg:text-base 2xl:text-lg">
              {getEndDate()}
            </span>
          </div>
        </div>
      </div>

      {/* Full description */}
      <div className="FULLDECS pt-4 text-sm lg:text-base 2xl:text-lg text-white/70">
        <p>{getDescription()}</p>
      </div>
    </div>
  );
});

export default DrawerBody;
