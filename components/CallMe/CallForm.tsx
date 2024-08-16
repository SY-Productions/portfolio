"use client";
import React from "react";
import MailIcon from "@mui/icons-material/Mail";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import TitleIcon from "@mui/icons-material/Title";

export default function CallForm() {
  const labelClasses = "relative flex items-center ";
  const inputClasses =
    "flex-1 bg-white/5 px-[3vw] lg:px-[1vw] py-[2vh] outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-d focus:ring-offset-1 ring-offset-d focus:rounded-sm transition-all duration-200 placeholder:text-white/30 2xl:placeholder:text-lg 2xl:text-lg indent-7 hover:ring-white/20 ";
  function handleSubmit(e: any) {
    e.preventDefault();
    console.log("hehe");
  }
  function handleClick() {
    console.log("hehe");
  }
  //
  // implement mailto
  //
  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 font-[ybn] w-[80vw] lg:w-full mx-auto [&>*]:m-1 text-white text-sm"
    >
      <label className={labelClasses}>
        <AccountBoxIcon
          sx={{ color: "white", fontSize: 20 }}
          className="absolute right-3"
        />
        <input
          type="text"
          placeholder="نام"
          className={inputClasses + "min-w-[10vw]"}
        />
      </label>
      <label className={labelClasses}>
        <MailIcon
          sx={{ color: "white", fontSize: 20 }}
          className="absolute right-3"
        />
        <input
          type="text"
          className={inputClasses + "min-w-[10vw]"}
          placeholder="ایمیل"
        />
      </label>
      <label className={labelClasses + "col-span-2"}>
        <TitleIcon
          sx={{ color: "white", fontSize: 20 }}
          className="absolute right-3"
        />
        <input type="text" placeholder="موضوع" className={inputClasses} />
      </label>
      <textarea
        className={
          inputClasses +
          "indent-0 col-span-2 min-h-[6rem] max-h-[15rem] transition-none"
        }
        placeholder="پیام"
      ></textarea>
      <button
        onClick={() => handleClick()}
        className="btn border-0 px-0 rounded-none h-[7vh] 2xl:text-xl hover:bg-d/60 hover:rounded-lg transition-all duration-75 text-white font-normal bg-d col-span-2 "
      >
        ارسال
      </button>
    </form>
  );
}
