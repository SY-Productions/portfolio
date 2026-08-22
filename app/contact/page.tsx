import type { Metadata } from "next";
import StaticPageShell from "@/components/StaticPage/StaticPageShell";
import { CONTACT_PAGE } from "@/lib/site-content";

export const metadata: Metadata = {
  title: CONTACT_PAGE.title,
  description: CONTACT_PAGE.description,
  alternates: { canonical: CONTACT_PAGE.path },
  openGraph: {
    title: CONTACT_PAGE.title,
    description: CONTACT_PAGE.description,
    type: "website",
    url: CONTACT_PAGE.path,
  },
};

export default function ContactPage() {
  return (
    <StaticPageShell
      label="Contact"
      titleFa={CONTACT_PAGE.titleFa}
      title={CONTACT_PAGE.title}
      descriptionFa={CONTACT_PAGE.descriptionFa}
      description={CONTACT_PAGE.description}
      sectionsFa={CONTACT_PAGE.sectionsFa}
      sectionsEn={CONTACT_PAGE.sectionsEn}
    />
  );
}
