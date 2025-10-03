import React, { Suspense } from "react";
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
import AnimatedCursor from "@/components/AnimtedCursor";
import SideBar from "@/components/SideBar";

export default function Page() {
  return (
    <Suspense>
      <SideBar />
      <main className="transition-all duration-300 sidebar-adjusted">
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
      {typeof window !== 'undefined' && window.innerWidth > 900 && <AnimatedCursor />}
    </Suspense>
  );
}
