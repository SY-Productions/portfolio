"use client";
import { useZState } from "@/app/states";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import { CloudLightning } from "iconsax-react";
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
  console.log('hello');

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  let imageClasses = `${className} transition-opacity duration-300  ${
    isLoading ? "opacity-0 hidden" : "opacity-100 block"
  }`;
  return (
    <div>
      {isLoading && <div className={`${className} skeleton`} />}
      {hasError ? (
        <CloudLightning color="white" size={120} className="mb-10" />
      ) : (
        <Image
          src={src}
          alt={alt || ""}
          width={width || undefined}
          height={height || undefined}
          className={imageClasses}
          onLoad={() => {

            setIsLoading(false);
            setHasError(false);
          }}
          onLoadingComplete={() => {

            setIsLoading(false);
            setHasError(false);
          }}
          onError={() => {

            setIsLoading(false);
            setHasError(true);
          }}
          draggable={draggable}
        />
      )}
    </div>
  );
}
