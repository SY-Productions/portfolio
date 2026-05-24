"use client";

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import AdminModal from "../AdminModal";
import AdminRowActions from "../AdminRowActions";
import ImageGalleryField from "../components/ImageGalleryField";
import YearMonthPicker from "../components/YearMonthPicker";

interface Education {
  id: number;
  name: string;
  fromYear: number;
  toYear: number | null;
  picture: string;
  description: string;
  order: number;
}

interface DateVal {
  enYear: string;
  enMonth: string;
  faYear: string;
  faMonth: string;
}
const emptyDV: DateVal = { enYear: "", enMonth: "", faYear: "", faMonth: "" };
function dvToYear(dv: DateVal) {
  return dv.enYear ? parseInt(dv.enYear) : 0;
}

const emptyForm = {
  id: 0,
  name: "",
  fromDate: emptyDV as DateVal,
  toDate: emptyDV as DateVal,
  picture: "",
  description: "",
};

export default function EducationAdminPage() {
  const [items, setItems] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [form, setForm] = useState(emptyForm);

  const fetchItems = useCallback(async () => {
    const res = await fetch("/api/education");
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  function openAdd() {
    setForm(emptyForm);
    setModalMode("add");
  }

  function openEdit(item: Education) {
    setForm({
      id: item.id,
      name: item.name,
      fromDate: {
        enYear: String(item.fromYear),
        enMonth: "",
        faYear: "",
        faMonth: "",
      },
      toDate: item.toYear
        ? { enYear: String(item.toYear), enMonth: "", faYear: "", faMonth: "" }
        : emptyDV,
      picture: item.picture,
      description: item.description,
    });
    setModalMode("edit");
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
      fromYear: dvToYear(form.fromDate),
      toYear: form.toDate.enYear ? dvToYear(form.toDate) : null,
      picture: form.picture,
      description: form.description,
    };

    const url = isAdding ? "/api/education" : `/api/education/${form.id}`;
    const res = await fetch(url, {
      method: isAdding ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      toast.success(isAdding ? "Education added!" : "Updated!");
      setModalMode(null);
      fetchItems();
    } else {
      const err = await res.json();
      toast.error("Error: " + (err.error || JSON.stringify(err)));
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this education record?")) return;
    const res = await fetch(`/api/education/${id}`, { method: "DELETE" });
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

    const res = await fetch("/api/education/reorder", {
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
          <h2 className="text-2xl font-bold text-white">Education</h2>
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
                  Period
                </th>
                <th className="text-left px-4 py-3 text-white/50 font-medium">
                  Picture
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
                  <td className="px-4 py-3 text-white/80">{item.name}</td>
                  <td className="px-4 py-3 text-white/50">
                    {item.fromYear} – {item.toYear ?? "Present"}
                  </td>
                  <td className="px-4 py-3 text-white/40 text-xs truncate max-w-[150px]">
                    {item.picture}
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
              No education records yet.
            </div>
          )}
        </div>
      )}

      {modalMode && (
        <AdminModal
          title={modalMode === "add" ? "Add Education" : "Edit Education"}
          onClose={() => setModalMode(null)}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={labelClass}>Institution / School Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <YearMonthPicker
                label="From Year"
                value={form.fromDate}
                onChange={(v) => setForm((p) => ({ ...p, fromDate: v }))}
              />
              <YearMonthPicker
                label="To Year (blank = Present)"
                value={form.toDate}
                onChange={(v) => setForm((p) => ({ ...p, toDate: v }))}
                optional
              />
            </div>

            <div>
              <label className={labelClass}>Picture</label>
              <ImageGalleryField
                value={form.picture}
                onChange={(v) => setForm((p) => ({ ...p, picture: v }))}
                folder="educations"
                single
              />
            </div>

            <div>
              <label className={labelClass}>Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                className={inputClass + " resize-none"}
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
