export function IranFlag({ size = "1.4em" }: { size?: string }) {
  return (
    <svg viewBox="0 0 30 20" style={{ width: size, height: "auto", display: "block" }} xmlns="http://www.w3.org/2000/svg">
      <rect y="0" width="30" height="6.67" fill="#239F40" />
      <rect y="6.67" width="30" height="6.66" fill="#FFFFFF" />
      <rect y="13.33" width="30" height="6.67" fill="#DA0000" />
    </svg>
  );
}

export function UKFlag({ size = "1.4em" }: { size?: string }) {
  return (
    <svg viewBox="0 0 60 40" style={{ width: size, height: "auto", display: "block" }} xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="40" fill="#012169" />
      <path d="M0,0 L60,40" stroke="white" strokeWidth="10" />
      <path d="M60,0 L0,40" stroke="white" strokeWidth="10" />
      <path d="M0,0 L60,40" stroke="#C8102E" strokeWidth="6" />
      <path d="M60,0 L0,40" stroke="#C8102E" strokeWidth="6" />
      <rect x="25" y="0" width="10" height="40" fill="white" />
      <rect x="0" y="15" width="60" height="10" fill="white" />
      <rect x="27" y="0" width="6" height="40" fill="#C8102E" />
      <rect x="0" y="17" width="60" height="6" fill="#C8102E" />
    </svg>
  );
}

export function SaudiFlag({ size = "1.4em" }: { size?: string }) {
  return (
    <svg viewBox="0 0 60 40" style={{ width: size, height: "auto", display: "block" }} xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="40" fill="#006C35" />
      <rect x="10" y="14" width="40" height="2.5" rx="0.5" fill="white" />
      <line x1="12" y1="24" x2="46" y2="24" stroke="white" strokeWidth="1.8" />
      <polygon points="43,20 47,24 43,28" fill="white" />
    </svg>
  );
}

export type FlagLang = "fa" | "en" | "ar";

export function LangFlag({ lang, size }: { lang: FlagLang; size?: string }) {
  if (lang === "fa") return <IranFlag size={size} />;
  if (lang === "ar") return <SaudiFlag size={size} />;
  return <UKFlag size={size} />;
}
