import { Metadata } from "next";
import prisma from "@/prisma/client";
import CVClient from "./CVClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "CV | Yousof Hashemzade",
  robots: { index: false, follow: false },
};

type Lang = "fa" | "en" | "ar";
type Theme = "dark" | "light";

// ─── Translations ──────────────────────────────────────────────────────────────

const TR: Record<Lang, Record<string, string>> = {
  fa: {
    name: "یوسف هاشم زاده",
    nameEn: "Yousof Hashemzade",
    title: "توسعه‌دهنده فول‌استک موبایل (Flutter) و بک‌اند (Python)",
    summary:
      "با ترکیب علاقه به کامپیوتر و چیز ساختن وارد این حوزه شدم. بعد از بسیاری تلاش‌های ناکام در زمینه‌های مختلف، جایگاه مورد علاقه‌ام را پیدا کردم و به یک توسعه‌دهنده فول‌استک اپلیکیشن‌های موبایل و وب تبدیل شدم.",
    technicalSkills: "مهارت‌های فنی",
    softSkills: "مهارت‌های نرم",
    workExperience: "سوابق کاری",
    portfolio: "نمونه‌کارها",
    openSource: "پروژه‌های متن‌باز",
    education: "سوابق تحصیلی",
    eventsAwards: "رویدادها، مسابقات و جوایز",
    generatedOn: "تاریخ دانلود",
    present: "تاکنون",
    professional: "رزومه حرفه‌ای",
    softEnglish: "انگلیسی",
    softPersian: "فارسی",
    softFeedback: "انتقادپذیر",
    softUpToDate: "به‌روز",
    softListener: "خوب شنیدن",
    softPatient: "صبور",
  },
  en: {
    name: "Yousof Hashemzade",
    nameEn: "Yousof Hashemzade",
    title: "Full-Stack Mobile (Flutter) & Backend (Python) Developer",
    summary:
      "Driven by a passion for computers and building things, I entered this field. After many attempts across different domains, I found my niche and became a full-stack mobile and web application developer specializing in Flutter and Python.",
    technicalSkills: "Technical Skills",
    softSkills: "Soft Skills",
    workExperience: "Work Experience",
    portfolio: "Portfolio",
    openSource: "Open Source Projects",
    education: "Education",
    eventsAwards: "Events, Competitions & Awards",
    generatedOn: "Generated on",
    present: "Present",
    professional: "Professional CV",
    softEnglish: "English",
    softPersian: "Persian",
    softFeedback: "Open to Feedback",
    softUpToDate: "Up to Date",
    softListener: "Good Listener",
    softPatient: "Patient",
  },
  ar: {
    name: "يوسف هاشم زاده",
    nameEn: "Yousof Hashemzade",
    title: "مطور تطبيقات الهاتف المحمول (Flutter) والخادم (Python)",
    summary:
      "دخلت هذا المجال بشغف للحاسوب وبناء الأشياء. بعد محاولات عديدة في مجالات مختلفة، وجدت مكاني وأصبحت مطوراً متكاملاً لتطبيقات الهاتف المحمول والويب.",
    technicalSkills: "المهارات التقنية",
    softSkills: "المهارات الشخصية",
    workExperience: "خبرة العمل",
    portfolio: "معرض الأعمال",
    openSource: "المشاريع مفتوحة المصدر",
    education: "التعليم",
    eventsAwards: "الفعاليات والمسابقات والجوائز",
    generatedOn: "تاريخ التنزيل",
    present: "حتى الآن",
    professional: "السيرة الذاتية المهنية",
    softEnglish: "الإنجليزية",
    softPersian: "الفارسية",
    softFeedback: "منفتح على الملاحظات",
    softUpToDate: "محدّث",
    softListener: "مستمع جيد",
    softPatient: "صبور",
  },
};

// ─── Theme palettes ────────────────────────────────────────────────────────────

