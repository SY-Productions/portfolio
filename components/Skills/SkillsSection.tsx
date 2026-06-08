"use client";
import React from "react";
import HardSkills from "./HardSkills";
import SoftSkills from "./SoftSkills";

export default function Skills() {
  return (
    <div
      id="skills"
      className="relative section-bg bg-no-repeat bg-cover h-auto overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/0 backdrop-blur-sm" />
      <div
        className="absolute top-10 start-20 w-64 h-64 bg-[#3A0D12]/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: "8s" }}
      />
      <div
        className="absolute bottom-10 end-20 w-80 h-80 bg-[#3B070A]/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: "12s", animationDelay: "3s" }}
      />

      <div className="lg:w-[70vw] lg:ms-[22vw] pb-12 relative z-10">
        <div className="flex flex-col lg:flex-row pt-[5vh] lg:gap-[5vw] gap-y-14 px-4 lg:px-0">
          <div className="HARD lg:flex-1 flex justify-center">
            <HardSkills />
          </div>
          <div className="SOFT lg:flex-1 flex justify-center">
            <SoftSkills />
          </div>
        </div>
      </div>
    </div>
  );
}
