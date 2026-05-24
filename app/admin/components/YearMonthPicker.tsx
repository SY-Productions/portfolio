"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Minimal Jalali conversion (no library dependency)
// Converts Gregorian to Jalali
function toJalali(gy: number, gm: number): { jy: number; jm: number } {
  // Jalali leap year calculation
  const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  const jm_days = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];

  let gy2 = gm > 2 ? gy + 1 : gy;
  let days =
    355666 +
    365 * gy +
    Math.floor((gy2 + 3) / 4) -
    Math.floor((gy2 + 99) / 100) +
    Math.floor((gy2 + 399) / 400) +
    gm -
    1 +
    g_d_m[gm - 1];

  let jy = -1595 + 33 * Math.floor(days / 12053);
  days %= 12053;

  jy += 4 * Math.floor(days / 1461);
  days %= 1461;

  if (days > 365) {
    jy += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }

  let jm = 0;
  let acc = 0;
  for (let i = 0; i < 12; i++) {
    acc += jm_days[i];
    if (days < acc) {
      jm = i + 1;
      break;
    }
  }

  return { jy, jm };
}

function toGregorian(jy: number, jm: number): { gy: number; gm: number } {
  const jm_days = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
  let jy2 = jy - 979;
  let days =
    365 * jy2 + Math.floor(jy2 / 33) * 8 + Math.floor(((jy2 % 33) + 3) / 4);

  for (let i = 0; i < jm - 1; i++) days += jm_days[i];

  days += 79; // offset

  let gy = 1600 + 400 * Math.floor(days / 146097);
  days %= 146097;
  if (days > 36524) {
    gy += 100 * Math.floor(--days / 36524);
    days %= 36524;
    if (days >= 365) days++;
  }
  gy += 4 * Math.floor(days / 1461);
  days %= 1461;
  if (days > 365) {
    gy += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }

  const g_d_m = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const isLeap = gy % 4 === 0 && (gy % 100 !== 0 || gy % 400 === 0);
  if (isLeap) g_d_m[2] = 29;

  let gm = 1;
  for (let i = 1; i <= 12; i++) {
    if (days < g_d_m[i]) {
      gm = i;
      break;
    }
    days -= g_d_m[i];
  }

  return { gy, gm };
}

const FA_MONTHS = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

const EN_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface DateValue {
  enYear: string;
  enMonth: string; // "1".."12" or ""
  faYear: string;
  faMonth: string; // "1".."12" or ""
}

interface YearMonthPickerProps {
  label: string;
  value: DateValue;
  onChange: (v: DateValue) => void;
  optional?: boolean;
}

export default function YearMonthPicker({
  label,
  value,
  onChange,
  optional,
}: YearMonthPickerProps) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"en" | "fa">("fa");

  const now = new Date();
  const currentJalali = toJalali(now.getFullYear(), now.getMonth() + 1);

  const [viewYear, setViewYear] = useState(
    tab === "fa"
      ? parseInt(value.faYear) || currentJalali.jy
      : parseInt(value.enYear) || now.getFullYear(),
  );

  function updateView(t: "en" | "fa") {
    setTab(t);
    if (t === "fa") {
      setViewYear(parseInt(value.faYear) || currentJalali.jy);
    } else {
      setViewYear(parseInt(value.enYear) || now.getFullYear());
    }
  }

  function selectMonth(month: number) {
    if (tab === "fa") {
      const { gy, gm } = toGregorian(viewYear, month);
      onChange({
        faYear: String(viewYear),
        faMonth: String(month),
        enYear: String(gy),
        enMonth: String(gm),
      });
    } else {
      const { jy, jm } = toJalali(viewYear, month);
      onChange({
        enYear: String(viewYear),
        enMonth: String(month),
        faYear: String(jy),
        faMonth: String(jm),
      });
    }
    setOpen(false);
  }

  function clearDate() {
    onChange({ enYear: "", enMonth: "", faYear: "", faMonth: "" });
    setOpen(false);
  }

  const displayText = value.faYear
    ? `${FA_MONTHS[parseInt(value.faMonth) - 1] || ""} ${value.faYear} / ${
        EN_MONTHS[parseInt(value.enMonth) - 1] || ""
      } ${value.enYear}`
    : "Select…";

  return (
    <div className="relative">
      <label className="block text-white/60 text-xs mb-1">{label}</label>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left bg-black/30 border border-white/10 hover:border-white/30 px-3 py-2
                   text-sm text-white transition-colors flex items-center justify-between"
      >
        <span className={value.faYear ? "text-white" : "text-white/30"}>
          {displayText}
        </span>
        <ChevronRight
          size={14}
          className={`text-white/30 transition-transform ${
            open ? "rotate-90" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute z-50 left-0 right-0 top-full mt-1 bg-[#0D0D0D] border border-white/10 shadow-xl p-3">
          {/* Tab switch */}
          <div className="flex gap-1 mb-3">
            {(["fa", "en"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => updateView(t)}
                className={`flex-1 py-1.5 text-xs border transition-colors ${
                  tab === t
                    ? "bg-[#3B070A]/60 border-[#5A0E12]/50 text-white"
                    : "bg-white/5 border-white/10 text-white/50 hover:text-white"
                }`}
              >
                {t === "fa" ? "شمسی" : "Gregorian"}
              </button>
            ))}
          </div>

          {/* Year navigation */}
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={() => setViewYear((y) => y - 1)}
              className="p-1 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-white font-semibold">{viewYear}</span>
            <button
              type="button"
              onClick={() => setViewYear((y) => y + 1)}
              className="p-1 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Month grid */}
          <div className="grid grid-cols-3 gap-1">
            {(tab === "fa" ? FA_MONTHS : EN_MONTHS).map((m, i) => {
              const isSelected =
                tab === "fa"
                  ? value.faYear === String(viewYear) &&
                    value.faMonth === String(i + 1)
                  : value.enYear === String(viewYear) &&
                    value.enMonth === String(i + 1);
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => selectMonth(i + 1)}
                  className={`py-1.5 text-xs transition-colors border ${
                    isSelected
                      ? "bg-[#5A0E12]/60 border-[#8B1E24]/50 text-white"
                      : "bg-white/5 border-white/5 text-white/60 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {m}
                </button>
              );
            })}
          </div>

          {optional && (
            <button
              type="button"
              onClick={clearDate}
              className="mt-2 w-full py-1 text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              Clear (leave blank)
            </button>
          )}
        </div>
      )}
    </div>
  );
}
