"use client";
import React from "react";
import { SiDart, SiFlutter, SiPython, SiDjango, SiHtml5, SiCss3, SiFastapi, SiJavascript, SiReact, SiRuby, SiRubyonrails, SiWordpress } from "react-icons/si";
import { BsLink } from "react-icons/bs";

interface Skill {
  name: string;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Flutter:  <SiFlutter size={14} />,
  Django:   <SiDjango size={14} />,
  React:    <SiReact size={14} />,
  Fastapi:  <SiFastapi size={14} />,
  Python:   <SiPython size={14} />,
  WP:       <SiWordpress size={14} />,
  OnRails:  <SiRubyonrails size={14} />,
  Html:     <SiHtml5 size={14} />,
  Css:      <SiCss3 size={14} />,
  Ruby:     <SiRuby size={14} />,
  Dart:     <SiDart size={14} />,
  Js:       <SiJavascript size={14} />,
};

const DISPLAY_NAMES: Record<string, string> = {
  Html: "HTML", Css: "CSS", Js: "JavaScript", WP: "WordPress", OnRails: "Rails",
  Dart: "Dart", Flutter: "Flutter", Python: "Python", Django: "Django",
  Fastapi: "FastAPI", React: "React", Ruby: "Ruby",
};

export default function HardSkill({ name }: Skill) {
  const icon = ICON_MAP[name] ?? <BsLink size={14} />;
  const label = DISPLAY_NAMES[name] ?? name;

  return (
    <div className="skill-chip font-[inter] will-animate">
      <span className="opacity-60">{icon}</span>
      {label}
    </div>
  );
}
