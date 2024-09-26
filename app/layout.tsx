"use client";

import { IntlProvider } from "react-intl";
import { useZState } from "./states";
import { useEffect } from "react";
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  locale: string;
}>) {
  const { isFa, setIsFa } = useZState();
  useEffect(() => {
    const storedLocale = localStorage.getItem("locale");
    if (storedLocale) {
      setIsFa(storedLocale === "fa");
    }
  }, [setIsFa]);
  return (
    <html dir={isFa ? "rtl" : "ltr"} className="scroll-smooth">
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
