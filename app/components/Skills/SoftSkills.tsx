import React from "react";
import Skill from "./SoftSkill";

export default function SoftSkills() {
  return (
    <div className="w-[80%]">
      <h3 className="H3 xl:text-4xl font-[ybb] text-white/80 mb-[2.5vh] self-start text-nowrap">
        مهارت های نرم
      </h3>
      <p className="P font-[ybn] text-white/40 self-start mb-[2.5vh]  text-wrap w-[80%] 2xl:text-lg">
        مهارت های فردی ای که تا الان درونِ خودم پرورش دادم و سعی دارم طی مرورِ
        زمان بیشترشون کنم.
      </p>
      <div className="inline-grid grid-cols-2 xl:grid-cols-3 xl:min-w-[400px] gap-2 ">
        <Skill name="انگلیسی" />
        <Skill name="فارسی" />
        <Skill name="انتقاد پذیر" />
        <Skill name="به روز" />
        <Skill name="شنونده خوب" />
        <Skill name="صبور" />
      </div>
    </div>
  );
}
