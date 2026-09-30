import Link from "next/link";

import {
  ArrowLeft,
} from "lucide-react";

import {
  notFound,
} from "next/navigation";

import BlogPostForm from "../../../../../components/admin/blog/BlogPostForm";

import {
  getCmsBlogPostById,
} from "../../../../../lib/repositories/cms-blog";

import {
  saveCmsBlogPostAction,
} from "../actions";

export const dynamic =
  "force-dynamic";

type Props = {
  params:
    Promise<{
      id:
        string;
    }>;

  searchParams:
    Promise<{
      saved?:
        string;

      created?:
        string;
    }>;
};

export default async function EditBlogPostPage({
  params,
  searchParams,
}: Props) {
  const {
    id,
  } =
    await params;

  const query =
    await searchParams;

  const post =
    await getCmsBlogPostById(
      id,
    );

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-[1000px]">
      <Link
        href="/admin/blog"
        className="inline-flex items-center gap-2 text-[10px] font-semibold text-[#667080]"
      >
        <ArrowLeft className="h-3.5 w-3.5" />

        Back to blog
      </Link>

      <div className="my-6">
        <h1 className="text-3xl font-semibold tracking-[-0.04em]">
          {
            post.title
          }
        </h1>

        <p className="mt-2 text-sm text-[#7E8591]">
          Edit article content, publication and SEO.
        </p>
      </div>

      {(query.saved ===
        "1" ||
        query.created ===
          "1") && (
        <div className="mb-5 rounded-[12px] border border-[#CDE7D5] bg-[#F3FBF5] px-4 py-3 text-[10px] font-semibold text-[#39734B]">
          Article saved successfully.
        </div>
      )}

      <BlogPostForm
        post={
          post
        }
        action={
          saveCmsBlogPostAction
        }
      />
    </div>
  );
}
