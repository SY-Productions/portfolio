"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Settings } from "lucide-react";
import { useLang } from "@/app/context/LanguageContext";

export default function AdminQuickAccess() {
  const { data: session, status } = useSession();
  const { dir } = useLang();

  if (status !== "authenticated" || !session) return null;

  // Position at bottom-left for RTL (sidebar is on the right), bottom-right for LTR
  const positionClass = dir === "rtl" ? "left-6" : "right-6";

  return (
    <Link
      href="/admin"
      className={`fixed bottom-6 ${positionClass} z-50 flex items-center gap-2 px-4 py-2.5
                 bg-[#3B070A]/90 hover:bg-[#5A0E12]/90 border border-[#5A0E12]/50
                 text-white text-sm font-medium shadow-2xl backdrop-blur-sm
                 transition-all duration-200 hover:scale-105 hover:shadow-[#5A0E12]/20`}
    >
      <Settings size={15} />
      Admin Panel
    </Link>
  );
}
