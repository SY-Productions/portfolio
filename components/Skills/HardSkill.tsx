"use client";
import React from "react";
import { SiDart, SiFlutter, SiPython, SiDjango, SiHtml5, SiCss3, SiFastapi, SiJavascript, SiReact, SiRuby, SiRubyonrails, SiWordpress } from "react-icons/si";
import { BsLink } from "react-icons/bs";

interface Skill {
  name: string;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Flutter:  <SiFlutter size={14} aria-hidden="true" />,
  Django:   <SiDjango size={14} aria-hidden="true" />,
  React:    <SiReact size={14} aria-hidden="true" />,
  Fastapi:  <SiFastapi size={14} aria-hidden="true" />,
  Python:   <SiPython size={14} aria-hidden="true" />,
  WP:       <SiWordpress size={14} aria-hidden="true" />,
  OnRails:  <SiRubyonrails size={14} aria-hidden="true" />,
  Html:     <SiHtml5 size={14} aria-hidden="true" />,
  Css:      <SiCss3 size={14} aria-hidden="true" />,
  Ruby:     <SiRuby size={14} aria-hidden="true" />,
  Dart:     <SiDart size={14} aria-hidden="true" />,
  Js:       <SiJavascript size={14} aria-hidden="true" />,
};

const DISPLAY_NAMES: Record<string, string> = {
  Html: "HTML", Css: "CSS", Js: "JavaScript", WP: "WordPress", OnRails: "Rails",
  Dart: "Dart", Flutter: "Flutter", Python: "Python", Django: "Django",
  Fastapi: "FastAPI", React: "React", Ruby: "Ruby",
};

export default function HardSkill({ name }: Skill) {
  const icon = ICON_MAP[name] ?? <BsLink size={14} aria-hidden="true" />;
  const label = DISPLAY_NAMES[name] ?? name;

  return (
    <div className="skill-chip font-[inter] will-animate">
      <span className="opacity-60">{icon}</span>
      {label}
    </div>
  );
}
