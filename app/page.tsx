import React from "react";
import SideBar from "../components/SideBar";
import AboutMe from "../components/AboutMe";
import Skills from "../components/Skills/SkillsSection";
import WorkSamples from "../components/WorkSamples/WorkSamples";
import Education from "../components/Education/Education";
import CallMe from "../components/CallMe/CallMe";
import NavBarForMobile from "@/components/NavBarForMobile";
import LookingProgrammer from "@/components/LookingProgrammer";
import Footer from "@/components/Footer";

export default function page() {
  return (
    <>
      <SideBar />
      <main>
        {/* <NavBarForMobile />
        <AboutMe />
        <Skills /> */}
        <WorkSamples />
        {/* <LookingProgrammer />
        <Education />
        <CallMe /> */}
      </main>
      <Footer />
    </>
  );
}
