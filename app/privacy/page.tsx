import type { Metadata } from "next";
import StaticPageShell from "@/components/StaticPage/StaticPageShell";
import { PRIVACY_PAGE } from "@/lib/site-content";

export const metadata: Metadata = {
  title: PRIVACY_PAGE.title,
  description: PRIVACY_PAGE.description,
  alternates: { canonical: PRIVACY_PAGE.path },
  openGraph: {
    title: PRIVACY_PAGE.title,
    description: PRIVACY_PAGE.description,
    type: "website",
    url: PRIVACY_PAGE.path,
  },
};

export default function PrivacyPage() {
  return (
    <StaticPageShell
      label="Privacy"
      titleFa={PRIVACY_PAGE.titleFa}
      title={PRIVACY_PAGE.title}
      descriptionFa={PRIVACY_PAGE.descriptionFa}
      description={PRIVACY_PAGE.description}
      sectionsFa={PRIVACY_PAGE.sectionsFa}
      sectionsEn={PRIVACY_PAGE.sectionsEn}
    />
  );
}
