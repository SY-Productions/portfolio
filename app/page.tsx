import React, { Suspense } from "react";
import dynamic from "next/dynamic";

// Above-fold — load eagerly
import AboutMe from "../components/AboutMe";
import NavBarForMobile from "@/components/NavBarForMobile";
import SideBar from "@/components/SideBar";
import { getHomepageData } from "@/lib/homepage-data";

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

/**
 * Revalidate hourly: the sections are seeded from the database and the GitHub
 * API on the server, so the cached HTML has to age out for new rows to appear
 * in the no-JavaScript view.
 */
export const revalidate = 3600;

export default async function Page() {
  const data = await getHomepageData();

  return (
    <Suspense>
      <SideBar />
      <main className="transition-all duration-300 sidebar-adjusted">
        <NavBarForMobile />
        <AboutMe />
        <Skills />
        <WorkSamples initialSamples={data.workSamples} />
        <OpenSource initialRepos={data.repositories} />
        <Products initialProducts={data.products} />
        <LookingProgrammer />
        <Education initialEducations={data.educations} />
        <Work initialWorks={data.works} />
        <Events initialEvents={data.events} />
        <Blog />
        <CallMe />
      </main>
      <Footer />
      <AdminQuickAccess />
    </Suspense>
  );
}
