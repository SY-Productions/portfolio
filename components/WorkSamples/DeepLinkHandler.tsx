"use client";

import { useEffect, useRef } from "react";
import { useWorkSample } from "./WorkSampleContext";
import { useLang, type Lang } from "@/app/context/LanguageContext";
import { useTheme } from "@/app/context/ThemeContext";

export default function DeepLinkHandler() {
  const { mobileData, webData, setIsWebFrame, setCurrentSampleIndex, setIsDrawerOpen } =
    useWorkSample();
  const { setLang } = useLang();
  const { setTheme } = useTheme();
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    if (mobileData.length === 0 && webData.length === 0) return;

    const params = new URLSearchParams(window.location.search);
    const wsId = params.get("ws");
    if (!wsId) return;

    const id = parseInt(wsId);
    if (isNaN(id)) return;

    const lang = params.get("lang") as Lang | null;
    if (lang === "en" || lang === "fa" || lang === "ar") setLang(lang);

    const theme = params.get("theme");
    if (theme === "dark" || theme === "light") setTheme(theme as "dark" | "light");

    const webIdx = webData.findIndex((s) => s.id === id);
    const mobileIdx = mobileData.findIndex((s) => s.id === id);

    if (webIdx !== -1) {
      setIsWebFrame(true);
      setCurrentSampleIndex(webIdx);
    } else if (mobileIdx !== -1) {
      setIsWebFrame(false);
      setCurrentSampleIndex(mobileIdx);
    } else {
      return;
    }

    handled.current = true;
    setIsDrawerOpen(true);

    setTimeout(() => {
      document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  }, [mobileData, webData, setIsWebFrame, setCurrentSampleIndex, setIsDrawerOpen, setLang, setTheme]);

  return null;
}
