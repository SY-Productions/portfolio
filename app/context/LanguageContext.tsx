"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";

export type Lang = "fa" | "en" | "ar";

// Country code → language map
const COUNTRY_LANG: Record<string, Lang> = {
  IR: "fa", // Iran → Farsi
  SA: "ar",
  AE: "ar",
  EG: "ar",
  IQ: "ar",
  SY: "ar",
  LB: "ar",
  JO: "ar",
  KW: "ar",
  QA: "ar",
  BH: "ar",
  OM: "ar",
  YE: "ar",
  PS: "ar",
  LY: "ar",
  TN: "ar",
  DZ: "ar",
  MA: "ar",
  SD: "ar",
  US: "en",
  GB: "en",
  AU: "en",
  CA: "en",
  NZ: "en",
};

export const LANG_DIR: Record<Lang, "rtl" | "ltr"> = {
  fa: "rtl",
  ar: "rtl",
  en: "ltr",
};

export const LANG_LABEL: Record<Lang, string> = {
  fa: "فا",
  ar: "ع",
  en: "EN",
};

// Translations
import fa from "../../messages/fa.json";
import en from "../../messages/en.json";
import ar from "../../messages/ar.json";

const translations: Record<Lang, typeof fa> = { fa, en, ar };

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  dir: "rtl" | "ltr";
}

const LangContext = createContext<LangCtx>({
  lang: "fa",
  setLang: () => {},
  t: (k) => k,
  dir: "rtl",
});

/** Dot-path accessor e.g. "nav.aboutMe" */
function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const parts = path.split(".");
  let cur: unknown = obj;
  for (const part of parts) {
    if (cur && typeof cur === "object" && part in (cur as object)) {
      cur = (cur as Record<string, unknown>)[part];
    } else {
      return path;
    }
  }
  return typeof cur === "string" ? cur : path;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fa");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("portfolio-lang") as Lang | null;
    if (stored && (stored === "fa" || stored === "en" || stored === "ar")) {
      applyLang(stored);
      setLangState(stored);
      setReady(true);
      return;
    }

    // IP-based detection on first visit
    fetch("https://ipapi.co/json/")
      .then((r) => r.json())
      .then((d) => {
        const detected: Lang = COUNTRY_LANG[d.country_code] ?? "fa";
        applyLang(detected);
        setLangState(detected);
        localStorage.setItem("portfolio-lang", detected);
      })
      .catch(() => {
        applyLang("fa");
      })
      .finally(() => setReady(true));
  }, []);

  function applyLang(l: Lang) {
    document.documentElement.setAttribute("lang", l);
    document.documentElement.setAttribute("dir", LANG_DIR[l]);
  }

  function setLang(l: Lang) {
    setLangState(l);
    applyLang(l);
    localStorage.setItem("portfolio-lang", l);
  }

  const t = useCallback(
    (key: string) =>
      getNestedValue(translations[lang] as Record<string, unknown>, key),
    [lang],
  );

  // Avoid hydration mismatch — render children only after client preference is resolved
  return (
    <LangContext.Provider value={{ lang, setLang, t, dir: LANG_DIR[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
