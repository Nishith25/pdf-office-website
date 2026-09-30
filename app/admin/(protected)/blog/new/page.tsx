import Link from "next/link";

import {
  ArrowLeft,
} from "lucide-react";

import BlogPostForm from "../../../../../components/admin/blog/BlogPostForm";

import {
  createCmsBlogPostAction,
} from "../actions";

export default function NewBlogPostPage() {
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
          New article
        </h1>

        <p className="mt-2 text-sm text-[#7E8591]">
          Write and publish a GPS Maps article.
        </p>
      </div>

      <BlogPostForm
        action={
          createCmsBlogPostAction
        }
      />
    </div>
  );
}
