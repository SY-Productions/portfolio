import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "یوسف هاشم زاده توسعه دهنده موبایل فلاتر | Yousof Hashemzadeh Flutter Mobile Developer",
  description:
    "یوسف هاشم زاده - توسعه‌دهنده موبایل با تخصص در فلاتر و توسعه پشتیبان با پایتون. | Yousof Hashemzade - Flutter mobile developer specializing in backend development with Python.",
  keywords:
    "یوسف هاشم زاده, Yousof Hashemzade, Flutter developer, Flutter mobile app development, BLoC architecture Flutter, GetX state management, Python backend developer, Python programming, Mobile app development, Cross-platform app development, Software engineer, Mobile development expert, Application developer, Dart programming language, RESTful APIs with Python, Full-stack mobile development, Modern web technologies, Software development best practices, Agile development methodologies, Portfolio of Yousof Hashemzade",
  icons: "/vectors/logo.svg",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html dir="rtl" className="scroll-smooth">
      <body className="bg-c">
        <div
          style={{
            WebkitUserSelect: "none",
            KhtmlUserSelect: "none",
            MozUserSelect: "none",
            msUserSelect: "none",
            userSelect: "none",
          }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
