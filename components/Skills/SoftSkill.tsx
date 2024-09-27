import Link from "next/link";
import React from "react";
interface Skill {
  name: string;
}
export default function Skill({ name }: Skill) {
  return (
    <a
      dir="rtl"
      className="py-1 px-3 font-[ybn] font-medium text-nowrap flex justify-center items-center bg-d text-white/80 w-32 hover:scale-105 hover:bg-d hover:shadow-md rounded-sm transition-all duration-100 cursor-pointer"
    >
      {name}
    </a>
  );
}
