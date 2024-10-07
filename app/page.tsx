import React, { Suspense } from "react";
import SideBar from "../components/SideBar";
import AboutMe from "../components/AboutMe";
import Skills from "../components/Skills/SkillsSection";
import WorkSamples from "../components/WorkSamples/WorkSamples";
import Education from "../components/Education/Education";
import CallMe from "../components/CallMe/CallMe";
import NavBarForMobile from "@/components/NavBarForMobile";
import LookingProgrammer from "@/components/LookingProgrammer";
import Footer from "@/components/Footer";
import Work from "@/components/Work/Work";
import Events from "@/components/Events/Events";

export default function page() {
  return (
    <Suspense>

      <SideBar />
      <main>
        <NavBarForMobile />
        <AboutMe />
        <Skills />
        <WorkSamples />
        <LookingProgrammer />
        <Education />
        <Work />
        <Events/>
        <CallMe />
      </main>
      <Footer />
    </Suspense>
  );
}
