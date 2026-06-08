import type { Metadata } from "next";
import BlogToaster from "./BlogToaster";
import BlogAppBar from "@/components/Blog/BlogAppBar";

export const metadata: Metadata = {
  title: {
    template: "%s | Blog — Yousof Hashemzade",
    default: "Blog — Yousof Hashemzade",
  },
  description: "Articles, insights and tutorials from Yousof Hashemzade — Flutter, FastAPI, web development and more.",
  openGraph: {
    type: "website",
    locale: "fa_IR",
    alternateLocale: ["en_US", "ar_SA"],
    siteName: "Yousof Hashemzade",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BlogAppBar />
      <div className="pt-12">{children}</div>
      <BlogToaster />
    </>
  );
}
