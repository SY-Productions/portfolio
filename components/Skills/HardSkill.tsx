"use client";
import React from "react";
import {
  SiDart, SiFlutter, SiPython, SiDjango, SiHtml5, SiCss3, SiFastapi,
  SiJavascript, SiReact, SiRuby, SiRubyonrails, SiWordpress,
  SiNextdotjs, SiTypescript, SiTailwindcss, SiPrisma, SiFramer,
  SiGreensock, SiThreedotjs, SiFirebase, SiMdx, SiSqlite, SiFigma, SiGit,
} from "react-icons/si";
import { TbAtom2, TbWebhook, TbStack2, TbBox, TbNetwork, TbBrandFlutter } from "react-icons/tb";
import { BsLink } from "react-icons/bs";

interface Skill {
  name: string;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  // Core
  Flutter:      <SiFlutter     size={14} aria-hidden="true" />,
  Dart:         <SiDart        size={14} aria-hidden="true" />,
  Python:       <SiPython      size={14} aria-hidden="true" />,
  Django:       <SiDjango      size={14} aria-hidden="true" />,
  React:        <SiReact       size={14} aria-hidden="true" />,
  Ruby:         <SiRuby        size={14} aria-hidden="true" />,
  OnRails:      <SiRubyonrails size={14} aria-hidden="true" />,
  Html:         <SiHtml5       size={14} aria-hidden="true" />,
  Css:          <SiCss3        size={14} aria-hidden="true" />,
  Js:           <SiJavascript  size={14} aria-hidden="true" />,
  WP:           <SiWordpress   size={14} aria-hidden="true" />,
  WordPress:    <SiWordpress   size={14} aria-hidden="true" />,
  // FastAPI — multiple casings in use
  Fastapi:      <SiFastapi     size={14} aria-hidden="true" />,
  FastAPI:      <SiFastapi     size={14} aria-hidden="true" />,
  FastApi:      <SiFastapi     size={14} aria-hidden="true" />,
  // Web / TS
  NextJs:       <SiNextdotjs   size={14} aria-hidden="true" />,
  "Next.js":    <SiNextdotjs   size={14} aria-hidden="true" />,
  TypeScript:   <SiTypescript  size={14} aria-hidden="true" />,
  TailwindCSS:  <SiTailwindcss size={14} aria-hidden="true" />,
  Prisma:       <SiPrisma      size={14} aria-hidden="true" />,
  FramerMotion: <SiFramer      size={14} aria-hidden="true" />,
  GSAP:         <SiGreensock   size={14} aria-hidden="true" />,
  ThreeJs:      <SiThreedotjs  size={14} aria-hidden="true" />,
  Firebase:     <SiFirebase    size={14} aria-hidden="true" />,
  MDX:          <SiMdx         size={14} aria-hidden="true" />,
  SQLite:       <SiSqlite      size={14} aria-hidden="true" />,
  Figma:        <SiFigma       size={14} aria-hidden="true" />,
  Git:          <SiGit         size={14} aria-hidden="true" />,
  // Flutter ecosystem — no official icons
  Riverpod:     <TbAtom2       size={14} aria-hidden="true" />,
  Bloc:         <TbStack2      size={14} aria-hidden="true" />,
  BLoC:         <TbStack2      size={14} aria-hidden="true" />,
  GetX:         <TbBrandFlutter size={14} aria-hidden="true" />,
  // Other
  WebSocket:    <TbWebhook     size={14} aria-hidden="true" />,
  Zustand:      <TbBox         size={14} aria-hidden="true" />,
  Retrofit:     <TbNetwork     size={14} aria-hidden="true" />,
};

const DISPLAY_NAMES: Record<string, string> = {
  Html: "HTML", Css: "CSS", Js: "JavaScript", WP: "WordPress",
  OnRails: "Rails", Dart: "Dart", Flutter: "Flutter", Python: "Python",
  Django: "Django", Fastapi: "FastAPI", FastAPI: "FastAPI", FastApi: "FastAPI",
  React: "React", Ruby: "Ruby", NextJs: "Next.js", "Next.js": "Next.js",
  TypeScript: "TypeScript", TailwindCSS: "Tailwind", Prisma: "Prisma",
  FramerMotion: "Framer", GSAP: "GSAP", ThreeJs: "Three.js",
  Firebase: "Firebase", MDX: "MDX", SQLite: "SQLite", Figma: "Figma",
  Git: "Git", Riverpod: "Riverpod", Bloc: "BLoC", BLoC: "BLoC",
  GetX: "GetX", WebSocket: "WebSocket", Zustand: "Zustand",
  Retrofit: "Retrofit", WordPress: "WordPress",
};

export default function HardSkill({ name }: Skill) {
  const icon = ICON_MAP[name] ?? <BsLink size={14} aria-hidden="true" />;
  const label = DISPLAY_NAMES[name] ?? name;

  return (
    <div className="skill-chip font-[inter]">
      <span className="opacity-60">{icon}</span>
      {label}
    </div>
  );
}
