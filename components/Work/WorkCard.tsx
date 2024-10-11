'use client'

import React, { useEffect, useState } from "react";
import { Work } from "./Work";
import Image from "next/image";
import { Calendar } from "iconsax-react";
import Skill from "../Skills/HardSkill";
import Link from "next/link";

export default function WorkCard({ data }: { data: Work }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (mounted)
    return (
      <Link href={data.url} legacyBehavior passHref>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="group cursor-pointer w-[80vw] lg:w-[30vw] min-w-[150px] h-auto min-h-[12rem] bg-white/5 hover:bg-white/10 hover:backdrop-blur-none hover:scale-105 hover:border-white/10 transition-all duration-300 ease-out border border-white/10 backdrop-blur-3xl mx-auto flex flex-col font-[ybn]"
        >
          <div className="PIC&CAlENDAR flex justify-between items-center w-full m-4">
            <Image
              className="aspect-square rounded-md"
              width={60}
              height={60}
              src={data.picture}
              alt={data.name}
            />
            <span className="absolute left-[6rem] rounded-full w-12 h-12 flex items-center justify-center bg-gray-700">
              <Calendar size={20} color="white" />
            </span>
            <span className="absolute left-4 z-10 bg-gray-700 rounded-full flex items-center justify-center h-8 w-24 text-xs text-white/70">
              {`${data.from} تا ${data.to ? data.to : "اکنون"}`}
            </span>
          </div>
          <div className="NAME&DESC flex flex-col px-4">
            <div className="text-lg py-2 text-white">{data.name}</div>
            <div className="text-sm pb-4 text-gray-400">{data.description}</div>
          </div>
          <div className="p-4 flex flex-row-reverse gap-2">
            {data.technos.map((techno) => (
              <Skill key={techno} name={techno} />
            ))}
          </div>
        </a>
      </Link>
    );
}
