"use client";
import { useZState } from "@/app/states";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image, { StaticImageData } from "next/image";

interface Image {
  src: string | StaticImageData | StaticImport;
  className?: string;
  alt?: string;
  width?: number;
  height?: number;
  draggable?: boolean;
}

export default function SkeletonImage({
  src,
  className,
  alt,
  width,
  height,
  draggable,
}: Image) {
  const { isLoading, setIsLoading } = useZState();
  let imageClasses = `${className} transition-opacity duration-300  ${
    isLoading ? "opacity-0 hidden" : "opacity-100 block"
  }`;
  return (
    <div>
      {isLoading && (
        <div
          className={`${className} skeleton`}
        />
      )}
      <Image
        src={src}
        alt={alt || ""}
        width={width || undefined}
        height={height || undefined}
        className={imageClasses}
        onLoadingComplete={() => setIsLoading(false)}
        draggable={draggable}
      />
    </div>
  );
}
