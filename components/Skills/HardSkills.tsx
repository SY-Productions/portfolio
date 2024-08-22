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
        <Skill name="Dart" link="" />
        <Skill name="Flutter" link="" />
        <Skill name="Python" link="" />
        <Skill name="Django" link="" />
        <Skill name="Fastapi" link="" />
        <Skill name="Html" link="" />
        <Skill name="Css" link="" />
        <Skill name="Js" link="" />
        <Skill name="React" link="" />
        <Skill name="Ruby" link="" />
        <Skill name="OnRails" link="" />
        <Skill name="WP" link="" />
      </div>
    </div>
  );
}
