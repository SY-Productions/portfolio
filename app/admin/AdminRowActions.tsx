"use client";

import { ChevronUp, ChevronDown, Pencil, Trash2 } from "lucide-react";

interface AdminRowActionsProps {
  onEdit: () => void;
  onDelete: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

export default function AdminRowActions({
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: AdminRowActionsProps) {
  return (
    <div className="flex items-center gap-1">
      {onMoveUp && (
        <button
          onClick={onMoveUp}
          disabled={isFirst}
          title="Move up"
          className="p-1.5 text-white/30 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronUp size={16} />
        </button>
      )}
      {onMoveDown && (
        <button
          onClick={onMoveDown}
          disabled={isLast}
          title="Move down"
          className="p-1.5 text-white/30 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronDown size={16} />
        </button>
      )}
      <button
        onClick={onEdit}
        title="Edit"
        className="p-1.5 text-white/40 hover:text-blue-400 transition-colors"
      >
        <Pencil size={16} />
      </button>
      <button
        onClick={onDelete}
        title="Delete"
        className="p-1.5 text-white/40 hover:text-red-400 transition-colors"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
