"use client";
import React, { useEffect, useRef } from "react";
import Skill from "./SoftSkill";
import { useLang } from "@/app/context/LanguageContext";

export default function SoftSkills() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);

  const softSkillKeys = [
    "skills.soft.english",
    "skills.soft.persian",
    "skills.soft.criticalFeedback",
    "skills.soft.upToDate",
    "skills.soft.goodListener",
    "skills.soft.patient",
  ];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll(".will-animate").forEach((child, i) => {
            setTimeout(() => child.classList.add("in-view"), i * 50);
          });
          el.querySelector(".section-title")?.classList.add("in-view");
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="w-[85%]">
      <h3 className="section-title mb-3">{t("skills.softTitle")}</h3>
      <p className="font-[ybn] text-white/40 mb-6 text-wrap text-sm lg:text-base 2xl:text-lg leading-6 will-animate">
        {t("skills.softDesc")}
      </p>
      <div className="flex flex-wrap gap-2">
        {softSkillKeys.map((key, i) => (
          <Skill key={key} name={t(key)} />
        ))}
      </div>
    </div>
  );
}
