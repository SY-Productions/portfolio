"use client";

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import AdminModal from "../AdminModal";
import AdminRowActions from "../AdminRowActions";
import ImageGalleryField from "../components/ImageGalleryField";
import YearMonthPicker from "../components/YearMonthPicker";

interface Event {
  id: number;
  name: string;
  date: string;
  picture: string;
  attachment: string;
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
  dateVal: emptyDV as DateVal,
  picture: "",
  attachment: "",
  description: "",
};

export default function EventsAdminPage() {
  const [items, setItems] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [form, setForm] = useState(emptyForm);

  const fetchItems = useCallback(async () => {
    const res = await fetch("/api/events");
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

  function openEdit(item: Event) {
    // Parse date string back to DateVal
    const parts = item.date.split("-");
    setForm({
      id: item.id,
      name: item.name,
      dateVal: {
        enYear: parts[0] || "",
        enMonth: parts[1] || "",
        faYear: "",
        faMonth: "",
      },
      picture: item.picture,
      attachment: item.attachment,
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
      date: dvToStr(form.dateVal),
      picture: form.picture,
      attachment: form.attachment,
      description: form.description,
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
              {items.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-b border-white/5 hover:bg-white/3 transition-colors"
                >
                  <td className="px-4 py-3 text-white/30">{index + 1}</td>
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
              No events yet.
            </div>
          )}
        </div>
      )}

      {modalMode && (
        <AdminModal
          title={modalMode === "add" ? "Add Event" : "Edit Event"}
          onClose={() => setModalMode(null)}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={labelClass}>Event / Certificate Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className={inputClass}
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
              <label className={labelClass}>Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
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
