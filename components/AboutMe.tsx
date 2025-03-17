import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

// Optimized imports
import prof from "@/public/pic.png";
import github from "@/public/icons/github.svg";
import insta from "@/public/icons/instagram.svg";
import tel from "@/public/icons/telegram.svg";
import linkedin from "@/public/icons/linkedin.svg";
import SkeletonImage from "./SkeletonImage";

// Social media links data structure for better maintainability
const socialLinks = [
  {
    url: "https://www.github.com/YOUSSSOF",
    icon: github,
    alt: "Yousof Hashemzade GitHub Profile | پروفایل گیت‌هاب یوسف هاشم زاده",
    title: "پروژه‌های من رو در گیت‌هاب ببین!",
  },
  {
    url: "https://www.instagram.com/youdexsof",
    icon: insta,
    alt: "Yousof Hashemzade Instagram Profile | پروفایل اینستاگرام یوسف هاشم زاده",
    title: "اینستاگرام من رو دنبال کن!",
  },
  {
    url: "https://www.t.me/YOUDEXSOF",
    icon: tel,
    alt: "Yousof Hashemzade Telegram Account | پروفایل تلگرام یوسف هاشم زاده",
    title: "تلگرام من رو دنبال کن!",
  },
  {
    url: "https://www.linkedin.com/in/yousof-hashemezade",
    icon: linkedin,
    alt: "Yousof Hashemzade LinkedIn Profile | پروفایل لینکدین یوسف هاشم زاده",
    title: "در لینکدین با من ارتباط برقرار کن!",
  },
];

// Memoized for better performance
const AboutMe = memo(function AboutMe() {
  
  const socialButtonClasses =
    "h-[6vh] lg:h-[8vh] aspect-square bg-white/8 backdrop-blur-md rounded-none flex items-center justify-center transition-all duration-300 hover:bg-white/15 border border-white/10 hover:border-white/20 hover:shadow-[0_0_15px_rgba(255,84,84,0.15)] hover:-translate-y-1";

  return (
    <div
      id="about-me"
      className="bg-[url('/vectors/sec1-bgdark.svg')] bg-no-repeat bg-cover w-full h-auto lg:h-screen relative"
    >
      {/* Glass gradient overlay for modern effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-black/0 backdrop-blur-sm"></div>

      <div className="(PROF)&(NAME&DESC&BUTTONS) flex flex-col lg:flex-row items-center lg:mr-[22vw] lg:ml-[3vw] lg:h-screen relative z-10">
        {/* Profile picture card with glass morphism effect and sharp edges */}
        <div className="PROF p-5 mx-[5vw] lg:mx-0 mt-[13vh] lg:mt-[0rem] bg-black/20 border border-white/10 backdrop-blur-2xl rounded-none self-center basis-1/3 aspect-square w-[90%] shadow-[0_10px_30px_rgba(0,0,0,0.2)] overflow-hidden">
          <SkeletonImage
            src={prof}
            alt="Yousof Hashemzade, Flutter Developer | یوسف هاشم زاده، توسعه دهنده فلاتر"
            title="Yousof Hashemzade - Flutter Developer | یوسف هاشم زاده - توسعه دهنده فلاتر"
            className="aspect-square rounded-none transition-all duration-300 hover:scale-[1.03] active:scale-95 hover:cursor-grab active:cursor-grabbing"
            draggable={false}
          />
        </div>

        <div className="NAME&DESC&BUTTONS flex flex-col items-center basis-2/3">
          <div className="NAME py-6 w-[80%]">
            {/* Enhanced gradient text styling */}
            <p className="mobile-developer tracking-tight text-[2.8rem] lg:text-[3rem] font-extrabold">
              MOBILE <br />
              DEVELOPER
            </p>
            <h1 className="developer-name relative">
              یوسف هاشم زاده
              {/* Subtle line accent for modern design */}
              <span className="absolute -bottom-2 right-0 w-16 h-1 bg-gradient-to-r from-[#8C9EFF] to-[#7B2CBF]"></span>
            </h1>
          </div>

          {/* Enhanced description text */}
          <p className="DESC font-[ybn] text-white/60 text-sm lg:text-base 2xl:text-xl leading-7 w-[80%] mb-6 text-wrap">
            با ترکیبِ علاقه به کامپیوتر و چیز ساختن وارد این حوزه شدم و بعد از
            بسیاری تلاشهای ناکام در زمینه های مختلف، بخشِ مورد علاقه خودم رو
            پیدا کردم و شدم یه جوجه برنامه نویسِ فول استک اپلیکیشن های موبایل و
            وب اپلیکیشن ها:)
          </p>

          <div className="BUTTONS flex items-center gap-3 w-[80%] mb-8">
            {/* Modern styled call-to-action button with gradient */}
            <a
          href="#call-me"
          className="flex items-center text-white justify-center h-[6vh] lg:h-[8vh] px-[1.5vw] min-w-[22vw] sm:min-w-0 bg-gradient-to-r from-[#7B2CBF]/20 to-[#9D4EDD]/20 hover:from-[#7B2CBF]/30 hover:to-[#9D4EDD]/30 rounded-none font-[ybn] text-nowrap text-sm 2xl:text-base transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(140,158,255,0.2)] border border-white/10 hover:border-white/20 backdrop-blur-md"
        >
          تماس با من
        </a>

            {/* Social media buttons with consistent modern styling */}
            {socialLinks.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={socialButtonClasses}
              >
                <Image
                  className="w-[45%] opacity-80 hover:opacity-100 transition-opacity duration-300 filter brightness-0 invert"
                  src={link.icon}
                  alt={link.alt}
                  title={link.title}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default AboutMe;
