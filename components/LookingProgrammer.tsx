import React from "react";

export default function LookingProgrammer() {
  return (
    <div className="font-[ybb] w-full bg-b text-white h-auto min-h-[15vh] flex flex-col md:flex-row items-center justify-between py-[6vh] gap-8">
      <span className="font-[ybn] text-2xl 2xl:text-3xl md:mr-[5rem] lg:mr-[22vw]">
        دنبال برنامه نویس میگردی؟
      </span>
      <button className="font-[ybb] btn w-[60vw] md:w-[15vw] h-[6vh] md:ml-[10vw] hover:bg-white/10 hover:border-white lg:hover:w-[18vw] transition-all duration-200 rounded-none bg-transparent border border-white text-white text-base 2xl:text-lg shadow-md">
        باهام تماس بگیر
      </button>
    </div>
  );
}
