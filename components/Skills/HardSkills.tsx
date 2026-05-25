"use client";
import React from "react";
import Skill from "./HardSkill";
import { useLang } from "@/app/context/LanguageContext";

export default function HardSkills() {
  const { t } = useLang();

  return (
    <div className="H3&P&GRID w-[80%] lg:ms-[22vw]">
      <h3 className="H3 xl:text-4xl font-[ybb] text-white/80 self-start mb-[2.5vh] text-nowrap">
        {t("skills.hardTitle")}
      </h3>
      <p className="P font-[ybn] text-white/40 self-start mb-[2.5vh] text-wrap 2xl:text-lg">
        {t("skills.hardDesc")}
      </p>
      <div className="inline-grid grid-cols-2 xl:grid-cols-3 xl:min-w-[400px] gap-2">
        <Skill name="Dart" />
        <Skill name="Flutter" />
        <Skill name="Python" />
        <Skill name="Django" />
        <Skill name="Fastapi" />
        <Skill name="Html" />
        <Skill name="Css" />
        <Skill name="Js" />
        <Skill name="React" />
        <Skill name="Ruby" />
        <Skill name="OnRails" />
        <Skill name="WP" />
      </div>
    </div>
  );
}
