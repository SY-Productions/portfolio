"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import { Plus, Search, X, FileJson } from "lucide-react";
import AdminModal from "../AdminModal";
import AdminRowActions from "../AdminRowActions";
import ImageGalleryField from "../components/ImageGalleryField";
import YearMonthPicker from "../components/YearMonthPicker";

interface Event {
  id: number;
  name: string;
  nameEn: string;
  nameAr: string;
  date: string;
  picture: string;
  attachment: string;
  description: string;
  descriptionEn: string;
  descriptionAr: string;
  order: number;
}

interface DateVal {
  enYear: string;
  enMonth: string;
  faYear: string;
  faMonth: string;
}
const emptyDV: DateVal = { enYear: "", enMonth: "", faYear: "", faMonth: "" };
function dvToStr(dv: DateVal) {
  return dv.enYear
    ? dv.enMonth
      ? `${dv.enYear}-${dv.enMonth.padStart(2, "0")}`
      : dv.enYear
    : "";
}

const emptyForm = {
  id: 0,
  name: "",
  nameEn: "",
  nameAr: "",
  dateVal: emptyDV as DateVal,
  picture: "",
  attachment: "",
  description: "",
  descriptionEn: "",
  descriptionAr: "",
};

const JSON_TEMPLATE = `{
  "name": "نام رویداد / گواهینامه",
  "nameEn": "Event / Certificate Name",
  "nameAr": "اسم الحدث / الشهادة",
  "date": "2024-06",
  "description": "توضیحات فارسی",
  "descriptionEn": "English description",
  "descriptionAr": "الوصف العربي"
}`;

