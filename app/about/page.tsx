import type { Metadata } from "next";
import StaticPageShell from "@/components/StaticPage/StaticPageShell";
import { ABOUT_PAGE } from "@/lib/site-content";

export const metadata: Metadata = {
  title: ABOUT_PAGE.title,
  description: ABOUT_PAGE.description,
  alternates: { canonical: ABOUT_PAGE.path },
  openGraph: {
    title: ABOUT_PAGE.title,
    description: ABOUT_PAGE.description,
    type: "profile",
    url: ABOUT_PAGE.path,
  },
};

export default function AboutPage() {
  return (
    <StaticPageShell
      label="About"
      titleFa={ABOUT_PAGE.titleFa}
      title={ABOUT_PAGE.title}
      descriptionFa={ABOUT_PAGE.descriptionFa}
      description={ABOUT_PAGE.description}
      sectionsFa={ABOUT_PAGE.sectionsFa}
      sectionsEn={ABOUT_PAGE.sectionsEn}
    />
  );
}
