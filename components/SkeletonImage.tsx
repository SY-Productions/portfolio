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
}

export default function SkeletonImage({
  src,
  className,
  alt,
  width,
  height,
  title,
  draggable,
}: Image) {

  const [isLoading, setIsLoading] = useState(false);
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
          title={title || ""}
          width={width || undefined}
          height={height || undefined}
          className={imageClasses}
          onLoad={() => {
            setIsLoading(false);
            setHasError(false);
          }}
          onLoadStart={() => {
            setIsLoading(true);
            setHasError(false);
          }}
          onLoadingComplete={() => {
            console.log("fuck me");

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
