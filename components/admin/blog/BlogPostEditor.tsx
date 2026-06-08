"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import NextImage from "next/image";
import { Save, Eye, EyeOff, Star, RefreshCw, Globe, Image as ImageIcon } from "lucide-react";
import BlogRichEditor from "./BlogRichEditor";
import { generateSlug, estimateReadTime } from "@/components/Blog/blogTypes";

interface Category {
  id: number;
  name: string;
  nameEn: string;
  slug: string;
  color: string;
}

interface PostFormData {
  id?: number;
  slug: string;
  title: string;
  description: string;
  content: string;
  keywords: string;
  titleEn: string;
  descriptionEn: string;
  contentEn: string;
  keywordsEn: string;
  titleAr: string;
  descriptionAr: string;
  contentAr: string;
  keywordsAr: string;
  coverImage: string;
  tags: string;
  tagsEn: string;
  tagsAr: string;
  authorName: string;
  categoryId: number | null;
  published: boolean;
  featured: boolean;
  readTime: number;
}

const emptyForm: PostFormData = {
  slug: "",
  title: "",
  description: "",
  content: "",
  keywords: "",
  titleEn: "",
  descriptionEn: "",
  contentEn: "",
  keywordsEn: "",
  titleAr: "",
  descriptionAr: "",
  contentAr: "",
  keywordsAr: "",
  coverImage: "",
  tags: "",
  tagsEn: "",
  tagsAr: "",
  authorName: "Yousof Hashemzade",
  categoryId: null,
  published: false,
  featured: false,
  readTime: 5,
};

type LangTab = "fa" | "en" | "ar";

