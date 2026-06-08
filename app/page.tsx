import React, { Suspense } from "react";
import dynamic from "next/dynamic";

// Above-fold — load eagerly
import AboutMe from "../components/AboutMe";
import NavBarForMobile from "@/components/NavBarForMobile";
import SideBar from "@/components/SideBar";

// Below-fold — lazy load to reduce initial JS bundle
const Skills = dynamic(() => import("../components/Skills/SkillsSection"));
const WorkSamples = dynamic(() => import("../components/WorkSamples/WorkSamples"));
const OpenSource = dynamic(() => import("../components/OpenSource/OpenSource"));
const Products = dynamic(() => import("../components/Products/Products"));
const LookingProgrammer = dynamic(() => import("@/components/LookingProgrammer"));
const Education = dynamic(() => import("../components/Education/Education"));
const Work = dynamic(() => import("@/components/Work/Work"));
const Events = dynamic(() => import("@/components/Events/Events"));
const Blog = dynamic(() => import("@/components/Blog/Blog"));
const CallMe = dynamic(() => import("../components/CallMe/CallMe"));
const Footer = dynamic(() => import("@/components/Footer"));
const AdminQuickAccess = dynamic(() => import("@/components/AdminQuickAccess"));
const AnimatedCursor = dynamic(() => import("@/components/AnimtedCursor"), { ssr: false });

export default function Page() {
  return (
    <Suspense>
      <SideBar />
      <main className="transition-all duration-300 sidebar-adjusted">
        <NavBarForMobile />
        <AboutMe />
        <Skills />
        <WorkSamples />
        <OpenSource />
        <Products />
        <LookingProgrammer />
        <Education />
        <Work />
        <Events />
        <Blog />
        <CallMe />
      </main>
      <Footer />
      <AdminQuickAccess />
      <AnimatedCursor />
    </Suspense>
  );
}
