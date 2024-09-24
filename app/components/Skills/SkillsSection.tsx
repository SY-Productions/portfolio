import React from "react";
import HardSkills from "./HardSkills";
import SoftSkills from "./SoftSkills";
export default function Skills() {
  return (
    <div
      id="skills"
      className="flex flex-col lg:flex-row pt-[5vh] pb-[7vh] lg:gap-[5vw] gap-y-16"
    >
      <div className="HARD flex justify-center lg:basis-1/2">
        <HardSkills />
      </div>
      <div className="SOFT flex justify-center lg:basis-1/2">
        <SoftSkills />
      </div>
    </div>
  );
}
