"use client";
import { useZState } from "@/app/states";
import MenuIcon from "@mui/icons-material/Menu";
import Image from 'next/image'
import logo from '@/public/vectors/logo.svg'
export default function NavBarForMobile() {
  const { setOpen } = useZState();
  return (
    <nav className="z-10 bg-black/5 backdrop-blur-3xl w-full text-white border-b-2 border-white/10 fixed font-[ybn] flex items-center justify-between lg:hidden">
      <div className="flex items-center p-[2vh]">
        <button
          onClick={() => setOpen()}
          className="HAMBURGER p-2.5 bg-white/5 ml-4 mr-4 "
        >
          <MenuIcon sx={{ color: "white" }} />
        </button>
        <a
          href="/youdexsof-fa-cv.pdf"
          download="Yousof-Hashemzade-Cv-Fa.pdf"
          className="DOWNLOADPDF hidden text-white  xs:block p-3 bg-white/5 text-nowrap text-sm rounded-none"
        >
          دانلود رزومه بصورت PDF
        </a>
        <a
          href="/youdexsof-fa-cv.pdf"
          download="Yousof-Hashemzade-Cv-Fa.pdf"
          className="DOWNLOADPDF xs:hidden p-3 text-white bg-white/5 text-nowrap text-sm rounded-none"
        >
          دانلود PDF
        </a>
      </div>
      <Image
        className="LOGO h-8"
        src={logo}
        alt="Logo of Yousof Hashemzade, Flutter Developer | لوگوی یوسف هاشم زاده، توسعه دهنده فلاتر"
      />
    </nav>
  );
}
