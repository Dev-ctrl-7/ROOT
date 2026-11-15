"use client";

import { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";

interface ImageWithFallbackProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string;
}

const DEFAULT_FALLBACK = "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200&auto=format&fit=crop";

export function ImageWithFallback({
  src,
  alt,
  fallbackSrc = DEFAULT_FALLBACK,
  className,
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
    setIsLoading(true);
  }, [src]);

  const isCustomOrData =
    typeof imgSrc === "string" &&
    (imgSrc.startsWith("data:") ||
      imgSrc.startsWith("blob:") ||
      imgSrc.includes("pinimg.com") ||
      (!imgSrc.includes("res.cloudinary.com") && !imgSrc.includes("images.unsplash.com")));

  return (
    <div className="relative w-full h-full overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 bg-[#EFE8DC]/60 dark:bg-[#1A1613]/80 animate-pulse flex items-center justify-center z-10">
          <span className="w-6 h-6 border-2 border-[#C59B27]/40 border-t-[#C59B27] rounded-full animate-spin" />
        </div>
      )}
      <Image
        {...props}
        unoptimized={props.unoptimized ?? isCustomOrData}
        src={hasError ? fallbackSrc : imgSrc}
        alt={alt || "Indian cultural heritage photography"}
        className={`${className || ""} transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          if (!hasError) {
            setHasError(true);
            setImgSrc(fallbackSrc);
            setIsLoading(false);
          }
        }}
      />
    </div>
  );
}

export default ImageWithFallback;

