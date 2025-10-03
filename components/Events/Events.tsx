"use client";

import React, { memo, useEffect, useState } from "react";
import EventCard from "./EventCard";
import { API_BASE_URL } from "@/app/config";
import EventCardSkeleton from "./EventSkeletonCard";

export type Event = {
  id: number;
  name: string;
  date: string;
  picture: string;
  attachment: string;
  description?: string;
};

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/events`, {
          cache: "no-store",
        });
        const data = await response.json();
        setEvents(data);
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
      className="relative bg-[url('/vectors/sec1-bgdark.svg')] bg-no-repeat bg-cover h-auto"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/0 backdrop-blur-sm"></div>

      <div
        className="absolute top-20 left-10 w-64 h-64 bg-[#8C9EFF]/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: "10s" }}
      ></div>
      <div
        className="absolute bottom-40 right-20 w-80 h-80 bg-[#0F3D3E]/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: "15s", animationDelay: "3s" }}
      ></div>

      <div className="ALL lg:w-[70vw] lg:mr-[22vw] pb-12 relative z-10">
        <div className="H3&P pt-[5vh] w-[80%] pr-[10vw] lg:pr-0">
          <h3 className="xl:text-4xl font-[ybb] text-white/80 self-start mb-6 text-nowrap relative inline-block">
            رویداد ها، مسابقات و جوایز
            <span className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-[#0F3D3E] to-[#8C9EFF]"></span>
          </h3>
          <p className="font-[ybn] text-white/60 self-start mb-[5vh] text-wrap 2xl:text-lg leading-7">
            لیست رویدادها و مسابقاتی که در آن‌ها حضور داشته‌ام (این بخش به مرور
            زمان کامل‌تر خواهد شد):
          </p>
        </div>
        {loading && (
          <div className="grid lg:inline-grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 lg:px-0">
            {[0, 1].map((event) => (
              <EventCardSkeleton key={event} />
            ))}
          </div>
        )}
        {!loading && events.length && (
          <div className="grid lg:inline-grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 lg:px-0">
            {events.map((event) => (
              <EventCard key={event.attachment} event={event} />
            ))}
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#8C9EFF]/30 to-[#0F3D3E]/30"></div>
    </div>
  );
};

export default memo(Events);
