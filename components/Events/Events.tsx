import React from "react";
import EduCard from "./EventCard";

export type Event = {
  name: string;
  from: number;
  to?: number;
  picture: string;
  description?: string;
};

const EventData: Event[] = [
  {
    name: "دبیرستان ماندگار شهدای ادب",
    from: 1399,
    to: 1402,
    picture: "/adab.png",
    description:
      "تحصیل دوره دبیرستان در دبیرستان ماندگار شهدای ادب در رشته ریاضی فیزیک و اخذ مدرک دیپلم.",
  },
  {
    name: "دانشگاه بین المللی آزاد خوراسگان",
    from: 1402,
    picture: "/kh.webp",
    description:
      " مشغول تحصیل در رشته کامپیوتر مقطع کارشناسی در این دانشگاه هستم.",
  },
];

export default function Event() {
  return (
    <div id="events" className="bg-[url('/vectors/sec1-bgdark.svg')] bg-no-repeat bg-cover h-auto lg:h-screen 2xl:h-auto 2xl:min-h-[60vh]">
      <div className="ALL lg:w-[70vw] lg:mr-[22vw] pb-12">
        <div className="H3&P pt-[5vh] w-[80%] pr-[10vw] lg:pr-0">
          <h3 className="xl:text-4xl font-[ybb] text-white/80 self-start mb-6 text-nowrap">
            رویداد ها، مسابقات و جوایز
          </h3>
          <p className="font-[ybn] text-white/40 self-start mb-[5vh] text-wrap 2xl:text-lg">
            علاقه ی خاص و بیش از اندازه ای به هنر داشتم اما هنگام انتخاب رشته
            رفتم سمت رشته ی ریاضی و مباحث کامپیوتر و مهندسی. سوابق و مدارک
            تحصیلی من ( این بخش به مرور زمان کامل تر میشه ) :
          </p>
        </div>
        <div className="grid lg:inline-grid grid-cols-1 lg:grid-cols-2 gap-5">
          <EduCard data={EventData[0]} />
          <EduCard data={EventData[1]} />
        </div>
      </div>
    </div>
  );
}
