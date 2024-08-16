import React from "react";
import Skill from "./HardSkill";
import { SiDart } from "react-icons/si";
import { SiFlutter } from "react-icons/si";
import { SiPython } from "react-icons/si";
import { SiDjango } from "react-icons/si";
import { SiHtml5 } from "react-icons/si";
import { SiCss3 } from "react-icons/si";
import { SiFastapi } from "react-icons/si";
import { SiJavascript } from "react-icons/si";
import { SiReact } from "react-icons/si";
import { SiRuby } from "react-icons/si";
import { SiRubyonrails } from "react-icons/si";
import { SiWordpress } from "react-icons/si";

export default function HardSkills() {
  return (
    <div className="H3&P&GRID w-[80%] lg:mr-[22vw] ">
      <h3 className="H3 xl:text-4xl font-[ybb] text-white/80 self-start mb-[2.5vh] text-nowrap">
        مهارت های فنی
      </h3>
      <p className="P font-[ybn] text-white/40 self-start mb-[2.5vh] text-wrap 2xl:text-lg">
        مهارت های بخش نرم افزارِ من، شامل حوزه های اپلیکیشن موبایل، وب اپلیکشن و
        برنامه نویسی سمت سرور.
      </p>
      <div className="inline-grid grid-cols-2 xl:grid-cols-3 xl:min-w-[400px] gap-2 ">
        <Skill name="Dart" icon={<SiDart size={17} />} link="" />
        <Skill name="Flutter" icon={<SiFlutter size={17} />} link="" />
        <Skill name="Python" icon={<SiPython size={17} />} link="" />
        <Skill name="Django" icon={<SiDjango size={17} />} link="" />
        <Skill name="Fastapi" icon={<SiFastapi size={17} />} link="" />
        <Skill name="Html" icon={<SiHtml5 size={17} />} link="" />
        <Skill name="Css" icon={<SiCss3 size={17} />} link="" />
        <Skill name="Js" icon={<SiJavascript size={17} />} link="" />
        <Skill name="React" icon={<SiReact size={17} />} link="" />
        <Skill name="Ruby" icon={<SiRuby size={17} />} link="" />
        <Skill name="OnRails" icon={<SiRubyonrails size={17} />} link="" />
        <Skill name="WP" icon={<SiWordpress size={17} />} link="" />
      </div>
    </div>
  );
}
