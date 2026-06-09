"use client";

import React, { useState, useCallback, memo, useMemo } from "react";
import LaunchIcon from "@mui/icons-material/Launch";
import { Copy, CopySuccess } from "iconsax-react";
import Skill from "@/components/Skills/HardSkill";
import { useWorkSample } from "../WorkSampleContext";
import { useLang } from "@/app/context/LanguageContext";
import { useTheme } from "@/app/context/ThemeContext";

interface CustomLink {
  label: string;
  link: string;
}

const DrawerBody = memo(function DrawerBody() {
  const { getCurrentSample } = useWorkSample();
  const { lang, t } = useLang();
  const { theme } = useTheme();
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
    if (lang === "ar" && currentSample.arTitle) return currentSample.arTitle;
    return currentSample.faTitle ?? "";
  };

  const getRawDescription = () => {
    if (!currentSample) return "";
    if (lang === "en" && currentSample.enDescription) return currentSample.enDescription;
    if (lang === "ar" && currentSample.arDescription) return currentSample.arDescription;
    return currentSample.faDescription ?? "";
  };

  const getShortDescription = () => {
    const desc = getRawDescription();
    const idx = desc.indexOf("%g%");
    return idx !== -1 ? desc.slice(0, idx).trim() : "";
  };

  const getDetailDescription = () => {
    const desc = getRawDescription();
    const idx = desc.indexOf("%g%");
    return idx !== -1 ? desc.slice(idx + 3).trim() : desc.trim();
  };

  // Language-aware dates
  const getStartDate = () => {
    if (!currentSample) return "";
    if (lang === "en" && currentSample.enStartDate)
      return currentSample.enStartDate;
    if (lang === "ar" && currentSample.arStartDate)
      return currentSample.arStartDate;
    return currentSample.faStartDate ?? "";
  };

  const getEndDate = () => {
    if (!currentSample) return "";
    if (lang === "en" && currentSample.enEndDate)
      return currentSample.enEndDate;
    if (lang === "ar" && currentSample.arEndDate)
      return currentSample.arEndDate;
    return currentSample.faEndDate ?? "";
  };

  const handleCopy = useCallback(() => {
    if (!currentSample) return;
    const url = `${window.location.origin}/?ws=${currentSample.id}&lang=${lang}&theme=${theme}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  }, [currentSample, lang, theme]);

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

      {/* Client */}
      {currentSample.client && (
        <p className="text-white/35 text-xs pb-3">
          {t("workSamples.client")}: {currentSample.client}
        </p>
      )}

      {/* Short description */}
      {getShortDescription() && (
        <p className="DESC text-white/50 pb-4 text-sm lg:text-base 2xl:text-lg">
          {getShortDescription()}
        </p>
      )}

      {/* Copy link + store links */}
      <div className="flex flex-wrap gap-2">
        <button
          className={`py-2 px-4 inline-flex gap-2 items-center text-nowrap border border-[#222] transition-colors duration-300 ${
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

        {customLinks.map((customLink, index) => (
          <a
            key={index}
            href={customLink.link}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 px-4 bg-[#111] text-white/80 hover:bg-[#1A1A1A] border border-[#222] transition-colors duration-300 inline-flex items-center gap-2 text-nowrap"
          >
            <span>{customLink.label}</span>
            <LaunchIcon sx={{ fontSize: 16 }} />
          </a>
        ))}
      </div>

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

      {/* Detail description */}
      <div className="FULLDECS pt-4 text-sm lg:text-base 2xl:text-lg text-white/70">
        <p>{getDetailDescription()}</p>
      </div>
    </div>
  );
});

export default DrawerBody;
