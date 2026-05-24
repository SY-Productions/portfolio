"use client";

import { useEffect } from "react";

/** Loads custom theme colors from DB and injects them as CSS variables on mount */
export default function SiteSettingsLoader() {
  useEffect(() => {
    fetch("/api/site-settings")
      .then((r) => r.json())
      .then((d) => {
        if (!d || typeof d !== "object") return;
        const root = document.documentElement;
        if (d.themeA) root.style.setProperty("--color-a", d.themeA);
        if (d.themeB) root.style.setProperty("--color-b", d.themeB);
        if (d.themeC) root.style.setProperty("--color-c", d.themeC);
        if (d.themeD) root.style.setProperty("--color-d", d.themeD);
      })
      .catch(() => {}); // Silently ignore errors (default CSS vars remain)
  }, []);

  return null;
}
