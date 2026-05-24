"use client";

import { useRef, useState } from "react";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

interface ImageGalleryFieldProps {
  value: string; // space-separated paths
  onChange: (newValue: string) => void;
  folder?: string;
  single?: boolean; // only allow one image
}

export default function ImageGalleryField({
  value,
  onChange,
  folder = "uploads",
  single = false,
}: ImageGalleryFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const paths = value ? value.split(" ").filter(Boolean) : [];

  async function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    if (single && files.length > 1) {
      toast.error("Only one image allowed.");
      return;
    }

    setUploading(true);
    const fd = new FormData();
    files.forEach((f) => fd.append("files", f));
    fd.append("folder", folder);

    const res = await fetch("/api/upload", { method: "POST", body: fd });
    setUploading(false);

    if (!res.ok) {
      toast.error("Upload failed.");
      return;
    }

    const { paths: newPaths } = await res.json();

    if (single) {
      onChange(newPaths[0]);
    } else {
      const combined = [...paths, ...newPaths].join(" ");
      onChange(combined);
    }

    // Reset input so the same file can be re-selected
    if (inputRef.current) inputRef.current.value = "";
  }

  function removeImage(idx: number) {
    const updated = paths.filter((_, i) => i !== idx).join(" ");
    onChange(updated);
  }

  function handleManualInput(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
  }

  return (
    <div className="space-y-2">
      {/* Image thumbnails */}
      {paths.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {paths.map((p, i) => (
            <div
              key={i}
              className="relative group w-20 h-20 border border-white/10 overflow-hidden bg-black/30"
            >
              <Image
                src={p}
                alt={`image-${i}`}
                fill
                className="object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-0.5 right-0.5 bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity p-0.5"
              >
                <X size={12} />
              </button>
              {/* Path tooltip */}
              <div className="absolute inset-x-0 bottom-0 bg-black/70 text-[8px] text-white/70 px-1 py-0.5 truncate opacity-0 group-hover:opacity-100 transition-opacity">
                {p}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload button + manual path input */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10
                     text-white/60 text-xs transition-colors disabled:opacity-50"
        >
          {uploading ? (
            <span className="animate-spin w-3 h-3 border border-white/40 border-t-white rounded-full" />
          ) : (
            <Upload size={12} />
          )}
          {uploading ? "Uploading..." : "Upload"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple={!single}
          onChange={handleFiles}
          className="hidden"
        />
        <input
          type="text"
          value={value}
          onChange={handleManualInput}
          placeholder={
            single ? "/folder/image.jpg" : "/folder/img1.jpg /folder/img2.jpg"
          }
          className="flex-1 bg-black/30 border border-white/10 focus:border-white/30 outline-none
                     px-3 py-1.5 text-white text-xs placeholder:text-white/20 transition-colors font-mono"
        />
      </div>
      {!single && (
        <p className="text-white/20 text-xs flex items-center gap-1">
          <ImageIcon size={10} />
          Paths are space-separated. Upload adds to the list.
        </p>
      )}
    </div>
  );
}
