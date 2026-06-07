"use client";
import React from "react";

interface Skill {
  name: string;
}

export default function SoftSkill({ name }: Skill) {
  return (
    <div className="skill-chip font-[ybn] will-animate">
      {name}
    </div>
  );
}
