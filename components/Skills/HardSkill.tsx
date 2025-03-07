import React from "react";
import { BsLink } from "react-icons/bs";
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

interface Skill {
  name: string;
}

export default function Skill({ name }: Skill) {
  function getIcon() {
    switch (name) {
      case "Flutter":
        return <SiFlutter size={17} />;
      case "Django":
        return <SiDjango size={17} />;
      case "React":
        return <SiReact size={17} />;
      case "Fastapi":
        return <SiFastapi size={17} />;
      case "Python":
        return <SiPython size={17} />;
      case "WP":
        return <SiWordpress size={17} />;
      case "OnRails":
        return <SiRubyonrails size={17} />;
      case "Html":
        return <SiHtml5 size={17} />;
      case "Css":
        return <SiCss3 size={17} />;
      case "Ruby":
        return <SiRuby size={17} />;
      case "Dart":
        return <SiDart size={17} />;
      case "Js":
        return <SiJavascript size={17} />;
      default:
        return <BsLink size={17} />;
    }
  }

  // Modernized styles without being overly green or glassy
  return (
    <div
      dir="rtl"
      className="py-1 px-3 font-[inter] font-medium text-nowrap flex justify-between items-center bg-[#111] border border-[#222] text-white/80 w-32 hover:border-[#37B13B]/30 transition-all duration-200"
    >
      {name}
      <span className="text-white/60">{getIcon()}</span>
    </div>
  );
}
