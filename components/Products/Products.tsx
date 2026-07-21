"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLang } from "@/app/context/LanguageContext";
import { useTheme } from "@/app/context/ThemeContext";
import { API_BASE_URL } from "@/app/config";
import { ShoppingCart } from "lucide-react";

interface Product {
  id: number;
  title: string;
  titleEn: string;
  titleAr: string;
  description: string;
  descriptionEn: string;
  descriptionAr: string;
  url: string;
  imageUrl: string;
  price: string;
  category: string;
}

const CATEGORY_BADGE: Record<string, string> = {
  theme: "Theme",
  plugin: "Plugin",
  template: "Template",
  other: "Product",
};

export default function Products() {
  const { t, lang } = useLang();
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/products`, { cache: "no-store" })
      .then((r) => r.json())
      .then((data: Product[]) => {
        if (Array.isArray(data)) setProducts(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || loading) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll(".will-animate").forEach((child, i) => {
            setTimeout(() => child.classList.add("in-view"), i * 80);
          });
          el.querySelector(".section-title")?.classList.add("in-view");
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loading]);

  const getTitle = (p: Product) =>
    lang === "en" && p.titleEn ? p.titleEn : lang === "ar" && p.titleAr ? p.titleAr : p.title;

  const getDesc = (p: Product) =>
    lang === "en" && p.descriptionEn
      ? p.descriptionEn
      : lang === "ar" && p.descriptionAr
      ? p.descriptionAr
      : p.description;

  if (!loading && products.length === 0) return null;

  return (
    <div
      id="products"
      ref={sectionRef}
      className={`relative section-bg bg-no-repeat bg-cover h-auto`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/0 pointer-events-none" />

      <div className="section-shell pb-14">
        <div className="pt-[5vh] mb-10">
          <h2 className="section-title mb-6 will-animate">{t("products.title")}</h2>
          <p className="font-[ybn] text-white/60 text-sm lg:text-base 2xl:text-lg leading-7 will-animate">
            {t("products.description")}
          </p>
        </div>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1].map((i) => (
              <div key={i} className="glass-card h-64 animate-pulse" />
            ))}
          </div>
        )}

        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <article
                key={product.id}
                className="glass-card will-animate group flex flex-col overflow-hidden"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Image / browser chrome / gradient cover */}
                <div className="relative h-44 overflow-hidden flex-shrink-0">
                  {product.url ? (
                    /* Browser chrome wrapper with live iframe proxy */
                    <div className="w-full h-full flex flex-col" style={{ background: "#0d0d0d" }}>
                      {/* Mini chrome bar */}
                      <div className="flex items-center gap-1.5 px-2.5 flex-shrink-0" style={{ height: 20, background: "rgba(22,22,24,0.98)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#ff5f57" }} />
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#febc2e" }} />
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#28c840" }} />
                        <div className="flex-1 mx-1 flex items-center px-1.5 gap-1" style={{ height: 12, borderRadius: 3, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#3a3a3c", flexShrink: 0 }} />
                          <div style={{ flex: 1, height: 2, borderRadius: 1, background: "#2a2a2c" }} />
                        </div>
                      </div>
                      {/* Proxied iframe — X-Frame-Options stripped server-side */}
                      <div className="flex-1 overflow-hidden relative">
                        <iframe
                          src={`/api/proxy?url=${encodeURIComponent(product.url)}`}
                          title={getTitle(product)}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            border: "none",
                            pointerEvents: "none",
                            width: "200%",
                            height: "200%",
                            transform: "scale(0.5)",
                            transformOrigin: "top left",
                          }}
                        />
                      </div>
                    </div>
                  ) : product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={getTitle(product)}
                      fill
                      unoptimized
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#3B070A]/40 via-[#5A0E12]/20 to-[#141010]" />
                  )}
                  {/* Category badge */}
                  <span className="absolute top-3 start-3 text-xs font-[ybn] px-2.5 py-1 bg-black/40 text-white/80 border border-white/15 backdrop-blur-sm">
                    {CATEGORY_BADGE[product.category] ?? product.category}
                  </span>
                  {product.price && (
                    <span className="absolute top-3 end-3 text-xs font-[inter] font-semibold px-2.5 py-1 bg-[#3B070A]/80 text-white border border-[#5A0E12]/50 backdrop-blur-sm">
                      {product.price}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  <h4 className="font-[ybb] text-white/90 text-base lg:text-lg leading-snug mb-2">
                    {getTitle(product)}
                  </h4>
                  <p className="font-[ybn] text-white/50 text-sm leading-6 flex-1 line-clamp-3">
                    {getDesc(product)}
                  </p>

                  <div className="flex gap-2 mt-4">
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-[ybn] px-3 py-2 bg-gradient-to-r from-[#3B070A]/60 to-[#5A0E12]/60 border border-[#5A0E12]/40 text-white hover:from-[#3B070A]/80 hover:to-[#5A0E12]/80 transition-all"
                    >
                      <ShoppingCart size={12} />
                      {t("products.buyNow")}
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
