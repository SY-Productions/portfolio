"use client";

import React, { memo, useEffect, useRef, useState } from "react";
import EduCard from "./EduCard";
import { API_BASE_URL } from "@/app/config";
import EduCardSkeleton from "./EduSkeletonCard";
import { useLang } from "@/app/context/LanguageContext";
import { useTheme } from "@/app/context/ThemeContext";

export type Education = {
  id: number;
  name: string;
  nameEn?: string;
  nameAr?: string;
  fromYear: number;
  toYear?: number;
  picture: string;
  description?: string;
  descriptionEn?: string;
  descriptionAr?: string;
};

const Education = () => {
  const [educations, setEducations] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const { t, lang } = useLang();
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/education`, {
          cache: "no-store",
        });
        if (!response.ok) return;
        const data = await response.json();
        if (Array.isArray(data)) setEducations(data);
      } catch (error) {
        console.error("Error fetching educations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll(".will-animate").forEach((child, i) => {
            setTimeout(() => child.classList.add("in-view"), i * 80);
          });
          el.querySelector(".section-title")?.classList.add("in-view");
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [educations]);

  return (
    <div
      ref={sectionRef}
      id="education"
      className={`relative section-bg bg-no-repeat bg-cover h-auto lg:h-screen 2xl:h-auto 2xl:min-h-[60vh] overflow-hidden`}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-black/0 backdrop-blur-sm"></div>

      <div
        className="absolute top-1/4 left-0 w-64 h-64 bg-[#3B070A]/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: "8s" }}
      ></div>
      <div
        className="absolute bottom-1/4 right-0 w-80 h-80 bg-[#3A0D12]/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: "12s", animationDelay: "2s" }}
      ></div>

      <div className="ALL lg:w-[70vw] lg:ms-[22vw] pb-12 relative z-10">
        <div className="H3&P pt-[5vh] w-full px-4 lg:w-[80%] lg:px-0">
          <h2 className="section-title mb-6">{t("education.title")}</h2>
          <p className="font-[ybn] text-white/60 self-start mb-[5vh] text-wrap 2xl:text-lg leading-7">
            {t("education.description")}
          </p>
        </div>
        {loading && (
          <div className="grid lg:inline-grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 lg:px-0">
            {[0, 1].map((edu) => (
              <EduCardSkeleton key={edu} />
            ))}
          </div>
        )}
        {!loading && educations.length > 0 && (
          <div className="grid lg:inline-grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 lg:px-0">
            {educations.map((edu) => (
              <EduCard key={edu.id} data={edu} lang={lang} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Education);
