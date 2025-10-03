import Link from "next/link";
import { GiMinotaur } from "react-icons/gi";

const Custom404 = () => {
  return (
    <div className="bg-[url('/vectors/sec1-bgdark.svg')] bg-no-repeat bg-cover w-full h-screen flex flex-col items-center justify-center text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-black/0 backdrop-blur-sm"></div>

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* 404 Icon */}
        <span className="text-7xl sm:text-8xl font-extrabold text-white tracking-tight">
          <GiMinotaur />
        </span>

        {/* Title */}
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl sm:text-5xl font-extrabold font-[ybn] text-white tracking-tight">
            صفحه پیدا نشد!
          </h1>
          <span className="w-16 h-1 bg-gradient-to-r from-[#8C9EFF] to-[#0F3D3E]"></span>
        </div>

        {/* Description */}
        <p className="font-[ybn] text-white/60 text-sm lg:text-base 2xl:text-xl leading-7 max-w-md">
          متاسفانه صفحه‌ای که به دنبال آن بودید وجود ندارد. لطفاً به صفحه اصلی
          بازگردید.
        </p>

        {/* Back to Home Button */}
        <Link
          href="/"
          className="flex items-center text-white justify-center h-[6vh] lg:h-[8vh] px-[1.5vw] min-w-[22vw] sm:min-w-0 bg-gradient-to-r from-[#0F3D3E]/20 to-[#1B5B5C]/20 hover:from-[#0F3D3E]/30 hover:to-[#1B5B5C]/30 rounded-none font-[ybn] text-nowrap text-sm 2xl:text-base transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(140,158,255,0.2)] border border-white/10 hover:border-white/20 backdrop-blur-md"
        >
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </div>
  );
};

export default Custom404;
