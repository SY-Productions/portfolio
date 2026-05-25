"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import { Plus, Search, X, FileJson } from "lucide-react";
import AdminModal from "../AdminModal";
import AdminRowActions from "../AdminRowActions";
import ImageGalleryField from "../components/ImageGalleryField";
import TechTagSelector from "../components/TechTagSelector";
import YearMonthPicker from "../components/YearMonthPicker";

interface WorkSample {
  id: number;
  isWeb: string;
  faTitle: string;
  enTitle: string;
  arTitle: string;
  faDescription: string;
  enDescription: string;
  arDescription: string;
  pictures: string;
  link: string;
  technologys: string;
  faStartDate: string;
  enStartDate: string;
  arStartDate: string;
  faEndDate: string;
  enEndDate: string;
  arEndDate: string;
  customLinks: string | null;
  order: number;
}

interface DateVal {
  enYear: string;
  enMonth: string;
  faYear: string;
  faMonth: string;
}
const emptyDV: DateVal = { enYear: "", enMonth: "", faYear: "", faMonth: "" };
function dvToFa(dv: DateVal) {
  return dv.faYear
    ? dv.faMonth
      ? `${dv.faYear}/${dv.faMonth.padStart(2, "0")}`
      : dv.faYear
    : "";
}
function dvToEn(dv: DateVal) {
  return dv.enYear
    ? dv.enMonth
      ? `${dv.enYear}/${dv.enMonth.padStart(2, "0")}`
      : dv.enYear
    : "";
}

const emptyForm = {
  isWeb: "0",
  faTitle: "",
  enTitle: "",
  arTitle: "",
  faDescription: "",
  enDescription: "",
  arDescription: "",
  pictures: "",
  link: "",
  technologys: "",
  customLinks: "",
  startDate: emptyDV as DateVal,
  endDate: emptyDV as DateVal,
  arStartDate: "",
  arEndDate: "",
};

// JSON template example for user guidance
const JSON_TEMPLATE = `{
  "isWeb": "0",
  "faTitle": "عنوان فارسی",
  "enTitle": "English Title",
  "arTitle": "العنوان العربي",
  "faDescription": "توضیحات فارسی",
  "enDescription": "English description",
  "arDescription": "الوصف العربي",
  "link": "https://example.com",
  "technologys": "Flutter Dart Firebase",
  "faStartDate": "1402/01",
  "enStartDate": "2023/01",
  "arStartDate": "2023/01",
  "faEndDate": "1402/12",
  "enEndDate": "2023/12",
  "arEndDate": "2023/12",
  "customLinks": null
}`;

