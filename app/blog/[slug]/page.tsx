import type { Metadata } from "next";
import { notFound } from "next/navigation";
import prisma from "@/prisma/client";
import BlogDetailClient from "@/components/Blog/BlogDetailClient";

interface Props {
  params: { slug: string };
  searchParams: { lang?: string };
}

export async function generateStaticParams() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug, published: true },
    include: { category: true },
  });

  if (!post) return { title: "Not Found" };

  const title = post.titleEn || post.title;
  const description = post.descriptionEn || post.description;
  const keywords = [
    ...(post.keywordsEn || post.keywords).split(",").map((k) => k.trim()).filter(Boolean),
    ...(post.tagsEn || post.tags).split(",").map((t) => t.trim()).filter(Boolean),
    post.authorName,
    "Yousof Hashemzade",
    post.category?.nameEn || post.category?.name || "",
  ].filter(Boolean);

  const imageUrl = post.coverImage || undefined;
  const url = `/blog/${post.slug}`;

  return {
    title: `${title} | Yousof Hashemzade`,
    description,
    keywords,
    authors: [{ name: post.authorName }],
    openGraph: {
      title,
      description,
      type: "article",
      url,
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: [post.authorName],
      tags: (post.tagsEn || post.tags).split(",").map((t) => t.trim()).filter(Boolean),
      images: imageUrl ? [{ url: imageUrl, alt: title }] : [],
      locale: "en_US",
      siteName: "Yousof Hashemzade",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
    alternates: {
      canonical: url,
      languages: {
        fa: `${url}?lang=fa`,
        en: `${url}?lang=en`,
        ar: `${url}?lang=ar`,
      },
    },
    other: {
      "article:published_time": post.publishedAt?.toISOString() || "",
      "article:modified_time": post.updatedAt.toISOString(),
      "article:author": post.authorName,
      "article:section": post.category?.nameEn || post.category?.name || "Blog",
      "article:tag": (post.tagsEn || post.tags).split(",").join(","),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug, published: true },
    include: {
      category: true,
      comments: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!post) notFound();

  const relatedPosts = await prisma.blogPost.findMany({
    where: {
      published: true,
      id: { not: post.id },
      OR: [
        { categoryId: post.categoryId ?? undefined },
        { tags: { contains: post.tags.split(",")[0] } },
      ],
    },
    take: 3,
    orderBy: { publishedAt: "desc" },
    select: {
      id: true, slug: true, title: true, titleEn: true, titleAr: true,
      description: true, descriptionEn: true, descriptionAr: true,
      coverImage: true, tags: true, tagsEn: true, tagsAr: true,
      authorName: true, readTime: true, views: true, publishedAt: true,
      featured: true, category: { select: { id: true, slug: true, name: true, nameEn: true, nameAr: true, color: true } },
      _count: { select: { comments: true } },
    },
  });

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.titleEn || post.title,
    description: post.descriptionEn || post.description,
    image: post.coverImage || undefined,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      "@type": "Person",
      name: post.authorName,
      url: "https://yousof.dev",
    },
    publisher: {
      "@type": "Person",
      name: post.authorName,
    },
    inLanguage: ["fa", "en", "ar"],
    keywords: [
      ...(post.keywords || "").split(","),
      ...(post.keywordsEn || "").split(","),
      ...(post.tags || "").split(","),
    ].map((k) => k.trim()).filter(Boolean).join(", "),
    articleSection: post.category?.nameEn || post.category?.name,
    wordCount: post.content.replace(/<[^>]*>/g, " ").split(/\s+/).length,
    timeRequired: `PT${post.readTime}M`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `/blog/${post.slug}`,
    },
    // All 3 language versions for multilingual SEO
    workTranslation: [
      { "@type": "BlogPosting", headline: post.title, inLanguage: "fa" },
      { "@type": "BlogPosting", headline: post.titleEn, inLanguage: "en" },
      { "@type": "BlogPosting", headline: post.titleAr, inLanguage: "ar" },
    ].filter((t) => t.headline),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogDetailClient post={post as unknown as Parameters<typeof BlogDetailClient>[0]["post"]} relatedPosts={relatedPosts} />
    </>
  );
}
