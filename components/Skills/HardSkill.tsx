import Link from "next/link";
import React from "react";
interface Skill {
  name: string;
  icon?: JSX.Element;
  link?: string;
}
export default function Skill({ name, icon, link }: Skill) {
  return (
    <Link
      dir="rtl"
      className="py-1 px-3 font-[inter] font-medium text-nowrap flex justify-between items-center bg-b text-white/80 w-32 hover:scale-105 hover:bg-b hover:shadow-md rounded-sm transition-all duration-100"
      href={link ? link : "/"}
      target={link ? "_blank" : "_self"}
    >
      {icon}
      {name}
    </Link>
  );
}
