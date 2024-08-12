import React from "react";
import EduCard from "./EduCard";

export type Education = {
  name: string;
  from: number;
  to?: number;
  picture: string;
  description?: string;
};

const educationData: Education[] = [
  {
    name: "دبیرستان ماندگار شهدای ادب",
    from: 1399,
    to: 1402,
    picture: "/adab.png",
    description: "ذیسیش ذدیعت شدیشدی عدتش ردشخده خشدر",
  },
  {
    name: "دانشگاه آزاد نجف آباد",
    from: 1402,
    picture: "/iaun.png",
    description: "ذیسیشذ دیعتشدی شدیعدت شردشخد هخشدر",
  },
];

export default function Education() {
  return (
    <div className="bg-[url('/vectors/sec1-bgdark.svg')] bg-no-repeat bg-cover h-auto lg:h-screen">
      <div className="ALL lg:w-[70vw] lg:mr-[22vw] pb-12">
        <div className="H3&P pt-12 w-[80%] pr-[3rem] sm:pr-[5.5rem] lg:pr-0">
          <h3 className="xl:text-4xl font-[ybb] text-white/80 self-start mb-6 text-nowrap">
            سوابق تحصیلی
          </h3>
          <p className="font-[ybn] text-white/40 self-start mb-8 text-wrap">
            علاقه ی خاص و بیش از اندازه ای به هنر داشتم اما هنگام انتخاب رشته
            رفتم سمت رشته ی ریاضی و مباحث کامپیوتر و مهندسی. سوابق و مدارک
            تحصیلی من ( این بخش به مرور زمان کامل تر میشه ) :
          </p>
        </div>
        <div className="grid lg:inline-grid grid-cols-1 lg:grid-cols-2 gap-5">
          <EduCard data={educationData[0]} />
          <EduCard data={educationData[1]} />
        </div>
      </div>
    </div>
  );
}
