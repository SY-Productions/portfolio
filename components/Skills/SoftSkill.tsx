import React from "react";

interface Skill {
  name: string;
}

export default function Skill({ name }: Skill) {
  return (
    <a
      dir="rtl"
      className="py-1 px-3 font-[ybn] font-medium text-nowrap flex justify-center items-center bg-[#111] border border-[#222] text-white/80 w-32 hover:border-[#7B2CBF]/30 transition-all duration-200 cursor-pointer"
    >
      {name}
    </a>
  );
}
