import React from "react";
import Image from "next/image";
import prof from "@/public/pic.png";
import github from "@/public/icons/github.svg";
import insta from "@/public/icons/instagram.svg";
import tel from "@/public/icons/telegram.svg";

export default function AboutMe() {
  const buttonsClasses =
    "h-12 aspect-square bg-white/5 rounded-sm flex items-center justify-center transition-all duration-200 hover:bg-white/10";

  return (
    <div className="bg-[url('/vectors/sec1-bgdark.svg')] bg-no-repeat bg-cover w-full h-auto lg:h-screen ">
      <div className="(PROF)&(NAME&DESC&BUTTONS) flex flex-col lg:flex-row items-center lg:mr-[22vw] lg:ml-[3vw] lg:pt-[17vh]">
        <div className="PROF p-6 mx-4 lg:mx-0 mt-[7rem] lg:mt-[0rem] bg-white/5 border border-white/10 backdrop-blur-3xl rounded-sm self-center w-[80%] lg:w-[200vh] lg:max-w-[400px]  ">
          <Image
            src={prof}
            alt="Profile Picture"
            className="aspect-square rounded-sm"
          />
        </div>
        <div className="NAME&DESC&BUTTONS flex flex-col items-center">
          <div className="NAME py-6 w-[80%]">
            <p className="font-[inter] font-bold text-4xl leading-[0.7] tracking-widest bg-clip-text text-transparent bg-gradient-to-b from-white/10 to-white/0 -mb-2.5 self-start text-nowrap">
              Mobile
              <br />
              Developer
            </p>
            <h1 className="bg-clip-text text-transparent  bg-gradient-to-l from-a to-b font-[ybeb] text-3xl self-start text-nowrap">
              یوسف هاشم زاده
            </h1>
          </div>
          <p className="DESC font-[ybn] text-white/35 text-sm leading-6 w-[80%] mb-6 text-wrap">
            با ترکیبِ علاقه به کامپیوتر و چیز ساختن وارد این حوزه شدم و بعد از
            بسیاری تلاشهای ناکام در زمینه های مختلف، بخشِ مورد علاقه خودم رو
            پیدا کردم و شدم یه جوجه برنامه نویسِ فول استک اپلیکیشن های موبایل و
            وب اپلیکیشن ها:)
          </p>
          <div className="BUTTONS flex items-center gap-2 w-[80%] mb-8">
            <button className="h-12 px-5 bg-white/5 rounded-sm font-[ybn] text-nowrap text-sm transition-all duration-200 hover:bg-white/10 hover:text-white">
              تماس با من
            </button>
            <button className={buttonsClasses}>
              <Image className="fill-amber-700" src={github} alt="" />
            </button>
            <button className={buttonsClasses}>
              <Image className="stroke-amber-700" src={insta} alt="" />
            </button>
            <button className={buttonsClasses}>
              <Image src={tel} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
