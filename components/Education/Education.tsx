import React, { memo } from "react";
import EduCard from "./EduCard";
import db from '@/public/db.json';

export type Education = {
  name: string;
  from: number;
  to?: number;
  picture: string;
  description?: string;
};

// Memoized for better performance
const Education = memo(function Education() {
  return (
    <div
      id="education"
      className="relative bg-[url('/vectors/sec1-bgdark.svg')] bg-no-repeat bg-cover h-auto lg:h-screen 2xl:h-auto 2xl:min-h-[60vh] overflow-hidden"
    >
      {/* Glass gradient overlay for modern effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-black/0 backdrop-blur-sm"></div>

      {/* Animated decorative background elements */}
      <div
        className="absolute top-1/4 left-0 w-64 h-64 bg-[#7B2CBF]/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: "8s" }}
      ></div>
      <div
        className="absolute bottom-1/4 right-0 w-80 h-80 bg-[#8C9EFF]/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: "12s", animationDelay: "2s" }}
      ></div>

      <div className="ALL lg:w-[70vw] lg:mr-[22vw] pb-12 relative z-10">
        <div className="H3&P pt-[5vh] w-[80%] pr-[10vw] lg:pr-0">
          <h3 className="xl:text-4xl font-[ybb] text-white/90 self-start mb-6 text-nowrap relative inline-block">
            سوابق تحصیلی
            <span className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-[#7B2CBF] to-[#8C9EFF]"></span>
          </h3>
          <p className="font-[ybn] text-white/60 self-start mb-[5vh] text-wrap 2xl:text-lg leading-7">
            علاقه ی خاص و بیش از اندازه ای به هنر داشتم اما هنگام انتخاب رشته
            رفتم سمت رشته ی ریاضی و مباحث کامپیوتر و مهندسی. سوابق و مدارک
            تحصیلی من ( این بخش به مرور زمان کامل تر میشه ) :
          </p>
        </div>

        {/* Card grid with enhanced spacing */}
        <div className="grid lg:inline-grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 lg:px-0">
          {db.Educations.map((edu) => (
            <EduCard key={edu.description} data={{ ...edu, to: edu.to ?? undefined }} />
          ))}
        </div>
      </div>

      {/* Subtle border bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#8C9EFF]/30 to-[#7B2CBF]/30"></div>
    </div>
  );
});

export default Education;
