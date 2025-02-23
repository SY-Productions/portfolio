import Image from "next/image";
import prof from "@/public/pic.png";
import github from "@/public/icons/github.svg";
import insta from "@/public/icons/instagram.svg";
import tel from "@/public/icons/telegram.svg";
import linkedin from "@/public/icons/linkedin.svg";
import SkeletonImage from "./SkeletonImage";
import Link from "next/link";

export default function AboutMe() {

  const buttonsClasses =
    "h-[6vh] lg:h-[8vh] aspect-square bg-white/5 rounded-sm flex items-center justify-center transition-all duration-200 hover:bg-white/10";

  return (
    <div
      id="about-me"
      className="bg-[url('/vectors/sec1-bgdark.svg')] bg-no-repeat bg-cover w-full h-auto lg:h-screen "
    >
      <div className="(PROF)&(NAME&DESC&BUTTONS) flex flex-col lg:flex-row items-center lg:mr-[22vw] lg:ml-[3vw] lg:h-screen">
        <div className="PROF p-5 mx-[5vw] lg:mx-0 mt-[13vh] lg:mt-[0rem] bg-white/5 border border-white/10 backdrop-blur-3xl rounded-sm self-center basis-1/3 aspect-square w-[90%]">
          <SkeletonImage
            src={prof}
            alt="Yousof Hashemzade, Flutter Developer | یوسف هاشم زاده، توسعه دهنده فلاتر"
            title="Yousof Hashemzade - Flutter Developer | یوسف هاشم زاده - توسعه دهنده فلاتر"
            className="aspect-square rounded-sm transition-all  active:scale-95 hover:cursor-grab active:cursor-grabbing"
            draggable={false}
          />
        </div>
        <div className="NAME&DESC&BUTTONS flex flex-col items-center basis-2/3">
          <div className="NAME py-6 w-[80%]">
            <p className="mobile-developer">
              MOBILE <br />
              DEVELOPER
            </p>
            <h1 className="developer-name">یوسف هاشم زاده</h1>
          </div>
          <p className="DESC font-[ybn] text-white/35 text-sm lg:text-base 2xl:text-xl leading-6 w-[80%] mb-6 text-wrap">
            با ترکیبِ علاقه به کامپیوتر و چیز ساختن وارد این حوزه شدم و بعد از
            بسیاری تلاشهای ناکام در زمینه های مختلف، بخشِ مورد علاقه خودم رو
            پیدا کردم و شدم یه جوجه برنامه نویسِ فول استک اپلیکیشن های موبایل و
            وب اپلیکیشن ها:)
          </p>
          <div className="BUTTONS flex items-center gap-2 w-[80%] mb-8">
            <a
              href="#call-me"
              className="flex items-center text-white justify-center h-[6vh] lg:h-[8vh] px-[1.3vw] min-w-[22vw] sm:min-w-0 bg-white/5 rounded-sm font-[ybn] text-nowrap text-sm 2xl:text-base transition-all duration-200 hover:bg-white/10 hover:text-white"
            >
              تماس با من
            </a>
            <Link
              href="https://www.github.com/YOUSSSOF"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonsClasses}
            >
              <Image
                className="w-[50%]"
                src={github}
                alt="Yousof Hashemzade GitHub Profile | پروفایل گیت‌هاب یوسف هاشم زاده"
                title="پروژه‌های من رو در گیت‌هاب ببین!"
              />
            </Link>
            <Link
              href="https://www.instagram.com/youdexsof"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonsClasses}
            >
              <Image
                className="w-[50%]"
                src={insta}

                alt="Yousof Hashemzade Instagram Profile | پروفایل اینستاگرام یوسف هاشم زاده"
                title="اینستاگرام من رو دنبال کن!"
              />
            </Link>
            <Link
              href="https://www.t.me/YOUDEXSOF"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonsClasses}
            >
              <Image
                className="w-[50%]"
                src={tel}
                alt="Yousof Hashemzade Telegram Account | پروفایل تلگرام یوسف هاشم زاده"
                title="تلگرام من رو دنبال کن!"
              />
            </Link>
            <Link
              href="https://www.linkedin.com/in/yousof-hashemezade"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonsClasses}
            >
              <Image
                className="w-[50%]"
                src={linkedin}
                alt="Yousof Hashemzade LinkedIn Profile | پروفایل لینکدین یوسف هاشم زاده"
                title="در لینکدین با من ارتباط برقرار کن!"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
