"use client";

import { useState, useEffect } from "react";
import { X, Plus, ChevronDown } from "lucide-react";

const DEFAULT_TECHS = [
  "Flutter",
  "Dart",
  "Python",
  "FastAPI",
  "Django",
  "Flask",
  "Firebase",
  "SQLite",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Redis",
  "Next.js",
  "React",
  "Vue",
  "Angular",
  "TypeScript",
  "JavaScript",
  "TailwindCSS",
  "Sass",
  "CSS",
  "HTML",
  "GetX",
  "BLoC",
  "Provider",
  "Riverpod",
  "Retrofit",
  "Dio",
  "Axios",
  "REST API",
  "GraphQL",
  "Figma",
  "Git",
  "GitHub",
  "Docker",
  "Kubernetes",
  "Node.js",
  "Express",
  "Prisma",
  "Supabase",
  "AWS",
  "GCP",
];

const STORAGE_KEY = "admin_custom_techs";

interface TechTagSelectorProps {
  value: string; // comma-separated
  onChange: (value: string) => void;
}

export default function TechTagSelector({
  value,
  onChange,
}: TechTagSelectorProps) {
  const selected = value
    ? value
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [customTechs, setCustomTechs] = useState<string[]>([]);
  const [newTech, setNewTech] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setCustomTechs(JSON.parse(stored));
    } catch {}
  }, []);

  const allTechs = [...DEFAULT_TECHS, ...customTechs].filter(
    (t, i, arr) => arr.indexOf(t) === i,
  );

  const filtered = allTechs.filter(
    (t) =>
      t.toLowerCase().includes(search.toLowerCase()) && !selected.includes(t),
  );

  function toggle(tech: string) {
    const next = selected.includes(tech)
      ? selected.filter((t) => t !== tech)
      : [...selected, tech];
    onChange(next.join(","));
  }

  function remove(tech: string) {
    onChange(selected.filter((t) => t !== tech).join(","));
  }

  function addCustom() {
    const name = newTech.trim();
    if (!name) return;
    if (!allTechs.includes(name)) {
      const updated = [...customTechs, name];
      setCustomTechs(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
    toggle(name);
    setNewTech("");
  }

  return (
    <div className="relative">
      {/* Selected tags */}
      <div
        className="min-h-[40px] flex flex-wrap gap-1.5 p-2 bg-black/30 border border-white/10
                   cursor-pointer hover:border-white/20 transition-colors"
        onClick={() => setOpen((o) => !o)}
      >
        {selected.length === 0 && (
          <span className="text-white/20 text-sm self-center">
            Select technologies…
          </span>
        )}
        {selected.map((t) => (
          <span
            key={t}
            className="flex items-center gap-1 px-2 py-0.5 bg-[#3B070A]/60 border border-[#5A0E12]/40 text-white text-xs"
            onClick={(e) => e.stopPropagation()}
          >
            {t}
            <button
              type="button"
              onClick={() => remove(t)}
              className="text-white/40 hover:text-white"
            >
              <X size={10} />
            </button>
          </span>
        ))}
        <ChevronDown size={14} className="ml-auto self-center text-white/30" />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 left-0 right-0 top-full mt-1 bg-[#0D0D0D] border border-white/10 shadow-xl max-h-64 overflow-y-auto">
          {/* Search + add new */}
          <div className="p-2 border-b border-white/10 flex gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search or add new…"
              className="flex-1 bg-black/30 border border-white/10 px-2 py-1 text-white text-xs outline-none"
              onClick={(e) => e.stopPropagation()}
              autoFocus
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setNewTech(search);
                addCustom();
                setSearch("");
              }}
              className="px-2 py-1 bg-[#3B070A]/60 border border-[#5A0E12]/40 text-white text-xs hover:bg-[#5A0E12]/60 transition-colors flex items-center gap-1"
            >
              <Plus size={10} /> Add
            </button>
          </div>

          {/* Technology list */}
          <div className="p-1">
            {filtered.length === 0 && (
              <div className="text-white/30 text-xs px-3 py-2">
                No matches. Click Add to create.
              </div>
            )}
            {filtered.map((t) => (
              <button
                key={t}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggle(t);
                }}
                className="w-full text-left px-3 py-1.5 text-sm text-white/70 hover:bg-white/5 hover:text-white transition-colors"
              >
                {t}
                {customTechs.includes(t) && (
                  <span className="ml-2 text-[10px] text-white/30">custom</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Hidden raw input for form submission */}
      <input type="hidden" name="technologys" value={value} />
    </div>
  );
}