export default function EventsAdminPage() {
  const [items, setItems] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [inputMode, setInputMode] = useState<"form" | "json">("form");
  const [jsonInput, setJsonInput] = useState("");
  const [jsonError, setJsonError] = useState("");
  const [search, setSearch] = useState("");

  const fetchItems = useCallback(async () => {
    const res = await fetch("/api/events");
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const filteredItems = useMemo(() => {
    if (!search) return items;
    const q = search.toLowerCase();
    return items.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        (i.nameEn || "").toLowerCase().includes(q) ||
        (i.date || "").includes(q),
    );
  }, [items, search]);

  function openAdd() {
    setForm(emptyForm);
    setJsonInput(JSON_TEMPLATE);
    setJsonError("");
    setInputMode("form");
    setModalMode("add");
  }

  function openEdit(item: Event) {
    // Parse date string back to DateVal
    const parts = item.date.split("-");
    setForm({
      id: item.id,
      name: item.name,
      nameEn: item.nameEn ?? "",
      nameAr: item.nameAr ?? "",
      dateVal: {
        enYear: parts[0] || "",
        enMonth: parts[1] || "",
        faYear: "",
        faMonth: "",
      },
      picture: item.picture,
      attachment: item.attachment,
      description: item.description,
      descriptionEn: item.descriptionEn ?? "",
      descriptionAr: item.descriptionAr ?? "",
    });
    setJsonInput("");
    setJsonError("");
    setInputMode("form");
    setModalMode("edit");
  }

  function handleParseJson() {
    setJsonError("");
    try {
      const p = JSON.parse(jsonInput);
      const parts = (p.date || "").split("-");
      setForm((prev) => ({
        ...prev,
        name: p.name ?? "",
        nameEn: p.nameEn ?? "",
        nameAr: p.nameAr ?? "",
        description: p.description ?? "",
        descriptionEn: p.descriptionEn ?? "",
        descriptionAr: p.descriptionAr ?? "",
        dateVal: {
          enYear: parts[0] || "",
          enMonth: parts[1] || "",
          faYear: "",
          faMonth: "",
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

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const isAdding = modalMode === "add";

    const payload = {
      name: form.name,
      nameEn: form.nameEn,
      nameAr: form.nameAr,
      date: dvToStr(form.dateVal),
      picture: form.picture,
      attachment: form.attachment,
      description: form.description,
      descriptionEn: form.descriptionEn,
      descriptionAr: form.descriptionAr,
    };

    const url = isAdding ? "/api/events" : `/api/events/${form.id}`;
    const res = await fetch(url, {
      method: isAdding ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      toast.success(isAdding ? "Event added!" : "Updated!");
      setModalMode(null);
      fetchItems();
    } else {
      const err = await res.json();
      toast.error("Error: " + (err.error || JSON.stringify(err)));
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this event?")) return;
    const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
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

    const res = await fetch("/api/events/reorder", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: newItems.map((i) => i.id) }),
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
          <h2 className="text-2xl font-bold text-white">
            Events & Certificates
          </h2>
          <p className="text-white/40 text-sm mt-1">{items.length} records</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 bg-[#3B070A]/60 hover:bg-[#5A0E12]/60
                     border border-[#5A0E12]/50 text-white text-sm transition-all duration-200"
        >
          <Plus size={16} /> Add New
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search events or certificates…"
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
                  Name
                </th>
                <th className="text-left px-4 py-3 text-white/50 font-medium">
                  Date
                </th>
                <th className="text-left px-4 py-3 text-white/50 font-medium">
                  Picture
                </th>
                <th className="text-left px-4 py-3 text-white/50 font-medium">
                  Attachment
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
                    <td className="px-4 py-3 text-white/80">{item.name}</td>
                    <td className="px-4 py-3 text-white/50">{item.date}</td>
                    <td className="px-4 py-3 text-white/40 text-xs truncate max-w-[120px]">
                      {item.picture}
                    </td>
                    <td className="px-4 py-3 text-white/40 text-xs truncate max-w-[120px]">
                      {item.attachment}
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
              {search ? "No results found." : "No events yet."}
            </div>
          )}
        </div>
      )}

      {modalMode && (
        <AdminModal
          title={modalMode === "add" ? "Add Event" : "Edit Event"}
          onClose={() => setModalMode(null)}
        >
          {/* Mode switcher */}
          <div className="flex gap-2 mb-4">
            <button
              type="button"
              onClick={() => setInputMode("form")}
              className={`px-3 py-1.5 text-xs border transition-colors ${
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
              <FileJson size={12} /> Create from JSON
            </button>
          </div>
          {inputMode === "json" ? (
            <div className="space-y-3">
              <textarea
                value={jsonInput}
                onChange={(e) => {
                  setJsonInput(e.target.value);
                  setJsonError("");
                }}
                rows={12}
                className="w-full bg-black/30 border border-white/10 focus:border-white/30 outline-none px-3 py-2 text-white text-xs font-mono resize-none"
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
                <label className={labelClass}>
                  Event / Certificate Name (FA)
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Event / Certificate Name (EN)
                </label>
                <input
                  name="nameEn"
                  value={form.nameEn}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="English name (optional)"
                />
              </div>

              <div>
                <label className={labelClass}>
                  Event / Certificate Name (AR)
                </label>
                <input
                  name="nameAr"
                  value={form.nameAr}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Arabic name (optional)"
                />
              </div>

              <YearMonthPicker
                label="Date"
                value={form.dateVal}
                onChange={(v) => setForm((p) => ({ ...p, dateVal: v }))}
              />

              <div>
                <label className={labelClass}>Picture</label>
                <ImageGalleryField
                  value={form.picture}
                  onChange={(v) => setForm((p) => ({ ...p, picture: v }))}
                  folder="events"
                  single
                />
              </div>

              <div>
                <label className={labelClass}>
                  Attachment (certificate PDF or image)
                </label>
                <ImageGalleryField
                  value={form.attachment}
                  onChange={(v) => setForm((p) => ({ ...p, attachment: v }))}
                  folder="events"
                  single
                />
              </div>

              <div>
                <label className={labelClass}>Description (FA)</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  className={inputClass + " resize-none"}
                />
              </div>

              <div>
                <label className={labelClass}>Description (EN)</label>
                <textarea
                  name="descriptionEn"
                  value={form.descriptionEn}
                  onChange={handleChange}
                  rows={3}
                  className={inputClass + " resize-none"}
                  placeholder="English description (optional)"
                />
              </div>

              <div>
                <label className={labelClass}>Description (AR)</label>
                <textarea
                  name="descriptionAr"
                  value={form.descriptionAr}
                  onChange={handleChange}
                  rows={3}
                  className={inputClass + " resize-none"}
                  placeholder="Arabic description (optional)"
                />
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
