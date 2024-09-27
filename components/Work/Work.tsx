import React from "react";
import EduCard from "./WorkCard";

export type Work = {
  name: string;
  from: number;
  technos:string[];
  to?: number;
  picture: string;
  url:string;
  description?: string;
};

const WorkData: Work[] = [
  {
    name: "شرکت نشاط رخ آرا | NeshatRokh",
    technos:['Flutter','Dart'],
    from: 1403,
    to: 1403,
    picture: "/neshatrokh.png",
    url:'https:/www.neshatrokh.com',
    description:
      "تجربه کار به مدت 6 ماه و به صورت فریلنسری با شرکت نشاط رخ آرا داشتم.",
  },
];

export default function Work() {
  return (
    <div id="work" className="h-auto lg:h-screen 2xl:h-auto 2xl:min-h-[60vh]">
      <div className="ALL lg:w-[70vw] lg:mr-[22vw] pb-12">
        <div className="H3&P pt-[5vh] w-[80%] pr-[10vw] lg:pr-0">
          <h3 className="xl:text-4xl font-[ybb] text-white/80 self-start mb-6 text-nowrap">
            سوابق کاری
          </h3>
          <p className="font-[ybn] text-white/40 self-start mb-[5vh] text-wrap 2xl:text-lg">
            در طول سال‌ها، تجربیات شغلی متفاوتی رو کسب کرده‌م که هر کدوم به شکل
            خاصی به رشد و پیشرفت من کمک کردند. از ابتدای کارم، به دنبال
            فرصت‌های چالش‌برانگیز بودم که توانایی‌هام رو تقویت کنن و در
            پروژه‌های مختلف شرکت کرده‌ام. سوابق کاری من (این بخش به مرور زمان
            کامل‌تر می‌شود):
          </p>
        </div>
        <div className="grid lg:inline-grid grid-cols-1 lg:grid-cols-2 gap-5">

            {WorkData.map((data)=>
 <EduCard key={data.url} data={data} />
            )}

        </div>
      </div>
    </div>
  );
}
