"use client";
import React, { useEffect, useRef, useState } from "react";
import { useLang } from "@/app/context/LanguageContext";
import { API_BASE_URL } from "@/app/config";
import { SiGithub } from "react-icons/si";
import { ExternalLink } from "lucide-react";

interface WorkSample {
  id: number;
  isWeb: string;
  faTitle: string;
  enTitle: string;
  arTitle: string;
  faDescription: string;
  enDescription: string;
  arDescription: string;
  link: string;
  technologys: string;
  customLinks: string | null;
}

function isGitHubLink(link: string, customLinks: string | null): boolean {
  if (link.includes("github.com")) return true;
  if (!customLinks) return false;
  try {
    const parsed = JSON.parse(customLinks) as Array<{ url: string }>;
    return parsed.some((l) => l.url?.includes("github.com"));
  } catch {
    return customLinks.includes("github.com");
  }
}

function getGitHubUrl(link: string, customLinks: string | null): string {
  if (link.includes("github.com")) return link;
  if (!customLinks) return link;
  try {
    const parsed = JSON.parse(customLinks) as Array<{ url: string }>;
    return parsed.find((l) => l.url?.includes("github.com"))?.url ?? link;
  } catch {
    return link;
  }
}

export default function OpenSource() {
  const { t, lang } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<WorkSample[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/worksamples`, { cache: "no-store" })
      .then((r) => r.json())
      .then((data: WorkSample[]) => {
        if (Array.isArray(data)) {
          setProjects(data.filter((ws) => isGitHubLink(ws.link, ws.customLinks)));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || loading) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll(".will-animate").forEach((child, i) => {
            setTimeout(() => child.classList.add("in-view"), i * 70);
          });
          el.querySelector(".section-title")?.classList.add("in-view");
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loading]);

  const getTitle = (ws: WorkSample) =>
    lang === "en" && ws.enTitle ? ws.enTitle : lang === "ar" && ws.arTitle ? ws.arTitle : ws.faTitle;

  const getDesc = (ws: WorkSample) => {
    const raw =
      lang === "en" && ws.enDescription
        ? ws.enDescription
        : lang === "ar" && ws.arDescription
        ? ws.arDescription
        : ws.faDescription;
    const plain = raw.includes("%g%") ? raw.split("%g%")[0] : raw;
    return plain.length > 160 ? plain.slice(0, 160) + "…" : plain;
  };

  const getTechs = (ws: WorkSample) =>
    ws.technologys ? ws.technologys.split(",").map((t) => t.trim()).filter(Boolean) : [];

  if (!loading && projects.length === 0) return null;

  return (
    <div id="open-source" ref={sectionRef} className="relative bg-[#0d0000] h-auto">
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute top-0 start-0 end-0 h-px bg-white/5" />
      <div className="absolute bottom-0 start-0 end-0 h-px bg-white/5" />

      <div className="relative z-10 lg:w-[78vw] lg:ms-[22vw] pb-14 px-4 lg:px-0">
        <div className="pt-[5vh] mb-10 w-[90%] lg:w-full ps-[5vw] lg:ps-0">
          <h3 className="section-title mb-6 will-animate">{t("openSource.title")}</h3>
          <p className="font-[ybn] text-white/60 text-sm lg:text-base 2xl:text-lg leading-7 will-animate">
            {t("openSource.description")}
          </p>
        </div>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-4 lg:px-0">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-52 bg-white/[0.03] border border-white/5 animate-pulse" />
            ))}
          </div>
        )}

        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-4 lg:px-0">
            {projects.map((ws, i) => {
              const githubUrl = getGitHubUrl(ws.link, ws.customLinks);
              const techs = getTechs(ws);
              return (
                <article
                  key={ws.id}
                  className="will-animate group flex flex-col border border-white/8 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/15 transition-all duration-300 overflow-hidden"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  {/* Top accent bar */}
                  <div className="h-[3px] w-full bg-gradient-to-r from-[#3B070A] via-[#5A0E12] to-transparent" />

                  <div className="flex flex-col flex-1 p-5">
                    {/* Icon + title */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 bg-white/5 border border-white/10 flex-shrink-0">
                        <SiGithub size={18} className="text-white/60" />
                      </div>
                      <h4 className="font-[ybb] text-white/90 text-base leading-snug pt-1">
                        {getTitle(ws)}
                      </h4>
                    </div>

                    <p className="font-[ybn] text-white/50 text-sm leading-6 flex-1 mb-4">
                      {getDesc(ws)}
                    </p>

                    {/* Tech tags */}
                    {techs.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {techs.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="text-xs font-[inter] px-2 py-0.5 bg-white/[0.04] border border-white/10 text-white/50"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Links */}
                    <div className="flex gap-2 mt-auto">
                      <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-[ybn] px-3 py-1.5 border border-white/15 text-white/70 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all"
                      >
                        <SiGithub size={12} />
                        {t("openSource.viewCode")}
                      </a>
                      {!ws.link.includes("github.com") && ws.link && (
                        <a
                          href={ws.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-[ybn] px-3 py-1.5 border border-white/15 text-white/50 hover:text-white/80 hover:border-white/25 hover:bg-white/5 transition-all"
                        >
                          <ExternalLink size={11} />
                          {t("openSource.liveDemo")}
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
