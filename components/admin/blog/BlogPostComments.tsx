"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { MessageCircle, Trash2, User, Clock } from "lucide-react";

interface Comment {
  id: number;
  name: string;
  email: string;
  content: string;
  lang: string;
  createdAt: Date | string;
}

interface Props {
  postId: number;
  initialComments: Comment[];
}

export default function BlogPostComments({ postId, initialComments }: Props) {
  const [comments, setComments] = useState(initialComments);

  async function handleDelete(id: number) {
    if (!confirm("Delete this comment?")) return;
    const res = await fetch(`/api/admin/blog/comments/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Comment deleted");
      setComments((prev) => prev.filter((c) => c.id !== id));
    } else {
      toast.error("Failed to delete");
    }
  }

  return (
    <div className="px-6 pb-8 max-w-6xl mx-auto">
      <div className="border-t border-white/10 pt-8">
        <h3 className="text-white/60 text-sm font-semibold mb-4 flex items-center gap-2">
          <MessageCircle size={14} /> Comments ({comments.length})
        </h3>

        {comments.length === 0 ? (
          <p className="text-white/30 text-sm">No comments yet.</p>
        ) : (
          <div className="space-y-3">
            {comments.map((comment) => (
              <div key={comment.id} className="border border-white/10 bg-black/20 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className="flex items-center gap-1.5 text-white/70 text-sm font-medium">
                        <User size={12} /> {comment.name}
                      </span>
                      {comment.email && (
                        <span className="text-white/30 text-xs">{comment.email}</span>
                      )}
                      <span className="flex items-center gap-1 text-white/25 text-xs">
                        <Clock size={10} />
                        {new Date(comment.createdAt).toLocaleString()}
                      </span>
                      <span className="text-xs px-2 py-0.5 bg-white/5 border border-white/10 text-white/30">
                        {comment.lang.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-white/60 text-sm leading-6 whitespace-pre-wrap">{comment.content}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="flex-shrink-0 p-1.5 text-white/30 hover:text-red-400 transition-colors"
                    title="Delete comment"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
