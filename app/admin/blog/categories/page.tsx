"use client";

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { Plus, Trash2, Edit2, X, Check } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Category {
  id: number;
  name: string;
  nameEn: string;
  nameAr: string;
  slug: string;
  color: string;
  _count: { posts: number };
}

const COLORS = ["#5A8EFF", "#FF7A5A", "#5AFFA0", "#FFD35A", "#C45AFF", "#FF5A8E", "#5AFFEE", "#FF9A5A"];

export default function BlogCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", nameEn: "", nameAr: "", slug: "", color: "#5A8EFF" });

  const fetch_ = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/blog/categories");
    if (res.ok) setCategories(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { fetch_(); }, [fetch_]);

  function autoSlug(name: string) {
    return name.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
  }

  async function handleAdd() {
    if (!form.name || !form.slug) { toast.error("Name and slug required"); return; }
    const res = await fetch("/api/admin/blog/categories", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form),
    });
    if (res.ok) { toast.success("Category created!"); setShowAdd(false); setForm({ name: "", nameEn: "", nameAr: "", slug: "", color: "#5A8EFF" }); fetch_(); }
    else { const e = await res.json(); toast.error(JSON.stringify(e.error || e)); }
  }

  async function handleEdit(id: number) {
    const res = await fetch(`/api/admin/blog/categories/${id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form),
    });
    if (res.ok) { toast.success("Updated!"); setEditId(null); fetch_(); }
    else { toast.error("Failed to update"); }
  }

  async function handleDelete(id: number, name: string) {
    if (!confirm(`Delete category "${name}"? Posts will be uncategorized.`)) return;
    const res = await fetch(`/api/admin/blog/categories/${id}`, { method: "DELETE" });
    if (res.ok) { toast.success("Deleted!"); fetch_(); }
    else { toast.error("Failed to delete"); }
  }

  function startEdit(cat: Category) {
    setEditId(cat.id);
    setForm({ name: cat.name, nameEn: cat.nameEn, nameAr: cat.nameAr, slug: cat.slug, color: cat.color });
  }

  const inputClass = "bg-black/30 border border-white/10 focus:border-white/30 outline-none px-3 py-2 text-white text-sm placeholder:text-white/20 transition-colors";

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link href="/admin/blog" className="flex items-center gap-2 text-white/40 hover:text-white text-sm mb-2 transition-colors">
            <ArrowLeft size={14} /> Back to Posts
          </Link>
          <h2 className="text-2xl font-bold text-white">Blog Categories</h2>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-2 px-4 py-2 bg-[#3B070A]/60 hover:bg-[#5A0E12]/60 border border-[#5A0E12]/50 text-white text-sm transition-all"
        >
          <Plus size={16} /> New Category
        </button>
      </div>

      {/* Add form */}
      {showAdd && (
        <div className="border border-white/10 bg-black/20 p-5 mb-6 space-y-4">
          <h3 className="text-white/60 text-sm font-semibold">New Category</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white/40 text-xs mb-1">Name (FA) *</label>
              <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value, slug: autoSlug(p.nameEn || e.target.value) }))} className={`${inputClass} w-full`} dir="rtl" placeholder="فناوری" />
            </div>
            <div>
              <label className="block text-white/40 text-xs mb-1">Name (EN) *</label>
              <input value={form.nameEn} onChange={(e) => setForm((p) => ({ ...p, nameEn: e.target.value, slug: autoSlug(e.target.value) }))} className={`${inputClass} w-full`} placeholder="Technology" />
            </div>
            <div>
              <label className="block text-white/40 text-xs mb-1">Name (AR)</label>
              <input value={form.nameAr} onChange={(e) => setForm((p) => ({ ...p, nameAr: e.target.value }))} className={`${inputClass} w-full`} dir="rtl" placeholder="التكنولوجيا" />
            </div>
            <div>
              <label className="block text-white/40 text-xs mb-1">Slug *</label>
              <input value={form.slug} onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-") }))} className={`${inputClass} w-full font-mono`} placeholder="technology" />
            </div>
          </div>
          <div>
            <label className="block text-white/40 text-xs mb-2">Color</label>
            <div className="flex gap-2 flex-wrap">
              {COLORS.map((c) => (
                <button key={c} type="button" onClick={() => setForm((p) => ({ ...p, color: c }))} className={`w-7 h-7 border-2 transition-all ${form.color === c ? "border-white scale-110" : "border-transparent"}`} style={{ background: c }} />
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2 bg-[#3B070A]/60 border border-[#5A0E12]/50 text-white text-sm">
              <Check size={14} /> Create
            </button>
            <button onClick={() => setShowAdd(false)} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white/60 text-sm">
              <X size={14} /> Cancel
            </button>
          </div>
        </div>
      )}

      {/* List */}
      {loading ? (
        <p className="text-white/40 text-sm">Loading…</p>
      ) : (
        <div className="border border-white/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="text-left px-4 py-3 text-white/50 font-medium">Color</th>
                <th className="text-left px-4 py-3 text-white/50 font-medium">Name</th>
                <th className="text-left px-4 py-3 text-white/50 font-medium">Slug</th>
                <th className="text-left px-4 py-3 text-white/50 font-medium">Posts</th>
                <th className="text-right px-4 py-3 text-white/50 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id} className="border-b border-white/5">
                  {editId === cat.id ? (
                    <td colSpan={5} className="px-4 py-4">
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} className={`${inputClass} w-full`} dir="rtl" placeholder="فارسی" />
                        <input value={form.nameEn} onChange={(e) => setForm((p) => ({ ...p, nameEn: e.target.value }))} className={`${inputClass} w-full`} placeholder="English" />
                        <input value={form.nameAr} onChange={(e) => setForm((p) => ({ ...p, nameAr: e.target.value }))} className={`${inputClass} w-full`} dir="rtl" placeholder="Arabic" />
                        <input value={form.slug} onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-") }))} className={`${inputClass} w-full font-mono`} />
                      </div>
                      <div className="flex gap-2 flex-wrap mb-3">
                        {COLORS.map((c) => (
                          <button key={c} type="button" onClick={() => setForm((p) => ({ ...p, color: c }))} className={`w-6 h-6 border-2 transition-all ${form.color === c ? "border-white" : "border-transparent"}`} style={{ background: c }} />
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(cat.id)} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#3B070A]/60 border border-[#5A0E12]/50 text-white text-xs"><Check size={12} /> Save</button>
                        <button onClick={() => setEditId(null)} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 text-white/60 text-xs"><X size={12} /> Cancel</button>
                      </div>
                    </td>
                  ) : (
                    <>
                      <td className="px-4 py-3">
                        <div className="w-5 h-5 border border-white/10" style={{ background: cat.color }} />
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-white/80">{cat.nameEn || cat.name}</p>
                        <p className="text-white/30 text-xs">{cat.name}</p>
                      </td>
                      <td className="px-4 py-3 text-white/40 font-mono text-xs">{cat.slug}</td>
                      <td className="px-4 py-3 text-white/40">{cat._count.posts}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => startEdit(cat)} className="p-1.5 text-white/40 hover:text-white transition-colors"><Edit2 size={13} /></button>
                          <button onClick={() => handleDelete(cat.id, cat.nameEn || cat.name)} className="p-1.5 text-white/40 hover:text-red-400 transition-colors"><Trash2 size={13} /></button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {categories.length === 0 && (
            <div className="text-center py-12 text-white/30">No categories yet.</div>
          )}
        </div>
      )}
    </div>
  );
}
