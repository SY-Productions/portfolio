"use client";

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { Plus, Search, X } from "lucide-react";
import AdminModal from "../AdminModal";
import AdminRowActions from "../AdminRowActions";

interface Product {
  id: number;
  title: string;
  titleEn: string;
  titleAr: string;
  description: string;
  descriptionEn: string;
  descriptionAr: string;
  url: string;
  imageUrl: string;
  price: string;
  category: string;
  order: number;
}

const emptyForm = {
  title: "",
  titleEn: "",
  titleAr: "",
  description: "",
  descriptionEn: "",
  descriptionAr: "",
  url: "",
  imageUrl: "",
  price: "",
  category: "theme",
};

const CATEGORIES = ["theme", "plugin", "template", "other"];

export default function ProductsAdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (Array.isArray(data)) setProducts(data);
    } catch {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const openCreate = () => {
    setEditingProduct(null);
    setForm(emptyForm);
    setIsModalOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditingProduct(p);
    setForm({
      title: p.title,
      titleEn: p.titleEn,
      titleAr: p.titleAr,
      description: p.description,
      descriptionEn: p.descriptionEn,
      descriptionAr: p.descriptionAr,
      url: p.url,
      imageUrl: p.imageUrl,
      price: p.price,
      category: p.category,
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.url.trim()) {
      toast.error("Title and URL are required");
      return;
    }
    setSaving(true);
    try {
      const url = editingProduct ? `/api/products/${editingProduct.id}` : "/api/products";
      const method = editingProduct ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Save failed");
      toast.success(editingProduct ? "Product updated" : "Product created");
      setIsModalOpen(false);
      fetchProducts();
    } catch {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this product?")) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Product deleted");
      fetchProducts();
    } catch {
      toast.error("Delete failed");
    }
  };

  const filtered = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.titleEn.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Products & Themes</h2>
          <p className="text-white/40 text-sm mt-1">{products.length} products</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-[#3B070A] hover:bg-[#5A0E12] text-white text-sm transition-colors"
        >
          <Plus size={16} />
          Add Product
        </button>
      </div>

      <div className="relative">
        <Search className="absolute start-3 top-1/2 -translate-y-1/2 text-white/30" size={16} />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full ps-9 pr-4 py-2.5 bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/20"
        />
        {search && (
          <button onClick={() => setSearch("")} className="absolute end-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
            <X size={14} />
          </button>
        )}
      </div>

      {loading ? (
        <div className="space-y-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-14 bg-white/5 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((p) => (
            <div key={p.id} className="flex items-center justify-between p-4 bg-white/5 border border-white/8 hover:bg-white/8 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-white text-sm truncate">{p.title}</span>
                  {p.titleEn && <span className="text-white/40 text-xs truncate">/ {p.titleEn}</span>}
                  <span className="text-xs px-1.5 py-0.5 bg-white/5 border border-white/10 text-white/40">{p.category}</span>
                  {p.price && <span className="text-xs text-[#f4a8ac]">{p.price}</span>}
                </div>
                <p className="text-white/30 text-xs mt-0.5 truncate">{p.url}</p>
              </div>
              <AdminRowActions onEdit={() => openEdit(p)} onDelete={() => handleDelete(p.id)} />
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-white/30">No products found</div>
          )}
        </div>
      )}

      {isModalOpen && (<AdminModal onClose={() => setIsModalOpen(false)} title={editingProduct ? "Edit Product" : "Add Product"}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white/60 text-xs mb-1">Title (FA) *</label>
              <input className="w-full px-3 py-2 bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-white/20" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div>
              <label className="block text-white/60 text-xs mb-1">Title (EN)</label>
              <input className="w-full px-3 py-2 bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-white/20" value={form.titleEn} onChange={(e) => setForm({ ...form, titleEn: e.target.value })} />
            </div>
          </div>

          <div>
            <label className="block text-white/60 text-xs mb-1">Description (FA) *</label>
            <textarea rows={3} className="w-full px-3 py-2 bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-white/20 resize-none" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div>
            <label className="block text-white/60 text-xs mb-1">Description (EN)</label>
            <textarea rows={3} className="w-full px-3 py-2 bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-white/20 resize-none" value={form.descriptionEn} onChange={(e) => setForm({ ...form, descriptionEn: e.target.value })} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white/60 text-xs mb-1">URL *</label>
              <input type="url" className="w-full px-3 py-2 bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-white/20" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="https://" />
            </div>
            <div>
              <label className="block text-white/60 text-xs mb-1">Image URL</label>
              <input type="url" className="w-full px-3 py-2 bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-white/20" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="https://" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white/60 text-xs mb-1">Price</label>
              <input className="w-full px-3 py-2 bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-white/20" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="e.g. $29" />
            </div>
            <div>
              <label className="block text-white/60 text-xs mb-1">Category</label>
              <select className="w-full px-3 py-2 bg-[#1a1a1a] border border-white/10 text-white text-sm focus:outline-none focus:border-white/20" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-white/60 hover:text-white transition-colors">Cancel</button>
            <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-[#3B070A] hover:bg-[#5A0E12] text-white text-sm transition-colors disabled:opacity-50">
              {saving ? "Saving..." : editingProduct ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </AdminModal>)}
    </div>
  );
}
