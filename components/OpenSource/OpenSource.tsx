"use client";
import React, { useEffect, useRef, useState } from "react";
import { useLang } from "@/app/context/LanguageContext";
import { API_BASE_URL } from "@/app/config";
import { SiGithub } from "react-icons/si";
import { ExternalLink, Star, GitFork, Terminal } from "lucide-react";
import type { PinnedRepo } from "@/lib/github";

const ACCENT_COLORS = [
  { dot: "#f7c833", line: "rgba(247,200,51,0.15)" },
  { dot: "#61dafb", line: "rgba(97,218,251,0.15)" },
  { dot: "#4db6ac", line: "rgba(77,182,172,0.15)" },
  { dot: "#ff8c6b", line: "rgba(255,140,107,0.15)" },
  { dot: "#c792ea", line: "rgba(199,146,234,0.15)" },
  { dot: "#f4a8ac", line: "rgba(244,168,172,0.15)" },
];

const MAX_DESCRIPTION_LENGTH = 140;
const MAX_TECH_CHIPS = 4;

/** Turns "my-cool-repo" into "My Cool Repo" for the card headline. */
function humanizeRepoName(name: string): string {
  return name
    .replace(/[-_.]+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function truncate(text: string): string {
  return text.length > MAX_DESCRIPTION_LENGTH
    ? `${text.slice(0, MAX_DESCRIPTION_LENGTH)}…`
    : text;
}

/** Primary language first, then repo topics — deduped, capped for layout. */
function getTechs(repo: PinnedRepo): string[] {
  const all = repo.primaryLanguage ? [repo.primaryLanguage, ...repo.topics] : repo.topics;
  const seen = new Set<string>();
  return all
    .filter((tech) => {
      const key = tech.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, MAX_TECH_CHIPS);
}

function formatCount(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return String(count);
}

export default function OpenSource() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [repos, setRepos] = useState<PinnedRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${API_BASE_URL}/github/pinned`, { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((data: PinnedRepo[]) => {
        if (Array.isArray(data)) setRepos(data);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Could not load pinned repositories:", error);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || loading) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll(".will-animate").forEach((child, i) => {
            setTimeout(() => child.classList.add("in-view"), i * 60);
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

  if (!loading && repos.length === 0) return null;

  return (
    <div
      id="open-source"
      ref={sectionRef}
      className="relative overflow-x-hidden"
      style={{ background: "#0a0000" }}
    >
      {/* Terminal scan-line texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.4) 2px, rgba(255,255,255,0.4) 3px)",
        }}
      />

      {/* Side accent bar */}
      <div
        className="absolute start-0 top-0 bottom-0 w-[3px]"
        style={{ background: "linear-gradient(180deg, transparent 0%, #3B070A 30%, #5A0E12 50%, #3B070A 70%, transparent 100%)" }}
      />

      {/* Floating GitHub watermark */}
      <div className="absolute end-8 top-8 pointer-events-none select-none opacity-[0.04]">
        <SiGithub size={160} className="text-white" aria-hidden="true" />
      </div>

      <div className="section-shell pb-16">
        {/* Header */}
        <div className="pt-[5vh] mb-10">
          <div className="flex items-center gap-3 mb-4 will-animate">
            <div className="flex items-center gap-1.5 text-[#4db6ac] font-mono text-sm">
              <Terminal size={14} />
              <span className="opacity-60">~/projects/open-source</span>
            </div>
          </div>
          <h2 className="section-title mb-5">{t("openSource.title")}</h2>
          <p className="font-[ybn] text-white/50 text-sm lg:text-base leading-7 will-animate max-w-2xl">
            {t("openSource.description")}
          </p>
        </div>

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="glass-card h-44 animate-pulse" />
            ))}
          </div>
        )}

        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {repos.map((repo, i) => {
              const techs = getTechs(repo);
              const accent = ACCENT_COLORS[i % ACCENT_COLORS.length];

              return (
                <article
                  key={repo.id}
                  className="glass-card will-animate group flex flex-col overflow-hidden relative"
                  style={{ transitionDelay: `${i * 55}ms` }}
                >
                  {/* Top accent line */}
                  <div className="h-[2px] w-full" style={{ background: accent.line, borderBottom: `1px solid ${accent.dot}30` }}>
                    <div className="h-full w-[30%]" style={{ background: `linear-gradient(90deg, ${accent.dot}80, transparent)` }} />
                  </div>

                  <div className="flex flex-col flex-1 p-5">
                    {/* Repo header — GitHub style */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <SiGithub size={16} className="text-white/40 flex-shrink-0" aria-hidden="true" />
                        <span className="font-mono text-xs text-white/40 truncate">{repo.nameWithOwner}</span>
                      </div>
                      {/* Live stars / forks */}
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span
                          className="flex items-center gap-1 text-[10px] text-white/35"
                          title={`${repo.stars} stars`}
                        >
                          <Star size={10} />
                          <span className="font-mono">{formatCount(repo.stars)}</span>
                        </span>
                        <span
                          className="flex items-center gap-1 text-[10px] text-white/35"
                          title={`${repo.forks} forks`}
                        >
                          <GitFork size={10} />
                          <span className="font-mono">{formatCount(repo.forks)}</span>
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h4
                      className="font-[ybb] text-base lg:text-lg leading-snug mb-2 transition-colors group-hover:text-white"
                      style={{ color: "rgba(255,255,255,0.85)" }}
                    >
                      {humanizeRepoName(repo.name)}
                    </h4>

                    {/* Description */}
                    <p className="font-[ybn] text-sm leading-6 flex-1 mb-4" style={{ color: "rgba(255,255,255,0.42)" }}>
                      {repo.description ? truncate(repo.description) : ""}
                    </p>

                    {/* Tech chips — primary language + topics */}
                    {techs.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {techs.map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-[10px] px-2 py-0.5"
                            style={{
                              background: accent.line,
                              border: `1px solid ${accent.dot}25`,
                              color: accent.dot,
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 mt-auto">
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-[ybn] px-3 py-1.5 transition-all"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "rgba(255,255,255,0.65)",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
                          (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)";
                          (e.currentTarget as HTMLElement).style.color = "#fff";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                          (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                          (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)";
                        }}
                      >
                        <SiGithub size={11} aria-hidden="true" />
                        {t("openSource.viewCode")}
                      </a>
                      {repo.homepageUrl && (
                        <a
                          href={repo.homepageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-[ybn] px-3 py-1.5 transition-all"
                          style={{
                            background: "transparent",
                            border: `1px solid ${accent.dot}30`,
                            color: accent.dot,
                            opacity: 0.8,
                          }}
                        >
                          <ExternalLink size={10} />
                          {t("openSource.liveDemo")}
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Hover corner glow */}
                  <div
                    className="absolute bottom-0 end-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 100% 100%, ${accent.dot}15, transparent 70%)`,
                    }}
                  />
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
