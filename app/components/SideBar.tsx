"use client";
import React, { useEffect } from "react";
import iran from "@/public/iran.png";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useZState } from "@/app/states";
import Image from "next/image";
import tagwh from "@/public/icons/tag-wh.svg";
import taggr from "@/public/icons/tag-gr.svg";
import cubewh from "@/public/icons/cube-wh.svg";
import cubegr from "@/public/icons/cube-gr.svg";
import bagwh from "@/public/icons/bag-wh.svg";
import baggr from "@/public/icons/bag-gr.svg";
import capwh from "@/public/icons/cap-wh.svg";
import capgr from "@/public/icons/cap-gr.svg";
import hswh from "@/public/icons/headset-wh.svg";
import hsgr from "@/public/icons/headset-gr.svg";
import logo from "../public/vectors/logo.svg";

const sideItems = [
  {
    title: "درباره من",
    logo1: <Image src={tagwh} alt="About me" />,
    logo2: <Image src={taggr} alt="About me" />,
    to: "#about-me",
  },
  {
    title: "مهارت ها",
    logo1: <Image src={cubewh} alt="Skills" />,
    logo2: <Image src={cubegr} alt="Skills" />,
    to: "#skills",
  },
  {
    title: "نمونه کارها",
    logo1: <Image src={bagwh} alt="Work Samples" />,
    logo2: <Image src={baggr} alt="Work Samples" />,
    to: "#portfolio",
  },
  {
    title: "سوابق تحصیلی",
    logo1: <Image src={capwh} alt="Education" />,
    logo2: <Image src={capgr} alt="Education" />,
    to: "#education",
  },
  {
    title: "تماس با من",
    logo1: <Image src={hswh} alt="Call me" />,
    logo2: <Image src={hsgr} alt="Call me" />,
    to: "#call-me",
  },
];
export default function SideBar() {
  const {
    isOpen,
    setFixedOpen,
    setOpen,
    sideBarScroll,
    setSideBarScroll,
    isOnMobile,
    setIsOnMobile,
  } = useZState();
  let sideBarFullClasses =
    "z-40 w-[100vw] lg:w-[20vw] flex flex-row h-screen fixed transition-all duration-300 ";
  const sideItemClasses =
    "flex flex-row justify-start items-center gap-3 py-2 my-3 rounded-sm cursor-pointer ";
  useEffect(() => {
    const handleSideBar = () => {
      setIsOnMobile(window.innerWidth <= 1024);
      if (window.innerWidth >= 1024) {
        setFixedOpen();
      }
    };

    window.addEventListener("resize", handleSideBar);
    handleSideBar();

    return () => window.removeEventListener("resize", handleSideBar);
  }, [setFixedOpen, setIsOnMobile]);

  return (
    <div
      className={
        isOnMobile
          ? isOpen
            ? sideBarFullClasses
            : sideBarFullClasses + "translate-x-[100vw]"
          : sideBarFullClasses
      }
    >
      <aside className=" font-[ybn] border-l border-white/10 h-screen bg-black/5 w-[70vw] sm:w-[50vw] md:w-[30vw] lg:w-[20vw] backdrop-blur-3xl flex flex-col justify-between ">
        <div className="LOGO&OPTIONS text-base text-white/40 pt-8 mr-8">
          {/* <div className="LOGO hidden lg:block text-b text-4xl">LOGO</div> */}
          <Image className="w-[50%]" src={logo} alt="" />

          {sideItems.map((item) => (
            <a
              onClick={() => setSideBarScroll(item.to)}
              href={item.to}
              key={item.title}
              className={
                item.to == sideBarScroll
                  ? sideItemClasses +
                    "border-white/10 border border-l-0 bg-white/5 shadow-sm "
                  : sideItemClasses
              }
            >
              <span
                className={
                  item.to == sideBarScroll
                    ? "bg-gradient-to-b from-a to-b p-2 rounded-lg mr-2 shadow-lg"
                    : "bg-white/5 p-2 rounded-lg mr-2"
                }
              >
                {item.to == sideBarScroll ? item.logo1 : item.logo2}
              </span>
              <span className={item.to == sideBarScroll ? "text-white" : ""}>
                {item.title}
              </span>
            </a>
          ))}
        </div>
        <div className="SWITCHES&BUTTON pb-[3vh]">
          <div className="h-0 border-t border-white/10 " />
          <div className="SWITCHES flex flex-col gap-6 mr-10 py-5">
            <div className="flex items-center gap-6">
              <div className="p-3 bg-white/5 rounded-lg">
                <Image
                  src={iran}
                  alt="Persian Language"
                  className="rounded-full w-5 h-5 object-cover"
                />
              </div>
              <input
                type="checkbox"
                className="toggle toggle-md  2xl:toggle-lg border-[#3A71FF] bg-b [--tglbg:#171717] hover:bg-b"
              />
            </div>
            <div className="flex items-center gap-6">
              <div className="p-2.5 bg-white/5 rounded-lg">
                <DarkModeOutlinedIcon />
              </div>
              <input
                type="checkbox"
                className="toggle toggle-md 2xl:toggle-lg border-[#3A71FF] bg-b [--tglbg:#171717] hover:bg-b"
              />
            </div>
          </div>
          <div className="h-0 border-t border-white/10 hidden lg:block" />
          <button className="DOWNLOADPDF btn p-3 bg-white/5 font-normal text-nowrap text-sm mt-4 mr-10 transition-all duration-200 hover:bg-white/10 rounded-none">
            دانلود رزومه بصورت PDF
          </button>
        </div>
      </aside>
      <div
        onClick={() => setOpen()}
        className="just-for-clicking-outside-to-close-sidebar w-[30vw] sm:w-[50vw] md:w-[70vw] lg:hidden "
      />
    </div>
  );
}
