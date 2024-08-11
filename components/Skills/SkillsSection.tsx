import React from "react";
import HardSkills from "./HardSkills";
import SoftSkills from "./SoftSkills";
export default function Skills() {
  return (
    <div className="flex flex-col lg:flex-row mt-12 mb-16 lg:gap-10 gap-y-16">
      <div className="HARD flex justify-center lg:basis-1/2">
        <HardSkills />
      </div>
      <div className="SOFT flex justify-center lg:basis-1/2">
        <SoftSkills />
      </div>
    </div>
  );
}
