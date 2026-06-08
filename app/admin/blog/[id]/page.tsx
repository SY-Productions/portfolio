import { notFound } from "next/navigation";
import prisma from "@/prisma/client";
import BlogPostEditor from "@/components/admin/blog/BlogPostEditor";
import BlogPostComments from "@/components/admin/blog/BlogPostComments";

interface Props {
  params: { id: string };
}

export default async function EditBlogPostPage({ params }: Props) {
  const post = await prisma.blogPost.findUnique({
    where: { id: parseInt(params.id) },
    include: {
      comments: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!post) notFound();

  const initialData = {
    id: post.id,
    slug: post.slug,
    title: post.title,
    description: post.description,
    content: post.content,
    keywords: post.keywords,
    titleEn: post.titleEn,
    descriptionEn: post.descriptionEn,
    contentEn: post.contentEn,
    keywordsEn: post.keywordsEn,
    titleAr: post.titleAr,
    descriptionAr: post.descriptionAr,
    contentAr: post.contentAr,
    keywordsAr: post.keywordsAr,
    coverImage: post.coverImage,
    tags: post.tags,
    tagsEn: post.tagsEn,
    tagsAr: post.tagsAr,
    authorName: post.authorName,
    categoryId: post.categoryId,
    published: post.published,
    featured: post.featured,
    readTime: post.readTime,
  };

  return (
    <div>
      <BlogPostEditor initialData={initialData} />
      <BlogPostComments postId={post.id} initialComments={post.comments} />
    </div>
  );
}
