"use client";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import { CloudLightning } from "iconsax-react";

interface Image {
  src: string | StaticImageData | StaticImport;
  className?: string;
  alt?: string;
  title?: string;
  width?: number;
  height?: number;
  draggable?: boolean;
  priority?: boolean;
}

export default function SkeletonImage({
  src,
  className,
  alt,
  width,
  height,
  title,
  draggable,
  priority,
}: Image) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const imageClasses = `${className} transition-opacity duration-300 ${
    isLoading ? "opacity-0" : "opacity-100"
  }`;

  return (
    <div className="relative" style={{ width: "100%", height: "100%" }}>
      {/* Custom skeleton loader that inherits dimensions from parent */}
      {isLoading && (
        <div
          className="absolute inset-0 flex items-center justify-center animate-pulse"
          style={{ borderRadius: "inherit" }}
        >
          <div className="w-12 h-12 rounded-full border-t-2 border-l-2 border-[#3A0D12] animate-spin"></div>
        </div>
      )}

      {/* Error state */}
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <CloudLightning color="white" size={80} className="mb-4" />
          <span className="text-white/70 text-sm">تصویر بارگذاری نشد</span>
        </div>
      ) : (
        /* Actual image */
        <Image
          src={src}
          alt={alt || ""}
          title={title || ""}
          width={width || undefined}
          height={height || undefined}
          className={imageClasses}
          priority={priority}
          onLoad={() => {
            setIsLoading(false);
            setHasError(false);
          }}
          onLoadStart={() => {
            setIsLoading(true);
            setHasError(false);
          }}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          draggable={draggable || false}
        />
      )}
    </div>
  );
}
