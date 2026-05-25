"use client";
import React from "react";
import Skill from "./SoftSkill";
import { useLang } from "@/app/context/LanguageContext";

export default function SoftSkills() {
  const { t } = useLang();

  return (
    <div className="w-[80%]">
      <h3 className="H3 xl:text-4xl font-[ybb] text-white/80 mb-[2.5vh] self-start text-nowrap">
        {t("skills.softTitle")}
      </h3>
      <p className="P font-[ybn] text-white/40 self-start mb-[2.5vh] text-wrap w-[80%] 2xl:text-lg">
        {t("skills.softDesc")}
      </p>
      <div className="inline-grid grid-cols-2 xl:grid-cols-3 xl:min-w-[400px] gap-2">
        <Skill name={t("skills.soft.english")} />
        <Skill name={t("skills.soft.persian")} />
        <Skill name={t("skills.soft.criticalFeedback")} />
        <Skill name={t("skills.soft.upToDate")} />
        <Skill name={t("skills.soft.goodListener")} />
        <Skill name={t("skills.soft.patient")} />
      </div>
    </div>
  );
}
