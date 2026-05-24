"use client";

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
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
  faDescription: string;
  enDescription: string;
  pictures: string;
  link: string;
  technologys: string;
  faStartDate: string;
  enStartDate: string;
  faEndDate: string;
  enEndDate: string;
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
  faDescription: "",
  enDescription: "",
  pictures: "",
  link: "",
  technologys: "",
  customLinks: "",
  startDate: emptyDV as DateVal,
  endDate: emptyDV as DateVal,
};

export default function WorkSamplesAdminPage() {
  const [items, setItems] = useState<WorkSample[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);

  const fetchItems = useCallback(async () => {
    const res = await fetch("/api/worksamples");
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  function openAdd() {
    setForm(emptyForm);
    setEditId(null);
    setModalMode("add");
  }

  function openEdit(item: WorkSample) {
    setForm({
      isWeb: item.isWeb,
      faTitle: item.faTitle,
      enTitle: item.enTitle,
      faDescription: item.faDescription,
      enDescription: item.enDescription,
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
    });
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const isAdding = modalMode === "add";

    const payload = {
      isWeb: form.isWeb,
      faTitle: form.faTitle,
      enTitle: form.enTitle,
      faDescription: form.faDescription,
      enDescription: form.enDescription,
      pictures: form.pictures,
      link: form.link,
      technologys: form.technologys,
      customLinks: form.customLinks || null,
      faStartDate: dvToFa(form.startDate),
      enStartDate: dvToEn(form.startDate),
      faEndDate: dvToFa(form.endDate),
      enEndDate: dvToEn(form.endDate),
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
              {items.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-b border-white/5 hover:bg-white/3 transition-colors"
                >
                  <td className="px-4 py-3 text-white/30">{index + 1}</td>
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
                        onMoveUp={() => handleMove(index, "up")}
                        onMoveDown={() => handleMove(index, "down")}
                        isFirst={index === 0}
                        isLast={index === items.length - 1}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {items.length === 0 && (
            <div className="text-center py-12 text-white/30">
              No work samples yet.
            </div>
          )}
        </div>
      )}

      {modalMode && (
        <AdminModal
          title={modalMode === "add" ? "Add Work Sample" : "Edit Work Sample"}
          onClose={() => setModalMode(null)}
        >
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Title (Persian)</label>
                <input
                  name="faTitle"
                  value={form.faTitle}
                  onChange={handleChange}
                  required
                  className={inputClass}
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
              <label className={labelClass}>Description (Persian)</label>
              <textarea
                name="faDescription"
                value={form.faDescription}
                onChange={handleChange}
                rows={3}
                className={inputClass + " resize-none"}
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
              <label className={labelClass}>Custom Links (JSON or empty)</label>
              <input
                name="customLinks"
                value={form.customLinks ?? ""}
                onChange={handleChange}
                className={inputClass}
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
                label="Start Date"
                value={form.startDate}
                onChange={(v) => setForm((p) => ({ ...p, startDate: v }))}
              />
              <YearMonthPicker
                label="End Date"
                value={form.endDate}
                onChange={(v) => setForm((p) => ({ ...p, endDate: v }))}
                optional
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
        </AdminModal>
      )}
    </div>
  );
}
