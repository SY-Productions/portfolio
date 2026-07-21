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
    <div id="work" className="relative section-bg bg-no-repeat bg-cover h-auto overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-black/0 backdrop-blur-sm" />
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#3A0D12]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-40 right-20 w-40 h-40 bg-[#3B070A]/10 rounded-full blur-3xl" />

      <div className="ALL section-shell pb-12">
        <div className="H3&P pt-[5vh] w-full lg:w-[80%]">
          <h2 className="section-title mb-6">{t("work.title")}</h2>

          <p className="font-[ybn] text-white/60 self-start mb-[5vh] text-wrap 2xl:text-lg leading-7">
            {t("work.description")}
          </p>
        </div>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1].map((work) => (
              <WorkCardSkeleton key={work} />
            ))}
          </div>
        )}
        {!loading && works.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
