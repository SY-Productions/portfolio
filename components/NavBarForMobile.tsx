"use client";
import { useZState } from "@/app/states";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import logo from "@/public/vectors/logo.svg";
import { memo } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/app/context/ThemeContext";
import { useLang, LANG_LABEL, Lang } from "@/app/context/LanguageContext";

// Memoized for better performance
const NavBarForMobile = memo(function NavBarForMobile() {
  const { setOpen } = useZState();
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLang();

  return (
    <nav className="z-50 bg-black/80 backdrop-blur-3xl w-full text-white border-b-2 border-white/10 fixed font-[ybn] flex items-center justify-between lg:hidden">
      <div className="flex items-center p-[2vh] gap-2">
        <button
          onClick={() => setOpen()}
          className="HAMBURGER p-2.5 bg-white/5 ml-1 mr-1"
        >
          <MenuIcon sx={{ color: "white" }} />
        </button>

        {/* Language switcher */}
        <div className="flex gap-1">
          {(["fa", "en", "ar"] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-2 py-1.5 font-bold transition-all border leading-none ${
                lang === l
                  ? "bg-[#3B070A]/60 border-[#5A0E12]/60 text-white"
                  : "bg-white/5 border-white/10 text-white/40 hover:text-white/70"
              }`}
              style={{
                fontSize: l === "en" ? "0.65rem" : "0.7rem",
                fontFamily:
                  l === "en" ? "'Inter', 'Segoe UI', sans-serif" : "inherit",
                letterSpacing: l === "en" ? "0.05em" : "normal",
                fontWeight: 700,
              }}
            >
              {LANG_LABEL[l]}
            </button>
          ))}
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-8 h-8 bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white/60 hover:text-white"
        >
          {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
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
        className="LOGO h-8 w-auto mr-4"
        src={logo}
        alt="Logo of Yousof Hashemzade, Flutter Developer | لوگوی یوسف هاشم زاده، توسعه دهنده فلاتر"
        height={32}
      />
    </nav>
  );
});

export default NavBarForMobile;
