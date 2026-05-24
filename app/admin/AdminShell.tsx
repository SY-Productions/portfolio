"use client";

import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import AdminNav from "./AdminNav";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showNav = pathname !== "/admin/login";

  return (
    <div className="flex min-h-screen bg-[#0A0A0A] text-white" dir="ltr">
      {showNav && <AdminNav />}
      <main className="flex-1 overflow-auto">{children}</main>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1A1A1A",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)",
          },
        }}
      />
    </div>
  );
}
