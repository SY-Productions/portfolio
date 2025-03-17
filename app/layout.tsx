import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
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
  ],

  openGraph: {
    type: "website",
    locale: "fa_IR",
    alternateLocale: "en_US",
    url: "https://www.youdexsof.ir/",
    siteName: "یوسف هاشم زاده | Yousof Hashemzadeh",
    title: "یوسف هاشم زاده | توسعه دهنده موبایل و فلاتر | Portfolio",
    description:
      "توسعه‌دهنده حرفه‌ای اپلیکیشن‌های موبایل با فلاتر و پایتون | Professional Flutter and Python developer",
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
    },
  },

  themeColor: "#5A189A",

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

  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
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
//   "theme_color": "#5A189A",
//   "background_color": "#171717",
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
        <div className="selection:bg-[#9D4EDD]/20 selection:text-white">
          {children}
        </div>
      </body>
    </html>
  );
}
