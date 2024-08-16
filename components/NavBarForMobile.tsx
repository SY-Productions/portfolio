"use client";
import { useZState } from "@/app/states";
import MenuIcon from "@mui/icons-material/Menu";

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
        <button className="DOWNLOADPDF hidden xs:block p-3 bg-white/5 text-nowrap text-sm">
          دانلود رزومه بصورت PDF
        </button>
        <button className="DOWNLOADPDF xs:hidden p-3 bg-white/5 text-nowrap text-sm">
          دانلود PDF
        </button>
      </div>
      <div className="LOGO ml-6">LOGO</div>
    </nav>
  );
}
