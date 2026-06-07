"use client";

import React, { memo, useEffect, useState } from "react";
import EventCard from "./EventCard";
import { API_BASE_URL } from "@/app/config";
import EventCardSkeleton from "./EventSkeletonCard";
import { useLang } from "@/app/context/LanguageContext";
import { useTheme } from "@/app/context/ThemeContext";

export type Event = {
  id: number;
  name: string;
  nameEn?: string;
  nameAr?: string;
  date: string;
  picture: string;
  attachment: string;
  description?: string;
  descriptionEn?: string;
  descriptionAr?: string;
};

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { t, lang } = useLang();
  const { theme } = useTheme();

  const bgSvg =
    theme === "light"
      ? "bg-[url('/vectors/sec1-bglight.svg')]"
      : "bg-[url('/vectors/sec1-bgdark.svg')]";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/events`, {
          cache: "no-store",
        });
        if (!response.ok) return;
        const data = await response.json();
        if (Array.isArray(data)) setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      id="events"
      className={`relative ${bgSvg} bg-no-repeat bg-cover h-auto`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/0 backdrop-blur-sm"></div>

      <div
        className="absolute top-20 left-10 w-64 h-64 bg-[#3A0D12]/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: "10s" }}
      ></div>
      <div
        className="absolute bottom-40 right-20 w-80 h-80 bg-[#3B070A]/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: "15s", animationDelay: "3s" }}
      ></div>

      <div className="ALL lg:w-[70vw] lg:ms-[22vw] pb-12 relative z-10">
        <div className="H3&P pt-[5vh] w-[80%] ps-[10vw] lg:ps-0">
          <h3 className="section-title mb-6">{t("events.title")}</h3>
          <p className="font-[ybn] text-white/60 self-start mb-[5vh] text-wrap 2xl:text-lg leading-7">
            {t("events.description")}
          </p>
        </div>
        {loading && (
          <div className="grid lg:inline-grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 lg:px-0">
            {[0, 1].map((event) => (
              <EventCardSkeleton key={event} />
            ))}
          </div>
        )}
        {!loading && events.length > 0 && (
          <div className="grid lg:inline-grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 lg:px-0">
            {events.map((event) => (
              <EventCard key={event.attachment} event={event} lang={lang} />
            ))}
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#3A0D12]/30 to-[#3B070A]/30"></div>
    </div>
  );
};

export default memo(Events);
