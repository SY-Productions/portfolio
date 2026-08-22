import { CONTACT, OWNER, SITE_NAME, SITE_URL, SOCIALS, absoluteUrl } from "./site-profile";

/**
 * JSON-LD for the site, emitted as a single `@graph` from the root layout.
 *
 * The Organization node carries both `contactPoint` and `address`: those are
 * the properties AI agents read to decide whether a business is real and to
 * answer "how do I contact them", and a bare `{"@type":"Organization","name":…}`
 * nested inside `worksFor` does not provide either.
 */

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const postalAddress = {
  "@type": "PostalAddress",
  addressLocality: CONTACT.addressLocality,
  addressRegion: CONTACT.addressRegion,
  addressCountry: CONTACT.addressCountry,
};

const contactPoints = [
  {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: CONTACT.email,
    telephone: CONTACT.phone,
    availableLanguage: ["fa", "en", "ar"],
    areaServed: "Worldwide",
  },
  {
    "@type": "ContactPoint",
    contactType: "sales",
    email: CONTACT.email,
    telephone: CONTACT.phone,
    availableLanguage: ["fa", "en"],
    areaServed: "Worldwide",
  },
];

export function buildStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: SITE_NAME,
        alternateName: [OWNER.name, OWNER.nameFa],
        legalName: OWNER.name,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/favicons/android-chrome-512x512.png"),
          width: 512,
          height: 512,
        },
        image: absoluteUrl("/me.jpg"),
        description: `Independent software studio of ${OWNER.name}: Flutter mobile apps, React and Next.js front-ends, Python back-ends and RTL WordPress products.`,
        email: CONTACT.email,
        telephone: CONTACT.phone,
        address: postalAddress,
        contactPoint: contactPoints,
        sameAs: [...SOCIALS],
        founder: { "@id": PERSON_ID },
        knowsLanguage: ["fa", "en", "ar"],
      },
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: OWNER.nameFa,
        alternateName: OWNER.name,
        url: SITE_URL,
        image: absoluteUrl("/me.jpg"),
        email: CONTACT.email,
        telephone: CONTACT.phone,
        address: postalAddress,
        contactPoint: contactPoints,
        sameAs: [...SOCIALS],
        jobTitle: OWNER.jobTitle,
        worksFor: { "@id": ORGANIZATION_ID },
        knowsAbout: [
          "Flutter",
          "Dart",
          "BLoC Architecture",
          "GetX State Management",
          "React",
          "Next.js",
          "Python",
          "FastAPI",
          "Django",
          "WordPress theme development",
        ],
        description: `${OWNER.jobTitle}. ${OWNER.jobTitleFa}.`,
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: `${OWNER.nameFa} | ${OWNER.name}`,
        inLanguage: ["fa", "en", "ar"],
        publisher: { "@id": ORGANIZATION_ID },
        about: { "@id": PERSON_ID },
      },
    ],
  };
}