export default function WorkSamplesAdminPage() {
  const [items, setItems] = useState<WorkSample[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [inputMode, setInputMode] = useState<"form" | "json">("form");
  const [jsonInput, setJsonInput] = useState("");
  const [jsonError, setJsonError] = useState("");
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"all" | "web" | "mobile">("all");

  const fetchItems = useCallback(async () => {
    const res = await fetch("/api/worksamples");
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // Filtered items based on search + type filter
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        !search ||
        item.faTitle.toLowerCase().includes(search.toLowerCase()) ||
        item.enTitle.toLowerCase().includes(search.toLowerCase()) ||
        (item.arTitle || "").toLowerCase().includes(search.toLowerCase()) ||
        item.technologys.toLowerCase().includes(search.toLowerCase());
      const matchesType =
        filterType === "all" ||
        (filterType === "web" && item.isWeb === "1") ||
        (filterType === "mobile" && item.isWeb === "0");
      return matchesSearch && matchesType;
    });
  }, [items, search, filterType]);

  function openAdd() {
    setForm(emptyForm);
    setJsonInput(JSON_TEMPLATE);
    setJsonError("");
    setInputMode("form");
    setEditId(null);
    setModalMode("add");
  }

  function openEdit(item: WorkSample) {
    setForm({
      isWeb: item.isWeb,
      faTitle: item.faTitle,
      enTitle: item.enTitle,
      arTitle: item.arTitle ?? "",
      faDescription: item.faDescription,
      enDescription: item.enDescription,
      arDescription: item.arDescription ?? "",
      pictures: item.pictures,
      link: item.link,
      technologys: item.technologys,
      customLinks: item.customLinks ?? "",
      startDate: {
        faYear: item.faStartDate,
        faMonth: "",
        enYear: item.enStartDate,
        enMonth: "",
      },
      endDate: {
        faYear: item.faEndDate,
        faMonth: "",
        enYear: item.enEndDate,
        enMonth: "",
      },
      arStartDate: item.arStartDate ?? "",
      arEndDate: item.arEndDate ?? "",
    });
    setJsonInput("");
    setJsonError("");
    setInputMode("form");
    setEditId(item.id);
    setModalMode("edit");
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleParseJson() {
    setJsonError("");
    try {
      const parsed = JSON.parse(jsonInput);
      setForm((prev) => ({
        ...prev,
        isWeb: String(parsed.isWeb ?? "0"),
        faTitle: parsed.faTitle ?? "",
        enTitle: parsed.enTitle ?? "",
        arTitle: parsed.arTitle ?? "",
        faDescription: parsed.faDescription ?? "",
        enDescription: parsed.enDescription ?? "",
        arDescription: parsed.arDescription ?? "",
        pictures: parsed.pictures ?? "",
        link: parsed.link ?? "",
        technologys: parsed.technologys ?? "",
        customLinks: parsed.customLinks
          ? JSON.stringify(parsed.customLinks)
          : "",
        arStartDate: parsed.arStartDate ?? "",
        arEndDate: parsed.arEndDate ?? "",
        startDate: {
          faYear: parsed.faStartDate ?? "",
          faMonth: "",
          enYear: parsed.enStartDate ?? "",
          enMonth: "",
        },
        endDate: {
          faYear: parsed.faEndDate ?? "",
          faMonth: "",
          enYear: parsed.enEndDate ?? "",
          enMonth: "",
        },
      }));
      setInputMode("form");
      toast.success("JSON parsed! Review and submit.");
    } catch (err) {
      setJsonError(
        "Invalid JSON: " + (err instanceof Error ? err.message : String(err)),
      );
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const isAdding = modalMode === "add";

    const payload = {
      isWeb: form.isWeb,
      faTitle: form.faTitle,
      enTitle: form.enTitle,
      arTitle: form.arTitle,
      faDescription: form.faDescription,
      enDescription: form.enDescription,
      arDescription: form.arDescription,
      pictures: form.pictures,
      link: form.link,
      technologys: form.technologys,
      customLinks: form.customLinks || null,
      faStartDate: dvToFa(form.startDate),
      enStartDate: dvToEn(form.startDate),
      arStartDate: form.arStartDate,
      faEndDate: dvToFa(form.endDate),
      enEndDate: dvToEn(form.endDate),
      arEndDate: form.arEndDate,
    };

    const url = isAdding ? "/api/worksamples" : `/api/worksamples/${editId}`;
    const res = await fetch(url, {
      method: isAdding ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      toast.success(isAdding ? "Work sample added!" : "Updated!");
      setModalMode(null);
      fetchItems();
    } else {
      const err = await res.json();
      toast.error("Error: " + (err.error || JSON.stringify(err)));
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this work sample?")) return;
    const res = await fetch(`/api/worksamples/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Deleted!");
      fetchItems();
    } else {
      toast.error("Failed to delete.");
    }
  }

  async function handleMove(index: number, direction: "up" | "down") {
    const newItems = [...items];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    [newItems[index], newItems[swapIndex]] = [
      newItems[swapIndex],
      newItems[index],
    ];
    setItems(newItems);

    const ids = newItems.map((item) => item.id);
    const res = await fetch("/api/worksamples/reorder", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
    });
    if (!res.ok) {
      toast.error("Reorder failed.");
      fetchItems();
    }
  }

  const inputClass =
    "w-full bg-black/30 border border-white/10 focus:border-white/30 outline-none px-3 py-2 text-white text-sm placeholder:text-white/20 transition-colors";
  const labelClass = "block text-white/60 text-xs mb-1";

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Work Samples</h2>
          <p className="text-white/40 text-sm mt-1">{items.length} items</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 bg-[#3B070A]/60 hover:bg-[#5A0E12]/60
                     border border-[#5A0E12]/50 text-white text-sm transition-all duration-200"
        >
          <Plus size={16} /> Add New
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or technology…"
            className="w-full bg-black/20 border border-white/10 pl-9 pr-4 py-2 text-white text-sm placeholder:text-white/20 outline-none focus:border-white/30"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
            >
              <X size={12} />
            </button>
          )}
        </div>
        <select
          value={filterType}
          onChange={(e) =>
            setFilterType(e.target.value as "all" | "web" | "mobile")
          }
          className="bg-black/20 border border-white/10 px-3 py-2 text-white text-sm outline-none focus:border-white/30"
        >
          <option value="all">All Types</option>
          <option value="mobile">Mobile</option>
          <option value="web">Web</option>
        </select>
      </div>

      {loading ? (
        <p className="text-white/40">Loading…</p>
      ) : (
        <div className="border border-white/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="text-left px-4 py-3 text-white/50 font-medium">
                  #
                </th>
                <th className="text-left px-4 py-3 text-white/50 font-medium">
                  Title (FA)
                </th>
                <th className="text-left px-4 py-3 text-white/50 font-medium">
                  Title (EN)
                </th>
                <th className="text-left px-4 py-3 text-white/50 font-medium">
                  Type
                </th>
                <th className="text-left px-4 py-3 text-white/50 font-medium">
                  Technologies
                </th>
                <th className="text-right px-4 py-3 text-white/50 font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => {
                const realIndex = items.findIndex((i) => i.id === item.id);
                return (
                  <tr
                    key={item.id}
                    className="border-b border-white/5 hover:bg-white/3 transition-colors"
                  >
                    <td className="px-4 py-3 text-white/30">{realIndex + 1}</td>
                    <td className="px-4 py-3 text-white/80">{item.faTitle}</td>
                    <td className="px-4 py-3 text-white/60">{item.enTitle}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 text-xs border ${
                          item.isWeb === "1"
                            ? "border-blue-500/30 text-blue-400 bg-blue-900/20"
                            : "border-green-500/30 text-green-400 bg-green-900/20"
                        }`}
                      >
                        {item.isWeb === "1" ? "Web" : "Mobile"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-white/40 max-w-xs truncate">
                      {item.technologys}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end">
                        <AdminRowActions
                          onEdit={() => openEdit(item)}
                          onDelete={() => handleDelete(item.id)}
                          onMoveUp={() => handleMove(realIndex, "up")}
                          onMoveDown={() => handleMove(realIndex, "down")}
                          isFirst={realIndex === 0}
                          isLast={realIndex === items.length - 1}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredItems.length === 0 && (
            <div className="text-center py-12 text-white/30">
              {search || filterType !== "all"
                ? "No results found."
                : "No work samples yet."}
            </div>
          )}
        </div>
      )}

      {modalMode && (
        <AdminModal
          title={modalMode === "add" ? "Add Work Sample" : "Edit Work Sample"}
          onClose={() => setModalMode(null)}
        >
          {/* Mode switcher */}
          <div className="flex gap-2 mb-4">
            <button
              type="button"
              onClick={() => setInputMode("form")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs border transition-colors ${
                inputMode === "form"
                  ? "bg-[#3B070A]/60 border-[#5A0E12]/50 text-white"
                  : "bg-white/5 border-white/10 text-white/50 hover:text-white/70"
              }`}
            >
              Form
            </button>
            <button
              type="button"
              onClick={() => setInputMode("json")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs border transition-colors ${
                inputMode === "json"
                  ? "bg-[#3B070A]/60 border-[#5A0E12]/50 text-white"
                  : "bg-white/5 border-white/10 text-white/50 hover:text-white/70"
              }`}
            >
              <FileJson size={12} />
              Create from JSON
            </button>
          </div>

          {inputMode === "json" ? (
            <div className="space-y-3">
              <p className="text-white/40 text-xs">
                Paste a JSON object with the work sample fields. Click
                &quot;Parse &amp; Fill Form&quot; to populate the form.
              </p>
              <textarea
                value={jsonInput}
                onChange={(e) => {
                  setJsonInput(e.target.value);
                  setJsonError("");
                }}
                rows={16}
                className="w-full bg-black/30 border border-white/10 focus:border-white/30 outline-none px-3 py-2 text-white text-xs font-mono placeholder:text-white/20 resize-none"
              />
              {jsonError && <p className="text-red-400 text-xs">{jsonError}</p>}
              <button
                type="button"
                onClick={handleParseJson}
                className="w-full py-2.5 bg-[#3B070A]/60 hover:bg-[#5A0E12]/60 border border-[#5A0E12]/50 text-white text-sm transition-all"
              >
                Parse &amp; Fill Form →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={labelClass}>Type</label>
                <select
                  name="isWeb"
                  value={form.isWeb}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="0">Mobile App</option>
                  <option value="1">Web App</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Title (Persian)</label>
                  <input
                    name="faTitle"
                    value={form.faTitle}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    dir="rtl"
                  />
                </div>
                <div>
                  <label className={labelClass}>Title (English)</label>
                  <input
                    name="enTitle"
                    value={form.enTitle}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Title (Arabic)</label>
                <input
                  name="arTitle"
                  value={form.arTitle}
                  onChange={handleChange}
                  className={inputClass}
                  dir="rtl"
                />
              </div>

              <div>
                <label className={labelClass}>Description (Persian)</label>
                <textarea
                  name="faDescription"
                  value={form.faDescription}
                  onChange={handleChange}
                  rows={3}
                  className={inputClass + " resize-none"}
                  dir="rtl"
                />
              </div>
              <div>
                <label className={labelClass}>Description (English)</label>
                <textarea
                  name="enDescription"
                  value={form.enDescription}
                  onChange={handleChange}
                  rows={3}
                  className={inputClass + " resize-none"}
                />
              </div>
              <div>
                <label className={labelClass}>Description (Arabic)</label>
                <textarea
                  name="arDescription"
                  value={form.arDescription}
                  onChange={handleChange}
                  rows={2}
                  className={inputClass + " resize-none"}
                  dir="rtl"
                />
              </div>

              <div>
                <label className={labelClass}>Pictures Gallery</label>
                <ImageGalleryField
                  value={form.pictures}
                  onChange={(v) => setForm((p) => ({ ...p, pictures: v }))}
                  folder="portfolio"
                />
              </div>

              <div>
                <label className={labelClass}>Project Link</label>
                <input
                  name="link"
                  value={form.link}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className={labelClass}>
                  Custom Links (JSON or empty)
                </label>
                <input
                  name="customLinks"
                  value={form.customLinks ?? ""}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder='[{"label":"GitHub","link":"https://..."}]'
                />
              </div>

              <div>
                <label className={labelClass}>Technologies</label>
                <TechTagSelector
                  value={form.technologys}
                  onChange={(v) => setForm((p) => ({ ...p, technologys: v }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <YearMonthPicker
                  label="Start Date (FA/EN)"
                  value={form.startDate}
                  onChange={(v) => setForm((p) => ({ ...p, startDate: v }))}
                />
                <YearMonthPicker
                  label="End Date (FA/EN)"
                  value={form.endDate}
                  onChange={(v) => setForm((p) => ({ ...p, endDate: v }))}
                  optional
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Start Date (Arabic)</label>
                  <input
                    name="arStartDate"
                    value={form.arStartDate}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="2023/01"
                  />
                </div>
                <div>
                  <label className={labelClass}>End Date (Arabic)</label>
                  <input
                    name="arEndDate"
                    value={form.arEndDate}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="2023/12"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#3B070A]/60 hover:bg-[#5A0E12]/60 border border-[#5A0E12]/50 text-white transition-all"
                >
                  {modalMode === "add" ? "Add" : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => setModalMode(null)}
                  className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </AdminModal>
      )}
    </div>
  );
}
