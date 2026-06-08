"use client";
import { useZState } from "@/app/states";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import logo from "@/public/vectors/logo.svg";
import { memo } from "react";
// Memoized for better performance
const NavBarForMobile = memo(function NavBarForMobile() {
  const { setOpen } = useZState();

  return (
    <nav className="z-50 bg-black/80 backdrop-blur-3xl w-full text-white border-b-2 border-white/10 fixed font-[ybn] flex items-center justify-between px-4 lg:hidden">
      <div className="flex items-center py-3">
        <button
          onClick={() => setOpen()}
          aria-label="Open navigation menu"
          aria-expanded={false}
          className="HAMBURGER p-2.5 bg-white/5 border border-white/10 hover:bg-white/10 transition-[color,background-color] text-white/60 hover:text-white"
        >
          <MenuIcon sx={{ color: "currentColor", fontSize: 24 }} aria-hidden />
        </button>
      </div>

      <Image
        className="LOGO h-8 w-auto"
        style={{ padding: "0.2rem 0" }}
        src={logo}
        alt="Logo of Yousof Hashemzade, Flutter Developer | لوگوی یوسف هاشم زاده، توسعه دهنده فلاتر"
        height={32}
      />
    </nav>
  );
});

export default NavBarForMobile;
