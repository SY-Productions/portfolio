"use client";

import React, { memo, useEffect, useState } from "react";
import WorkCard from "./WorkCard";
import { API_BASE_URL } from "@/app/config";
import WorkCardSkeleton from "./WorkSkeletonCard";
import { useLang } from "@/app/context/LanguageContext";

export type Work = {
  id: number;
  name: string;
  nameEn?: string;
  nameAr?: string;
  fromYear: number;
  technos: string[];
  toYear?: number;
  picture: string;
  url: string;
  description?: string;
  descriptionEn?: string;
  descriptionAr?: string;
};

const Work = () => {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const { t, lang } = useLang();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/works`, {
          cache: "no-store",
        });
        if (!response.ok) return;
        const data = await response.json();
        if (Array.isArray(data)) setWorks(data);
      } catch (error) {
        console.error("Error fetching works:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div id="work" className="relative h-auto min-h-[60vh] lg:min-h-screen">
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#3A0D12]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 right-20 w-40 h-40 bg-[#3B070A]/10 rounded-full blur-3xl"></div>

      <div className="ALL lg:w-[70vw] lg:ms-[22vw] pb-12 relative z-10">
        <div className="H3&P pt-[5vh] w-full px-4 lg:w-[80%] lg:px-0">
          <h3 className="section-title mb-6">{t("work.title")}</h3>

          <p className="font-[ybn] text-white/60 self-start mb-[5vh] text-wrap 2xl:text-lg leading-7">
            {t("work.description")}
          </p>
        </div>

        {loading && (
          <div className="grid lg:inline-grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 lg:px-0">
            {[0, 1].map((work) => (
              <WorkCardSkeleton key={work} />
            ))}
          </div>
        )}
        {!loading && works.length > 0 && (
          <div className="grid lg:inline-grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 lg:px-0">
            {works.map((data) => (
              <WorkCard key={data.url} work={data} lang={lang} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Work);
