import React from "react";
import SideBar from "../components/SideBar";
import AboutMe from "../components/AboutMe";
import Skills from "../components/Skills/SkillsSection";
import WorkSamples from "../components/WorkSamples/WorkSamples";
import Education from "../components/Education";
import CallMe from "../components/CallMe";
import NavBarForMobile from "@/components/NavBarForMobile";
import LookingProgrammer from "@/components/LookingProgrammer";

export default function page() {
  return (
    <>
      <SideBar />
      <main>
        <NavBarForMobile />
        <AboutMe />
        <Skills />
        <WorkSamples />
        <LookingProgrammer />
        <Education />
        <CallMe />
      </main>
    </>
  );
}
