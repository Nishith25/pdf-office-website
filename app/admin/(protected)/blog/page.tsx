import Link from "next/link";

import {
  BookOpen,
  Pencil,
  Plus,
} from "lucide-react";

import {
  listCmsBlogPosts,
} from "../../../../lib/repositories/cms-blog";

import {
  deleteCmsBlogPostAction,
} from "./actions";

export const dynamic =
  "force-dynamic";

export const metadata = {
  title:
    "Blog | CMS",
};

export default async function AdminBlogPage() {
  const posts =
    await listCmsBlogPosts();

  return (
    <div className="mx-auto max-w-[1200px]">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-[#111111]" />

            <h1 className="text-2xl font-bold">
              Blog
            </h1>
          </div>

          <p className="mt-2 text-[11px] text-[#858C98]">
            Create and publish GPS Maps articles.
          </p>
        </div>

        <Link
          href="/admin/blog/new"
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-[9px] bg-[#111111] px-4 text-[11px] font-semibold !text-white hover:bg-[#2A2A2A]"
        >
          <Plus className="h-4 w-4" />

          Add article
        </Link>
      </div>

      <div className="mt-7 overflow-hidden rounded-[16px] border border-[#E1E4E9] bg-white">
        {posts.length ===
        0 ? (
          <div className="px-6 py-16 text-center">
            <p className="text-sm font-semibold">
              No articles yet
            </p>

            <p className="mt-2 text-[10px] text-[#9096A1]">
              Create the first GPS Maps article.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px]">
              <thead className="bg-[#F8F9FA]">
                <tr className="text-left text-[9px] font-bold uppercase tracking-[0.1em] text-[#9399A4]">
                  <th className="px-5 py-3">
                    Article
                  </th>

                  <th className="px-5 py-3">
                    Category
                  </th>

                  <th className="px-5 py-3">
                    Status
                  </th>

                  <th className="px-5 py-3">
                    Published
                  </th>

                  <th className="px-5 py-3 text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {posts.map(
                  (
                    post,
                  ) => (
                    <tr
                      key={
                        post.id
                      }
                      className="border-t border-[#ECEEF1]"
                    >
                      <td className="px-5 py-4">
                        <p className="text-[12px] font-semibold">
                          {
                            post.title
                          }
                        </p>

                        <p className="mt-1 text-[9px] text-[#969CA7]">
                          /blog/{
                            post.slug
                          }
                        </p>
                      </td>

                      <td className="px-5 py-4 text-[10px] text-[#666E7B]">
                        {
                          post.category
                        }
                      </td>

                      <td className="px-5 py-4">
                        <span className={`rounded-full px-2 py-1 text-[8px] font-bold uppercase ${
                          post.status ===
                          "published"
                            ? "bg-[#EAF7EE] text-[#357A4C]"
                            : "bg-[#F0F1F3] text-[#737A86]"
                        }`}>
                          {
                            post.status
                          }
                        </span>
                      </td>

                      <td className="px-5 py-4 text-[9px] text-[#858C98]">
                        {post.publishedAt
                          ? post.publishedAt.toLocaleDateString(
                              "en-IN",
                            )
                          : "—"}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/admin/blog/${post.id}`}
                            className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-[#DFE2E7]"
                            title="Edit"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Link>

                          <form
                            action={
                              deleteCmsBlogPostAction
                            }
                          >
                            <input
                              type="hidden"
                              name="postId"
                              value={
                                post.id
                              }
                            />

                            <button
                              className="h-8 rounded-[8px] border border-[#E7D5D5] px-3 text-[9px] font-semibold text-[#A34B4B]"
                            >
                              Delete
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
