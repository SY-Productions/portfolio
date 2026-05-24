"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { RefreshCw, Palette, User, Cpu } from "lucide-react";
import ImageGalleryField from "../components/ImageGalleryField";

interface Settings {
  themeA: string;
  themeB: string;
  themeC: string;
  themeD: string;
  profilePic: string;
  technologies: string;
}

const DEFAULT: Settings = {
  themeA: "#5A0E12",
  themeB: "#3B070A",
  themeC: "#141010",
  themeD: "#8B1E24",
  profilePic: "/pic.jpg",
  technologies: "Flutter,Dart,Python,FastAPI,Firebase",
};

const COLOR_LABELS: { key: keyof Settings; label: string; desc: string }[] = [
  { key: "themeA", label: "Color A — Accent", desc: "Primary accent / links" },
  {
    key: "themeB",
    label: "Color B — Accent Dark",
    desc: "Buttons, hover states",
  },
  {
    key: "themeC",
    label: "Color C — Background",
    desc: "Main page background",
  },
  {
    key: "themeD",
    label: "Color D — Accent Light",
    desc: "Highlights, badges",
  },
];

export default function SettingsAdminPage() {
  const [settings, setSettings] = useState<Settings>(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((d) => {
        setSettings({
          themeA: d.themeA ?? DEFAULT.themeA,
          themeB: d.themeB ?? DEFAULT.themeB,
          themeC: d.themeC ?? DEFAULT.themeC,
          themeD: d.themeD ?? DEFAULT.themeD,
          profilePic: d.profilePic ?? DEFAULT.profilePic,
          technologies: d.technologies ?? DEFAULT.technologies,
        });
        setLoading(false);
      });
  }, []);

  async function handleSave() {
    setSaving(true);
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });

    if (res.ok) {
      toast.success(
        "Settings saved! Refresh the main site to see theme changes.",
      );
      // Apply CSS variables immediately for preview
      const root = document.documentElement;
      root.style.setProperty("--color-a", settings.themeA);
      root.style.setProperty("--color-b", settings.themeB);
      root.style.setProperty("--color-c", settings.themeC);
      root.style.setProperty("--color-d", settings.themeD);
    } else {
      toast.error("Failed to save settings.");
    }
    setSaving(false);
  }

  function resetColors() {
    setSettings((p) => ({
      ...p,
      themeA: DEFAULT.themeA,
      themeB: DEFAULT.themeB,
      themeC: DEFAULT.themeC,
      themeD: DEFAULT.themeD,
    }));
  }

  const inputClass =
    "w-full bg-black/30 border border-white/10 focus:border-white/30 outline-none px-3 py-2 text-white text-sm placeholder:text-white/20 transition-colors";
  const labelClass = "block text-white/60 text-xs mb-1";

  if (loading) {
    return <div className="p-8 text-white/40">Loading settings…</div>;
  }

  return (
    <div className="p-8 max-w-2xl space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white">Site Settings</h2>
        <p className="text-white/40 text-sm mt-1">
          Control your portfolio&apos;s appearance, profile, and content.
        </p>
      </div>

      {/* Color Theme */}
      <section className="border border-white/10 p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette size={16} className="text-[#8B1E24]" />
            <h3 className="text-white font-medium">Color Theme</h3>
          </div>
          <button
            onClick={resetColors}
            className="flex items-center gap-1 text-xs text-white/40 hover:text-white/70 transition-colors"
          >
            <RefreshCw size={11} /> Reset defaults
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {COLOR_LABELS.map(({ key, label, desc }) => (
            <div key={key}>
              <label className={labelClass}>
                {label}
                <span className="block text-white/30">{desc}</span>
              </label>
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 border border-white/10 flex-shrink-0"
                  style={{ backgroundColor: settings[key] as string }}
                />
                <input
                  type="color"
                  value={settings[key] as string}
                  onChange={(e) =>
                    setSettings((p) => ({ ...p, [key]: e.target.value }))
                  }
                  className="w-12 h-8 bg-transparent border-0 cursor-pointer"
                />
                <input
                  type="text"
                  value={settings[key] as string}
                  onChange={(e) =>
                    setSettings((p) => ({ ...p, [key]: e.target.value }))
                  }
                  className={inputClass + " font-mono flex-1"}
                  placeholder="#000000"
                  maxLength={7}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Live preview bar */}
        <div className="mt-2">
          <p className={labelClass}>Preview</p>
          <div className="flex h-8 overflow-hidden border border-white/10">
            {(["themeA", "themeB", "themeC", "themeD"] as const).map((k) => (
              <div
                key={k}
                className="flex-1 transition-colors"
                style={{ backgroundColor: settings[k] }}
                title={settings[k]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Profile Picture */}
      <section className="border border-white/10 p-6 space-y-4">
        <div className="flex items-center gap-2">
          <User size={16} className="text-[#8B1E24]" />
          <h3 className="text-white font-medium">Profile Picture</h3>
        </div>

        <div className="flex items-start gap-4">
          {settings.profilePic && (
            <div className="w-20 h-20 relative flex-shrink-0 border border-white/10 overflow-hidden">
              <Image
                src={settings.profilePic}
                alt="Profile"
                fill
                className="object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          )}
          <div className="flex-1">
            <ImageGalleryField
              value={settings.profilePic}
              onChange={(v) => setSettings((p) => ({ ...p, profilePic: v }))}
              folder="portfolio"
              single
            />
          </div>
        </div>
      </section>

      {/* Technologies preset */}
      <section className="border border-white/10 p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Cpu size={16} className="text-[#8B1E24]" />
          <h3 className="text-white font-medium">Default Technologies List</h3>
          <span className="text-white/30 text-xs">
            (used in the tech selector dropdown)
          </span>
        </div>
        <div>
          <label className={labelClass}>
            Comma-separated list of technologies
          </label>
          <textarea
            value={settings.technologies}
            onChange={(e) =>
              setSettings((p) => ({ ...p, technologies: e.target.value }))
            }
            rows={4}
            className={inputClass + " resize-none font-mono text-xs"}
            placeholder="Flutter,Dart,Python,..."
          />
          <p className="text-white/25 text-xs mt-1">
            {settings.technologies.split(",").filter(Boolean).length}{" "}
            technologies listed
          </p>
        </div>
      </section>

      {/* Save */}
      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full py-3 bg-[#3B070A]/60 hover:bg-[#5A0E12]/60 border border-[#5A0E12]/50 text-white font-medium transition-all disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save Settings"}
      </button>
    </div>
  );
}