export default function BlogPostEditor({ initialData }: { initialData?: Partial<PostFormData> }) {
  const router = useRouter();
  const [form, setForm] = useState<PostFormData>({ ...emptyForm, ...initialData });
  const [langTab, setLangTab] = useState<LangTab>("en");
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("/api/admin/blog/categories")
      .then((r) => r.json())
      .then(setCategories)
      .catch(() => {});
  }, []);

  function set<K extends keyof PostFormData>(key: K, value: PostFormData[K]) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  function autoSlug() {
    const source = form.titleEn || form.title;
    if (source) set("slug", generateSlug(source));
  }

  function autoReadTime() {
    const content = form.contentEn || form.content || form.contentAr;
    set("readTime", estimateReadTime(content));
  }

  async function handleUploadImage(file: File): Promise<string> {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", "blog");
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    if (!res.ok) throw new Error("Upload failed");
    const data = await res.json();
    return data.url;
  }

  async function handleSave(publish?: boolean) {
    if (!form.slug) {
      toast.error("Slug is required");
      return;
    }
    if (!form.title && !form.titleEn) {
      toast.error("At least one title (FA or EN) is required");
      return;
    }
    if (!form.description && !form.descriptionEn) {
      toast.error("At least one description is required");
      return;
    }

    setSaving(true);
    const payload = { ...form, published: publish !== undefined ? publish : form.published };
    const isEdit = !!form.id;
    const url = isEdit ? `/api/admin/blog/${form.id}` : "/api/admin/blog";
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);

    if (res.ok) {
      const data = await res.json();
      toast.success(isEdit ? "Saved!" : "Post created!");
      if (!isEdit) {
        router.push(`/admin/blog/${data.id}`);
      } else {
        setForm((p) => ({ ...p, published: data.published }));
      }
    } else {
      const err = await res.json();
      toast.error("Error: " + JSON.stringify(err.error || err));
    }
  }

  const inputClass = "w-full bg-black/30 border border-white/10 focus:border-white/30 outline-none px-3 py-2.5 text-white text-sm placeholder:text-white/20 transition-colors font-[ybn]";
  const labelClass = "block text-white/50 text-xs mb-1.5 font-medium";

  const currentContent = langTab === "fa" ? form.content : langTab === "en" ? form.contentEn : form.contentAr;
  const setContent = useCallback((html: string) => {
    if (langTab === "fa") set("content", html);
    else if (langTab === "en") set("contentEn", html);
    else set("contentAr", html);
  }, [langTab]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">{form.id ? "Edit Post" : "New Blog Post"}</h2>
          {form.slug && (
            <p className="text-white/30 text-xs mt-1 font-mono">/blog/{form.slug}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleSave(!form.published)}
            disabled={saving}
            className={`flex items-center gap-2 px-4 py-2 border text-sm transition-all disabled:opacity-50 ${
              form.published
                ? "bg-white/5 border-white/10 text-white/60 hover:text-white hover:border-white/30"
                : "bg-green-900/30 border-green-600/40 text-green-400 hover:bg-green-900/50"
            }`}
          >
            {form.published ? <EyeOff size={15} /> : <Eye size={15} />}
            {form.published ? "Unpublish" : "Publish"}
          </button>
          <button
            type="button"
            onClick={() => handleSave()}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2 bg-[#3B070A]/60 hover:bg-[#5A0E12]/60 border border-[#5A0E12]/50 text-white text-sm transition-all disabled:opacity-50"
          >
            <Save size={15} />
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
        {/* Main editor */}
        <div className="space-y-6">
          {/* Slug */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className={labelClass}>URL Slug *</label>
              <button
                type="button"
                onClick={autoSlug}
                className="flex items-center gap-1 text-xs text-white/30 hover:text-white/60 transition-colors"
              >
                <RefreshCw size={10} /> Auto-generate
              </button>
            </div>
            <input
              value={form.slug}
              onChange={(e) => set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-"))}
              placeholder="my-article-title"
              className={`${inputClass} font-mono`}
              dir="ltr"
            />
            <p className="text-white/20 text-xs mt-1">Only lowercase letters, numbers, and hyphens</p>
          </div>

          {/* Language tabs */}
          <div>
            <div className="flex gap-1 mb-4 border-b border-white/10 pb-3">
              {(["en", "fa", "ar"] as LangTab[]).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLangTab(l)}
                  className={`flex items-center gap-1.5 px-4 py-2 text-xs border transition-all ${
                    langTab === l
                      ? "bg-[#3B070A]/60 border-[#5A0E12]/50 text-white"
                      : "bg-white/5 border-white/10 text-white/40 hover:text-white/70"
                  }`}
                >
                  <Globe size={11} />
                  {l === "fa" ? "فارسی" : l === "en" ? "English" : "العربية"}
                </button>
              ))}
              <div className="flex-1" />
              <span className={`text-xs px-2 py-1 border ${form.published ? "bg-green-500/10 border-green-500/30 text-green-400" : "bg-white/5 border-white/10 text-white/30"}`}>
                {form.published ? "Published" : "Draft"}
              </span>
            </div>

            {/* Title */}
            <div className="mb-4">
              <label className={labelClass}>
                {langTab === "fa" ? "عنوان (فارسی)" : langTab === "en" ? "Title (English)" : "العنوان (Arabic)"}
                {(langTab === "en" || langTab === "fa") && " *"}
              </label>
              <input
                value={langTab === "fa" ? form.title : langTab === "en" ? form.titleEn : form.titleAr}
                onChange={(e) => {
                  if (langTab === "fa") set("title", e.target.value);
                  else if (langTab === "en") set("titleEn", e.target.value);
                  else set("titleAr", e.target.value);
                }}
                placeholder={langTab === "fa" ? "عنوان مقاله..." : langTab === "en" ? "Article title..." : "عنوان المقال..."}
                className={inputClass}
                dir={langTab === "en" ? "ltr" : "rtl"}
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className={labelClass}>
                {langTab === "fa" ? "توضیح کوتاه (فارسی)" : langTab === "en" ? "Short Description (English)" : "الوصف القصير (Arabic)"}
              </label>
              <textarea
                value={langTab === "fa" ? form.description : langTab === "en" ? form.descriptionEn : form.descriptionAr}
                onChange={(e) => {
                  if (langTab === "fa") set("description", e.target.value);
                  else if (langTab === "en") set("descriptionEn", e.target.value);
                  else set("descriptionAr", e.target.value);
                }}
                placeholder={langTab === "fa" ? "توضیح مختصر برای کارت و SEO..." : "Short description for the card and SEO meta..."}
                rows={3}
                className={`${inputClass} resize-none`}
                dir={langTab === "en" ? "ltr" : "rtl"}
                maxLength={300}
              />
              <p className="text-white/20 text-xs mt-1 text-end">
                {(langTab === "fa" ? form.description : langTab === "en" ? form.descriptionEn : form.descriptionAr).length}/300
              </p>
            </div>

            {/* Keywords */}
            <div className="mb-4">
              <label className={labelClass}>
                {langTab === "fa" ? "کلمات کلیدی SEO (فارسی)" : langTab === "en" ? "SEO Keywords (English)" : "كلمات مفتاحية SEO (Arabic)"}
              </label>
              <input
                value={langTab === "fa" ? form.keywords : langTab === "en" ? form.keywordsEn : form.keywordsAr}
                onChange={(e) => {
                  if (langTab === "fa") set("keywords", e.target.value);
                  else if (langTab === "en") set("keywordsEn", e.target.value);
                  else set("keywordsAr", e.target.value);
                }}
                placeholder="keyword1, keyword2, keyword3"
                className={inputClass}
                dir={langTab === "en" ? "ltr" : "rtl"}
              />
              <p className="text-white/20 text-xs mt-1">Comma-separated SEO keywords for this language</p>
            </div>

            {/* Tags */}
            <div className="mb-4">
              <label className={labelClass}>
                {langTab === "fa" ? "تگ‌ها (فارسی)" : langTab === "en" ? "Tags (English)" : "الوسوم (Arabic)"}
              </label>
              <input
                value={langTab === "fa" ? form.tags : langTab === "en" ? form.tagsEn : form.tagsAr}
                onChange={(e) => {
                  if (langTab === "fa") set("tags", e.target.value);
                  else if (langTab === "en") set("tagsEn", e.target.value);
                  else set("tagsAr", e.target.value);
                }}
                placeholder="Flutter, Mobile Development, FastAPI"
                className={inputClass}
                dir={langTab === "en" ? "ltr" : "rtl"}
              />
            </div>

            {/* Rich content editor */}
            <div>
              <label className={labelClass}>
                {langTab === "fa" ? "محتوای مقاله (فارسی)" : langTab === "en" ? "Article Content (English)" : "محتوى المقال (Arabic)"}
              </label>
              <BlogRichEditor
                key={langTab}
                value={currentContent}
                onChange={setContent}
                dir={langTab === "en" ? "ltr" : "rtl"}
                onImageUpload={handleUploadImage}
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Publishing */}
          <div className="border border-white/10 bg-black/20 p-4 space-y-4">
            <h3 className="text-white/60 text-xs font-semibold uppercase tracking-wider">Publishing</h3>

            <div className="flex items-center justify-between">
              <label className="text-white/60 text-sm font-[ybn]">Published</label>
              <button
                type="button"
                onClick={() => set("published", !form.published)}
                className={`w-10 h-5 relative transition-colors ${form.published ? "bg-green-600/60" : "bg-white/10"}`}
              >
                <span className={`absolute top-0.5 w-4 h-4 bg-white transition-all ${form.published ? "left-[calc(100%-18px)]" : "left-0.5"}`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-white/60 text-sm font-[ybn]">Pinned</label>
              <button
                type="button"
                onClick={() => set("featured", !form.featured)}
                className={`w-10 h-5 relative transition-colors ${form.featured ? "bg-blue-600/60" : "bg-white/10"}`}
              >
                <span className={`absolute top-0.5 w-4 h-4 bg-white transition-all ${form.featured ? "left-[calc(100%-18px)]" : "left-0.5"}`} />
              </button>
            </div>
          </div>

          {/* Category */}
          <div className="border border-white/10 bg-black/20 p-4 space-y-3">
            <h3 className="text-white/60 text-xs font-semibold uppercase tracking-wider">Category</h3>
            <select
              value={form.categoryId ?? ""}
              onChange={(e) => set("categoryId", e.target.value ? parseInt(e.target.value) : null)}
              className="w-full bg-black/30 border border-white/10 focus:border-white/30 outline-none px-3 py-2 text-white text-sm transition-colors"
            >
              <option value="" className="bg-[#141010]">No Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id} className="bg-[#141010]">
                  {cat.nameEn || cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Cover image */}
          <div className="border border-white/10 bg-black/20 p-4 space-y-3">
            <h3 className="text-white/60 text-xs font-semibold uppercase tracking-wider">Cover Image</h3>
            {form.coverImage && (
              <NextImage
                src={form.coverImage}
                alt="Cover"
                width={0}
                height={0}
                sizes="100vw"
                unoptimized
                className="w-full h-32 object-cover border border-white/10"
              />
            )}
            <input
              value={form.coverImage}
              onChange={(e) => set("coverImage", e.target.value)}
              placeholder="https://... or /uploads/..."
              className={inputClass}
              dir="ltr"
            />
            <button
              type="button"
              onClick={async () => {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = "image/*";
                input.onchange = async (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (!file) return;
                  try {
                    const url = await handleUploadImage(file);
                    set("coverImage", url);
                    toast.success("Cover uploaded!");
                  } catch {
                    toast.error("Upload failed");
                  }
                };
                input.click();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 border border-white/10 text-white/50 hover:text-white hover:border-white/30 text-xs transition-all"
            >
              <ImageIcon size={12} /> Upload Cover Image
            </button>
          </div>

          {/* Author & read time */}
          <div className="border border-white/10 bg-black/20 p-4 space-y-3">
            <h3 className="text-white/60 text-xs font-semibold uppercase tracking-wider">Metadata</h3>
            <div>
              <label className={labelClass}>Author Name</label>
              <input
                value={form.authorName}
                onChange={(e) => set("authorName", e.target.value)}
                className={inputClass}
                dir="ltr"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className={labelClass}>Read Time (minutes)</label>
                <button
                  type="button"
                  onClick={autoReadTime}
                  className="flex items-center gap-1 text-xs text-white/30 hover:text-white/60 transition-colors"
                >
                  <RefreshCw size={9} /> Auto
                </button>
              </div>
              <input
                type="number"
                min={1}
                max={120}
                value={form.readTime}
                onChange={(e) => set("readTime", parseInt(e.target.value) || 5)}
                className={`${inputClass} w-24`}
                dir="ltr"
              />
            </div>
          </div>

          {/* SEO preview */}
          <div className="border border-white/10 bg-black/20 p-4 space-y-2">
            <h3 className="text-white/60 text-xs font-semibold uppercase tracking-wider">SEO Preview (EN)</h3>
            <div className="bg-black/30 p-3 space-y-1">
              <p className="text-blue-400 text-xs font-medium line-clamp-1">
                {form.titleEn || form.title || "Article Title"}
              </p>
              <p className="text-green-500/70 text-xs font-mono">
                yourdomain.com/blog/{form.slug || "slug"}
              </p>
              <p className="text-white/40 text-xs leading-5 line-clamp-2">
                {form.descriptionEn || form.description || "Article description will appear here in Google search results."}
              </p>
            </div>
            <div className="mt-2">
              <p className="text-white/30 text-xs">Keywords:</p>
              <p className="text-white/40 text-xs line-clamp-2">{form.keywordsEn || "—"}</p>
            </div>
          </div>

          {/* View on site */}
          {form.id && form.published && (
            <a
              href={`/blog/${form.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 border border-white/10 text-white/50 hover:text-white hover:border-white/30 text-sm transition-all"
            >
              <Eye size={14} /> View Live Post
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
