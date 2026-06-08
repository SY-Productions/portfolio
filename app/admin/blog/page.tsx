"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Plus, Search, X, Eye, EyeOff, Star, Trash2, Edit2, MessageCircle, Tag } from "lucide-react";

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  titleEn: string;
  published: boolean;
  featured: boolean;
  readTime: number;
  views: number;
  createdAt: string;
  publishedAt: string | null;
  category: { id: number; name: string; nameEn: string; color: string } | null;
  _count: { comments: number };
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ search: debouncedSearch, limit: "50" });
    const res = await fetch(`/api/admin/blog?${params}`);
    if (res.ok) {
      const data = await res.json();
      setPosts(data.posts);
      setTotal(data.total);
    }
    setLoading(false);
  }, [debouncedSearch]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  async function togglePublish(post: BlogPost) {
    const res = await fetch(`/api/admin/blog/${post.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...post, published: !post.published, categoryId: post.category?.id ?? null }),
    });
    if (res.ok) {
      toast.success(post.published ? "Unpublished" : "Published!");
      fetchPosts();
    } else {
      toast.error("Failed to update");
    }
  }

  async function toggleFeatured(post: BlogPost) {
    const res = await fetch(`/api/admin/blog/${post.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...post, featured: !post.featured, categoryId: post.category?.id ?? null }),
    });
    if (res.ok) {
      toast.success(post.featured ? "Unfeatured" : "Featured!");
      fetchPosts();
    } else {
      toast.error("Failed to update");
    }
  }

  async function handleDelete(id: number, title: string) {
    if (!confirm(`Delete "${title}"? This also deletes all comments.`)) return;
    const res = await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Deleted!");
      fetchPosts();
    } else {
      toast.error("Failed to delete");
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Blog Posts</h2>
          <p className="text-white/40 text-sm mt-1">{total} posts total</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blog/categories"
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 text-sm transition-all"
          >
            <Tag size={16} /> Categories
          </Link>
          <Link
            href="/admin/blog/new"
            className="flex items-center gap-2 px-4 py-2 bg-[#3B070A]/60 hover:bg-[#5A0E12]/60 border border-[#5A0E12]/50 text-white text-sm transition-all"
          >
            <Plus size={16} /> New Post
          </Link>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search posts by title or slug…"
          className="w-full bg-black/20 border border-white/10 pl-9 pr-4 py-2 text-white text-sm placeholder:text-white/20 outline-none focus:border-white/30"
        />
        {search && (
          <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
            <X size={12} />
          </button>
        )}
      </div>

      {loading ? (
        <p className="text-white/40 text-sm">Loading…</p>
      ) : (
        <div className="border border-white/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="text-left px-4 py-3 text-white/50 font-medium">Title</th>
                <th className="text-left px-4 py-3 text-white/50 font-medium">Category</th>
                <th className="text-left px-4 py-3 text-white/50 font-medium">Stats</th>
                <th className="text-left px-4 py-3 text-white/50 font-medium">Status</th>
                <th className="text-right px-4 py-3 text-white/50 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-white/80 font-medium line-clamp-1">{post.titleEn || post.title}</p>
                      <p className="text-white/30 text-xs mt-0.5 font-mono">/blog/{post.slug}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {post.category ? (
                      <span
                        className="text-xs px-2 py-0.5 border text-white/70"
                        style={{ background: `${post.category.color}20`, borderColor: `${post.category.color}40` }}
                      >
                        {post.category.nameEn || post.category.name}
                      </span>
                    ) : (
                      <span className="text-white/20 text-xs">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-white/40 text-xs">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><Eye size={10} /> {post.views}</span>
                      <span className="flex items-center gap-1"><MessageCircle size={10} /> {post._count.comments}</span>
                      <span>{post.readTime}m</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 border ${post.published ? "bg-green-500/10 border-green-500/30 text-green-400" : "bg-white/5 border-white/10 text-white/30"}`}>
                        {post.published ? "Published" : "Draft"}
                      </span>
                      {post.featured && (
                        <span className="text-xs px-2 py-0.5 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400">
                          Featured
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => togglePublish(post)}
                        title={post.published ? "Unpublish" : "Publish"}
                        className="p-1.5 text-white/40 hover:text-white transition-colors"
                      >
                        {post.published ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                      <button
                        onClick={() => toggleFeatured(post)}
                        title={post.featured ? "Unfeature" : "Feature"}
                        className={`p-1.5 transition-colors ${post.featured ? "text-yellow-400" : "text-white/40 hover:text-yellow-400"}`}
                      >
                        <Star size={14} />
                      </button>
                      <Link
                        href={`/admin/blog/${post.id}`}
                        className="p-1.5 text-white/40 hover:text-white transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={14} />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id, post.titleEn || post.title)}
                        className="p-1.5 text-white/40 hover:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {posts.length === 0 && (
            <div className="text-center py-12 text-white/30">
              {debouncedSearch ? "No results found." : "No posts yet. Create your first post!"}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
