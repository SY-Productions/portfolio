"use client";
import React, { useState, memo } from "react";
import MailIcon from "@mui/icons-material/Mail";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import TitleIcon from "@mui/icons-material/Title";
import { useLang } from "@/app/context/LanguageContext";

// Memoized for better performance
const CallForm = memo(function CallForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [focused, setFocused] = useState<string | null>(null);
  const { t } = useLang();

  const labelClasses = "relative flex items-center";

  const inputClasses = `flex-1 bg-black/20 px-[3vw] lg:px-[1vw] py-[2vh] outline-none
                       border border-white/10 focus:border-white/20
                       transition-all duration-300 rounded-none
                       placeholder:text-white/30 2xl:placeholder:text-lg 2xl:text-lg
                       indent-7 hover:border-white/20 backdrop-blur-md`;

  const focusClasses =
    "before:absolute before:content-[''] before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-gradient-to-r before:from-[#3A0D12] before:to-[#3B070A]";

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name || !email || !subject || !message) {
      alert(t("contact.validation"));
      return;
    }

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(
      `${t("contact.namePlaceholder")}: ${name}\n\n${t(
        "contact.messagePlaceholder",
      )}: ${message}`,
    )}`;

    window.location.href = mailtoLink;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 font-[ybn] w-[80vw] lg:w-full mx-auto gap-4 text-white text-sm"
    >
      <label
        className={`${labelClasses} ${focused === "name" ? focusClasses : ""}`}
      >
        <AccountBoxIcon
          sx={{ color: "white", fontSize: 20 }}
          className="absolute start-3 opacity-70"
        />
        <input
          type="text"
          placeholder={t("contact.namePlaceholder")}
          className={`${inputClasses} min-w-[10vw]`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={() => setFocused("name")}
          onBlur={() => setFocused(null)}
        />
      </label>
      <label
        className={`${labelClasses} ${focused === "email" ? focusClasses : ""}`}
      >
        <MailIcon
          sx={{ color: "white", fontSize: 20 }}
          className="absolute start-3 opacity-70"
        />
        <input
          type="email"
          className={`${inputClasses} min-w-[10vw]`}
          placeholder={t("contact.emailPlaceholder")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setFocused("email")}
          onBlur={() => setFocused(null)}
        />
      </label>
      <label
        className={`${labelClasses} col-span-2 ${
          focused === "subject" ? focusClasses : ""
        }`}
      >
        <TitleIcon
          sx={{ color: "white", fontSize: 20 }}
          className="absolute start-3 opacity-70"
        />
        <input
          type="text"
          placeholder={t("contact.subjectPlaceholder")}
          className={inputClasses}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          onFocus={() => setFocused("subject")}
          onBlur={() => setFocused(null)}
        />
      </label>
      <div
        className={`relative col-span-2 ${
          focused === "message" ? focusClasses : ""
        }`}
      >
        <textarea
          className={`${inputClasses} w-full indent-0 col-span-2 min-h-[8rem] max-h-[15rem] p-4`}
          placeholder={t("contact.messagePlaceholder")}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onFocus={() => setFocused("message")}
          onBlur={() => setFocused(null)}
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-gradient-to-r from-[#3B070A]/20 to-[#3A0D12]/20
                 hover:from-[#3B070A]/30 hover:to-[#3A0D12]/30
                 border border-white/10 hover:border-white/20
                 text-white font-normal col-span-2 h-[7vh]
                 2xl:text-xl rounded-none
                 transition-all duration-300 hover:-translate-y-1
                 relative
                 before:absolute before:content-[''] before:bottom-0 before:left-0 before:w-0 before:h-0
                 hover:before:w-full hover:before:h-full before:transition-all before:duration-500
                 before:border-l before:border-b before:border-[#3A0D12]/50
                 hover:after:w-full hover:after:h-full after:absolute after:content-[''] after:top-0
                 after:right-0 after:w-0 after:h-0 after:transition-all after:duration-500
                 after:border-t after:border-r after:border-[#3B070A]/50
                 backdrop-blur-md"
      >
        {t("contact.submitBtn")}
      </button>
    </form>
  );
});

export default CallForm;
