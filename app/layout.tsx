import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "یوسف هاشم زاده توسعه دهنده موبایل فلاتر | Yousof Hashemzadeh Flutter Mobile Developer",
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
