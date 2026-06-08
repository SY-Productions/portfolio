"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Code2,
  GraduationCap,
  Briefcase,
  Trophy,
  LogOut,
  Shield,
  Settings,
  BarChart2,
  ShoppingBag,
  BookOpen,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/blog", label: "Blog Posts", icon: BookOpen },
  { href: "/admin/work-samples", label: "Work Samples", icon: Code2 },
  { href: "/admin/products", label: "Products & Themes", icon: ShoppingBag },
  { href: "/admin/education", label: "Education", icon: GraduationCap },
  { href: "/admin/works", label: "Works", icon: Briefcase },
  { href: "/admin/events", label: "Events", icon: Trophy },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart2 },
  { href: "/admin/settings", label: "Site Settings", icon: Settings },
  { href: "/admin/setup-2fa", label: "Two-Factor Auth", icon: Shield },
];

export default function AdminNav() {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-64 min-h-screen bg-[#0D0D0D] border-l border-white/10 flex flex-col">
      <div className="p-6 border-b border-white/10">
        <h1 className="text-white font-bold text-lg">Admin Panel</h1>
        <p className="text-white/40 text-sm mt-1">Portfolio Manager</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-none transition-all duration-200 text-sm
                ${
                  active
                    ? "bg-[#3B070A]/40 text-white border-r-2 border-[#5A0E12]"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-3 px-3 py-2.5 w-full text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all duration-200"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
