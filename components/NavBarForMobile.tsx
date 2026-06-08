"use client";
import { useZState } from "@/app/states";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import logo from "@/public/vectors/logo.svg";
import { memo } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/app/context/ThemeContext";
import { useLang } from "@/app/context/LanguageContext";

// Memoized for better performance
const NavBarForMobile = memo(function NavBarForMobile() {
  const { setOpen } = useZState();
  const { theme, toggleTheme } = useTheme();
  const { t } = useLang();

  return (
    <nav className="z-50 bg-black/80 backdrop-blur-3xl w-full text-white border-b-2 border-white/10 fixed font-[ybn] flex items-center justify-between px-4 lg:hidden">
      <div className="flex items-center py-3 gap-2">
        <button
          onClick={() => setOpen()}
          className="HAMBURGER p-2.5 bg-white/5"
        >
          <MenuIcon sx={{ color: "white" }} />
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center p-2.5 bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white/60 hover:text-white"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <a
          href="/youdexsof-fa-cv.pdf"
          download="Yousof-Hashemzade-Cv-Fa.pdf"
          className="DOWNLOADPDF hidden text-white sm:block p-3 bg-white/5 text-nowrap text-sm rounded-none"
        >
          {t("nav.downloadCV")}
        </a>
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