function palette(theme: Theme) {
  if (theme === "light") {
    return {
      pageBg: "linear-gradient(160deg, #ede6e6 0%, #f5f0f0 60%, #f0e8e8 100%)",
      docBg: "rgba(255,255,255,0.75)",
      docBorder: "rgba(0,0,0,0.08)",
      docShadow: "0 4px 40px rgba(90,14,18,0.06)",
      surface: "rgba(255,255,255,0.7)",
      border: "rgba(0,0,0,0.09)",
      accentA: "#5A0E12",
      accentB: "#8B1E24",
      text: "#1a0505",
      textSub: "rgba(26,5,5,0.65)",
      textMuted: "rgba(26,5,5,0.4)",
      chip: "rgba(90,14,18,0.08)",
      chipBorder: "rgba(90,14,18,0.28)",
      chipText: "#4a0b10",
      chipNeutralBg: "rgba(0,0,0,0.04)",
      chipNeutralBorder: "rgba(0,0,0,0.1)",
      chipNeutralText: "rgba(26,5,5,0.65)",
      dateBg: "rgba(90,14,18,0.08)",
      dateBorder: "rgba(90,14,18,0.25)",
      dateText: "#5A0E12",
      cardAccent: "rgba(90,14,18,0.35)",
      printBodyBg: "#f5f0f0",
      printDocBg: "#f9f5f5",
    };
  }
  return {
    pageBg: "linear-gradient(160deg, #0A0808 0%, #0E0A0A 60%, #120808 100%)",
    docBg: "rgba(0,0,0,0.35)",
    docBorder: "rgba(255,255,255,0.1)",
    docShadow: "0 0 60px rgba(90,14,18,0.08)",
    surface: "rgba(255,255,255,0.03)",
    border: "rgba(255,255,255,0.1)",
    accentA: "#5A0E12",
    accentB: "#3B070A",
    text: "rgba(255,255,255,0.9)",
    textSub: "rgba(255,255,255,0.6)",
    textMuted: "rgba(255,255,255,0.4)",
    chip: "rgba(90,14,18,0.22)",
    chipBorder: "rgba(90,14,18,0.5)",
    chipText: "rgba(255,255,255,0.85)",
    chipNeutralBg: "rgba(255,255,255,0.05)",
    chipNeutralBorder: "rgba(255,255,255,0.1)",
    chipNeutralText: "rgba(255,255,255,0.6)",
    dateBg: "rgba(90,14,18,0.15)",
    dateBorder: "rgba(90,14,18,0.35)",
    dateText: "#c0464e",
    cardAccent: "rgba(90,14,18,0.4)",
    printBodyBg: "#0E0A0A",
    printDocBg: "#0E0A0A",
  };
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(lang: Lang): string {
  const localeMap: Record<Lang, string> = { fa: "fa-IR", en: "en-US", ar: "ar-SA" };
  return new Intl.DateTimeFormat(localeMap[lang], {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());
}

function pickLang<T extends { name: string; nameEn?: string; nameAr?: string }>(item: T, lang: Lang): string {
  if (lang === "en" && item.nameEn) return item.nameEn;
  if (lang === "ar" && item.nameAr) return item.nameAr;
  return item.name;
}

function pickDesc<T extends { description: string; descriptionEn?: string; descriptionAr?: string }>(item: T, lang: Lang): string {
  if (lang === "en" && item.descriptionEn) return item.descriptionEn;
  if (lang === "ar" && item.descriptionAr) return item.descriptionAr;
  return item.description;
}

function pickWsTitle(ws: { faTitle: string; enTitle: string; arTitle: string }, lang: Lang): string {
  if (lang === "en" && ws.enTitle) return ws.enTitle;
  if (lang === "ar" && ws.arTitle) return ws.arTitle;
  return ws.faTitle || ws.enTitle;
}

function pickWsDesc(ws: { faDescription: string; enDescription: string; arDescription: string }, lang: Lang): string {
  if (lang === "en" && ws.enDescription) return ws.enDescription;
  if (lang === "ar" && ws.arDescription) return ws.arDescription;
  return ws.faDescription || ws.enDescription;
}

function pickWsDates(
  ws: { faStartDate: string; enStartDate: string; arStartDate: string; faEndDate: string; enEndDate: string; arEndDate: string },
  lang: Lang
): string {
  if (lang === "en") return `${ws.enStartDate} – ${ws.enEndDate}`;
  if (lang === "ar") return `${ws.arStartDate || ws.enStartDate} – ${ws.arEndDate || ws.enEndDate}`;
  return `${ws.faStartDate} – ${ws.faEndDate}`;
}

function isGitHub(link: string, customLinks: string | null): boolean {
  if (link.includes("github.com")) return true;
  if (customLinks) {
    try {
      const links = JSON.parse(customLinks) as string[];
      return links.some((l) => l.includes("github.com"));
    } catch { return false; }
  }
  return false;
}

function getGitHubUrl(link: string, customLinks: string | null): string {
  if (link.includes("github.com")) return link;
  if (customLinks) {
    try {
      const links = JSON.parse(customLinks) as string[];
      const gh = links.find((l) => l.includes("github.com"));
      if (gh) return gh;
    } catch { /* */ }
  }
  return link;
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function Chip({
  label, isRtl, c, accent,
}: {
  label: string; isRtl: boolean; c: ReturnType<typeof palette>; accent?: boolean;
}) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 10px",
        background: accent ? c.chip : c.chipNeutralBg,
        border: `1px solid ${accent ? c.chipBorder : c.chipNeutralBorder}`,
        color: accent ? c.chipText : c.chipNeutralText,
        fontSize: 11,
        marginInlineEnd: 6,
        marginBottom: 6,
        fontFamily: isRtl ? '"ybn", sans-serif' : '"inter", sans-serif',
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

function Section({
  title, children, isRtl, c,
}: {
  title: string; children: React.ReactNode; isRtl: boolean; c: ReturnType<typeof palette>;
}) {
  return (
    <section style={{ marginBottom: 36, pageBreakInside: "avoid" }}>
      <div style={{ position: "relative", marginBottom: 20 }}>
        <h2
          style={{
            fontSize: 13,
            fontFamily: isRtl ? '"ybb", sans-serif' : '"inter", sans-serif',
            fontWeight: 700,
            color: c.text,
            textTransform: "uppercase",
            letterSpacing: isRtl ? 0 : 2,
            paddingBottom: 10,
            marginBottom: 0,
            borderBottom: `1px solid ${c.border}`,
            position: "relative",
            margin: 0,
          }}
        >
          {title}
        </h2>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: isRtl ? "auto" : 0,
            right: isRtl ? 0 : "auto",
            width: 50,
            height: 2,
            background: `linear-gradient(90deg, ${c.accentA}, ${c.accentB})`,
          }}
        />
      </div>
      <div style={{ paddingTop: 16 }}>{children}</div>
    </section>
  );
}

function EntryCard({
  name, years, description, chips, link, isRtl, c, boldFont, bodyFont,
}: {
  name: string; years: string; description?: string;
  chips?: string[]; link?: string; isRtl: boolean; c: ReturnType<typeof palette>;
  boldFont: string; bodyFont: string;
}) {
  return (
    <div
      style={{
        background: c.surface,
        border: `1px solid ${c.border}`,
        borderInlineStart: `2px solid ${c.cardAccent}`,
        padding: "14px 16px",
        marginBottom: 12,
        pageBreakInside: "avoid",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: description || (chips && chips.length) ? 8 : 0,
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontFamily: boldFont, fontSize: 13, fontWeight: 700, color: c.text }}>
          {name}
        </span>
        <span
          style={{
            fontSize: 10,
            color: c.dateText,
            fontFamily: '"inter", sans-serif',
            background: c.dateBg,
            border: `1px solid ${c.dateBorder}`,
            padding: "2px 8px",
            whiteSpace: "nowrap",
          }}
        >
          {years}
        </span>
      </div>
      {description && (
        <p
          style={{
            fontSize: 11.5,
            color: c.textSub,
            lineHeight: 1.75,
            margin: (chips?.length || link) ? "0 0 8px" : 0,
            fontFamily: bodyFont,
          }}
        >
          {description}
        </p>
      )}
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block",
            fontSize: 10,
            color: c.accentA,
            fontFamily: '"inter", sans-serif',
            margin: chips?.length ? "0 0 8px" : 0,
            wordBreak: "break-all",
            textDecoration: "none",
          }}
        >
          {link}
        </a>
      )}
      {chips && chips.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", marginTop: 2 }}>
          {chips.map((ch) => (
            <Chip key={ch} label={ch} isRtl={isRtl} c={c} accent />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function CVPage({
  searchParams,
}: {
  searchParams: { lang?: string; theme?: string };
}) {
  const lang: Lang = (searchParams.lang as Lang) || "fa";
  const theme: Theme = searchParams.theme === "light" ? "light" : "dark";
  const isRtl = lang === "fa" || lang === "ar";
  const tr = TR[lang];
  const c = palette(theme);
  const bodyFont = isRtl ? '"ybn", sans-serif' : '"inter", sans-serif';
  const boldFont = isRtl ? '"ybb", sans-serif' : '"inter", sans-serif';

  const [educations, works, events, settings, workSamples] = await Promise.all([
    prisma.education.findMany({ orderBy: { order: "asc" } }),
    prisma.work.findMany({ orderBy: { order: "asc" } }),
    prisma.event.findMany({ orderBy: { order: "asc" } }),
    prisma.siteSettings.findFirst(),
    prisma.workSample.findMany({ orderBy: { order: "asc" } }),
  ]);

  const technologies = (settings?.technologies || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const profilePic = settings?.profilePic || "/me.jpg";
  const generatedDate = formatDate(lang);

  const softSkills = [tr.softEnglish, tr.softPersian, tr.softFeedback, tr.softUpToDate, tr.softListener, tr.softPatient];

  const portfolio = workSamples.filter((ws) => !isGitHub(ws.link, ws.customLinks ?? null));
  const openSourceProjects = workSamples.filter((ws) => isGitHub(ws.link, ws.customLinks ?? null));

  return (
    <>
      <CVClient lang={lang} theme={theme} />

      {/* ── Global print reset ─────────────────────────────────────────── */}
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
            @media print {
              .no-print { display: none !important; }
              * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
              @page { size: A4 portrait; margin: 0; }
              html, body {
                margin: 0 !important;
                padding: 0 !important;
                width: 100% !important;
              }
              #cv-outer {
                padding: 0 !important;
                min-height: 0 !important;
                width: 100% !important;
                background: ${c.printBodyBg} !important;
              }
              a { color: inherit; }
              #cv-document {
                width: 100% !important;
                max-width: none !important;
                margin: 0 !important;
                padding: 12mm 16mm !important;
                border: none !important;
                box-shadow: none !important;
                background: ${c.printDocBg} !important;
              }
            }
          `,
        }}
      />

      {/* ── Page wrapper ───────────────────────────────────────────────── */}
      <div
        id="cv-outer"
        dir={isRtl ? "rtl" : "ltr"}
        style={{
          minHeight: "100vh",
          background: c.pageBg,
          color: c.text,
          fontFamily: bodyFont,
          paddingTop: 80,
          paddingBottom: 60,
        }}
      >
        {/* ── CV Document ─────────────────────────────────────────────── */}
        <div
          id="cv-document"
          style={{
            maxWidth: 860,
            margin: "0 auto",
            padding: "36px 44px 52px",
            background: c.docBg,
            border: `1px solid ${c.docBorder}`,
            boxShadow: c.docShadow,
          }}
        >
          {/* ── Header ─────────────────────────────────────────────── */}
          <header
            style={{
              display: "flex",
              gap: 20,
              paddingBottom: 24,
              marginBottom: 28,
              borderBottom: `1px solid ${c.border}`,
              alignItems: "flex-start",
            }}
          >
            {/* Profile picture */}
            <div
              style={{
                flexShrink: 0,
                width: 80,
                height: 80,
                position: "relative",
                border: `1px solid ${c.border}`,
                padding: 3,
                background: theme === "dark" ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.6)",
              }}
            >
              <div
                style={{
                  position: "absolute", top: -1,
                  [isRtl ? "left" : "right"]: -1,
                  width: 14, height: 14,
                  borderTop: `2px solid ${c.accentA}`,
                  [isRtl ? "borderLeft" : "borderRight"]: `2px solid ${c.accentA}`,
                }}
              />
              <div
                style={{
                  position: "absolute", bottom: -1,
                  [isRtl ? "right" : "left"]: -1,
                  width: 14, height: 14,
                  borderBottom: `2px solid ${c.accentB}`,
                  [isRtl ? "borderRight" : "borderLeft"]: `2px solid ${c.accentB}`,
                }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profilePic}
                alt={tr.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>

            {/* Name / title / contact */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <h1
                style={{
                  fontFamily: boldFont, fontSize: 26, fontWeight: 700,
                  color: c.text, margin: 0, lineHeight: 1.3,
                }}
              >
                {tr.name}
              </h1>
              {lang !== "en" && (
                <p
                  style={{
                    fontFamily: '"inter", sans-serif', fontSize: 12,
                    color: c.textMuted, margin: "3px 0 0", letterSpacing: 0.5,
                  }}
                >
                  {tr.nameEn}
                </p>
              )}
              <p
                style={{
                  fontFamily: bodyFont, fontSize: 12.5, color: c.textSub,
                  margin: "9px 0 14px", lineHeight: 1.6,
                }}
              >
                {tr.title}
              </p>
              <div
                style={{
                  display: "flex", flexWrap: "wrap", gap: "6px 18px",
                  fontSize: 11, color: c.textSub, fontFamily: '"inter", sans-serif',
                }}
              >
                <span>✉ youdexsof@gmail.com</span>
                <span>🌐 youdexsof.ir</span>
                <span>📍 Iran, Isfahan</span>
                <a href="https://github.com/YOUSSSOF" style={{ color: c.textSub, textDecoration: "none" }}>
                  github.com/YOUSSSOF
                </a>
                <a href="https://linkedin.com/in/yousof-hashemezade" style={{ color: c.textSub, textDecoration: "none" }}>
                  linkedin/yousof-hashemezade
                </a>
              </div>
            </div>

            {/* Date badge */}
            <div
              style={{
                flexShrink: 0, display: "flex", flexDirection: "column",
                alignItems: isRtl ? "flex-start" : "flex-end", gap: 4,
              }}
            >
              <span style={{ fontSize: 10, color: c.textMuted, fontFamily: bodyFont }}>
                {tr.generatedOn}
              </span>
              <span
                style={{
                  fontSize: 11, color: c.dateText, fontFamily: bodyFont,
                  background: c.dateBg, border: `1px solid ${c.dateBorder}`,
                  padding: "3px 10px", whiteSpace: "nowrap", direction: isRtl ? "rtl" : "ltr",
                }}
              >
                {generatedDate}
              </span>
            </div>
          </header>

          {/* ── Summary ──────────────────────────────────────────────── */}
          <Section title={tr.professional} isRtl={isRtl} c={c}>
            <p style={{ fontFamily: bodyFont, fontSize: 13, color: c.textSub, lineHeight: 1.9, margin: 0 }}>
              {tr.summary}
            </p>
          </Section>

          {/* ── Technical Skills ─────────────────────────────────────── */}
          <Section title={tr.technicalSkills} isRtl={isRtl} c={c}>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {technologies.map((tech) => (
                <Chip key={tech} label={tech} isRtl={isRtl} c={c} accent />
              ))}
            </div>
          </Section>

          {/* ── Soft Skills ──────────────────────────────────────────── */}
          <Section title={tr.softSkills} isRtl={isRtl} c={c}>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {softSkills.map((skill) => (
                <Chip key={skill} label={skill} isRtl={isRtl} c={c} />
              ))}
            </div>
          </Section>

          {/* ── Work Experience ──────────────────────────────────────── */}
          {works.length > 0 && (
            <Section title={tr.workExperience} isRtl={isRtl} c={c}>
              {works.map((work) => {
                const technos = (() => {
                  try { return JSON.parse(work.technos) as string[]; }
                  catch { return work.technos.split(",").map((s) => s.trim()); }
                })();
                return (
                  <EntryCard
                    key={work.id}
                    name={pickLang(work, lang)}
                    years={`${work.fromYear} – ${work.toYear ?? tr.present}`}
                    description={pickDesc(work, lang)}
                    chips={technos}
                    isRtl={isRtl}
                    c={c}
                    boldFont={boldFont}
                    bodyFont={bodyFont}
                  />
                );
              })}
            </Section>
          )}

          {/* ── Portfolio ────────────────────────────────────────────── */}
          {portfolio.length > 0 && (
            <Section title={tr.portfolio} isRtl={isRtl} c={c}>
              {portfolio.map((ws) => {
                const chips = ws.technologys.split(",").map((s) => s.trim()).filter(Boolean);
                return (
                  <EntryCard
                    key={ws.id}
                    name={pickWsTitle(ws, lang)}
                    years={pickWsDates(ws, lang)}
                    description={pickWsDesc(ws, lang)}
                    chips={chips}
                    link={ws.link}
                    isRtl={isRtl}
                    c={c}
                    boldFont={boldFont}
                    bodyFont={bodyFont}
                  />
                );
              })}
            </Section>
          )}

          {/* ── Open Source ──────────────────────────────────────────── */}
          {openSourceProjects.length > 0 && (
            <Section title={tr.openSource} isRtl={isRtl} c={c}>
              {openSourceProjects.map((ws) => {
                const chips = ws.technologys.split(",").map((s) => s.trim()).filter(Boolean);
                const ghUrl = getGitHubUrl(ws.link, ws.customLinks ?? null);
                return (
                  <EntryCard
                    key={ws.id}
                    name={pickWsTitle(ws, lang)}
                    years={pickWsDates(ws, lang)}
                    description={pickWsDesc(ws, lang)}
                    chips={chips}
                    link={ghUrl}
                    isRtl={isRtl}
                    c={c}
                    boldFont={boldFont}
                    bodyFont={bodyFont}
                  />
                );
              })}
            </Section>
          )}

          {/* ── Education ────────────────────────────────────────────── */}
          {educations.length > 0 && (
            <Section title={tr.education} isRtl={isRtl} c={c}>
              {educations.map((edu) => (
                <EntryCard
                  key={edu.id}
                  name={pickLang(edu, lang)}
                  years={`${edu.fromYear} – ${edu.toYear ?? tr.present}`}
                  description={pickDesc(edu, lang)}
                  isRtl={isRtl}
                  c={c}
                  boldFont={boldFont}
                  bodyFont={bodyFont}
                />
              ))}
            </Section>
          )}

          {/* ── Events & Awards ──────────────────────────────────────── */}
          {events.length > 0 && (
            <Section title={tr.eventsAwards} isRtl={isRtl} c={c}>
              {events.map((event) => (
                <EntryCard
                  key={event.id}
                  name={pickLang(event, lang)}
                  years={event.date}
                  description={pickDesc(event, lang)}
                  isRtl={isRtl}
                  c={c}
                  boldFont={boldFont}
                  bodyFont={bodyFont}
                />
              ))}
            </Section>
          )}

          {/* ── Footer ───────────────────────────────────────────────── */}
          <footer
            style={{
              marginTop: 36,
              paddingTop: 20,
              borderTop: `1px solid ${c.border}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 11, color: c.textMuted, fontFamily: '"inter", sans-serif' }}>
              youdexsof.ir
            </span>
            <span style={{ fontSize: 11, color: c.textMuted, fontFamily: bodyFont }}>
              {tr.generatedOn}: {generatedDate}
            </span>
          </footer>
        </div>
      </div>
    </>
  );
}
