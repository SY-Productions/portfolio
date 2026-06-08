"use client";
import React, { useEffect, useRef } from "react";
import Skill from "./HardSkill";
import { useLang } from "@/app/context/LanguageContext";

const SKILLS = ["Dart","Flutter","Python","Django","Fastapi","Html","Css","Js","React","Ruby","OnRails","WP"];

export default function HardSkills() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll(".will-animate").forEach((child, i) => {
            setTimeout(() => child.classList.add("in-view"), i * 45);
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
    <div ref={sectionRef} className="w-[85%] lg:ms-[22vw]">
      <h2 className="section-title mb-3">{t("skills.hardTitle")}</h2>
      <p className="font-[ybn] text-white/40 mb-6 text-wrap text-sm lg:text-base 2xl:text-lg leading-6 will-animate">
        {t("skills.hardDesc")}
      </p>
      <div className="flex flex-wrap gap-2">
        {SKILLS.map((name) => (
          <Skill key={name} name={name} />
        ))}
      </div>
    </div>
  );
}
