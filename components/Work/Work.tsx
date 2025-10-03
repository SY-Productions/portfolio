"use client";

import React, { memo, useEffect, useState } from "react";
import WorkCard from "./WorkCard";
import { API_BASE_URL } from "@/app/config";
import WorkCardSkeleton from "./WorkSkeletonCard";

export type Work = {
  id: number;
  name: string;
  fromYear: number;
  technos: string[];
  toYear?: number;
  picture: string;
  url: string;
  description?: string;
};

const Work = () => {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/works`, {
          cache: "no-store",
        });
        const data = await response.json();
        setWorks(data);
      } catch (error) {
        console.error("Error fetching works:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      id="work"
      className="h-auto lg:h-screen 2xl:h-auto 2xl:min-h-[60vh] relative"
    >
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#8C9EFF]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 right-20 w-40 h-40 bg-[#0F3D3E]/10 rounded-full blur-3xl"></div>

      <div className="ALL lg:w-[70vw] lg:mr-[22vw] pb-12 relative z-10">
        <div className="H3&P pt-[5vh] w-[80%] pr-[10vw] lg:pr-0">
          <h3 className="xl:text-4xl font-[ybb] text-white/80 self-start mb-6 text-nowrap relative inline-block">
            سوابق کاری
            <span className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-[#0F3D3E] to-[#8C9EFF]"></span>
          </h3>

          <p className="font-[ybn] text-white/60 self-start mb-[5vh] text-wrap 2xl:text-lg leading-7">
            در طول سال‌ها، تجربیات شغلی متفاوتی رو کسب کرده‌م که هر کدوم به شکل
            خاصی به رشد و پیشرفت من کمک کردند. از ابتدای کارم، به دنبال فرصت‌های
            چالش‌برانگیز بودم که توانایی‌هام رو تقویت کنن و در پروژه‌های مختلف
            شرکت کرده‌ام. سوابق کاری من (این بخش به مرور زمان کامل‌تر می‌شود):
          </p>
        </div>

        {loading && (
          <div className="grid lg:inline-grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 lg:px-0">
            {[0, 1].map((work) => (
              <WorkCardSkeleton key={work} />
            ))}
          </div>
        )}
        {!loading && works.length && (
          <div className="grid lg:inline-grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 lg:px-0">
            {works.map((data) => (
              <WorkCard key={data.url} work={data} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Work);
