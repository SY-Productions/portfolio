import "./globals.css";
import { Metadata, Viewport } from "next";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import NextAuthProvider from "./context/NextAuthProvider";
import SiteSettingsLoader from "@/components/SiteSettingsLoader";
import FirebaseProvider from "@/components/FirebaseProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://youdexsof.ir"),
  title: {
    default: "یوسف هاشم زاده | توسعه دهنده موبایل و فلاتر | Yousof Hashemzadeh",
    template: "%s | یوسف هاشم زاده - Yousof Hashemzadeh",
  },
  description:
    "یوسف هاشم زاده - توسعه‌دهنده متخصص موبایل با فلاتر و توسعه سمت سرور با پایتون. با تجربه در BLoC و GetX. | Yousof Hashemzadeh - Expert Flutter mobile developer with Python backend skills, specializing in BLoC architecture & GetX state management.",
  keywords: [
    "یوسف هاشم زاده",
    "Yousof Hashemzadeh",
    "Flutter developer",
    "توسعه دهنده فلاتر",
    "Flutter mobile app development",
    "BLoC architecture Flutter",
    "GetX state management",
    "Python backend developer",
    "برنامه نویس پایتون",
    "Mobile app development",
    "Cross-platform app development",
    "اپلیکیشن موبایل",
    "برنامه نویس موبایل",
    "Software engineer",
    "مهندس نرم افزار",
    "Dart programming",
    "RESTful APIs",
    "Firebase",
    "توسعه اندروید",
    "توسعه iOS",
    "توسعه وب",
    "فلاتر ایران",
    // English SEO
    "Flutter expert",
    "Flutter app developer",
    "Mobile app developer portfolio",
    "Flutter developer Iran",
    "Dart developer",
    "Full stack mobile developer",
    "Flutter BLoC developer",
    "Freelance Flutter developer",
    "Flutter web developer",
    "Cross platform mobile development",
    // Arabic SEO
    "مطور فلاتر",
    "مطور تطبيقات الجوال",
    "يوسف هاشم زاده",
    "مطور موبايل محترف",
    "تطبيقات فلاتر",
    "مطور بايثون",
  ],

  openGraph: {
    type: "website",
    locale: "fa_IR",
    alternateLocale: ["en_US", "ar"],
    url: "https://www.youdexsof.ir/",
    siteName: "یوسف هاشم زاده | Yousof Hashemzadeh",
    title: "یوسف هاشم زاده | توسعه دهنده موبایل و فلاتر | Portfolio",
    description:
      "توسعه‌دهنده حرفه‌ای اپلیکیشن‌های موبایل با فلاتر و پایتون | Professional Flutter and Python developer | مطور تطبيقات الجوال المحترف",
    images: [
      {
        url: "../public/me.jpg",
        width: 1920,
        height: 1920,
        alt: "یوسف هاشم زاده - Yousof Hashemzadeh Portfolio",
      },
      {
        url: "../public/pic.jpg",
        width: 964,
        height: 957,
        alt: "یوسف هاشم زاده - Yousof Hashemzadeh Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "یوسف هاشم زاده | توسعه دهنده موبایل و فلاتر",
    description:
      "توسعه‌دهنده حرفه‌ای اپلیکیشن‌های موبایل با فلاتر و پایتون | Professional Flutter and Python developer",
    images: [".../public/me.jpg"],
    creator: "@youdexsof",
  },

  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://www.youdexsof.ir",
    languages: {
      "fa-IR": "https://www.youdexsof.ir",
      "en-US": "https://www.youdexsof.ir?lang=en",
      ar: "https://www.youdexsof.ir?lang=ar",
      "x-default": "https://www.youdexsof.ir",
    },
  },

  icons: [
    { rel: "icon", url: "/favicons/favicon-16x16.png", sizes: "16x16" },
    { rel: "icon", url: "/favicons/favicon-32x32.png", sizes: "32x32" },
    {
      rel: "apple-touch-icon",
      url: "/favicons/apple-touch-icon.png",
      sizes: "180x180",
    },
    {
      rel: "icon",
      url: "/favicons/android-chrome-192x192.png",
      sizes: "192x192",
    },
    {
      rel: "icon",
      url: "/favicons/android-chrome-512x512.png",
      sizes: "512x512",
    },
    { rel: "manifest", url: "/site.webmanifest" },
  ],

  applicationName: "یوسف هاشم زاده Portfolio",
  authors: [{ name: "یوسف هاشم زاده", url: "https://www.youdexsof.ir" }],
  generator: "Next.js",
  creator: "یوسف هاشم زاده | Yousof Hashemzadeh",
  publisher: "یوسف هاشم زاده | Yousof Hashemzadeh",
  formatDetection: {
    telephone: true,
    date: true,
    address: true,
    email: true,
    url: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#8B1E24",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

// Create web manifest file (create public/site.webmanifest)
// {
//   "name": "یوسف هاشم زاده | Yousof Hashemzadeh Portfolio",
//   "short_name": "Yousof Portfolio",
//   "icons": [
//     {
//       "src": "/android-chrome-192x192.png",
//       "sizes": "192x192",
//       "type": "image/png"
//     },
//     {
//       "src": "/android-chrome-512x512.png",
//       "sizes": "512x512",
//       "type": "image/png"
//     }
//   ],
//   "theme_color": "#8B1E24",
//   "background_color": "#141010",
//   "display": "standalone",
//   "start_url": "/"
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className="scroll-smooth">
      <head>
        {/* Preload hero background — prevents LCP delay from late CSS discovery */}
        <link rel="preload" as="image" href="/vectors/sec1-bgdark.svg" fetchPriority="high" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "یوسف هاشم زاده",
              alternateName: "Yousof Hashemzadeh",
              url: "https://www.youdexsof.ir",
              image: "https://youdexsof.ir/pic.jpg",
              sameAs: [
                "https://www.linkedin.com/in/yousof-hashemezade",
                "https://github.com/YOUSSSOF",
                "https://www.instagram.com/youdexsof",
              ],
              jobTitle: "Flutter Developer | توسعه دهنده فلاتر",
              worksFor: {
                "@type": "Organization",
                name: "Freelance",
              },
              description:
                "توسعه‌دهنده حرفه‌ای اپلیکیشن‌های موبایل با فلاتر و پایتون | Professional Flutter and Python developer",
            }),
          }}
        />
      </head>
      <body className="bg-c">
        <NextAuthProvider>
          <ThemeProvider>
            <LanguageProvider>
              <SiteSettingsLoader />
              <FirebaseProvider />
              <div className="selection:bg-[#5A0E12]/20 selection:text-white">
                {children}
              </div>
            </LanguageProvider>
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
